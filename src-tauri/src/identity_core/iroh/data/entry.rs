// src/data/entry.rs
use std::time::SystemTime;

use willow_data_model::{NamespaceId, PayloadDigest, SubspaceId};
use anyhow::Result;

#[derive(Debug, Clone, PartialEq)]
pub enum ValidationError {
    MaxComponentCountExceeded(usize),
    MaxComponentLengthExceeded { component_index: usize, length: usize },
    EmptyComponent(usize),
    MaxPathLengthExceeded(usize),
}

#[derive(Debug, Clone, PartialEq)]
pub struct Entry {
    pub namespace_id: [u8; 32], // Concrete type for NamespaceId
    pub subspace_id: [u8; 32],  // Concrete type for SubspaceId
    pub path: Path,
    pub timestamp: SystemTime,
    pub payload_length: u64,
    pub payload_digest: [u8; 32], // Concrete type for PayloadDigest
}

#[derive(Debug, Clone, PartialEq)]
pub struct Path {
    components: Vec<Vec<u8>>,
}

impl Path {
    pub fn new(components: Vec<Vec<u8>>) -> Result<Self, ValidationError> {
        // Validate max component length and count
        Self::validate_components(&components)?;
        Ok(Self { components })
    }

    fn validate_components(components: &[Vec<u8>]) -> Result<(), ValidationError> {
        // Add validation logic per Willow spec
        const MAX_COMPONENT_LENGTH: usize = 255; // Maximum length of a single component
        const MAX_COMPONENT_COUNT: usize = 32;   // Maximum number of components
        const MAX_PATH_LENGTH: usize = 1024;     // Maximum total path length

        // Check if number of components exceeds maximum allowed
        if components.len() > MAX_COMPONENT_COUNT {
            return Err(ValidationError::MaxComponentCountExceeded(components.len()));
        }

        // Validate each component's length
        for (i, component) in components.iter().enumerate() {
            if component.len() > MAX_COMPONENT_LENGTH {
                return Err(ValidationError::MaxComponentLengthExceeded {
                    component_index: i,
                    length: component.len(),
                });
            }

            // Ensure component is not empty
            if component.is_empty() {
                return Err(ValidationError::EmptyComponent(i));
            }
        }

        // Calculate total path length
        let total_length: usize = components.iter()
            .map(|c| c.len())
            .sum();

        // Validate total path length
        if total_length > MAX_PATH_LENGTH {
            return Err(ValidationError::MaxPathLengthExceeded(total_length));
        }
        Ok(())
    }
}