---
name: durable-lru-dreams
description: >
  Manage the full Dreams API lifecycle (create, poll, cancel, archive, list) with a
  redis LRU cache layer and postgres durable persistence. Use whenever the user wants
  to consolidate agent memory across sessions, run a dream job, check dream status,
  retrieve the output memory store, or wire dreams into a durable task pipeline.
  Trigger on: "run a dream", "consolidate memory", "dream consolidation",
  "drm_", "start dreaming", "poll dream", "archive dream", "dream output store",
  "LRU cache memory", "redis memstore", "durable dream", "dream pipeline",
  "dream_consolidation task". Fire even if the user just says "memory cleanup" or
  "reorganize my agent memory" — dreams are the canonical mechanism.
---

<!--
  @cite platform.Codex.com/docs/en/managed-agents/dreams.md
  @cite platform.Codex.com/docs/en/managed-agents/memory.md
  @cite cowork/templates/task-state-machine.ts
  @cite references/durable-dreams-memory-tasks.sql  (bundled)
  @cite references/durable_models.schema.ts          (bundled)
  @cite references/durable_models.py                 (bundled)
-->

## What this skill does

Dreams consolidate memory: they read an existing **memory store** plus up to 100
**session transcripts**, then write a new, reorganised output store. The input store
is never modified. Dreams run asynchronously (minutes to tens of minutes).

This skill wraps the Dreams API in two durable layers:

1. **Redis LRU** — `memstore:{store_id}` key, `allkeys-lru` eviction, write-through
   on every API read, eviction hook → postgres `memory_store_cache_event(id, 'evict')`.
2. **Postgres** — `durable_dream` + `durable_task` tables track lifecycle; dream
   creation emits a `dream_consolidation` task to `cowork/data/queues/engineering.jsonl`
   so autoresolve can pick it up.

Beta headers required (SDK sets them automatically):
`managed-agents-2026-04-01,dreaming-2026-04-21`

API base: `https://api.anthropic.com/v1`
OAuth only — `ANTHROPIC_API_KEY` must NOT be set (see AGENTS.md).

---

## Dream resource schema

```json
{
  "type": "dream",
  "id": "drm_01...",
  "status": "pending | running | completed | failed | canceled",
  "inputs": [
    { "type": "memory_store", "memory_store_id": "memstore_01..." },
    { "type": "sessions", "session_ids": ["sesn_01...", "sesn_02..."] }
  ],
  "outputs": [
    { "type": "memory_store", "memory_store_id": "memstore_output_01..." }
  ],
  "model": { "id": "Codex-opus-4-7 | Codex-sonnet-4-6" },
  "instructions": "optional guidance string (max 4096 chars)",
  "session_id": "sesn_pipeline...",
  "created_at": "ISO-8601",
  "ended_at": "ISO-8601 | null",
  "archived_at": "ISO-8601 | null",
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0
  },
  "error": { "type": "timeout | internal_error | ...", "message": "..." } | null
}
```

Limits: 100 sessions per dream, instructions ≤ 4 096 chars, supported models:
`Codex-opus-4-7`, `Codex-sonnet-4-6`.

---

## Lifecycle

```
pending → running → completed
                 ↘ failed
                 ↘ canceled  (POST /dreams/{id}/cancel)
```

`archive` sets `archived_at` on a terminal dream; archived dreams are excluded from
list by default. Archiving a `pending` or `running` dream returns 400 — cancel first.
There is no unarchive.

---

## Core operations

### 1. Create a dream

```bash
curl -s https://api.anthropic.com/v1/dreams \
  -H "anthropic-beta: managed-agents-2026-04-01,dreaming-2026-04-21" \
  -H "content-type: application/json" \
  --data '{
    "inputs": [
      { "type": "memory_store", "memory_store_id": "memstore_01..." },
      { "type": "sessions", "session_ids": ["sesn_01...", "sesn_02..."] }
    ],
    "model": "Codex-opus-4-7",
    "instructions": "Focus on coding-style preferences; ignore one-off notes."
  }'
```

**Python (SDK):**
```python
dream = client.beta.dreams.create(
    inputs=[
        {"type": "memory_store", "memory_store_id": store_id},
        {"type": "sessions", "session_ids": session_ids},
    ],
    model="Codex-opus-4-7",
    instructions=instructions,
)
# dream.id = "drm_01..."
# dream.status = "pending"
```

If you only have sessions and no existing store, create an empty memory store first
(`POST /v1/memory_stores`) then pass it as the `memory_store` input.

### 2. Emit a durable task on creation

After creating a dream, write a `dream_consolidation` task to the JSONL queue:

```python
import json, uuid, datetime

task = {
    "id": str(uuid.uuid4()),
    "queue": "engineering",
    "subject": f"Dream consolidation: {dream.id}",
    "state": "pending",
    "ke_fit_score": 3,
    "created_at": datetime.datetime.utcnow().isoformat() + "Z",
    "updated_at": datetime.datetime.utcnow().isoformat() + "Z",
    "error": {
        "dream_id": dream.id,
        "input_store": store_id,
        "session_count": len(session_ids),
    },
    "suggested_skill": "durable-lru-dreams",
}
with open("cowork/data/queues/engineering.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")
```

### 3. Poll until terminal

```python
import time

while dream.status in ("pending", "running"):
    time.sleep(10)
    dream = client.beta.dreams.retrieve(dream.id)
    print(f"status={dream.status} tokens={dream.usage.input_tokens}")
```

Emit a `[FAIL]` durable task and stop polling if status is `failed`:

```python
if dream.status == "failed":
    err = dream.error or {}
    task = {
        "id": str(uuid.uuid4()),
        "queue": "engineering",
        "subject": f"Dream failed: {dream.id}",
        "state": "failed",
        "ke_fit_score": 4,
        "created_at": now, "updated_at": now,
        "error": {"dream_id": dream.id, "error_type": err.get("type"),
                  "error_message": err.get("message"), "resolvable": False},
    }
    # append to engineering.jsonl
```

### 4. Extract the output store

```python
output_store_id = next(
    o.memory_store_id for o in dream.outputs if o.type == "memory_store"
)
```

Then update the postgres `durable_dream` row:

```sql
UPDATE durable_dream
   SET status = 'completed', output_store_id = $1,
       input_tokens = $2, output_tokens = $3, ended_at = now()
 WHERE dream_id = $4;
SELECT durable_advance('dream', $4, 'completed', 'pipeline finished');
```

### 5. Redis LRU write-through on output

After the dream completes, seed the LRU cache with the output store's memories:

```python
import redis, json

r = redis.Redis()
memories = list(client.beta.memory_stores.memories.list(output_store_id, path_prefix="/"))
r.setex(f"memstore:{output_store_id}", ttl_secs, json.dumps([m.model_dump() for m in memories]))
# postgres
cursor.execute("SELECT memory_store_cache_event(%s, 'set')", [output_store_id])
```

On cache miss (key absent or evicted):
```python
key = f"memstore:{store_id}"
cached = r.get(key)
if cached is None:
    # read-through
    memories = list(client.beta.memory_stores.memories.list(store_id, path_prefix="/"))
    r.setex(key, ttl_secs, json.dumps([m.model_dump() for m in memories]))
    cursor.execute("SELECT memory_store_cache_event(%s, 'miss')", [store_id])
else:
    memories = json.loads(cached)
    cursor.execute("SELECT memory_store_cache_event(%s, 'hit')", [store_id])
```

On redis keyspace eviction notification:
```python
# subscribe to __keyevent@0__:expired in a background thread
# on event: cursor.execute("SELECT memory_store_cache_event(%s, 'evict')", [store_id])
```

### 6. Cancel a dream

```python
client.beta.dreams.cancel(dream.id)
# idempotent on already-canceled; 400 on completed/failed
```

### 7. Archive a dream

```python
client.beta.dreams.archive(dream.id)
# only on terminal state; 400 on pending/running (cancel first)
# no unarchive
```

### 8. List dreams

```python
for d in client.beta.dreams.list(limit=20, include_archived=False):
    print(d.id, d.status)
```

---

## Postgres integration

Schema lives in `references/durable-dreams-memory-tasks.sql` (bundled). Key tables:

| Table | Purpose |
|---|---|
| `durable_memory_store` | API store + redis LRU metadata (hits, misses, TTL, cached_at) |
| `durable_dream` | Dream lifecycle; FK to input/output stores |
| `durable_task` | FSM with `durable_task_claim(runner, kind, lease)` SKIP LOCKED |
| `durable_event_log` | Append-only audit |

Functions: `durable_advance(entity_type, id, to_state)`, `memory_store_cache_event(store_id, event)`.
Views: `dream_pipeline_status`, `memory_store_lru_stats`, `task_progress`.

Claim a `dream_consolidation` task atomically:

```sql
SELECT durable_task_claim('dream-worker', 'dream_consolidation', 120);
```

---

## Error types

| `error.type` | Cause |
|---|---|
| `timeout` | Pipeline exceeded runtime budget |
| `internal_error` | Unclassified pipeline failure |
| `memory_store_org_limit_exceeded` | Org hit memory-store cap mid-pipeline |
| `input_memory_store_too_large` | Input store exceeds pipeline size limit |
| `input_memory_store_unavailable` | Input store archived/deleted after dream created |
| `input_session_unavailable` | Input session archived/deleted after dream created |

On `failed`, the partial output store persists — inspect it before deleting.

---

## Bundled references

Read these only when you need the full type definitions:

- `references/durable-dreams-memory-tasks.sql` — postgres schema + functions + views
- `references/durable_models.schema.ts` — Zod v4 types for DurableMemoryStore, DurableTask, DurableOutcome, RedisLRUConfig
- `references/durable_models.py` — Pydantic v2 equivalents
- `references/dreams.schema.ts` — Zod v4 Dream API types (from original dreams-toolchain)
- `references/dreams_schema.py` — Pydantic v2 Dream API types
- `scripts/dream_runner.py` — CLI + DreamRunner class (cross-surface, auto-detects env)
