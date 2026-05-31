// scripts/lib/alloydb-client.ts
//
// SCRUM-33 (O1). AlloyDB Omni client — the Postgres-wire replacement
// for neon-client. AlloyDB Omni runs locally as a standard Postgres
// server (default localhost:5433), so we use node-postgres (`pg`) over
// TCP. No `ws` shim: pg uses raw TCP sockets, not the WebSocket
// transport that @neondatabase/serverless needed for serverless edge.
//
// Coexists with scripts/lib/neon-client.ts behind a config flag; the
// switch is documented in a later ADR. Shape mirrors neon-client so
// the crawler + migration runner can swap drivers transparently.
//
// Citations:
//   @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
//   @cite rubrics/phase-13.md (O8)
//
// The `pg` package is loaded LAZILY so importing this module from
// contexts without it installed doesn't break (mirrors neon-client).

import type { Pool as PoolType, PoolConfig } from "pg";

export type { VendorPageRow } from "./neon-client.ts";
import type { VendorPageRow } from "./neon-client.ts";

let cachedPool: PoolType | null = null;
let cachedUrl: string | null = null;

type PoolFactory = (config: PoolConfig) => PoolType;
let poolFactory: PoolFactory | null = null;

/**
 * Test seam: dynamic `import("pg")` resolves through the ESM loader, so
 * the CJS require.cache trick used elsewhere can't intercept it.
 * Tests inject a stub Pool factory here instead of standing up a live
 * AlloyDB. `null` (the default) means "lazy-load real pg".
 */
export function __setPoolFactoryForTests(factory: PoolFactory | null): void {
  poolFactory = factory;
}

export function alloydbEnabled(): boolean {
  return Boolean(process.env.ALLOYDB_DATABASE_URL);
}

async function getPool(): Promise<PoolType> {
  const url = process.env.ALLOYDB_DATABASE_URL;
  if (!url) {
    throw new Error("alloydb-client: ALLOYDB_DATABASE_URL is not set");
  }
  if (cachedPool !== null && cachedUrl === url) return cachedPool;
  if (cachedPool !== null && cachedUrl !== url) {
    await cachedPool.end();
    cachedPool = null;
  }
  if (poolFactory !== null) {
    cachedPool = poolFactory({ connectionString: url });
  } else {
    const mod = await import("pg");
    const Pool = (mod.default?.Pool ?? mod.Pool) as new (config: PoolConfig) => PoolType;
    cachedPool = new Pool({ connectionString: url });
  }
  cachedUrl = url;
  return cachedPool;
}

// Byte-identical to neon-client's UPSERT so the two drivers stay
// swappable behind a config flag.
const UPSERT_SQL = `
    INSERT INTO vendor_pages (vendor, path, content, content_hash, etag, last_modified, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, now())
    ON CONFLICT (vendor, path) DO UPDATE
      SET content = EXCLUDED.content,
          content_hash = EXCLUDED.content_hash,
          etag = EXCLUDED.etag,
          last_modified = EXCLUDED.last_modified,
          updated_at = now()
      WHERE vendor_pages.content_hash IS DISTINCT FROM EXCLUDED.content_hash
    RETURNING vendor;
  `;

/**
 * UPSERT a single vendor page. Returns true on insert/update, false
 * if the row was unchanged (content_hash match). Idempotent.
 */
export async function upsertVendorPage(row: VendorPageRow): Promise<boolean> {
  const pool = await getPool();
  const result = await pool.query(UPSERT_SQL, [
    row.vendor,
    row.path,
    row.content,
    row.content_hash,
    row.etag ?? null,
    row.last_modified ?? null,
  ]);
  return (result.rowCount ?? 0) > 0;
}

export async function exec(sql: string): Promise<void> {
  const pool = await getPool();
  await pool.query(sql);
}

/** For tests + clean shutdown in CI. */
export async function close(): Promise<void> {
  if (cachedPool !== null) {
    await cachedPool.end();
    cachedPool = null;
    cachedUrl = null;
  }
}
