# open-managed-agents — Architecture

> @cite vendor/open-managed-agents/README.md
> @cite vendor/open-managed-agents/api-reference.md
> @cite vendor/open-managed-agents/governance-schema.md

## System diagram

```
┌───────────────────────────────────────────────────────────────────────┐
│  packages/web  (React)                                                │
│   └── REST calls to /v1/* (fetch / EventSource for streaming)        │
└────────────────────────────┬──────────────────────────────────────────┘
                             │ HTTP (same-origin; Hono static middleware)
┌────────────────────────────▼──────────────────────────────────────────┐
│  packages/server  (Hono, TypeScript)                                  │
│                                                                       │
│  ┌──────────────┐  ┌──────────────────┐  ┌─────────────────────────┐ │
│  │  /v1/* router│  │ governance loader │  │  credential vault       │ │
│  │  (REST/SSE)  │  │ (governance.json) │  │  (AES-256-GCM, Postgres)│ │
│  └──────┬───────┘  └──────────────────┘  └─────────────────────────┘ │
│         │                                                             │
│  ┌──────▼──────────────────────────────────────────────────────────┐  │
│  │  agent loop                                                      │  │
│  │   1. receive user message on thread                             │  │
│  │   2. build context (thread history + system prompt)             │  │
│  │   3. call provider (claude-oauth / ollama)                      │  │
│  │   4. parse tool_use blocks                                      │  │
│  │   5. dispatch to MCP connector(s)                               │  │
│  │   6. append tool_result, loop until text response               │  │
│  │   7. stream final message back to caller                        │  │
│  └──────┬──────────────────────────────────────────────────────────┘  │
│         │ @modelcontextprotocol/hono  (McpHono class)                 │
│  ┌──────▼────────────────────────────────────────────┐               │
│  │  MCP connectors (12 built-in)                     │               │
│  │  Slack · Notion · GitHub · Linear · Sentry        │               │
│  │  Asana · Amplitude · Intercom · Atlassian         │               │
│  │  Google Drive · PostgreSQL · Stripe               │               │
│  └───────────────────────────────────────────────────┘               │
│                                                                       │
└───────────────────────────────────────┬───────────────────────────────┘
                                        │ DATABASE_URL (pg)
                             ┌──────────▼──────────┐
                             │      Postgres        │
                             │  tables:             │
                             │  users, orgs, teams  │
                             │  sessions, threads   │
                             │  messages, credentials│
                             └─────────────────────┘
```

## Package tree

```
open-managed-agents/
├── governance.json            # IaC — org/team/provider/MCP/RBAC config
├── governance.example.json    # template to copy
├── packages/
│   ├── server/
│   │   ├── src/
│   │   │   ├── index.ts           # Hono app entry, mounts all routers
│   │   │   ├── providers/         # LLM provider adapters
│   │   │   │   ├── anthropic.ts   # claude-oauth (CLAUDE_CODE_OAUTH_TOKEN)
│   │   │   │   └── ollama.ts      # local model via Ollama OpenAI-compat API
│   │   │   ├── connectors/        # 12 MCP connector definitions
│   │   │   │   ├── slack.ts
│   │   │   │   ├── notion.ts
│   │   │   │   ├── github.ts
│   │   │   │   ├── linear.ts
│   │   │   │   ├── sentry.ts
│   │   │   │   ├── asana.ts
│   │   │   │   ├── amplitude.ts
│   │   │   │   ├── intercom.ts
│   │   │   │   ├── atlassian.ts
│   │   │   │   ├── gdrive.ts
│   │   │   │   ├── postgres.ts
│   │   │   │   └── stripe.ts
│   │   │   ├── session/           # session CRUD + cookie/bearer auth
│   │   │   ├── thread/            # thread + message persistence
│   │   │   ├── agent-loop/        # core agentic loop (tool dispatch)
│   │   │   ├── governance/        # governance.json loader + RBAC checks
│   │   │   ├── vault/             # AES-256-GCM credential store
│   │   │   └── routes/            # /v1/* Hono router definitions
│   │   └── package.json
│   └── web/
│       ├── src/
│       │   ├── App.tsx            # React root
│       │   ├── pages/             # Chat, Agents, Connectors, Governance
│       │   ├── components/        # Thread list, message bubble, connector card
│       │   └── api/               # typed fetch wrappers for /v1/*
│       └── package.json
└── package.json                   # workspace root (npm workspaces)
```

## Key modules

### providers/

Thin adapters that translate governance-configured provider definitions into
`messages` API calls. Each adapter receives the team's effective provider config
from `governance.json`.

- `anthropic.ts` — uses `CLAUDE_CODE_OAUTH_TOKEN` via `Authorization: Bearer`
  header. Never reads `ANTHROPIC_API_KEY`. See `oauth-patch.md`.
- `ollama.ts` — hits `base_url` (e.g. `http://localhost:11434/v1`) with the
  OpenAI-compatible endpoint. No external auth.

### connectors/

Each connector exports an `McpHono` instance pre-configured with the connector's
tool definitions. The agent loop resolves the correct connector instance at
runtime from the team's `mcp_servers` allowlist in `governance.json`.

Connector credentials are fetched from the vault at tool-dispatch time, not at
startup — so rotating a credential requires no restart.

### agent-loop/

```
userMessage
  → buildContext(thread.history, agent.systemPrompt)
  → provider.messages.create({ stream: true })
  → for each chunk:
      if text_delta → stream to caller
      if tool_use   → dispatchTool(connector, toolName, input)
                        → vault.get(team, connector)
                        → connector.call(tool, input, credential)
                        → append tool_result to context
                        → loop
  → save assistant message to thread
```

### governance/

Parses `governance.json` and exposes typed accessors:
- `getTeamProviders(team)` — which LLM providers a team may use
- `getTeamConnectors(team)` — which MCP connectors a team may invoke
- `checkRbac(user, team, action)` — role-based access decision
- Live reload: `PUT /v1/governance` writes and hot-reloads the config without restart.

### vault/

AES-256-GCM encrypt/decrypt with per-team scope. Key material comes from
`CREDENTIAL_VAULT_KEY` (32-byte hex). Ciphertext is stored in the `credentials`
Postgres table. Plaintext never appears in logs or error messages.

## Session model

```
org
 └── team (members defined in governance.json RBAC)
      └── user (authenticated via session cookie / Bearer / x-api-key)
           └── session (logical workspace, named by user)
                └── thread (conversation context)
                     └── message[] (user | assistant | tool_result)
```

Sessions and threads are persisted to Postgres. A session can hold multiple
threads (e.g. parallel sub-tasks). Each thread carries its own message history;
the agent loop operates on one thread at a time.

## MCP integration

`@modelcontextprotocol/hono` provides the `McpHono` class, which wraps a
standard MCP server definition (tool schemas + handlers) into Hono routes.
Each connector is mounted at `/mcp/<connector-name>` and can be called
directly (for testing) or indirectly through the agent loop.

The server uses MCP's streamable-HTTP transport (not stdio), so connectors
run in-process and share the Hono event loop.

## Tool dispatch flow (detailed)

1. Agent loop receives a `tool_use` block from the provider stream.
2. Resolves connector: `governance.getTeamConnectors(team)` — find entry
   matching `tool_use.name` prefix (e.g. `slack_post_message` → `slack`).
3. Checks RBAC: team must have the connector in its `mcp_servers` list.
4. Fetches credential: `vault.get(team, connectorName)` — AES-256-GCM decrypt.
5. Calls `connector.callTool(toolName, input, credential)`.
6. Appends `{ role: "tool", tool_use_id, content: result }` to context.
7. Loops back to provider with updated context.

## Relevance to knowledge-engineering

The knowledge-engineering project (`subagentceo/knowledge-engineering`) forks
`open-managed-agents` as the `managedsubagents.com` backend (task t10-1).

Key adaptations required:

1. **OAuth patch (t12-2)** — swap `ANTHROPIC_API_KEY` for `CLAUDE_CODE_OAUTH_TOKEN`
   in `packages/server/src/providers/anthropic.ts`. See `oauth-patch.md`.
2. **governance.json** — configure teams: `engineering`, `knowledge-work`,
   `legal`, `finance` with appropriate provider + MCP policies.
3. **Cloudflare Worker** — the Hono server is deployable to Cloudflare Workers
   with `@hono/cloudflare-workers` adapter; swap Postgres for D1 or Hyperdrive.
4. **Custom connectors** — add knowledge-engineering-specific MCP connectors
   (Turbopuffer vector search, AlloyDB, etc.) following the existing connector pattern.
