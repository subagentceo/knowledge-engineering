/**
 * Tests for src/lib/turbopuffer-alloydb-bridge.ts.
 *
 * Outcome OPE3 per issue #175. Bridge embeds text via Voyage,
 * upserts vectors to Turbopuffer, and mirrors id+content+metadata
 * into AlloyDB for relational lookups.
 *
 * Tests use injected fakes for the Voyage client, Turbopuffer
 * namespace, and AlloyDB pool — no network, no DB.
 *
 * @tdd green
 * @cite vendor/turbopuffer/turbopuffer.com/docs/namespaces.md
 * @cite vendor/turbopuffer/turbopuffer.com/docs/metadata.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/embeddings.md
 */
import { createBridge } from "./turbopuffer-alloydb-bridge.js";

let passed = 0;
let failed = 0;
function check(name: string, fn: () => Promise<void> | void): Promise<void> {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed++;
      console.log(`  ✓ ${name}`);
    })
    .catch((err) => {
      failed++;
      console.error(`  ✗ ${name}`);
      console.error(`    ${(err as Error).message}`);
    });
}

interface UpsertCall {
  vectors: Array<{ id: string; vector: number[]; attributes?: Record<string, unknown> }>;
}

function fakeVoyage(dim = 3) {
  const calls: string[][] = [];
  return {
    calls,
    defaultModel: "voyage-3.5-lite" as const,
    async embed(input: string[]) {
      calls.push(input);
      return {
        embeddings: input.map((_, i) =>
          Array.from({ length: dim }, (_, j) => i + j * 0.01),
        ),
        model: "voyage-3.5-lite",
        usage: { totalTokens: input.length * 4 },
      };
    },
  };
}

function fakeTurbopuffer() {
  const upserts: UpsertCall[] = [];
  return {
    upserts,
    async upsert(call: UpsertCall) {
      upserts.push(call);
    },
  };
}

function fakeAlloyDb() {
  const queries: Array<{ text: string; values: unknown[] }> = [];
  return {
    queries,
    async query(text: string, values: unknown[]) {
      queries.push({ text, values });
      return { rows: [] };
    },
  };
}

console.log("turbopuffer-alloydb-bridge:");

await check("constructor rejects when ANTHROPIC_API_KEY is set (OAuth-only posture)", () => {
  const before = process.env.ANTHROPIC_API_KEY;
  process.env.ANTHROPIC_API_KEY = "sk-ant-test";
  try {
    let threw = false;
    try {
      createBridge({
        voyage: fakeVoyage(),
        turbopuffer: fakeTurbopuffer(),
        alloydb: fakeAlloyDb(),
        namespace: "test",
      });
    } catch {
      threw = true;
    }
    if (!threw) throw new Error("expected throw on ANTHROPIC_API_KEY presence");
  } finally {
    if (before === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = before;
  }
});

await check("upsert embeds then writes to both turbopuffer and alloydb", async () => {
  const voyage = fakeVoyage();
  const turbopuffer = fakeTurbopuffer();
  const alloydb = fakeAlloyDb();
  const bridge = createBridge({
    voyage,
    turbopuffer,
    alloydb,
    namespace: "docs",
  });
  await bridge.upsert([
    { id: "a", content: "alpha", metadata: { kind: "blog" } },
    { id: "b", content: "beta", metadata: { kind: "blog" } },
  ]);
  if (voyage.calls.length !== 1) throw new Error("voyage called wrong times");
  if (voyage.calls[0]!.length !== 2) throw new Error("voyage batch wrong");
  if (turbopuffer.upserts.length !== 1)
    throw new Error("turbopuffer call count");
  if (turbopuffer.upserts[0]!.vectors.length !== 2)
    throw new Error("turbopuffer vector count");
  if (turbopuffer.upserts[0]!.vectors[0]!.id !== "a")
    throw new Error("turbopuffer id");
  if (alloydb.queries.length !== 2)
    throw new Error(`alloydb expected 2 INSERT queries, got ${alloydb.queries.length}`);
  if (!alloydb.queries[0]!.text.toUpperCase().includes("INSERT"))
    throw new Error("alloydb not an INSERT");
});

await check("upsert is a no-op on empty input", async () => {
  const voyage = fakeVoyage();
  const turbopuffer = fakeTurbopuffer();
  const alloydb = fakeAlloyDb();
  const bridge = createBridge({
    voyage,
    turbopuffer,
    alloydb,
    namespace: "docs",
  });
  await bridge.upsert([]);
  if (voyage.calls.length !== 0) throw new Error("voyage called on empty");
  if (turbopuffer.upserts.length !== 0)
    throw new Error("turbopuffer called on empty");
  if (alloydb.queries.length !== 0)
    throw new Error("alloydb called on empty");
});

await check("upsert passes namespace into the AlloyDB mirror row", async () => {
  const voyage = fakeVoyage();
  const turbopuffer = fakeTurbopuffer();
  const alloydb = fakeAlloyDb();
  const bridge = createBridge({
    voyage,
    turbopuffer,
    alloydb,
    namespace: "engineering-blog",
  });
  await bridge.upsert([{ id: "x", content: "hello", metadata: {} }]);
  const q = alloydb.queries[0]!;
  if (!q.values.includes("engineering-blog"))
    throw new Error("alloydb row missing namespace");
});

await check("upsert is idempotent — same id twice produces ON CONFLICT", async () => {
  const voyage = fakeVoyage();
  const turbopuffer = fakeTurbopuffer();
  const alloydb = fakeAlloyDb();
  const bridge = createBridge({
    voyage,
    turbopuffer,
    alloydb,
    namespace: "docs",
  });
  await bridge.upsert([{ id: "a", content: "alpha", metadata: {} }]);
  await bridge.upsert([{ id: "a", content: "alpha v2", metadata: {} }]);
  const q1 = alloydb.queries[0]!;
  if (!q1.text.toUpperCase().includes("ON CONFLICT"))
    throw new Error("expected ON CONFLICT clause for idempotency");
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
