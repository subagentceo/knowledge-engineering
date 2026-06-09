---
name: semantic-cache
description: Treat the vendor/ markdown mirror (15k+ files) as a two-tier semantic cache while making codebase improvements — volatile tier in Redis (allkeys-lru, 7-day TTL) via src/cache/lru-bm25.ts, durable tier in PostgreSQL via src/cache/durable-store.ts. Use whenever an agent session repeatedly reads vendor docs, needs to persist learned doc-derived facts past the session, or asks to "cache", "persist", "promote", or "warm" knowledge. Also fires for "start the cache services", "semantic cache status", or wiring a new lane to the durable store.
---

# semantic-cache

two-tier semantic cache over the `vendor/` mirror. volatile tier answers fast; durable tier survives the session.

```yaml
refs:
  lru:  src/cache/lru-bm25.ts          # L1 in-process LRU + L2 redis, BM25 ranking
  dur:  src/cache/durable-store.ts     # L3 postgres, semantic_cache table
  rds:  https://www.npmjs.com/package/redis
  csl:  src/lib/csl.ts                 # CSL-JSON extraction for the citation lane
  ing:  scripts/ingest-citations.ts    # corpus → citations.json + csl_items table
```

## primitives

```yaml
tiers:
  l1: {store: in-process lru-cache, ttl: 7d, cap: 64MiB}
  l2: {store: redis allkeys-lru, ttl: 7d, conf: infra/redis/redis.conf}
  l3: {store: postgres semantic_cache, ttl: none, eviction: evictOlderThan(days)}
promotion:
  threshold: PROMOTE_AFTER_HITS (3 volatile hits)
  hook: DurableStore.persistVolatile(entries, schema)
  when: at every todo-commit boundary while agents improve the codebase
validation: every get()/set() round-trips a zod schema — no casts
```

## directives

<persist_at_runtime>
Promote hot volatile entries to postgres at todo-commit boundaries, not at session end. A killed session must not lose durable-worthy knowledge.
</persist_at_runtime>

<start_services_first>
`service postgresql start` and `service redis-server start` before touching either tier; neither runs by default in web sessions.
</start_services_first>

<schema_gated_writes>
Writes that fail the caller's zod schema fail closed — nothing lands in any tier. Never relax a schema to make a write succeed.
</schema_gated_writes>

## procedure

1. start services (`<start_services_first>`).
2. `new DurableStore(pool).init()` — idempotent DDL.
3. read-through: L1 → L2 → L3 → vendor/ file on miss, indexing into BM25 as you go (refs: lru).
4. on todo commit: `persistVolatile(hotEntries, schema)` (refs: dur).
5. weekly: `evictOlderThan(90)` keeps the durable tier bounded.

## citation lane

`npm run ingest:citations -- --pg` rebuilds `frontend/public/citations.json` and the `csl_items` table from `vendor/anthropic-sitemap/{research,_pdfs}` (refs: ing, csl). researchers query `csl_items` or the frontend table.
