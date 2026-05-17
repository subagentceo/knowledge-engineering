# ADR: Platform-engineering plugin adopts LSP + Monitors + 3-min /loop cadence

**Date:** 2026-05-16
**Outcomes:** OPE6, OPE7, OPE9
**Status:** Accepted
**Supersedes:** none. **Depends on:** OPE3 (agentskills.io SKILL conformance), OPE4 (Voyage→Turbopuffer→AlloyDB bridge), OSL1 (GoogleOSV-only security stack).

## Context

The platform-engineering plugin (PR #176, OPE1-4) shipped with 7 skills, a Docker MCP profile, an embeddings bridge, and `gen_secret.sh`. The Claude Code plugin spec at `vendor/anthropics/code.claude.com/docs/en/plugins-reference.md` defines four more surfaces we hadn't yet exercised: **LSP servers**, **Monitors**, **hooks**, and **agents**. This ADR records the decision to wire two of them — LSP + Monitors — into platform-engineering, plus three new Code Intelligence SKILL.md entries that surface the patterns, plus a /loop cadence change from 15 min to 3 min so the autonomous task loop iterates fast enough to land a PR string per session.

## Decision

### OPE6 — three Code Intelligence skills

Under `plugins/platform-engineering/skills/`, three new SKILL.md entries conform to the agentskills.io spec already followed by OPE3:

- `code-intelligence-lsp-setup` — wiring `.lsp.json`, picking a server from the canonical [microsoft/language-server-protocol implementors list](https://github.com/microsoft/language-server-protocol/blob/main/_implementors/servers.md)
- `code-intelligence-monitors` — declaring `monitors/monitors.json`, the **trigger-vs-handler split** (web-UI per `vendor/anthropics/code.claude.com/docs/en/routines.md` §218), and the **GoogleOSV-only invariant** (OSL1)
- `code-intelligence-plugins-discover` — discover/install/audit marketplace plugins; extend-vs-fork decision tree

`plugin.json` registers all 3.

### OPE7 — `.lsp.json` + `monitors.json`

`plugins/platform-engineering/.lsp.json` ships with `typescript-language-server` as the active entry (it's already a transitive chassis dep). Pyright/gopls/rust-analyzer live in a `_stubs_pending_install` block with install hints, so the file is a one-key uncomment away from each language being live.

`plugins/platform-engineering/monitors/monitors.json` declares one monitor (`gh-pr-opened`) wiring the existing `github-repo-security-review` skill (OSL1) to the `github.pull_request.opened` event. The trigger itself is configured in `claude.ai/code/routines` per the operator runbook at `docs/operator-runbooks/github-event-routine-setup.md` — this JSON only declares the local handler shape.

A new test `src/lib/platform-engineering-lsp.test.ts` asserts both files parse, declare valid entries, and preserve two invariants:
- **OAuth-only**: neither JSON may reference `ANTHROPIC_API_KEY`
- **GoogleOSV-only**: monitors.json may not reference `secret_scanning_*` or `dependabot_security_updates` (per OSL1)

### OPE9 — /loop cadence 15m → 3m

The autonomous task loop runs `*/3 * * * *` instead of the previous `*/15 * * * *`. Rationale:

- A PR through the auto-merge train serializes through `strict_required_status_checks_policy: true`; each merge rebases the rest. A 15-min cadence meant ~3-4 attempts per hour — too slow for a 25-subtask PR string.
- 3 min keeps the cron firing inside the 5-minute prompt-cache window, so cache stays warm.
- 3 min is the lowest cadence that still leaves the agent time to do real work between fires (network round-trips, npm install, crawl) without blowing up the queue.

The cron change is a **runtime action** (CronDelete + CronCreate, session-only) — the ADR records the rationale so a future agent doesn't restore 15m.

## Invariants preserved

- **OAuth-only** — no PR in OPE5-9 introduces `ANTHROPIC_API_KEY` consumption. `CLAUDE_CODE_OAUTH_TOKEN` only.
- **GoogleOSV-only** (OSL1) — `scripts/verify-security-posture.ts` continues to gate the verify chain. PR-3's monitors.json lint check enforces the invariant at the plugin layer.
- **Outcome-driven Conventional Commits** — every commit in OPE5-9 ends with `(OPE<N>)`.
- **TDD discipline** — every PR ships with `@tdd red|green|refactor` headers; `npm run verify:tdd` enforces.
- **Citation discipline** — every new test has `@cite` pointing under `vendor/`, `seeds/`, or `rubrics/`.

## Citations

- [agentskills.io specification](https://agentskills.io/specification) — mirrored at `vendor/agentskills/agentskills.io/specification.md`
- `vendor/anthropics/code.claude.com/docs/en/plugins-reference.md` — LSP §, Monitors §
- `vendor/anthropics/code.claude.com/docs/en/plugins.md` — plugin overview
- `vendor/anthropics/code.claude.com/docs/en/remote-control.md` — monitor declaration shape
- `vendor/anthropics/code.claude.com/docs/en/routines.md` — §218 web-UI trigger constraint
- `vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md` — observability adjacency
- `vendor/anthropics/code.claude.com/docs/en/discover-plugins.md` — discovery flow
- `vendor/anthropics/code.claude.com/docs/en/plugin-marketplaces.md` — distribution
- `vendor/anthropics/code.claude.com/docs/en/plugin-dependencies.md` — transitive deps + pinning
- `vendor/osv-scanner/google.github.io/osv-scanner/github-action/index.md` — GoogleOSV cite (OSL1 substrate)
- `docs/decisions/2026-05-16-osv-only-no-secret-scanning.md` — OSL1 ADR (cross-ref, not in citation-guard scope)
- `docs/operator-runbooks/github-event-routine-setup.md` — operator-side clickthrough for the GitHub-event routine

## Consequences

- **Future agent reading this**: do NOT restore 15m cadence, do NOT remove the LSP/Monitor declarations, do NOT re-enable secret_scanning_*. All three are load-bearing for the chassis posture.
- **Operator**: the monitor's GitHub trigger must be configured once in `claude.ai/code/routines` per the operator runbook for the handler to actually fire. The plugin's JSON alone is insufficient.
- **Adding a new LSP server**: edit `.lsp.json`, move the relevant stub out of `_stubs_pending_install`, ensure the binary is on PATH. No code change.
