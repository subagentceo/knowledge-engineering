/**
 * @tdd green
 * @cite data/models/alloydb/dim_tailscale_node.yaml
 * @cite data/models/alloydb/events_pr_merge.yaml
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 */
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

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      passed += 1;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed += 1;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

function assertEqual(actual: unknown, expected: unknown, msg?: string): void {
  if (actual !== expected) {
    throw new Error(msg ?? `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertOk(value: unknown, msg?: string): void {
  if (!value) {
    throw new Error(msg ?? `expected truthy value, got ${JSON.stringify(value)}`);
  }
}

function assertDeepEqual(actual: unknown, expected: unknown, msg?: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(msg ?? `expected ${e}, got ${a}`);
  }
}

function assertThrows(fn: () => unknown, re: RegExp = /./s): void {
  try {
    fn();
  } catch (err) {
    if (!re.test((err as Error).message)) {
      throw new Error(`error message ${JSON.stringify((err as Error).message)} did not match ${re}`);
    }
    return;
  }
  throw new Error(`expected throw matching ${re}, but no error was raised`);
}

// ── toUtcBounds ───────────────────────────────────────────────────────────────

await check("toUtcBounds: 2026.06.16 PDT (UTC-7) → T07:00:00Z window", () => {
  const b = toUtcBounds("2026.06.16");
  assertEqual(b.semvarDate, "2026.06.16");
  assertEqual(b.start, "2026-06-16T07:00:00.000Z");
  assertEqual(b.end, "2026-06-17T07:00:00.000Z");
});

await check("toUtcBounds: 2026.11.01 PST (UTC-8) → T08:00:00Z window", () => {
  const b = toUtcBounds("2026.11.01", -8);
  assertEqual(b.start, "2026-11-01T08:00:00.000Z");
  assertEqual(b.end, "2026-11-02T08:00:00.000Z");
});

await check("toUtcBounds: window is exactly 24 hours", () => {
  const b = toUtcBounds("2026.06.17");
  const diff = new Date(b.end).getTime() - new Date(b.start).getTime();
  assertEqual(diff, 86_400_000);
});

// ── key helpers ───────────────────────────────────────────────────────────────

await check("prMergeCacheKey: returns pr:merge:<n>", () => {
  assertEqual(prMergeCacheKey(502), "pr:merge:502");
});

await check("prMergesByDateKey: returns pr:merged:<date>", () => {
  assertEqual(prMergesByDateKey("2026.06.16"), "pr:merged:2026.06.16");
});

await check("tailscaleNodeKey: returns ts:node:<host>", () => {
  assertEqual(tailscaleNodeKey("alexs-macbook-pro"), "ts:node:alexs-macbook-pro");
});

await check("tailscaleNodesByTagKey: encodes tag URI component", () => {
  assertEqual(tailscaleNodesByTagKey("tag:dev"), "ts:nodes:tag:tag%3Adev");
});

// ── schema validation ─────────────────────────────────────────────────────────

await check("TailscaleNodeSchema: accepts valid node", () => {
  const n = TailscaleNodeSchema.parse({
    hostname: "wsl-ubuntu2604-jadecli",
    tailnet: "taile5fcbd.ts.net",
    ts_ip: "100.112.152.5",
    tag: "tag:server",
    os: "ubuntu-26.04",
    status: "active",
    metadata: { alloydb_port: 5432 },
  });
  assertEqual(n.hostname, "wsl-ubuntu2604-jadecli");
  assertEqual(n.tailnet, "taile5fcbd.ts.net");
  assertEqual(n.tag, "tag:server");
  assertEqual(n.status, "active");
});

await check("TailscaleNodeSchema: defaults status=active, tailnet", () => {
  const n = TailscaleNodeSchema.parse({ hostname: "test", tag: "tag:dev" });
  assertEqual(n.status, "active");
  assertEqual(n.tailnet, "ts.subagentceo.io");
});

await check("TailscaleNodeSchema: rejects unknown tag", () => {
  assertThrows(() => TailscaleNodeSchema.parse({ hostname: "x", tag: "tag:admin" }));
});

await check("PrMergeEventSchema: accepts valid event", () => {
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
  assertEqual(ev.pr_number, 515);
  assertEqual(ev.repo, "subagentceo/knowledge-engineering");
  assertEqual(ev.files_changed, 12);
});

await check("PrMergeEventSchema: rejects non-positive pr_number", () => {
  assertThrows(() => PrMergeEventSchema.parse({
    pr_number: 0,
    title: "x",
    branch: "b",
    merged_at: "2026-06-18T00:00:00Z",
    semvar_date: "2026.06.17",
  }));
});

// ── seed data integrity ───────────────────────────────────────────────────────

await check("MERGED_2026_06_16_PST: 3 events, all semvar_date=2026.06.16", () => {
  assertEqual(MERGED_2026_06_16_PST.length, 3);
  for (const ev of MERGED_2026_06_16_PST) {
    assertEqual(ev.semvar_date, "2026.06.16");
    PrMergeEventSchema.parse(ev);
  }
});

await check("MERGED_2026_06_16_PST: hostnames are taile5fcbd.ts.net nodes", () => {
  const nodes = new Set(MERGED_2026_06_16_PST.map((ev) => ev.initiating_node));
  assertOk(nodes.has("alexs-macbook-pro"), "initiating node should be alexs-macbook-pro");
});

await check("MERGED_2026_06_17_PST: 2 events including OWSL1 + vendor-crawl", () => {
  assertEqual(MERGED_2026_06_17_PST.length, 2);
  for (const ev of MERGED_2026_06_17_PST) {
    assertEqual(ev.semvar_date, "2026.06.17");
    PrMergeEventSchema.parse(ev);
  }
  const prNums = MERGED_2026_06_17_PST.map((ev) => ev.pr_number);
  assertOk(prNums.includes(515), "OWSL1 (#515) must be in 2026-06-17 seed");
  assertOk(prNums.includes(516), "vendor-crawl (#516) must be in 2026-06-17 seed");
});

await check("MERGED_2026_06_17_PST: #515 initiated from wsl-ubuntu2604-jadecli", () => {
  const owsl = MERGED_2026_06_17_PST.find((ev) => ev.pr_number === 515);
  assertOk(owsl, "PR #515 not found in seed");
  assertEqual(owsl!.initiating_node, "wsl-ubuntu2604-jadecli");
  assertEqual(owsl!.initiating_tag, "tag:server");
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

await check("recordTailscaleNode: writes to redis + pg without throwing", async () => {
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
  assertOk(redis.store.has(nodeKey), "node key written to redis");

  const tagKey = tailscaleNodesByTagKey("tag:server");
  assertOk(redis.store.has(tagKey), "tag membership written to redis");

  const hostnames = JSON.parse(redis.store.get(tagKey)!.toString()) as string[];
  assertOk(hostnames.includes("wsl-ubuntu2604-jadecli"));
});

await check("recordTailscaleNode: deduplicates tag membership on second call", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const node = { hostname: "alexs-macbook-pro", tag: "tag:dev" as const, metadata: {} };
  await recordTailscaleNode(node, { redis, pg });
  await recordTailscaleNode(node, { redis, pg });

  const tagKey = tailscaleNodesByTagKey("tag:dev");
  const hostnames = JSON.parse(redis.store.get(tagKey)!.toString()) as string[];
  assertEqual(hostnames.filter((h) => h === "alexs-macbook-pro").length, 1);
});

await check("recordPrMerge: writes pr lookup + dated list to redis", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const ev = MERGED_2026_06_17_PST.find((e) => e.pr_number === 515)!;
  await recordPrMerge(ev, { redis, pg });

  const prKey = prMergeCacheKey(515);
  assertOk(redis.store.has(prKey), "per-PR key written");

  const listKey = prMergesByDateKey("2026.06.17");
  assertOk(redis.store.has(listKey), "dated list key written");

  const list = JSON.parse(redis.store.get(listKey)!.toString());
  assertEqual(list[0].pr_number, 515);
});

await check("getPrMergesByDate: L2 hit returns cached events without pg query", async () => {
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
  assertEqual(result.length, 1);
  assertEqual(result[0].pr_number, 516);
  assertEqual(pgCallCount.n, 0, "pg should not be queried when redis has data");
});

await check("getPrMergesByDate: L3 fallback queries pg when redis is empty", async () => {
  const redis = makeRedis();
  const pgRows = [MERGED_2026_06_16_PST[0]];
  const pg: StoreOpts["pg"] = {
    async query() {
      return { rows: pgRows, rowCount: pgRows.length, command: "SELECT", oid: 0, fields: [] } as never;
    },
  } as unknown as StoreOpts["pg"];

  const result = await getPrMergesByDate("2026.06.16", { redis, pg });
  assertEqual(result.length, 1);
  assertEqual(result[0].pr_number, 499);
  // Should now be cached in redis
  const listKey = prMergesByDateKey("2026.06.16");
  assertOk(redis.store.has(listKey), "pg results written back to redis");
});

await check("getPrMergesByDate: returns empty array when both redis and pg are empty", async () => {
  const redis = makeRedis();
  const pg = makePg();
  const result = await getPrMergesByDate("2026.01.01", { redis, pg });
  assertDeepEqual(result, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
