/**
 * TDD suite for the agent-cost-gate pipeline.
 *
 * Covers the root-cause defects found in code review:
 *   1. JSONL vs JSON-array format (parser must handle both)
 *   2. Field-name correctness (uncached_input_tokens, output_tokens)
 *   3. Cache savings formula (input-only cost base, not total cost)
 *   4. model_usage validation (sub-entries validated, not just top level)
 *   5. computeCacheEfficiency denominator correctness
 *   6. buildCostRecord SDK-field mapping (input_tokens = uncached portion)
 *
 * @tdd green
 * @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 * @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
 */

import {
  computeCacheEfficiency,
  buildCostRecord,
  type AgentSessionCost,
} from "../sdk/cost-types.js";
import { parseArtifact, validateEntry, estimateCacheSavings } from "../../scripts/check-agent-costs.js";

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
  }
}

function assertEqual<T>(actual: T, expected: T, msg?: string): void {
  if (actual !== expected) {
    throw new Error(`${msg ?? "assertEqual"}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`);
  }
}

function assertClose(actual: number, expected: number, delta = 0.001, msg?: string): void {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`${msg ?? "assertClose"}: got ${actual}, want ${expected} ±${delta}`);
  }
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const VALID_SESSION: AgentSessionCost = {
  session_id: "sess_test001",
  model: "claude-opus-4-8",
  workspace_id: "wrkspc_test",
  service_tier: "standard",
  context_window: "0-200k",
  uncached_input_tokens: 1000,
  output_tokens: 200,
  cache_read_input_tokens: 500,
  cache_creation_5m_input_tokens: 100,
  cache_creation_1h_input_tokens: 50,
  cost_usd: 0.05,
};

const VALID_JSON_ARRAY = JSON.stringify([VALID_SESSION, { ...VALID_SESSION, session_id: "sess_002" }]);

const VALID_JSONL = [VALID_SESSION, { ...VALID_SESSION, session_id: "sess_002" }]
  .map(s => JSON.stringify(s))
  .join("\n") + "\n";

const SINGLE_JSONL = JSON.stringify(VALID_SESSION) + "\n";

// ---------------------------------------------------------------------------
// Section 1 — parseArtifact: handles both JSONL and JSON array
// ---------------------------------------------------------------------------
console.log("\nparseArtifact (JSONL + JSON-array format):");

check("JSON array with 2 sessions → 2 records", () => {
  const result = parseArtifact(VALID_JSON_ARRAY);
  assertEqual(result.length, 2);
  assertEqual(result[0].session_id, "sess_test001");
});

check("JSONL with 2 sessions → 2 records", () => {
  const result = parseArtifact(VALID_JSONL);
  assertEqual(result.length, 2);
  assertEqual(result[1].session_id, "sess_002");
});

check("single-line JSONL (no trailing object at root) → 1 record", () => {
  const result = parseArtifact(SINGLE_JSONL);
  assertEqual(result.length, 1);
  assertEqual(result[0].session_id, "sess_test001");
});

check("JSONL with blank lines between records → skips blanks", () => {
  const withBlanks = `${JSON.stringify(VALID_SESSION)}\n\n${JSON.stringify({ ...VALID_SESSION, session_id: "sess_003" })}\n`;
  const result = parseArtifact(withBlanks);
  assertEqual(result.length, 2);
});

check("empty input → empty array", () => {
  const result = parseArtifact("[]");
  assertEqual(result.length, 0);
});

check("invalid JSON → throws", () => {
  let threw = false;
  try { parseArtifact("not json at all"); } catch { threw = true; }
  if (!threw) throw new Error("expected throw on invalid JSON");
});

// ---------------------------------------------------------------------------
// Section 2 — validateEntry: field-name correctness
// ---------------------------------------------------------------------------
console.log("\nvalidateEntry (schema field names):");

check("valid entry with correct field names passes", () => {
  if (!validateEntry(VALID_SESSION, 0)) throw new Error("expected valid");
});

check("entry with tokens_input instead of uncached_input_tokens → fails", () => {
  const bad = { ...VALID_SESSION } as Record<string, unknown>;
  delete bad.uncached_input_tokens;
  (bad as Record<string, unknown>).tokens_input = 1000; // wrong name
  if (validateEntry(bad, 0)) throw new Error("expected invalid — wrong field name accepted");
});

check("entry with tokens_output instead of output_tokens → fails", () => {
  const bad = { ...VALID_SESSION } as Record<string, unknown>;
  delete bad.output_tokens;
  (bad as Record<string, unknown>).tokens_output = 200; // wrong name
  if (validateEntry(bad, 0)) throw new Error("expected invalid — wrong field name accepted");
});

check("entry with missing cost_usd → fails", () => {
  const bad = { ...VALID_SESSION } as Record<string, unknown>;
  delete bad.cost_usd;
  if (validateEntry(bad, 0)) throw new Error("expected invalid — missing cost_usd");
});

check("negative token count → fails", () => {
  const bad = { ...VALID_SESSION, uncached_input_tokens: -1 };
  if (validateEntry(bad, 0)) throw new Error("expected invalid — negative tokens");
});

check("invalid service_tier → fails", () => {
  const bad = { ...VALID_SESSION, service_tier: "premium" };
  if (validateEntry(bad, 0)) throw new Error("expected invalid — bad service_tier");
});

// Section 2b — model_usage sub-entry validation
console.log("\nvalidateEntry (model_usage sub-entries):");

check("model_usage with valid sub-entry passes", () => {
  const withUsage: AgentSessionCost = {
    ...VALID_SESSION,
    model_usage: {
      "claude-opus-4-8": {
        cost_usd: 0.04,
        input_tokens: 900,
        output_tokens: 180,
        cache_read_input_tokens: 450,
        cache_creation_input_tokens: 90,
      },
    },
  };
  if (!validateEntry(withUsage, 0)) throw new Error("expected valid");
});

check("model_usage with undefined input_tokens → fails", () => {
  const bad: Record<string, unknown> = {
    ...VALID_SESSION,
    model_usage: {
      "claude-opus-4-8": {
        cost_usd: 0.04,
        // input_tokens missing
        output_tokens: 180,
        cache_read_input_tokens: 450,
        cache_creation_input_tokens: 90,
      },
    },
  };
  if (validateEntry(bad, 0)) throw new Error("expected invalid — model_usage missing input_tokens");
});

check("model_usage with negative cost_usd → fails", () => {
  const bad: Record<string, unknown> = {
    ...VALID_SESSION,
    model_usage: {
      "claude-opus-4-8": {
        cost_usd: -0.01, // negative
        input_tokens: 900,
        output_tokens: 180,
        cache_read_input_tokens: 450,
        cache_creation_input_tokens: 90,
      },
    },
  };
  if (validateEntry(bad, 0)) throw new Error("expected invalid — negative model cost");
});

// ---------------------------------------------------------------------------
// Section 3 — estimateCacheSavings: input-only cost base
// ---------------------------------------------------------------------------
console.log("\nestimateCacheSavings (input-token cost base):");

check("savings = 0 when no cache reads", () => {
  const noCache: AgentSessionCost = { ...VALID_SESSION, cache_read_input_tokens: 0 };
  const savings = estimateCacheSavings([noCache]);
  assertEqual(savings, 0);
});

check("savings < total cost (output tokens are excluded from base)", () => {
  // Session with equal input and output cost weight: if formula used total cost
  // as base, savings would be ~half of total. With input-only base, it's less.
  const highOutput: AgentSessionCost = {
    ...VALID_SESSION,
    uncached_input_tokens: 100,
    output_tokens: 10000, // output dominates cost
    cache_read_input_tokens: 100,
    cost_usd: 1.00,
  };
  const savings = estimateCacheSavings([highOutput]);
  // If formula wrongly used total cost: savings ≈ 1.00 × 0.5 × 0.9 = 0.45
  // Correct (input-only base): savings must be << 0.45 because output dominates
  if (savings >= 0.40) throw new Error(`savings ${savings.toFixed(4)} too high — output cost leaked into base`);
  if (savings < 0) throw new Error(`negative savings: ${savings}`);
});

check("savings increases proportionally with more cache reads (same total cost)", () => {
  const low: AgentSessionCost = { ...VALID_SESSION, cache_read_input_tokens: 100, uncached_input_tokens: 900 };
  const high: AgentSessionCost = { ...VALID_SESSION, cache_read_input_tokens: 500, uncached_input_tokens: 500 };
  const savingsLow = estimateCacheSavings([low]);
  const savingsHigh = estimateCacheSavings([high]);
  if (savingsHigh <= savingsLow) throw new Error(`more cache reads should yield more savings: low=${savingsLow}, high=${savingsHigh}`);
});

// ---------------------------------------------------------------------------
// Section 4 — computeCacheEfficiency (from poller)
// ---------------------------------------------------------------------------
console.log("\ncomputeCacheEfficiency:");

check("hit rate = 0 when no cache reads", () => {
  const eff = computeCacheEfficiency({ ...VALID_SESSION, cache_read_input_tokens: 0 });
  assertEqual(eff.cache_hit_rate, 0);
});

check("hit rate = 100 when all tokens are cache reads", () => {
  const allCached: AgentSessionCost = {
    ...VALID_SESSION,
    uncached_input_tokens: 0,
    cache_read_input_tokens: 1000,
  };
  assertEqual(computeCacheEfficiency(allCached).cache_hit_rate, 100);
});

check("hit rate = 50% when reads = uncached", () => {
  const half: AgentSessionCost = {
    ...VALID_SESSION,
    uncached_input_tokens: 500,
    cache_read_input_tokens: 500,
  };
  assertClose(computeCacheEfficiency(half).cache_hit_rate, 50, 0.01);
});

check("cacheCreation = 5m + 1h combined", () => {
  const s: AgentSessionCost = {
    ...VALID_SESSION,
    cache_creation_5m_input_tokens: 100,
    cache_creation_1h_input_tokens: 50,
  };
  assertEqual(computeCacheEfficiency(s).cache_creation_tokens, 150);
});

check("totalInput = uncached + cache_read (not inflated by creation)", () => {
  const eff = computeCacheEfficiency(VALID_SESSION);
  assertEqual(eff.total_input_tokens, VALID_SESSION.uncached_input_tokens + VALID_SESSION.cache_read_input_tokens);
});

// ---------------------------------------------------------------------------
// Section 5 — buildCostRecord SDK-field mapping
// ---------------------------------------------------------------------------
console.log("\nbuildCostRecord (SDK field mapping):");

check("input_tokens maps to uncached_input_tokens (SDK: input_tokens = non-cached input)", () => {
  const rec = buildCostRecord(0.01, {
    input_tokens: 800,
    output_tokens: 100,
    cache_read_input_tokens: 200,
    cache_creation_input_tokens: 50,
  }, "sess_x", "claude-sonnet-4-6");
  assertEqual(rec.uncached_input_tokens, 800);
  assertEqual(rec.cache_read_input_tokens, 200);
});

check("cache_creation_input_tokens maps to 5m bucket (SDK does not split TTL)", () => {
  const rec = buildCostRecord(0.01, {
    input_tokens: 800,
    output_tokens: 100,
    cache_creation_input_tokens: 300,
  }, "sess_x", "claude-sonnet-4-6");
  assertEqual(rec.cache_creation_5m_input_tokens, 300);
  assertEqual(rec.cache_creation_1h_input_tokens, 0);
});

check("missing optional cache fields default to 0", () => {
  const rec = buildCostRecord(0.01, { input_tokens: 800, output_tokens: 100 },
    "sess_x", "claude-sonnet-4-6");
  assertEqual(rec.cache_read_input_tokens, 0);
  assertEqual(rec.cache_creation_5m_input_tokens, 0);
});

// ---------------------------------------------------------------------------
const status = failed === 0 ? "PASS" : "FAIL";
console.log(`\nagent-cost-gate: ${passed} passed, ${failed} failed — ${status}`);
if (failed > 0) process.exit(1);
