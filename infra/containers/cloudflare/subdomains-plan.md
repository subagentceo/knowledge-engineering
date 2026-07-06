# subagentknowledge.com — Subdomain Architecture

<!-- @cite infra/containers/cloudflare/cloudflare-claude-code-index.md -->
<!-- @cite src/mcp/ext-tasks/index.ts -->
<!-- @cite src/cache/durable-store.ts -->
<!-- @cite infra/postgres/init/03-session-context.sql -->
<!-- @cite infra/containers/cloudflare/session-2026-06-17.redis -->

Account: `e6294e3ea89f8207af387d459824aaae` (alex@jadecli.com) — paid Workers tier.
108 domains, 80k req/day. Each subdomain = a new Cloudflare Worker with
`custom_domain: true`, its own pg_durable queue, Redis key namespace, and
AlloyDB backing table in the `dw` schema.

---

## Topology overview

```
subagentknowledge.com          → outcomesdk-frontend (existing; rename pending)
crawl.subagentknowledge.com    → subagentknowledge-crawl
pages.subagentknowledge.com    → subagentknowledge-pages
workers.subagentknowledge.com  → subagentknowledge-workers
plan.subagentknowledge.com     → subagentknowledge-plan
```

All four new workers share:
- **Hyperdrive** binding → AlloyDB Omni (same `DATABASE_URL` as `ext-tasks`)
- **KV** binding → `SUBAGENTKNOWLEDGE_CACHE` namespace (shared, keyed by subdomain prefix)
- **Redis** via Hyperdrive tunnel → `REDIS_URL` for L2 cache (same allkeys-lru pool)
- `dw.dim_cloudflare_agent_setup` rows (layer=`worker`) to track deploy state
- `dw.events_cloudflare_agent` rows for lifecycle events

---

## 1. crawl.subagentknowledge.com

**Worker:** `subagentknowledge-crawl`  
**Purpose:** Expose the `scripts/crawl-vendors.ts` cheerio crawl process as a
queryable HTTP API. Uses Cloudflare Queues for async job dispatch and
Browser Rendering for JS-heavy pages. R2 for large HTML snapshots, KV for
job state and checksums.

### Bindings
```jsonc
"kv_namespaces": [{ "binding": "CRAWL_STATE", "id": "<kv-id>" }],
"queues": {
  "producers": [{ "binding": "CRAWL_QUEUE", "queue": "subagentknowledge-crawl-jobs" }],
  "consumers": [{ "queue": "subagentknowledge-crawl-jobs", "max_batch_size": 5 }]
},
"browser": { "binding": "BROWSER" },
"r2_buckets": [{ "binding": "SNAPSHOTS", "bucket_name": "subagentknowledge-crawl" }],
"hyperdrive": [{ "binding": "DB", "id": "<hyperdrive-config-id>" }]
```

### API surface (Hono)
| Method | Path | Description |
|---|---|---|
| `GET /` | | List recent crawl jobs (from KV + AlloyDB) |
| `POST /crawl` | `{vendor, page_cap?, mode?}` | Queue a new crawl job via pg_durable |
| `GET /crawl/:id` | | Job status — L1 KV → L2 Redis → L3 AlloyDB |
| `GET /crawl/:id/urls` | | All crawled URLs with status |
| `GET /vendors` | | List crawlable vendors with last-run stats |
| `GET /vendors/:name` | | Single vendor last-run detail |

### pg_durable queue
```
queue = "subagentknowledge:crawl:job"
payload = { vendor: string, page_cap: number, mode: "incremental"|"full", requested_by: string }
states  = pending → running → completed | failed
```

### Redis keys
```
crawl:job:<uuid>:status      → { status, vendor, fetched, failed, started_at }  TTL 7d
crawl:vendor:<name>:last_run → { fetched, unchanged, failed, ran_at, status }    TTL 7d
crawl:vendor:<name>:urls     → sorted set: score=last_fetched_ts, member=url     TTL 7d
```

### AlloyDB (`dw` schema)
- `dw.crawl_runs` (from `03-session-context.sql`) — normalized run history
- `dw.dim_cloudflare_agent_setup` WHERE `layer='worker' AND name='subagentknowledge-crawl'`

---

## 2. pages.subagentknowledge.com

**Worker:** `subagentknowledge-pages`  
**Purpose:** Inventory all tagged Cloudflare Pages projects under
`e6294e3ea89f8207af387d459824aaae`. Renders project cards with deploy status,
custom domains, last deploy SHA, and resource tags.

### Bindings
```jsonc
"kv_namespaces": [{ "binding": "PAGES_CACHE", "id": "<kv-id>" }],
"hyperdrive": [{ "binding": "DB", "id": "<hyperdrive-config-id>" }],
"secrets_store_secrets": [{
  "binding": "CF_API_TOKEN",
  "store_id": "<store-id>",
  "secret_name": "CLOUDFLARE_API_TOKEN"
}]
```

### API surface
| Method | Path | Description |
|---|---|---|
| `GET /` | | All Pages projects (from KV cache, refreshed hourly) |
| `GET /tags` | | Unique tag keys across all projects |
| `GET /tags/:key/:value` | | Projects filtered by tag |
| `GET /:project` | | Single project + deploy history |
| `POST /refresh` | | Force-invalidate KV cache, re-query CF API |

### Redis keys
```
cf:pages:list                         → CF Pages API response (all projects)  TTL 1h
cf:pages:<project>:latest_deploy      → deploy sha + status                   TTL 5min
cf:pages:<project>:tags               → tag map                               TTL 7d
```

### AlloyDB
New `dw.dim_cf_pages` table (SCD I, one row per project):
```sql
CREATE TABLE IF NOT EXISTS dw.dim_cf_pages (
    surrogate_key   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id      TEXT NOT NULL,
    project_name    TEXT NOT NULL,
    production_url  TEXT,
    tags            JSONB NOT NULL DEFAULT '{}',
    last_deploy_sha TEXT,
    last_deploy_at  TIMESTAMPTZ,
    status          TEXT,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (account_id, project_name)
);
```

---

## 3. workers.subagentknowledge.com

**Worker:** `subagentknowledge-workers`  
**Purpose:** Inventory all 41 Workers in `e6294e3ea89f8207af387d459824aaae`.
Groups by Cloudflare resource tags (`owner`, `product`, `surface`, `env`).
Surfaces tag coverage gaps (workers with no tags → links to Terraform plan).

### Bindings
```jsonc
"kv_namespaces": [{ "binding": "WORKERS_CACHE", "id": "<kv-id>" }],
"hyperdrive": [{ "binding": "DB", "id": "<hyperdrive-config-id>" }],
"secrets_store_secrets": [{
  "binding": "CF_API_TOKEN",
  "store_id": "<store-id>",
  "secret_name": "CLOUDFLARE_API_TOKEN"
}]
```

### API surface
| Method | Path | Description |
|---|---|---|
| `GET /` | | All workers with tag summary |
| `GET /untagged` | | Workers missing canonical tags |
| `GET /tags` | | Tag key inventory + coverage % |
| `GET /tags/:key/:value` | | Workers filtered by tag |
| `GET /:name` | | Single worker detail + `dw.dim_cloudflare_agent_setup` row |
| `POST /refresh` | | Force-invalidate + re-query CF Workers API |

### Redis keys
```
cf:workers:list                        → full workers list from CF API     TTL 1h
cf:workers:<name>:tags                 → tag map for one worker            TTL 7d
cf:workers:<name>:setup                → dim_cloudflare_agent_setup row    TTL 1d
cf:workers:untagged                    → set of untagged worker names      TTL 1h
```

### AlloyDB
- `dw.dim_cloudflare_agent_setup WHERE layer='worker'` — canonical worker state
- Tag coverage query: `SELECT name, payload->>'owner' AS owner FROM dw.dim_cloudflare_agent_setup WHERE layer='worker' AND payload->>'owner' IS NULL`

---

## 4. plan.subagentknowledge.com

**Worker:** `subagentknowledge-plan`  
**Purpose:** Render each open PR in `subagentceo/knowledge-engineering` as an
`.mdx`-style page visualizing the pg_durable state machine. PR description
contains `task_id: <uuid>` (or the worker looks up by branch name). State
transitions from `dw.events_cloudflare_agent` drive the timeline diagram.

### Bindings
```jsonc
"kv_namespaces": [{ "binding": "PLAN_CACHE", "id": "<kv-id>" }],
"hyperdrive": [{ "binding": "DB", "id": "<hyperdrive-config-id>" }],
"d1_databases": [{ "binding": "PR_INDEX", "database_id": "<d1-id>" }],
"secrets_store_secrets": [
  { "binding": "GITHUB_TOKEN", "store_id": "<store-id>", "secret_name": "GITHUB_TOKEN" },
  { "binding": "CF_API_TOKEN", "store_id": "<store-id>", "secret_name": "CLOUDFLARE_API_TOKEN" }
]
```

D1 (`PR_INDEX`) is the local edge copy — AlloyDB is source of truth. D1 is
populated by a scheduled Worker cron that syncs `dw.events_cloudflare_agent`
every 5 minutes (stays within D1 free tier at current PR volume).

### API surface
| Method | Path | Description |
|---|---|---|
| `GET /` | | All open PRs with task state summary |
| `GET /pr/:number` | | Single PR as MDX: description + state machine diagram + event timeline |
| `GET /pr/:number/state` | | Raw pg_durable task state for the PR's `task_id` |
| `GET /pr/:number/events` | | `dw.events_cloudflare_agent` rows for the task |
| `GET /queue/:queue` | | pg_durable queue view (pending/running/completed/failed counts) |

### MDX state machine diagram (Mermaid in Worker response)
```
stateDiagram-v2
    [*] --> pending: task_created
    pending --> running: task_started
    running --> completed: task_completed
    running --> failed: task_failed
    completed --> [*]
    failed --> pending: retry
```
Rendered server-side in the Worker using `@mermaid-js/mermaid-isomorphic`
or serialized as a `<pre data-mermaid>` block for client-side render.

### pg_durable queue
```
queue   = "subagentknowledge:plan:pr-sync"
payload = { pr_number: number, head_sha: string, branch: string, task_id: string|null }
```

### Redis keys
```
gh:pr:<number>:state          → { title, status, head_sha, task_id }        TTL 5min
gh:pr:<number>:events         → events_cloudflare_agent rows for task_id    TTL 30s
pgdurable:task:<uuid>:status  → { status, queue, created_at, result }       TTL 30s
plan:queues:summary           → { pending, running, completed, failed } per queue  TTL 30s
```

### AlloyDB queries
```sql
-- Event timeline for a PR's task
SELECT event_type, occurred_at, old_value, new_value, notes
FROM dw.events_cloudflare_agent
WHERE task_id = $1
ORDER BY occurred_at ASC;

-- Queue depth per queue
SELECT layer, COUNT(*) FILTER (WHERE status='pending')   AS pending,
              COUNT(*) FILTER (WHERE status='running')   AS running,
              COUNT(*) FILTER (WHERE status='completed') AS completed,
              COUNT(*) FILTER (WHERE status='failed')    AS failed
FROM dw.dim_cloudflare_agent_setup
GROUP BY layer;
```

---

## Deployment order

```
1. Deploy subagentknowledge-crawl    → crawl.subagentknowledge.com
2. Deploy subagentknowledge-pages    → pages.subagentknowledge.com
3. Deploy subagentknowledge-workers  → workers.subagentknowledge.com
4. Deploy subagentknowledge-plan     → plan.subagentknowledge.com
5. Phase 3 cutover (manual approval) → subagentknowledge-frontend replaces outcomesdk-frontend
```

Steps 1–4 carry zero downtime risk — no custom domains are being migrated.
Step 5 is the only irreversible step; see `frontend/wrangler.jsonc:20-23`.

## KV namespaces to provision

```bash
wrangler kv namespace create CRAWL_STATE    # → crawl worker
wrangler kv namespace create PAGES_CACHE    # → pages worker
wrangler kv namespace create WORKERS_CACHE  # → workers worker
wrangler kv namespace create PLAN_CACHE     # → plan worker
```

One shared `SUBAGENTKNOWLEDGE_CACHE` is an option but per-binding isolation
is preferred — clear eviction scope, separate rate limits.

## Hyperdrive config (shared across all four workers)

```bash
wrangler hyperdrive create subagentknowledge-db \
  --connection-string "$DATABASE_URL"
# → returns config ID; paste into each wrangler.jsonc hyperdrive binding
```

## Tagging convention (all four workers + existing workers)

Apply via `infra/terraform/workers-frontend.tf` once TF provider bumped to v5.11:

```hcl
tags = {
  owner   = "alex@jadecli.com"
  product = "subagentknowledge"
  surface = <"frontend"|"crawl"|"pages"|"workers"|"plan">
  env     = "production"
  iac     = "terraform+wrangler"
  tier    = "paid"
}
```

## See also

- `infra/workers/crawl.wrangler.jsonc`
- `infra/workers/pages.wrangler.jsonc`
- `infra/workers/workers-inv.wrangler.jsonc`
- `infra/workers/plan.wrangler.jsonc`
- `infra/postgres/init/02-cloudflare-agent.sql`
- `infra/postgres/init/03-session-context.sql`
- `infra/containers/cloudflare/session-2026-06-17.redis`
- `src/mcp/ext-tasks/index.ts` (pg_durable MCP server)
