-- Agent session context store + this session's state.
-- @cite infra/containers/cloudflare/cloudflare-claude-code-index.md
-- @cite src/mcp/ext-tasks/index.ts
-- @cite infra/postgres/init/02-cloudflare-agent.sql

BEGIN;

-- ── Session tracking table ────────────────────────────────────────────────────
-- One row per agent session. Linked to dw.events_cloudflare_agent via
-- session_id. Redis caches hot sessions at session:<id>:context (TTL 7d).

CREATE TABLE IF NOT EXISTS dw.agent_sessions (
    session_id      TEXT        PRIMARY KEY,              -- slug: branch-YYYY-MM-DD
    branch          TEXT        NOT NULL,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at       TIMESTAMPTZ,
    account_id      TEXT        NOT NULL DEFAULT 'e6294e3ea89f8207af387d459824aaae',
    operator_email  TEXT        NOT NULL DEFAULT 'admin@jadecli.com',
    context         JSONB       NOT NULL DEFAULT '{}',    -- decisions, research, pending
    status          TEXT        NOT NULL DEFAULT 'open'
                        CHECK (status IN ('open', 'closed', 'merged'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_branch ON dw.agent_sessions (branch);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON dw.agent_sessions (status);

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
