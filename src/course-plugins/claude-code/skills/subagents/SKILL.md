---
name: subagents
description: Delegate scoped work to a separate Claude instance — keep each task focused (wrapped/complex tasks make Claude lose focus and duplicate code), spawn a secondary Claude to review or check the primary's work and feed results back, and use the Claude Code SDK (CLI / TypeScript / Python) to launch those instances programmatically (read-only by default; add write tools like "edit" via allowTools). Trigger when a task is too broad for one focused pass, or when building a review/check loop around Claude's edits.
---

# Subagents

> Distilled from the *Claude Code in Action* course. Grounded in `src/tools/AgentTool/` and `src/Task.ts`.

Claude works best on **focused** tasks. When a task is wrapped or complex, Claude loses focus — for example creating duplicate queries/functions instead of reusing existing ones. The fix is to split work and to run **separate Claude instances** for review/checking.

## Quick reference

- **Keep tasks focused** — broad/wrapped tasks cause duplication; split them.
- **Spawn a reviewer** — a secondary Claude checks the primary's work and feeds results back.
- **Launch programmatically** via the Claude Code SDK (CLI / TypeScript / Python), read-only by default; add `"edit"` to `allowTools` for write access.

**Pattern (from the duplicate-code hook):** when the primary Claude edits a watched directory, launch a **secondary Claude instance** to compare the new code against existing code; it reports duplicates and the primary reuses the existing code. This is a self-correction loop built from a second agent. (See the `hooks` skill for the runnable hook.)

## Going deeper

- SDK launch details — permissions, `allowTools`, output shape, and where it fits: see [the Claude Code SDK](references/sdk.md).

## Grounded in src/
- `src/tools/AgentTool/` — the subagent tool (`runAgent.ts`, `forkSubagent.ts`, `loadAgentsDir.ts`) that spawns and manages secondary Claude instances.
- `src/Task.ts`, `src/tasks/` (e.g. `LocalAgentTask`, `RemoteAgentTask`) — task model backing delegated work.
- `src/commands/agents` — agent management command surface.

## Source
Course note(s): "Useful Hooks!" (duplicate-code prevention), "The Claude Code SDK" — projects/courses/claude-code-in-action__claudecode.txt
