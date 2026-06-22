/**
 * infra/node/debug.ts
 * Dev/debug entrypoint — smoke-tests AlloyDB pool + ioredis + cache-aside
 * Run: DEBUG=e2m:* npm run debug   (from infra/node/)
 */

import { pool } from "../alloydb/pool.js";
import { createE2MRedis, REDIS_CONFIGS } from "../redis/client.js";
import { createCacheAside } from "../cache/alloydb-redis.js";

async function main() {
  const redis = createE2MRedis(REDIS_CONFIGS.localDocker());
  await redis.client.connect();

  const cache = createCacheAside(pool, redis);

  console.log("\n── AlloyDB Omni ──────────────────────────────────");
  try {
    const { rows } = await pool.query("SELECT NOW() AS now, version() AS ver");
    console.log("✓ Connected:", rows[0].now);
    console.log("  Version:", (rows[0].ver as string).split(" ").slice(0, 2).join(" "));
  } catch (err) {
    console.error("✗ AlloyDB connection failed:", (err as Error).message);
    console.error("  → Is the Docker stack up?  npm run stack:up");
  }

  console.log("\n── Redis ─────────────────────────────────────────");
  try {
    const pong = await redis.client.ping();
    console.log("✓ Redis:", pong);
    const info = await redis.client.info("server");
    const ver = info.match(/redis_version:(.+)/)?.[1]?.trim();
    console.log("  Version:", ver);

    // Bloom filter check (requires redis-stack)
    try {
      await redis.bloomReserve("e2m:debug:bloom", 0.01, 100);
      await redis.bloomAdd("e2m:debug:bloom", "test-item");
      const exists = await redis.bloomExists("e2m:debug:bloom", "test-item");
      console.log("✓ Bloom filter (redis-stack):", exists ? "OK" : "FAIL");
      await redis.client.del("e2m:debug:bloom");
    } catch {
      console.log("  Bloom filter: redis-stack module not loaded (OK for plain Redis)");
    }
  } catch (err) {
    console.error("✗ Redis connection failed:", (err as Error).message);
    console.error("  → Is the Docker stack up?  npm run stack:up");
  }

  console.log("\n── Cache-aside (AlloyDB → ioredis) ───────────────");
  try {
    // Write a test value directly, then read via cache
    const testKey = "e2m:cache:debug:ping";
    await redis.client.set(testKey, JSON.stringify([{ ok: true }]), "PX", 5_000);
    const rows = await cache.query<{ ok: boolean }>(
      "ping",
      "SELECT TRUE AS ok",
      [],
      { ns: "debug", ttlMs: 5_000 },
    );
    console.log("✓ Cache-aside result:", rows);
    await cache.flushNamespace("debug");
    console.log("✓ Namespace flush: OK");
  } catch (err) {
    console.error("✗ Cache-aside error:", (err as Error).message);
  }

  console.log("\n── RedisInsight UI ───────────────────────────────");
  console.log("  http://localhost:8001  (redis-stack container)");
  console.log("\n── Done ──────────────────────────────────────────\n");

  await redis.disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
