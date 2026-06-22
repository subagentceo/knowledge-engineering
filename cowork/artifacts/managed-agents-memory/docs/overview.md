# Managed Agents Memory — Overview

Source: `https://platform.claude.com/docs/en/managed-agents/memory`
Beta header: `managed-agents-2026-04-01`

---

## What it is

Memory stores give Managed Agents persistent memory that survives across sessions.
Without them, each session starts fresh and forgets everything when it ends.

A **memory store** is a workspace-scoped collection of text documents mounted inside
the agent's sandbox at `/mnt/memory/`. The agent reads and writes it with the same
file tools it uses for the rest of the filesystem.

Each **memory** is addressed by a POSIX path (e.g. `/preferences/formatting.md`)
and can be read or edited directly via API — for seeding, correcting, or exporting.

Every write creates an immutable **memory version** — an audit trail with SHA-256
content hashing for optimistic concurrency and point-in-time rollback.

---

## Resource hierarchy

```
MemoryStore (memstore_...)
├── Memory (mem_...)            ← individual text documents ≤100 kB
│   └── MemoryVersion (memver_...) ← immutable per-write snapshot
└── Memory ...
```

---

## ID prefixes

| Resource | Prefix | Example |
|----------|--------|---------|
| Memory store | `memstore_` | `memstore_01Hx...` |
| Memory | `mem_` | `mem_01Hx...` |
| Memory version | `memver_` | `memver_01Hx...` |

---

## Hard limits

| Limit | Value |
|-------|-------|
| Memory max size | 100 kB (102,400 bytes) |
| Memories per store | 2,000 |
| Stores per session | 8 |
| Instructions max | 4,096 chars |
| Version retention | 30 days (recent always kept) |
| Create rate limit | 300 req/min per org |
| Read rate limit | 600 req/min per org |

---

## Session attachment

```json
{
  "type": "memory_store",
  "memory_store_id": "memstore_01Hx...",
  "access": "read_write",
  "instructions": "Check this before starting any task."
}
```

- Attach via `resources[]` at session creation only — cannot add to a running session
- `access` defaults to `read_write`; use `read_only` for shared reference stores or
  any store that receives untrusted input (prompt injection risk)
- Each attached store is mounted at `/mnt/memory/{store_name}/`
- The system prompt automatically describes each mount

---

## Safe concurrent updates (optimistic locking)

```python
# Read the memory
mem = client.beta.memory_stores.memories.retrieve(mem_id, memory_store_id=store_id)

# Update only if content hasn't changed since you read it
client.beta.memory_stores.memories.update(
    mem.id,
    memory_store_id=store_id,
    content="New content",
    precondition={"type": "content_sha256", "content_sha256": mem.content_sha256},
)
# On mismatch: re-read and retry
```

---

## Schema files in this workspace

| File | Language | Description |
|------|----------|-------------|
| `yaml/memory.yaml` | YAML / JSON Schema 2020-12 | Canonical source of truth |
| `typescript/memory.ts` | TypeScript + Zod | Runtime validators + inferred types |
| `rust/src/lib.rs` | Rust + serde | Deserialize/Serialize data classes |
| `python/memory.py` | Python + Pydantic v2 | Validated models with factory methods |

---

## Best practices

- **Use focused stores**: one per user, one for shared domain knowledge, one for project context
- **Condense before the 2,000-memory limit**: run a dreaming session or prune with `memories.delete`
- **`read_only` for reference stores**: prevents prompt injection from poisoning shared knowledge
- **Structure as many small files**: not a few large ones — each file is independently addressable
- **Archive, don't delete**: archiving is one-way and makes a store read-only; use it for completed work
