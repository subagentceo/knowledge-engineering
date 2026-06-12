/**
 * @tdd green
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/citations/dreams.md
 *
 * Read-through contract: src/cache/tiered.ts (L1 LRU → L2 Redis → L3
 * Postgres semantic_cache with backfill + heat-based promotion).
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
  const log: string[] = [];
  const pg: PgLike = {
    async query(text, values = []) {
      log.push(text);
      if (text.startsWith("INSERT INTO semantic_cache")) {
        rows.set(values[0] as string, JSON.parse(values[1] as string));
        return { rows: [] };
      }
      if (text.startsWith("UPDATE semantic_cache")) {
        const payload = rows.get(values[0] as string);
        return { rows: payload === undefined ? [] : [{ payload }] };
      }
      return { rows: [] };
    },
  };
  return { pg, rows, log };
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
