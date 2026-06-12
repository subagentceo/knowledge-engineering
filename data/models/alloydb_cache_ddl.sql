-- AlloyDB / PostgreSQL 16 — tiered-cache warehouse stage (KAN-4 chain).
-- Contracts: data/models/alloydb/{dim_cache_key,events_cache_access}.yaml
-- (semver'd; validated by src/lib/table-semantics.ts).
-- @cite data/models/alloydb_memory_ddl.sql (house DW conventions)

CREATE SCHEMA IF NOT EXISTS dw;

-- events_cache_access — mirror of src/cache/events.ts DDL so the loader
-- can aggregate even on a database the cache runtime never touched.
CREATE TABLE IF NOT EXISTS dw.events_cache_access (
  cache_key   text NOT NULL,
  tier        text NOT NULL CHECK (tier IN ('L1', 'L2', 'L3')),
  op          text NOT NULL CHECK (op IN ('hit', 'miss', 'set', 'invalidate', 'promote')),
  lane        text,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS events_cache_access_occurred_idx
  ON dw.events_cache_access (occurred_at);

-- dim_cache_key — SCD Type II (dim_cache_key.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.dim_cache_key (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cache_key           TEXT        NOT NULL,
    lane                TEXT,
    source_path         TEXT,
    row_effective_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    row_effective_to    TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (cache_key, row_effective_from)
);
CREATE INDEX IF NOT EXISTS dim_cache_key_current_idx
    ON dw.dim_cache_key (cache_key) WHERE is_current;

-- fact_cache_hits — daily rollup of events_cache_access (fact_cache_hits.yaml v1.0.0)
CREATE TABLE IF NOT EXISTS dw.fact_cache_hits (
    surrogate_key BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cache_key_sk  BIGINT  NOT NULL REFERENCES dw.dim_cache_key(surrogate_key),
    tier          TEXT    NOT NULL CHECK (tier IN ('L1', 'L2', 'L3')),
    date_key      INTEGER NOT NULL,
    hits          BIGINT  NOT NULL DEFAULT 0,
    misses        BIGINT  NOT NULL DEFAULT 0,
    promotions    BIGINT  NOT NULL DEFAULT 0,
    UNIQUE (cache_key_sk, tier, date_key)
);
CREATE INDEX IF NOT EXISTS fact_cache_hits_date_idx
    ON dw.fact_cache_hits (date_key);
