-- E2M Schema for AlloyDB Omni PostgreSQL 18
-- Run: psql -U postgres -d e2m -f schema.sql

CREATE EXTENSION IF NOT EXISTS pgvector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS e2m_envelopes (
  envelope_id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  protocol      TEXT NOT NULL DEFAULT 'io.e2m/envelope',
  version       TEXT NOT NULL DEFAULT 'draft',
  payload_kind  TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending',
  from_host     TEXT NOT NULL,
  from_mailbox  TEXT NOT NULL,
  to_host       TEXT NOT NULL,
  to_mailbox    TEXT NOT NULL,
  correlation_id UUID,
  payload       JSONB NOT NULL DEFAULT '{}',
  meta          JSONB NOT NULL DEFAULT '{}',
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ttl_ms        BIGINT
);

CREATE INDEX IF NOT EXISTS idx_env_status     ON e2m_envelopes(status);
CREATE INDEX IF NOT EXISTS idx_env_to         ON e2m_envelopes(to_host, to_mailbox);
CREATE INDEX IF NOT EXISTS idx_env_corr       ON e2m_envelopes(correlation_id) WHERE correlation_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_env_payload    ON e2m_envelopes USING GIN(payload);

CREATE TABLE IF NOT EXISTS e2m_tasks (
  task_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  envelope_id     UUID REFERENCES e2m_envelopes(envelope_id),
  status          TEXT NOT NULL DEFAULT 'pending',
  priority        TEXT NOT NULL DEFAULT 'normal',
  target_model    TEXT,
  target_protocol TEXT,
  instruction     TEXT,
  result          JSONB,
  error_code      INTEGER,
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_task_status  ON e2m_tasks(status);
CREATE INDEX IF NOT EXISTS idx_task_env     ON e2m_tasks(envelope_id);

CREATE TABLE IF NOT EXISTS e2m_flag_overrides (
  flag_key       TEXT PRIMARY KEY,
  variant        TEXT NOT NULL,
  context_filter JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at     TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER envelopes_upd
  BEFORE UPDATE ON e2m_envelopes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER tasks_upd
  BEFORE UPDATE ON e2m_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Kimball: dim_pages ────────────────────────────────────────────────────────
-- SCD Type II — new row per content version (content_hash is the dedup key).
-- Markdown is CommonMark-validated before INSERT — never raw HTML.

CREATE TABLE IF NOT EXISTS dim_pages (
  page_key      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url           TEXT NOT NULL,
  url_path      TEXT NOT NULL,
  site          TEXT NOT NULL CHECK (site IN ('anthropic.com','claude.com')),
  section       TEXT NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  content_hash  CHAR(64) NOT NULL UNIQUE,   -- SHA-256 of markdown
  markdown      TEXT NOT NULL,              -- CommonMark only, never HTML
  pdf_urls      JSONB NOT NULL DEFAULT '[]',
  published_at  TIMESTAMPTZ,
  lastmod       TIMESTAMPTZ,
  crawled_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  word_count    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_dp_site_section  ON dim_pages(site, section);
CREATE INDEX IF NOT EXISTS idx_dp_url_path      ON dim_pages(url_path);
CREATE INDEX IF NOT EXISTS idx_dp_crawled_at    ON dim_pages(crawled_at DESC);
CREATE INDEX IF NOT EXISTS idx_dp_pdf_urls      ON dim_pages USING GIN(pdf_urls);

-- ── Kimball: dim_documents ────────────────────────────────────────────────────
-- SCD Type I — overwrite on re-crawl. One row per unique PDF URL.

CREATE TABLE IF NOT EXISTS dim_documents (
  doc_key       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pdf_url       TEXT NOT NULL UNIQUE,
  page_key      UUID NOT NULL REFERENCES dim_pages(page_key) ON DELETE CASCADE,
  title         TEXT,
  markdown_text TEXT,                       -- CommonMark extracted from PDF
  content_hash  CHAR(64),
  crawled_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page_count    INTEGER
);

CREATE INDEX IF NOT EXISTS idx_dd_page_key ON dim_documents(page_key);

-- ── Kimball: fact_crawl_events ────────────────────────────────────────────────
-- Append-only. One row per crawl attempt regardless of status.
-- Preserves full crawl history for SLA monitoring and cache-hit analysis.

CREATE TABLE IF NOT EXISTS fact_crawl_events (
  event_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key      UUID REFERENCES dim_pages(page_key),   -- NULL on error/skip
  url           TEXT NOT NULL,
  site          TEXT NOT NULL,
  section       TEXT NOT NULL,
  status        TEXT NOT NULL CHECK (status IN ('ok','skip','error')),
  skip_reason   TEXT CHECK (skip_reason IN ('seen','filtered','no_content') OR skip_reason IS NULL),
  error_message TEXT,
  from_cache    BOOLEAN,
  crawled_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  duration_ms   INTEGER NOT NULL DEFAULT 0,
  word_count    INTEGER,
  pdf_count     INTEGER
);

CREATE INDEX IF NOT EXISTS idx_fce_crawled_at ON fact_crawl_events(crawled_at DESC);
CREATE INDEX IF NOT EXISTS idx_fce_site       ON fact_crawl_events(site, section);
CREATE INDEX IF NOT EXISTS idx_fce_status     ON fact_crawl_events(status);

-- ── Kimball: fact_envelope_events ─────────────────────────────────────────────
-- Append-only. One row per e2m envelope state transition.

CREATE TABLE IF NOT EXISTS fact_envelope_events (
  event_id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  envelope_id        UUID NOT NULL REFERENCES e2m_envelopes(envelope_id),
  from_status        TEXT,
  to_status          TEXT NOT NULL,
  protocol           TEXT NOT NULL,
  from_host          TEXT NOT NULL,
  to_host            TEXT NOT NULL,
  payload_kind       TEXT NOT NULL,
  transitioned_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload_size_bytes INTEGER,
  transition_ms      INTEGER
);

CREATE INDEX IF NOT EXISTS idx_fee_envelope_id    ON fact_envelope_events(envelope_id);
CREATE INDEX IF NOT EXISTS idx_fee_transitioned   ON fact_envelope_events(transitioned_at DESC);

-- ── Kimball: rpt_crawl_daily ──────────────────────────────────────────────────
-- Pre-aggregated crawl metrics per site × section × day.
-- Refreshed via TRUNCATE + re-INSERT after each crawl run.

CREATE TABLE IF NOT EXISTS rpt_crawl_daily (
  report_date     DATE NOT NULL,
  site            TEXT NOT NULL,
  section         TEXT NOT NULL,
  pages_ok        INTEGER NOT NULL DEFAULT 0,
  pages_skipped   INTEGER NOT NULL DEFAULT 0,
  pages_errored   INTEGER NOT NULL DEFAULT 0,
  pages_from_cache INTEGER NOT NULL DEFAULT 0,
  -- derived: cache_hit_rate = pages_from_cache::numeric / NULLIF(pages_ok,0)
  cache_hit_rate  NUMERIC(5,4),
  total_duration_ms BIGINT NOT NULL DEFAULT 0,
  -- derived: avg_duration_ms = total_duration_ms::numeric / NULLIF(pages_ok,0)
  avg_duration_ms NUMERIC(10,2),
  total_word_count BIGINT NOT NULL DEFAULT 0,
  total_pdf_count  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (report_date, site, section)
);

-- Materialized refresh function — call after each crawl run
CREATE OR REPLACE FUNCTION refresh_rpt_crawl_daily(p_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
BEGIN
  DELETE FROM rpt_crawl_daily WHERE report_date = p_date;
  INSERT INTO rpt_crawl_daily (
    report_date, site, section,
    pages_ok, pages_skipped, pages_errored, pages_from_cache,
    cache_hit_rate,
    total_duration_ms, avg_duration_ms,
    total_word_count, total_pdf_count
  )
  SELECT
    p_date,
    site,
    section,
    COUNT(*) FILTER (WHERE status = 'ok')    AS pages_ok,
    COUNT(*) FILTER (WHERE status = 'skip')  AS pages_skipped,
    COUNT(*) FILTER (WHERE status = 'error') AS pages_errored,
    COUNT(*) FILTER (WHERE status = 'ok' AND from_cache = TRUE) AS pages_from_cache,
    ROUND(
      COUNT(*) FILTER (WHERE status = 'ok' AND from_cache = TRUE)::NUMERIC
      / NULLIF(COUNT(*) FILTER (WHERE status = 'ok'), 0), 4
    ) AS cache_hit_rate,
    SUM(duration_ms) FILTER (WHERE status = 'ok') AS total_duration_ms,
    ROUND(
      SUM(duration_ms) FILTER (WHERE status = 'ok')::NUMERIC
      / NULLIF(COUNT(*) FILTER (WHERE status = 'ok'), 0), 2
    ) AS avg_duration_ms,
    COALESCE(SUM(word_count) FILTER (WHERE status = 'ok'), 0) AS total_word_count,
    COALESCE(SUM(pdf_count)  FILTER (WHERE status = 'ok'), 0) AS total_pdf_count
  FROM fact_crawl_events
  WHERE crawled_at::DATE = p_date
  GROUP BY site, section;
END;
$$ LANGUAGE plpgsql;

-- ── Kimball: fact_applications ────────────────────────────────────────────────
-- SCD I (last-write-wins on upsert). One row per installed application path.
-- device_type and runtime are enum-classified from bundle metadata.

CREATE TABLE IF NOT EXISTS fact_applications (
  app_key         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_name        TEXT NOT NULL,
  app_path        TEXT NOT NULL UNIQUE,
  bundle_id       TEXT,
  version         TEXT,
  min_os_version  TEXT,
  device_type     TEXT NOT NULL CHECK (device_type IN (
                    'ai_assistant','browser','developer_tool','productivity',
                    'communication','project_management','design','media',
                    'networking_security','system_utility','business','education','unknown'
                  )),
  runtime         TEXT NOT NULL CHECK (runtime IN (
                    'native_macos','electron','java_jvm','web_shortcut','universal_binary','unknown'
                  )),
  ls_category     TEXT,
  vendor          TEXT,
  is_electron     BOOLEAN NOT NULL DEFAULT false,
  crawled_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fa_device_type ON fact_applications(device_type);
CREATE INDEX IF NOT EXISTS idx_fa_vendor      ON fact_applications(vendor) WHERE vendor IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fa_runtime     ON fact_applications(runtime);

-- ── Kimball: dim_tailscale_devices ────────────────────────────────────────────
-- SCD II candidate; current impl is SCD I (upsert on device_id).
-- tailscale_ips is text[] — pg driver handles JS arrays natively.

CREATE TABLE IF NOT EXISTS dim_tailscale_devices (
  device_key        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_name       TEXT NOT NULL,
  device_id         TEXT NOT NULL UNIQUE,
  managed_by        TEXT,
  creator           TEXT,
  os                TEXT NOT NULL CHECK (os IN ('macOS','windows','iOS','linux','android','unknown')),
  os_version        TEXT,
  domain            TEXT,
  tailscale_version TEXT,
  tailscale_ips     TEXT[] NOT NULL DEFAULT '{}',
  key_expiry        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL,
  last_seen         TIMESTAMPTZ,
  is_subnet_router  BOOLEAN NOT NULL DEFAULT false,
  is_exit_node      BOOLEAN NOT NULL DEFAULT false,
  is_ephemeral      BOOLEAN NOT NULL DEFAULT false,
  tailscale_ssh     BOOLEAN NOT NULL DEFAULT false,
  tailnet           TEXT
);

CREATE INDEX IF NOT EXISTS idx_dtd_device_name ON dim_tailscale_devices(device_name);
CREATE INDEX IF NOT EXISTS idx_dtd_tailnet     ON dim_tailscale_devices(tailnet) WHERE tailnet IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_dtd_os          ON dim_tailscale_devices(os);
