---
title: pending.md
description: Live dashboard of every pending action — operator browser-driven, operator CLI-driven, autonomous agent follow-up. The operator's explicit ask in Phase 15: "make it more clear what operator runbooks and claude-in-chrome actions you are waiting on."
last-reviewed: 2026-06-04
---

# Pending actions

> Single-pane-of-glass view of what blocks forward progress. Cited from
> `vendor/anthropics/claude.com/docs/cowork/guide/dispatch.md` ("child
> tasks appear under the Dispatch group with their own status").
>
> Re-validate via `npm run verify:gates` (existing) + future
> `npm run verify:project` (Phase 15.D). Refresh after every PR merge or
> operator-runbook completion.

## Column 1 — Operator browser-driven (Claude-in-Chrome runbooks)

These are operator actions that an authenticated browser session can drive end-to-end via paste-into-`claude --chrome` prompts (Opus 4.7 recommended). Cited from `vendor/anthropics/code.claude.com/docs/en/chrome.md`.

| Issue | Runbook | Outcome | Time | Status |
|---|---|---|---|---|
| [#33](https://github.com/subagentceo/knowledge-engineering/issues/33) | [`cf-api-token.md`](./operator-runbooks/cf-api-token.md) | `secrets.CLOUDFLARE_API_TOKEN` (Workers Scripts Edit + Secrets Store Write) | ~5 min | 🟡 pending |
| [#34](https://github.com/subagentceo/knowledge-engineering/issues/34) | [`cf-account-id.md`](./operator-runbooks/cf-account-id.md) | `secrets.CLOUDFLARE_ACCOUNT_ID` + `vars.CLOUDFLARE_WORKER_NAME` | ~3 min | 🟡 pending |
| [#35](https://github.com/subagentceo/knowledge-engineering/issues/35) | [`voyage-api-key.md`](./operator-runbooks/voyage-api-key.md) | `secrets.VOYAGE_API_KEY` (Phase 11.C only — OPTIONAL) | ~10 min | 🟡 pending (optional) |
| [#36](https://github.com/subagentceo/knowledge-engineering/issues/36) | [`code-scanning-toggle.md`](./operator-runbooks/code-scanning-toggle.md) | GH Code scanning enabled; flip `upload-sarif: true` | ~2 min | 🟡 pending |
| [#37](https://github.com/subagentceo/knowledge-engineering/issues/37) | [`github-pat.md`](./operator-runbooks/github-pat.md) | Fine-grained PAT + run `setup:project` + `setup:branch-protection` | ~8 min | 🟡 pending |
| [#38](https://github.com/subagentceo/knowledge-engineering/issues/38) | [`connector-decision.md`](./operator-runbooks/connector-decision.md) | Phase 12: ship as Connector — yes/no/postpone | reading + decision | 🟡 pending |
| TBD (Phase 13.B+ O5) | [`cf-flagship-setup.md`](./operator-runbooks/cf-flagship-setup.md) | Cloudflare Flagship `outcomesdk-chassis` app + `color-code` flag (8 variations) → app_id pinned in `wrangler.jsonc` | ~5 min | 🟡 pending |
| TBD (Phase 13.B+ O7) | [`outcomesdk-domain.md`](./operator-runbooks/outcomesdk-domain.md) | Verify `CLOUDFLARE_API_TOKEN` has `Zone:Edit` on outcomesdk.com (extends existing token) | ~3 min | 🟡 pending |
| TBD (Phase 13.B+ O8) | [`neon-hyperdrive-setup.md`](./operator-runbooks/neon-hyperdrive-setup.md) | Cloudflare Hyperdrive config `outcomes-db` → frontend reads vendor_pages with sub-ms edge latency | ~5 min | 🟡 pending |

**Total operator browser surface: 9 runbooks (8 required + 1 optional). Sum of estimated time: ~41 min of operator attention.**

## Column 2 — Operator CLI-driven (after column 1)

These run after the corresponding browser runbook completes:

| Trigger | Command | Why |
|---|---|---|
| #37 done (PAT in clipboard) | `GITHUB_TOKEN=<pat> npm run setup:project` | Creates GH Project v2 + 12 milestones + links existing issues |
| #37 done (PAT in clipboard) | `GITHUB_TOKEN=<pat> npm run setup:branch-protection` | Creates `Protect main — no HITL` Repository Ruleset |
| #36 done (code scanning enabled) | (one-line PR auto-opened by heartbeat) | Flip `upload-sarif: false → true` in `.github/workflows/osv-scanner.yml` |

## Column 3 — Autonomous agent follow-ups (no operator gate)

These are issues the heartbeat orchestrator picks up in a future session. Each can be worked WITHOUT operator action.

### Phase 12 (closeout follow-ups; operator-decision-gated only)

| Issue | Subject | Depends on |
|---|---|---|
| ✅ #39 | Phase 2.B — crawl 4 deferred vendors (brave-search, sentry, sift, twilio) | closed 2026-05-15 |
| ✅ #40 | Phase 6.B — codemode wiring in src/agent/run.ts (split → #102 + #103) | closed 2026-05-15 |
| ✅ #41 | Phase 7.B — install-plugins.ts real materializer | closed 2026-05-15 via PR #86 |
| ✅ #42 | Phase 11.B — `--batch-submit` + `--batch-collect` for live Anthropic Batches API | closed 2026-05-15 via PR #88 |

### Phase 13 (content surfaces beyond docs + crawler modernization)

| Issue | Subject | Depends on |
|---|---|---|
| ✅ #45 | Phase 13.A — conditional GET (RFC 7232) + content-hash skip-write | closed 2026-05-10 |
| ✅ #46 | Phase 13.B — anthropic.com mirror | shipped via PR #161 as `vendor/anthropic-sitemap/` (sitemap-driven, 369 URLs, replaces narrower `vendor/anthropic-engineering/`) |
| ✅ #47 | Phase 13.C — claude.com/blog | shipped via PR #160 as `vendor/claude-sitemap/blog/` (129 posts via sitemap; replaces 4-category html-index discovery) |
| ✅ #48 | Phase 13.D — 4 marketing surfaces | shipped via PR #160 as `vendor/claude-sitemap/{customers,plugins,connectors,resources}/` (folded into consolidated mirror) |

### Phase 14 (docs refresh + RUNBOOK.md)

| Issue | Subject | Depends on |
|---|---|---|
| ✅ #49 | Refresh CLAUDE.md/DEVELOPER.md/README.md + new CONTRIBUTING.md + new RUNBOOK.md | closed 2026-05-15 via PRs #89/#92/#99 |

### Phase 15 (this milestone)

| Issue | Subject | Depends on |
|---|---|---|
| ✅ #50 | Phase 15 — codify project management (`PROJECT.md`/`pending.md`/heartbeat) | closed 2026-05-10 |

### v0.5.0 loop tasks (V040_LOOP_TASKS — all achieved ✅)

All 6 tasks shipped as of 2026-06-04-T4:

| SemVer | Title | Status |
|---|---|---|
| v0.5.0-O1 | ke-loop-orchestrator CCR wired + firing | ✅ achieved (PR #346) |
| v0.5.0-O2 | ke-coworker-data CCR routine (4h vendor refresh) | ✅ achieved (PR #349) |
| v0.5.0-O3 | ke-coworker-prompt CCR routine (opus-4-8 eval loop) | ✅ achieved (PR #351) |
| v0.5.0-O4 | connector consensus via D1 (majority quorum) | ✅ achieved (PR #342) |
| v0.5.0-O5 | cross-session KG writes via mailbox D1 adapter | ✅ achieved (PR #354) |
| v0.5.0-O6 | coworker-verifier: dogfood pr-review-toolkit | ✅ achieved (PR #353) |

### Phase 0 sub-tasks (firehose triage — autonomous, no operator gate)

See `docs/firehose/triage-2026-06-04.md` for full triage. Top Phase 0 items:

| Task | Description | Status |
|---|---|---|
| t14-1 | @anthropic-ai npm package catalog | 🟡 pending |
| t13-1 | WSL2 Ubuntu-26.04 Dockerfile + setup.sh | 🟡 pending |
| t12-2 | OMA OAuth patch (ANTHROPIC_API_KEY→CLAUDE_CODE_OAUTH_TOKEN) | ✅ doc shipped (PR #OMA) |
| t12-1 | Vendor open-managed-agents README + architecture | 🟡 pending |
| t11-4 | Plugin manifest schema (Skills+Connectors+Agents) | 🟡 pending |
| t10-2 | 4-domain product architecture doc | 🟡 pending |

## Suggested execution order

```
operator parallel:
  1. #36 code-scanning toggle (2 min) ──────────┐
  2. #34 CF account-id (3 min)                  │
  3. #33 CF api-token (5 min)                   ├─ ~30 min total
  4. #37 GH PAT + setup scripts (8 min)         │
  5. #38 Connector decision (read + decide)     │
  6. (optional) #35 Voyage key (10 min)         ┘

agent:
  → #45 (anchor) → #46 + #47 + #48 (parallel after #45)
  → #49 (parallel; docs)
  → #39 + #40 + #41 + #42 (parallel; can start anytime)
  → Phase 11.C activates after #35 + #45 land
```

After the 5 required operator runbooks complete: `npm run verify:gates` reports **0 operator actions pending**. After the autonomous follow-ups land: every phase rubric `status: done` and the chassis is feature-complete per `PRODUCTRD.md`.

## How to update this file

- After every runbook completes: flip 🟡 → ✅ + add the merge commit SHA
- After every issue closes: cross out the row
- After every new operator/agent ask: append a row in the right column
- A future `scripts/render-pending.ts` (Phase 15.D, optional) can auto-generate from GH issue labels (`needs:operator`, `kind:agent-followup`, `kind:operator-runbook`)
