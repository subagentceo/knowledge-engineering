# OMA Technical Architecture

## Package structure

```
open-managed-agents/
  packages/
    server/          # Core agent HTTP server
    client/          # Client SDK
    shared/          # Shared types and schemas
```

### packages/server internals

```
packages/server/src/
  providers/
    anthropic.ts     # Anthropic API adapter — PATCHED for OAuth (see below)
    openai.ts        # OpenAI adapter (unused in this fork)
  routes/
    chat.ts          # POST /v1/chat — main conversation endpoint
    sessions.ts      # GET /v1/sessions, POST /v1/sessions/:id/messages, DELETE /v1/sessions/:id
    health.ts        # GET /v1/health
  middleware/
    auth.ts          # Bearer token validation
    logging.ts       # Structured request/response logging
    rate-limiting.ts # Per-token rate limit enforcement
```

### packages/client

TypeScript SDK wrapping the server REST API. Exports `AgentClient` with methods matching each route (`chat`, `listSessions`, `appendMessage`, `terminateSession`). Consumed by knowledge-engineering's orchestrator.

### packages/shared

Zod schemas for request/response payloads, shared error types, and session state enums. Both `packages/server` and `packages/client` import from here — never duplicate type definitions between them.

## Critical OAuth fix

`packages/server/src/providers/anthropic.ts` originally reads `env.ANTHROPIC_API_KEY`. This violates the OAuth-only invariant. The patched version:

```typescript
// packages/server/src/providers/anthropic.ts (PATCHED)
const client = new Anthropic({
  defaultHeaders: {
    Authorization: `Bearer ${env.CLAUDE_CODE_OAUTH_TOKEN}`,
  },
});
```

Full diff in `oauth-patch.md`. After applying, `grep -r "ANTHROPIC_API_KEY" packages/` must return zero results.

## Deployment targets

| Target | Notes |
| :--- | :--- |
| Node.js server | Standard `node dist/server.js` — for local dev and staging |
| Cloudflare Worker | Via `@cloudflare/workers-types`; KV binding for session store; Durable Objects optional for long-lived sessions |

CF Worker deployment uses `wrangler.toml` at `packages/server/wrangler.toml`. Session state is stored in a KV namespace bound as `SESSIONS_KV`.

## Integration with knowledge-engineering

The OMA agent server connects to the MCP bridge (`src/mcp/bridge-server.ts`) via one of two transports:

- **stdio** — local dev; bridge server spawned as child process
- **SSE** — production; bridge server runs as a separate Worker or service, OMA server connects over HTTP

The bridge exposes the 16+ tool lanes (`engineering_*`, `blog_*`, `support_*`, `llms_*`, `vendor_*`) which the agent calls during session execution.

## Environment requirements

| Variable | Required | Notes |
| :--- | :--- | :--- |
| `CLAUDE_CODE_OAUTH_TOKEN` | Yes | Bearer token for Anthropic API calls |
| `SESSIONS_KV` | Yes (CF Workers) | KV namespace binding for session persistence |
| `MCP_BRIDGE_URL` | Yes (SSE transport) | URL of the MCP bridge server |
| `ANTHROPIC_API_KEY` | BANNED | Presence triggers startup abort |
