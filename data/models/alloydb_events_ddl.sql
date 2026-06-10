-- AlloyDB / PostgreSQL 16 — cache promotion event log (B5).
-- Contract: data/models/alloydb/events_cache_promotion.yaml
-- Append-only: never UPDATE, never DELETE.
-- @cite data/models/alloydb_citations_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

CREATE TABLE IF NOT EXISTS dw.events_cache_promotion (
    event_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cache_key   TEXT        NOT NULL,
    source_path TEXT,
    agent_id    TEXT        NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    hits        BIGINT      NOT NULL
);
CREATE INDEX IF NOT EXISTS events_cache_promotion_key_idx
    ON dw.events_cache_promotion (cache_key, occurred_at DESC);
