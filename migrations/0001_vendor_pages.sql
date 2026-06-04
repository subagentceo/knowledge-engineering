-- migrations/0001_vendor_pages.sql
--
-- Phase 13.B+ (O8). vendor_pages table: stores the crawled vendor
-- markdown alongside the filesystem mirror. The crawler upserts here
-- when ALLOYDB_DATABASE_URL is set (AlloyDB Omni, free Neon replacement).
--
-- Citation: src/lib/alloydb-branch.ts
-- Citation: rubrics/phase-13.md (O8)

CREATE TABLE IF NOT EXISTS vendor_pages (
  vendor        text        NOT NULL,
  path          text        NOT NULL,
  content       text        NOT NULL,
  content_hash  text        NOT NULL,
  etag          text,
  last_modified text,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (vendor, path)
);

CREATE INDEX IF NOT EXISTS vendor_pages_vendor_idx
  ON vendor_pages (vendor);

CREATE INDEX IF NOT EXISTS vendor_pages_updated_at_idx
  ON vendor_pages (updated_at DESC);
