---
title: npm-registry MCP server
description: Stdio MCP server exposing four npm public-registry tools.
---

## Outcome

A `@modelcontextprotocol/sdk` stdio server that any MCP client (Claude Code,
Claude Desktop, claude-agent-sdk) can mount to query the npm public registry.

## Tools

| Tool | Source endpoint |
|---|---|
| `npm_org_packages` | `https://www.npmjs.com/org/{org}/package` |
| `npm_package_metadata` | `https://registry.npmjs.org/{pkg}[/{version}]` |
| `npm_downloads` | `https://api.npmjs.org/downloads/point/{period}/{pkg}` |
| `npm_search` | `https://registry.npmjs.org/-/v1/search` |

## Mount in Claude Code

```bash
claude mcp add npm-registry -- node ./dist/mcp/npm-registry-server.js
```

## Mount in claude-agent-sdk

See `src/agent/run.ts` — the server is registered via the `mcpServers` option
on `query()`.
