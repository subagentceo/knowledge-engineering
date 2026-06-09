-- One-time bootstrapper for the ke database.
-- Runs inside docker-entrypoint-initdb.d on first container start.

-- Full-text search support (BM25 ranking via ts_rank_cd / websearch_to_tsquery)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- pg_durable — durable task queue (github.com/microsoft/pg_durable).
-- Installed from apt when the image is built with the pg-durable package;
-- falls back gracefully when not present (extension does not exist → skip).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_available_extensions WHERE name = 'pg_durable'
  ) THEN
    EXECUTE 'CREATE EXTENSION IF NOT EXISTS pg_durable';
  END IF;
END
$$;
