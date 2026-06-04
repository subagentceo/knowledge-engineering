# PR Operations Playbook

Loaded every session. Governs how Claude creates, monitors, and rescues pull requests.

## Webhook event handling

| Event | Action |
|---|---|
| `github-actions[bot]` "Auto-reopen: triggering PR-event workflows after App-pushed rebase (OAUTO17)" | Silent skip — rescue bot working correctly |
| PR closed → reopened in sequence (bot-authored) | Silent skip |
| `conclusion: failure` on `Agent session cost gate` | Add `skip-cost-gate` label via `mcp__github__issue_write` |
| `conclusion: failure` on `npm run verify` | Investigate and fix |
| `conclusion: failure` on `OSV-Scanner (PR)` | Investigate and fix |
| Human review comment | Read, assess, fix if ≤20 lines; ask if ambiguous |

**Context budget rule:** OAUTO17 cycles are noise. One word response max ("noted") or total silence.

## PR creation checklist

```
1. git checkout -b claude/<slug>         # MUST start with claude/
2. git push -u origin claude/<slug>
3. mcp__github__create_pull_request      # creates PR
4. mcp__github__issue_write              # add labels IMMEDIATELY
   labels: ["automerge", "skip-cost-gate"]
```

Never create PR then wait to add labels — cost-gate fires within seconds.

## Branch name rescue (worktree-agent-* branches)

Agent worktrees default to `worktree-agent-<id>` branch names. Branch-guard topology check exempts only `claude/` branches. Rescue procedure:

```bash
git fetch origin worktree-agent-<id>
git checkout -b claude/<slug> worktree-agent-<id>
git push -u origin claude/<slug>
# create new PR via MCP
mcp__github__update_pull_request pullNumber=<old> state=closed
```

## Required CI contexts (merge gate)

Both must show `conclusion: success` on the PR head SHA:
- `npm run verify`
- `OSV-Scanner (PR) / osv-scan`

`workflow_dispatch` produces `OSV-Scanner (push / schedule) / osv-scan` — a different context name that does NOT satisfy the gate.

## mergeable_state: "blocked" diagnosis

| Cause | Fix |
|---|---|
| Checks haven't run yet (App-pushed rebase) | Wait for rescue bot close/reopen cycle |
| PR behind main (`strict` policy) | Rescue bot rebases automatically |
| Both checks passed, state stale | Wait ~60s for GitHub to refresh; auto-merge fires |
| `skip-cost-gate` label missing | Add label; cost-gate was blocking |

## Label reference

| Label | Effect |
|---|---|
| `automerge` | Enable rebase auto-merge once required checks pass |
| `skip-cost-gate` | Bypass agent-session cost gate (use for all agent-created PRs) |
