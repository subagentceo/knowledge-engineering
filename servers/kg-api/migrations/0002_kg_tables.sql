-- migrations/0002_kg_tables.sql
--
-- KG nodes + edges for the Python backend. Apply after 0001_vendor_pages.sql.
-- Mirrors ke_kg_api.db.orm exactly so Alembic autogenerate finds no diff.
--
-- @cite src/ke_kg_api/db/orm.py          -- ORM source of truth
-- @cite vendor/gcp/alloydb-omni/         -- AlloyDB PG18 columnar engine

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Nodes ──────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS kg_nodes (
  id             uuid        NOT NULL DEFAULT gen_random_uuid(),
  entity_id      text        NOT NULL,
  type           text        NOT NULL,
  title          text        NOT NULL,
  content        text,
  namespace      text        NOT NULL,
  schema_version text        NOT NULL DEFAULT '1.2.0',
  observations   text[]      NOT NULL DEFAULT '{}',
  tags           text[]      NOT NULL DEFAULT '{}',
  metadata       jsonb       NOT NULL DEFAULT '{}',
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz,
  PRIMARY KEY (id),
  UNIQUE (entity_id)
);

CREATE INDEX IF NOT EXISTS ix_kg_nodes_namespace
  ON kg_nodes (namespace);

CREATE INDEX IF NOT EXISTS ix_kg_nodes_type
  ON kg_nodes (type);

CREATE INDEX IF NOT EXISTS ix_kg_nodes_metadata_gin
  ON kg_nodes USING gin (metadata);

CREATE INDEX IF NOT EXISTS ix_kg_nodes_tags_gin
  ON kg_nodes USING gin (tags);

CREATE INDEX IF NOT EXISTS ix_kg_nodes_fts
  ON kg_nodes USING gin (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
  );

-- ── Edges ──────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS kg_edges (
  id               uuid        NOT NULL DEFAULT gen_random_uuid(),
  source_entity_id text        NOT NULL REFERENCES kg_nodes(entity_id) ON DELETE CASCADE,
  target_entity_id text        NOT NULL REFERENCES kg_nodes(entity_id) ON DELETE CASCADE,
  rel_type         text        NOT NULL,
  weight           float       NOT NULL DEFAULT 1.0,
  schema_version   text        NOT NULL DEFAULT '1.2.0',
  metadata         jsonb       NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  CONSTRAINT uq_kg_edge_triple UNIQUE (source_entity_id, target_entity_id, rel_type)
);

CREATE INDEX IF NOT EXISTS ix_kg_edges_source
  ON kg_edges (source_entity_id);

CREATE INDEX IF NOT EXISTS ix_kg_edges_target
  ON kg_edges (target_entity_id);

CREATE INDEX IF NOT EXISTS ix_kg_edges_rel_type
  ON kg_edges (rel_type);
