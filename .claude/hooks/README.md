# `.claude/hooks/`

`PreToolUse` hooks that add guidance/controls around plan-mode exploration
and ultracode (`Workflow` tool) usage. Wired in `.claude/settings.json`.

| Script | Matcher | Behavior |
| :--- | :--- | :--- |
| `explore_fanout_guidance.py` | `Agent` | Non-blocking. On the 2nd+ Explore/general-purpose spawn within a 5-minute session burst, adds `additionalContext` reminding Claude to decompose available context (e.g. a screenshot) narrowly before spawning more agents. |
| `high_risk_workflow_guard.py` | `Workflow` | Scans the workflow script (and `scriptPath` file, if any) for GitHub ruleset/branch-protection/`--admin`-bypass patterns (blocks, exit 2) or force-push/branch-delete patterns (asks, via `permissionDecision: "ask"`). |
| `high_risk_git_guard.py` | `Bash` | Same classification as `high_risk_workflow_guard.py`, applied to `tool_input.command` - defense-in-depth for commands that don't route through a top-level `Workflow` call. |
| `_risk_patterns.py` | n/a | Shared regex patterns + reasons, imported by both guard scripts so they can't drift apart. |

## Contract

Each script reads the hook's JSON event on stdin and communicates back via
exit code + stdout, per the documented contract:

- **Exit 0** - success. Any JSON on stdout is parsed for `hookSpecificOutput`.
- **Exit 2** - blocking error (`PreToolUse` only). stderr is shown to Claude
  as the block reason; stdout is ignored.
- `hookSpecificOutput.additionalContext` - a string added to Claude's
  context alongside the tool result; non-blocking guidance.
- `hookSpecificOutput.permissionDecision: "ask"` - surfaces the normal human
  permission prompt instead of silently allowing the call.

Full reference: `vendor/anthropics/code.claude.com/docs/en/hooks.md`. Also
cited: `https://code.claude.com/docs/en/workflows#let-claude-decide-with-ultracode`,
`https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode`.

## State

`explore_fanout_guidance.py` writes a small per-session counter under
`.claude/state/explore-fanout/<session_id>.json`. This directory is
gitignored - it's ephemeral runtime state, not configuration.
