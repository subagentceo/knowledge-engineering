---
name: notifications-and-progress
description: Emit real-time log and progress notifications from MCP tools via the context object (ctx.info, ctx.report_progress) and handle them with client callbacks. Trigger when a long-running tool needs user feedback, or when wiring logging/progress callbacks into the client session and call_tool.
---

# Log and Progress Notifications

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

## Overview
These notifications give **real-time feedback during tool execution** so users aren't left wondering whether a call stalled or failed. They are an optional, purely-UX enhancement.

- [Server side](references/server-side.md) — the `ctx.info` / `ctx.report_progress` context methods. Runnable: [`scripts/server_progress.py`](scripts/server_progress.py).
- [Client side](references/client-side.md) — the logging callback (on the session) and progress callback (on `call_tool`), plus why this matters.

## Grounded in src/
- `src/tools/MCPTool/MCPTool.ts` — exports `MCPProgress` and a `renderToolUseProgressMessage`, i.e. Claude Code consumes progress notifications coming back from an MCP server tool while it runs.

## Source
Course note: "Log and Progress Notifications" — projects/courses/mcp_advanced file
