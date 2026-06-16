/**
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/citations/dreams.md
 * @cite seeds/memory/heartbeat/last-tick.md
 *
 * Read-through contract: src/cache/tiered.ts (L1 LRU → L2 Redis → L3
 * Postgres semantic_cache with backfill + heat-based promotion).
 * B1: volatileHits eviction after promotion.
 * B2: sourcePath threaded through L3 backfill path.
 */

import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import { z } from "zod";
import type { Redis } from "ioredis";
import { tieredGet, tieredSet, __test as tieredTest } from "../cache/tiered.js";
import { DurableStore, PROMOTE_AFTER_HITS, type PgLike } from "../cache/durable-store.js";
import { invalidate } from "../cache/lru-bm25.js";
import { __test as eventsTest } from "../cache/events.js";

const Schema = z.object({ v: z.string() });

function makeFakeRedis() {
  const store = new Map<string, Buffer>();
  const redis = {
    async getBuffer(key: string) {
      return store.get(key) ?? null;
    },
    async set(key: string, value: Buffer) {
      store.set(key, value);
      return "OK";
    },
    async del(key: string) {
      return store.delete(key) ? 1 : 0;
    },
  } as unknown as Redis;
  return { redis, store };
}

function makeFakePg() {
  const rows = new Map<string, unknown>();
  const sourcePaths = new Map<string, string | null>();
  const log: string[] = [];
  const pg: PgLike = {
    async query(text, values = []) {
      log.push(text);
      if (text.startsWith("INSERT INTO semantic_cache")) {
        const [key, payload, sp] = values as [string, string, string | null, number];
        rows.set(key, JSON.parse(payload));
        sourcePaths.set(key, sp ?? null);
        return { rows: [] };
      }
      if (text.startsWith("UPDATE semantic_cache")) {
        const key = values[0] as string;
        const payload = rows.get(key);
        if (payload === undefined) return { rows: [] };
        return { rows: [{ payload, source_path: sourcePaths.get(key) ?? null }] };
      }
      return { rows: [] };
    },
  };
  return { pg, rows, sourcePaths, log };
}

beforeEach(() => {
  tieredTest.reset();
  eventsTest.reset();
});

test("tieredSet then tieredGet resolves from the volatile tiers", async () => {
  const { redis } = makeFakeRedis();
  const { pg } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  await tieredSet(cache, "ke:t:a", { v: "x" }, Schema);
  assert.deepEqual(await tieredGet(cache, "ke:t:a", Schema), { v: "x" });
});

test("L3 hit backfills L1/L2 so the next read is volatile", async () => {
  const { redis, store } = makeFakeRedis();
  const { pg, rows } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  rows.set("ke:t:b", { v: "from-l3" });
  await invalidate(redis, "ke:t:b"); // ensure no stale L1 from other tests

  const first = await tieredGet(cache, "ke:t:b", Schema);
  assert.deepEqual(first, { v: "from-l3" });
  assert.ok(store.has("ke:t:b"), "L2 backfilled");

  const events = eventsTest.peek().map((e) => `${e.tier}:${e.op}`);
  assert.ok(events.includes("L3:hit"));
  assert.ok(events.includes("L2:set"), "backfill recorded");
});

test("all-tier miss returns undefined", async () => {
  const { redis } = makeFakeRedis();
  const { pg } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  assert.equal(await tieredGet(cache, "ke:t:absent", Schema), undefined);
});

test("crossing PROMOTE_AFTER_HITS volatile hits promotes to L3", async () => {
  const { redis } = makeFakeRedis();
  const { pg, rows } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  await tieredSet(cache, "ke:t:hot", { v: "hot" }, Schema, { sourcePath: "vendor/x.md" });

  for (let i = 0; i < PROMOTE_AFTER_HITS; i++) {
    await tieredGet(cache, "ke:t:hot", Schema, "vendor/x.md");
  }
  assert.deepEqual(rows.get("ke:t:hot"), { v: "hot" });
  const promotes = eventsTest.peek().filter((e) => e.op === "promote");
  assert.equal(promotes.length, 1, "exactly one promotion");

  // Further hits do not re-promote.
  await tieredGet(cache, "ke:t:hot", Schema);
  assert.equal(eventsTest.peek().filter((e) => e.op === "promote").length, 1);
});

test("tieredSet with durable: true writes straight through to L3", async () => {
  const { redis } = makeFakeRedis();
  const { pg, rows } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  await tieredSet(cache, "ke:t:pin", { v: "pinned" }, Schema, { durable: true });
  assert.deepEqual(rows.get("ke:t:pin"), { v: "pinned" });
});

test("tieredSet rejects schema-invalid values before touching any tier", async () => {
  const { redis, store } = makeFakeRedis();
  const { pg } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  await assert.rejects(
    tieredSet(cache, "ke:t:bad", { v: 42 } as unknown as { v: string }, Schema),
  );
  assert.equal(store.size, 0);
});

// B1 regression: volatileHits entry must be evicted after L3 promotion so the
// map does not grow unbounded in a long-lived A2A server process.
test("B1: volatileHits evicted after promotion to L3", async () => {
  const { redis } = makeFakeRedis();
  const { pg } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };
  await tieredSet(cache, "ke:t:b1", { v: "evict-me" }, Schema, { sourcePath: "vendor/b1.md" });

  for (let i = 0; i < PROMOTE_AFTER_HITS; i++) {
    await tieredGet(cache, "ke:t:b1", Schema, "vendor/b1.md");
  }
  // After promotion the entry must be absent from the in-process hits map.
  // Use hasKey rather than hitsFor==0, which can't distinguish absent from present-with-zero.
  assert.equal(tieredTest.hasKey("ke:t:b1"), false, "volatileHits entry must be deleted after promotion");
});

// B2 regression: sourcePath from L3 row must be carried into persistVolatile
// when a key is backfilled from L3 and later promoted via volatile reads.
test("B2: sourcePath from L3 is threaded through to promotion", async () => {
  const { redis } = makeFakeRedis();
  const { pg, sourcePaths } = makeFakePg();
  const cache = { redis, durable: new DurableStore(pg) };

  // Populate L3 via DurableStore.set so rows and sourcePaths are both seeded correctly.
  await cache.durable.set({ key: "ke:t:b2", value: { v: "b2-val" }, sourcePath: "vendor/b2.md" }, Schema);
  // Evict from volatile so the first tieredGet goes to L3.
  await invalidate(redis, "ke:t:b2");

  // First read → L3 hit, backfills volatile. No sourcePath passed by caller.
  await tieredGet(cache, "ke:t:b2", Schema);
  // Subsequent volatile reads up to promotion threshold.
  for (let i = 1; i < PROMOTE_AFTER_HITS; i++) {
    await tieredGet(cache, "ke:t:b2", Schema);
  }
  // Promotion must have written the sourcePath from L3 back into L3 row.
  assert.equal(sourcePaths.get("ke:t:b2"), "vendor/b2.md", "sourcePath must survive round-trip through L3 backfill and promotion");
});
