# claude-code plugin

Skills for working effectively *with* Claude Code itself — context management, planning, hooks, custom commands, subagents, MCP, and change workflows — distilled from the **Claude Code in Action** course.

- **Source course:** `projects/courses/claude-code-in-action__claudecode.txt`
- **Grounding:** every skill cites the real implementation path in the vendored Claude Code source under `src/`. Paths were verified to exist; where a topic has no direct backing file it says so rather than fabricating one.

## Skills

| Skill | One-liner |
|---|---|
| `adding-context` | Seed project context with `/init`, the three CLAUDE.md tiers, and the `@` / `#` symbols. |
| `context-control` | Steer or reset the conversation with Escape, double-Escape, `/compact`, and `/clear`. |
| `plan-and-think-modes` | Use Plan Mode (breadth) and Thinking Mode (depth) before executing complex changes. |
| `making-changes` | Drive code/UI changes with pasted screenshots (Control-V) and git commit support. |
| `custom-slash-commands` | Author reusable `/commands` as markdown files with `$ARGUMENTS`. |
| `hooks` | Run pre/post tool-use hooks to block or give feedback on Claude's tool calls. |
| `subagents` | Delegate scoped work to separate Claude instances via the Task/Agent system. |
| `mcp-tools` | Extend Claude Code with MCP servers (e.g. Playwright) and manage their permissions. |

Each skill's "Grounded in src/" section points at the file(s) implementing that behavior in this checkout.
