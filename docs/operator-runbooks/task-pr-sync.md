# Runbook: Task ↔ PR sync (`Q-<N>:` reconciliation)

> Companion to the `pr-task-reconcile` plugin skill. This is the human-readable version of the same workflow, for when you want to know what the in-session Claude is about to do before it does it.

## Context

The orchestrator spawns Claude Code tasks named `Q-<PR-number>: <subject>` to track each PR it opens. Those tasks live only in the running Claude Code session — they are NOT persisted on disk in any mutable form. When a PR merges, the spawning session is usually long gone, so the task is never marked done by the agent that opened it.

This runbook closes that loop.

## When to run

- You notice stale `Q-<N>:` tasks lingering after their PRs merged
- A new tick of the `/loop` merge-train kicks off
- A long session is wrapping up
- A PR was force-closed (not merged) and you want its task cleaned up

## Why this is a skill, not a script

Claude Code tasks are not on disk in a mutable form. The jsonl transcript under `~/.claude/projects/<hash>/` is append-only; you cannot edit a task by editing a file. The `TaskList` and `TaskUpdate` tools are only callable from inside a live Claude Code session. So there is no `scripts/sync-pr-tasks.ts` to invoke — there is only a skill that an in-session Claude executes by hand.

If you want to automate this, the automation is: kick off a Claude Code session and invoke the `pr-task-reconcile` skill.

## Workflow

1. **Open a Claude Code session** in the repo where the `Q-<N>:` tasks were spawned.
2. **Invoke the skill:** type `use the pr-task-reconcile skill` or reference it in a `/loop` tick.
3. **Watch for the table.** The agent will print a markdown table of `taskId | prNumber | prState | recommendedAction` BEFORE doing any `TaskUpdate` mutations. This is your interrupt window.
4. **Interrupt if needed.** If any row looks wrong (e.g. the agent is about to mark a task done because of a cross-repo PR-number collision), say so. The agent will skip the row.
5. **Confirm.** The agent walks the table, calling `TaskUpdate(id, status="completed")` for merged PRs and `TaskUpdate(id, status="deleted")` for closed-not-merged PRs. Open PRs are left alone.
6. **Final summary** lands as `N tasks completed, M tasks deleted, K tasks untouched.`

## Classification table

| `gh pr view` state | `merged` | Action |
|---|---|---|
| `MERGED` | `true` | Task → `completed` |
| `CLOSED` | `false` | Task → `deleted` |
| `OPEN` | `false` | Leave alone |
| gh exits non-zero | — | Report and skip |

## Failure modes

- **`gh` not authenticated as a repo collaborator** — `gh pr view` will fail with a 404. Re-auth as `alex-jadecli` (or whichever alias holds collaborator scope on the repo) before running.
- **Cross-repo `Q-<N>:` collision** — task subject says `Q-42:` but PR #42 in the current repo is unrelated. Interrupt at the table step and skip.
- **PR re-opened after this skill ran** — the task is already `completed` or `deleted`. Spawn a fresh task; do not try to revive the old one.

## See also

- `plugins/platform-engineering/skills/pr-task-reconcile/SKILL.md` — the skill itself
- `docs/CONVENTIONS.md` — outcome-driven commits; every `Q-<N>:` task should end at a declared outcome
- `vendor/anthropics/code.claude.com/docs/en/best-practices.md` — Claude Code best-practices on closing the loop
