# Neon database branching — citation extract

Source: `vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md` (mirrored).

> Each time you issue a prompt, the runner forks a copy-on-write branch
> of your database, launches a secure Cloudflare Sandbox, and runs the
> agent (Codex, Claude code, GitHub Copilot, etc.) of your choice in
> this controlled environment. The agent can then perform migrations,
> implement backend logic, and test its work without risk to staging
> or production systems.

The chassis applies the same pattern to **per-PR previews**:

- `.github/workflows/neon-branch.yml` creates `preview/pr-<N>-<slug>`
  on every `pull_request` open / sync / reopen, with a 14-day expiry.
- `scripts/migrate-neon.ts` applies `migrations/*.sql` to the fresh
  branch (Phase 13.B+ O8 wires this).
- The branch's pooled connection URL is emitted as a job output
  (`db_url_with_pooler`) — never printed in the workflow log.
- On `pull_request` close, the branch is deleted (cost-control + hygiene).

The crawler dual-writes: filesystem mirror is the source of truth;
Neon is a cache. `scripts/lib/neon-client.ts` `upsertVendorPage()` is a
no-op when `NEON_DATABASE_URL` is unset (local dev path). When set
(CI / production), every successfully-fetched page is UPSERTed into
the `vendor_pages` table.

Why dual-write and not Neon-only:

- The filesystem mirror is committed to git; the audit trail is
  visible per-PR and `git diff` highlights vendor drift.
- Local dev doesn't need Neon — the same crawler runs offline.
- Per-PR Neon previews give the frontend a snapshot of the PR's
  vendor state without an extra build step.

Citation: vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
Citation: rubrics/phase-13.md (O8)
