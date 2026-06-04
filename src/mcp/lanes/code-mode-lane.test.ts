/**
 * @cite seeds/citations/programmatic-tool-calling.md
 * @cite seeds/citations/define-outcomes.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "cm-test-"));
process.env["KG_STORE_PATH"] = join(tmpDir, "kg.json");

const { registerCodeMode } = await import("./code-mode-lane.js");
const { registerKnowledgeGraph } = await import("./knowledge-graph.js");

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};
registerCodeMode(mockServer as any);
registerKnowledgeGraph(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

test("code_mode_batch: kg_read_graph step returns graph", async () => {
  const r = await call("code_mode_batch", {
    steps: [{ tool: "kg_read_graph", args: {} }],
  });
  assert.equal(r.steps, 1, "one step ran");
  assert.ok("entities" in r.results[0].result, "result has entities");
});

test("code_mode_batch: kg_search_nodes step returns matches", async () => {
  await call("kg_create_entities", {
    entities: [{ name: "batch-target", type: "outcome", observations: ["batch-unique-tag"] }],
  });
  const r = await call("code_mode_batch", {
    steps: [{ tool: "kg_search_nodes", args: { query: "batch-unique-tag" } }],
  });
  assert.equal(r.steps, 1);
  assert.ok(r.results[0].result.some((e: { name: string }) => e.name === "batch-target"), "target found");
});

test("code_mode_batch: multiple steps run in order", async () => {
  await call("kg_create_entities", {
    entities: [
      { name: "step-a", type: "task", observations: [] },
      { name: "step-b", type: "task", observations: [] },
    ],
  });
  const r = await call("code_mode_batch", {
    steps: [
      { tool: "kg_read_graph", args: {} },
      { tool: "kg_open_nodes", args: { names: ["step-a"] } },
    ],
  });
  assert.equal(r.steps, 2, "two steps ran");
  assert.equal(r.results[0].tool, "kg_read_graph");
  assert.equal(r.results[1].tool, "kg_open_nodes");
});

process.on("exit", () => {
  try { rmSync(tmpDir, { recursive: true }); } catch { /* best-effort */ }
});
