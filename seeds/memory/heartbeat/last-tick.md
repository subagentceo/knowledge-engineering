---
tick: 4
iso: 2026-05-15T04:05:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: webhook (PR #68 Create Neon Branch failure) — surfaced annotation
prev_tick: 2 (PR #67 — merged as 38210b1)
note: |
  Tick 3 (PR #68) is open but not merged; this tick branches off main
  (post-tick-2) and is independent. The tick-3 last-tick.md is on
  PR #68's branch.
---

# Tick 4 — fix migrate-neon cold-start WebSocket race

PR #68's `Create Neon Branch` job failed. The diagnostic chain from PRs
#63/#65 finally surfaced the actual error in a workflow annotation
("Run Migrations" step):

> "All attempts to open a WebSocket to connect to the database failed"
> "Error applying 0001_vendor_pages.sql"

## Root cause

`@neondatabase/serverless` `Pool.query()` opens a WebSocket to the
Neon compute endpoint on first use. The `create-branch-action` returns
once the Neon API confirms the branch metadata exists, but the
branch's compute takes a few seconds to be reachable. The migration
step ran immediately, hit the cold compute, and got the WebSocket
failure.

## Fix

New `warmConnection()` export in `scripts/lib/neon-client.ts`:

- Calls `pool.query("SELECT 1")`.
- On error, drops the cached pool, logs the attempt count, sleeps
  with exponential backoff (2s, 4s, 8s, 16s), and retries.
- Max 5 attempts (covers up to ~30s of branch warm-up).
- Surfaces the underlying error if all attempts fail.

Wired into `migrate-neon.ts` right before the migration loop. The
existing per-migration try/catch + `::error::` annotation surface
remains intact.

## Why this fix (vs alternatives)

- ❌ **Fixed sleep before connect.** Brittle — depends on Neon's
  exact compute-ready time, which varies by region/load. Retry is
  load-adaptive.
- ❌ **Switch to HTTP `neon()` SQL.** Would require splitting our
  multi-statement migration files; introduces new failure modes.
- ❌ **Add settle delay in the workflow.** Adds dead time even when
  the compute is already warm.
- ✅ **Retry the warm-up call.** Fast path (compute already warm) is
  one extra `SELECT 1`. Cold path waits exactly as long as needed.

## Diagnostic chain closed

```
PR #58 → wired Run Migrations → silent exit-1
PR #59 → first failure observed
PR #60 → wrong fix (db_url_pooled) — reverted
PR #61 → correct fix (db_url_with_pooler @v5) — still failed
PR #63 → diagnostic step: confirmed env-var threading OK
PR #65 → ::error:: annotation surface
PR #68 → annotation revealed WebSocket failure
PR #69 (this) → cold-start race retry
```

5 PRs of diagnostic + targeted fix. The annotation approach worked
exactly as designed in tick 1's decision D5.

## What this PR ships

- `scripts/lib/neon-client.ts` — `warmConnection()` helper with
  exponential-backoff retry.
- `scripts/migrate-neon.ts` — calls `warmConnection()` before the
  migration loop.
- This `last-tick.md` (tick 4 record).

## Next tick

If this PR's own `Create Neon Branch` job succeeds → close the issue.
If it still fails → the annotation reveals a different cause; fix
that.

After this lands, `neon-branch.yml` is fully operational per the
Phase 13.B+ O8 design.
