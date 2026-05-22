---
title: Governance
description: Branch protection, auto-merge, CI strategy, dispatch behavior. Operator-removed-from-HITL.
---

# Governance

Cited from `seeds/prompts/operator-2026-05-10-autonomy.md`. This file is
the operator-facing summary of what the no-HITL loop looks like once
the branch ruleset is created and the heartbeat is running.

## TL;DR

- `main` is protected. Direct pushes blocked. PRs required.
- CI must pass before merge.
- **PRs open ready-for-review by default.** Drafts only for code
  literally not ready for merge (in-progress, known-broken, dependency
  missing). "Waiting for CI" is NOT a reason to be a draft; it's the
  normal post-open state.
- **Every PR Claude opens gets the `automerge` label.** GitHub's
  auto-merge state machine takes over from there.
- Merge method: **rebase** (linear history; mirrors anthropics/* public
  repos where Claude writes 100% of code).
- CI failure → Claude pushes a fix directly. The heartbeat is *Claude*,
  not the operator. Only escalate when blocked by an external system
  (token mint, network outage).
- The operator is a tiebreaker, not a reviewer. **The operator is NOT in
  the merge loop.** See `docs/decisions/2026-05-22-autonomy-merge.md`
  (OAUTONOMY1) for the full contract.

## Branch ruleset

`scripts/setup-branch-protection.ts` (operator-run) creates a Repository
Ruleset on `main` with:

| Setting | Value |
|---|---|
| target | `main` |
| pull-request required | yes |
| required reviewers | 0 (no HITL) |
| dismiss stale reviews on push | yes |
| require last reviewer to be different from author | n/a (no reviewers required) |
| require status checks before merge | yes |
| required checks | `verify`, `osv-scanner` (optional Neon/CF/Copilot if enabled) |
| require branches up to date before merge | yes |
| disallow direct pushes | yes (bypass list: empty) |
| disallow force pushes | yes |
| allow auto-merge | yes |
| allow squash merge | no |
| allow merge commit | no |
| allow rebase merge | yes (default) |

Why no reviewers required: the heartbeat is the reviewer. It runs
sub-agent verifiers per the rubrics before opening the PR, and CI
re-runs them on every push. Adding a human reviewer reintroduces the
HITL the operator explicitly disabled.

## CI strategy

Eight workflows in `.github/workflows/`:

| Workflow | Purpose | Required? |
|---|---|---|
| `verify.yml` | `npm run verify` end-to-end | **yes** |
| `osv-scanner.yml` | Lockfile vulnerability scan | **yes** |
| `claude-code-review.yml` | Auto-review every PR via `anthropics/claude-code-action` + code-review plugin | advisory (posts comments; does not block merge) |
| `claude.yml` | Respond to `@claude` mentions in issues + PR comments + reviews | utility (event-driven dispatch surface) |
| `neon-branch.yml` | Per-PR Neon DB branch | optional (inert without `NEON_API_KEY`) |
| `cloudflare-preview.yml` | Per-PR Cloudflare Worker preview | optional (inert without `CLOUDFLARE_API_TOKEN`) |
| `copilot.yml` | Copilot Autofix + issue handoff | optional (inert without `vars.COPILOT_ENABLED`) |
| `auto-merge.yml` | Enable auto-merge on `automerge`-labeled PRs | utility |

The required workflows must pass for `auto-merge.yml` to fire. Optional
workflows are advisory but non-blocking. Claude review is also advisory
— Claude posts comments; the operator does NOT review; CI gates merge.

## Two-surface dispatch model

The no-HITL loop has two coordinating AI surfaces:

| Surface | Where it runs | Triggered by | Citation |
|---|---|---|---|
| **Heartbeat orchestrator** | This session (Claude Code on a developer/CI machine) | Time-based (cron via `/schedule`) and event-based (subscribe_pr_activity webhooks) | `.claude/skills/heartbeat.md` |
| **Claude Code Action** | GitHub Actions runner | PR open/sync/reopen → auto-review; `@claude` mention → directive execution | `.github/workflows/{claude,claude-code-review}.yml` |

Both consume the same PR-activity events. They coordinate via comments:

- The heartbeat dispatches a fix by posting `@claude please ...` to a PR.
  `claude.yml` fires, executes the directive, pushes a commit, the
  heartbeat sees the new push event and re-checks CI.
- Claude review posts findings as PR comments. The heartbeat reads
  those comments (via `pull_request_read.get_review_comments`) and
  either acts on tractable suggestions or escalates to the operator
  per the classifier table.

This is the operationalized Boris Cherny pattern: the heartbeat
**orchestrates**; claude-code-action **executes** discrete directives
in a fresh CI environment with its own OAuth-scoped permissions.

## Auto-merge state machine

```
heartbeat opens PR
       │
       ▼
 labels: automerge
       │
       ▼
auto-merge.yml fires →   gh pr merge --auto --squash
       │
       ▼
[ GitHub waits for required checks ]
       │
       ├── verify.yml green ─────────┐
       └── osv-scanner.yml green ────┤
                                     ▼
                          PR auto-merges (squash)
```

If a required check fails:

```
required check FAIL
       │
       ▼
github-webhook-activity event (subscribed via plugins.json: pr-activity)
       │
       ▼
heartbeat reads classify(failure):
       │
       ├── lint failure → spawn lint-fixer sub-agent, push, retry CI
       ├── typecheck failure → spawn type-fixer sub-agent, push, retry
       ├── test failure → spawn test-fixer sub-agent, push, retry
       ├── OSV CVE finding → spawn dep-bumper sub-agent, push, retry
       ├── verify:gates failure → docs/phase-gates.md drift; spawn
       │                          gates-syncer sub-agent
       └── verify:citations failure → spawn @cite-fixer sub-agent
       │
       └── unclear / multi-cause / >N retries → post a question to
                                                the PR, leave for
                                                operator to break ties
```

`N` = 3 by default (per `define-outcomes.md` cap of 5 for grading, but
3 for fix loops keeps blast radius small).

## Operator role

The operator's job becomes:

1. **One-time setup** (per `docs/phase-gates.md`):
   - Run `npm run setup:project` to create the GitHub Project + milestones.
   - Run `scripts/setup-branch-protection.ts` to create the ruleset.
   - Sync Neon → Cloudflare secrets (Phase 8).
   - Provision Turbopuffer + Voyage if Phase 11 embeddings flag is wanted.
2. **Tiebreaker**: respond to questions the heartbeat posts on PRs when
   a fix is ambiguous.
3. **Strategic direction**: future operator prompts continue to land as
   `seeds/prompts/operator-*-*.md` seed files.

That's it. No PR reviews, no CI babysitting, no merge approvals.

## Boris Cherny long-arc dogfooded

Once branch protection + auto-merge + heartbeat dispatch are live, the
public Anthropic pattern of "Workers-resident agents writing the
codebase end-to-end" is operationally true for this repo:

- The agent opens PRs.
- CI gates merges.
- Auto-merge fires on green.
- The heartbeat resolves failures organically.
- The operator's surface area shrinks to one-time setup + tiebreaks.

This is the working definition of "100% of the code written by the
agent" — humans set the rules, agents do the work.
