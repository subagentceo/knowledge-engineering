---
name: pr-task-reconcile
description: >
  Reconcile in-session Claude Code tasks (the TaskList tool surface)
  against the lifecycle of the GitHub PRs they spawned. Use when an
  operator notices stale `Q-<N>:` tasks lingering after their PRs
  merged, on a new tick of the /loop merge-train, or when a long
  session is about to end and the agent should close the loop on
  every PR-bound task it created. This is an in-session skill — not
  a script — because Claude Code tasks live only in the running
  session and the jsonl transcript, not on disk where a script
  could mutate them.
license: Apache-2.0
compatibility: Designed for Claude Code sessions where the agent has spawned tasks named `Q-<PR-number>: <subject>` and wants to mark them done once the matching PR merges. Requires `gh` CLI authenticated as a repo collaborator.
metadata:
  author: alex-jadecli
  version: "0.1.0"
---

# When to invoke

- The operator notices stale `Q-<N>:` tasks that should be done by now
- A new tick of the `/loop` merge-train kicks off and you want a clean queue
- A long session is wrapping up and the agent should close the loop on every PR-bound task it created
- A PR was force-closed (not merged) and the corresponding task should not stay open

# What this skill is (and is not)

This is **a set of instructions for the in-session Claude to execute by hand using the TaskList and TaskUpdate tools plus `gh`**. It is NOT a `scripts/sync-pr-tasks.ts` you can run from a shell.

The reason: Claude Code tasks are not persisted on disk in a stable, mutable form. The jsonl transcripts at `~/.claude/projects/<hash>/` are append-only event logs, not a task database. The TaskList and TaskUpdate tools are only callable from inside a live Claude Code session. A shell script has no way to reach them. So this skill is the operator-discoverable handle: invoke the skill, and the in-session agent walks the steps below.

# Steps

The agent (you, when this skill is invoked) does the following:

1. **Enumerate tasks.** Call the `TaskList` tool to get every task in the current session.

2. **Filter to `Q-<N>:` subjects.** For each task whose subject matches the regex `^Q-(\d+):`, capture the PR number `N` and the task id.

3. **Look up the PR state.** For each captured PR number, run:

   ```sh
   gh pr view <N> --json state,merged,mergedAt,closedAt,title
   ```

   Cache results keyed by PR number so duplicate task subjects don't double-fetch.

4. **Classify.** For each `(taskId, prNumber, prJson)` tuple:

   | `prJson.state` | `prJson.merged` | Recommended action |
   |---|---|---|
   | `MERGED` | `true` | `TaskUpdate` → `status=completed`, comment naming the merged-at timestamp |
   | `CLOSED` | `false` | `TaskUpdate` → `status=deleted`, comment naming "PR closed without merge" |
   | `OPEN` | `false` | Leave the task alone (still in flight) |
   | gh exits non-zero (PR not found / cross-repo) | — | Report and skip; do NOT mutate the task |

5. **Emit the table first, mutate second.** Before calling any `TaskUpdate`, print a short markdown table to the conversation:

   ```
   | taskId | prNumber | prState | recommendedAction |
   |---|---|---|---|
   ```

   This lets the operator interrupt before destructive mutations land.

6. **Mutate.** After the table is visible, walk the recommended actions:
   - For each `MERGED` row, call `TaskUpdate(id, status="completed")`.
   - For each `CLOSED-not-merged` row, call `TaskUpdate(id, status="deleted")` with a comment naming why.
   - Leave `OPEN` and errored rows untouched.

7. **Summary.** End with a count: `N tasks completed, M tasks deleted, K tasks untouched.`

# Edge cases the agent should handle

- **Task subject like `Q-123: fix something — wip`**: still matches; the regex anchors only the prefix.
- **Multiple tasks pointing at the same PR**: classify each independently. They likely all want the same action.
- **A `Q-<N>:` task whose PR is in a different repo**: `gh pr view <N>` resolves against the cwd repo. If it fails, fall back to `gh pr view <url>` if the task body contains a PR URL; otherwise report and skip.
- **No `Q-<N>:` tasks present**: print "Nothing to reconcile" and exit. Don't error.

# Why this lives in a plugin skill, not a slash command

A slash command would invoke this skill anyway. The skill form is portable across orchestrator/sub-agent boundaries and discoverable via `claude plugins list --skills`. Slash commands are session-local.

# Citations

- [`vendor/anthropics/code.claude.com/docs/en/best-practices.md`](../../../../vendor/anthropics/code.claude.com/docs/en/best-practices.md) — Claude Code best-practices on closing the loop on in-flight work
- [`seeds/citations/define-outcomes.md`](../../../../seeds/citations/define-outcomes.md) — outcome-driven discipline: every spawned task should resolve to a declared outcome (merged PR or explicit abandonment)
- [`docs/operator-runbooks/task-pr-sync.md`](../../../../docs/operator-runbooks/task-pr-sync.md) — human-readable runbook covering the same workflow
