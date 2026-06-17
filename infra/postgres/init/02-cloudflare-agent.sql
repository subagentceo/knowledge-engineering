-- Cloudflare agent setup state machine.
-- @cite infra/containers/cloudflare/cloudflare-claude-code-index.md
-- @cite src/mcp/ext-tasks/index.ts

BEGIN;

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
