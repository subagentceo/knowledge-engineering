// src/agent/knowledge-agent/fleet.test.ts
// @tdd green
//
// Pins the knowledge-agent fleet: model routing, read-only verifier, npm tools,
// and that every agent maps to a known structured-output schema.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  AGENT_OUTPUT_SCHEMA,
  ANSWER_VERIFIER,
  KNOWLEDGE_ANSWERER,
  KNOWLEDGE_FLEET,
  NPM_RESEARCHER,
  knowledgeSpecFor,
} from "./fleet.js";
import { KNOWLEDGE_SCHEMAS } from "./schemas.js";

test("the fleet has three agents with distinct names", () => {
  const names = KNOWLEDGE_FLEET.map((s) => s.name);
  assert.deepEqual(new Set(names).size, 3);
});

test("model routing: opus for reasoning lanes, haiku for the mechanical npm lane", () => {
  assert.equal(KNOWLEDGE_ANSWERER.model, "claude-opus-4-8");
  assert.equal(ANSWER_VERIFIER.model, "claude-opus-4-8");
  assert.equal(NPM_RESEARCHER.model, "claude-haiku-4-5-20251001");
  assert.equal(NPM_RESEARCHER.thinking, "disabled");
  assert.equal(KNOWLEDGE_ANSWERER.thinking, "adaptive");
});

test("the verifier has read-only tools (no Edit/Write) and no npm tools", () => {
  assert.equal(ANSWER_VERIFIER.tools.includes("Edit"), false);
  assert.equal(ANSWER_VERIFIER.tools.includes("Write"), false);
  assert.equal(ANSWER_VERIFIER.tools.some((t) => t.includes("npm-registry")), false);
});

test("npm-researcher uses exactly the four npm-registry MCP tools", () => {
  assert.equal(NPM_RESEARCHER.tools.length, 4);
  assert.ok(NPM_RESEARCHER.tools.every((t) => t.startsWith("mcp__npm-registry__")));
});

test("every agent maps to a real structured-output schema", () => {
  for (const spec of KNOWLEDGE_FLEET) {
    const schemaName = AGENT_OUTPUT_SCHEMA[spec.name];
    assert.ok(schemaName, `no schema mapped for ${spec.name}`);
    assert.ok(schemaName in KNOWLEDGE_SCHEMAS, `${schemaName} not in KNOWLEDGE_SCHEMAS`);
  }
});

test("knowledgeSpecFor resolves and throws on unknown", () => {
  assert.equal(knowledgeSpecFor("knowledge-answerer"), KNOWLEDGE_ANSWERER);
  assert.throws(() => knowledgeSpecFor("nope"), /unknown agent/);
});
