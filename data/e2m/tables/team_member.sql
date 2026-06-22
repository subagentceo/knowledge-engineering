-- >>> semantics
-- entity: team_member
-- version: 1.0.0
-- grain: one row per (team, agent) membership
-- owner: data-manager
-- source: data/e2m/model.ts (TeamMember)
-- keys: { pk: [team_id, agent_id] }
-- relationships:
--   - team_member.team_id -> team.id
--   - team_member.agent_id -> agent.id
-- <<< semantics

CREATE TABLE team_member (
  team_id  text NOT NULL REFERENCES team(id)  ON DELETE CASCADE,
  agent_id text NOT NULL REFERENCES agent(id) ON DELETE CASCADE,
  PRIMARY KEY (team_id, agent_id)
);
