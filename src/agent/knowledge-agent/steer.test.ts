// src/agent/knowledge-agent/steer.test.ts
// @tdd green
//
// Pins the self-steering loop: DAG readiness, verifier-fail retry, budget gate,
// max-attempts failure, and dependency ordering. Driven by a SCRIPTED fake
// query() (a queue of SDK result messages consumed in dispatch order) so the
// whole loop runs with no live API / no OAuth token.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { steerKnowledgeLoop, type VerifiedTask } from "./steer.js";
import { knowledgeSpecFor } from "./fleet.js";
import type { QueryFn, SdkMessage } from "./agent.js";
import type { TaskEnvelope } from "../corpus-viewer/primitives.js";

// ── scripted fake query() ────────────────────────────────────────────────
// Each call shifts the next message off the queue. A test enqueues exactly the
// sequence of (producer, verifier, producer-retry, verifier, ...) results the
// loop will request, in dispatch order.

function scriptedQuery(queue: SdkMessage[]): { fn: QueryFn; calls: () => number } {
  let n = 0;
  const fn: QueryFn = () => {
    const msg = queue.shift();
    if (!msg) throw new Error(`scriptedQuery exhausted at call ${n + 1}`);
    n += 1;
    return (async function* () {
      yield msg;
    })();
  };
  return { fn, calls: () => n };
}

function ok(structured: unknown, costUsd = 0.01): SdkMessage {
  return { type: "result", subtype: "success", structured_output: structured, total_cost_usd: costUsd, usage: { output_tokens: 100 } };
}

const answer = (text: string) => ({
  kind: "KnowledgeAnswer",
  answer: text,
  claims: [{ statement: text, citation: { source: "vendor/x.md", last_fetched: "2026-05-30" } }],
  confidence: "high",
});

const verdict = (v: "pass" | "fail" | "warn", crit = "cited") => ({
  kind: "VerifyVerdict",
  verdict: v,
  rubric: [{ criterion: crit, met: v === "pass", evidence: v === "pass" ? "all claims cited" : "missing citation" }],
});

// Helper: a producer/verifier VerifiedTask pair over the real fleet specs.
function pair(id: string, blockedBy: string[] = []): VerifiedTask {
  const produce: TaskEnvelope = {
    id,
    content: `produce ${id}`,
    activeForm: `producing ${id}`,
    subagent: "knowledge-answerer",
    status: "pending",
    input: {},
    outputSchemaRef: "KnowledgeAnswer",
    blockedBy,
    citations: [],
  };
  const verify: TaskEnvelope = {
    id: `${id}-verify`,
    content: `verify ${id}`,
    activeForm: `verifying ${id}`,
    subagent: "answer-verifier",
    status: "pending",
    input: {},
    outputSchemaRef: "VerifyVerdict",
    blockedBy: [],
    citations: [],
  };
  return { produce, verify };
}

const common = { specFor: knowledgeSpecFor, seedFor: (n: string) => `seed ${n}`, maxBudgetUsd: 100 };

// ── THE KEY TEST ─────────────────────────────────────────────────────────

test("loop re-dispatches the producer when the verifier returns fail, then succeeds on retry", async () => {
  const { fn, calls } = scriptedQuery([
    ok(answer("first try")), // produce attempt 1
    ok(verdict("fail")), //     verify -> fail
    ok(answer("better try")), // produce attempt 2 (retry)
    ok(verdict("pass")), //     verify -> pass
  ]);

  const steps: string[] = [];
  const res = await steerKnowledgeLoop({ ...common, runQuery: fn, tasks: [pair("t1")], onStep: (m) => steps.push(m) });

  assert.equal(res.attempts["t1"], 2, "producer ran twice (retry after fail)");
  assert.equal(res.stopReason, "all-done");
  assert.equal(res.completed.length, 1);
  assert.equal(res.failed.length, 0);
  assert.equal(calls(), 4, "produce+verify, then retry produce+verify");
  // The retry prompt carried the failing rubric back in.
  assert.ok(steps.some((s) => s.includes("retrying")), "loop logged a retry");
});

// ── budget gate ──────────────────────────────────────────────────────────

test("loop stops when cumulative cost would exceed maxBudgetUsd", async () => {
  const { fn } = scriptedQuery([
    ok(answer("a"), 0.6), // produce: 0.6
    ok(verdict("pass"), 0.6), // verify: cumulative 1.2 > budget 1.0
  ]);
  const res = await steerKnowledgeLoop({ ...common, maxBudgetUsd: 1.0, runQuery: fn, tasks: [pair("a"), pair("b")] });
  assert.equal(res.stopReason, "budget");
  assert.ok(res.totalCostUsd >= 1.0);
  // 'b' never dispatched — budget tripped after 'a's verify.
  assert.equal(res.attempts["b"], undefined);
});

// ── max-attempts failure ─────────────────────────────────────────────────

test("loop marks a task failed after exhausting maxAttemptsPerTask", async () => {
  const { fn } = scriptedQuery([
    ok(answer("try1")),
    ok(verdict("fail")),
    ok(answer("try2")),
    ok(verdict("fail")), // second fail at maxAttempts=2 -> failed
  ]);
  const res = await steerKnowledgeLoop({ ...common, maxAttemptsPerTask: 2, runQuery: fn, tasks: [pair("t1")] });
  assert.equal(res.stopReason, "max-attempts");
  assert.deepEqual(res.failed, ["t1"]);
  assert.equal(res.attempts["t1"], 2);
  assert.equal(res.completed.length, 0);
});

// ── dependency ordering ──────────────────────────────────────────────────

test("a blocked task is never dispatched before its dependency is done", async () => {
  // t2 is blocked by t1. The loop must run t1 (produce+verify) fully before t2.
  const { fn } = scriptedQuery([
    ok(answer("t1")), //  t1 produce
    ok(verdict("pass")), // t1 verify -> done
    ok(answer("t2")), //  t2 produce (only now unblocked)
    ok(verdict("pass")), // t2 verify -> done
  ]);
  const order: string[] = [];
  const res = await steerKnowledgeLoop({
    ...common,
    runQuery: fn,
    tasks: [pair("t2", ["t1"]), pair("t1")], // t2 listed FIRST to prove ordering isn't list-order
    onStep: (m) => { if (m.startsWith("dispatch")) order.push(m); },
  });
  assert.equal(res.stopReason, "all-done");
  assert.equal(res.completed.length, 2);
  // First dispatch must be t1 (its dep-free), not t2.
  assert.ok(order[0]?.includes("t1") && !order[0]?.includes("t2"), `t1 first, got: ${order[0]}`);
});

// ── deadlock detection ───────────────────────────────────────────────────

test("loop reports deadlock when a task depends on an id not in the work list", async () => {
  const { fn } = scriptedQuery([]); // no dispatch should happen
  const res = await steerKnowledgeLoop({ ...common, runQuery: fn, tasks: [pair("t1", ["ghost"])] });
  assert.equal(res.stopReason, "deadlock");
  assert.equal(res.completed.length, 0);
});
