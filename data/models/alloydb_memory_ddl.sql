-- AlloyDB / PostgreSQL 16 — citation memory-store (B2).
-- Contracts: data/models/alloydb/{dim_memory,fact_memory_access}.yaml
-- (semver'd; validated by src/lib/table-semantics.ts).
-- @cite data/models/alloydb_citations_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

-- dim_memory — SCD Type II (dim_memory.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.dim_memory (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    memory_path         TEXT        NOT NULL,
    row_effective_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    row_effective_to    TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    content             TEXT        NOT NULL,
    csl_id              TEXT,
    curation_source     TEXT        NOT NULL DEFAULT 'ingest'
                        CHECK (curation_source IN ('ingest','dreams')),
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (memory_path, row_effective_from)
);
CREATE INDEX IF NOT EXISTS dim_memory_current_idx
    ON dw.dim_memory (memory_path) WHERE is_current;

-- fact_memory_access — grain: one row per memory access (fact_memory_access.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.fact_memory_access (
    surrogate_key BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    memory_sk     BIGINT      NOT NULL REFERENCES dw.dim_memory(surrogate_key),
    agent_id      TEXT        NOT NULL,
    date_key      INTEGER     NOT NULL,
    accessed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    access_count  BIGINT      NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS fact_memory_access_sk_idx
    ON dw.fact_memory_access (memory_sk, accessed_at DESC);

-- B19: agent writes join ingest/dreams as a curation source
ALTER TABLE dw.dim_memory DROP CONSTRAINT IF EXISTS dim_memory_curation_source_check;
ALTER TABLE dw.dim_memory ADD CONSTRAINT dim_memory_curation_source_check
    CHECK (curation_source IN ('ingest','dreams','agent'));
