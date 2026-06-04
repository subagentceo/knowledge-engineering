-- infra/sqlite/project-plans-schema.sql
-- Phase -1 plan-as-code persistence schema
-- @cite src/lib/schemas/project-plan.ts
-- @cite infra/sqlite/kg-session-schema.sql

CREATE TABLE IF NOT EXISTS project_plans (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  version      TEXT NOT NULL,
  status       TEXT NOT NULL CHECK(status IN ('draft','active','archived','superseded')),
  source_doc   TEXT,
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  payload_json TEXT NOT NULL  -- full ProjectPlan JSON
);

CREATE TABLE IF NOT EXISTS plan_phases (
  id         TEXT NOT NULL,
  plan_id    TEXT NOT NULL REFERENCES project_plans(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  status     TEXT NOT NULL CHECK(status IN ('pending','in_progress','done','blocked')),
  PRIMARY KEY (plan_id, id)
);

CREATE TABLE IF NOT EXISTS plan_tasks (
  id           TEXT NOT NULL,
  phase_id     TEXT NOT NULL,
  plan_id      TEXT NOT NULL,
  title        TEXT NOT NULL,
  priority     TEXT NOT NULL CHECK(priority IN ('critical','high','medium','low')),
  status       TEXT NOT NULL CHECK(status IN ('pending','in_progress','done','blocked')),
  operator_gated INTEGER NOT NULL DEFAULT 0,
  outcome_id   TEXT,
  PRIMARY KEY (plan_id, phase_id, id),
  FOREIGN KEY (plan_id, phase_id) REFERENCES plan_phases(plan_id, id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_plan_tasks_status ON plan_tasks(status);
CREATE INDEX IF NOT EXISTS idx_plan_phases_plan ON plan_phases(plan_id);
