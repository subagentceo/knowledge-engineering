// check-agent-costs.ts — CI cost gate validator
//
// Validates agent-session-costs artifact attached to PRs.
// Accepts both JSON-array and JSONL (newline-delimited JSON) formats so the
// poller's appendFileSync output works without a manual conversion step.
//
// Usage:
//   npx tsx scripts/check-agent-costs.ts --artifact-path <path>
//   npx tsx scripts/check-agent-costs.ts --skip   (docs-only PRs)
//
// @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts  (AgentSessionCost)
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
// @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md

import { readFileSync, statSync } from "fs";

// Max artifact size: 10 MB. A legitimate cost file with thousands of sessions
// is still well under this; larger files indicate a zip-bomb or corrupt artifact.
const MAX_ARTIFACT_BYTES = 10 * 1024 * 1024;

// ---------------------------------------------------------------------------
// AgentSessionCost — parity with Console /cost + /usage/cache + /usage
//
// Admin API parity reference:
//   uncached_input_tokens        ← MessagesUsageReport.results.uncached_input_tokens
//   output_tokens                ← MessagesUsageReport.results.output_tokens
//   cache_read_input_tokens      ← MessagesUsageReport.results.cache_read_input_tokens
//   cache_creation_5m_input_tokens ← MessagesUsageReport.results.cache_creation.ephemeral_5m_input_tokens
//   cache_creation_1h_input_tokens ← MessagesUsageReport.results.cache_creation.ephemeral_1h_input_tokens
//   cost_usd                     ← CostReport.results.amount (USD) — SDK estimate
//   service_tier                 ← MessagesUsageReport.results.service_tier
//   context_window               ← MessagesUsageReport.results.context_window
// ---------------------------------------------------------------------------
export interface AgentSessionCost {
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
  model_usage?: Record<string, ModelUsageEntry>;

  // CI metadata
  pr_number?: number;
  branch?: string;
  recorded_at?: string;
}

export interface ModelUsageEntry {
  cost_usd: number;
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

const REQUIRED: (keyof AgentSessionCost)[] = [
  "session_id", "model", "workspace_id", "service_tier", "context_window",
  "uncached_input_tokens", "output_tokens", "cache_read_input_tokens",
  "cache_creation_5m_input_tokens", "cache_creation_1h_input_tokens", "cost_usd",
];

const NUM_FIELDS: (keyof AgentSessionCost)[] = [
  "uncached_input_tokens", "output_tokens", "cache_read_input_tokens",
  "cache_creation_5m_input_tokens", "cache_creation_1h_input_tokens", "cost_usd",
];

const MODEL_USAGE_NUM_FIELDS: (keyof ModelUsageEntry)[] = [
  "cost_usd", "input_tokens", "output_tokens",
  "cache_read_input_tokens", "cache_creation_input_tokens",
];

const VALID_SERVICE_TIERS = new Set(["standard", "batch", "priority", "flex"]);
const VALID_CONTEXT_WINDOWS = new Set(["0-200k", "200k-1M"]);

// ---------------------------------------------------------------------------
// parseArtifact — accepts JSON array OR JSONL (one object per line).
// The cost poller writes JSONL; this lets both formats pass without conversion.
// ---------------------------------------------------------------------------
export function parseArtifact(raw: string): unknown[] {
  const trimmed = raw.trim();

  // JSON array
  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) throw new Error("Expected JSON array at root");
    return parsed;
  }

  // JSONL: split on newlines, parse each non-empty line
  const lines = trimmed.split("\n").filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  // Validate first line is a JSON object before committing to JSONL path
  const first = JSON.parse(lines[0]);
  if (typeof first !== "object" || first === null || Array.isArray(first)) {
    throw new Error("JSONL: each line must be a JSON object");
  }

  return lines.map((line, i) => {
    try {
      return JSON.parse(line);
    } catch (err) {
      throw new Error(`JSONL line ${i + 1}: ${err}`);
    }
  });
}

// ---------------------------------------------------------------------------
// validateEntry — validates top-level session AND model_usage sub-entries.
// Avoids double-reporting: numeric check only runs when the field is present.
// ---------------------------------------------------------------------------
export function validateEntry(entry: unknown, i: number): entry is AgentSessionCost {
  if (typeof entry !== "object" || entry === null) {
    console.error(`Entry ${i}: not an object`);
    return false;
  }
  const obj = entry as Record<string, unknown>;
  let ok = true;

  const missing = new Set<string>();
  for (const f of REQUIRED) {
    if (!(f in obj)) {
      console.error(`Entry ${i}: missing '${f}'`);
      ok = false;
      missing.add(f);
    }
  }

  // Only run numeric check for present fields to avoid duplicate errors
  for (const f of NUM_FIELDS) {
    if (missing.has(f)) continue;
    if (typeof obj[f] !== "number" || (obj[f] as number) < 0) {
      console.error(`Entry ${i}: '${f}' must be a non-negative number, got ${JSON.stringify(obj[f])}`);
      ok = false;
    }
  }

  if (!missing.has("service_tier") && !VALID_SERVICE_TIERS.has(obj.service_tier as string)) {
    console.error(`Entry ${i}: service_tier must be one of: ${[...VALID_SERVICE_TIERS].join(", ")}`);
    ok = false;
  }
  if (!missing.has("context_window") && !VALID_CONTEXT_WINDOWS.has(obj.context_window as string)) {
    console.error(`Entry ${i}: context_window must be one of: ${[...VALID_CONTEXT_WINDOWS].join(", ")}`);
    ok = false;
  }

  // Validate model_usage sub-entries so printSummary never hits undefined.toLocaleString()
  if ("model_usage" in obj && obj.model_usage !== undefined) {
    if (typeof obj.model_usage !== "object" || obj.model_usage === null) {
      console.error(`Entry ${i}: model_usage must be an object`);
      ok = false;
    } else {
      for (const [model, mu] of Object.entries(obj.model_usage as Record<string, unknown>)) {
        if (typeof mu !== "object" || mu === null) {
          console.error(`Entry ${i}: model_usage['${model}'] must be an object`);
          ok = false;
          continue;
        }
        const muObj = mu as Record<string, unknown>;
        for (const f of MODEL_USAGE_NUM_FIELDS) {
          if (typeof muObj[f] !== "number" || (muObj[f] as number) < 0) {
            console.error(`Entry ${i}: model_usage['${model}'].${f} must be a non-negative number`);
            ok = false;
          }
        }
      }
    }
  }

  return ok;
}

// ---------------------------------------------------------------------------
// estimateCacheSavings — input-token cost base only (not total session cost).
//
// Cache reads are billed at 0.1× uncached input price; the savings per
// cache-read token is 0.9× the uncached input price. Since we don't have
// per-model pricing, we estimate the input cost fraction from effective
// cost-unit weights (Claude Sonnet-class: output ≈ 5× input per token):
//
//   effectiveInput = uncached×1.0 + cacheRead×0.1 + cacheCreation×1.25
//   effectiveTotal = effectiveInput + output×5.0
//   inputCostFraction = effectiveInput / effectiveTotal
//   estSavings = totalCost × inputCostFraction × (cacheRead / effectiveInput) × 0.9
//
// The 5.0 output multiplier is a conservative Sonnet-class estimate; Opus
// is closer to 3.3×. The result is labelled "approximate" in the output.
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
// ---------------------------------------------------------------------------
export function estimateCacheSavings(sessions: AgentSessionCost[]): number {
  let totUnc = 0, totOut = 0, totCR = 0, totCC = 0, totCost = 0;
  for (const s of sessions) {
    totUnc += s.uncached_input_tokens;
    totOut += s.output_tokens;
    totCR += s.cache_read_input_tokens;
    totCC += s.cache_creation_5m_input_tokens + s.cache_creation_1h_input_tokens;
    totCost += s.cost_usd;
  }
  if (totCR === 0) return 0;

  // Effective cost-units (model-agnostic approximation, output ≈ 5× input)
  const effectiveInput = totUnc * 1.0 + totCR * 0.1 + totCC * 1.25;
  const effectiveTotal = effectiveInput + totOut * 5.0;
  const inputCostFraction = effectiveTotal > 0 ? effectiveInput / effectiveTotal : 0.5;
  const estInputCost = totCost * inputCostFraction;
  // Savings = (cache reads billed at 0.1× instead of 1.0×) × 0.9 price differential
  return effectiveInput > 0 ? estInputCost * (totCR * 0.9 / effectiveInput) : 0;
}

// ---------------------------------------------------------------------------
// Cache efficiency — per-session row display
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

  if (totCR > 0) {
    const estSavings = estimateCacheSavings(sessions);
    console.log(`\nApprox. cache savings: ~$${estSavings.toFixed(4)} USD`);
    console.log(`(cache reads at 0.1× input price; output tokens excluded from base — parity: /usage/cache)`);
  }

  console.log(`\nNote: cost_usd is a client-side SDK estimate. For authoritative billing,`);
  console.log(`use the Admin API cost_report endpoint (requires ANTHROPIC_ADMIN_KEY).\n`);
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

  const artifactPath = args[pathIdx + 1];

  // Guard against zip-bomb / oversized artifacts before reading into memory
  try {
    const { size } = statSync(artifactPath);
    if (size > MAX_ARTIFACT_BYTES) {
      console.error(`Artifact too large: ${size} bytes (max ${MAX_ARTIFACT_BYTES}). Possible zip-bomb.`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`Cannot stat artifact: ${err}`);
    process.exit(1);
  }

  let raw: string;
  try {
    raw = readFileSync(artifactPath, "utf8");
  } catch (err) {
    console.error(`Cannot read artifact: ${err}`);
    process.exit(1);
  }

  let sessions: unknown[];
  try {
    sessions = parseArtifact(raw);
  } catch (err) {
    console.error(`Invalid artifact format: ${err}`);
    console.error("Artifact must be a JSON array ([{...},...]) or JSONL (one object per line).");
    process.exit(1);
  }

  if (sessions.length === 0) {
    console.error("Artifact is empty — at least one session entry required.");
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

// Only run when executed directly, not when imported by tests
if (import.meta.url === new URL(process.argv[1], "file://").href) {
  main();
}
