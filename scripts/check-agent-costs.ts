// check-agent-costs.ts — CI cost gate validator
//
// Validates agent-session-costs.json artifact attached to PRs.
// Schema parity with Console /cost + /usage/cache + /usage pages.
// All cost data sourced from Agent SDK ResultMessage — no Admin API required.
//
// Usage:
//   npx tsx scripts/check-agent-costs.ts --artifact-path <path>
//   npx tsx scripts/check-agent-costs.ts --skip   (docs-only PRs)
//
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (AgentSessionCost)
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
// @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md

import { readFileSync } from "fs";

// ---------------------------------------------------------------------------
// AgentSessionCost — parity with Console /cost + /usage/cache + /usage
//
// Maps to Admin API response fields for documentation purposes only —
// actual data comes from Agent SDK ResultMessage.total_cost_usd and
// ResultMessage.usage. The Admin API (ANTHROPIC_ADMIN_KEY) is NOT used.
//
// Admin API parity reference:
//   uncached_input_tokens        ← MessagesUsageReport.results.uncached_input_tokens
//   output_tokens                ← MessagesUsageReport.results.output_tokens
//   cache_read_input_tokens      ← MessagesUsageReport.results.cache_read_input_tokens
//   cache_creation_5m_input_tokens ← MessagesUsageReport.results.cache_creation.ephemeral_5m_input_tokens
//   cache_creation_1h_input_tokens ← MessagesUsageReport.results.cache_creation.ephemeral_1h_input_tokens
//   cost_usd                     ← CostReport.results.amount (USD) — SDK estimate, not authoritative
//   service_tier                 ← MessagesUsageReport.results.service_tier
//   context_window               ← MessagesUsageReport.results.context_window
// ---------------------------------------------------------------------------
interface AgentSessionCost {
  // identity
  session_id: string;
  model: string;
  workspace_id: string;
  service_tier: "standard" | "batch" | "priority" | "flex";
  context_window: "0-200k" | "200k-1M";

  // token counts (parity: MessagesUsageReport)
  uncached_input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;           // Console /usage/cache: cache reads
  cache_creation_5m_input_tokens: number;    // Console /usage/cache: 5m cache writes
  cache_creation_1h_input_tokens: number;    // Console /usage/cache: 1h cache writes

  // cost (parity: CostReport — SDK estimate, not authoritative billing)
  cost_usd: number;

  // per-model breakdown (parity: Console /cost model grouping)
  model_usage?: Record<string, {
    cost_usd: number;
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens: number;
    cache_creation_input_tokens: number;
  }>;

  // CI metadata
  pr_number?: number;
  branch?: string;
  recorded_at?: string;
}

// Required fields for CI gate pass
const REQUIRED: (keyof AgentSessionCost)[] = [
  "session_id", "model", "workspace_id", "service_tier", "context_window",
  "uncached_input_tokens", "output_tokens", "cache_read_input_tokens",
  "cache_creation_5m_input_tokens", "cache_creation_1h_input_tokens", "cost_usd",
];

const VALID_SERVICE_TIERS = new Set(["standard", "batch", "priority", "flex"]);
const VALID_CONTEXT_WINDOWS = new Set(["0-200k", "200k-1M"]);

function validateEntry(entry: unknown, i: number): entry is AgentSessionCost {
  if (typeof entry !== "object" || entry === null) {
    console.error(`Entry ${i}: not an object`);
    return false;
  }
  const obj = entry as Record<string, unknown>;
  let ok = true;

  for (const f of REQUIRED) {
    if (!(f in obj)) { console.error(`Entry ${i}: missing '${f}'`); ok = false; }
  }

  const numFields: (keyof AgentSessionCost)[] = [
    "uncached_input_tokens", "output_tokens", "cache_read_input_tokens",
    "cache_creation_5m_input_tokens", "cache_creation_1h_input_tokens", "cost_usd",
  ];
  for (const f of numFields) {
    if (typeof obj[f] !== "number" || (obj[f] as number) < 0) {
      console.error(`Entry ${i}: '${f}' must be a non-negative number`);
      ok = false;
    }
  }

  if (!VALID_SERVICE_TIERS.has(obj.service_tier as string)) {
    console.error(`Entry ${i}: service_tier must be one of: ${[...VALID_SERVICE_TIERS].join(", ")}`);
    ok = false;
  }
  if (!VALID_CONTEXT_WINDOWS.has(obj.context_window as string)) {
    console.error(`Entry ${i}: context_window must be one of: ${[...VALID_CONTEXT_WINDOWS].join(", ")}`);
    ok = false;
  }

  return ok;
}

// ---------------------------------------------------------------------------
// Cache efficiency summary — parity with Console /usage/cache view
// ---------------------------------------------------------------------------
function cacheEfficiency(s: AgentSessionCost) {
  const totalInput = s.uncached_input_tokens + s.cache_read_input_tokens;
  const hitRate = totalInput > 0 ? (s.cache_read_input_tokens / totalInput * 100) : 0;
  const cacheCreation = s.cache_creation_5m_input_tokens + s.cache_creation_1h_input_tokens;
  return { totalInput, hitRate, cacheCreation };
}

function printSummary(sessions: AgentSessionCost[]): void {
  const W = { id: 26, model: 22, unc: 10, out: 10, cr: 10, cc: 10, hit: 7, cost: 10 };
  const hr = Object.values(W).map(w => "-".repeat(w + 2)).map(s => `+${s}`).join("") + "+";

  const row = (id: string, model: string, unc: string, out: string,
               cr: string, cc: string, hit: string, cost: string) =>
    `| ${id.padEnd(W.id)} | ${model.padEnd(W.model)} | ${unc.padStart(W.unc)} |` +
    ` ${out.padStart(W.out)} | ${cr.padStart(W.cr)} | ${cc.padStart(W.cc)} |` +
    ` ${hit.padStart(W.hit)} | ${cost.padStart(W.cost)} |`;

  console.log("\n## Agent Session Cost Report (parity: Console /cost + /usage/cache + /usage)\n");
  console.log(hr);
  console.log(row("session_id", "model", "uncached_in", "output", "cache_read", "cache_write", "hit%", "cost_usd"));
  console.log(hr);

  let totUnc = 0, totOut = 0, totCR = 0, totCC = 0, totCost = 0;
  for (const s of sessions) {
    const { hitRate, cacheCreation } = cacheEfficiency(s);
    totUnc += s.uncached_input_tokens;
    totOut += s.output_tokens;
    totCR += s.cache_read_input_tokens;
    totCC += cacheCreation;
    totCost += s.cost_usd;
    console.log(row(
      s.session_id.slice(0, W.id),
      s.model.slice(0, W.model),
      s.uncached_input_tokens.toLocaleString(),
      s.output_tokens.toLocaleString(),
      s.cache_read_input_tokens.toLocaleString(),
      cacheCreation.toLocaleString(),
      `${hitRate.toFixed(1)}%`,
      `$${s.cost_usd.toFixed(4)}`,
    ));

    // per-model breakdown if present
    if (s.model_usage) {
      for (const [m, mu] of Object.entries(s.model_usage)) {
        console.log(row(
          `  └ ${m}`.slice(0, W.id),
          "",
          mu.input_tokens.toLocaleString(),
          mu.output_tokens.toLocaleString(),
          mu.cache_read_input_tokens.toLocaleString(),
          mu.cache_creation_input_tokens.toLocaleString(),
          "",
          `$${mu.cost_usd.toFixed(4)}`,
        ));
      }
    }
  }

  const totHit = (totUnc + totCR) > 0 ? (totCR / (totUnc + totCR) * 100) : 0;
  console.log(hr);
  console.log(row(
    `TOTAL (${sessions.length} sessions)`, "",
    totUnc.toLocaleString(), totOut.toLocaleString(),
    totCR.toLocaleString(), totCC.toLocaleString(),
    `${totHit.toFixed(1)}%`, `$${totCost.toFixed(4)}`,
  ));
  console.log(hr);

  // cache savings note
  if (totCR > 0) {
    const estSavings = totCost * (totCR / (totUnc + totCR)) * 0.9;
    console.log(`\nEstimated cache savings: ~$${estSavings.toFixed(4)} USD`);
    console.log(`(cache reads at 0.1x vs full input price — parity: /usage/cache efficiency view)`);
  }

  console.log(`\nNote: cost_usd is a client-side SDK estimate. For authoritative billing,`);
  console.log(`use the Admin API cost_report endpoint (requires ANTHROPIC_ADMIN_KEY — not available here).\n`);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);

  if (args.includes("--skip")) {
    console.log("Cost gate skipped (docs-only PR).");
    process.exit(0);
  }

  const pathIdx = args.indexOf("--artifact-path");
  if (pathIdx === -1 || !args[pathIdx + 1]) {
    console.error("Usage: check-agent-costs.ts --artifact-path <path> | --skip");
    process.exit(1);
  }

  let raw: string;
  try {
    raw = readFileSync(args[pathIdx + 1], "utf8");
  } catch (err) {
    console.error(`Cannot read artifact: ${err}`);
    process.exit(1);
  }

  let sessions: unknown[];
  try {
    sessions = JSON.parse(raw);
    if (!Array.isArray(sessions)) throw new Error("Expected JSON array");
  } catch (err) {
    console.error(`Invalid JSON: ${err}`);
    process.exit(1);
  }

  if (sessions.length === 0) {
    console.error("artifact is empty — at least one session entry required.");
    process.exit(1);
  }

  let allValid = true;
  for (let i = 0; i < sessions.length; i++) {
    if (!validateEntry(sessions[i], i)) allValid = false;
  }

  if (!allValid) {
    console.error("\nSchema validation failed. See above. Re-run your agent session and re-upload the artifact.");
    process.exit(1);
  }

  printSummary(sessions as AgentSessionCost[]);
}

main();
