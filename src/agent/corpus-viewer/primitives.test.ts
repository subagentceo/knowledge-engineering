// src/agent/corpus-viewer/primitives.test.ts
// @tdd green
//
// Outcome-driven: these tests pin the Zod + boundary contract for the
// corpus-viewer build orchestrator. The citation targets are the SDK docs that
// define the AgentDefinition fields (model/effort/thinking/memory/budget) the
// schemas mirror — when those docs drift, citation-guard + freshness fail.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   @cite seeds/prompts/subagent-verifier.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  assertDependenciesSatisfied,
  assertSinglyInProgressPerSubagent,
  assertToolsAllowed,
  assertWithinBudget,
  SubagentSpec,
  TaskEnvelope,
  TokenBudget,
  Thinking,
  type SubagentSpec as Spec,
  type TaskEnvelope as Task,
} from "./primitives.js";

const ISO = "2026-05-30T00:00:00.000Z";

function spec(over: Partial<Spec> = {}): Spec {
  return SubagentSpec.parse({
    name: "swift-porter",
    description: "Ports Swift sources to dual-platform.",
    model: "claude-opus-4-8",
    effort: "high",
    thinking: "adaptive",
    budget: { maxOutputTokens: 16000, compactAtInputTokens: 120000, maxTurns: 12 },
    cache: {},
    memory: "project",
    tools: ["Read", "Edit", "Write"],
    ...over,
  });
}

function task(over: Partial<Task> = {}): Task {
  return TaskEnvelope.parse({
    id: "t1",
    content: "Port CorpusScanner to dual-platform",
    activeForm: "Porting CorpusScanner",
    subagent: "swift-porter",
    input: { file: "CorpusScanner.swift" },
    outputSchemaRef: "PortResult",
    ...over,
  });
}

test("CachePolicy defaults: caches system prefix, tool defs, and survives compaction", () => {
  const s = spec();
  assert.equal(s.cache.cacheSystemPrefix, true);
  assert.equal(s.cache.cacheToolDefinitions, true);
  assert.equal(s.cache.preserveCacheAcrossSystemMessages, true);
});

test("Thinking forbids the older fixed-budget mode (opus-4-8 is adaptive-only)", () => {
  assert.deepEqual(Thinking.options, ["adaptive", "disabled"]);
  assert.throws(() => Thinking.parse("enabled"));
});

test("TokenBudget rejects a compaction threshold that would thrash", () => {
  assert.throws(() =>
    TokenBudget.parse({ maxOutputTokens: 100000, compactAtInputTokens: 1000, maxTurns: 5 }),
  );
});

test("SubagentSpec rejects max-effort + thinking-disabled on opus-4-8 (wasteful)", () => {
  assert.throws(() => spec({ effort: "max", thinking: "disabled" }));
});

test("name must be kebab-case", () => {
  assert.throws(() => spec({ name: "SwiftPorter" }));
  assert.doesNotThrow(() => spec({ name: "ios-bundler" }));
});

test("assertToolsAllowed throws on a tool outside the subagent allowlist", () => {
  const s = spec({ tools: ["Read", "Edit"] });
  assert.throws(() => assertToolsAllowed(s, ["Read", "Bash"]), /not allowed tools: Bash/);
  assert.doesNotThrow(() => assertToolsAllowed(s, ["Read", "Edit"]));
});

test("assertWithinBudget refuses a task that exceeds the subagent ceiling", () => {
  const s = spec({ budget: { maxOutputTokens: 8000, compactAtInputTokens: 60000, maxTurns: 6 } });
  const over = task({
    budget: { maxOutputTokens: 50000, compactAtInputTokens: 60000, maxTurns: 6 },
  });
  assert.throws(() => assertWithinBudget(s, over), /caps at 8000/);
  // A per-task turn cap above the subagent's ceiling (but within the global
  // max of 50) is refused at the boundary, not at schema-construction time.
  const overTurns = task({
    budget: { maxOutputTokens: 8000, compactAtInputTokens: 60000, maxTurns: 40 },
  });
  assert.throws(() => assertWithinBudget(s, overTurns), /requests 40 turns; subagent 'swift-porter' caps at 6/);
  // And maxTurns above the global ceiling (50) is rejected by the schema itself:
  assert.throws(() =>
    TokenBudget.parse({ maxOutputTokens: 8000, compactAtInputTokens: 60000, maxTurns: 99 }),
  );
});

test("assertDependenciesSatisfied blocks in_progress before deps are done", () => {
  const t = task({ status: "in_progress", blockedBy: ["t0"] });
  assert.throws(() => assertDependenciesSatisfied(t, new Set()), /depends on unfinished: t0/);
  assert.doesNotThrow(() => assertDependenciesSatisfied(t, new Set(["t0"])));
  // pending/failed tasks are exempt (they haven't started)
  assert.doesNotThrow(() =>
    assertDependenciesSatisfied(task({ status: "pending", blockedBy: ["t0"] }), new Set()),
  );
});

test("assertSinglyInProgressPerSubagent allows fan-out across agents, not within one", () => {
  const ok = [
    task({ id: "a", subagent: "swift-porter", status: "in_progress" }),
    task({ id: "b", subagent: "doc-indexer", status: "in_progress" }),
  ];
  assert.doesNotThrow(() => assertSinglyInProgressPerSubagent(ok));

  const bad = [
    task({ id: "a", subagent: "swift-porter", status: "in_progress" }),
    task({ id: "b", subagent: "swift-porter", status: "in_progress" }),
  ];
  assert.throws(() => assertSinglyInProgressPerSubagent(bad), /only one foreground task per subagent/);
});

test("Citation requires an ISO datetime so freshness drift is detectable", () => {
  const good = task({ citations: [{ source: "vendor/xcode/...", last_fetched: ISO }] });
  assert.equal(good.citations[0]?.last_fetched, ISO);
  assert.throws(() => task({ citations: [{ source: "x", last_fetched: "yesterday" }] }));
});
