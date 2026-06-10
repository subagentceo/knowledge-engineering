-- AlloyDB / PostgreSQL 16 — full-corpus vendor warehouse (B4).
-- Contracts: data/models/alloydb/{dim_vendor,fact_vendor_crawl}.yaml
-- @cite data/models/alloydb_citations_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

-- dim_vendor — SCD Type I, overwrite in place (dim_vendor.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.dim_vendor (
    surrogate_key  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vendor_name    TEXT        NOT NULL UNIQUE,
    host           TEXT,
    doc_count      BIGINT      NOT NULL DEFAULT 0,
    last_loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- fact_vendor_crawl — grain: vendor × load run (fact_vendor_crawl.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.fact_vendor_crawl (
    surrogate_key BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    vendor_name   TEXT        NOT NULL,
    date_key      INTEGER     NOT NULL,
    loaded_at     TIMESTAMPTZ NOT NULL,
    doc_count     BIGINT      NOT NULL,
    dated_count   BIGINT      NOT NULL,
    dated_share   NUMERIC GENERATED ALWAYS AS (dated_count::numeric / NULLIF(doc_count, 0)) STORED
);
CREATE INDEX IF NOT EXISTS fact_vendor_crawl_vendor_idx
    ON dw.fact_vendor_crawl (vendor_name, loaded_at DESC);
