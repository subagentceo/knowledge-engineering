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
- PRs labeled `automerge` are merged automatically by GitHub once
  required checks go green. The heartbeat labels every PR it opens.
- CI failure → heartbeat reads the event (via `subscribe_pr_activity`),
  classifies the failure, and either (a) pushes a fix, (b) posts a
  question to the PR for the operator, or (c) skips silently if no
  action is needed.
- The operator is a tiebreaker, not a reviewer.

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
| allow squash merge | yes (default) |
| allow merge commit | yes |
| allow rebase merge | no |

Why no reviewers required: the heartbeat is the reviewer. It runs
sub-agent verifiers per the rubrics before opening the PR, and CI
re-runs them on every push. Adding a human reviewer reintroduces the
HITL the operator explicitly disabled.

## CI strategy

Six workflows in `.github/workflows/`:

| Workflow | Purpose | Required? |
|---|---|---|
| `verify.yml` | `npm run verify` end-to-end | **yes** |
| `osv-scanner.yml` | Lockfile vulnerability scan | **yes** |
| `neon-branch.yml` | Per-PR Neon DB branch | optional (inert without `NEON_API_KEY`) |
| `cloudflare-preview.yml` | Per-PR Cloudflare Worker preview | optional (inert without `CLOUDFLARE_API_TOKEN`) |
| `copilot.yml` | Copilot Autofix + issue handoff | optional (inert without `vars.COPILOT_ENABLED`) |
| `auto-merge.yml` | Enable auto-merge on `automerge`-labeled PRs | utility |

The required workflows must pass for `auto-merge.yml` to fire. Optional
workflows are advisory but non-blocking.

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
