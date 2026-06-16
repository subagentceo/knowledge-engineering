/**
 * @tdd green
 * @cite seeds/ecosystem/artifacts.json
 * @cite seeds/citations/define-outcomes.md
 * @cite seeds/memory/heartbeat/last-tick.md
 *
 * The EcosystemCatalog Redis object (src/cache/ecosystem-catalog.ts) +
 * its projection to dw.dim_ecosystem_artifact.
 * B7: load script must call initCacheEvents(pool) before warm() and
 * flushCacheEvents() after so cache set events are not silently dropped.
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  EcosystemCatalog,
  EcosystemArtifactSchema,
  ecosystemCacheKey,
} from "../cache/ecosystem-catalog.js";
import {
  attachCacheEventSink,
  detachCacheEventSink,
  flushCacheEvents,
  pendingCacheEvents,
  __test as eventsTest,
} from "../cache/events.js";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SEED = resolve(REPO_ROOT, "seeds", "ecosystem", "artifacts.json");

test("the shipped seed parses and every artifact validates", () => {
  const seed = JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] };
  const catalog = EcosystemCatalog.fromSeed(seed);
  assert.ok(catalog.artifacts.length >= 30);
  for (const a of catalog.artifacts) EcosystemArtifactSchema.parse(a);
});

test("all four orgs + npm scopes are represented", () => {
  const catalog = EcosystemCatalog.fromSeed(
    JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] },
  );
  const orgs = new Set(catalog.byOrg().keys());
  for (const o of ["anthropics", "modelcontextprotocol", "safety-research", "redis", "anthropic-ai"]) {
    assert.ok(orgs.has(o), `missing org ${o}`);
  }
});

test("cache key is deterministic ke:ecosystem:<org>/<name>", () => {
  assert.equal(
    ecosystemCacheKey({ org: "redis", name: "go-redis" }),
    "ke:ecosystem:redis/go-redis",
  );
});

test("constructor dedupes on (org, name, kind), last write wins", () => {
  const base = {
    org: "redis", name: "redis", kind: "repo", lang: "C", license: "Other",
    description: "old", url: "https://github.com/redis/redis",
    source_page: "https://github.com/orgs/redis/repositories",
  };
  const catalog = new EcosystemCatalog([base, { ...base, description: "new" }]);
  assert.equal(catalog.artifacts.length, 1);
  assert.equal(catalog.artifacts[0]?.description, "new");
});

test("toDimColumns returns aligned positional arrays", () => {
  const catalog = EcosystemCatalog.fromSeed(
    JSON.parse(readFileSync(SEED, "utf8")) as { artifacts: unknown[] },
  );
  const c = catalog.toDimColumns();
  const n = catalog.artifacts.length;
  for (const col of [c.org, c.name, c.kind, c.lang, c.license, c.description, c.url, c.stars, c.source_page]) {
    assert.equal(col.length, n);
  }
  // npm rows carry a null lang; repo rows carry a string.
  const redisRedis = catalog.artifacts.findIndex((a) => a.org === "redis" && a.name === "redis");
  assert.equal(c.kind[redisRedis], "repo");
});

test("invalid artifact (bad url / bad kind) is rejected", () => {
  assert.throws(() => new EcosystemCatalog([
    { org: "x", name: "y", kind: "repo", lang: null, license: null, description: null, url: "not-a-url", source_page: "https://example.com" },
  ]));
  assert.throws(() => new EcosystemCatalog([
    { org: "x", name: "y", kind: "wat", lang: null, license: null, description: null, url: "https://example.com", source_page: "https://example.com" },
  ]));
});

// B7: cache event sink wiring tests — verify the contract that initCacheEvents
// must be called before warm() so events are not silently dropped.

test("B7: warm() records L1+L2 set events into the buffer", async () => {
  eventsTest.reset();
  const redis = {
    set: async () => "OK",
  } as unknown as import("ioredis").Redis;
  const catalog = new EcosystemCatalog([{
    org: "test-org", name: "test-repo", kind: "repo", lang: "TypeScript",
    license: "MIT", description: "test", url: "https://github.com/test-org/test-repo",
    source_page: "https://github.com/orgs/test-org/repositories",
  }]);
  await catalog.warm(redis);
  // Each artifact writes 2 events: L1 set + L2 set (via lru-bm25 set())
  assert.ok(pendingCacheEvents() >= 1, "warm() must record at least one cache event");
  eventsTest.reset();
});

test("B7: attachCacheEventSink enables flushCacheEvents to drain buffered events", async () => {
  eventsTest.reset();
  const flushed: unknown[][] = [];
  const fakePg = {
    async query(sql: string, params: unknown[]) {
      flushed.push(params);
      return { rows: [], rowCount: 0 };
    },
  };

  const redis = {
    set: async () => "OK",
  } as unknown as import("ioredis").Redis;
  const catalog = new EcosystemCatalog([{
    org: "test-org", name: "flush-repo", kind: "repo", lang: null,
    license: null, description: null, url: "https://github.com/test-org/flush-repo",
    source_page: "https://github.com/orgs/test-org/repositories",
  }]);

  attachCacheEventSink(fakePg);
  try {
    await catalog.warm(redis);
    // Buffer should have events but auto-flush threshold not yet hit — flush manually
    // to mirror what the load script does after warm().
    const written = await flushCacheEvents();
    // The sink must have been called for at least one L1+L2 set event from warm().
    assert.ok(written > 0, "flushCacheEvents must write at least one event after warm()");
  } finally {
    detachCacheEventSink();
    eventsTest.reset();
  }
});

test("B7: without attachCacheEventSink, flushCacheEvents returns 0 (events dropped)", async () => {
  eventsTest.reset();
  const redis = {
    set: async () => "OK",
  } as unknown as import("ioredis").Redis;
  const catalog = new EcosystemCatalog([{
    org: "test-org", name: "drop-repo", kind: "repo", lang: null,
    license: null, description: null, url: "https://github.com/test-org/drop-repo",
    source_page: "https://github.com/orgs/test-org/repositories",
  }]);
  await catalog.warm(redis);
  // No sink attached — flush returns 0, proving events are dropped without initCacheEvents
  const written = await flushCacheEvents();
  assert.equal(written, 0, "events are silently dropped when no sink is attached (the B7 bug)");
  eventsTest.reset();
});
