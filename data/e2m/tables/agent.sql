-- >>> semantics
-- entity: agent
-- version: 1.0.0
-- grain: one row per agent (function x tier)
-- owner: data-manager
-- source: data/e2m/model.ts (Agent)
-- keys: { pk: id, natural: email }
-- dimensions: [fn, tier]
-- relationships:
--   - team_member.agent_id -> agent.id
--   - envelope.from_agent -> agent.id
--   - envelope.to_agent -> agent.id
--   - durable_task.from_agent -> agent.id
--   - durable_task.owner -> agent.id
-- <<< semantics

CREATE TYPE agent_function AS ENUM ('operator','product','project','finance','legal','engineering','design','data');
CREATE TYPE agent_tier     AS ENUM ('manager','coworker','subagent');

CREATE TABLE agent (
  id    text PRIMARY KEY,            -- '{fn}-{tier}'
  fn    agent_function NOT NULL,
  tier  agent_tier     NOT NULL,
  email text NOT NULL UNIQUE
);
