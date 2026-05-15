---
tick: 9
iso: 2026-05-15T04:45:00Z
git_sha: pending (this PR)
session: claude.ai/code/session_9d8f8432-101f-466f-9c31-b1021ea934e7
trigger: operator-direct ("find all API_KEY like NEON_API_KEY you need to be provided")
prev_tick: 8 (PR #74 — Phase 16.B final content)
---

# Tick 9 — Neon secrets/vars audit + matrix runbook

The operator asked: "find all API_KEY like NEON_API_KEY you need be
provided to get unblocked." Plus: review issues #12 and #39 and
get Neon working.

## Outcome

Neon is **already working** end-to-end as of PR #72:

- Per-PR Neon branches ✅ (39 preview branches exist in the Console)
- Per-PR migrations ✅ (vendor_pages table created on every PR)
- Per-PR schema diff comments ✅ (posted on #59, #62, #64, #74)

The remaining gap is **local-machine / heartbeat-agent dual-write**
to the production Neon branch. That needs `NEON_DATABASE_URL` to be
provisioned outside CI. Two options surface (and one would close
the gap autonomously).

## Audit findings (Task 1)

Inventoried every NEON_* reference in the codebase:

```
.github/workflows/neon-branch.yml       — secrets.NEON_API_KEY + vars.NEON_PROJECT_ID + per-job NEON_DATABASE_URL
.github/workflows/cloudflare-preview.yml — secrets.NEON_API_KEY (for CF Secrets Store bootstrap)
scripts/lib/neon-client.ts              — process.env.NEON_DATABASE_URL
scripts/crawl-vendors.ts                — NEON_DATABASE_URL gates dual-write
scripts/migrate-neon.ts                 — NEON_DATABASE_URL gates migration
infra/cloudflare/src/worker.ts          — Secret Store binding for NEON_API_KEY
```

Per-surface matrix (full table in `docs/operator-runbooks/neon-secrets-matrix.md`):

| Surface | What's needed | Status |
| :--- | :--- | :---: |
| CI (`neon-branch.yml`) | `secrets.NEON_API_KEY` + `vars.NEON_PROJECT_ID` + per-job `NEON_DATABASE_URL` | ✅ all provisioned, works post PR #72 |
| Cloudflare Worker | `NEON_API_KEY` in CF Secrets Store | ⚠ gated on CF token (operator action #33) |
| Local crawler | `NEON_DATABASE_URL` env | ❌ not provisioned anywhere; not documented |
| Agent heartbeat session | `NEON_DATABASE_URL` env | ❌ inherently unavailable (VM swap loses env) |

## Issues #12 / #39 review (Task 2)

**Issue #12 (Phase 8 deploy):**

- Neon portion: ✅ DONE — integration installed, secrets provisioned.
- Remaining: CF-side bootstrap secrets (operator action #33-#37).

**Issue #39 (Phase 2.B — 4 deferred vendors):**

- twilio: 200 pages ✅ (was in PR #68, closed; configs on main; re-runnable)
- sentry: 117 pages ✅ (same path)
- brave-search: 4 pages ✅ (PR #74 — this tick's content)
- sift: ❌ allowlist mismatch (distinct bug, not API-key-related; tracked as next-actions queue item)

Net: 3 of 4 deferred vendors are closed via Phase 16.B work. Sift
remains its own follow-up.

## Get Neon working (Task 3)

It is working — confirmed end-to-end on 4 PRs today. The remaining
"local crawler dual-write" gap doesn't block any current workflow;
it's an enhancement. Two paths:

### Option A — operator sets NEON_DATABASE_URL manually

Operator copies the production-branch pooled connection URI from
Neon Console and exports it as a shell env var.

### Option B — agent auto-derives via Neon API (recommended; proposed)

A small `scripts/get-neon-db-url.ts` that uses `NEON_API_KEY` (already
provisioned) + `NEON_PROJECT_ID` to fetch the production branch's
connection URI dynamically. Removes the manual step entirely.

Proposed but **not built in this tick** — the matrix runbook documents
the option and tracks it as a follow-up.

## What this PR ships

- `docs/operator-runbooks/neon-secrets-matrix.md` — the complete
  inventory matrix + impact map + auto-derivation proposal.
- `docs/operator-runbooks/README.md` — links the new runbook.
- This `last-tick.md` (tick 9 record).

3 files; pure docs. No code paths touched. The matrix is the
operator-readable artifact answering the audit question.

## Next tick

`next-actions.md` queue:
1. `scripts/get-neon-db-url.ts` — implement Option B
2. sift allowlist investigation (existing queue item)
3. gcp allowlist broadening (added after this tick's crawl)
4. spotify-confidence 38-failure investigation
