---
name: hooks
description: Intercept Claude Code's tool calls with shell commands that run before (pre-tool-use, can block) or after (post-tool-use, gives feedback) execution — configured in settings.json with a matcher like "read|grep" and a command that reads tool-call JSON from stdin and exits 0 (allow) or 2 (block, with stderr sent back to Claude). Trigger when asked to block sensitive-file access, auto-format/type-check after edits, run tests after edits, or build automated feedback loops.
---

# Hooks

> Distilled from the *Claude Code in Action* course. Grounded in `src/utils/hooks/hooksConfigManager.ts` and `src/commands/hooks`.

Hooks are commands that run **before or after** Claude executes a tool, letting you inspect, block, or react to tool calls. Pre-tool-use hooks can block; post-tool-use hooks give feedback.

## Quick reference

- **Configure** in a Claude settings file (e.g. `.claude/settings.local.json`), by hand or via the `/hooks` command.
- **Matcher** selects tools, e.g. `"read|grep"` (pipe separates names).
- **stdin** carries tool-call JSON (session id, `tool_name`, tool input / `file_path`).
- **exit 0 = allow**, **exit 2 = block** (pre-tool-use only); **stderr on a block is fed back to Claude**.
- **Restart Claude after changing hooks.**
- To learn tool names to match on, ask Claude for the list of available tools.

## Going deeper

- The full event model, configuration, and the worked .env-blocking example: see [hook event model](references/event-model.md).
- The two feedback-loop hooks from the course (TypeScript type-checker, duplicate-code prevention): see [useful hooks](references/useful-hooks.md).

## Runnable examples

- [`scripts/read_hook.js`](scripts/read_hook.js) — pre-tool-use: block `.env` reads/greps.
- [`scripts/typecheck_hook.js`](scripts/typecheck_hook.js) — post-tool-use: `tsc --no-emit` after TS edits, errors fed back.
- [`scripts/dedup_hook.js`](scripts/dedup_hook.js) — post-tool-use: SDK-launched duplicate-code check.

## Grounded in src/
- `src/utils/hooks/hooksConfigManager.ts` — loads and manages hook configuration from settings.
- `src/types/hooks.ts`, `src/schemas/hooks.ts` — hook config shape (matcher + command, pre/post).
- `src/commands/hooks` — the `/hooks` command for editing hook config.
- `src/services/tools/toolHooks.ts`, `src/utils/hooks/execAgentHook.ts` — execution of pre/post hooks around tool calls.
- `src/utils/sessionFileAccessHooks.ts` — file-access-blocking hooks (the .env-style use case).

## Source
Course note(s): "Introducing Hooks", "Defining Hooks", "Implementing a Hook", "Useful Hooks!" — projects/courses/claude-code-in-action__claudecode.txt
