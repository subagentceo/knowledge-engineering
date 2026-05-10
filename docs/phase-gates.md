---
title: Phase gating report
description: Per-phase dependency map. Surfaces operator-action items that block phase start.
generated-by: scripts/validate-phase-gates.ts
last-validated: 2026-05-10
---

# Phase gating report

This file is the **operator-action surface** for PR 4. It reads
`seeds/prompts/operator-2026-05-10*.md`, the operator-gating table from
PR 3's body, and `rubrics/phase-<N>.md`, and produces the table below.
Phase `N` is **blocked** when any of its gates is `pending`; otherwise
`ready` to start.

Re-generate with `npm run validate:gates`.

## Per-phase gates

### Phase 1 — Crawler infrastructure

| Gate | Required | Owner | Status |
|---|---|---|---|
| `crawlee`, `@crawlee/cheerio`, `turndown` available on npm | yes | n/a (public) | ready |
| Local Node 20+ runtime | yes | dev machine | ready |
| Network egress to vendor llms.txt URLs | yes | dev machine | ready |

**Status: READY** — Phase 1 can start immediately. No operator action.

### Phase 2 — Crawl all 12 + commit

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 1 complete | yes | agent | depends on Phase 1 |
| Repo size budget (initial cap <500 MB) | warn-only | agent | tbd |

**Status: BLOCKED by Phase 1.** No operator action.

### Phase 3 — Manifest loader + new vendor lane

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 2 complete | yes | agent | depends on Phase 2 |

**Status: BLOCKED by Phase 2.** No operator action.

### Phase 4 — Refactor 4 lanes to mirror-first

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 3 complete | yes | agent | depends on Phase 3 |

**Status: BLOCKED by Phase 3.** No operator action.

### Phase 5 — Refresh ergonomics

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 4 complete | yes | agent | depends on Phase 4 |

**Status: BLOCKED by Phase 4.** No operator action.

### Phase 6 — Codemode layer

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 5 complete | yes | agent | depends on Phase 5 |
| `@cloudflare/codemode` available on npm | yes | n/a (public) | ready |

**Status: BLOCKED by Phase 5.** No operator action.

### Phase 7 — Source discovery + plugin marketplace

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 6 complete | yes | agent | depends on Phase 6 |
| `@octokit/graphql` available + token | yes | dev machine | ready (token via OAuth in PR 4) |
| `.claude/plugins.json` declares the 3 Anthropic marketplaces | yes | **PR 4 — done** | ready |

**Status: BLOCKED by Phase 6.** No operator action.

### Phase 8 — Cloudflare Sandbox hosting (deploy)

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 7 complete | yes | agent | depends on Phase 7 |
| Install Neon's Claude/GitHub integration on `subagentceo/knowledge-engineering` | yes | **operator** | **pending** |
| Neon → Cloudflare: sync `NEON_API_KEY` + `NEON_PROJECT_ID` Worker secrets | yes | **operator** | **pending** |
| `wrangler secret put CLAUDE_CODE_OAUTH_TOKEN` | yes | **operator** | **pending** |
| `wrangler secret put GITHUB_TOKEN` | yes | **operator** | **pending** |
| Verify `wrangler secret list` excludes `ANTHROPIC_API_KEY` | yes | **operator** | **pending** |
| `wrangler deploy` succeeds | yes | agent | tbd |

**Status: BLOCKED by Phase 7 AND by 5 pending operator actions.**

### Phase 9 — ODD rubric grader

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 8 complete | yes | agent | depends on Phase 8 |
| Messages API over OAuth (no API key) | yes | existing | ready |

**Status: BLOCKED by Phase 8.** No new operator action.

### Phase 10 — Multi-agent decomposition refinement

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 9 complete | yes | agent | depends on Phase 9 |

**Status: BLOCKED by Phase 9.** No operator action.

### Phase 11 — Batched grading + optional embeddings

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 10 complete | yes | agent | depends on Phase 10 |
| Messages Batches API access (OAuth covers it) | yes | existing | ready |
| **Turbopuffer workspace + API token** | for embeddings flag | **operator** | **paid (~$64/mo), unprovisioned** |
| **Voyage AI API key** (or alternative embeddings provider) | for embeddings flag | **operator** | **pending** |
| Batched-grading-only path works without Turbopuffer/Voyage | yes | agent | tbd |

**Status: BLOCKED by Phase 10.** Embeddings flag adds 2 operator actions; the non-embeddings path needs none.

### Phase 12 — Bridge as a Connector (long-arc)

| Gate | Required | Owner | Status |
|---|---|---|---|
| Phase 11 complete | yes | agent | depends on Phase 11 |
| Operator decision: deploy Connector publicly? | yes | **operator** | **pending decision** |

**Status: DEFERRED.** Scaffold only; merge gated by operator decision.

## Summary

| Phase | Status | Blocking owner |
|---|---|---|
| 1 | **READY** | — |
| 2 | blocked | Phase 1 (agent) |
| 3 | blocked | Phase 2 (agent) |
| 4 | blocked | Phase 3 (agent) |
| 5 | blocked | Phase 4 (agent) |
| 6 | blocked | Phase 5 (agent) |
| 7 | blocked | Phase 6 (agent) |
| 8 | blocked | Phase 7 (agent) + 5 operator actions (Neon Console, secret sync, 2× wrangler secret put, verify) |
| 9 | blocked | Phase 8 (chained) |
| 10 | blocked | Phase 9 (chained) |
| 11 | blocked | Phase 10 (chained) + 2 operator actions for embeddings flag (Turbopuffer, Voyage) |
| 12 | deferred | operator decision |

**Phase 1 can start now — no operator action required.** The
heartbeat orchestrator should pick up Phase 1 as its next action after
PR 4 merges.

## Operator action checklist (pasteable)

```
# Governance / no-HITL setup (one-time, after PR 4 merges):
[ ] GitHub: GITHUB_TOKEN=<pat> npm run setup:project          (milestones + Project v2 + link issues)
[ ] GitHub: GITHUB_TOKEN=<pat> npm run setup:branch-protection (main ruleset; verify + osv-scanner required)
[ ] GitHub: (optional) set vars.COPILOT_ENABLED=true if Copilot is enabled on the repo

# Phase 8 (cloud-agent deploy):
[ ] Neon Console: install Claude/GitHub integration on subagentceo/knowledge-engineering
[ ] Neon: sync NEON_API_KEY + NEON_PROJECT_ID to Cloudflare Worker secrets AND to repo secrets (for neon-branch.yml)
[ ] Cloudflare: set repo secrets CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID, repo var CLOUDFLARE_WORKER_NAME (for cloudflare-preview.yml)
[ ] wrangler secret put CLAUDE_CODE_OAUTH_TOKEN
[ ] wrangler secret put GITHUB_TOKEN
[ ] wrangler secret list  → verify no ANTHROPIC_API_KEY

# Phase 11 (optional embeddings flag only):
[ ] Turbopuffer: provision workspace + API token
[ ] Voyage AI: sign up + provision VOYAGE_API_KEY

# Phase 12:
[ ] GitHub: decide whether Phase 12 (bridge-as-Connector) ships publicly
```

## Governance gates (PR 4)

| Gate | Required | Owner | Status |
|---|---|---|---|
| `.github/workflows/verify.yml` runs `npm run verify` on every PR | yes | **PR 4 — done** | ready |
| `.github/workflows/osv-scanner.yml` scans the lockfile on every PR + weekly | yes | **PR 4 — done** | ready |
| `.github/workflows/auto-merge.yml` enables `gh pr merge --auto --squash` on `automerge`-labeled PRs | yes | **PR 4 — done** | ready |
| Branch ruleset on `main` (verify + osv-scanner required; 0 reviewers; no direct push) | yes | **operator** runs `scripts/setup-branch-protection.ts` | **pending** |
| Heartbeat skill dispatches sub-agents on CI failure | yes | **PR 4 — done** (see `.claude/skills/heartbeat.md`) | ready |
| Repo var `COPILOT_ENABLED` set if Copilot is licensed | optional | operator | pending |

When the branch ruleset is in place AND `setup:project` has run, the
no-HITL loop is operational: the heartbeat opens a PR per phase issue,
required checks gate the merge, auto-merge fires on green, the
heartbeat handles failure events.
