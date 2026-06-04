/**
 * @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
 * @cite seeds/citations/define-outcomes.md
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "gql-test-"));
process.env["KG_STORE_PATH"] = join(tmpDir, "kg.json");

const { registerGraphQL } = await import("./graphql-lane.js");
const { registerKnowledgeGraph } = await import("./knowledge-graph.js");

const handlers = new Map<string, Function>();
const mockServer = {
  tool: (name: string, _desc: string, _schema: unknown, handler: Function) =>
    handlers.set(name, handler),
};
registerGraphQL(mockServer as any);
registerKnowledgeGraph(mockServer as any);

const call = async (name: string, args: object) => {
  const result = await handlers.get(name)!(args);
  return JSON.parse(result.content[0].text);
};

test("kg_graphql_query: { graph } returns all entities", async () => {
  await call("kg_create_entities", {
    entities: [{ name: "gql-test-entity", type: "artifact", observations: [] }],
  });
  const r = await call("kg_graphql_query", { query: "{ graph { entities { name } } }" });
  assert.ok(Array.isArray(r.graph.entities), "entities array present");
  assert.ok(r.graph.entities.some((e: { name: string }) => e.name === "gql-test-entity"), "entity found");
});

test("kg_graphql_query: searchNodes returns matching entities", async () => {
  await call("kg_create_entities", {
    entities: [{ name: "search-target", type: "outcome", observations: ["unique-obs-xyz"] }],
  });
  const r = await call("kg_graphql_query", { query: '{ searchNodes(query: "unique-obs-xyz") { name } }' });
  assert.ok(Array.isArray(r.searchNodes), "searchNodes array");
  assert.ok(r.searchNodes.some((e: { name: string }) => e.name === "search-target"), "match found");
});

test("kg_graphql_query: node query returns entity and relations", async () => {
  await call("kg_create_entities", {
    entities: [
      { name: "node-a", type: "task", observations: [] },
      { name: "node-b", type: "task", observations: [] },
    ],
  });
  await call("kg_create_relations", {
    relations: [{ from: "node-a", relation: "depends-on", to: "node-b" }],
  });
  const r = await call("kg_graphql_query", { query: '{ node(name: "node-a") { name type } }' });
  assert.equal(r.node?.name, "node-a", "entity found");
  assert.ok(r.relations.some((rel: { from: string }) => rel.from === "node-a"), "relation found");
});

process.on("exit", () => {
  try { rmSync(tmpDir, { recursive: true }); } catch { /* best-effort */ }
});
