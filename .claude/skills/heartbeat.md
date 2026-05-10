---
name: heartbeat
description: >
  Long-running orchestrator loop spanning multiple Claude Code sessions
  with persisted memory. The lead orchestration agent reads the current
  state of the project (rubrics, milestones, open PRs, last heartbeat
  artifact), picks the next actionable task, executes it, and writes a
  durable note back to the memory store before yielding the session.
  Use when the operator wants the agent to keep working across sessions
  without manual hand-off.
disable-model-invocation: false
---

# When to invoke

Invoke this skill when:

- The user starts a new session and asks "what's next?" / "continue".
- A `/routines run "<interval>"` expression dispatches to `/loop` and
  the loop body calls the heartbeat (i.e., the heartbeat is the work
  done per tick).
- The planner emits a `kind: "heartbeat"` step.
- A `/schedule` routine fires on a cron expression.

# Citations

Sources for the cross-session memory + dreams pattern (used here as
guidance, NOT as Managed Agents API calls):

- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/memory.md`
- `vendor/anthropics/platform.claude.com/docs/en/managed-agents/dreams.md`

Sources for the operator-side translation:

- `seeds/prompts/operator-2026-05-10-heartbeat.md`
- `seeds/posture/session-start.xml`
- `rubrics/phase-0.md` (and the rest of `rubrics/phase-{1..12}.md`)

# State boundaries

**Memory store layout (operator-side translation of `/mnt/memory/`).**

```
seeds/memory/
  heartbeat/
    last-tick.md            # one-line summary + git SHA at end of last tick
    open-questions.md       # questions for the operator (PR comments or chat)
    decisions.md            # decisions the orchestrator made, dated
    next-actions.md         # the queue this tick pops from
  _shared/                  # read-only reference material
    rubrics-snapshot.md     # derived from rubrics/, refreshed on dream
    project-state.md        # derived from GH milestones + issues
```

All paths under `seeds/memory/` are git-tracked. Each heartbeat tick
that mutates state commits with message `chore(memory): heartbeat
tick <iso-timestamp>`. Untrusted external bodies (anything under
`vendor/`) MUST NOT be written into `seeds/memory/` — see the
prompt-injection warning in `seeds/citations/memory.md`.

# Per-tick procedure

1. **Read state.** Open `seeds/memory/heartbeat/last-tick.md` and
   `seeds/memory/heartbeat/next-actions.md`. If empty, derive the
   queue from open issues on the GitHub project (Phase 4+).
2. **Pick.** Pop the top action. If none, exit cleanly with
   `loop tick <iso> — queue empty`.
3. **Verify gates.** Resolve the action's rubric reference
   (`rubrics/phase-<N>.md`). If the phase has unmet operator-gating
   steps (Phase 1 example: Neon Console install), surface them as a
   PR comment or in `open-questions.md` and pick the next action.
4. **Execute.** Decompose the action into todos, run the work,
   commit per-todo per the operator discipline.
5. **Open PR with auto-merge.** When the work is ready, open a PR via
   `mcp__github__create_pull_request`. Label it `automerge` (see
   `.github/workflows/auto-merge.yml`). Required CI workflows
   (`verify.yml`, `osv-scanner.yml`) gate the merge — operator does
   NOT review. Subscribe to PR activity via
   `mcp__github__subscribe_pr_activity` so failures wake the next
   session.
6. **Watch CI.** PR-activity events arrive as
   `<github-webhook-activity>` messages in subsequent sessions. The
   heartbeat reads each event, classifies the failure (see the table
   in `docs/governance.md`), and either (a) pushes a fix, (b) posts a
   question to the PR for the operator tiebreaker, or (c) skips
   silently if no action is needed. Retry cap: 3 fix loops per PR.
7. **Record.** Append a one-line entry to `decisions.md` and update
   `last-tick.md` with the final git SHA + ISO timestamp. Commit.
8. **Yield.** Exit the session. The next heartbeat (next `/loop` tick
   or next session, or the next webhook event) resumes from the new
   `last-tick.md`.

# Cross-session resumption

A fresh session resumes by reading `seeds/memory/heartbeat/last-tick.md`
and the latest `seeds/memory/heartbeat/decisions.md` entries. No
in-process state is required. This is the operator-side translation of
"memory store mounted as a directory inside the session's container":

| Managed-agents primitive (cited)              | Operator-side translation                              |
| --------------------------------------------- | ------------------------------------------------------ |
| `/mnt/memory/<store>/` (mounted directory)    | `seeds/memory/<store>/` (git-tracked directory)        |
| Standard file tools (read/write the mount)    | `Read` / `Write` / `Edit` tools against the directory  |
| "stay in sync across sessions that share it"  | Atomic git commits; `git pull` before each session     |
| `read_write` vs `read_only` access mode       | git permissions + the `_shared/` convention            |
| Memory versions + audit log                   | `git log seeds/memory/`                                |
| Dreams (reorganize the store)                 | Weekly `/schedule` running a "dream" sub-routine       |

# Dream sub-routine (Phase 11+, optional)

Per `seeds/citations/dreams.md`:

> A dream reads an existing memory store alongside past session
> transcripts, then produces a new, reorganized memory store: duplicates
> merged, stale or contradicted entries replaced with the latest value,
> and new insights surfaced.

Operator-side translation:

1. A weekly `/schedule` fires.
2. The dream sub-agent reads `seeds/memory/heartbeat/*.md` plus the
   last N tick artifacts (from `git log`).
3. It produces a reorganized memory store in a branch
   (`heartbeat/dream/<iso>`) and opens a draft PR.
4. The operator reviews and merges; merging adopts the new store.
5. If the operator rejects, close the PR; the original store is
   untouched (matches the cited doc's "input store is never modified"
   discipline).

Phase 11 layers Turbopuffer on top: pre-embed all memory entries via
Voyage AI, store vectors in Turbopuffer, query semantically when the
heartbeat asks "what do I remember about X?".

# CI-failure dispatch classifier

Per `docs/governance.md`:

| Failure signal in webhook event | Classifier verdict | Action |
|---|---|---|
| `verify.yml` exit ≠ 0 with `error TS` lines | typecheck | spawn type-fixer sub-agent against the offending file |
| `verify.yml` exit ≠ 0 with `verify:citations` block | citations | spawn @cite-fixer sub-agent against the test file lacking a header |
| `verify.yml` exit ≠ 0 with `verify:gates` block | gates drift | spawn gates-syncer against `docs/phase-gates.md` vs rubrics |
| `verify.yml` exit ≠ 0 in MCP smoke | tool-list mismatch | check `scripts/verify.ts` `expected: N` vs the lane source |
| `osv-scanner.yml` SARIF with high-severity | dep CVE | spawn dep-bumper sub-agent; bump the vulnerable package; verify |
| `neon-branch.yml` / `cloudflare-preview.yml` ::warning::missing secret | operator gate | post a comment summarizing the missing secret; do NOT push |
| Anything ambiguous / >3 retries | escalate | post a question to the PR for the operator |

After each dispatch the heartbeat records the classifier verdict and
the sub-agent's outcome in `seeds/memory/heartbeat/decisions.md`.

# Boris Cherny lead orchestration pattern

The heartbeat skill is the operator-side embodiment of the publicly-
documented Anthropic pattern (Boris Cherny) where a sufficiently
scaffolded agent system writes 100% of the codebase. The lead
orchestrator (this skill) drives sub-agents (Phase 10's
`npm-research` / `verifier` / `crawl-curator`) per rubric, opens PRs
with auto-merge enabled, listens for CI events, dispatches fixers on
failure, and continues across sessions. Operator becomes a
tiebreaker, not a reviewer (see `docs/governance.md`).

# Examples

```
# First-ever tick after PR 3 lands:
/routines run "heartbeat"
→ reads empty next-actions.md
→ derives initial queue from GitHub project Phase 1 milestone issues
→ picks the first Phase 1 issue
→ runs Phase 1 rubric gating check
→ if green: commits scripts/crawl-vendors.ts scaffold per the rubric
→ records "phase-1 started" decision; updates last-tick.md
→ yields

# Weekly dream sub-routine:
/schedule every Sunday 22:00 run heartbeat dream
→ reads seeds/memory/heartbeat/*.md
→ opens draft PR with reorganized memory store
→ surfaces 1-3 new insights in the PR body
→ yields
```
