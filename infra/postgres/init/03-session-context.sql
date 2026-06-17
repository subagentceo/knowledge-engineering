-- Agent session context store + this session's state.
-- @cite infra/containers/cloudflare/cloudflare-claude-code-index.md
-- @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
-- @cite src/mcp/ext-tasks/index.ts
-- @cite infra/postgres/init/02-cloudflare-agent.sql

BEGIN;

-- @cube name=AgentSessions version=2026.06.17 type=dim-scd1
-- @cube.sql_table    dw.agent_sessions
-- @cube.description  One row per agent session (branch-YYYY-MM-DD slug). SCD Type I.
--                    Links remote_session_id (CLAUDE_CODE_REMOTE_SESSION_ID) to branch and context.
--                    Redis: session:<id>:context, session:remote:<cse_id>:context (TTL 7d).
-- @cube.measure      count              COUNT(*)
-- @cube.measure      count_open         COUNT(*) FILTER (WHERE status = 'open')
-- @cube.measure      count_merged       COUNT(*) FILTER (WHERE status = 'merged')
-- @cube.dimension    session_id         TEXT pk  "slug: branch-YYYY-MM-DD"
-- @cube.dimension    branch             TEXT     "head ref (claude/* convention)"
-- @cube.dimension    remote_session_id  TEXT     "CLAUDE_CODE_REMOTE_SESSION_ID (cse_*)"
-- @cube.dimension    account_id         TEXT
-- @cube.dimension    operator_email     TEXT
-- @cube.dimension    status             TEXT enum[open,closed,merged]
-- @cube.segment      open_sessions      {status = 'open'}
-- @cube.segment      merged_sessions    {status = 'merged'}
-- @cube.join         session_decisions: session_id = session_id
-- @cube.join         crawl_runs:        session_id = session_id
-- @cube.pre_agg      by_branch_status:  {dimensions:[branch,status], measures:[count]}

-- ── Session tracking table ────────────────────────────────────────────────────
-- One row per agent session. Linked to dw.events_cloudflare_agent via
-- session_id. Redis caches hot sessions at session:<id>:context (TTL 7d).

-- remote_session_id: value of CLAUDE_CODE_REMOTE_SESSION_ID env var (cse_* prefix)
-- Set by a SessionStart hook:
--   UPDATE dw.agent_sessions SET remote_session_id = current_setting('app.remote_session_id')
--   WHERE session_id = current_setting('app.session_id');
-- Transcript URL: https://claude.ai/code/${remote_session_id/#cse_/session_}
-- Redis key: session:remote:<cse_id>:context → this row (TTL 7d)
-- Source: vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
--         § "Link artifacts back to the session"
CREATE TABLE IF NOT EXISTS dw.agent_sessions (
    session_id        TEXT        PRIMARY KEY,              -- slug: branch-YYYY-MM-DD
    branch            TEXT        NOT NULL,
    remote_session_id TEXT        UNIQUE,                  -- CLAUDE_CODE_REMOTE_SESSION_ID (cse_*)
    started_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at         TIMESTAMPTZ,
    account_id        TEXT        NOT NULL DEFAULT 'e6294e3ea89f8207af387d459824aaae',
    operator_email    TEXT        NOT NULL DEFAULT 'admin@jadecli.com',
    context           JSONB       NOT NULL DEFAULT '{}',   -- decisions, research, pending
    status            TEXT        NOT NULL DEFAULT 'open'
                          CHECK (status IN ('open', 'closed', 'merged'))
);
-- Idempotent migration for sessions tables created before remote_session_id was added
ALTER TABLE dw.agent_sessions ADD COLUMN IF NOT EXISTS remote_session_id TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_sessions_branch ON dw.agent_sessions (branch);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON dw.agent_sessions (status);

-- @cube name=SessionDecisions version=2026.06.17 type=fact-transactional
-- @cube.sql_table    dw.session_decisions
-- @cube.description  Normalized decisions per session. Each row is a single agent decision
--                    with topic/decision text and approval status.
-- @cube.measure      count                COUNT(*)
-- @cube.measure      count_pending        COUNT(*) FILTER (WHERE status = 'pending')
-- @cube.measure      count_approved       COUNT(*) FILTER (WHERE status = 'approved')
-- @cube.dimension    session_id    TEXT fk  "→ dw.agent_sessions"
-- @cube.dimension    topic         TEXT     "decision topic (terraform-provider-bump, worker-rename, ...)"
-- @cube.dimension    decision      TEXT
-- @cube.dimension    status        TEXT enum[pending,approved,rejected,deferred]
-- @cube.dimension    decided_at    TIMESTAMPTZ
-- @cube.segment      pending_decisions  {status = 'pending'}
-- @cube.segment      approved_decisions {status = 'approved'}
-- @cube.join         agent_sessions: session_id = session_id
-- @cube.pre_agg      by_topic_status: {dimensions:[topic,status], measures:[count]}
-- ── Decisions log (normalized from context jsonb) ────────────────────────────
CREATE TABLE IF NOT EXISTS dw.session_decisions (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id      TEXT        NOT NULL REFERENCES dw.agent_sessions(session_id),
    decided_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    topic           TEXT        NOT NULL,
    decision        TEXT        NOT NULL,
    status          TEXT        NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'approved', 'rejected', 'deferred')),
    notes           TEXT
);
CREATE INDEX IF NOT EXISTS idx_decisions_session ON dw.session_decisions (session_id);

-- @cube name=CrawlRuns version=2026.06.17 type=fact-transactional
-- @cube.sql_table    dw.crawl_runs
-- @cube.description  Append-only crawl run results per (session_id, vendor). Tracks fetched/
--                    unchanged/preflight_304/failed counts for each vendor mirror run.
-- @cube.measure      count                COUNT(*)
-- @cube.measure      fetched_sum          SUM(fetched)
-- @cube.measure      unchanged_sum        SUM(unchanged)
-- @cube.measure      failed_sum           SUM(failed)
-- @cube.measure      preflight_304_sum    SUM(preflight_304)
-- @cube.measure      success_rate         (SUM(fetched) * 1.0) / NULLIF(SUM(fetched)+SUM(failed),0)
-- @cube.dimension    session_id   TEXT fk  "→ dw.agent_sessions"
-- @cube.dimension    vendor       TEXT     "vendor mirror name (anthropics, claude-sitemap, ...)"
-- @cube.dimension    status       TEXT enum[ok,partial,error]
-- @cube.dimension    ran_at       TIMESTAMPTZ
-- @cube.segment      failed_runs  {failed > 0}
-- @cube.segment      ok_runs      {status = 'ok'}
-- @cube.join         agent_sessions: session_id = session_id
-- @cube.pre_agg      by_vendor_status: {dimensions:[vendor,status], measures:[count,fetched_sum,failed_sum]}
-- ── Crawl run log ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dw.crawl_runs (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id      TEXT        REFERENCES dw.agent_sessions(session_id),
    vendor          TEXT        NOT NULL,
    ran_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fetched         INTEGER     NOT NULL DEFAULT 0,
    unchanged       INTEGER     NOT NULL DEFAULT 0,
    preflight_304   INTEGER     NOT NULL DEFAULT 0,
    failed          INTEGER     NOT NULL DEFAULT 0,
    status          TEXT        NOT NULL CHECK (status IN ('ok', 'partial', 'error')),
    notes           TEXT
);
CREATE INDEX IF NOT EXISTS idx_crawl_runs_vendor ON dw.crawl_runs (vendor, ran_at DESC);

-- ── This session: 2026-06-17 claude/refresh-anthropic-claude-vendors ──────────

INSERT INTO dw.agent_sessions (session_id, branch, context) VALUES (
  'claude-refresh-anthropic-claude-vendors-2026-06-17',
  'claude/refresh-anthropic-claude-vendors',
  '{
    "research": [
      "cheerio crawl visualization tools: bullmq+@bull-board, listr2, p-queue, crawlee",
      "cloudflare voidzero acquisition 2026-06-04 (vite/vitest/rolldown/oxc)",
      "cloudflare/queues-web-crawler reference implementation",
      "browser-run /crawl endpoint open beta 2026-03-10",
      "terraform provider v5.11+ required for static assets (current pin v4.52)",
      "cloudflare resource tagging: real, key-value on workers/zones/kv/d1/r2",
      "skills.sh cloudflare: 11 sources, 69 skills, workerd/cloudflare-docs most relevant"
    ],
    "new_files": [
      "infra/containers/cloudflare/cloudflare-claude-code-index.md",
      "infra/postgres/init/02-cloudflare-agent.sql",
      "infra/postgres/init/03-session-context.sql",
      "infra/containers/cloudflare/session-2026-06-17.redis",
      "infra/containers/cloudflare/subdomains-plan.md",
      "infra/workers/crawl.wrangler.jsonc",
      "infra/workers/pages.wrangler.jsonc",
      "infra/workers/workers-inv.wrangler.jsonc",
      "infra/workers/plan.wrangler.jsonc"
    ],
    "subdomains_planned": ["crawl", "pages", "workers", "plan"],
    "cf_account": "e6294e3ea89f8207af387d459824aaae",
    "domains_count": 108,
    "daily_requests": 80000,
    "workers_count": 41
  }'
) ON CONFLICT (session_id) DO UPDATE
    SET context = EXCLUDED.context,
        status  = 'open';

INSERT INTO dw.session_decisions (session_id, topic, decision, status, notes) VALUES
  ('claude-refresh-anthropic-claude-vendors-2026-06-17',
   'terraform-provider-bump',
   'Bump cloudflare/cloudflare ~> 4.52 → ~> 5.11 in infra/terraform/versions.tf',
   'pending',
   'Required for Workers Static Assets in Terraform. Breaking change — provider v5 rewrote schemas.'),
  ('claude-refresh-anthropic-claude-vendors-2026-06-17',
   'worker-rename',
   'Create new Worker subagentknowledge-frontend alongside outcomesdk-frontend (Phase 1+2 safe, Phase 3 cutover needs approval)',
   'pending',
   'Custom domain cutover: detach subagentknowledge.com from outcomesdk-frontend, attach to new worker. ~60s propagation window.'),
  ('claude-refresh-anthropic-claude-vendors-2026-06-17',
   'subdomains',
   'Add crawl/pages/workers/plan subdomains to subagentknowledge.com — 4 new Workers with pg_durable+Redis+AlloyDB wiring',
   'pending',
   'Documented in infra/containers/cloudflare/subdomains-plan.md. Needs operator go-ahead before deploying.'),
  ('claude-refresh-anthropic-claude-vendors-2026-06-17',
   'skills-sh-install',
   'Install from skills.sh: workerd skills (workerd-api-review, ts-style), cloudflare-docs (web-perf, code-review), skills source (building-ai-agent-on-cloudflare)',
   'pending',
   'User confirmed paid Workers tier; 80k req/day across 108 domains.')
ON CONFLICT DO NOTHING;

INSERT INTO dw.crawl_runs (session_id, vendor, fetched, unchanged, preflight_304, failed, status, notes) VALUES
  ('claude-refresh-anthropic-claude-vendors-2026-06-17', 'anthropics',        201, 1499, 0,   0, 'ok',      'page_cap=1700; 2015 links discovered'),
  ('claude-refresh-anthropic-claude-vendors-2026-06-17', 'anthropic-sitemap', 367, 60,   0,   2, 'partial', 'page_cap=500; 429 URLs; 2 PDF fetch failures'),
  ('claude-refresh-anthropic-claude-vendors-2026-06-17', 'claude-sitemap',    245, 1382, 198, 7, 'partial', 'page_cap=2000; 1832 URLs; 7 page fetch failures; support.claude.com sources')
ON CONFLICT DO NOTHING;

COMMIT;
