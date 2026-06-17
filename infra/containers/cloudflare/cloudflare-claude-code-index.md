# Claude Code + Cloudflare Integration

<!-- @cite https://developers.cloudflare.com/agent-setup/claude-code/index.md -->
<!-- @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md -->
<!-- @cite src/mcp/ext-tasks/index.ts -->
<!-- @cite infra/postgres/init/00-extensions.sql -->
<!-- @cite src/lib/turbopuffer-alloydb-bridge.ts -->

Mirrored from `https://developers.cloudflare.com/agent-setup/claude-code/index.md`.
Treated as a **pg_durable task state machine**: each setup layer is a queue,
each step is a durable task, state flows through Redis (L2) → AlloyDB Omni (L3).

---

## Source doc: Claude Code + Cloudflare Overview

Claude Code is a terminal-based AI coding agent (Anthropic) that integrates with
Cloudflare's platform across three layers:

### Layer 1 — Cloudflare Skills
Persistent instructions teaching the agent platform conventions:
- Workers, KV, D1, R2, Queues, AI Gateway
- Infrastructure tools (wrangler, Terraform, Pages)
- Install: `/plugin marketplace add cloudflare/skills` inside a Claude Code session
  from the project root where `wrangler.jsonc` lives

### Layer 2 — MCP Servers
Live API access (no stale docs):
- **Code Mode** — 2,500+ Cloudflare API endpoints as callable tools
- **Analytics** — Workers Observability, Logpush, AI Gateway logs
- **Documentation** — markdown-first, llms.txt-indexed, token-efficient
- **DNS** — zone management, record CRUD
- **Observability** — real-time Workers metrics

### Layer 3 — Wrangler CLI
Local dev and deployment:
- `wrangler dev` — runs Worker in the actual Workers runtime (not a Node shim)
- `wrangler deploy` — one-command push to production
- `wrangler secret put` — secrets scoped to a Worker, never in env files

Entry point: install Claude Code (`npm install -g @anthropic-ai/claude-code`),
launch from the project root containing `wrangler.jsonc`.

---

## State machine: pg_durable task queues

Each layer maps to a pg_durable queue. A row in `dw.dim_cloudflare_agent_setup`
(SCD I) tracks the current install state per surface. `dw.events_cloudflare_agent`
is the append-only audit trail.

```
Layer 1: cloudflare:skills:install
  pending ──► running ──► completed
                   └───► failed

Layer 2: cloudflare:mcp:connect
  pending ──► running ──► completed
                   └───► failed

Layer 3: cloudflare:worker:deploy
  pending ──► running ──► completed
                   └───► failed
```

Tasks are created via `pgdurable.create_task(queue, payload::jsonb, ttl)`.
Cache reads: L1 in-process LRU → L2 Redis (`allkeys-lru`, 7-day TTL) → L3 AlloyDB.
On `complete_task`, the Redis key `task:<queue>:<id>` is evicted (see `ext-tasks/index.ts`).

### Task payload schemas (Zod)

```typescript
// Layer 1 — skill install
const SkillInstallPayload = z.object({
  source:   z.string(),             // e.g. "cloudflare/skills"
  skill:    z.string(),             // e.g. "building-ai-agent-on-cloudflare"
  version:  z.string().optional(),
  worker:   z.string().optional(),  // wrangler.jsonc name scope
});

// Layer 2 — MCP server connect
const McpConnectPayload = z.object({
  server:      z.string(),          // e.g. "cloudflare-observability"
  endpoint:    z.string().url(),
  auth_method: z.enum(["oauth", "api_token", "none"]),
  account_id:  z.string(),
});

// Layer 3 — Worker deploy
const WorkerDeployPayload = z.object({
  worker_name:  z.string(),         // wrangler.jsonc `name`
  account_id:   z.string(),
  zone:         z.string(),
  has_assets:   z.boolean(),
  wrangler_ver: z.string(),
  env:          z.enum(["production", "staging", "preview"]),
});
```

---

## AlloyDB Omni DDL

Runs on `gcr.io/alloydb-omni/alloydbomni:18` (canonical Postgres for this chassis).
Add to `infra/postgres/init/02-cloudflare-agent.sql`:

```sql
BEGIN;

-- SCD Type I: current install state per (account_id, layer, name)
CREATE TABLE IF NOT EXISTS dw.dim_cloudflare_agent_setup (
    surrogate_key   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id      TEXT        NOT NULL,
    layer           TEXT        NOT NULL
                        CHECK (layer IN ('skills', 'mcp', 'worker')),
    name            TEXT        NOT NULL,          -- skill/server/worker name
    status          TEXT        NOT NULL
                        CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    task_id         UUID,                          -- pg_durable task_id
    payload         JSONB       NOT NULL DEFAULT '{}',
    installed_at    TIMESTAMPTZ,
    last_seen_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    wrangler_ver    TEXT,
    notes           TEXT,
    UNIQUE (account_id, layer, name)
);
CREATE INDEX IF NOT EXISTS idx_cf_setup_status
    ON dw.dim_cloudflare_agent_setup (account_id, status);

-- Append-only lifecycle audit (mirrors dw.events_model pattern)
CREATE TABLE IF NOT EXISTS dw.events_cloudflare_agent (
    event_id     BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    occurred_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    account_id   TEXT        NOT NULL,
    layer        TEXT        NOT NULL CHECK (layer IN ('skills', 'mcp', 'worker')),
    name         TEXT        NOT NULL,
    event_type   TEXT        NOT NULL
                     CHECK (event_type IN (
                         'task_created', 'task_started', 'task_completed', 'task_failed',
                         'skill_installed', 'mcp_connected', 'worker_deployed',
                         'worker_cutover', 'config_changed', 'rollback'
                     )),
    task_id      UUID,
    old_value    JSONB,
    new_value    JSONB,
    source_url   TEXT,
    notes        TEXT
);
CREATE INDEX IF NOT EXISTS idx_cf_events_account_time
    ON dw.events_cloudflare_agent (account_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_cf_events_type_time
    ON dw.events_cloudflare_agent (event_type, occurred_at DESC);

COMMIT;
```

---

## Redis cache keys (allkeys-lru, 7-day TTL)

Follows the `cacheKey(namespace, id)` convention from `src/cache/lru-bm25.ts`:

```
task:cloudflare:skills:install:<uuid>   → SkillInstallPayload (TaskSchema)
task:cloudflare:mcp:connect:<uuid>      → McpConnectPayload (TaskSchema)
task:cloudflare:worker:deploy:<uuid>    → WorkerDeployPayload (TaskSchema)
cf:setup:<account_id>:<layer>:<name>    → dim_cloudflare_agent_setup row (7-day TTL)
```

On `complete_task`, `invalidate(redis, cacheKey(...))` fires (same pattern as
`ext-tasks/index.ts:101`). On `worker_cutover` event, invalidate both the old
and new worker deploy keys.

---

## Runtime wiring

```
Claude Code session
  │
  ├── /plugin marketplace add cloudflare/skills
  │     └── create_task(queue="cloudflare:skills:install", payload={...})
  │           └── pg_durable → AlloyDB
  │               └── cache set → Redis L2
  │
  ├── MCP connect: cloudflare-observability, cloudflare-dns, ...
  │     └── create_task(queue="cloudflare:mcp:connect", payload={...})
  │
  └── wrangler deploy (subagentknowledge-frontend)
        └── create_task(queue="cloudflare:worker:deploy", payload={
              worker_name: "subagentknowledge-frontend",
              account_id:  "e6294e3ea89f8207af387d459824aaae",
              zone:        "subagentknowledge.com",
              has_assets:  true,
              wrangler_ver: "^4.0.0",
              env:          "production"
            })
```

Account: `e6294e3ea89f8207af387d459824aaae` (alex@jadecli.com).
DATABASE_URL: AlloyDB Omni connection string (see `infra/postgres/` devcontainer).
REDIS_URL: `redis://localhost:6379` (default) or `REDIS_URL` env var.

---

## Claude Code on the web — session_id, Redis, Postgres, Docker

> @cite `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md`
> Source: `https://code.claude.com/docs/en/claude-code-on-the-web`

Claude Code on the web (claude.ai/code) runs each session in an
Anthropic-managed VM. The environment ships with the exact services this
repo's pg_durable + Redis + AlloyDB topology depends on:

### Pre-installed services (from the Installed tools table)

| Category | Included |
|---|---|
| **Databases** | **PostgreSQL 16**, **Redis 7.0** |
| **Docker** | docker, dockerd, docker compose |
| **Node.js** | 20, 21, 22 via nvm + npm/yarn/pnpm/bun |
| **Utilities** | git, jq, ripgrep, tmux |

PostgreSQL and Redis are pre-installed **but not running by default**.
Start them at session boot via a SessionStart hook or setup script:

```bash
service postgresql start
service redis-server start
```

Or use a `SessionStart` hook in `.claude/settings.json`:
```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{ "type": "command", "command": "service postgresql start && service redis-server start" }]
    }]
  }
}
```

Docker is available for `docker compose up` — `ke-cloud-agent`'s
`infra/cloudflare/Dockerfile` Sandbox container runs on this foundation.
Docker images pulled in the setup script are cached in the environment
snapshot; containers themselves must be restarted each session.

### CLAUDE_CODE_REMOTE_SESSION_ID → dw.agent_sessions.remote_session_id

Every cloud session exposes its own ID as an env var:

```bash
# prints the transcript URL for this session
echo "https://claude.ai/code/${CLAUDE_CODE_REMOTE_SESSION_ID/#cse_/session_}"
```

The `cse_` prefix in the env var maps to `session_` in the transcript URL.
This ID is the canonical link between a Claude.ai web session and the
`dw.agent_sessions` row that tracks it. The `remote_session_id` column
(added in `03-session-context.sql`) stores it so the session context table
is bidirectionally navigable: AlloyDB row → claude.ai transcript URL.

Redis key for hot session lookup:
```
session:remote:<cse_id>:context   → agent_sessions row (TTL 7d)
session:remote:<cse_id>:branch    → git branch for this session
```

### Environment variables in cloud sessions

Set via the environment settings dialog at claude.ai/code, `.env` format:

```
DATABASE_URL=postgres://localhost:5432/ke
REDIS_URL=redis://localhost:6379
CLAUDE_CODE_REMOTE=true
```

`CLAUDE_CODE_REMOTE=true` is set automatically by Anthropic in all web
sessions. Use it in SessionStart hooks to gate cloud-only setup:
```bash
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then exit 0; fi
npm ci --no-audit --no-fund && npm run build
```

### Resource limits in cloud sessions

- 4 vCPUs, 16 GB RAM, 30 GB disk
- PostgreSQL 16 + Redis 7.0 fit comfortably within these limits for
  development workloads (AlloyDB Omni in production replaces the local PG)
- Environment cache (setup script snapshot) persists ~7 days — Docker
  images and installed packages survive session restarts within that window

---

## See also

- `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md` — full web session doc
- `vendor/anthropics/code.claude.com/docs/en/sandbox-environments.md` — isolation comparison
- `src/mcp/ext-tasks/index.ts` — pg_durable MCP server (create/get/complete/list)
- `infra/postgres/init/00-extensions.sql` — pg_durable extension bootstrap
- `src/cache/durable-store.ts` — L3 AlloyDB semantic cache (promote-after-3-hits)
- `src/lib/turbopuffer-alloydb-bridge.ts` — AlloyDB Omni pool interface
- `infra/terraform/main.tf` — Cloudflare TF provider (bump to ~> 5.11 for static assets)
- `frontend/wrangler.jsonc` — outcomesdk-frontend / subagentknowledge.com deployment
