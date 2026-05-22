---
template: pr-task
version: 1
applies-to: every open PR in this repo
loaded-by: Claude session orchestrator (in-session TaskCreate)
cites:
  - vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
  - https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md
  - rubrics/phase-A2A.md
---

# Deterministic PR-task template

A single Claude session manages every open PR in this repo. This template defines the **task-queue schema** for one PR. Every PR-tracking task in the session must conform to it so future sessions (post-rotation across the 3 Max accounts) can pick up without re-deriving structure.

## Required task fields

Every `TaskCreate({ subject, description, metadata })` for a PR must populate:

```yaml
subject: "PR: <O-tag> <one-line>"
activeForm: "<verb-ing> <O-tag>"
description: |
  Closes #<issue-or-issues>.
  <one-paragraph outcome statement>.

  Validation: <how to grade this PR before merge>.

  Branch: <branch-name>.
metadata:
  pr_number: <int>            # GitHub PR number
  issue_numbers: [<int>...]   # closing-issue refs
  base_branch: main           # or non-main if train
  head_branch: <string>
  o_tag: "<O-tag>"            # OBLOG.fidelity, OA2A1, etc.
  mergeable: clean|blocked|dirty|behind|unknown
  blocked_by: [<task_id|pr_number>...]
  rebase_strategy: rebase-on-main-merge   # one of: rebase-on-main-merge, train-rebase, bot-regenerate
  treatment: keep|refactor|close|supersede   # one of these four
  rubric_section: rubrics/phase-<NAME>.md#<section>   # if criterion-graded
  eval_test: src/lib/<name>.test.ts                   # if has automated eval
  last_reviewed: YYYY-MM-DD
```

## Rebase strategy decision table

| Base branch | Bot? | Strategy |
|---|---|---|
| main | no | `rebase-on-main-merge` — rebase head branch onto main whenever ANY main commit lands |
| non-main (train) | no | `train-rebase` — rebase onto the train base branch only; main rebase happens at train merge |
| main | yes (dependabot/release-please) | `bot-regenerate` — the bot rewrites the branch on push; Claude only validates, doesn't rebase |

## Treatment decision table

| treatment | meaning | when to use |
|---|---|---|
| keep | proceed as-is | small, clear-outcome PR, no rework needed |
| refactor | edit head branch before merge | content drifted, eval rubric needs adapting, conflicts with newer pattern |
| close | gh pr close --comment | self-declared "never-merge" drafts, superseded work, abandoned trains |
| supersede | close in favor of another open PR | duplicate work; reference the canonical PR in the close comment |

## Rubric/eval linkage

PRs that introduce **new behavior** must cite a rubric section (`rubric_section` field) and link an eval test (`eval_test` field). PRs that are pure rebases, doc updates, or bot bumps may leave both null.

Rubric format follows `rubrics/phase-A2A.md` (frontmatter + numbered criteria, each with measure + threshold + grader).

## How a session uses this template

1. Read all open PRs via `gh pr list --json ...`
2. For each PR, decide treatment per the table.
3. For each kept/refactor PR, build the `metadata` block, create the task with `TaskCreate`.
4. For each `close` / `supersede`, run `gh pr close` with a comment naming the canonical replacement, then create a single completed task documenting the closure.
5. On every `git push origin main` (i.e. when something merges to main), walk every task with `rebase_strategy: rebase-on-main-merge` and run the rebase.
6. Bot PRs (rebase_strategy: bot-regenerate) are watched, not rebased; the bot does it.

## Session-rotation contract

The task queue with these `metadata` fields IS the handoff. When the next Claude session starts on a different Max account, reading `TaskList` + `metadata.pr_number` gives full state — no separate `pending.md` needed.

Older `docs/pending.md` and live-tracking PRs (#240-style) are made redundant by this template. They should be closed when their content is reflected in the task queue.

## Refactor checklist (when treatment = refactor)

When applying treatment=refactor to a PR, evaluate it against the current `CLAUDE.md` A2A directive (PR #254 substance, even if not merged):

- [ ] Has `@cite` in any new test files (per scripts/lib/citation-guard.ts)
- [ ] Commits end with `(O<TAG>)` per `docs/CONVENTIONS.md`
- [ ] No half-implementations
- [ ] No defensive code at internal boundaries
- [ ] No what-it-does comments (only WHY)

PRs that predate the A2A directive (anything older than PR #254 timestamp) may legitimately not conform; flag the gap in the task's `description` and decide whether to refactor or grandfather.

## Citations

- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md` — outcome-driven session model
- `https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md` — eval design (Specific/Measurable/Achievable/Relevant)
- `rubrics/phase-A2A.md` — exemplar rubric this template's `rubric_section` field points at
- PR #254 — A2A directive (writing style)
- PR #258 — A2A rubric+eval (template's grading example)
- Issue #259 — OBLOG parent (template's first multi-sub-issue application)
