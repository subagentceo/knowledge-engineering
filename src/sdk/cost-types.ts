/**
 * Shared cost record types and pure utilities.
 *
 * The OTel counter layer lives in apps/analytics-dashboard/cost/ and is only
 * needed by the analytics dashboard process. This file is the src/-internal
 * contract so MCP lanes and telemetry-client can import without crossing
 * the rootDir boundary.
 *
 * @cite apps/analytics-dashboard/cost/src/claude-cost-poller.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
 * @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */
import * as fs from "node:fs";
import * as readline from "node:readline";

const WORKSPACE_ID =
  process.env.WORKSPACE_ID ?? "wrkspc_01CBeWLBbjPFi6iqmBnnh3vs";
const ORGANIZATION_ID =
  process.env.ORGANIZATION_ID ?? "c38224f8-0e34-45c0-abee-739f89331d6a";
const COSTS_JSONL =
  process.env.COSTS_JSONL ?? "/tmp/agent-session-costs.jsonl";

// ---------------------------------------------------------------------------
// Canonical cost record — parity with Console /cost + /usage/cache + /usage
// ---------------------------------------------------------------------------
export interface AgentSessionCost {
  session_id: string;
  model: string;
  workspace_id: string;
  service_tier: "standard" | "batch" | "priority" | "flex";
  context_window: "0-200k" | "200k-1M";
  uncached_input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_5m_input_tokens: number;
  cache_creation_1h_input_tokens: number;
  cost_usd: number;
  model_usage?: Record<string, ModelCostBreakdown>;
  pr_number?: number;
  branch?: string;
  recorded_at?: string;
}

export interface ModelCostBreakdown {
  cost_usd: number;
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

export interface CacheEfficiencyMetrics {
  session_id: string;
  model: string;
  total_input_tokens: number;
  cache_read_tokens: number;
  cache_creation_tokens: number;
  cache_hit_rate: number;
  estimated_savings_usd: number;
}

// ---------------------------------------------------------------------------
// Pure compute functions — no OTel, no I/O
// ---------------------------------------------------------------------------
export function computeCacheEfficiency(cost: AgentSessionCost): CacheEfficiencyMetrics {
  const totalInput = cost.uncached_input_tokens + cost.cache_read_input_tokens;
  const cacheCreation = cost.cache_creation_5m_input_tokens + cost.cache_creation_1h_input_tokens;
  const hitRate = totalInput > 0
    ? (cost.cache_read_input_tokens / totalInput) * 100
    : 0;
  // Savings estimate uses input-only cost base (not total cost, which includes output).
  // Effective cost-units: uncached=1.0×, cache_read=0.1×, cache_creation=1.25×, output≈5×.
  // @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
  const cacheCreation2 = cost.cache_creation_5m_input_tokens + cost.cache_creation_1h_input_tokens;
  const effectiveInput = cost.uncached_input_tokens + cost.cache_read_input_tokens * 0.1 + cacheCreation2 * 1.25;
  const effectiveTotal = effectiveInput + cost.output_tokens * 5.0;
  const inputCostFraction = effectiveTotal > 0 ? effectiveInput / effectiveTotal : 0.5;
  const savingsUsd = cost.cache_read_input_tokens > 0 && effectiveInput > 0
    ? (cost.cost_usd * inputCostFraction * (cost.cache_read_input_tokens * 0.9 / effectiveInput))
    : 0;
  return {
    session_id: cost.session_id,
    model: cost.model,
    total_input_tokens: totalInput,
    cache_read_tokens: cost.cache_read_input_tokens,
    cache_creation_tokens: cacheCreation,
    cache_hit_rate: hitRate,
    estimated_savings_usd: savingsUsd,
  };
}

export function buildCostRecord(
  totalCostUsd: number,
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens?: number;
    cache_creation_input_tokens?: number;
  },
  sessionId: string,
  model: string,
  options?: {
    modelUsage?: Record<string, ModelCostBreakdown>;
    workspaceId?: string;
    serviceTier?: AgentSessionCost["service_tier"];
    contextWindow?: AgentSessionCost["context_window"];
    prNumber?: number;
    branch?: string;
  },
): AgentSessionCost {
  return {
    session_id: sessionId,
    model,
    workspace_id: options?.workspaceId ?? WORKSPACE_ID,
    service_tier: options?.serviceTier ?? "standard",
    context_window: options?.contextWindow ?? "0-200k",
    uncached_input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens ?? 0,
    cache_creation_5m_input_tokens: usage.cache_creation_input_tokens ?? 0,
    cache_creation_1h_input_tokens: 0,
    cost_usd: totalCostUsd,
    ...(options?.modelUsage !== undefined && { model_usage: options.modelUsage }),
    ...(options?.prNumber !== undefined && { pr_number: options.prNumber }),
    ...(options?.branch !== undefined && { branch: options.branch }),
  };
}

/**
 * Append a cost record to COSTS_JSONL.
 * OTel metric emissions happen separately in the analytics dashboard process
 * when it reads the JSONL via replayCostsFromJSONL. The MCP bridge lane does
 * not need to link the OTel SDK.
 */
export function recordSessionCost(
  cost: AgentSessionCost,
  costsJsonl = COSTS_JSONL,
): void {
  const record: AgentSessionCost = { ...cost, recorded_at: new Date().toISOString() };
  fs.appendFileSync(costsJsonl, JSON.stringify(record) + "\n");
}

export async function replayCostsFromJSONL(path: string): Promise<AgentSessionCost[]> {
  if (!fs.existsSync(path)) return [];
  const rl = readline.createInterface({ input: fs.createReadStream(path) });
  const records: AgentSessionCost[] = [];
  try {
    for await (const line of rl) {
      if (!line.trim()) continue;
      try { records.push(JSON.parse(line) as AgentSessionCost); } catch { /* skip malformed */ }
    }
  } finally {
    rl.close(); // release the fd so the process can exit naturally
  }
  return records;
}

// ---------------------------------------------------------------------------
// sdkOtelEnv — org-scoped env for Agent SDK subprocess.
// @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
// ---------------------------------------------------------------------------
export const sdkOtelEnv: Record<string, string> = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: "1",
  OTEL_METRICS_EXPORTER: "otlp",
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_LOGS_EXPORTER: "otlp",
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_ENDPOINT:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318",
  OTEL_METRIC_EXPORT_INTERVAL: "15000",
  OTEL_SERVICE_NAME: "knowledge-engineering-agent",
  OTEL_RESOURCE_ATTRIBUTES: [
    `organization.id=${ORGANIZATION_ID}`,
    `workspace.id=${WORKSPACE_ID}`,
  ].join(","),
};
