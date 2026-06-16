/**
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */

import assert from "node:assert/strict";
import { z } from "zod";
import {
  DurableStore,
  PROMOTE_AFTER_HITS,
  SEMANTIC_CACHE_DDL,
  type PgLike,
} from "../cache/durable-store.js";

// In-memory PgLike fake that interprets the exact statements DurableStore
// issues. Keeps tests hermetic — no postgres needed in CI.
function makeFakePg() {
  const table = new Map<string, { payload: unknown; source_path: string | null; hits: number; lastHit: number }>();
  const log: string[] = [];
  const pg: PgLike = {
    async query(text, values = []) {
      log.push(text);
      if (text.startsWith("CREATE TABLE")) return { rows: [] };
      if (text.startsWith("INSERT INTO semantic_cache")) {
        const [key, payload, sourcePath, hits] = values as [string, string, string | null, number];
        const existing = table.get(key);
        table.set(key, {
          payload: JSON.parse(payload),
          source_path: sourcePath ?? null,
          hits: existing ? existing.hits + Math.max(hits, 1) : hits,
          lastHit: Date.now(),
        });
        return { rows: [] };
      }
      if (text.startsWith("UPDATE semantic_cache")) {
        const row = table.get(values[0] as string);
        if (!row) return { rows: [] };
        row.hits += 1;
        return { rows: [{ payload: row.payload, source_path: row.source_path }] };
      }
      if (text.startsWith("DELETE FROM semantic_cache")) return { rows: [] };
      throw new Error(`fake pg: unhandled statement: ${text.slice(0, 40)}`);
    },
  };
  return { pg, table, log };
}

const Doc = z.object({ title: z.string(), tokens: z.number() });
type Doc = z.infer<typeof Doc>;

const { pg, table, log } = makeFakePg();
const store = new DurableStore(pg);

await store.init();
assert.ok(log[0].includes("CREATE TABLE IF NOT EXISTS semantic_cache"));
assert.ok(SEMANTIC_CACHE_DDL.includes("payload     jsonb NOT NULL"));

// set → get round-trips through the zod schema; get() now returns { value, sourcePath }
await store.set({ key: "k1", value: { title: "clio", tokens: 42 }, sourcePath: "vendor/x.md" }, Doc);
const k1Result = await store.get("k1", Doc);
assert.ok(k1Result !== undefined);
assert.deepEqual(k1Result.value, { title: "clio", tokens: 42 });
assert.equal(k1Result.sourcePath, "vendor/x.md");
assert.equal(await store.get("missing", Doc), undefined);

// schema violation fails closed at write time
await assert.rejects(
  store.set({ key: "bad", value: { title: "x" } as unknown as Doc }, Doc),
);
assert.equal(table.has("bad"), false);

// persistVolatile promotes only entries past the hit threshold
const promoted = await store.persistVolatile(
  [
    { key: "cold", value: { title: "cold", tokens: 1 }, hits: PROMOTE_AFTER_HITS - 1 },
    { key: "hot", value: { title: "hot", tokens: 2 }, hits: PROMOTE_AFTER_HITS },
  ],
  Doc,
);
assert.equal(promoted, 1);
assert.equal(table.has("cold"), false);
assert.ok(table.has("hot"));

// onPromote event sink fires once per promoted entry, skipped entries excluded
{
  const events: string[] = [];
  const n = await store.persistVolatile(
    [
      { key: "evt-cold", value: { title: "c", tokens: 1 }, hits: PROMOTE_AFTER_HITS - 1 },
      { key: "evt-hot", value: { title: "h", tokens: 2 }, hits: PROMOTE_AFTER_HITS },
    ],
    Doc,
    async (e) => { events.push(e.key); },
  );
  assert.equal(n, 1);
  assert.deepEqual(events, ["evt-hot"]);
}

console.log("durable-store.test.ts OK");
