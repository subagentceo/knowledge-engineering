---
name: semantic-cache
description: >
  Two-tier semantic cache over vendor/ markdown mirror: L1/L2 redis LRU
  (allkeys-lru, 7d TTL) via src/cache/lru-bm25.ts, L3 postgres durable
  via src/cache/durable-store.ts. Use when an agent session reads vendor
  docs repeatedly, needs to persist doc-derived facts across sessions, or
  asks to "cache", "warm", "persist", "promote knowledge", "semantic cache
  status", or wire a new lane to the durable store. Also fires on
  "start cache services", "BM25 search", "citation lane", or "ingest
  citations". Emits DurableTask to engineering.jsonl on tier failure.
  Pairs with durable-pg-memory-store (postgres layer) and
  durable-lru-dreams (redis LRU contract).
---

<!--
  @cite src/cache/lru-bm25.ts                    (L1/L2 volatile tier)
  @cite src/cache/durable-store.ts               (L3 postgres tier)
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts             (queue write)
-->

## Tier schema (Zod)

```typescript
// @cite src/cache/lru-bm25.ts
import { z } from "zod";
export const CacheEntry = z.object({
  key:         z.string(),
  content:     z.string(),
  source_path: z.string(),
  score:       z.number().optional(),
  hits:        z.number().int().default(0),
  cached_at:   z.string().datetime(),
  expires_at:  z.string().datetime().nullable(),
});
export type CacheEntry = z.infer<typeof CacheEntry>;
```

## Tier topology

| Tier | Store | TTL | Eviction | Key pattern |
|------|-------|-----|----------|-------------|
| L1 | in-process lru-cache | 7d | LRU cap 64MiB | `vendor:<path>` |
| L2 | redis allkeys-lru | 7d | allkeys-lru | `vendor:<path>` |
| L3 | postgres semantic_cache | none | `evictOlderThan(90d)` | hash(content) |

Promote L1/L2 hit → L3 after 3 hits. Never relax a Zod schema to force a write.

## Start services

```bash
service postgresql start
service redis-server start
# verify
redis-cli ping   # PONG
psql -c "SELECT 1" >/dev/null && echo "pg ok"
```

## Read-through pattern

```typescript
async function get(key: string, schema: z.ZodType): Promise<CacheEntry | null> {
  return l1.get(key) ?? await l2.get(key) ?? await l3.get(key) ?? null;
}
```

## Failure → DurableTask

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "semantic-cache: L2 redis unavailable",
  "state": "pending", "ke_fit_score": 4,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "tier": "L2", "message": "ECONNREFUSED redis:6379",
    "resolvable": true,
    "suggested_skill": "durable-toolchain-doctor"
  }
}
```

Append to `cowork/data/queues/engineering.jsonl` — never swallow the error silently.

## Citation lane

```bash
npm run ingest:citations -- --pg   # vendor/anthropic-sitemap → csl_items table
```
