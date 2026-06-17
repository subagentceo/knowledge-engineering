# Refactor / Elimination Audit — Post-Subdomain Addition

<!-- @cite infra/containers/cloudflare/subdomains-plan.md -->
<!-- @cite src/mcp/ext-tasks/index.ts -->
<!-- @cite src/lib/vendor-mirror.ts -->
<!-- @cite src/lib/schemas/crawl-config.ts -->

The four new subdomains introduce Worker-side implementations of crawl job
dispatch, vendor inventory, and PR state tracking. Several existing `src/`
modules now have overlapping or superseded responsibilities. This document
enumerates each candidate with a recommended action.

---

## 1. `src/lib/vendor-mirror.ts` — CANDIDATE for extraction

**Overlap:** `crawl.subagentknowledge.com` will own crawl job dispatch via
Cloudflare Queues + Browser Rendering. `vendor-mirror.ts` currently holds the
in-process fetch logic used by `scripts/crawl-vendors.ts`.

**Recommendation:** Extract the shared checksum + URL-dedup logic into
`src/lib/crawl-shared.ts` consumed by both `scripts/crawl-vendors.ts` (local
CLI) and the new `src/subdomains/crawl/worker.ts` (edge Worker). The vendor-
mirror module itself shrinks to a thin coordinator over `crawl-shared`.

**Files to touch:** `src/lib/vendor-mirror.ts`, `scripts/crawl-vendors.ts`,
`src/subdomains/crawl/worker.ts` (new)

---

## 2. `src/lib/schemas/crawl-config.ts` — CANDIDATE for consolidation

**Overlap:** Defines `CrawlConfig` Zod schema used by `crawl-vendors.ts`.
The new `crawl.subagentknowledge.com` Worker uses a `WorkerDeployPayload`
schema with a `vendor` field. Both describe the same crawl job shape.

**Recommendation:** Merge into one canonical `CrawlJobSchema` in
`src/lib/schemas/crawl-config.ts` that both the CLI script and the Worker
import. Eliminates duplicate Zod definitions.

---

## 3. `src/mcp/lanes/vendor.ts` — CANDIDATE for Redis-cache upgrade

**Overlap:** Currently serves vendor file listings over MCP without caching.
`workers.subagentknowledge.com` and `crawl.subagentknowledge.com` both
introduce Redis keys (`cf:workers:list`, `crawl:vendor:<name>:last_run`) for
the same underlying data.

**Recommendation:** Wire `src/mcp/lanes/vendor.ts` to read from the Redis
layer first (`get(redis, cacheKey('crawl:vendor', name), VendorRunSchema)`)
before falling back to disk. Cache writes happen in the crawl Worker; the MCP
lane becomes a pure reader. Removes the redundant file-stat path for hot
vendors.

---

## 4. `src/lib/alloydb-branch.ts` — REVIEW for redundancy

**Overlap:** Manages ephemeral AlloyDB Omni branch lifecycle (create/delete)
for the `ke-cloud-agent` sandbox runner. The new subdomain Workers share a
single Hyperdrive config pointing to the production AlloyDB instance — they
don't branch.

**Recommendation:** No elimination, but add a clear module boundary comment
clarifying that `alloydb-branch.ts` is sandbox-runner-only and must never be
imported by subdomain Workers. Prevents accidental branch-on-production bugs.

---

## 5. `src/mcp/ext-tasks/index.ts` — CANDIDATE for queue registration

**Overlap:** Exposes `create_task` / `get_task` / `complete_task` / `list_tasks`
over MCP. The four new Workers will call these directly via pg_durable SQL
(through Hyperdrive), bypassing the MCP server. The `pgdurable:queues:registered`
Redis SADD (from `session-2026-06-17.redis`) is currently manual.

**Recommendation:** Add a `register_queue` MCP tool to `ext-tasks/index.ts`
that upserts into `pgdurable:queues:registered` (Redis SADD) and inserts a
`dw.dim_cloudflare_agent_setup` row with `status='pending'`. The four subdomain
Workers call this on cold-start. Eliminates the manual Redis seed step.

---

## 6. `src/cache/durable-store.ts` — CANDIDATE for `crawl_runs` promotion

**Overlap:** `DurableStore.persistVolatile()` promotes entries after 3 hits.
`dw.crawl_runs` (new, from `03-session-context.sql`) duplicates some of this
promotion logic for crawl-specific data.

**Recommendation:** Add a `CrawlRunSchema` (Zod) to `src/lib/schemas/crawl-config.ts`
and use `DurableStore.set()` to write crawl run results to `semantic_cache`
alongside the dedicated `dw.crawl_runs` table. The durable store becomes the
single promotion path; `dw.crawl_runs` becomes a materialized view over it.

---

## 7. `src/lib/schemas/pr-inventory.ts` — CANDIDATE for plan-worker alignment

**Overlap:** Defines PR inventory schema for the existing MCP lane.
`plan.subagentknowledge.com` will independently model PRs mapped to pg_durable
`task_id`s.

**Recommendation:** Extend `pr-inventory.ts` with an optional `task_id: z.string().uuid().optional()`
field. The `plan` Worker imports the same schema rather than defining its own.
Single source of truth for PR shape.

---

## 8. `frontend/scripts/build-crawler-surface.ts` — CANDIDATE for migration

**Overlap:** Builds a static crawler surface manifest for `subagentknowledge.com`.
`crawl.subagentknowledge.com` now owns the dynamic crawl surface at runtime.

**Recommendation:** Once `crawl.*` is live, migrate the static manifest build
to a cron in `plan.wrangler.jsonc` (already has a `*/5 * * * *` cron). The
`build-crawler-surface.ts` script becomes a dev-only fallback for local Vite
builds when the edge Worker is unavailable.

---

## Action items (pg_durable tasks to create)

Each item below should be tracked as a `dw.session_decisions` row and a
pg_durable task in `queue = "subagentknowledge:refactor:audit"`:

| # | Task | Priority | Effort |
|---|---|---|---|
| R1 | Extract `crawl-shared.ts` from `vendor-mirror.ts` | high | medium |
| R2 | Consolidate `CrawlJobSchema` (CLI + Worker) | high | small |
| R3 | Wire `vendor.ts` MCP lane to Redis L2 | medium | small |
| R4 | Add `alloydb-branch.ts` boundary comment | low | trivial |
| R5 | Add `register_queue` tool to `ext-tasks/index.ts` | medium | small |
| R6 | Wire crawl runs through `DurableStore.set()` | medium | medium |
| R7 | Extend `pr-inventory.ts` with `task_id` | high | small |
| R8 | Migrate `build-crawler-surface.ts` to edge cron | low | large |
