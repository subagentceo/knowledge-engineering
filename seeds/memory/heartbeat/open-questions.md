---
title: heartbeat open questions
description: Questions for the operator that block specific actions. Add via heartbeat ticks; remove when answered (operator answer becomes a row in decisions.md).
---

# Open questions for the operator

## From Phase 14 (decomposition PR #62)

### Q1 — Web (`claude.ai/code`) MCP attachment scope

Does Web (`claude.ai/code`) attach Remote-MCP per-org or per-session?
This affects whether a Slack-triggered cloud session inherits the
operator's Neon OAuth or needs to re-auth.

**Blocks:** Phase 14 T1.7, T2.5, T4.
**Suggested resolution:** Operator runs the T2.5 smoke test in
`docs/operator-runbooks/neon-mcp-server.md` and records the answer in
the per-platform scoreboard.

### Q2 — `complete_database_migration` writeback to `migrations/`

When Claude calls `complete_database_migration` via Neon MCP, should
the applied SQL be echoed back into `migrations/000N_<name>.sql` so
the file remains the source of truth for `neon-branch.yml`'s
`Run Migrations` step?

**Blocks:** Phase 14 T3.3.
**Suggested resolution:** Default to **yes** unless the operator
disagrees; the file-based migrations are what re-runs against fresh
per-PR Neon branches.

### Q3 — Slack cloud session Neon OAuth inheritance

Does a Slack-triggered cloud session (`@Claude` mention) inherit the
operator's Neon OAuth token, or does each cloud session need its own?

**Blocks:** Phase 14 T4 entirely.
**Suggested resolution:** Test after Q1 resolves; the answer is likely
"each session re-auths" given how OAuth scopes work.

### Q4 — Scheduled-task runner

Cloud `Routines` vs Desktop scheduled tasks vs CLI cron?

**Blocks:** Phase 14 T5.1.
**Suggested resolution:** Cloud Routines — doesn't require operator's
machine to be on. But operator's call.

### Q5 — Channels plugin

Telegram vs Discord for CI failure alerts?

**Blocks:** Phase 14 T6.1.
**Suggested resolution:** Operator preference. Operator mentioned
Telegram in passing in earlier session.

### Q6 — Chrome integration scope

macOS-only initial scope, or also Linux?

**Blocks:** Phase 14 T7.1.
**Suggested resolution:** macOS only — operator's primary machine; per
the Chrome integration docs, Linux support is not yet first-class.

## From Phase 13.B+ O8 (migrate-neon failures)

### Q7 — Production Neon project boundary

If a production Neon project gets provisioned in the future, the Neon
MCP server should explicitly NOT target it (per Neon's own docs). The
runbook (`docs/operator-runbooks/neon-mcp-server.md`) names this rule.
But there's no enforcement — the operator could mis-OAuth.

**Suggested resolution:** Add a `NEON_MCP_ALLOWED_PROJECTS` env-var
allowlist to a future Neon MCP wrapper or pre-flight check. Logging
only; no action this tick.

## Process meta

### M1 — Pending.md staleness

`docs/pending.md` is dated 2026-05-10. Issues #39–#50 may be
partially-done; some are blocked on PRs that have since merged. A
heartbeat tick should refresh this from GH state.

**Not a blocker, but a quality-of-life item.**
