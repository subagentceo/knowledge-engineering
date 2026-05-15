// scripts/lib/neon-client.ts
//
// Phase 13.B+ (O8). Thin wrapper around @neondatabase/serverless that
// the crawler (scripts/crawl-vendors.ts) and migration runner
// (scripts/migrate-neon.ts) both consume. Centralizes connection
// management + UPSERT helper.
//
// Citations:
//   @cite vendor/anthropics/neon.com/guides/cloudflare-sandbox-neon-branching.md
//   @cite rubrics/phase-13.md (O8)
//
// The package @neondatabase/serverless is loaded LAZILY so importing
// this module from contexts that don't have it (e.g. older Phase 13.A
// crawler runs that pre-date the install) doesn't break.

import type { Pool as PoolType } from "@neondatabase/serverless";

let cachedPool: PoolType | null = null;

export interface VendorPageRow {
  vendor: string;
  path: string;
  content: string;
  content_hash: string;
  etag?: string | null;
  last_modified?: string | null;
}

/**
 * Returns true if `NEON_DATABASE_URL` is set and the package is
 * installable. Used by the crawler to decide whether to dual-write.
 */
export function neonEnabled(): boolean {
  return Boolean(process.env.NEON_DATABASE_URL);
}

async function getPool(): Promise<PoolType> {
  if (cachedPool !== null) return cachedPool;
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error("neon-client: NEON_DATABASE_URL is not set");
  }
  // Lazy import so the crawler stays usable in environments without
  // the package installed.
  const mod = await import("@neondatabase/serverless");

  // Node 20 does not expose a global WebSocket constructor.
  // @neondatabase/serverless Pool opens a WebSocket on first query,
  // so without this we get "TypeError: fetch failed" / "All attempts
  // to open a WebSocket to connect to the database failed". Wire `ws`
  // exactly once per process — neonConfig is module-level state.
  // PR #69's retry layer remained powerless against this since every
  // retry hit the same missing-constructor failure.
  if ((mod.neonConfig as { webSocketConstructor?: unknown }).webSocketConstructor === undefined) {
    const wsMod = await import("ws");
    (mod.neonConfig as { webSocketConstructor: unknown }).webSocketConstructor = wsMod.default;
  }

  cachedPool = new mod.Pool({ connectionString: process.env.NEON_DATABASE_URL });
  return cachedPool;
}

/**
 * UPSERT a single vendor page. Returns true on insert/update, false
 * if the row was unchanged (content_hash match). Idempotent.
 */
export async function upsertVendorPage(row: VendorPageRow): Promise<boolean> {
  const pool = await getPool();
  // ON CONFLICT … DO UPDATE only when content_hash differs. Returns
  // 0 rows when nothing changed; 1 row otherwise. We use that to
  // count writes.
  const sql = `
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
  const result = await pool.query(sql, [
    row.vendor,
    row.path,
    row.content,
    row.content_hash,
    row.etag ?? null,
    row.last_modified ?? null,
  ]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Apply a single SQL statement (or multi-statement script). Used by
 * scripts/migrate-neon.ts.
 */
export async function exec(sql: string): Promise<void> {
  const pool = await getPool();
  await pool.query(sql);
}

/**
 * Open a WebSocket to the database and run `SELECT 1`, retrying on
 * connection errors. Designed to absorb the cold-start race between
 * Neon's create-branch API returning and the new branch's compute
 * accepting WebSocket connections.
 *
 * Connection errors typically surface as "All attempts to open a
 * WebSocket to connect to the database failed" from
 * @neondatabase/serverless. We retry up to `maxAttempts` times with
 * exponential backoff.
 */
export async function warmConnection(opts?: { maxAttempts?: number; initialDelayMs?: number }): Promise<void> {
  const maxAttempts = opts?.maxAttempts ?? 5;
  const initialDelayMs = opts?.initialDelayMs ?? 2000;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const pool = await getPool();
      await pool.query("SELECT 1");
      return;
    } catch (err) {
      lastErr = err;
      const msg = (err as { message?: string }).message ?? String(err);
      // Drop the cached pool so the next attempt re-creates it cleanly.
      cachedPool = null;
      if (attempt === maxAttempts) break;
      const delay = initialDelayMs * Math.pow(2, attempt - 1);
      console.error(`[neon-client] connection attempt ${attempt}/${maxAttempts} failed: ${msg.split("\n")[0]}; retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

/** For tests + clean shutdown in CI. */
export async function close(): Promise<void> {
  if (cachedPool !== null) {
    await cachedPool.end();
    cachedPool = null;
  }
}
