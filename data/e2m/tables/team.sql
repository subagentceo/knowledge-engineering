-- >>> semantics
-- entity: team
-- version: 1.0.0
-- grain: one row per team
-- owner: data-manager
-- source: data/e2m/model.ts (Team)
-- keys: { pk: id, natural: name }
-- relationships:
--   - team_member.team_id -> team.id
-- <<< semantics

CREATE TABLE team (
  id   text PRIMARY KEY,
  name text NOT NULL UNIQUE
);
