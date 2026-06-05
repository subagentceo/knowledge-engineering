# open-managed-agents (OMA)

## What is OMA

open-managed-agents is an open-source framework for deploying managed Claude-powered agents as server endpoints. It provides a minimal HTTP server that exposes agent sessions over a REST API, handling session lifecycle, streaming responses, and provider authentication.

## Relationship to this repo

`subagentceo/knowledge-engineering` forks OMA as the backend for `managedsubagents.com`. The fork lives at `subagentceo/managedsubagents`. The knowledge-engineering chassis connects to the OMA server via the MCP bridge (`src/mcp/bridge-server.ts`), which exposes the 16+ tool lanes to the agent.

Fork plan:
1. Fork `open-managed-agents` → `subagentceo/managedsubagents`
2. Apply t12-2 OAuth patch (see `oauth-patch.md`)
3. Deploy to Cloudflare Workers

## Key packages

| Package | Purpose |
| :--- | :--- |
| `packages/server` | Core agent HTTP server — routes, providers, middleware |
| `packages/client` | Client SDK for consuming the server API |
| `packages/shared` | Shared types, schemas, and utilities |

## Critical OAuth invariant

`ANTHROPIC_API_KEY` MUST NOT be set. The Anthropic provider in `packages/server/src/providers/anthropic.ts` must use `CLAUDE_CODE_OAUTH_TOKEN` via Bearer header instead.

See `oauth-patch.md` for the exact diff to apply. See `architecture.md` for where the change lands in the package structure.

## Links

- `oauth-patch.md` — exact diff for the t12-2 OAuth patch
- `architecture.md` — technical deep-dive: package structure, provider internals, deployment targets
- `api-reference.md` — REST API reference for the deployed server
- `governance-schema.md` — fork governance, agent policy, environment validation rules
