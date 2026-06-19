// Managed Agents Memory API — Rust / serde Bindings
// Source: https://platform.claude.com/docs/en/managed-agents/memory
// Beta: managed-agents-2026-04-01
//
// Type-safety cascade: YAML → TypeScript/Zod → THIS FILE → Python/Pydantic
//
// [dependencies]
// serde = { version = "1", features = ["derive"] }
// serde_json = "1"
// chrono = { version = "0.4", features = ["serde"] }

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

// ── Limits ────────────────────────────────────────────────────────────────────

pub const MEMORY_MAX_BYTES: usize = 102_400;
pub const MEMORIES_PER_STORE: usize = 2_000;
pub const STORES_PER_SESSION: usize = 8;
pub const INSTRUCTIONS_MAX_CHARS: usize = 4_096;
pub const VERSION_RETENTION_DAYS: u32 = 30;
pub const RATE_CREATE_RPM: u32 = 300;
pub const RATE_READ_RPM: u32 = 600;

pub const API_BASE: &str = "https://api.anthropic.com";
pub const API_VERSION: &str = "2023-06-01";
pub const BETA_HEADER: &str = "managed-agents-2026-04-01";

// ── Enums ─────────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryAccess {
    ReadWrite,
    ReadOnly,
}

impl Default for MemoryAccess {
    fn default() -> Self {
        Self::ReadWrite
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryOperation {
    Create,
    Update,
    Delete,
    Redact,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryStoreStatus {
    Active,
    Archived,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryItemType {
    Memory,
    MemoryPrefix,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum OrderBy {
    Path,
    CreatedAt,
    UpdatedAt,
}

// ── Memory Store ──────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryStore {
    pub id: String,        // memstore_...
    pub name: String,
    pub description: String,
    pub status: MemoryStoreStatus,
    pub archived_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateMemoryStoreParams {
    pub name: String,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct UpdateMemoryStoreParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ListMemoryStoresParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub include_archived: Option<bool>,
}

// ── Memory ────────────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Memory {
    pub id: String,               // mem_...
    pub memory_store_id: String,  // memstore_...
    /// POSIX path, e.g. /preferences/formatting.md
    pub path: String,
    /// Full content. Present on retrieve, None in list results. Max 100 kB.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// SHA-256 hex digest. Use as precondition for safe concurrent updates.
    pub content_sha256: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// Used in list responses — either a leaf memory or a directory prefix node.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum MemoryListItem {
    Memory { path: String, id: String },
    MemoryPrefix { path: String },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContentSha256Precondition {
    #[serde(rename = "type")]
    pub kind: String, // always "content_sha256"
    pub content_sha256: String,
}

impl ContentSha256Precondition {
    pub fn new(sha256: impl Into<String>) -> Self {
        Self {
            kind: "content_sha256".into(),
            content_sha256: sha256.into(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateMemoryParams {
    /// Must start with /. Must not already exist.
    pub path: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct UpdateMemoryParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub path: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// Optimistic concurrency guard. Update only applies if hash matches.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub precondition: Option<ContentSha256Precondition>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ListMemoriesParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub path_prefix: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub order_by: Option<OrderBy>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub depth: Option<u32>,
}

// ── Memory Version ────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryVersion {
    pub id: String,               // memver_...
    pub memory_store_id: String,
    pub memory_id: String,
    pub operation: MemoryOperation,
    /// Full content at this version. None when redacted. Present on retrieve only.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// None when redacted.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content_sha256: Option<String>,
    /// Session that authored this version, if agent-written.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub session_id: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ListMemoryVersionsParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub memory_id: Option<String>,
}

// ── Session Resource Attachment ───────────────────────────────────────────────

/// Attach a memory store to a session via resources[].
/// Max 8 per session. Must be specified at session creation.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MemoryStoreResource {
    #[serde(rename = "type")]
    pub kind: String, // always "memory_store"
    pub memory_store_id: String,
    #[serde(default)]
    pub access: MemoryAccess,
    /// Session-level instructions. Max 4096 chars.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub instructions: Option<String>,
}

impl MemoryStoreResource {
    pub fn read_write(store_id: impl Into<String>) -> Self {
        Self {
            kind: "memory_store".into(),
            memory_store_id: store_id.into(),
            access: MemoryAccess::ReadWrite,
            instructions: None,
        }
    }

    pub fn read_only(store_id: impl Into<String>) -> Self {
        Self {
            kind: "memory_store".into(),
            memory_store_id: store_id.into(),
            access: MemoryAccess::ReadOnly,
            instructions: None,
        }
    }

    pub fn with_instructions(mut self, instructions: impl Into<String>) -> Self {
        self.instructions = Some(instructions.into());
        self
    }
}

// ── Paginated List Response ───────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Paginated<T> {
    pub data: Vec<T>,
    pub has_more: bool,
    pub first_id: Option<String>,
    pub last_id: Option<String>,
}

pub type MemoryStoreList = Paginated<MemoryStore>;
pub type MemoryList = Paginated<MemoryListItem>;
pub type MemoryVersionList = Paginated<MemoryVersion>;

// ── Unit Tests ────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn resource_defaults_to_read_write() {
        let r = MemoryStoreResource::read_write("memstore_01");
        assert_eq!(r.access, MemoryAccess::ReadWrite);
        let json = serde_json::to_string(&r).unwrap();
        assert!(json.contains("read_write"));
    }

    #[test]
    fn precondition_serializes_correctly() {
        let p = ContentSha256Precondition::new("abc123");
        let json = serde_json::to_string(&p).unwrap();
        assert!(json.contains("content_sha256"));
        assert!(json.contains("abc123"));
    }

    #[test]
    fn memory_list_item_discriminated_union() {
        let leaf = MemoryListItem::Memory {
            path: "/prefs/fmt.md".into(),
            id: "mem_01".into(),
        };
        let dir = MemoryListItem::MemoryPrefix {
            path: "/prefs/".into(),
        };
        let leaf_json = serde_json::to_string(&leaf).unwrap();
        let dir_json = serde_json::to_string(&dir).unwrap();
        assert!(leaf_json.contains("\"type\":\"memory\""));
        assert!(dir_json.contains("\"type\":\"memory_prefix\""));
    }
}
