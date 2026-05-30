// src/agent/corpus-viewer/orchestration.test.ts
// @tdd green
//
// Pins turn/budget accounting, compaction, memory, and cache planning.
//
// Citations:
//   @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
//   @cite seeds/prompts/orchestrator.system.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  compact,
  DYNAMIC_BOUNDARY,
  InMemoryMemory,
  planCache,
  rememberDecision,
  TurnLedger,
} from "./orchestration.js";
import { SWIFT_PORTER, IOS_BUNDLER } from "./fleet.js";
import { TaskEnvelope } from "./primitives.js";

const budget = SWIFT_PORTER.budget;

test("TurnLedger reports stop reason when output budget is exhausted", () => {
  const led = new TurnLedger({ maxOutputTokens: 1000, compactAtInputTokens: 5000, maxTurns: 5 });
  led.record({ outputTokens: 600, inputTokens: 2000, cacheReadInputTokens: 1500 });
  assert.equal(led.stopReason(), "ok");
  led.record({ outputTokens: 600, inputTokens: 2000, cacheReadInputTokens: 1500 });
  assert.equal(led.stopReason(), "output-budget");
});

test("TurnLedger reports stop reason when turn cap is reached", () => {
  const led = new TurnLedger({ maxOutputTokens: 100000, compactAtInputTokens: 50000, maxTurns: 2 });
  led.record({ outputTokens: 10, inputTokens: 10, cacheReadInputTokens: 0 });
  assert.equal(led.turnsExhausted(), false);
  led.record({ outputTokens: 10, inputTokens: 10, cacheReadInputTokens: 0 });
  assert.equal(led.stopReason(), "turns");
});

test("shouldCompact fires when last input crosses the threshold", () => {
  const led = new TurnLedger({ maxOutputTokens: 100000, compactAtInputTokens: 1000, maxTurns: 10 });
  led.record({ outputTokens: 10, inputTokens: 500, cacheReadInputTokens: 0 });
  assert.equal(led.shouldCompact(), false);
  led.record({ outputTokens: 10, inputTokens: 1500, cacheReadInputTokens: 0 });
  assert.equal(led.shouldCompact(), true);
});

test("cacheHitRatio reflects cache-read share of input", () => {
  const led = new TurnLedger(budget);
  led.record({ outputTokens: 1, inputTokens: 1000, cacheReadInputTokens: 900 });
  assert.equal(led.cacheHitRatio(), 0.9);
});

test("compact preserves the structured result and cache across the boundary", () => {
  const res = compact(
    {
      lastOutput: {
        kind: "PortResult",
        by: "swift-porter",
        usage: { outputTokens: 1, cacheReadInputTokens: 0, cacheCreationInputTokens: 0 },
        truncated: false,
        changedFiles: [{ path: "x", summary: "y" }],
        builds: { macOS: true, iOS: false },
        citations: [],
        notes: "",
      },
      openNextSteps: ["fix iOS build"],
      discardedTurns: 7,
    },
    SWIFT_PORTER,
  );
  assert.match(res.summarySystemMessage, /discarded 7 intermediate turn/);
  assert.match(res.summarySystemMessage, /PortResult/);
  assert.match(res.summarySystemMessage, /open: fix iOS build/);
  assert.equal(res.cachePreserved, true); // policy default preserves cache
});

test("memory append is durable and capped to recent decisions", async () => {
  const mem = new InMemoryMemory();
  await rememberDecision(mem, "swift-porter", "chose CorpusSource enum over a protocol");
  const out = await rememberDecision(mem, "swift-porter", "gated HeadlessRenderer behind #if os(macOS)");
  assert.match(out, /CorpusSource enum/);
  assert.match(out, /HeadlessRenderer/);
  // cap keeps only the tail
  const long = "x".repeat(5000);
  const capped = await rememberDecision(mem, "doc-indexer", long, 100);
  assert.ok(capped.length <= 100);
});

test("planCache caches the stable prefix for design agents and includes the boundary", () => {
  const task = TaskEnvelope.parse({
    id: "t1",
    content: "Port CorpusScanner",
    activeForm: "Porting",
    subagent: "swift-porter",
    input: { file: "CorpusScanner.swift" },
    outputSchemaRef: "PortResult",
  });
  const plan = planCache(SWIFT_PORTER, "SYSTEM", "TEMPLATES", task);
  assert.match(plan.stablePrefix, /SYSTEM/);
  assert.match(plan.stablePrefix, /TEMPLATES/); // cacheSystemPrefix default true
  assert.equal(plan.boundaryMarker, DYNAMIC_BOUNDARY);
  assert.match(plan.dynamicSuffix, /CorpusScanner\.swift/);
  assert.equal(plan.toolDefinitionsCached, true);
});

test("planCache for the bundler still caches tool defs (cheap model, same caching)", () => {
  const task = TaskEnvelope.parse({
    id: "b1",
    content: "Bundle docker+xcode",
    activeForm: "Bundling",
    subagent: "ios-bundler",
    input: {},
    outputSchemaRef: "BundleResult",
  });
  const plan = planCache(IOS_BUNDLER, "SYS", "TPL", task);
  assert.equal(plan.toolDefinitionsCached, true);
});
