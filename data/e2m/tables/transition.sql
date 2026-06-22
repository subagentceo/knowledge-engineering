-- >>> semantics
-- entity: transition
-- version: 1.0.0
-- grain: one row per state transition appended to a task or envelope
-- owner: data-manager
-- source: data/e2m/model.ts (Transition)
-- keys: { pk: [id, at] }
-- dimensions: [event]
-- relationships:
--   - transition.id -> durable_task.id (or envelope.id)
-- <<< semantics

CREATE TYPE transition_event AS ENUM ('claim','complete','block','unblock','fail','retry','ack','read');

CREATE TABLE transition (
  id     uuid NOT NULL,             -- parent task/envelope id
  at     timestamptz NOT NULL,
  event  transition_event NOT NULL,
  owner  text REFERENCES agent(id),
  result jsonb,
  PRIMARY KEY (id, at)
);
