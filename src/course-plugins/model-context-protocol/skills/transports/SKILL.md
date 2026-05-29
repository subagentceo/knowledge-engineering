---
name: transports
description: Choose and reason about MCP transports — stdio (same machine, full bidirectional) vs StreamableHTTP (remote, SSE-based, with server-to-client limits) — including the stateless-HTTP and JSON-response flags and what they break. Trigger when picking a transport, deploying a server remotely, scaling horizontally, or debugging why progress/logging/sampling work locally but fail over HTTP.
---

# Transports (stdio + StreamableHTTP)

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

## Overview
A **transport** moves JSON-RPC messages between client and server. MCP requires some **server-to-client** traffic (sampling, progress, logging, resource subscriptions), and how well a transport supports that direction is what distinguishes the two options.

- [stdio transport](references/stdio.md) — client launches the server as a subprocess over stdin/stdout; full bidirectional but same-machine only. Runnable: [`scripts/stdio_server.py`](scripts/stdio_server.py).
- [StreamableHTTP transport](references/streamable-http.md) — remote server over HTTP, using SSE to fake bidirectional traffic; includes the `json_response` flag. Runnable: [`scripts/http_server.py`](scripts/http_server.py).
- [Stateless HTTP](references/stateless-http.md) — the `stateless_http` flag for horizontal scaling and exactly what it disables.

## Grounded in src/
- `src/services/mcp/client.ts` — instantiates `StdioClientTransport`, `SSEClientTransport`, and StreamableHTTP on the client side (the real client choosing a transport per server).
- `src/services/mcp/config.ts` — server config carries the transport `type` (stdio / sse / http), matching the course's transport selection.
- `src/services/mcp/types.ts` — transport type definitions (stdio, SSE, HTTP, WebSocket).
- `src/services/mcp/InProcessTransport.ts` — an in-process transport pair for running a server+client without spawning a subprocess (a same-process analogue to stdio).

## Source
Course notes: "The Stdio Transport", "The StreamableHTTP Transport", "StreamableHTTP in Depth", "Stateless HTTP" — projects/courses/mcp_advanced file
