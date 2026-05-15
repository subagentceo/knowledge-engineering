---
title: neon-secrets-matrix
description: Complete inventory of every NEON_* secret, var, and env var the chassis touches. Answers the operator's audit ask "find all API_KEY like NEON_API_KEY you need to be provided to get unblocked." Covers CI, local dev, Cloudflare Worker, and the agent's heartbeat sessions.
issue: 12 (Phase 8) + 39 (Phase 2.B) — refs only; doesn't close either
estimated_time: ~5 min to read; ~10 min for operator to verify provisioning
phase: 8 + 13.B+ O8
---

# Operator runbook: Neon secrets + variables matrix

## Why this exists

After this session's diagnostic chain (PRs #58 → #72 → #74) closed the
Neon CI flow, the operator asked: *"find all API_KEY like NEON_API_KEY
you need to be provided to get unblocked."*

This file is the complete inventory. Per-surface, what each NEON_*
identifier is, where it lives, how it's provisioned, whether it's
currently in place, and what blocks if it isn't.

Cited from:

- `https://neon.com/docs/guides/neon-github-integration.md` —
  authoritative source for `NEON_API_KEY` + `NEON_PROJECT_ID`.
- `https://neon.com/docs/introduction/branching.md` — Neon's branching
  model (the per-PR pattern we use).
- `seeds/citations/vendor-graph-v2.xml` (entity id=`neon`)
- `seeds/memory/heartbeat/decisions.md` D8, D9 (Neon Layer 1/Layer 2)

## The matrix

| Identifier | Where it lives | How provisioned | Status today | Blocks if missing |
| :--- | :--- | :--- | :---: | :--- |
| `secrets.NEON_API_KEY` | GitHub repo secret | Neon GitHub Integration (auto) | ✅ provisioned | every CI Neon op |
| `vars.NEON_PROJECT_ID` | GitHub repo variable | Neon GitHub Integration (auto) | ✅ provisioned (`divine-cloud-27295848`) | every CI Neon op |
| `NEON_DATABASE_URL` env (in `neon-branch.yml`) | per-job env | `create-branch-action@v5` output `db_url_with_pooler` | ✅ working post PR #72 (ws constructor wired) | Run Migrations + dual-write |
| `NEON_DATABASE_URL` env (local dev) | operator's shell | **operator must export** (one-shot) OR derive via API | ❌ not documented | local crawler dual-write |
| `NEON_DATABASE_URL` env (agent session) | the Claude session VM | not available (VM is swapped; secrets don't persist) | ❌ inherently unavailable | agent-driven dual-write |
| `NEON_API_KEY` (Cloudflare Worker secret) | CF Secrets Store binding | `cloudflare-preview.yml` `bootstrap-secrets` job | ⚠ gated on `secrets.CLOUDFLARE_API_TOKEN` (operator action #33) | Worker reads from Neon |
| Hyperdrive config `outcomes-db` | Cloudflare account | one-time operator runbook (`neon-hyperdrive-setup.md`) | ⚠ pending | sub-ms edge reads |

## What's actually unblocked vs blocked

### ✅ Fully unblocked (no operator action needed)

1. **Per-PR Neon branches** — `neon-branch.yml` opens a fresh branch on
   every PR. 39 preview branches exist in the Neon Console as
   evidence.
2. **Per-PR migrations** — `migrate-neon.ts` runs `migrations/*.sql`
   against the fresh branch. Confirmed working on PRs #59, #62, #64,
   #74 post-PR-#72.
3. **Per-PR schema diff** — `schema-diff-action@v1` posts a `vendor_pages`
   delta vs production on every PR. Confirmed.

### ⚠ Partially unblocked (the answer to the operator's audit)

4. **Local-machine crawler dual-write to production Neon branch.**

   `scripts/crawl-vendors.ts` checks `process.env.NEON_DATABASE_URL`
   and dual-writes via `upsertVendorPage` if set. **The env var is
   not provisioned anywhere outside the per-PR CI workflow.**

   To unblock: the operator (or future heartbeat-with-secret-access)
   needs to set:

   ```sh
   export NEON_DATABASE_URL="postgres://<role>:<password>@<host>-pooler.<region>.neon.tech/neondb?sslmode=require"
   ```

   Source of the URL: **Neon Console → project
   `divine-cloud-27295848` → branch `production` → Connection
   Details → "Pooled connection"** (copy the full string).

   Alternative: derive it dynamically via the Neon API using the
   already-provisioned `NEON_API_KEY`. See "Auto-derivation"
   below for a proposed `scripts/get-neon-db-url.ts`.

### ❌ Blocked on operator (CF-side)

5. **Cloudflare Worker reads from Neon** — needs
   `secrets.CLOUDFLARE_API_TOKEN` (operator action #33) before
   `cloudflare-preview.yml`'s `bootstrap-secrets` job can push
   `NEON_API_KEY` into CF Secrets Store.
6. **Hyperdrive edge cache** — separate runbook
   (`neon-hyperdrive-setup.md`); a Cloudflare Hyperdrive config named
   `outcomes-db` pointing at the Neon `production` pooler URL.

## What blocks what (impact map)

| If missing | What stops working |
| :--- | :--- |
| `secrets.NEON_API_KEY` | All CI workflows; create-branch / delete-branch / schema-diff |
| `vars.NEON_PROJECT_ID` | Same as above |
| `NEON_DATABASE_URL` (per-PR, in CI) | `Run Migrations` step (cascades: schema-diff job fails) |
| `NEON_DATABASE_URL` (local) | `npm run crawl:vendor` does the FS mirror but skips Neon dual-write. Crawler reports `neonEnabled() = false`; everything else still works. Acceptable degradation. |
| `secrets.CLOUDFLARE_API_TOKEN` | Worker deploy + CF Secrets Store bootstrap (Phase 8 blockers, separate from Neon) |

## Auto-derivation (proposed; not in this PR)

The agent could derive `NEON_DATABASE_URL` at runtime instead of
requiring the operator to provision it manually:

```ts
// scripts/get-neon-db-url.ts (proposed)
//
// Fetches the production branch's pooled connection URI via the
// Neon API. Requires NEON_API_KEY (already in repo secrets) +
// NEON_PROJECT_ID (already in repo vars).
//
// Citations:
//   https://api-docs.neon.tech/reference/getprojectconnectionuri

const url = `https://console.neon.tech/api/v2/projects/${NEON_PROJECT_ID}/branches`;
// GET → find branch with name="production" → get its endpoints
// GET https://console.neon.tech/api/v2/projects/${id}/connection_uri?role_name=neondb_owner&branch_id=...
//   → returns the pooled DATABASE_URL with credentials baked in
```

This lets the crawler "self-bootstrap" using only the existing
`NEON_API_KEY`. **Out of scope for this runbook; tracked as a
follow-up tick.**

## Operator action checklist (this audit)

- [x] Verify `secrets.NEON_API_KEY` is set on the repo
  ([Settings → Secrets and variables → Actions](https://github.com/subagentceo/knowledge-engineering/settings/secrets/actions))
- [x] Verify `vars.NEON_PROJECT_ID` is set to `divine-cloud-27295848`
  ([Settings → Variables](https://github.com/subagentceo/knowledge-engineering/settings/variables/actions))
- [x] Verify Neon GitHub integration is connected
  ([Integrations](https://console.neon.tech/app/projects/divine-cloud-27295848/integrations))
- [x] PR #72 merged (ws constructor wired)
- [x] PR #71 + PR #74 represent content from successful crawls
- [ ] **(decide)** Provision a local-machine `NEON_DATABASE_URL` for
  operator dev sessions
- [ ] **(decide)** Implement `scripts/get-neon-db-url.ts` (auto-
  derivation; would obviate the previous item)
- [ ] Operator action #37 — `setup:branch-protection` (closes auto-
  merge gap Layer 2)
- [ ] Operator action #33 — `secrets.CLOUDFLARE_API_TOKEN` (closes
  Phase 8 CF deploy)

## Closes / refs

This runbook is a **read-only inventory**. It doesn't close issues:

- Refs [#12](https://github.com/subagentceo/knowledge-engineering/issues/12)
  (Phase 8 deploy) — the Neon portion of #12 is satisfied; the
  remaining blockers in #12 are CF-side.
- Refs [#39](https://github.com/subagentceo/knowledge-engineering/issues/39)
  (Phase 2.B crawl 4 deferred) — twilio+sentry shipped (PRs #71,
  #68/closed but re-derivable); brave-search shipped (PR #74); sift
  is the only remaining deferral and has a distinct cause (allowlist
  mismatch, not API-key-related).

## Cross-references

- `docs/operator-runbooks/README.md` — index
- `docs/operator-runbooks/cf-api-token.md` — the CF token runbook
- `docs/operator-runbooks/neon-hyperdrive-setup.md` — Hyperdrive config
- `docs/operator-runbooks/neon-mcp-server.md` — Neon MCP setup (different
  surface; agent uses MCP, this matrix is about deploy-side env vars)
- `seeds/memory/heartbeat/decisions.md` D8, D9
- `seeds/citations/vendor-graph-v2.xml` (entity id=`neon`)
