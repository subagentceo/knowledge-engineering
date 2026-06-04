# ADR: Neon removed — AlloyDB Omni is the free replacement

**Date**: 2026-06-04  
**Status**: Accepted  
**Outcome**: O6

## Context

The chassis used Neon's serverless Postgres as an optional dual-write target from the vendor crawler and as a per-PR branching substrate. Neon requires a paid plan for production branching at the rate the repo's PR automation demands.

AlloyDB Omni (`src/lib/alloydb-branch.ts`) was already committed as the free replacement: it runs as a standard Postgres server on the agent host (`localhost:5433`) and uses `CREATE DATABASE keng_pr_<N> TEMPLATE <base>` (physical file copy) to provide branch-per-PR semantics. The switch was deferred; this ADR formalises it.

## Decision

Remove all Neon code, configuration, and documentation from the repository:

- **Deleted files**: `scripts/lib/neon-client.ts`, `scripts/lib/neon-client.test.ts`, `scripts/migrate-neon.ts`, `scripts/mint-neon-api-secret.ts`, `scripts/audit-neon-extensions.ts`, `docs/operator-runbooks/neon-{hyperdrive-setup,mcp-server,pg18-extensions,secrets-matrix}.md`, `plugins/macos-it-admin/skills/neon-crud/`
- **Cleaned**: `scripts/crawl-vendors.ts` (removed `flushNeonBatch` + all call sites), `scripts/lib/alloydb-client.ts` (self-contained `VendorPageRow`, no neon-client import), `package.json` (`@neondatabase/serverless` dep + `rotate:neon` script), `.env.defaults`, `.claude/settings.json`, `SUBPROCESSORS.md`
- **Retained**: `vendor/neon/` (mirrored docs — historical reference, no code paths read it), `seeds/citations/neon-branching.md` (historical)

## Consequences

- `ALLOYDB_DATABASE_URL` replaces `NEON_DATABASE_URL`. Local dev without AlloyDB Omni still works: both clients gate on the env var and skip gracefully when unset.
- `CREATE DATABASE keng_pr_<N> TEMPLATE keng_base` runs in O(seconds) on 8-CPU hardware — functionally equivalent to Neon branching.
- No external subprocessor for DB branching. AlloyDB Omni is a local process; no data leaves the runner.
- `NEON_API_KEY` GitHub secret can be removed from the repository settings (no code reads it).
