/**
 * Atomic test runner for all 5 cowork/ domain agents.
 * Reads each agent's mailbox and queue JSONL, finds completed tasks,
 * grades them against their evaluator.pass_if / evaluator.fail_if blocks,
 * and exits 0 (all pass) or 1 (any failure).
 *
 * Usage:
 *   npx tsx cowork/agents/tests/run-all.ts
 *   npx tsx cowork/agents/tests/run-all.ts --agent=design-agent
 *   npx tsx cowork/agents/tests/run-all.ts --task=<uuid>
 *
 * @cite cowork/agents/manifest.json
 * @cite cowork/agents/tests/contracts.ts   (AgentOutcome, evaluateOutcome)
 * @cite cowork/mcp/e2m-mcp/server.ts       (Envelope, TaskState)
 */

import * as fs   from "node:fs";
import * as path from "node:path";

// ── Config ────────────────────────────────────────────────────────────────────

const QUEUE_DIR   = path.join(process.cwd(), "cowork", "data", "queues");
const MAILBOX_DIR = path.join(process.cwd(), "cowork", "data", "mailbox");
const MANIFEST    = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "cowork", "agents", "manifest.json"), "utf8")
);

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith("--"))
    .map(a => a.slice(2).split("=") as [string, string])
);

// ── Types (inline minimal — avoids tsx import issues) ─────────────────────────

interface Envelope {
  id: string;
  state: string;
  queue: string;
  subject: string;
  evaluator?: { pass_if: string[]; fail_if: string[] };
  result?: Record<string, unknown>;
  error?: string;
  updated_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function readJsonl(filePath: string): Envelope[] {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, "utf8")
    .split("\n").filter(Boolean)
    .map(l => JSON.parse(l) as Envelope);
}

function collapseById(rows: Envelope[]): Envelope[] {
  const map = new Map<string, Envelope>();
  for (const row of rows) if (row.id) map.set(row.id, row);
  return [...map.values()];
}

function evaluate(task: Envelope): { pass: boolean; detail: string[] } {
  const detail: string[] = [];
  if (!task.evaluator) {
    detail.push("SKIP: no evaluator block");
    return { pass: true, detail };
  }

  const resultStr = JSON.stringify(task.result ?? {}).toLowerCase();
  const errorStr  = (task.error ?? "").toLowerCase();
  let failures = 0;

  for (const cond of task.evaluator.fail_if) {
    const kws = cond.toLowerCase().split(/\s+/).filter(k => k.length > 3);
    if (kws.some(k => resultStr.includes(k) || errorStr.includes(k))) {
      detail.push(`  ✗ FAIL_IF matched: "${cond}"`);
      failures++;
    }
  }

  for (const cond of task.evaluator.pass_if) {
    const kws = cond.toLowerCase().replace(/['"]/g, "").split(/\s+/)
      .filter(k => k.length > 2 && !["and","or","the","a","is","in","to","for"].includes(k));
    if (kws.every(k => resultStr.includes(k))) {
      detail.push(`  ✓ PASS_IF: "${cond}"`);
    } else {
      detail.push(`  ✗ PASS_IF not met: "${cond}" (result: ${resultStr.slice(0, 60)}...)`);
      failures++;
    }
  }

  return { pass: failures === 0, detail };
}

// ── Main ──────────────────────────────────────────────────────────────────────

const agents = args.agent
  ? MANIFEST.agents.filter((a: { id: string }) => a.id === args.agent)
  : MANIFEST.agents;

let totalPass = 0;
let totalFail = 0;
let totalSkip = 0;

console.log(`\n╔══ cowork/ agent test runner ══ ${new Date().toISOString()} ══╗\n`);

for (const agent of agents) {
  const queuePath = path.join(process.cwd(), agent.queue);
  const rows      = collapseById(readJsonl(queuePath));
  const tasks     = rows.filter(t =>
    t.state === "completed" &&
    (!args.task || t.id === args.task)
  );

  console.log(`▶ ${agent.id} (${agent.domain}) — ${tasks.length} completed tasks`);

  if (tasks.length === 0) {
    console.log(`  — no completed tasks to grade\n`);
    totalSkip++;
    continue;
  }

  for (const task of tasks) {
    const { pass, detail } = evaluate(task);
    const icon = pass ? "✓" : "✗";
    const label = pass ? "PASS" : "FAIL";
    console.log(`  ${icon} [${label}] ${task.subject.slice(0, 60)}`);
    if (!pass || process.env.VERBOSE) detail.forEach(d => console.log(`      ${d}`));
    pass ? totalPass++ : totalFail++;
  }
  console.log();
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`╚══ Results: ${totalPass} pass | ${totalFail} fail | ${totalSkip} skip ══╝\n`);

if (totalFail > 0) {
  console.error(`ATOMIC FAILURE: ${totalFail} task(s) did not meet evaluator criteria.`);
  process.exit(1);
}

process.exit(0);
