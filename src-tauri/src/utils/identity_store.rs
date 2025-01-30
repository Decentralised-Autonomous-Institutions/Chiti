use super::patricia_trie::StateTrie;
use iroh_blobs::{Store, BlobFormat, Hash};
use parity_scale_codec::{Encode, Decode};
use std::collections::HashMap;

#[derive(Encode, Decode)]
pub enum IdentityField {
    // Core identity fields
    Display(Vec<u8>),      // Display name
    Legal(Vec<u8>),        // Legal name
    Web(Vec<u8>),          // Web URL
    Email(Vec<u8>),        // Email address
    PGPFingerprint(Vec<u8>), // PGP key fingerprint
    Image(Vec<u8>),        // IPFS/CID of avatar image
    // Additional fields
    Custom(Vec<u8>, Vec<u8>), // Custom field (key, value)
}

#[derive(Encode, Decode)]
pub struct IdentityInfo {
    // Additional fields for verification
    pub verified: bool,
    pub verification_time: Option<u64>,
    pub verifier: Option<Vec<u8>>, // PeerId of verifier
    // The actual identity field
    pub field: IdentityField,
}

#[derive(Encode, Decode)]
pub struct ChitiIdentity {
    // Core ideals that rarely change
    pub ideals: Vec<Hash>,  // BLAKE3 hashes of ideal content
    pub values: Vec<Hash>,  // BLAKE3 hashes of value content
    pub purpose: Hash,      // BLAKE3 hash of purpose content
}

#[derive(Encode, Decode)]
pub struct PersonalityTrait {
    pub trait_type: Vec<u8>,
    pub content_hash: Hash,    // BLAKE3 hash of trait content
    pub timestamp: u64,
}

#[derive(Encode, Decode)]
pub struct CharacterKnowledge {
    pub knowledge_type: Vec<u8>,
    pub content_hash: Hash,    // BLAKE3 hash of knowledge content
    pub aligns_with: Vec<Hash>, // References to Chiti ideals
}

pub struct IdentityStore<S: Store> {
    trie: StateTrie<S>,
    blob_store: S,
}

impl<S: Store> IdentityStore<S> {
    pub async fn new(store: S) -> anyhow::Result<Self> {
        Ok(Self {
            trie: StateTrie::new(store.clone()).await?,
            blob_store: store,
        })
    }

    /// Store an identity field
    pub async fn set_field(
        &mut self,
        identity_id: &[u8],
        field: IdentityField,
    ) -> anyhow::Result<()> {
        let key = self.make_field_key(identity_id, &field);
        
        let info = IdentityInfo {
            verified: false,
            verification_time: None,
            verifier: None,
            field,
        };

        // SCALE encode the identity info
        let value = info.encode();
        self.trie.insert(&key, &value).await
    }

    /// Retrieve an identity field
    pub async fn get_field(
        &self,
        identity_id: &[u8],
        field_type: &IdentityField,
    ) -> anyhow::Result<Option<IdentityInfo>> {
        let key = self.make_field_key(identity_id, field_type);
        
        if let Some(value) = self.trie.get(&key).await? {
            // SCALE decode the identity info
            Ok(Some(IdentityInfo::decode(&mut &value[..])?))
        } else {
            Ok(None)
        }
    }

    /// Mark a field as verified
    pub async fn verify_field(
        &mut self,
        identity_id: &[u8],
        field_type: &IdentityField,
        verifier: Vec<u8>,
    ) -> anyhow::Result<()> {
        let key = self.make_field_key(identity_id, field_type);
        
        if let Some(value) = self.trie.get(&key).await? {
            let mut info = IdentityInfo::decode(&mut &value[..])?;
            info.verified = true;
            info.verification_time = Some(std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)?
                .as_secs());
            info.verifier = Some(verifier);
            
            // SCALE encode the updated info
            let value = info.encode();
            self.trie.insert(&key, &value).await?;
        }
        Ok(())
    }

    /// Store a Chiti field with content
    pub async fn set_chiti_field(
        &mut self,
        identity_id: &[u8],
        content: &[u8],
    ) -> anyhow::Result<Hash> {
        // Store content and get BLAKE3 hash
        let content_hash = self.blob_store
            .put_blob(content, BlobFormat::Raw)
            .await?;

        let path = vec![
            b"identity".to_vec(),
            b"chiti".to_vec(),
            content_hash.to_bytes().to_vec(),
        ];
        
        self.trie.insert(&path, content).await?;
        Ok(content_hash)
    }

    /// Store a personality trait
    pub async fn set_personality_trait(
        &mut self,
        identity_id: &[u8],
        trait_type: &str,
        content: &[u8],
        timestamp: u64,
    ) -> anyhow::Result<Hash> {
        // Store content and get BLAKE3 hash
        let content_hash = self.blob_store
            .put_blob(content, BlobFormat::Raw)
            .await?;

        let trait_info = PersonalityTrait {
            trait_type: trait_type.as_bytes().to_vec(),
            content_hash,
            timestamp,
        };

        let path = vec![
            b"identity".to_vec(),
            b"personality".to_vec(),
            trait_type.as_bytes().to_vec(),
            timestamp.to_string().as_bytes().to_vec(),
        ];
        
        // Store the trait info
        let encoded = trait_info.encode();
        self.trie.insert(&path, &encoded).await?;
        Ok(content_hash)
    }

    /// Store character knowledge
    pub async fn set_character_knowledge(
        &mut self,
        identity_id: &[u8],
        knowledge_type: &str,
        content: &[u8],
        aligns_with: Vec<Hash>,
    ) -> anyhow::Result<Hash> {
        // Store content and get BLAKE3 hash
        let content_hash = self.blob_store
            .put_blob(content, BlobFormat::Raw)
            .await?;

        let knowledge = CharacterKnowledge {
            knowledge_type: knowledge_type.as_bytes().to_vec(),
            content_hash,
            aligns_with,
        };

        let path = vec![
            b"identity".to_vec(),
            b"character".to_vec(),
            b"knowledge".to_vec(),
            knowledge_type.as_bytes().to_vec(),
        ];
        
        // Store the knowledge info
        let encoded = knowledge.encode();
        self.trie.insert(&path, &encoded).await?;
        Ok(content_hash)
    }

    /// Retrieve content by BLAKE3 hash
    pub async fn get_content(&self, hash: &Hash) -> anyhow::Result<Option<Vec<u8>>> {
        Ok(self.blob_store.get_blob(hash).await?)
    }

    // Helper function to create composite keys
    fn make_field_key(&self, identity_id: &[u8], field: &IdentityField) -> Vec<u8> {
        let field_type = match field {
            IdentityField::Display(_) => b"display",
            IdentityField::Legal(_) => b"legal",
            IdentityField::Web(_) => b"web",
            IdentityField::Email(_) => b"email",
            IdentityField::PGPFingerprint(_) => b"pgp",
            IdentityField::Image(_) => b"image",
            IdentityField::Custom(key, _) => key,
        };

        let mut key = Vec::with_capacity(identity_id.len() + 1 + field_type.len());
        key.extend_from_slice(identity_id);
        key.push(b'/');
        key.extend_from_slice(field_type);
        key
    }
} 