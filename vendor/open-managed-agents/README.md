# open-managed-agents

> Vendor mirror — mirrored from `github.com/rogeriochaves/open-managed-agents` for the knowledge-engineering chassis.
> @cite vendor/open-managed-agents/architecture.md
> @cite vendor/open-managed-agents/api-reference.md
> @cite vendor/open-managed-agents/governance-schema.md

## What it is

`open-managed-agents` is an open-source managed agents framework (TypeScript) by [@rogeriochaves](https://github.com/rogeriochaves). It ships a production-ready Hono backend + React web UI that lets operators define orgs, teams, and projects through a `governance.json` IAC file, then expose AI agents to users over a REST/streaming API.

The knowledge-engineering project forks this as the `managedsubagents.com` backend (task t10-1). The only mandatory adaptation is the OAuth patch (t12-2): replace `ANTHROPIC_API_KEY` with `CLAUDE_CODE_OAUTH_TOKEN` per the OAuth-only invariant. See `vendor/open-managed-agents/oauth-patch.md`.

## Quick start

```bash
git clone https://github.com/rogeriochaves/open-managed-agents
cd open-managed-agents
npm install
cp governance.example.json governance.json   # edit to taste
# set env vars (see Environment variables below)
npm run dev
```

The server starts on `http://localhost:3000`. The React UI is served from the same origin via Hono's static middleware.

## Architecture overview

See [architecture.md](./architecture.md) for the full diagram and module map.

Short version:

```
packages/server  (Hono TypeScript)
  ↕ REST + MCP transport
packages/web     (React)
  ↕ DATABASE_URL
Postgres
  ↕ @modelcontextprotocol/hono
12 built-in MCP connectors
```

## Built-in connectors

| Connector | Protocol |
|---|---|
| Slack | MCP (OAuth) |
| Notion | MCP (OAuth) |
| GitHub | MCP (PAT / OAuth) |
| Linear | MCP (OAuth) |
| Sentry | MCP (API key) |
| Asana | MCP (OAuth) |
| Amplitude | MCP (API key) |
| Intercom | MCP (OAuth) |
| Atlassian (Jira/Confluence) | MCP (OAuth) |
| Google Drive | MCP (OAuth) |
| PostgreSQL | MCP (connection string) |
| Stripe | MCP (secret key) |

Connector credentials are stored AES-256-GCM encrypted in Postgres, scoped per team.

## Governance model overview

Operators define the entire access model in `governance.json`:

- **org** — top-level tenant
- **teams** — groups of users (engineering, knowledge-work, legal, finance, etc.)
- **providers** — which LLM providers each team can use (`claude-oauth`, `ollama`, etc.)
- **mcp_servers** — which MCP connectors each team can invoke
- **rbac** — per-team role assignments (`admin | member | viewer`)

Changes to `governance.json` are applied live via `PUT /v1/governance`. See [governance-schema.md](./governance-schema.md) for the full schema reference.

## Auth model

Three auth surfaces are supported:

| Surface | Mechanism |
|---|---|
| Browser session | `HttpOnly` session cookie set on `POST /auth/login` |
| API / agent-to-agent | `Authorization: Bearer <token>` header |
| Programmatic scripts | `x-api-key: <token>` header |

All three map to the same internal identity principal. Bearer tokens and API keys are issued via `POST /v1/tokens`.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string (`postgres://user:pass@host:5432/db`) |
| `CLAUDE_CODE_OAUTH_TOKEN` | yes (Anthropic provider) | OAuth bearer token for the `claude-oauth` provider. Never `ANTHROPIC_API_KEY`. |
| `SESSION_SECRET` | yes | 32-byte hex secret for session cookie signing |
| `CREDENTIAL_VAULT_KEY` | yes | 32-byte hex key for AES-256-GCM connector credential vault |
| `PORT` | no (default 3000) | HTTP listen port |

`ANTHROPIC_API_KEY` is **never** used. The OAuth-only invariant is enforced at the provider level — see `vendor/open-managed-agents/oauth-patch.md` and `src/oauth/token.ts`.

## Further reading

- [architecture.md](./architecture.md) — package tree, module map, session model, tool dispatch flow
- [api-reference.md](./api-reference.md) — all `/v1/*` REST routes
- [governance-schema.md](./governance-schema.md) — `governance.json` full schema + managedsubagents.com example
- [oauth-patch.md](./oauth-patch.md) — how to replace `ANTHROPIC_API_KEY` with `CLAUDE_CODE_OAUTH_TOKEN` (t12-2)
