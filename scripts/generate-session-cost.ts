// generate-session-cost.ts — deterministic agent-session-costs artifact generator.
//
// Produces a schema-valid AgentSessionCost JSON array for a PR head, derived
// entirely from git state, so the same (base, head) pair always yields the
// same artifact byte-for-byte:
//   output_tokens          ← Fable-5 token estimate of the diff the agent wrote
//   uncached_input_tokens  ← Fable-5 token estimate of the head-side bytes of
//                            every file the diff touches (what the agent read)
//   recorded_at            ← head commit timestamp (not wall clock)
//
// This is a deterministic *effort* lower bound, not Admin-API billing parity —
// cache traffic is unobservable offline and reported as 0.
//
// Usage:
//   npx tsx scripts/generate-session-cost.ts \
//     --base <sha> --head <sha> --session-id <id> [--pr-number N] [--branch B] \
//     --out agent-session-costs.json
//
// @cite seeds/citations/fable-5-pricing.md
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (AgentSessionCost schema)

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

import {
  FABLE_5_MODEL_ID,
  costUsd,
  estimateFable5Tokens,
  type Fable5Usage,
} from "../src/lib/fable5-pricing.js";

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    // Vendor crawl PRs can carry >64 MiB diffs (PR #465 hit 67 MB and
    // crashed the cost gate at the old 64 MiB cap).
    maxBuffer: 1024 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

function main() {
  const base = arg("base");
  const head = arg("head");
  const sessionId = arg("session-id");
  const out = arg("out") ?? "agent-session-costs.json";
  if (!base || !head || !sessionId) {
    console.error("Usage: generate-session-cost.ts --base <sha> --head <sha> --session-id <id> [--pr-number N] [--branch B] [--out F]");
    process.exit(1);
  }

  const diffBytes = Buffer.byteLength(git("diff", base, head), "utf8");

  let readBytes = 0;
  const touched = git("diff", "--name-only", base, head).split("\n").filter(Boolean);
  for (const f of touched) {
    try {
      readBytes += Buffer.byteLength(git("show", `${head}:${f}`), "utf8");
    } catch {
      // deleted at head — nothing to read on the head side
    }
  }

  const usage: Fable5Usage = {
    uncached_input_tokens: estimateFable5Tokens(readBytes),
    output_tokens: estimateFable5Tokens(diffBytes),
    cache_read_input_tokens: 0,
    cache_creation_5m_input_tokens: 0,
    cache_creation_1h_input_tokens: 0,
  };

  const prNumber = arg("pr-number");
  const entry = {
    session_id: sessionId,
    model: FABLE_5_MODEL_ID,
    workspace_id: "knowledge-engineering",
    service_tier: "standard",
    context_window: "200k-1M",
    ...usage,
    cost_usd: costUsd(usage),
    ...(prNumber ? { pr_number: Number(prNumber) } : {}),
    ...(arg("branch") ? { branch: arg("branch") } : {}),
    recorded_at: git("show", "-s", "--format=%cI", head).trim(),
  };

  writeFileSync(out, JSON.stringify([entry], null, 2) + "\n");
  console.log(`Wrote ${out}: ${usage.output_tokens} out / ${usage.uncached_input_tokens} in tokens → $${entry.cost_usd.toFixed(4)}`);
}

main();
