---
name: mcp-overview
description: Explains what MCP is, its client/server architecture, and the three server primitives (tools, resources, prompts) with the control pattern that decides which to use. Trigger when someone asks "what is MCP", how it differs from plain tool use or API calls, or which primitive fits a use case.
---

# MCP Overview

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

## Overview
**MCP (Model Context Protocol)** is a communication layer that gives Claude context and tools without each developer writing tedious per-service integration code. An **MCP client** connects to an **MCP server**; the server holds tools, resources, and prompts as internal components.

- [What MCP is and why it exists](references/introducing-mcp.md) — the problem MCP solves and how it relates to tool use and raw API calls.
- [The client/server request flow](references/mcp-clients.md) — how a tool call travels client → server → Claude.
- [The three server primitives and how to pick one](references/mcp-review.md) — tools vs. resources vs. prompts, chosen by who controls invocation.

## Grounded in src/
- `src/services/mcp/client.ts` — Claude Code's MCP client: connects to servers and brokers tool/resource/prompt calls (it is a real MCP client).
- `src/tools/MCPTool/MCPTool.ts` — how a discovered MCP server tool is surfaced to the model (input schema is `passthrough()` because each MCP tool defines its own schema).

## Source
Course notes: "Introducing MCP", "MCP Clients", "MCP Review" — projects/courses/mcp_intro file
