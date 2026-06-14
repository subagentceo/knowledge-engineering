-- AlloyDB / PostgreSQL 16 — ecosystem catalog (dim_ecosystem_artifact.yaml v1.0.0).
-- The durable projection of the EcosystemCatalog Redis object
-- (src/cache/ecosystem-catalog.ts). SCD I: reload overwrites the current row.
-- @cite data/models/alloydb_cache_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

CREATE TABLE IF NOT EXISTS dw.dim_ecosystem_artifact (
    surrogate_key BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    org           TEXT        NOT NULL,
    name          TEXT        NOT NULL,
    kind          TEXT        NOT NULL CHECK (kind IN ('repo', 'npm')),
    lang          TEXT,
    license       TEXT,
    description   TEXT,
    url           TEXT        NOT NULL,
    stars         BIGINT,
    source_page   TEXT,
    loaded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (org, name, kind)
);
CREATE INDEX IF NOT EXISTS dim_ecosystem_artifact_org_idx
    ON dw.dim_ecosystem_artifact (org);
