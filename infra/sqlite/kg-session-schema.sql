-- kg-session-schema.sql — SQLite DDL for local KG session mirror.
-- Compatible with wrangler d1 execute and local sqlite3.
--
-- Deploy locally:
--   sqlite3 .kg/knowledge-graph.db < infra/sqlite/kg-session-schema.sql
-- Deploy to D1:
--   wrangler d1 execute <DATABASE_NAME> --file=infra/sqlite/kg-session-schema.sql
--
-- @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
-- @cite infra/d1/mailbox-schema.sql

CREATE TABLE IF NOT EXISTS vendor_pages (
  id TEXT PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  vendor TEXT NOT NULL,
  title TEXT,
  word_count INTEGER NOT NULL DEFAULT 0,
  last_modified TEXT,
  ingested_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vendor_pages_vendor ON vendor_pages(vendor);
CREATE INDEX IF NOT EXISTS idx_vendor_pages_ingested ON vendor_pages(ingested_at);

CREATE TABLE IF NOT EXISTS admonitions (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,
  vendor TEXT NOT NULL,
  kind TEXT NOT NULL,
  content TEXT NOT NULL,
  line_number INTEGER NOT NULL DEFAULT 0,
  extracted_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_adm_vendor ON admonitions(vendor);
CREATE INDEX IF NOT EXISTS idx_adm_kind ON admonitions(kind);
CREATE INDEX IF NOT EXISTS idx_adm_page ON admonitions(page_path);

CREATE TABLE IF NOT EXISTS refresh_log (
  id TEXT PRIMARY KEY,
  vendor TEXT NOT NULL,
  pages_total INTEGER NOT NULL DEFAULT 0,
  pages_new INTEGER NOT NULL DEFAULT 0,
  pages_updated INTEGER NOT NULL DEFAULT 0,
  admonitions_extracted INTEGER NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  status TEXT NOT NULL DEFAULT 'running'
);
