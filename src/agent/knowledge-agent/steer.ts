// src/agent/knowledge-agent/steer.ts
//
// steerKnowledgeLoop — the self-steering loop that turns the corpus-viewer
// planning vocabulary (TaskEnvelope DAG, invariants, verifier gate) into an
// EXECUTED loop over claude -p, instead of me (the outer model) being the loop.
//
// This is the gap-closer described in docs/reference/self-steering-abstraction.md:
// corpus-viewer models steering (budgets/gates/DAGs) but never calls query();
// knowledge-agent calls query() but only once (single-shot). This module wires
// them: the corpus-viewer DAG drives knowledge-agent's runKnowledgeTask, and the
// loop ITSELF decides the next task — re-dispatching a producer when its paired
// verifier returns `fail`, and stopping on a cost ceiling (the SDK's maxBudgetUsd
// lever, enforced here against KnowledgeRun.usage.costUsd).
//
// The steering decisions live in code, not in my head:
//   - readiness     : assertDependenciesSatisfied — a blocked task never runs
//                     before its deps are `done`.
//   - blast radius  : assertToolsAllowed + assertWithinBudget — a task can't use
//                     a tool or budget its subagent spec forbids.
//   - concurrency   : assertSinglyInProgressPerSubagent — one foreground task
//                     per subagent at a time.
//   - quality gate  : a producer task is only `done` after its verifier task
//                     returns pass/warn; on `fail` the producer RE-DISPATCHES
//                     (up to maxAttemptsPerTask), with the verifier's rubric fed
//                     back into the retry prompt.
//   - cost gate     : cumulative usage.costUsd; the loop stops before exceeding
//                     maxBudgetUsd (mirrors SDK Options.maxBudgetUsd).
//
// Pure orchestration over an injected QueryFn — unit-testable with a scripted
// fake query() (no live API), same pattern as agent.test.ts.
//
// Citations:
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/subagents.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/structured-outputs.md
//   @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md

import type { z } from "zod";
import {
  type TaskEnvelope,
  type SubagentSpec,
  assertDependenciesSatisfied,
  assertToolsAllowed,
  assertWithinBudget,
  assertSinglyInProgressPerSubagent,
} from "../corpus-viewer/primitives.js";
import { runKnowledgeTask, type QueryFn, type KnowledgeRun } from "./agent.js";
import { schemaFor, type VerifyVerdict } from "./schemas.js";

/**
 * The verifier gate for the knowledge lane. Unlike corpus-viewer's
 * buildVerifierGate (which takes corpus-viewer's VerifyResult), this gates on
 * the knowledge-agent's own VerifyVerdict. A `pass` always opens the gate;
 * `warn` opens it only when allowWarn (a non-blocking-criteria caller).
 */
export function knowledgeVerifierGate(v: VerifyVerdict, allowWarn = false): boolean {
  return v.verdict === "pass" || (allowWarn && v.verdict === "warn");
}

/**
 * A task that produces work and the verifier task that grades it. The loop
 * dispatches `produce`, then `verify`; on a failing verdict it re-dispatches
 * `produce` with the rubric fed back, up to maxAttemptsPerTask.
 */
export interface VerifiedTask {
  produce: TaskEnvelope;
  verify: TaskEnvelope;
}

export type StopReason =
  | "all-done"
  | "budget"
  | "max-attempts"
  | "deadlock"; // no ready task but work remains (unsatisfiable deps)

export interface SteerResult {
  completed: TaskEnvelope[];
  /** Final structured output per producer task id (last accepted attempt). */
  results: Record<string, unknown>;
  totalCostUsd: number;
  /** Producer dispatch count per task id (a retry increments this). */
  attempts: Record<string, number>;
  /** Producer task ids that exhausted maxAttemptsPerTask without a pass. */
  failed: string[];
  stopReason: StopReason;
}

export interface SteerArgs {
  runQuery: QueryFn;
  /** The work list: each producer paired with its verifier. */
  tasks: VerifiedTask[];
  /** Resolve a subagent spec by name (fleet lookup). */
  specFor: (name: string) => SubagentSpec;
  /** Resolve the system-prompt body for a subagent by name. */
  seedFor: (name: string) => string;
  /** Hard cumulative cost ceiling (USD). Mirrors SDK Options.maxBudgetUsd. */
  maxBudgetUsd: number;
  /** Max producer dispatches per task before it's marked failed. Default 2. */
  maxAttemptsPerTask?: number;
  /** MCP servers mounted for every dispatch. */
  mcpServers?: Record<string, unknown>;
  /** Optional progress sink (the loop's narration; not the model's). */
  onStep?: (msg: string) => void;
}

/** Build the producer's retry prompt, feeding the failing rubric back in. */
function retryPrompt(task: TaskEnvelope, verdict: VerifyVerdict, attempt: number): string {
  const unmet = verdict.rubric.filter((r) => !r.met).map((r) => `- ${r.criterion}: ${r.evidence}`);
  return [
    `Task ${task.id} (attempt ${attempt}): ${task.content}`,
    `Your previous answer was rejected by the verifier. Fix these unmet criteria:`,
    ...unmet,
  ].join("\n");
}

/**
 * Run the DAG to completion (or to a stop condition). The loop is deterministic:
 * given the same scripted query() it makes the same dispatch decisions.
 */
export async function steerKnowledgeLoop(args: SteerArgs): Promise<SteerResult> {
  const maxAttempts = args.maxAttemptsPerTask ?? 2;
  const note = args.onStep ?? (() => {});

  // Mutable working copies so we never mutate the caller's envelopes.
  const produce = new Map<string, TaskEnvelope>();
  const verifyFor = new Map<string, TaskEnvelope>();
  for (const vt of args.tasks) {
    produce.set(vt.produce.id, { ...vt.produce, status: "pending" });
    verifyFor.set(vt.produce.id, { ...vt.verify, status: "pending" });
  }

  const done = new Set<string>();
  const failed: string[] = [];
  const attempts: Record<string, number> = {};
  const results: Record<string, unknown> = {};
  const completed: TaskEnvelope[] = [];
  let totalCostUsd = 0;

  const dispatch = async <S extends z.ZodType>(
    task: TaskEnvelope,
    prompt: string,
  ): Promise<KnowledgeRun<z.infer<S>>> => {
    const spec = args.specFor(task.subagent);
    // Blast-radius invariants — enforced at dispatch, not assumed.
    assertToolsAllowed(spec, spec.tools);
    assertWithinBudget(spec, task);
    const schema = schemaFor(task.outputSchemaRef) as S;
    const run = await runKnowledgeTask<S>({
      runQuery: args.runQuery,
      spec,
      schema,
      prompt,
      task: prompt,
      ...(args.mcpServers ? { mcpServers: args.mcpServers } : {}),
    });
    totalCostUsd += run.usage.costUsd;
    return run;
  };

  // The steering loop. Each iteration: pick one ready producer, run it + its
  // verifier, gate, and either mark done or retry.
  for (;;) {
    if (totalCostUsd >= args.maxBudgetUsd) {
      note(`stop: budget ${totalCostUsd.toFixed(4)} >= ${args.maxBudgetUsd}`);
      return finalize("budget");
    }

    const pending = [...produce.values()].filter(
      (t) => !done.has(t.id) && !failed.includes(t.id),
    );
    if (pending.length === 0) return finalize("all-done");

    // Readiness: pick the first producer whose deps are all done.
    const ready = pending.find((t) => {
      try {
        assertDependenciesSatisfied({ ...t, status: "in_progress" }, done);
        return true;
      } catch {
        return false;
      }
    });
    if (!ready) {
      note(`stop: deadlock — ${pending.length} task(s) blocked by unsatisfiable deps`);
      return finalize("deadlock");
    }

    // Concurrency invariant: this producer is the only in-progress one for its
    // subagent (the loop is sequential, so this is a belt-and-suspenders check).
    const inProgressView: TaskEnvelope[] = [{ ...ready, status: "in_progress" }];
    assertSinglyInProgressPerSubagent(inProgressView);

    const attempt = (attempts[ready.id] ?? 0) + 1;
    attempts[ready.id] = attempt;
    const prompt =
      attempt === 1
        ? `Task ${ready.id}: ${ready.content}`
        : retryPrompt(ready, results[`${ready.id}::lastVerdict`] as VerifyVerdict, attempt);

    note(`dispatch ${ready.id} (attempt ${attempt}/${maxAttempts}) -> ${ready.subagent}`);
    const produced = await dispatch(ready, prompt);
    results[ready.id] = produced.result;

    if (totalCostUsd >= args.maxBudgetUsd) {
      note(`stop: budget after produce ${ready.id}`);
      return finalize("budget");
    }

    // Verify the producer's output.
    const verifyTask = verifyFor.get(ready.id)!;
    const verifyPrompt = [
      `Grade the output of task ${ready.id} against its acceptance criteria.`,
      `Output under review: ${JSON.stringify(produced.result)}`,
    ].join("\n");
    note(`verify ${ready.id} -> ${verifyTask.subagent}`);
    const verified = await dispatch({ ...verifyTask, content: verifyPrompt }, verifyPrompt);
    const verdict = verified.result as VerifyVerdict;
    results[`${ready.id}::lastVerdict`] = verdict;

    if (knowledgeVerifierGate(verdict)) {
      done.add(ready.id);
      completed.push({ ...ready, status: "done" });
      note(`pass ${ready.id} — done`);
      continue;
    }

    // Failing verdict: retry the producer if attempts remain, else fail it.
    if (attempt >= maxAttempts) {
      failed.push(ready.id);
      note(`fail ${ready.id} — exhausted ${maxAttempts} attempts`);
      if (failed.length > 0) return finalize("max-attempts");
    } else {
      note(`fail ${ready.id} — retrying (attempt ${attempt + 1})`);
      // loop again; attempts[ready.id] increments on next iteration
    }
  }

  function finalize(stopReason: StopReason): SteerResult {
    // Strip the internal ::lastVerdict bookkeeping keys from results.
    const cleanResults: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(results)) {
      if (!k.endsWith("::lastVerdict")) cleanResults[k] = v;
    }
    return { completed, results: cleanResults, totalCostUsd, attempts, failed, stopReason };
  }
}
