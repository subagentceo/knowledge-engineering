-- >>> semantics
-- entity: envelope
-- version: 1.0.0
-- grain: one row per e2m Envelope (a peer message)
-- owner: data-manager
-- source: data/e2m/model.ts (Envelope)
-- keys: { pk: id }
-- dimensions: [envelope_type, state]
-- measures: [count]
-- relationships:
--   - envelope.from_agent -> agent.id
--   - envelope.to_agent -> agent.id
--   - envelope.thread_id -> envelope.id (self, optional)
-- <<< semantics

CREATE TYPE envelope_type  AS ENUM ('task','ack','result','escalate','notify','summary','operator');
CREATE TYPE envelope_state AS ENUM ('pending','read','actioned','archived');

CREATE TABLE envelope (
  id            uuid PRIMARY KEY,
  envelope_type envelope_type  NOT NULL,
  from_agent    text NOT NULL REFERENCES agent(id),
  to_agent      text NOT NULL REFERENCES agent(id),
  subject       text NOT NULL,
  at            timestamptz NOT NULL,
  state         envelope_state NOT NULL DEFAULT 'pending',
  thread_id     uuid REFERENCES envelope(id),
  payload       jsonb
);
