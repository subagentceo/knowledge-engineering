// src/agent/knowledge-agent/agent.test.ts
// @tdd green
//
// Pins the type-safe runner: it must validate structured_output through the
// Zod schema, surface SDK failure subtypes, and fill usage from the SDK result.
// Driven by a FAKE query() so the suite runs with no live API / no OAuth token.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { runKnowledgeTask, type QueryFn, type SdkMessage } from "./agent.js";
import { KNOWLEDGE_ANSWERER, NPM_RESEARCHER } from "./fleet.js";
import { KnowledgeAnswer, PackageReport } from "./schemas.js";

/** Build a fake query() that yields a single result message. */
function fakeQuery(messages: SdkMessage[]): QueryFn {
  return () =>
    (async function* () {
      for (const m of messages) yield m;
    })();
}

const GOOD_ANSWER = {
  kind: "KnowledgeAnswer",
  answer: "outputFormat sends a JSON Schema; the model's reply lands in result.structured_output.",
  claims: [
    { statement: "result.structured_output carries the validated object", citation: { source: "vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md", last_fetched: "2026-05-30" } },
  ],
  confidence: "high",
};

test("validates structured_output through the schema and returns a typed result", async () => {
  const runQuery = fakeQuery([
    { type: "assistant" },
    {
      type: "result",
      subtype: "success",
      structured_output: GOOD_ANSWER,
      total_cost_usd: 0.012,
      usage: { output_tokens: 300, input_tokens: 1200, cache_read_input_tokens: 1000 },
    },
  ]);

  const { result, usage } = await runKnowledgeTask({
    runQuery,
    spec: KNOWLEDGE_ANSWERER,
    schema: KnowledgeAnswer,
    prompt: "system prompt body",
    task: "explain structured outputs",
  });

  assert.equal(result.kind, "KnowledgeAnswer");
  assert.equal(result.confidence, "high");
  assert.equal(result.claims.length, 1);
  assert.equal(usage.outputTokens, 300);
  assert.equal(usage.cacheReadInputTokens, 1000);
  assert.equal(usage.costUsd, 0.012);
});

test("throws when structured_output violates the schema", async () => {
  const runQuery = fakeQuery([
    { type: "result", subtype: "success", structured_output: { kind: "KnowledgeAnswer", answer: "x", claims: [], confidence: "high" } },
  ]);
  await assert.rejects(
    runKnowledgeTask({ runQuery, spec: KNOWLEDGE_ANSWERER, schema: KnowledgeAnswer, prompt: "p", task: "t" }),
  );
});

test("surfaces the max-structured-output-retries failure subtype", async () => {
  const runQuery = fakeQuery([{ type: "result", subtype: "error_max_structured_output_retries" }]);
  await assert.rejects(
    runKnowledgeTask({ runQuery, spec: KNOWLEDGE_ANSWERER, schema: KnowledgeAnswer, prompt: "p", task: "t" }),
    /could not produce output matching the schema/,
  );
});

test("throws when the SDK returns no result message", async () => {
  const runQuery = fakeQuery([{ type: "assistant" }]);
  await assert.rejects(
    runKnowledgeTask({ runQuery, spec: KNOWLEDGE_ANSWERER, schema: KnowledgeAnswer, prompt: "p", task: "t" }),
    /produced no result message/,
  );
});

test("throws when outputFormat is ignored (no structured_output)", async () => {
  const runQuery = fakeQuery([{ type: "result", subtype: "success" }]);
  await assert.rejects(
    runKnowledgeTask({ runQuery, spec: KNOWLEDGE_ANSWERER, schema: KnowledgeAnswer, prompt: "p", task: "t" }),
    /returned no structured_output/,
  );
});

test("the runner forwards the agent's pinned outputFormat + model into options", async () => {
  let captured: { prompt: string; options: Record<string, unknown> } | null = null;
  const spy: QueryFn = (params) => {
    captured = params as typeof captured;
    return (async function* () {
      yield { type: "result", subtype: "success", structured_output: GOOD_ANSWER } as SdkMessage;
    })();
  };
  await runKnowledgeTask({ runQuery: spy, spec: KNOWLEDGE_ANSWERER, schema: KnowledgeAnswer, prompt: "p", task: "t" });
  assert.ok(captured);
  const opts = captured!.options as { outputFormat?: { type: string }; model?: string; effort?: string; agents?: Record<string, unknown> };
  assert.equal(opts.outputFormat?.type, "json_schema");
  assert.equal(opts.model, "claude-opus-4-8");
  assert.equal(opts.effort, "high");
  assert.ok(opts.agents && "knowledge-answerer" in opts.agents);
});

test("npm-researcher run validates a PackageReport", async () => {
  const runQuery = fakeQuery([
    {
      type: "result",
      subtype: "success",
      structured_output: {
        kind: "PackageReport",
        packageName: "@anthropic-ai/claude-agent-sdk",
        latestVersion: "0.2.138",
        recommendation: { useIt: true, rationale: "Canonical SDK for claude -p subagents." },
        citations: [{ source: "https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk", last_fetched: "2026-05-30" }],
      },
    },
  ]);
  const { result } = await runKnowledgeTask({ runQuery, spec: NPM_RESEARCHER, schema: PackageReport, prompt: "p", task: "t" });
  assert.equal(result.kind, "PackageReport");
  assert.equal(result.recommendation.useIt, true);
});
