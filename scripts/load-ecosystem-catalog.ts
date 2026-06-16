// scripts/load-ecosystem-catalog.ts
//
// Loads seeds/ecosystem/artifacts.json into dw.dim_ecosystem_artifact (SCD I
// overwrite) and warms the EcosystemCatalog Redis object into L2. The "redis
// object → alloydb tables" path the catalog was built for.
//
// Usage:
//   tsx scripts/load-ecosystem-catalog.ts            (postgres + redis from env)
//   tsx scripts/load-ecosystem-catalog.ts --no-pg    (validate + warm redis only)
//   tsx scripts/load-ecosystem-catalog.ts --stats    (parse + per-org counts only)
//
// @cite seeds/ecosystem/artifacts.json
// @cite data/models/alloydb/dim_ecosystem_artifact.yaml

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { EcosystemCatalog } from "../src/cache/ecosystem-catalog.js";
import { initCacheEvents, flushCacheEvents, detachCacheEventSink } from "../src/cache/events.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEED = resolve(REPO_ROOT, "seeds", "ecosystem", "artifacts.json");
const DDL = resolve(REPO_ROOT, "data", "models", "alloydb_ecosystem_ddl.sql");

async function main(): Promise<void> {
  const seed = JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] };
  const catalog = EcosystemCatalog.fromSeed(seed);
  console.log(`ecosystem: ${catalog.artifacts.length} artifacts validated`);
  for (const [org, list] of catalog.byOrg()) {
    console.log(`  ${String(list.length).padStart(3)}  ${org}`);
  }
  if (process.argv.includes("--stats")) return;

  const noPg = process.argv.includes("--no-pg");
  const hasPg =
    !noPg &&
    (process.env.DATABASE_URL !== undefined || process.env.PGHOST !== undefined);

  // B7: pool must be created before warm() so initCacheEvents can wire the sink
  // that receives cache events recorded during warm. try/finally ensures pool.end()
  // on any throw from initCacheEvents (e.g. DDL permission error on a fresh schema).
  let pool: import("pg").Pool | null = null;
  if (hasPg) {
    const { default: pg } = await import("pg");
    pool = new pg.Pool(
      process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
    );
    try {
      await initCacheEvents(pool);
    } catch (err) {
      await pool.end();
      throw err;
    }
  }

  if (process.env.REDIS_URL !== undefined) {
    const { createClient } = await import("redis");
    const { toRedisLike } = await import("../src/lib/redis-adapter.js");
    const nodeRedis = createClient({ url: process.env.REDIS_URL });
    nodeRedis.on("error", () => {});
    try {
      await nodeRedis.connect();
      const redis = toRedisLike(nodeRedis);
      const warmed = await catalog.warm(redis);
      console.log(`ecosystem: warmed ${warmed} keys into L2 (ke:ecosystem:*)`);
    } catch (err) {
      console.log(`ecosystem: L2 warm skipped — ${(err as Error).message}`);
    } finally {
      await nodeRedis.disconnect();
    }
  }

  // Flush any cache events recorded during warm() before continuing to the dim load.
  if (pool !== null) {
    try {
      await flushCacheEvents();
    } catch (err) {
      console.log(`ecosystem: cache event flush skipped — ${(err as Error).message}`);
    }
  }

  if (noPg) return;
  if (!hasPg) {
    console.log("ecosystem: no postgres env — skipping dim load (use --no-pg to silence)");
    return;
  }

  try {
    await pool!.query(readFileSync(DDL, "utf8"));
    const c = catalog.toDimColumns();
    const res = await pool!.query(
      `INSERT INTO dw.dim_ecosystem_artifact (org, name, kind, lang, license, description, url, stars, source_page)
       SELECT * FROM unnest(
         $1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::text[], $7::text[], $8::bigint[], $9::text[])
       ON CONFLICT (org, name, kind) DO UPDATE
         SET lang = EXCLUDED.lang, license = EXCLUDED.license,
             description = EXCLUDED.description, url = EXCLUDED.url,
             stars = EXCLUDED.stars, source_page = EXCLUDED.source_page,
             loaded_at = NOW()`,
      [c.org, c.name, c.kind, c.lang, c.license, c.description, c.url, c.stars, c.source_page],
    );
    console.log(`dim_ecosystem_artifact: upserted ${res.rowCount} rows (SCD I)`);
  } finally {
    detachCacheEventSink();
    await pool!.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
