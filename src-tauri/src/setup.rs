use iroh::{
    protocol::Router, Endpoint
    key::SecretKey
};
use iroh_blobs::net_protocol::Blobs;
use tauri::AppHandle;
use anyhow::Result;
use willow_data_model::NamespaceId;

pub async fn setup(app: AppHandle) -> Result<(
    Endpoint,
    Blobs<>,
    Router,
    NamespaceId,
    SecretKey,
    Identity
)> {
    // Create endpoint for p2p connections
    let endpoint = Endpoint::builder()
        .discovery_default() // Enable discovery
        .build()?;

    // Initialize blob store in memory
    let local_pool = LocalPool::default();
    let blobs = Blobs::memory().build(&local_pool)?;

    // Build router to handle identity protocol
    let router = Router::builder(endpoint.clone())
        .accept(Blobs::ALPN, blobs.clone())
        .spawn()
        .await?;

    // Create Identity data structure
    let namespace = NamespaceId::new("Chiti");  // Fixed namespace for Chiti
    let keypair = KeyPair::generate();
    let identity = Identity::new(&namespace, keypair.public())?;

    Ok((endpoint, blobs, router, namespace, keypair, identity))
}