-- Prompt context schema: dim_user, dim_os, dim_device, dim_network, fact_sessions, fact_prompts.
-- YAML contracts: data/models/alloydb/dim_user.yaml … fact_prompts.yaml
-- Cube.js semantics: @cube.* annotations above each CREATE TABLE (version 2026.06.17)
-- orjson payload: fact_prompts.payload JSONB (JSON.stringify; msgpack for L2 Redis cache)
--
-- @cite data/models/alloydb/dim_user.yaml
-- @cite data/models/alloydb/fact_prompts.yaml
-- @cite infra/postgres/init/04-tailscale-pr-context.sql
-- @cite src/lib/tailscale-pr-context.ts
-- @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md

BEGIN;

-- @cube name=DimUser version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_user
-- @cube.description  User identity dimension (SCD I). One row per (operator_email, github_login).
--                    Maps Claude Code operators to Tailscale mesh identities.
-- @cube.measure      user_count   COUNT(*)                              type:count
-- @cube.dimension    user_sk      BIGINT pk                             type:number   "surrogate key"
-- @cube.dimension    operator_email TEXT                                type:string   "admin@jadecli.com"
-- @cube.dimension    github_login   TEXT                                type:string   "admin-jadecli | alex-jadecli | alex-osa"
-- @cube.dimension    tailscale_host TEXT                                type:string   "macbook-m5 | wsl2-dev"
-- @cube.dimension    tailnet        TEXT                                type:string   "ts.subagentceo.io"
-- @cube.dimension    os_type        TEXT enum[macos,windows,linux,wsl]  type:string
-- @cube.segment      macos_users    {os_type = 'macos'}
-- @cube.segment      wsl_users      {os_type = 'wsl'}
-- @cube.join         fact_sessions: user_sk = user_sk
-- @cube.join         fact_prompts:  user_sk = user_sk
-- @cube.pre_agg      by_os_type: {dimensions:[os_type], measures:[user_count]}
CREATE TABLE IF NOT EXISTS dw.dim_user (
    user_sk        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operator_email TEXT        NOT NULL,
    github_login   TEXT        NOT NULL,
    tailscale_host TEXT,
    tailnet        TEXT        NOT NULL DEFAULT 'ts.subagentceo.io',
    os_type        TEXT        CHECK (os_type IN ('macos', 'windows', 'linux', 'wsl', 'docker')),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (operator_email, github_login)
);
CREATE INDEX IF NOT EXISTS idx_dim_user_email      ON dw.dim_user (operator_email);
CREATE INDEX IF NOT EXISTS idx_dim_user_github     ON dw.dim_user (github_login);

-- @cube name=DimOs version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_os
-- @cube.description  OS context dimension (SCD I). macOS arm64, Ubuntu-26.04 WSL, Docker.
-- @cube.measure      os_count           COUNT(*)                            type:count
-- @cube.measure      count_by_platform  COUNT(*) GROUP BY platform          type:count
-- @cube.dimension    os_sk      BIGINT pk                                   type:number
-- @cube.dimension    platform   TEXT enum[macos,windows,linux,docker]       type:string
-- @cube.dimension    os         TEXT                                         type:string   "darwin | ubuntu | windows-server-2022"
-- @cube.dimension    os_version TEXT                                         type:string   "26.04 | 15.x"
-- @cube.dimension    wsl_distro TEXT                                         type:string   "Ubuntu-26.04 | NULL"
-- @cube.dimension    arch       TEXT enum[arm64,x86_64,amd64]               type:string
-- @cube.segment      wsl_distros    {wsl_distro IS NOT NULL}
-- @cube.segment      macos_arm64    {platform = 'macos' AND arch = 'arm64'}
-- @cube.join         dim_device: os_sk = os_sk
-- @cube.pre_agg      by_platform_arch: {dimensions:[platform,arch], measures:[os_count]}
CREATE TABLE IF NOT EXISTS dw.dim_os (
    os_sk      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    platform   TEXT        NOT NULL CHECK (platform IN ('macos', 'windows', 'linux', 'docker')),
    os         TEXT        NOT NULL,
    os_version TEXT,
    wsl_distro TEXT,
    arch       TEXT        NOT NULL CHECK (arch IN ('arm64', 'x86_64', 'amd64')),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (platform, os, os_version, wsl_distro, arch)
);
CREATE INDEX IF NOT EXISTS idx_dim_os_platform ON dw.dim_os (platform);

-- @cube name=DimDevice version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_device
-- @cube.description  Physical/virtual Tailscale device (SCD I). tag:dev = macbook-m5, wsl2-dev.
--                    tag:container = ke-alloydb, ke-redis, ke-cloud-agent.
-- @cube.measure      device_count     COUNT(*)                            type:count
-- @cube.measure      count_by_tag     COUNT(*) GROUP BY tailscale_tag     type:count
-- @cube.dimension    device_sk    BIGINT pk                               type:number
-- @cube.dimension    hostname     TEXT                                     type:string   "MagicDNS short name"
-- @cube.dimension    tailscale_ip TEXT                                     type:string   "100.x.y.z"
-- @cube.dimension    tailscale_tag TEXT enum[tag:dev,tag:container,tag:server] type:string
-- @cube.dimension    os_sk        BIGINT fk                               type:number   "→ dw.dim_os"
-- @cube.dimension    platform     TEXT                                     type:string   "denormalized from dim_os"
-- @cube.dimension    arch         TEXT                                     type:string
-- @cube.segment      dev_devices        {tailscale_tag = 'tag:dev'}
-- @cube.segment      container_devices  {tailscale_tag = 'tag:container'}
-- @cube.join         dim_os:       os_sk = os_sk
-- @cube.join         fact_sessions: device_sk = device_sk
-- @cube.pre_agg      by_tag: {dimensions:[tailscale_tag], measures:[device_count]}
CREATE TABLE IF NOT EXISTS dw.dim_device (
    device_sk     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hostname      TEXT        NOT NULL UNIQUE,
    tailscale_ip  TEXT,
    tailscale_tag TEXT        NOT NULL
                      CHECK (tailscale_tag IN ('tag:dev', 'tag:container', 'tag:server')),
    os_sk         BIGINT      REFERENCES dw.dim_os(os_sk),
    platform      TEXT,
    arch          TEXT,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dim_device_tag      ON dw.dim_device (tailscale_tag);
CREATE INDEX IF NOT EXISTS idx_dim_device_hostname ON dw.dim_device (hostname);

-- @cube name=DimNetwork version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_network
-- @cube.description  Tailscale tailnet topology snapshot (SCD I). ts.subagentceo.io mesh.
--                    One row per (tailnet, tailscale_tag, provider).
-- @cube.measure      network_count  COUNT(*)   type:count
-- @cube.dimension    network_sk   BIGINT pk    type:number
-- @cube.dimension    tailnet      TEXT          type:string  "ts.subagentceo.io"
-- @cube.dimension    provider     TEXT          type:string  enum[tailscale,cloudflare,local]
-- @cube.dimension    tailscale_tag TEXT         type:string  enum[tag:dev,tag:container,tag:server]
-- @cube.dimension    ip_range     TEXT          type:string  "100.64.0.0/10 (CGNAT)"
-- @cube.dimension    dns_suffix   TEXT          type:string  "ts.subagentceo.io"
-- @cube.join         fact_sessions: network_sk = network_sk
-- @cube.pre_agg      by_tag: {dimensions:[tailscale_tag,provider], measures:[network_count]}
CREATE TABLE IF NOT EXISTS dw.dim_network (
    network_sk    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tailnet       TEXT        NOT NULL DEFAULT 'ts.subagentceo.io',
    provider      TEXT        NOT NULL DEFAULT 'tailscale'
                      CHECK (provider IN ('tailscale', 'cloudflare', 'local')),
    tailscale_tag TEXT        NOT NULL
                      CHECK (tailscale_tag IN ('tag:dev', 'tag:container', 'tag:server')),
    ip_range      TEXT        NOT NULL DEFAULT '100.64.0.0/10',
    dns_suffix    TEXT        NOT NULL DEFAULT 'ts.subagentceo.io',
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tailnet, tailscale_tag, provider)
);

-- @cube name=FactSessions version=2026.06.17 type=fact-transactional
-- @cube.sql_table    dw.fact_sessions
-- @cube.description  One row per Claude Code agent session. Links all four dimension tables.
--                    Grain: session_id (branch-YYYY-MM-DD slug). Status: open → closed | merged.
-- @cube.measure      session_count      COUNT(*)                                      type:count
-- @cube.measure      duration_seconds   AVG(EXTRACT(EPOCH FROM(closed_at-started_at))) type:avg
-- @cube.dimension    session_sk   BIGINT pk   type:number
-- @cube.dimension    session_id   TEXT         type:string  "slug: branch-YYYY-MM-DD"
-- @cube.dimension    branch       TEXT         type:string
-- @cube.dimension    user_sk      BIGINT fk    type:number  "→ dw.dim_user"
-- @cube.dimension    device_sk    BIGINT fk    type:number  "→ dw.dim_device"
-- @cube.dimension    os_sk        BIGINT fk    type:number  "→ dw.dim_os"
-- @cube.dimension    network_sk   BIGINT fk    type:number  "→ dw.dim_network"
-- @cube.dimension    status       TEXT          type:string  enum[open,closed,merged]
-- @cube.dimension    started_at   TIMESTAMPTZ   type:time
-- @cube.dimension    closed_at    TIMESTAMPTZ   type:time
-- @cube.segment      open_sessions    {status = 'open'}
-- @cube.segment      merged_sessions  {status = 'merged'}
-- @cube.join         dim_user:    user_sk = user_sk
-- @cube.join         dim_device:  device_sk = device_sk
-- @cube.join         dim_os:      os_sk = os_sk
-- @cube.join         dim_network: network_sk = network_sk
-- @cube.join         fact_prompts: session_sk = session_sk
-- @cube.pre_agg      by_user_status: {dimensions:[user_sk,status], measures:[session_count]}
CREATE TABLE IF NOT EXISTS dw.fact_sessions (
    session_sk  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id  TEXT        NOT NULL UNIQUE,
    branch      TEXT        NOT NULL,
    user_sk     BIGINT      REFERENCES dw.dim_user(user_sk),
    device_sk   BIGINT      REFERENCES dw.dim_device(device_sk),
    os_sk       BIGINT      REFERENCES dw.dim_os(os_sk),
    network_sk  BIGINT      REFERENCES dw.dim_network(network_sk),
    status      TEXT        NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open', 'closed', 'merged')),
    started_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at   TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_fact_sessions_user      ON dw.fact_sessions (user_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sessions_device    ON dw.fact_sessions (device_sk);
CREATE INDEX IF NOT EXISTS idx_fact_sessions_status    ON dw.fact_sessions (status);
CREATE INDEX IF NOT EXISTS idx_fact_sessions_started   ON dw.fact_sessions (started_at DESC);

-- @cube name=FactPrompts version=2026.06.17 type=event
-- @cube.sql_table    dw.fact_prompts
-- @cube.description  Append-only prompt/response turn log. payload is JSONB (orjson-compatible:
--                    {prompt, response, tool_calls, input_tokens, output_tokens}).
--                    Serialized via JSON.stringify in TypeScript; msgpack for Redis L2 cache.
--                    Dedup via prompt_hash (SHA256). Never UPDATE or DELETE.
-- @cube.measure      prompt_count        COUNT(*)            type:count
-- @cube.measure      input_tokens        SUM(input_tokens)   type:sum
-- @cube.measure      output_tokens       SUM(output_tokens)  type:sum
-- @cube.measure      avg_input_tokens    AVG(input_tokens)   type:avg
-- @cube.measure      avg_output_tokens   AVG(output_tokens)  type:avg
-- @cube.dimension    prompt_id    BIGINT pk    type:number
-- @cube.dimension    session_sk   BIGINT fk    type:number  "→ dw.fact_sessions"
-- @cube.dimension    turn_number  INTEGER       type:number  "1-indexed turn"
-- @cube.dimension    role         TEXT          type:string  enum[user,assistant,tool_use,tool_result]
-- @cube.dimension    model        TEXT          type:string  "claude-sonnet-4-6 | claude-opus-4-8 | ..."
-- @cube.dimension    prompt_hash  TEXT          type:string  "SHA256 of payload text"
-- @cube.dimension    payload      JSONB         type:string  "orjson-style: {prompt,response,tool_calls}"
-- @cube.dimension    occurred_at  TIMESTAMPTZ   type:time
-- @cube.segment      user_turns      {role = 'user'}
-- @cube.segment      assistant_turns {role = 'assistant'}
-- @cube.segment      tool_turns      {role IN ('tool_use','tool_result')}
-- @cube.join         fact_sessions: session_sk = session_sk
-- @cube.pre_agg      by_session_model: {dimensions:[session_sk,model], measures:[prompt_count,input_tokens,output_tokens]}
CREATE TABLE IF NOT EXISTS dw.fact_prompts (
    prompt_id    BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_sk   BIGINT      NOT NULL REFERENCES dw.fact_sessions(session_sk),
    turn_number  INTEGER     NOT NULL CHECK (turn_number >= 1),
    role         TEXT        NOT NULL
                     CHECK (role IN ('user', 'assistant', 'tool_use', 'tool_result')),
    model        TEXT,
    input_tokens INTEGER     NOT NULL DEFAULT 0,
    output_tokens INTEGER    NOT NULL DEFAULT 0,
    -- SHA256 hex digest of payload text for deduplication
    prompt_hash  TEXT,
    -- orjson-style JSONB: {prompt, response, tool_calls, input_tokens, output_tokens}
    payload      JSONB       NOT NULL DEFAULT '{}',
    occurred_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (session_sk, turn_number, role)
);
CREATE INDEX IF NOT EXISTS idx_fact_prompts_session    ON dw.fact_prompts (session_sk, turn_number);
CREATE INDEX IF NOT EXISTS idx_fact_prompts_model      ON dw.fact_prompts (model, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_fact_prompts_role       ON dw.fact_prompts (role, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_fact_prompts_hash       ON dw.fact_prompts (prompt_hash) WHERE prompt_hash IS NOT NULL;

-- ── Seed data — Tailscale mesh + current session context ──────────────────────

INSERT INTO dw.dim_os (platform, os, os_version, wsl_distro, arch) VALUES
  ('macos',   'darwin',    '15.x', NULL,           'arm64'),
  ('linux',   'ubuntu',    '26.04','Ubuntu-26.04',  'x86_64'),
  ('docker',  'ubuntu',    '22.04', NULL,           'x86_64'),
  ('windows', 'windows-server-2022', '2022', NULL,  'x86_64')
ON CONFLICT (platform, os, os_version, wsl_distro, arch) DO NOTHING;

INSERT INTO dw.dim_network (tailnet, provider, tailscale_tag, ip_range, dns_suffix) VALUES
  ('ts.subagentceo.io', 'tailscale', 'tag:dev',       '100.64.0.0/10', 'ts.subagentceo.io'),
  ('ts.subagentceo.io', 'tailscale', 'tag:container', '100.64.0.0/10', 'ts.subagentceo.io'),
  ('ts.subagentceo.io', 'tailscale', 'tag:server',    '100.64.0.0/10', 'ts.subagentceo.io')
ON CONFLICT (tailnet, tailscale_tag, provider) DO NOTHING;

INSERT INTO dw.dim_user (operator_email, github_login, tailscale_host, os_type) VALUES
  ('admin@jadecli.com', 'admin-jadecli', 'macbook-m5', 'macos'),
  ('alex@jadecli.com',  'alex-jadecli',  'macbook-m5', 'macos'),
  ('admin@jadecli.com', 'alex-osa',      'wsl2-dev',   'wsl')
ON CONFLICT (operator_email, github_login) DO NOTHING;

COMMIT;
