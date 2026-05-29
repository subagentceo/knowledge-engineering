# Hook event model

Hooks are commands that run **before or after** Claude executes a tool, letting you inspect, block, or react to tool calls.

## Two types

- **Pre-tool-use** — runs *before* the tool. Can **block** execution.
- **Post-tool-use** — runs *after* the tool. Cannot block; used for follow-up operations and feedback.

## Configuration

Configuration lives in a Claude settings file (global / project / personal, e.g. `.claude/settings.local.json`), edited manually or via the `/hooks` command. Each entry has:

- a **matcher** — which tools to target, e.g. `"read|grep"` (pipe separates tool names), and
- a **command** to execute.

## How a hook works

1. Claude sends the tool-call data to your command as **JSON via stdin** (session ID, `tool_name`, tool input / `file_path`).
2. Your command parses the JSON.
3. It exits with a code: **exit 0 = allow**, **exit 2 = block** (pre-tool-use only).
4. On a block, **stderr output is sent back to Claude as feedback** (e.g. `console.error(...)` in a Node hook).
5. **Restart Claude after changing hooks.**

## Worked example — block .env reads

Pre-tool-use hook, matcher `"read|grep"`, command `node ./hooks/read_hook.js`; the script checks if the path includes `.env` and, if so, logs to stderr and exits 2. See [`scripts/read_hook.js`](../scripts/read_hook.js) for a runnable version of this pattern.

Tip: to learn the tool names to match on, just ask Claude for the list of available tools.
