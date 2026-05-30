// src/agent/corpus-viewer/runner.test.ts
// @tdd green
//
// Pins the SubagentSpec → AgentDefinition mapping (the SDK boundary).
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/overview.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { toAgentDefinition, toAgentsRecord, toThinkingConfig } from "./runner.js";
import { BUILD_VERIFIER, FLEET, IOS_BUNDLER, SWIFT_PORTER } from "./fleet.js";
import { SubagentSpec } from "./primitives.js";

test("toAgentDefinition pins model, effort, memory, maxTurns, tools", () => {
  const def = toAgentDefinition(SWIFT_PORTER, "PROMPT BODY");
  assert.equal(def.model, "claude-opus-4-8");
  assert.equal(def.effort, "high");
  assert.equal(def.memory, "project");
  assert.equal(def.maxTurns, SWIFT_PORTER.budget.maxTurns);
  assert.deepEqual(def.tools, SWIFT_PORTER.tools);
  assert.equal(def.prompt, "PROMPT BODY");
});

test("'inherit' model is omitted so the SDK uses the parent model", () => {
  const spec = SubagentSpec.parse({ ...SWIFT_PORTER, model: "inherit" });
  const def = toAgentDefinition(spec, "x");
  assert.equal("model" in def, false);
});

test("'none' memory is omitted so the SDK skips auto-loaded memory", () => {
  const spec = SubagentSpec.parse({ ...IOS_BUNDLER, memory: "none" });
  const def = toAgentDefinition(spec, "x");
  assert.equal("memory" in def, false);
});

test("the verifier maps to a read-only tool set (no Edit/Write)", () => {
  const def = toAgentDefinition(BUILD_VERIFIER, "x");
  assert.equal(def.tools?.includes("Edit"), false);
  assert.equal(def.tools?.includes("Bash"), true);
});

test("toAgentsRecord builds the full record and throws on a missing seed", () => {
  const rec = toAgentsRecord(FLEET, (name) => `seed for ${name}`);
  assert.equal(Object.keys(rec).length, 4);
  assert.equal(rec["swift-porter"]?.prompt, "seed for swift-porter");
  assert.throws(() => toAgentsRecord(FLEET, () => "   "), /no seed prompt/);
});

test("toThinkingConfig emits the SDK adaptive/disabled shapes", () => {
  assert.deepEqual(toThinkingConfig("adaptive"), { type: "adaptive" });
  assert.deepEqual(toThinkingConfig("disabled"), { type: "disabled" });
});
