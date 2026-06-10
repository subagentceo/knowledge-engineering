/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/citations.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import {
  getCitationCached,
  cacheCounters,
  clearL1ForTests,
  type RedisLike,
} from "./citation-cache.js";
import type { CslItem } from "./csl.js";
import type { PgLike } from "../cache/durable-store.js";

const item: CslItem = { id: "x:doc", type: "article", title: "Doc" };
const lookup = (id: string): CslItem | undefined => (id === "x:doc" ? item : undefined);

function fakeRedis(store: Map<string, string>): RedisLike {
  return {
    async get(k) { return store.get(k) ?? null; },
    async set(k, v) { store.set(k, v); return "OK"; },
  };
}
function fakePg(rows: Map<string, unknown>): PgLike {
  return {
    async query(text, values = []) {
      if (text.startsWith("UPDATE semantic_cache")) {
        const payload = rows.get(values[0] as string);
        return { rows: payload === undefined ? [] : [{ payload }] };
      }
      return { rows: [] };
    },
  };
}

// miss → corpus, then L1 serves repeats
clearL1ForTests();
const before = { ...cacheCounters };
let r = await getCitationCached("x:doc", {}, lookup);
assert.equal(r.tier, "miss");
r = await getCitationCached("x:doc", {}, lookup);
assert.equal(r.tier, "l1");
assert.equal(cacheCounters.miss, before.miss + 1);
assert.equal(cacheCounters.l1, before.l1 + 1);

// L2 serves when L1 is cold; miss path populates L2
clearL1ForTests();
const redisStore = new Map<string, string>();
redisStore.set("csl:x:doc", JSON.stringify(item));
r = await getCitationCached("x:doc", { redis: fakeRedis(redisStore) }, lookup);
assert.equal(r.tier, "l2");
clearL1ForTests();
const redis2 = new Map<string, string>();
r = await getCitationCached("x:doc", { redis: fakeRedis(redis2) }, lookup);
assert.equal(r.tier, "miss");
assert.ok(redis2.has("csl:x:doc")); // populated for next reader

// L3 serves when L1+L2 cold; promotes into L2
clearL1ForTests();
const redis3 = new Map<string, string>();
const pgRows = new Map<string, unknown>([["csl:x:doc", item]]);
r = await getCitationCached("x:doc", { redis: fakeRedis(redis3), pg: fakePg(pgRows) }, lookup);
assert.equal(r.tier, "l3");
assert.ok(redis3.has("csl:x:doc"));

// unknown id stays a miss with undefined item
clearL1ForTests();
r = await getCitationCached("nope", {}, lookup);
assert.equal(r.tier, "miss");
assert.equal(r.item, undefined);

console.log("citation-cache.test.ts OK");
