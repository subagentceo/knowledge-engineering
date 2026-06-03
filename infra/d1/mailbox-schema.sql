-- mailbox-schema.sql — D1-compatible DDL for the agent-to-agent mailbox.
--
-- Deploy with:
--   wrangler d1 execute <DATABASE_NAME> --file=infra/d1/mailbox-schema.sql
--
-- @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
-- @cite src/db/mailbox-store.ts

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  from_agent TEXT NOT NULL,
  to_agent TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  thread_id TEXT,
  ack_required INTEGER DEFAULT 0,
  ttl_ms INTEGER,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_to_status ON messages(to_agent, status);
CREATE INDEX IF NOT EXISTS idx_thread ON messages(thread_id) WHERE thread_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS consensus_votes (
  connector_id TEXT NOT NULL,
  coworker_id TEXT NOT NULL,
  voted_at TEXT NOT NULL,
  PRIMARY KEY (connector_id, coworker_id)
);

CREATE TABLE IF NOT EXISTS task_ledger (
  task_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  parent_task_id TEXT,
  assignee_agent_id TEXT,
  due_at TEXT,
  updated_by TEXT,
  updated_at TEXT NOT NULL
);
