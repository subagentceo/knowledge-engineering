-- Cloudflare agent setup state machine.
-- @cite infra/containers/cloudflare/cloudflare-claude-code-index.md
-- @cite src/mcp/ext-tasks/index.ts

BEGIN;

-- @cube name=DimCloudflareAgentSetup version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_cloudflare_agent_setup
-- @cube.description  Current install state per (account_id, layer, name). SCD Type I — last-write wins.
--                    Tracks pg_durable task_id for in-flight deploys. UNIQUE on (account_id, layer, name).
-- @cube.measure      count                 COUNT(*)
-- @cube.measure      count_pending         COUNT(*) FILTER (WHERE status = 'pending')
-- @cube.measure      count_running         COUNT(*) FILTER (WHERE status = 'running')
-- @cube.measure      count_completed       COUNT(*) FILTER (WHERE status = 'completed')
-- @cube.measure      count_failed          COUNT(*) FILTER (WHERE status = 'failed')
-- @cube.dimension    account_id   TEXT      "CF account (e6294e3ea89f8207af387d459824aaae)"
-- @cube.dimension    layer        TEXT enum[skills,mcp,worker]
-- @cube.dimension    name         TEXT      "skill/server/worker name"
-- @cube.dimension    status       TEXT enum[pending,running,completed,failed]
-- @cube.dimension    task_id      UUID      "pg_durable task_id for this install"
-- @cube.dimension    wrangler_ver TEXT      "deploy tool version at install time"
-- @cube.dimension    installed_at TIMESTAMPTZ
-- @cube.segment      active       {status IN ('pending', 'running')}
-- @cube.segment      deployed     {status = 'completed'}
-- @cube.segment      workers      {layer = 'worker'}
-- @cube.join         events_cloudflare_agent: layer = layer AND name = name
-- @cube.pre_agg      by_account_status: {dimensions:[account_id,status], measures:[count]}
CREATE TABLE IF NOT EXISTS dw.dim_cloudflare_agent_setup (
    surrogate_key   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id      TEXT        NOT NULL,
    layer           TEXT        NOT NULL
                        CHECK (layer IN ('skills', 'mcp', 'worker')),
    name            TEXT        NOT NULL,
    status          TEXT        NOT NULL
                        CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    task_id         UUID,
    payload         JSONB       NOT NULL DEFAULT '{}',
    installed_at    TIMESTAMPTZ,
    last_seen_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    wrangler_ver    TEXT,
    notes           TEXT,
    UNIQUE (account_id, layer, name)
);
CREATE INDEX IF NOT EXISTS idx_cf_setup_status
    ON dw.dim_cloudflare_agent_setup (account_id, status);

-- @cube name=EventsCloudflareAgent version=2026.06.17 type=event
-- @cube.sql_table    dw.events_cloudflare_agent
-- @cube.description  Append-only audit trail for CF agent setup events.
--                    event_type encodes the pg_durable state transition that occurred.
-- @cube.measure      count                    COUNT(*)
-- @cube.measure      count_by_event_type      COUNT(*) GROUP BY event_type
-- @cube.measure      count_deployments        COUNT(*) FILTER (WHERE event_type = 'worker_deployed')
-- @cube.dimension    account_id   TEXT        "CF account"
-- @cube.dimension    layer        TEXT enum[skills,mcp,worker]
-- @cube.dimension    name         TEXT        "skill/server/worker name"
-- @cube.dimension    event_type   TEXT enum[task_created,task_started,task_completed,task_failed,skill_installed,mcp_connected,worker_deployed,worker_cutover,config_changed,rollback]
-- @cube.dimension    task_id      UUID
-- @cube.dimension    occurred_at  TIMESTAMPTZ
-- @cube.segment      deploy_events  {event_type IN ('worker_deployed','worker_cutover')}
-- @cube.segment      failure_events {event_type IN ('task_failed','rollback')}
-- @cube.join         dim_cloudflare_agent_setup: layer = layer AND name = name
-- @cube.pre_agg      by_account_type_day: {dimensions:[account_id,event_type], measures:[count]}
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
