---
name: durable-pg-memory-store
description: >
  CRUD operations on Managed Agents memory stores and individual memories, backed by
  a postgres durable layer and redis LRU write-through/read-through cache. Use whenever
  the user wants to create, read, update, delete, list, or search memories; seed a store
  before a session; inspect or roll back memory versions; redact PII from history; or
  track cache hit/miss rates per store in postgres. Trigger on: "memory store", "memstore",
  "memory_stores", "create a store", "seed memories", "write to memory", "read a memory",
  "list memories", "search memories", "memory version", "redact memory", "cache hit rate",
  "durable_memory_store", "memory CRUD", "agent memory", "persistent memory". Fire even
  when the user says "give my agent memory" or "save this for next session" — this skill
  owns that pattern. Also fire when building a read-through cache on top of the Memory
  Stores API.
---

<!--
  @cite platform.claude.com/docs/en/managed-agents/memory.md
  @cite cowork/templates/task-state-machine.ts
  @cite references/durable-dreams-memory-tasks.sql  (bundled)
  @cite references/durable_models.schema.ts          (bundled)
  @cite references/durable_models.py                 (bundled)
-->

## What this skill does

Memory stores are workspace-scoped collections of text documents that agents read/write
automatically when attached to a session. This skill covers:

1. **Memory Store CRUD** — create, retrieve, update, archive, delete stores.
2. **Memory CRUD** — write/read/update/delete individual documents by path or `mem_...` ID.
3. **Memory versions** — list history, retrieve past content, redact PII.
4. **Redis LRU cache** — `memstore:{store_id}` keys, write-through on write, read-through
   on miss, eviction hook → postgres `memory_store_cache_event`.
5. **Postgres durable layer** — `durable_memory_store` table tracks API metadata + cache stats.

Beta header required: `managed-agents-2026-04-01`
API base: `https://api.anthropic.com/v1`
OAuth only — `ANTHROPIC_API_KEY` must NOT be set.

Limits: max **2 000 memories** per store, max **100 KB per memory**, max **8 stores per session**.

---

## Memory store resource schema

```json
{
  "id": "memstore_01Hx...",
  "name": "User Preferences",
  "description": "Per-user preferences and project context.",
  "memory_count": 42,
  "memory_limit": 2000,
  "status": "active | archived | deleted",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

## Memory resource schema

```json
{
  "id": "mem_01...",
  "memory_store_id": "memstore_01...",
  "path": "/preferences/formatting.md",
  "content": "Always use tabs, not spaces.",
  "size_bytes": 30,
  "content_sha256": "abc123...",
  "version_id": "memver_01...",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601"
}
```

---

## Memory Store CRUD

### Create

```python
store = client.beta.memory_stores.create(
    name="User Preferences",
    description="Per-user preferences and project context.",
)
# store.id = "memstore_01Hx..."
```

After creating, upsert into postgres:

```sql
INSERT INTO durable_memory_store (store_id, name, description, cache_ttl_secs)
VALUES ($1, $2, $3, 3600)
ON CONFLICT (store_id) DO UPDATE
  SET name = EXCLUDED.name, description = EXCLUDED.description, updated_at = now();
```

### Attach to a session

```python
session = client.beta.sessions.create(
    agent=agent_id,
    environment_id=environment_id,
    resources=[{
        "type": "memory_store",
        "memory_store_id": store.id,
        "access": "read_write",          # or "read_only"
        "prompt": "Check before any task.",
    }],
)
```

Max 8 stores per session. Separate read-only (shared reference) from read-write (per-user)
stores for different lifecycles.

---

## Memory CRUD

### Write (upsert by path)

```python
mem = client.beta.memory_stores.memories.write(
    memory_store_id=store.id,
    path="/preferences/formatting.md",
    content="Always use tabs, not spaces.",
)
```

Creates at path if absent; replaces content if path exists.

**Create-only guard** (409 on conflict):
```python
client.beta.memory_stores.memories.write(
    memory_store_id=store.id,
    path="/seed/conventions.md",
    content="...",
    precondition={"type": "not_exists"},
)
```

After write, update redis and postgres:
```python
# invalidate cache so next read fetches fresh
r.delete(f"memstore:{store.id}")
cursor.execute(
    "UPDATE durable_memory_store SET memory_count = memory_count + 1, updated_at = now() WHERE store_id = %s",
    [store.id]
)
```

### Read (by memory ID)

```python
mem = client.beta.memory_stores.memories.retrieve(
    memory_id,
    memory_store_id=store.id,
)
print(mem.content)
```

### Update (by memory ID — rename path or edit content)

```python
# Rename
client.beta.memory_stores.memories.update(
    mem.id,
    memory_store_id=store.id,
    path="/archive/2026_q1_formatting.md",
)

# Safe content edit with optimistic concurrency
client.beta.memory_stores.memories.update(
    mem.id,
    memory_store_id=store.id,
    content="CORRECTED: Always use 2-space indentation.",
    precondition={"type": "content_sha256", "content_sha256": mem.content_sha256},
)
# 409 memory_precondition_failed if hash mismatch → re-read and retry
```

### Delete (by memory ID)

```python
client.beta.memory_stores.memories.delete(
    mem.id,
    memory_store_id=store.id,
)
# optional: pass expected_content_sha256 for conditional delete
```

### List (metadata only, no content)

```python
page = client.beta.memory_stores.memories.list(
    store.id,
    path_prefix="/",    # trailing slash = directory scope
)
for memory in page.data:
    print(f"{memory.path}  ({memory.size_bytes} bytes, sha={memory.content_sha256[:8]})")
```

Trailing slash matters: `/notes/` matches `/notes/a.md` but not `/notes_backup/old.md`.

---

## Redis LRU cache layer

Key pattern: `memstore:{store_id}`  
Value: JSON array of `{path, content, version}` objects  
Policy: `maxmemory-policy = allkeys-lru`  
Default TTL: `durable_memory_store.cache_ttl_secs` (default 3600s)

### Read-through

```python
key = f"memstore:{store_id}"
cached = r.get(key)
if cached is None:
    # cache miss — fetch from API
    memories = list(client.beta.memory_stores.memories.list(store_id, path_prefix="/"))
    r.setex(key, ttl_secs, json.dumps([m.model_dump() for m in memories]))
    cursor.execute("SELECT memory_store_cache_event(%s, 'miss')", [store_id])
else:
    memories = json.loads(cached)
    cursor.execute("SELECT memory_store_cache_event(%s, 'hit')", [store_id])
```

### Write-through

```python
# After any memory write/update/delete:
r.delete(f"memstore:{store_id}")     # invalidate
# OR full refresh:
memories = list(client.beta.memory_stores.memories.list(store_id, path_prefix="/"))
r.setex(f"memstore:{store_id}", ttl_secs, json.dumps([m.model_dump() for m in memories]))
cursor.execute("SELECT memory_store_cache_event(%s, 'set')", [store_id])
```

### Eviction hook

```python
# Subscribe to redis keyspace notifications in a background thread:
# CONFIG SET notify-keyspace-events "KEA"
# SUBSCRIBE __keyevent@0__:expired
# On event key = "memstore:{store_id}":
cursor.execute("SELECT memory_store_cache_event(%s, 'evict')", [store_id])
```

### Cache stats query

```sql
SELECT store_id, name, hit_rate, cache_status, memory_count
  FROM memory_store_lru_stats
 ORDER BY hit_rate ASC;   -- cold/low-hit stores = candidates for eviction TTL tuning
```

---

## Memory versions

Every memory mutation creates an immutable `memver_...` version.
Operations: `created`, `modified`, `deleted`.

### List versions

```python
for v in client.beta.memory_stores.memory_versions.list(
    store.id, memory_id=mem.id
):
    print(f"{v.id}: {v.operation}")
```

Filter by `operation`, `session_id`, `api_key_id`, `created_at_gte/lte`.

### Retrieve a version (includes full content)

```python
version = client.beta.memory_stores.memory_versions.retrieve(
    version_id, memory_store_id=store.id
)
print(version.content)
```

### Redact (GDPR / PII removal)

Clears `content`, `content_sha256`, `content_size_bytes`, `path` while preserving
the audit trail (actor, timestamps):

```python
client.beta.memory_stores.memory_versions.redact(
    version_id, memory_store_id=store.id
)
```

Use for leaked secrets, PII, or user deletion requests. Irreversible.

---

## Postgres durable layer

Schema in `references/durable-dreams-memory-tasks.sql` (bundled).

Key columns of `durable_memory_store`:

| Column | Description |
|---|---|
| `store_id` | `memstore_...` primary key |
| `memory_count` / `memory_limit` | current count vs 2000 hard limit |
| `status` | `active \| archived \| deleted` |
| `cached_at` | last redis SET timestamp |
| `cache_ttl_secs` | per-store TTL (default 3600) |
| `cache_hits` / `cache_misses` | running totals from `memory_store_cache_event` |
| `source_dream_id` | set when this store was produced by a dream |
| `parent_store_id` | lineage tracking |

Track a memory write in postgres:

```sql
UPDATE durable_memory_store
   SET memory_count = memory_count + 1, updated_at = now()
 WHERE store_id = $1;

INSERT INTO durable_event_log (entity_type, entity_id, event, note)
VALUES ('memory_store', $1, 'memory_written', $2);
```

Archive a store:

```sql
SELECT durable_advance('memory_store', $1, 'archived', 'manual archive');
```

---

## Emit a durable task for store operations

When a store operation needs async follow-up (e.g., seeding, bulk import), write
to the engineering queue:

```python
task = {
    "id": str(uuid.uuid4()),
    "queue": "engineering",
    "subject": f"Seed memory store: {store_id}",
    "state": "pending",
    "ke_fit_score": 2,
    "created_at": now, "updated_at": now,
    "error": {
        "store_id": store_id,
        "operation": "seed",
        "path_prefix": "/",
        "resolvable": True,
    },
    "suggested_skill": "durable-pg-memory-store",
}
with open("cowork/data/queues/engineering.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")
```

---

## Bundled references

Read when you need full type definitions:

- `references/durable-dreams-memory-tasks.sql` — postgres schema (durable_memory_store table, memory_store_cache_event function, memory_store_lru_stats view)
- `references/durable_models.schema.ts` — Zod v4 DurableMemoryStore, RedisLRUConfig
- `references/durable_models.py` — Pydantic v2 equivalents
