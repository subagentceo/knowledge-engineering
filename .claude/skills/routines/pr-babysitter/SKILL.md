---
name: pr-babysitter
description: Use when the operator says "babysit my PRs", "fix CI on open PRs", "/loop pr-babysitter", or wants automated remediation of failing CI on open automerge-labeled PRs. Mirrors Boris Cherny's "babysitting my PRs" pattern from the public AI Ascent 2026 talk.
---

# Skill: pr-babysitter

> A `/loop` routine that watches open `automerge`-labeled PRs on `subagentceo/knowledge-engineering` and remediates CI failures using the heartbeat skill's CI-failure classifier + the `/autofix-pr` engine (Claude Code Week 15, v2.1.92).

## When to invoke

- Manually: `/routines run "5m pr-babysitter"`
- Automatically: from the orchestrator (`scripts/orchestrator.ts`) after each unit's PR is opened, to monitor merge readiness.
- As a `/loop`: `claude /loop 5m bash -c "tsx scripts/pr-babysitter.ts"` per `vendor/anthropics/code.claude.com/docs/en/whats-new.md` Week 15 ("`/loop` self-paces when you omit the interval").

## Citations

- `vendor/anthropics/code.claude.com/docs/en/whats-new.md` Week 15 (v2.1.92): `/loop` introduced
- `vendor/anthropics/code.claude.com/docs/en/whats-new.md` Week 15: "`/autofix-pr` turns on PR auto-fix from your terminal"
- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` (Auto-fix PR engine: replies to review comments, marks resolved)
- `.claude/skills/heartbeat/SKILL.md:153-165` (existing CI-failure classifier with sub-agent dispatch rules: typecheck → type-fixer, citations → @cite-fixer, dep CVE → dep-bumper)
- `docs/operator-runbooks/cloud-env-vars-contract.md` § rotation cadence (when babysitter detects a stale-secret-related CI fail, surfaces the relevant rotation runbook)
- `vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md` (Agent tool invocation for ci-fixer subagent)

## Boris Cherny pattern (from AI Ascent 2026 talk)

> "I have one that's babysitting my PRs. So like fixing CI, auto rebasing." — Boris Cherny, AI Ascent 2026

This routine implements that pattern. Boris runs dozens of these in parallel from his phone. The chassis runs ONE — single-tenant, scoped to `subagentceo/knowledge-engineering`.

## Behavior

Every 5 minutes (or whenever invoked):

1. `gh pr list --repo subagentceo/knowledge-engineering --label automerge --state open --json number,headRefName,statusCheckRollup`
2. For each PR, inspect `statusCheckRollup`:
   - **All success** → noop (auto-merge will fire via ruleset 16440994)
   - **Pending** → noop (let CI finish)
   - **Failure** → classify and act
3. Classification (delegated to ci-fixer subagent via Agent tool; spec at `scripts/orchestrator/prompts/ci-fixer.md`):
   - `verify` failure → diagnose via `gh run view --log-failed`; if typecheck or citation, dispatch fix
   - `osv-scanner` failure → CVE bump or label `blocked:cve`
   - `cloudflare-preview` failure → typically a secrets-store / rotation issue; surface `docs/operator-runbooks/ci-cd-unblock.md`
   - `neon-branch` failure → check `NEON_API_KEY` freshness; surface `npm run rotate:neon`
   - flaky → `gh run rerun --failed` (cap at 3 retries; then label `flaky`)
4. After fix attempt, `gh pr comment` with a one-line status: "✅ babysitter rerun" or "⚠️ babysitter classified as <kind>, surfaced to operator"

## Hard constraints

- NEVER bypass `verify` or `osv-scanner` with `--no-verify` or admin override
- NEVER merge a PR with unresolved CI failures (the ruleset prevents this anyway; the routine just doesn't try)
- Cap retries at 3 per PR per 24h; then escalate via `gh issue create --label kind:ci-fix-needed --assignee @<operator>`
- Skip-gracefully if the operator's `gh` CLI is not authenticated (don't crash; log and exit)

## Setup

```bash
# One-time: register the routine
/routines run "5m pr-babysitter"

# Manual invocation:
tsx scripts/orchestrator/../../.claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts --dry-run
# or
npm run loop:pr-babysitter -- --dry-run
```

## Verification

```bash
# Type-check + dry-run
test -f .claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts
tsx .claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts --dry-run
# Expected: enumerates open automerge PRs and their check status, no actions taken
```

## Rotation

The routine itself doesn't rotate. The values it consumes (gh auth token) rotate per `cloud-env-vars-contract.md`'s rotation cadence table.
