# Database migrations

Phase 13.B+ (O8). Plain SQL files applied in lexical order. Each file
is idempotent (uses `IF NOT EXISTS` guards) so re-application against
an existing branch is safe.

## Apply locally / in CI

```sh
NEON_DATABASE_URL='postgresql://...' npx tsx scripts/migrate-neon.ts
```

## Per-PR application

`.github/workflows/neon-branch.yml` runs `scripts/migrate-neon.ts`
against the freshly-created PR branch on every `pull_request` open /
sync / reopen event. The branch's `db_url_with_pooler` is piped in via
the workflow output (never logged).

## Schema

| File | Purpose |
|---|---|
| `0001_vendor_pages.sql` | `vendor_pages` table — vendor crawl results. Crawler dual-writes (filesystem + Neon) when `NEON_DATABASE_URL` is set. Frontend reads via Hyperdrive (when bound) or falls back to Workers Static Assets. |

## Why plain SQL (not a migration framework)

- Single table, single PR — no migration history to track yet.
- Per-PR Neon branches are ephemeral; we re-apply from scratch on each
  branch creation. No down-migrations needed.
- Adding a framework (Prisma, Drizzle, etc.) is reversible and cheaper
  to defer than to remove.

Citation: vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
Citation: rubrics/phase-13.md (O8)
