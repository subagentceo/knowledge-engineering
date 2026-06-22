-- >>> semantics
-- entity: durable_task
-- version: 1.0.0
-- grain: one row per DurableTask (latest-line-wins materialization of the queue JSONL)
-- owner: data-manager
-- source: data/e2m/model.ts (DurableTask)
-- keys: { pk: id }
-- dimensions: [queue, state]
-- measures: [count, completed_count]
-- relationships:
--   - durable_task.from_agent -> agent.id
--   - durable_task.owner -> agent.id
--   - transition.id -> durable_task.id
-- <<< semantics

CREATE TYPE task_state AS ENUM ('pending','in_progress','completed','blocked','failed');

CREATE TABLE durable_task (
  id         uuid PRIMARY KEY,
  queue      text NOT NULL,
  subject    text NOT NULL,
  state      task_state NOT NULL DEFAULT 'pending',
  from_agent text REFERENCES agent(id),
  owner      text REFERENCES agent(id),
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  evaluator  jsonb,
  payload    jsonb
);
