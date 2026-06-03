/**
 * @cite docs/decisions/2026-06-03-multi-agent-infrastructure.md
 * @cite src/mcp/lanes/knowledge-graph.ts
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// ─── isolate store per test run ───────────────────────────────────────────────

const tmpDir = mkdtempSync(join(tmpdir(), "kg-test-"));
process.env["KG_STORE_PATH"] = join(tmpDir, "kg.json");

const { registerKnowledgeGraph } = await import("./knowledge-graph.js");

// ─── lightweight mock McpServer ───────────────────────────────────────────────

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};
registerKnowledgeGraph(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

// ─── tests ────────────────────────────────────────────────────────────────────

test("kg_create_entities: creates entities and kg_read_graph returns them", async () => {
  await call("kg_create_entities", {
    entities: [
      { name: "orchestrator", type: "coworker", observations: ["manages sub-agents"] },
      { name: "neon-connector", type: "connector", observations: ["postgres wire"] },
    ],
  });

  const graph = await call("kg_read_graph", {});
  const names = graph.entities.map((e: { name: string }) => e.name);
  assert.ok(names.includes("orchestrator"), "orchestrator entity present");
  assert.ok(names.includes("neon-connector"), "neon-connector entity present");
});

test("kg_add_observations: appends observations to an existing entity", async () => {
  await call("kg_create_entities", {
    entities: [{ name: "verifier-agent", type: "coworker", observations: [] }],
  });

  await call("kg_add_observations", {
    entity_name: "verifier-agent",
    observations: ["runs citation-guard", "runs tsc --noEmit"],
  });

  const graph = await call("kg_read_graph", {});
  const entity = graph.entities.find(
    (e: { name: string }) => e.name === "verifier-agent"
  );
  assert.ok(entity, "entity found");
  assert.ok(
    entity.observations.includes("runs citation-guard"),
    "first observation appended"
  );
  assert.ok(
    entity.observations.includes("runs tsc --noEmit"),
    "second observation appended"
  );
});

test("kg_search_nodes: returns entities matching query substring", async () => {
  await call("kg_create_entities", {
    entities: [
      { name: "redis-client", type: "connector", observations: ["dragonfly redis-wire"] },
      { name: "alloydb-client", type: "connector", observations: ["postgres AlloyDB Omni"] },
    ],
  });

  const results = await call("kg_search_nodes", { query: "dragonfly" });
  const names = results.map((e: { name: string }) => e.name);
  assert.ok(names.includes("redis-client"), "redis-client matches dragonfly observation");
  assert.ok(!names.includes("alloydb-client"), "alloydb-client does not match");
});

// ─── cleanup ──────────────────────────────────────────────────────────────────

process.on("exit", () => {
  try { rmSync(tmpDir, { recursive: true }); } catch { /* best-effort */ }
});
