/**
 * @tdd green
 * @cite infra/postgres/init/04-tailscale-pr-context.sql
 * @cite src/lib/tailscale-pr-context.ts
 * @cite src/cache/lru-bm25.ts  (RedisLike interface)
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  toUtcBounds,
  prMergeCacheKey,
  prMergesByDateKey,
  tailscaleNodeKey,
  tailscaleNodesByTagKey,
  TailscaleNodeSchema,
  PrMergeEventSchema,
  MERGED_2026_06_16_PST,
  MERGED_2026_06_17_PST,
  recordTailscaleNode,
  recordPrMerge,
  getPrMergesByDate,
  type StoreOpts,
} from "./tailscale-pr-context.js";
import type { RedisLike } from "../cache/lru-bm25.js";

// ── toUtcBounds ───────────────────────────────────────────────────────────────

test("toUtcBounds: 2026.06.16 PDT (UTC-7) → T07:00:00Z window", () => {
  const b = toUtcBounds("2026.06.16");
  assert.equal(b.semvarDate, "2026.06.16");
  assert.equal(b.start, "2026-06-16T07:00:00.000Z");
  assert.equal(b.end, "2026-06-17T07:00:00.000Z");
});

test("toUtcBounds: 2026.11.01 PST (UTC-8) → T08:00:00Z window", () => {
  const b = toUtcBounds("2026.11.01", -8);
  assert.equal(b.start, "2026-11-01T08:00:00.000Z");
  assert.equal(b.end, "2026-11-02T08:00:00.000Z");
});

test("toUtcBounds: window is exactly 24 hours", () => {
  const b = toUtcBounds("2026.06.17");
  const diff = new Date(b.end).getTime() - new Date(b.start).getTime();
  assert.equal(diff, 86_400_000);
});

// ── key helpers ───────────────────────────────────────────────────────────────

test("prMergeCacheKey: returns pr:merge:<n>", () => {
  assert.equal(prMergeCacheKey(502), "pr:merge:502");
});

test("prMergesByDateKey: returns pr:merged:<date>", () => {
  assert.equal(prMergesByDateKey("2026.06.16"), "pr:merged:2026.06.16");
});

test("tailscaleNodeKey: returns ts:node:<host>", () => {
  assert.equal(tailscaleNodeKey("alexs-macbook-pro"), "ts:node:alexs-macbook-pro");
});

test("tailscaleNodesByTagKey: encodes tag URI component", () => {
  assert.equal(tailscaleNodesByTagKey("tag:dev"), "ts:nodes:tag:tag%3Adev");
});

// ── schema validation ─────────────────────────────────────────────────────────

test("TailscaleNodeSchema: accepts valid node", () => {
  const n = TailscaleNodeSchema.parse({
    hostname: "wsl-ubuntu2604-jadecli",
    tailnet: "taile5fcbd.ts.net",
    ts_ip: "100.112.152.5",
    tag: "tag:server",
    os: "ubuntu-26.04",
    status: "active",
    metadata: { alloydb_port: 5432 },
  });
  assert.equal(n.hostname, "wsl-ubuntu2604-jadecli");
  assert.equal(n.tailnet, "taile5fcbd.ts.net");
  assert.equal(n.tag, "tag:server");
  assert.equal(n.status, "active");
});

test("TailscaleNodeSchema: defaults status=active, tailnet", () => {
  const n = TailscaleNodeSchema.parse({ hostname: "test", tag: "tag:dev" });
  assert.equal(n.status, "active");
  assert.equal(n.tailnet, "ts.subagentceo.io");
});

test("TailscaleNodeSchema: rejects unknown tag", () => {
  assert.throws(() => TailscaleNodeSchema.parse({ hostname: "x", tag: "tag:admin" }));
});

test("PrMergeEventSchema: accepts valid event", () => {
  const ev = PrMergeEventSchema.parse({
    pr_number: 515,
    title: "feat(infra): WSL backend (OWSL1)",
    branch: "claude/wsl-persistent-backend",
    merged_at: "2026-06-18T03:00:00Z",
    semvar_date: "2026.06.17",
    pr_type: "feat",
    scope: "infra",
    files_changed: 12,
    initiating_node: "wsl-ubuntu2604-jadecli",
    initiating_tag: "tag:server",
  });
  assert.equal(ev.pr_number, 515);
  assert.equal(ev.repo, "subagentceo/knowledge-engineering");
  assert.equal(ev.files_changed, 12);
});

test("PrMergeEventSchema: rejects non-positive pr_number", () => {
  assert.throws(() => PrMergeEventSchema.parse({
    pr_number: 0,
    title: "x",
    branch: "b",
    merged_at: "2026-06-18T00:00:00Z",
    semvar_date: "2026.06.17",
  }));
});

// ── seed data integrity ───────────────────────────────────────────────────────

test("MERGED_2026_06_16_PST: 3 events, all semvar_date=2026.06.16", () => {
  assert.equal(MERGED_2026_06_16_PST.length, 3);
  for (const ev of MERGED_2026_06_16_PST) {
    assert.equal(ev.semvar_date, "2026.06.16");
    PrMergeEventSchema.parse(ev);
  }
});

test("MERGED_2026_06_16_PST: hostnames are taile5fcbd.ts.net nodes", () => {
  const nodes = new Set(MERGED_2026_06_16_PST.map((ev) => ev.initiating_node));
  assert.ok(nodes.has("alexs-macbook-pro"), "initiating node should be alexs-macbook-pro");
});

test("MERGED_2026_06_17_PST: 2 events including OWSL1 + vendor-crawl", () => {
  assert.equal(MERGED_2026_06_17_PST.length, 2);
  for (const ev of MERGED_2026_06_17_PST) {
    assert.equal(ev.semvar_date, "2026.06.17");
    PrMergeEventSchema.parse(ev);
  }
  const prNums = MERGED_2026_06_17_PST.map((ev) => ev.pr_number);
  assert.ok(prNums.includes(515), "OWSL1 (#515) must be in 2026-06-17 seed");
  assert.ok(prNums.includes(516), "vendor-crawl (#516) must be in 2026-06-17 seed");
});

test("MERGED_2026_06_17_PST: #515 initiated from wsl-ubuntu2604-jadecli", () => {
  const owsl = MERGED_2026_06_17_PST.find((ev) => ev.pr_number === 515);
  assert.ok(owsl, "PR #515 not found in seed");
  assert.equal(owsl.initiating_node, "wsl-ubuntu2604-jadecli");
  assert.equal(owsl.initiating_tag, "tag:server");
});

// ── in-memory mocks for writer functions ─────────────────────────────────────

function makeRedis(): RedisLike & { store: Map<string, Buffer> } {
  const store = new Map<string, Buffer>();
  return {
    store,
    async getBuffer(key: string) { return store.get(key) ?? null; },
    async set(key: string, value: string | Buffer) {
      store.set(key, typeof value === "string" ? Buffer.from(value) : value);
    },
    async del(key: string) { store.delete(key); },
    async expire() {},
  };
}

function makePg(): StoreOpts["pg"] {
  return {
    async query() { return { rows: [], rowCount: 0, command: "", oid: 0, fields: [] } as never; },
  } as unknown as StoreOpts["pg"];
}

test("recordTailscaleNode: writes to redis + pg without throwing", async () => {
  const redis = makeRedis();
  const pg = makePg();
  await recordTailscaleNode({
    hostname: "wsl-ubuntu2604-jadecli",
    tailnet: "taile5fcbd.ts.net",
    ts_ip: "100.112.152.5",
    tag: "tag:server",
    os: "ubuntu-26.04",
    status: "active",
    metadata: {},
  }, { redis, pg });

  const nodeKey = tailscaleNodeKey("wsl-ubuntu2604-jadecli");
  assert.ok(redis.store.has(nodeKey), "node key written to redis");

  const tagKey = tailscaleNodesByTagKey("tag:server");
  assert.ok(redis.store.has(tagKey), "tag membership written to redis");

  const hostnames = JSON.parse(redis.store.get(tagKey)!.toString()) as string[];
  assert.ok(hostnames.includes("wsl-ubuntu2604-jadecli"));
});

test("recordTailscaleNode: deduplicates tag membership on second call", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const node = { hostname: "alexs-macbook-pro", tag: "tag:dev" as const, metadata: {} };
  await recordTailscaleNode(node, { redis, pg });
  await recordTailscaleNode(node, { redis, pg });

  const tagKey = tailscaleNodesByTagKey("tag:dev");
  const hostnames = JSON.parse(redis.store.get(tagKey)!.toString()) as string[];
  assert.equal(hostnames.filter((h) => h === "alexs-macbook-pro").length, 1);
});

test("recordPrMerge: writes pr lookup + dated list to redis", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const ev = MERGED_2026_06_17_PST.find((e) => e.pr_number === 515)!;
  await recordPrMerge(ev, { redis, pg });

  const prKey = prMergeCacheKey(515);
  assert.ok(redis.store.has(prKey), "per-PR key written");

  const listKey = prMergesByDateKey("2026.06.17");
  assert.ok(redis.store.has(listKey), "dated list key written");

  const list = JSON.parse(redis.store.get(listKey)!.toString());
  assert.equal(list[0].pr_number, 515);
});

test("getPrMergesByDate: L2 hit returns cached events without pg query", async () => {
  const redis = makeRedis();
  const pgCallCount = { n: 0 };
  const pg: StoreOpts["pg"] = {
    async query() {
      pgCallCount.n++;
      return { rows: [], rowCount: 0, command: "", oid: 0, fields: [] } as never;
    },
  } as unknown as StoreOpts["pg"];

  const ev = MERGED_2026_06_17_PST.find((e) => e.pr_number === 516)!;
  await recordPrMerge(ev, { redis, pg: makePg() });

  const result = await getPrMergesByDate("2026.06.17", { redis, pg });
  assert.equal(result.length, 1);
  assert.equal(result[0].pr_number, 516);
  assert.equal(pgCallCount.n, 0, "pg should not be queried when redis has data");
});

test("getPrMergesByDate: L3 fallback queries pg when redis is empty", async () => {
  const redis = makeRedis();
  const pgRows = [MERGED_2026_06_16_PST[0]];
  const pg: StoreOpts["pg"] = {
    async query() {
      return { rows: pgRows, rowCount: pgRows.length, command: "SELECT", oid: 0, fields: [] } as never;
    },
  } as unknown as StoreOpts["pg"];

  const result = await getPrMergesByDate("2026.06.16", { redis, pg });
  assert.equal(result.length, 1);
  assert.equal(result[0].pr_number, 499);
  // Should now be cached in redis
  const listKey = prMergesByDateKey("2026.06.16");
  assert.ok(redis.store.has(listKey), "pg results written back to redis");
});

test("getPrMergesByDate: returns empty array when both redis and pg are empty", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const result = await getPrMergesByDate("2026.01.01", { redis, pg });
  assert.deepEqual(result, []);
});
