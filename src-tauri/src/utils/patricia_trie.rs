use iroh_blobs::{store::Store, BlobFormat, Hash};
use std::collections::HashMap;
use futures::future::try_join_all;

#[derive(Debug)]
struct Node {
    // Merkle hash of the node's data
    hash: Hash,
    // Whether this node represents a stored value
    has_value: bool,
    // Shared nibbles for all children (4-bit values)
    nibbles: Vec<u8>,
    // Child nodes mapped by their nibble (0-15)
    children: HashMap<u8, Hash>,
    // Stored value if has_value is true
    value: Option<Vec<u8>>,
}

pub struct StateTrie<S: Store> {
    store: S,
    root: Hash,
}

impl<S: Store> StateTrie<S> {
    pub async fn new(store: S) -> anyhow::Result<Self> {
        // Create empty root node
        let root = Node {
            hash: Hash::default(),
            has_value: false,
            nibbles: vec![],
            children: HashMap::new(),
            value: None,
        };
        
        // Serialize and store root node
        let root_bytes = bincode::serialize(&root)?;
        let root_hash = store.put_blob(&root_bytes, BlobFormat::Raw).await?;

        Ok(Self {
            store,
            root: root_hash,
        })
    }

    // Convert byte key into nibbles (4-bit values)
    fn key_to_nibbles(key: &[u8]) -> Vec<u8> {
        let mut nibbles = Vec::with_capacity(key.len() * 2);
        for &byte in key {
            nibbles.push(byte >> 4);    // High nibble
            nibbles.push(byte & 0x0F);  // Low nibble
        }
        nibbles
    }

    pub async fn insert(&mut self, key: &[u8], value: &[u8]) -> anyhow::Result<()> {
        let nibbles = Self::key_to_nibbles(key);
        self.root = self.insert_recursive(self.root, &nibbles, value).await?;
        Ok(())
    }

    async fn insert_recursive(
        &mut self,
        node_hash: Hash,
        nibbles: &[u8],
        value: &[u8]
    ) -> anyhow::Result<Hash> {
        // Load current node
        let node_bytes = self.store.get_blob(&node_hash).await?;
        let mut node: Node = bincode::deserialize(&node_bytes)?;

        if nibbles.is_empty() {
            // Store value at current node
            node.has_value = true;
            node.value = Some(value.to_vec());
            let node_bytes = bincode::serialize(&node)?;
            return Ok(self.store.put_blob(&node_bytes, BlobFormat::Raw).await?);
        }

        // Find matching nibble prefix length
        let mut i = 0;
        while i < node.nibbles.len() && i < nibbles.len() && node.nibbles[i] == nibbles[i] {
            i += 1;
        }

        if i < node.nibbles.len() {
            // Split current node
            let mut new_node = Node {
                hash: Hash::default(),
                has_value: node.has_value,
                nibbles: node.nibbles[i..].to_vec(),
                children: node.children,
                value: node.value.take(),
            };

            let new_bytes = bincode::serialize(&new_node)?;
            let new_hash = self.store.put_blob(&new_bytes, BlobFormat::Raw).await?;

            // Update current node
            node.nibbles = node.nibbles[..i].to_vec();
            node.has_value = false;
            node.value = None;
            node.children.clear();
            node.children.insert(node.nibbles[i], new_hash);

            if i == nibbles.len() {
                node.has_value = true;
                node.value = Some(value.to_vec());
            } else {
                let leaf = Node {
                    hash: Hash::default(),
                    has_value: true,
                    nibbles: nibbles[i+1..].to_vec(),
                    children: HashMap::new(),
                    value: Some(value.to_vec()),
                };
                let leaf_bytes = bincode::serialize(&leaf)?;
                let leaf_hash = self.store.put_blob(&leaf_bytes, BlobFormat::Raw).await?;
                node.children.insert(nibbles[i], leaf_hash);
            }
        } else if i == nibbles.len() {
            node.has_value = true;
            node.value = Some(value.to_vec());
        } else {
            let next_nibble = nibbles[i];
            let child_hash = match node.children.get(&next_nibble) {
                Some(&hash) => hash,
                None => {
                    let leaf = Node {
                        hash: Hash::default(),
                        has_value: true,
                        nibbles: nibbles[i+1..].to_vec(),
                        children: HashMap::new(),
                        value: Some(value.to_vec()),
                    };
                    let leaf_bytes = bincode::serialize(&leaf)?;
                    self.store.put_blob(&leaf_bytes, BlobFormat::Raw).await?
                }
            };

            let new_child_hash = self.insert_recursive(child_hash, &nibbles[i+1..], value).await?;
            node.children.insert(next_nibble, new_child_hash);
        }

        // Update node hash and store
        let node_bytes = bincode::serialize(&node)?;
        Ok(self.store.put_blob(&node_bytes, BlobFormat::Raw).await?)
    }

    pub async fn get(&self, key: &[u8]) -> anyhow::Result<Option<Vec<u8>>> {
        let nibbles = Self::key_to_nibbles(key);
        self.get_recursive(self.root, &nibbles).await
    }

    async fn get_recursive(&self, node_hash: Hash, nibbles: &[u8]) -> anyhow::Result<Option<Vec<u8>>> {
        let node_bytes = self.store.get_blob(&node_hash).await?;
        let node: Node = bincode::deserialize(&node_bytes)?;

        if nibbles.is_empty() {
            return if node.has_value {
                Ok(node.value)
            } else {
                Ok(None)
            };
        }

        // Check nibble prefix match
        if nibbles.len() < node.nibbles.len() || !nibbles.starts_with(&node.nibbles) {
            return Ok(None);
        }

        // Follow path 
        let next_nibble = nibbles[node.nibbles.len()];
        match node.children.get(&next_nibble) {
            Some(&child_hash) => {
                self.get_recursive(child_hash, &nibbles[node.nibbles.len()+1..]).await
            }
            None => Ok(None)
        }
    }

    pub async fn remove(&mut self, key: &[u8]) -> anyhow::Result<()> {
        let nibbles = Self::key_to_nibbles(key);
        if let Some(new_root) = self.remove_recursive(self.root, &nibbles).await? {
            self.root = new_root;
        }
        Ok(())
    }

    async fn remove_recursive(
        &mut self,
        node_hash: Hash,
        nibbles: &[u8]
    ) -> anyhow::Result<Option<Hash>> {
        let node_bytes = self.store.get_blob(&node_hash).await?;
        let mut node: Node = bincode::deserialize(&node_bytes)?;

        if nibbles.is_empty() {
            if !node.has_value {
                return Ok(Some(node_hash));
            }
            node.has_value = false;
            node.value = None;
            if node.children.is_empty() {
                return Ok(None);
            }
        }

        if !nibbles.starts_with(&node.nibbles) {
            return Ok(Some(node_hash));
        }

        let next_nibble = nibbles[node.nibbles.len()];
        if let Some(&child_hash) = node.children.get(&next_nibble) {
            if let Some(new_child_hash) = self.remove_recursive(
                child_hash,
                &nibbles[node.nibbles.len()+1..]
            ).await? {
                node.children.insert(next_nibble, new_child_hash);
            } else {
                node.children.remove(&next_nibble);
                if !node.has_value && node.children.len() == 1 {
                    // Merge with single child
                    let (byte, hash) = node.children.drain().next().unwrap();
                    let child_bytes = self.store.get_blob(&hash).await?;
                    let child: Node = bincode::deserialize(&child_bytes)?;
                    
                    let mut nibbles = node.nibbles.clone();
                    nibbles.push(byte);
                    nibbles.extend_from_slice(&child.nibbles);
                    
                    node.nibbles = nibbles;
                    node.has_value = child.has_value;
                    node.value = child.value;
                    node.children = child.children;
                }
            }
        }

        if node.children.is_empty() && !node.has_value {
            Ok(None)
        } else {
            let node_bytes = bincode::serialize(&node)?;
            Ok(Some(self.store.put_blob(&node_bytes, BlobFormat::Raw).await?))
        }
    }
}