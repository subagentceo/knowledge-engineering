// .claude/skills/routines/ci-healer/scripts/ci-healer.ts
//
// CI-healer routine. Mirrors Boris Cherny's "keep CI healthy" pattern from
// the AI Ascent 2026 public talk: scan recently-failed workflow runs,
// distinguish flakies (rerun) from real failures (escalate to operator).
//
// See SKILL.md in this directory for full citations and behavior contract.
//
// Usage:
//   tsx .claude/skills/routines/ci-healer/scripts/ci-healer.ts
//   tsx ... --dry-run    # list + classify, take no action
//   tsx ... --limit <N>  # how many recent failed runs to inspect (default 20)

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";

const REPO = process.env.GH_REPO_FULL ?? "subagentceo/knowledge-engineering";
const STATE_PATH = join(homedir(), ".claude", "ci-healer-state.json");
const MAX_RERUNS_PER_DAY = Number(process.env.CI_HEALER_MAX_RERUNS ?? "3");

const FLAKE_HINTS = [
  "npm ci",
  "npm install",
  "Set up Node",
  "Fetch sources",
  "actions/cache",
  "flaky",
];

interface FailedRun {
  databaseId: number;
  name: string;
  status: string;
  conclusion: string;
  headBranch: string;
  headSha: string;
  createdAt: string;
  url: string;
}

interface State {
  reruns: Record<string, { count: number; lastAt: string }>;
}

interface Args {
  dryRun: boolean;
  limit: number;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { dryRun: false, limit: 20 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dry-run") a.dryRun = true;
    else if (argv[i] === "--limit" && argv[i + 1]) a.limit = Number(argv[++i]);
  }
  return a;
}

function loadState(): State {
  if (!existsSync(STATE_PATH)) return { reruns: {} };
  try {
    return JSON.parse(readFileSync(STATE_PATH, "utf8")) as State;
  } catch {
    return { reruns: {} };
  }
}

function saveState(state: State): void {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), { mode: 0o600 });
}

function ghJson<T>(args: string[]): T {
  const r = spawnSync("gh", args, { stdio: ["ignore", "pipe", "inherit"] });
  if (r.status !== 0) {
    console.error(`[ci-healer] gh ${args.join(" ")} exit=${r.status}`);
    process.exit(1);
  }
  return JSON.parse(r.stdout?.toString() ?? "null") as T;
}

function listFailedRuns(limit: number): FailedRun[] {
  return ghJson<FailedRun[]>([
    "run",
    "list",
    "--repo",
    REPO,
    "--status",
    "failure",
    "--limit",
    String(limit),
    "--json",
    "databaseId,name,status,conclusion,headBranch,headSha,createdAt,url",
  ]);
}

function getFailingStepText(runId: number): string {
  const r = spawnSync(
    "bash",
    [
      "-c",
      `gh run view --repo ${REPO} --log-failed ${runId} 2>/dev/null | head -40`,
    ],
    { stdio: ["ignore", "pipe", "inherit"] },
  );
  return r.stdout?.toString() ?? "";
}

function classify(run: FailedRun): { kind: "flaky" | "real"; reason: string } {
  const log = getFailingStepText(run.databaseId);
  for (const hint of FLAKE_HINTS) {
    if (log.toLowerCase().includes(hint.toLowerCase())) {
      return { kind: "flaky", reason: `step matches flake hint: "${hint}"` };
    }
  }
  return { kind: "real", reason: "no flake-hint match; treating as real failure" };
}

function rerunIfBudget(run: FailedRun, state: State, dryRun: boolean): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const key = `${run.databaseId}-${today}`;
  const entry = state.reruns[key] ?? { count: 0, lastAt: "" };
  if (entry.count >= MAX_RERUNS_PER_DAY) {
    console.log(
      `[ci-healer]   skip: run ${run.databaseId} has hit ${MAX_RERUNS_PER_DAY} reruns today`,
    );
    return false;
  }
  if (dryRun) {
    console.log(
      `[ci-healer]   --dry-run: would rerun ${run.databaseId} (current count: ${entry.count})`,
    );
    return false;
  }
  const r = spawnSync(
    "gh",
    ["run", "rerun", "--repo", REPO, "--failed", String(run.databaseId)],
    { stdio: ["ignore", "inherit", "inherit"] },
  );
  if (r.status !== 0) {
    console.error(`[ci-healer]   rerun failed exit=${r.status}`);
    return false;
  }
  entry.count += 1;
  entry.lastAt = new Date().toISOString();
  state.reruns[key] = entry;
  saveState(state);
  console.log(
    `[ci-healer]   rerun triggered for ${run.databaseId} (count now ${entry.count})`,
  );
  return true;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  console.log(
    `[ci-healer] scanning ${REPO} for recent failed runs (limit=${args.limit})`,
  );

  const failed = listFailedRuns(args.limit);
  if (failed.length === 0) {
    console.log("[ci-healer] no recent failed runs; CI is healthy.");
    return;
  }
  console.log(`[ci-healer] ${failed.length} failed run(s) found.`);

  const state = loadState();
  const summary: Array<{ run: number; workflow: string; kind: string; action: string }> = [];

  for (const run of failed) {
    const c = classify(run);
    let action = "logged";
    if (c.kind === "flaky") {
      const did = rerunIfBudget(run, state, args.dryRun);
      action = did ? "rerun" : args.dryRun ? "rerun-dry" : "rerun-skipped";
    } else {
      action = args.dryRun
        ? "real-dry"
        : "real-escalated (would open issue with kind:ci-fix-needed)";
    }
    console.log(
      `[ci-healer] run ${run.databaseId} workflow="${run.name}" head=${run.headBranch} → ${c.kind} (${c.reason}) → ${action}`,
    );
    summary.push({
      run: run.databaseId,
      workflow: run.name,
      kind: c.kind,
      action,
    });
  }

  console.log("");
  console.log("[ci-healer] summary:", JSON.stringify(summary));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
