-- AlloyDB / PostgreSQL 16 — economic-research citation warehouse.
-- Kimball topology; semantics contracts in data/models/alloydb/*.yaml
-- (semver'd; validated by src/lib/table-semantics.ts).
-- @cite data/models/kimball_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

-- dim_research_doc — SCD Type II (see dim_research_doc.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.dim_research_doc (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    csl_id              TEXT        NOT NULL,
    row_effective_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    row_effective_to    TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    title               TEXT        NOT NULL,
    doc_type            TEXT        NOT NULL CHECK (doc_type IN ('article','document','webpage')),
    url                 TEXT,
    research_team       TEXT,
    issued_date         DATE,
    source_system       TEXT        NOT NULL DEFAULT 'ingest-citations',
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (csl_id, row_effective_from)
);
CREATE INDEX IF NOT EXISTS dim_research_doc_current_idx
    ON dw.dim_research_doc (csl_id) WHERE is_current;

-- fact_doc_ingest — grain: one row per doc per ingest run (fact_doc_ingest.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.fact_doc_ingest (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doc_sk              BIGINT      NOT NULL REFERENCES dw.dim_research_doc(surrogate_key),
    date_key            INTEGER     NOT NULL,
    ingest_run_at       TIMESTAMPTZ NOT NULL,
    markdown_bytes      BIGINT      NOT NULL DEFAULT 0,
    fields_extracted    BIGINT      NOT NULL DEFAULT 0,
    -- calculated measure: inherits fact_doc_ingest.fields_extracted
    extraction_completeness NUMERIC GENERATED ALWAYS AS (fields_extracted::numeric / 4) STORED,
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS fact_doc_ingest_date_idx ON dw.fact_doc_ingest (date_key, doc_sk);

-- rpt_citations_by_year — predefined aggregation over fact_doc_ingest
-- (rpt_citations_by_year.yaml v1.0.0); load_type=full → refresh by TRUNCATE+INSERT
CREATE TABLE IF NOT EXISTS dw.rpt_citations_by_year (
    issued_year   SMALLINT PRIMARY KEY,
    doc_count     BIGINT   NOT NULL,
    dated_share   NUMERIC  NOT NULL,
    refreshed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
