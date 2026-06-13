# MCP bundle — knowledge bridge + GitHub connector

One-click local MCP install for Claude Desktop (macOS / Windows 11), the device target of
`docs/prompts/handoff-2026-06-12-iphone-to-win11-canary.md`. Companion to
`docs/reference/anthropic-foundation-models-integration.md` (the tool plane).

## What's here

- `manifest.json` — an [MCP Bundle](https://github.com/modelcontextprotocol/mcpb) (`.mcpb`,
  formerly DXT) manifest for **this repo's bridge** (`src/mcp/bridge-server.ts`, 55 tools). Node
  server, OAuth-only, optional Postgres/Redis `user_config`.
- `claude-desktop.config.json` — drop-in `mcpServers` block wiring the bridge **and** the official
  GitHub server side-by-side.

## Build & install the bundle

```sh
# 1. build the bridge the manifest points at
npm run build                       # emits dist/mcp/bridge-server.js

# 2. pack the bundle (CLI renamed dxt → mcpb)
npx @anthropic-ai/mcpb pack infra/mcpb subagent-knowledge-bridge.mcpb

# 3. double-click the .mcpb in Claude Desktop, or drag it into Settings ▸ Extensions
```

## Pair with github-mcp-server

A `.mcpb` bundles one server; the GitHub server ships as its own
[`ghcr.io/github/github-mcp-server`](https://github.com/anthropics/github-mcp-server) image. Add
both to Claude Desktop via `claude-desktop.config.json`:

```json
{
  "mcpServers": {
    "knowledge-bridge": {
      "command": "node",
      "args": ["/abs/path/to/knowledge-engineering/dist/mcp/bridge-server.js"]
    },
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm",
               "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
               "-e", "GITHUB_TOOLSETS",
               "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<fine-grained PAT>",
        "GITHUB_TOOLSETS": "repos,issues,pull_requests,code_security"
      }
    }
  }
}
```

Smoke-test either server's tool list before wiring it in:

```sh
npx @modelcontextprotocol/inspector node dist/mcp/bridge-server.js
```

## Auth posture

Neither server takes an `ANTHROPIC_API_KEY`. The bridge is docs/warehouse only; the GitHub server
takes a GitHub PAT. Claude itself is reached, on Apple surfaces, through the OAuth `.proxied` relay
(`infra/cloudflare` `POST /claude`), never a bundled key.
