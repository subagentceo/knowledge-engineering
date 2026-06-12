# 2026-06-12 — Tiered cache × warehouse unification (KAN-4)

Status: accepted. Jira epic KAN-4 (managedcoworkers.atlassian.net), tasks KAN-5…KAN-14, shipped as PRs #454–#463.

## Decision

The three-tier semantic cache (L1 in-process LRU, L2 Redis allkeys-lru 7-day TTL, L3 Postgres `semantic_cache`) and the AlloyDB-pattern warehouse (`dw` schema) are one system, joined by the events_ pattern:

1. **Raw streams are events_ tables, append-only, never mutated.** `dw.events_cache_access` (every tier touch: hit/miss/set/invalidate/promote) and `dw.events_memory_access` (every memory read, matched or not). Writers buffer in memory and batch-flush; the hot path never awaits the warehouse.
2. **Dimensions are SCD II.** `dw.dim_cache_key` catalogs observed keys with source_path lineage; provenance changes close rows rather than overwrite them.
3. **Facts are idempotent rollups.** `dw.fact_cache_hits` (grain: key × tier × day) re-upserts per day, so dw:load reruns refresh rather than double-count.
4. **The loop closes through dreams.** The nightly dreams pass reads heat from `fact_cache_hits` and re-seeds the hottest ≤100 keys into L2, so the next session's reads resolve volatile. Warming flows through the instrumented set path and is itself recorded.
5. **One feed shape, three consumers.** `shapeCacheStats` feeds `frontend/public/cache-stats.json` (subagentknowledge.com panel), the `vendor_cache_stats` bridge tool, and the SLO evaluator.
6. **SLOs gate on behavior, not live numbers.** `evaluateCacheSlo` requires ≥100 ops per tier before judging (L1 ≥50%, L2 ≥30%, L3 ≥10% hit ratio); below that it reports no-data. dw:load prints the verdict line; the verify chain asserts the evaluator, keeping CI hermetic.

## Consequences

- New cache lanes get observability for free by namespacing keys `ke:<lane>:<id>`.
- `events_cache_promotion` (B5) remains the promotion audit log; `events_cache_access` is the superset access stream. Both are retained — promotion rows carry hits-at-promotion, which the access stream does not.
- Adding a contract YAML under `data/models/alloydb/` requires bumping the count assertion in `src/lib/table-semantics.test.ts` (14 as of this ADR) — deliberate friction so new tables are reviewed.
