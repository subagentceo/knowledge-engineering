---
name: implementing-a-client
description: Build an MCP client wrapper around a client session that lists/calls tools, reads resources, and lists/gets prompts, with proper connect/cleanup resource management. Trigger when writing or debugging the client side of MCP, connecting application code to a server, or wiring server primitives into a chat loop.
---

# Implementing a Client

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

## Overview
The **MCP client** is the communication interface between your application and the MCP server. Wrap the SDK's **client session** in a class so you can manage connection lifecycle and resource cleanup rather than using the raw session everywhere. The full wrapper is in [`scripts/client.py`](scripts/client.py).

- [Connecting and calling tools](references/connecting.md) — why a wrapper class, lifecycle, the tool flow, and how to test it.
- [Accessing resources](references/accessing-resources.md) — `read_resource(uri)`, branching on `mimeType`, folding contents into the prompt.
- [Prompts in the client](references/prompts-in-client.md) — `list_prompts()` + `get_prompt(name, arguments)` and how the returned messages drive the conversation.

## Grounded in src/
- `src/services/mcp/client.ts` — Claude Code's production client session: connection management, listing/calling tools, progress handling.
- `src/services/mcp/MCPConnectionManager.tsx` and `src/services/mcp/useManageMCPConnections.ts` — lifecycle/cleanup of live server connections (the connect/cleanup pattern the course describes).
- `src/tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`, `src/tools/ListMcpResourcesTool/ListMcpResourcesTool.ts` — the client-side read-resource / list-resources operations.

## Source
Course notes: "Implementing a Client", "Accessing Resources", "Prompts in the Client" — projects/courses/mcp_intro file
