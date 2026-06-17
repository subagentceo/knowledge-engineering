-- Tailscale network context + PR merge event store.
-- Deterministic semvar date key: yyyy.mm.dd PST (PDT in summer = UTC-7).
-- "2026.06.16" PST → UTC window 2026-06-16T07:00:00Z..2026-06-17T07:00:00Z
--
-- @cite infra/tailscale/README.md
-- @cite infra/tailscale/tailnet-policy.hujson
-- @cite infra/postgres/init/03-session-context.sql
-- @cite src/lib/tailscale-pr-context.ts

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- @cube name=DimTailscaleNode version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.dim_tailscale_node
-- @cube.description  Current state per Tailscale node. SCD Type I — last-write wins.
--                    Nodes belong to tailnet ts.subagentceo.io; tags from tailnet-policy.hujson.
-- @cube.measure      count               COUNT(*)  type:count
-- @cube.measure      count_active        COUNT(*) FILTER (WHERE status = 'active')  type:count
-- @cube.measure      count_by_tag        COUNT(*) GROUP BY tag  type:count
-- @cube.dimension    hostname   TEXT pk   "MagicDNS short name (wsl2-dev, macbook-m5, ke-alloydb, ...)"
-- @cube.dimension    tailnet    TEXT       "ts.subagentceo.io"
-- @cube.dimension    ts_ip      TEXT       "100.x.y.z Tailscale IP"
-- @cube.dimension    tag        TEXT enum[tag:dev,tag:container,tag:server]
-- @cube.dimension    os         TEXT       "ubuntu-24.04 | macos-arm64 | docker-alpine"
-- @cube.dimension    status     TEXT enum[active,inactive,ephemeral]
-- @cube.dimension    last_seen_at TIMESTAMPTZ
-- @cube.segment      dev_nodes       {tag = 'tag:dev'}
-- @cube.segment      container_nodes {tag = 'tag:container'}
-- @cube.segment      server_nodes    {tag = 'tag:server'}
-- @cube.segment      active          {status = 'active'}
-- @cube.join         events_pr_merge: hostname = initiating_node
-- @cube.pre_agg      by_tag_status: {dimensions:[tag,status], measures:[count]}
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dw.dim_tailscale_node (
    hostname        TEXT        PRIMARY KEY,
    tailnet         TEXT        NOT NULL DEFAULT 'ts.subagentceo.io',
    ts_ip           TEXT,
    tag             TEXT        NOT NULL
                        CHECK (tag IN ('tag:dev','tag:container','tag:server')),
    os              TEXT,
    status          TEXT        NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active','inactive','ephemeral')),
    last_seen_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata        JSONB       NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_ts_node_tag    ON dw.dim_tailscale_node (tag);
CREATE INDEX IF NOT EXISTS idx_ts_node_status ON dw.dim_tailscale_node (status);

-- ─────────────────────────────────────────────────────────────────────────────
-- @cube name=EventsPrMerge version=2026.06.17 type=event
-- @cube.sql_table    dw.events_pr_merge
-- @cube.description  Append-only PR merge events with Tailscale initiating-node context.
--                    semvar_date is the PST calendar date of merge in yyyy.mm.dd format.
--                    UTC bounds: semvar_date PDT (UTC-7) → window start = T+07:00:00Z.
-- @cube.measure      count                   COUNT(*)  type:count
-- @cube.measure      count_by_semvar_date    COUNT(*) GROUP BY semvar_date  type:count
-- @cube.measure      files_changed_sum       SUM(files_changed)  type:sum
-- @cube.measure      avg_files_changed       AVG(files_changed)  type:avg
-- @cube.dimension    pr_number    INTEGER    "GitHub PR number"
-- @cube.dimension    semvar_date  TEXT       "yyyy.mm.dd PST — deterministic version key"
-- @cube.dimension    merged_at    TIMESTAMPTZ "UTC merge timestamp from GitHub API"
-- @cube.dimension    branch       TEXT        "head ref (claude/* convention)"
-- @cube.dimension    initiating_node TEXT    "Tailscale hostname that triggered the merge"
-- @cube.dimension    initiating_tag  TEXT    "Tailscale tag of initiating node"
-- @cube.dimension    pr_type      TEXT enum[feat,fix,chore,docs,refactor,test]
-- @cube.dimension    scope        TEXT        "Conventional Commit scope"
-- @cube.dimension    files_changed INTEGER
-- @cube.segment      feat_prs     {pr_type = 'feat'}
-- @cube.segment      fix_prs      {pr_type = 'fix'}
-- @cube.segment      merged_pst_2026_06_16 {semvar_date = '2026.06.16'}
-- @cube.join         dim_tailscale_node: initiating_node = hostname
-- @cube.join         agent_sessions:     branch = branch
-- @cube.pre_agg      daily_by_type: {dimensions:[semvar_date,pr_type], measures:[count,files_changed_sum]}
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dw.events_pr_merge (
    event_id         BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pr_number        INTEGER     NOT NULL,
    title            TEXT        NOT NULL,
    branch           TEXT        NOT NULL,
    merged_at        TIMESTAMPTZ NOT NULL,
    -- semvar_date: PST/PDT calendar date the merge landed (yyyy.mm.dd)
    semvar_date      TEXT        NOT NULL,
    -- UTC bounds stored for query determinism
    utc_window_start TIMESTAMPTZ NOT NULL,
    utc_window_end   TIMESTAMPTZ NOT NULL,
    pr_type          TEXT        CHECK (pr_type IN ('feat','fix','chore','docs','refactor','test','ci')),
    scope            TEXT,
    files_changed    INTEGER     NOT NULL DEFAULT 0,
    initiating_node  TEXT        REFERENCES dw.dim_tailscale_node(hostname),
    initiating_tag   TEXT,
    repo             TEXT        NOT NULL DEFAULT 'subagentceo/knowledge-engineering',
    payload          JSONB       NOT NULL DEFAULT '{}',
    UNIQUE (pr_number, repo)
);
CREATE INDEX IF NOT EXISTS idx_pr_merge_semvar   ON dw.events_pr_merge (semvar_date);
CREATE INDEX IF NOT EXISTS idx_pr_merge_merged   ON dw.events_pr_merge (merged_at DESC);
CREATE INDEX IF NOT EXISTS idx_pr_merge_node     ON dw.events_pr_merge (initiating_node);
CREATE INDEX IF NOT EXISTS idx_pr_merge_type     ON dw.events_pr_merge (pr_type, semvar_date);

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: Tailscale nodes (ts.subagentceo.io mesh)
-- Source: infra/tailscale/README.md + tailnet-policy.hujson
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO dw.dim_tailscale_node (hostname, tag, os, metadata) VALUES
  ('wsl2-dev',    'tag:dev',       'ubuntu-24.04',
   '{"claude_code_port_range":"5000-5100","ssh":true,"funnel":true,"mullvad":true}'),
  ('macbook-m5',  'tag:dev',       'macos-arm64',
   '{"claude_code_port_range":"5000-5100","ssh":true,"funnel":true,"mullvad":true}'),
  ('ke-alloydb',  'tag:container', 'docker',
   '{"image":"gcr.io/alloydb-omni/alloydbomni:18","port":5432,"funnel":true}'),
  ('ke-redis',    'tag:container', 'docker',
   '{"image":"redis:7.0","port":6379,"funnel":true}'),
  ('ke-cloud-agent','tag:container','docker',
   '{"image":"ke-cloud-agent","worker":"ke-cloud-agent","funnel":true}')
ON CONFLICT (hostname) DO UPDATE
  SET updated_at = NOW(), metadata = EXCLUDED.metadata;

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: PRs merged 2026-06-16 PST (PDT=UTC-7 → window 2026-06-16T07:00Z..2026-06-17T07:00Z)
-- Source: gh pr list --state merged (confirmed merged_at values below)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO dw.events_pr_merge
  (pr_number, title, branch, merged_at, semvar_date, utc_window_start, utc_window_end,
   pr_type, scope, files_changed, initiating_node, initiating_tag)
VALUES
  (499,
   'feat(coding-plugins): knowledge-coding marketplace + anduril-crawl-plugin (O1)',
   'claude/coding-plugins',
   '2026-06-17T03:30:22Z',
   '2026.06.16',
   '2026-06-16T07:00:00Z', '2026-06-17T07:00:00Z',
   'feat', 'coding-plugins', 10,
   'macbook-m5', 'tag:dev'),
  (498,
   'docs(container): setup.sh, doctor.sh, and web/mobile VM references (O1)',
   'claude/container-docs',
   '2026-06-17T03:10:11Z',
   '2026.06.16',
   '2026-06-16T07:00:00Z', '2026-06-17T07:00:00Z',
   'docs', 'container', 4,
   'macbook-m5', 'tag:dev'),
  (496,
   'feat(anduril): mirror developer.anduril.com Lattice SDK docs (O1)',
   'claude/session-20260617-0217',
   '2026-06-17T02:39:31Z',
   '2026.06.16',
   '2026-06-16T07:00:00Z', '2026-06-17T07:00:00Z',
   'feat', 'anduril', 67,
   'macbook-m5', 'tag:dev')
ON CONFLICT (pr_number, repo) DO NOTHING;

COMMIT;
