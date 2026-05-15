---
name: ci-healer
description: Use when the operator says "heal CI", "keep CI healthy", "/loop ci-healer", or wants automated rerun-of-flakies + escalation of real failures across the most recent workflow runs (not gated to open PRs like pr-babysitter is).
---

# Skill: ci-healer

> A `/loop` routine that scans the most recent failed workflow runs on `subagentceo/knowledge-engineering`, distinguishes flakies (rerun) from real failures (escalate), and surfaces real failures to the operator. Boris Cherny's "keep CI healthy" pattern from the public AI Ascent 2026 talk.

## When to invoke

- Manually: `/routines run "10m ci-healer"`
- From `pr-babysitter` when a PR-scoped retry hits MAX_RETRIES (delegated escalation)
- As a `/loop`: `claude /loop 10m bash -c "tsx scripts/ci-healer.ts"` per `whats-new.md` Week 15

## Citations

- `vendor/anthropics/code.claude.com/docs/en/whats-new.md` Week 15 (v2.1.92: `/loop` self-paces)
- `vendor/anthropics/code.claude.com/docs/en/whats-new.md` Week 13 + v2.1.136 (auto mode + `settings.autoMode.hard_deny`)
- `.claude/skills/heartbeat/SKILL.md:153-165` (CI-failure classifier with sub-agent dispatch rules)
- `.claude/skills/routines/pr-babysitter/SKILL.md` (sibling routine; this is the not-tied-to-a-PR variant)
- `docs/operator-runbooks/cloud-env-vars-contract.md` § rotation cadence (when ci-healer detects a stale-secret-related fail, surfaces the relevant rotation runbook)

## Boris Cherny pattern

> "I have another one that keeps CI healthy. So like if there's like a flaky test or whatever, it'll it'll go and fix it." — Boris Cherny, AI Ascent 2026

## Behavior

Every 10 minutes (or whenever invoked):

1. `gh run list --repo subagentceo/knowledge-engineering --status failure --limit 20` → list of recently-failed runs
2. For each run, fetch headSha + workflow name + the failing step
3. Classify (heuristic):
   - **Flaky** if the same run id, when reran, has succeeded historically AND the failing step matches a known-flake regex (e.g., `npm ci`, `flaky` in step name)
   - **Real** otherwise
4. Action:
   - **Flaky** → `gh run rerun <id> --failed` (cap at 3 reruns/run/24h via local state file `.claude/scheduled_tasks.lock`)
   - **Real** → open an issue with `kind:ci-fix-needed` label + classification + last 20 log lines as a code block + the suggested remediation runbook
5. Idempotency: maintain a small JSON state at `~/.claude/ci-healer-state.json` recording rerun counts + last-action timestamps per (run_id, workflow) pair

## Hard constraints

- NEVER rerun a failed run more than 3 times per 24h
- NEVER auto-fix a failure by amending main (the routine is read-mostly; fixes happen via pr-babysitter on PR branches, or via operator action)
- Surface every classification as a structured log line (machine-readable) so the heartbeat can aggregate
- Skip-gracefully if `gh` unauthenticated

## Setup

```bash
# Register as a loop
/routines run "10m ci-healer"

# Manual
npm run loop:ci-healer -- --dry-run
```

## Verification

```bash
test -f .claude/skills/routines/ci-healer/scripts/ci-healer.ts
tsx .claude/skills/routines/ci-healer/scripts/ci-healer.ts --dry-run
# Expected: lists recent failed runs + classifies; no actions taken in dry-run
```

## Rotation

The routine itself doesn't rotate. Its consumed values (gh auth token) rotate per `cloud-env-vars-contract.md`.
