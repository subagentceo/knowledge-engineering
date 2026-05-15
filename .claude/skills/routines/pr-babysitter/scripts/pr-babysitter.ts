// .claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts
//
// PR babysitter routine. Mirrors Boris Cherny's "babysitting my PRs" pattern
// from the AI Ascent 2026 public talk: every N minutes, scan open
// automerge-labeled PRs and remediate CI failures.
//
// See SKILL.md in this directory for full citations and behavior contract.
//
// Usage:
//   tsx .claude/skills/routines/pr-babysitter/scripts/pr-babysitter.ts
//   tsx ... --dry-run    # list state, take no action
//   tsx ... --pr <num>   # focus a single PR

import { spawnSync } from "node:child_process";

const REPO = process.env.GH_REPO_FULL ?? "subagentceo/knowledge-engineering";
const LABEL = process.env.PR_BABYSITTER_LABEL ?? "automerge";
const MAX_RETRIES = Number(process.env.PR_BABYSITTER_MAX_RETRIES ?? "3");

interface PRStatusCheck {
  name: string;
  status: "QUEUED" | "IN_PROGRESS" | "COMPLETED" | "PENDING";
  conclusion?: "SUCCESS" | "FAILURE" | "CANCELLED" | "SKIPPED" | "NEUTRAL" | "TIMED_OUT";
  workflowName?: string;
}

interface OpenPR {
  number: number;
  title: string;
  headRefName: string;
  url: string;
  statusCheckRollup: PRStatusCheck[];
}

interface Args {
  dryRun: boolean;
  prNumber?: number;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dry-run") a.dryRun = true;
    else if (argv[i] === "--pr" && argv[i + 1]) a.prNumber = Number(argv[++i]);
  }
  return a;
}

function ghJson<T>(args: string[]): T {
  const r = spawnSync("gh", args, { stdio: ["ignore", "pipe", "inherit"] });
  if (r.status !== 0) {
    console.error(`[pr-babysitter] gh ${args.join(" ")} exit=${r.status}`);
    process.exit(1);
  }
  return JSON.parse(r.stdout?.toString() ?? "null") as T;
}

function listOpenPRs(prNumber?: number): OpenPR[] {
  const all = ghJson<OpenPR[]>([
    "pr",
    "list",
    "--repo",
    REPO,
    "--state",
    "open",
    "--label",
    LABEL,
    "--limit",
    "30",
    "--json",
    "number,title,headRefName,url,statusCheckRollup",
  ]);
  return prNumber ? all.filter((p) => p.number === prNumber) : all;
}

function classifyPRStatus(
  pr: OpenPR,
): { kind: "noop" | "all-success" | "pending" | "failure"; failedChecks: PRStatusCheck[] } {
  if (!pr.statusCheckRollup || pr.statusCheckRollup.length === 0) {
    return { kind: "pending", failedChecks: [] };
  }
  const failed = pr.statusCheckRollup.filter(
    (c) =>
      c.status === "COMPLETED" &&
      (c.conclusion === "FAILURE" || c.conclusion === "TIMED_OUT"),
  );
  if (failed.length > 0) {
    return { kind: "failure", failedChecks: failed };
  }
  const pending = pr.statusCheckRollup.filter(
    (c) => c.status === "QUEUED" || c.status === "IN_PROGRESS" || c.status === "PENDING",
  );
  if (pending.length > 0) {
    return { kind: "pending", failedChecks: [] };
  }
  const allSuccess = pr.statusCheckRollup.every(
    (c) =>
      c.status === "COMPLETED" &&
      (c.conclusion === "SUCCESS" ||
        c.conclusion === "SKIPPED" ||
        c.conclusion === "NEUTRAL"),
  );
  if (allSuccess) return { kind: "all-success", failedChecks: [] };
  return { kind: "noop", failedChecks: [] };
}

function classifyFailure(check: PRStatusCheck): string {
  const name = check.name.toLowerCase();
  if (name.includes("verify")) return "verify";
  if (name.includes("osv") || name.includes("scanner")) return "osv-scanner";
  if (name.includes("cloudflare") || name.includes("preview")) return "cloudflare-preview";
  if (name.includes("neon")) return "neon-branch";
  if (name.includes("copilot")) return "copilot";
  return "unknown";
}

function actOnFailure(pr: OpenPR, failed: PRStatusCheck[], dryRun: boolean): void {
  const classifications = failed.map((c) => `${c.name}=${classifyFailure(c)}`);
  console.log(
    `[pr-babysitter] PR #${pr.number} ${pr.headRefName}: ${failed.length} failed check(s): ${classifications.join(", ")}`,
  );
  if (dryRun) {
    console.log(`[pr-babysitter]   --dry-run: would dispatch ci-fixer subagent`);
    return;
  }
  console.log(
    `[pr-babysitter]   action: invoke ci-fixer subagent on PR #${pr.number} (see scripts/orchestrator/prompts/ci-fixer.md). MAX_RETRIES=${MAX_RETRIES}.`,
  );
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  console.log(
    `[pr-babysitter] scanning ${REPO} for open PRs with label="${LABEL}"${args.prNumber ? ` (filter: #${args.prNumber})` : ""}`,
  );

  const prs = listOpenPRs(args.prNumber);
  if (prs.length === 0) {
    console.log("[pr-babysitter] no open automerge PRs; nothing to do.");
    return;
  }

  const summary: Array<{ pr: number; status: string }> = [];

  for (const pr of prs) {
    const classified = classifyPRStatus(pr);
    summary.push({ pr: pr.number, status: classified.kind });
    if (classified.kind === "failure") {
      actOnFailure(pr, classified.failedChecks, args.dryRun);
    } else {
      console.log(
        `[pr-babysitter] PR #${pr.number} ${pr.headRefName}: ${classified.kind}`,
      );
    }
  }

  console.log("");
  console.log("[pr-babysitter] summary:", JSON.stringify(summary));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
