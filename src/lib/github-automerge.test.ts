/**
 * Tests for src/lib/github/automerge.ts — pure classifier +
 * executor-injected auto-merge driver.
 *
 * Each assertion drives one decision branch (green / pending / failing
 * / no checks). The mock McpExecutor records every call so we can
 * assert the side-effect order (label first, then enable).
 *
 * @tdd green
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/typescript.md
 */
import {
  autoMergeIfGreen,
  classifyChecks,
  CheckRunSchema,
  MergeMethodSchema,
  type CheckRun,
  type McpExecutor,
} from "./github-automerge.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void | Promise<void>): void {
  try {
    const r = fn();
    if (r instanceof Promise) {
      r.then(
        () => {
          passed += 1;
          console.log(`  ✓ ${name}`);
        },
        (err) => {
          failed += 1;
          console.error(`  ✗ ${name}`);
          console.error(`    ${(err as Error).message}`);
        },
      );
    } else {
      passed += 1;
      console.log(`  ✓ ${name}`);
    }
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

async function acheck(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

interface ExecutorCall {
  method: "enableAutoMerge" | "applyLabels" | "getCheckRuns";
  args: unknown[];
}

function mockExecutor(runs: CheckRun[]): { executor: McpExecutor; calls: ExecutorCall[] } {
  const calls: ExecutorCall[] = [];
  const executor: McpExecutor = {
    async enableAutoMerge(prNumber, method) {
      calls.push({ method: "enableAutoMerge", args: [prNumber, method] });
    },
    async applyLabels(prNumber, labels) {
      calls.push({ method: "applyLabels", args: [prNumber, labels] });
    },
    async getCheckRuns(prNumber) {
      calls.push({ method: "getCheckRuns", args: [prNumber] });
      return runs;
    },
  };
  return { executor, calls };
}

console.log("automerge:");

// ────────────────────────────────────────────────────────────────────
// classifyChecks — pure

check("classifyChecks: empty runs → not ready, no check runs reason", () => {
  const r = classifyChecks([]);
  if (r.ready) throw new Error("empty was marked ready");
  if (!r.reason.includes("no check runs")) throw new Error(`reason=${r.reason}`);
});

check("classifyChecks: all completed+success → ready", () => {
  const r = classifyChecks([
    { id: 1, name: "verify", status: "completed", conclusion: "success" },
    { id: 2, name: "osv", status: "completed", conclusion: "success" },
  ]);
  if (!r.ready) throw new Error(`reason=${r.reason}`);
});

check("classifyChecks: skipped + success → ready (skipped is fine)", () => {
  const r = classifyChecks([
    { id: 1, name: "verify", status: "completed", conclusion: "success" },
    { id: 2, name: "schedule-job", status: "completed", conclusion: "skipped" },
  ]);
  if (!r.ready) throw new Error(`reason=${r.reason}`);
});

check("classifyChecks: any failure → not ready, failing[] populated", () => {
  const r = classifyChecks([
    { id: 1, name: "verify", status: "completed", conclusion: "success" },
    { id: 2, name: "osv", status: "completed", conclusion: "failure" },
  ]);
  if (r.ready) throw new Error("failure was marked ready");
  if (r.failing.length !== 1) throw new Error(`failing.length=${r.failing.length}`);
  if (r.failing[0] !== "osv") throw new Error(`failing[0]=${r.failing[0]}`);
});

check("classifyChecks: cancelled + timed_out + action_required all count as failing", () => {
  const r = classifyChecks([
    { id: 1, name: "a", status: "completed", conclusion: "cancelled" },
    { id: 2, name: "b", status: "completed", conclusion: "timed_out" },
    { id: 3, name: "c", status: "completed", conclusion: "action_required" },
  ]);
  if (r.failing.length !== 3) throw new Error(`failing.length=${r.failing.length}`);
});

check("classifyChecks: in_progress / queued → not ready, pending[] populated", () => {
  const r = classifyChecks([
    { id: 1, name: "verify", status: "in_progress" },
    { id: 2, name: "osv", status: "queued" },
  ]);
  if (r.ready) throw new Error("pending was marked ready");
  if (r.pending.length !== 2) throw new Error(`pending.length=${r.pending.length}`);
  if (!r.reason.includes("pending")) throw new Error(`reason=${r.reason}`);
});

check("classifyChecks: failing takes precedence over pending in reason", () => {
  const r = classifyChecks([
    { id: 1, name: "a", status: "in_progress" },
    { id: 2, name: "b", status: "completed", conclusion: "failure" },
  ]);
  if (!r.reason.includes("failing")) throw new Error(`reason=${r.reason}`);
});

// ────────────────────────────────────────────────────────────────────
// schemas

check("CheckRunSchema accepts a real github-mcp check_run shape", () => {
  CheckRunSchema.parse({ id: 1, name: "x", status: "completed", conclusion: "success" });
});

check("CheckRunSchema rejects an unknown status enum value", () => {
  const r = CheckRunSchema.safeParse({ id: 1, name: "x", status: "exploded" });
  if (r.success) throw new Error("bogus status accepted");
});

check("MergeMethodSchema accepts MERGE/SQUASH/REBASE only", () => {
  MergeMethodSchema.parse("SQUASH");
  MergeMethodSchema.parse("MERGE");
  MergeMethodSchema.parse("REBASE");
  const r = MergeMethodSchema.safeParse("FAST_FORWARD");
  if (r.success) throw new Error("bogus method accepted");
});

// ────────────────────────────────────────────────────────────────────
// autoMergeIfGreen — async, executor-injected

await acheck("autoMergeIfGreen: all green → label then enableAutoMerge in order", async () => {
  const { executor, calls } = mockExecutor([
    { id: 1, name: "verify", status: "completed", conclusion: "success" },
  ]);
  const r = await autoMergeIfGreen(executor, 42);
  if (r.action !== "queued") throw new Error(`action=${r.action}`);
  if (calls.length !== 3) throw new Error(`call count=${calls.length}`);
  if (calls[0]?.method !== "getCheckRuns") throw new Error("first call not getCheckRuns");
  if (calls[1]?.method !== "applyLabels") throw new Error("second call not applyLabels");
  if (calls[2]?.method !== "enableAutoMerge") throw new Error("third call not enableAutoMerge");
});

await acheck("autoMergeIfGreen: failing checks → action=skipped, no label or merge calls", async () => {
  const { executor, calls } = mockExecutor([
    { id: 1, name: "verify", status: "completed", conclusion: "failure" },
  ]);
  const r = await autoMergeIfGreen(executor, 99);
  if (r.action !== "skipped") throw new Error(`action=${r.action}`);
  if (r.action === "skipped" && !r.failing.includes("verify")) throw new Error("failing not surfaced");
  if (calls.some((c) => c.method === "applyLabels")) throw new Error("applyLabels leaked");
  if (calls.some((c) => c.method === "enableAutoMerge")) throw new Error("enableAutoMerge leaked");
});

await acheck("autoMergeIfGreen: pending checks → action=skipped with pending[] populated", async () => {
  const { executor } = mockExecutor([{ id: 1, name: "verify", status: "in_progress" }]);
  const r = await autoMergeIfGreen(executor, 100);
  if (r.action !== "skipped") throw new Error(`action=${r.action}`);
  if (r.action === "skipped" && r.pending.length !== 1) throw new Error("pending not surfaced");
});

await acheck("autoMergeIfGreen: custom label + method passed through", async () => {
  const { executor, calls } = mockExecutor([
    { id: 1, name: "verify", status: "completed", conclusion: "success" },
  ]);
  await autoMergeIfGreen(executor, 7, { label: "ship-it", mergeMethod: "REBASE" });
  const label = calls.find((c) => c.method === "applyLabels");
  if (!label || !Array.isArray(label.args[1]) || (label.args[1] as string[])[0] !== "ship-it") {
    throw new Error("custom label not applied");
  }
  const enable = calls.find((c) => c.method === "enableAutoMerge");
  if (!enable || enable.args[1] !== "REBASE") throw new Error("custom method not applied");
});

// give async tests a chance to resolve before we print the summary
await new Promise((r) => setImmediate(r));
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
