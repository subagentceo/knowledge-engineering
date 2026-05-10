---
title: knowledge-bridge MCP server
description: Single stdio MCP SDK v2 server that hosts all four bridges.
---

## Outcome

A `@modelcontextprotocol/sdk` v2 stdio server that any MCP client (Claude
Code, Claude Desktop, claude-agent-sdk) can mount to reach the four bridges
in one place.

## Layout

```
src/mcp/bridge-server.ts          Entry point; wires the four lanes.
src/mcp/bridge-utils.ts           fetchText / fetchHtml / jsonResult helpers.
src/mcp/lanes/anthropic-engineering.ts
src/mcp/lanes/claude-blog.ts
src/mcp/lanes/support-claude.ts
src/mcp/lanes/llms-txt.ts
```

Each lane file calls `server.tool(...)` to register its tools; the entry
point composes them.

## Mount in Claude Code

```bash
claude mcp add knowledge-bridge -- node ./dist/mcp/bridge-server.js
```

## Mount in claude-agent-sdk

See `src/agent/run.ts` — registered via the `mcpServers` option on
`query()`. The server uses stdio, so it inherits the parent's environment and
needs no transport-level auth. Upstream auth (the agent's calls to Anthropic)
is OAuth-only; see [`reference/auth`](./auth).
