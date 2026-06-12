/**
 * @tdd green
 * @cite data/models/alloydb/events_cache_access.yaml
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import { z } from "zod";
import {
  EVENTS_CACHE_ACCESS_DDL,
  FLUSH_AFTER_EVENTS,
  MAX_BUFFERED_EVENTS,
  __test,
  attachCacheEventSink,
  flushCacheEvents,
  initCacheEvents,
  laneOf,
  pendingCacheEvents,
  recordCacheEvent,
} from "../cache/events.js";
import { DurableStore, type PgLike } from "../cache/durable-store.js";

function makeFakePg() {
  const calls: Array<{ text: string; values: unknown[] }> = [];
  const pg: PgLike = {
    async query(text, values = []) {
      calls.push({ text, values });
      if (text.includes("RETURNING payload")) return { rows: [] };
      return { rows: [] };
    },
  };
  return { pg, calls };
}

beforeEach(() => __test.reset());

test("DDL targets dw.events_cache_access append-only shape", () => {
  assert.ok(EVENTS_CACHE_ACCESS_DDL.includes("dw.events_cache_access"));
  assert.ok(EVENTS_CACHE_ACCESS_DDL.includes("occurred_at"));
  assert.ok(EVENTS_CACHE_ACCESS_DDL.includes("CHECK (tier IN ('L1', 'L2', 'L3'))"));
});

test("laneOf parses the ke:<lane>:<id> namespace", () => {
  assert.equal(laneOf("ke:vendor:cloudflare/page.md"), "vendor");
  assert.equal(laneOf("unnamespaced"), null);
});

test("recordCacheEvent buffers with lane + timestamp", () => {
  recordCacheEvent("ke:engineering:doc1", "L1", "hit");
  assert.equal(pendingCacheEvents(), 1);
  const e = __test.peek()[0];
  assert.ok(e !== undefined);
  assert.equal(e.lane, "engineering");
  assert.equal(e.tier, "L1");
  assert.equal(e.op, "hit");
  assert.ok(e.occurredAt instanceof Date);
});

test("buffer is bounded — oldest events drop past MAX_BUFFERED_EVENTS", () => {
  for (let i = 0; i <= MAX_BUFFERED_EVENTS + 5; i++) {
    recordCacheEvent(`ke:x:${i}`, "L2", "miss");
  }
  assert.equal(pendingCacheEvents(), MAX_BUFFERED_EVENTS);
  const first = __test.peek()[0];
  assert.ok(first !== undefined && first.cacheKey !== "ke:x:0");
});

test("flushCacheEvents drains the buffer into the sink as one batched insert", async () => {
  const { pg, calls } = makeFakePg();
  attachCacheEventSink(pg);
  recordCacheEvent("ke:blog:a", "L2", "hit");
  recordCacheEvent("ke:blog:b", "L3", "set");
  const written = await flushCacheEvents();
  assert.equal(written, 2);
  assert.equal(pendingCacheEvents(), 0);
  assert.equal(calls.length, 1);
  const call = calls[0];
  assert.ok(call !== undefined);
  assert.ok(call.text.includes("INSERT INTO dw.events_cache_access"));
  assert.deepEqual(call.values[0], ["ke:blog:a", "ke:blog:b"]);
  assert.deepEqual(call.values[1], ["L2", "L3"]);
});

test("flush without a sink is a no-op", async () => {
  recordCacheEvent("ke:blog:a", "L1", "hit");
  assert.equal(await flushCacheEvents(), 0);
  assert.equal(pendingCacheEvents(), 1);
});

test("failed flush re-buffers the batch", async () => {
  const pg: PgLike = {
    async query() {
      throw new Error("sink down");
    },
  };
  attachCacheEventSink(pg);
  recordCacheEvent("ke:blog:a", "L1", "hit");
  await assert.rejects(flushCacheEvents(), /sink down/);
  assert.equal(pendingCacheEvents(), 1);
});

test("auto-flush fires once the buffer crosses FLUSH_AFTER_EVENTS", async () => {
  const { pg, calls } = makeFakePg();
  attachCacheEventSink(pg);
  for (let i = 0; i < FLUSH_AFTER_EVENTS; i++) {
    recordCacheEvent(`ke:auto:${i}`, "L1", "miss");
  }
  // recordCacheEvent flushes fire-and-forget; yield the microtask queue.
  await new Promise((r) => setImmediate(r));
  assert.equal(calls.length, 1);
  assert.equal(pendingCacheEvents(), 0);
});

test("initCacheEvents applies DDL and attaches the sink", async () => {
  const { pg, calls } = makeFakePg();
  await initCacheEvents(pg);
  const first = calls[0];
  assert.ok(first !== undefined && first.text.includes("CREATE TABLE IF NOT EXISTS dw.events_cache_access"));
  recordCacheEvent("ke:x:1", "L1", "hit");
  assert.equal(await flushCacheEvents(), 1);
});

test("DurableStore get/set/promote emit L3 events", async () => {
  const { pg } = makeFakePg();
  const store = new DurableStore(pg);
  const schema = z.object({ v: z.number() });
  await store.set({ key: "ke:eng:k1", value: { v: 1 } }, schema);
  await store.get("ke:eng:k1", schema); // fake pg returns no rows → miss
  await store.persistVolatile([{ key: "ke:eng:k2", value: { v: 2 }, hits: 5 }], schema);
  const ops = __test.peek().map((e) => `${e.tier}:${e.op}`);
  assert.deepEqual(ops, ["L3:set", "L3:miss", "L3:set", "L3:promote"]);
});
