-- @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
-- Schema for claude_code OTel metrics/logs sink.
-- Tables match the Fivetran anthropic_claude ERD as closely as possible
-- without Admin API access (Max 5x plan constraint).

CREATE TABLE IF NOT EXISTS api_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  session_id TEXT,
  org_id TEXT,
  user_email TEXT,
  model TEXT,
  cost_usd REAL,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cache_read_tokens INTEGER,
  cache_write_tokens INTEGER,
  request_id TEXT,
  prompt_id TEXT,
  query_source TEXT,
  speed TEXT,
  effort TEXT,
  agent_name TEXT,
  skill_name TEXT,
  stop_reason TEXT,
  raw_metric TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE,
  org_id TEXT,
  user_email TEXT,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  total_cost_usd REAL DEFAULT 0,
  total_input_tokens INTEGER DEFAULT 0,
  total_output_tokens INTEGER DEFAULT 0,
  request_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cost_daily (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  org_id TEXT,
  model TEXT,
  query_source TEXT,
  total_cost_usd REAL DEFAULT 0,
  request_count INTEGER DEFAULT 0,
  UNIQUE(date, org_id, model, query_source)
);
