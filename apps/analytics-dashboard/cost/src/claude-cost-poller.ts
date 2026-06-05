// claude-cost-poller.ts
//
// Session cost aggregator for the Agent SDK telemetry pipeline.
// Source of truth: SDK ResultMessage.total_cost_usd + modelUsage per-model breakdown.
// No ANTHROPIC_ADMIN_KEY required — the Admin API is for billing reconciliation only.
//
// Parity targets (Console pages → SDK fields):
//   /cost             → total_cost_usd, per model cost_usd, token_type breakdown
//   /usage/cache      → cache_creation_5m_tokens, cache_creation_1h_tokens, cache_read_tokens
//   /usage            → uncached_input_tokens, output_tokens, service_tier, model, workspace_id
//
// How to wire into an Agent SDK session loop:
//   import { sdkOtelEnv, recordSessionCost } from "./claude-cost-poller.ts";
//   const result = await runAgentSession({ env: sdkOtelEnv });
//   recordSessionCost(buildCostRecord(result, sessionId, model));
//
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
// @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
// @cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md

import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { metrics } from "@opentelemetry/api";
import * as fs from "fs";
import * as readline from "readline";

const OTLP_ENDPOINT =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318";
const WORKSPACE_ID =
  process.env.WORKSPACE_ID ?? "wrkspc_01CBeWLBbjPFi6iqmBnnh3vs";
// Organization ID: standard OTel attribute organization.id on all metrics.
// @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md (standard attributes)
const ORGANIZATION_ID =
  process.env.ORGANIZATION_ID ?? "c38224f8-0e34-45c0-abee-739f89331d6a";
const COSTS_JSONL = process.env.COSTS_JSONL ?? "/tmp/agent-session-costs.jsonl";

// ---------------------------------------------------------------------------
// Canonical cost record — parity with Console /cost + /usage/cache + /usage
//
// All fields sourced from Agent SDK ResultMessage (no Admin API).
// token_type breakdown mirrors CostReport token_type enum from cost_report API.
// cache fields mirror MessagesUsageReport.cache_creation from usage_report API.
// ---------------------------------------------------------------------------
export interface AgentSessionCost {
  // identity
  session_id: string;         // SDK session ID or query-level UUID
  model: string;              // e.g. "claude-opus-4-7"
  workspace_id: string;       // parity: cost_report workspace_id grouping
  service_tier: "standard" | "batch" | "priority" | "flex"; // parity: usage_report service_tier
  context_window: "0-200k" | "200k-1M";                      // parity: usage_report context_window

  // token counts — parity with MessagesUsageReport result fields
  uncached_input_tokens: number;          // usage_report: uncached_input_tokens
  output_tokens: number;                  // usage_report: output_tokens
  cache_read_input_tokens: number;        // usage_report: cache_read_input_tokens
  cache_creation_5m_input_tokens: number; // usage_report: cache_creation.ephemeral_5m_input_tokens
  cache_creation_1h_input_tokens: number; // usage_report: cache_creation.ephemeral_1h_input_tokens

  // derived cost — parity with CostReport token_type breakdown
  // SDK field: ResultMessage.total_cost_usd (client-side estimate)
  // Not authoritative billing — use Admin API cost_report for reconciliation
  cost_usd: number;

  // per-model breakdown — parity with Console /cost model grouping
  // SDK field: ResultMessage.modelUsage[model].{costUSD, inputTokens, outputTokens, ...}
  model_usage?: Record<string, ModelCostBreakdown>;

  // CI gate metadata
  pr_number?: number;
  branch?: string;
  recorded_at?: string;
}

export interface ModelCostBreakdown {
  cost_usd: number;                       // modelUsage[m].costUSD
  input_tokens: number;                   // modelUsage[m].inputTokens
  output_tokens: number;                  // modelUsage[m].outputTokens
  cache_read_input_tokens: number;        // modelUsage[m].cacheReadInputTokens
  cache_creation_input_tokens: number;    // modelUsage[m].cacheCreationInputTokens
}

// Cache efficiency metrics — parity with Console /usage/cache view
export interface CacheEfficiencyMetrics {
  session_id: string;
  model: string;
  total_input_tokens: number;             // uncached + cache_read
  cache_read_tokens: number;
  cache_creation_tokens: number;          // 5m + 1h combined
  cache_hit_rate: number;                 // cache_read / (cache_read + uncached) * 100
  estimated_savings_usd: number;          // (cache_read * 0.1 - cache_read * 1.0) * price_per_token
}

// ---------------------------------------------------------------------------
// OTel counter setup — metric names mirror what the Claude Code CLI emits
// natively when CLAUDE_CODE_ENABLE_TELEMETRY=1 is set on the subprocess.
// These counters aggregate at the session level for the Grafana dashboard.
// ---------------------------------------------------------------------------
const exporter = new OTLPMetricExporter({ url: `${OTLP_ENDPOINT}/v1/metrics` });
const meterProvider = new MeterProvider({
  readers: [
    new PeriodicExportingMetricReader({ exporter, exportIntervalMillis: 15000 }),
  ],
});
metrics.setGlobalMeterProvider(meterProvider);

const meter = metrics.getMeter("claude-cost-aggregator", "1.0.0");

// Metric names mirror the Claude Code CLI native OTel metrics.
// @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md (Metrics section)
//
// Native CLI metrics (emitted by subprocess when CLAUDE_CODE_ENABLE_TELEMETRY=1):
//   claude_code.cost.usage         { type: "USD" }
//   claude_code.token.usage        { type: "input"|"output"|"cacheRead"|"cacheCreation" }
//   claude_code.session.count
//   claude_code.lines_of_code.count
//   claude_code.pull_request.count
//   claude_code.commit.count
//   claude_code.active_time.total
//   claude_code.code_edit_tool.decision
//
// Standard OTel attributes on all metrics:
//   organization.id  (= ORGANIZATION_ID)
//   session.id       (controlled by OTEL_METRICS_INCLUDE_SESSION_ID)
//   user.account_uuid / user.account_id
//   user.email, user.id
//
// These application-level counters aggregate session results for Grafana:
const costTotal = meter.createCounter("claude_code.cost.usage", { unit: "USD",
  description: "Parity: claude_code.cost.usage from CLI telemetry" });
const tokenInput = meter.createCounter("claude_code.token.usage.input", { unit: "tokens" });
const tokenOutput = meter.createCounter("claude_code.token.usage.output", { unit: "tokens" });
const tokenCacheRead = meter.createCounter("claude_code.token.usage.cache_read", { unit: "tokens" });
const tokenCacheCreate5m = meter.createCounter("claude_code.token.usage.cache_creation_5m", { unit: "tokens" });
const tokenCacheCreate1h = meter.createCounter("claude_code.token.usage.cache_creation_1h", { unit: "tokens" });

// Cache efficiency gauge — parity with Console /usage/cache hit rate view
const cacheHitRateGauge = meter.createObservableGauge("claude.cache.hit_rate_pct", {
  description: "Prompt cache hit rate as a percentage of total input tokens",
});

// Rolling totals for the gauge callback. Updated in recordSessionCost.
// One addCallback registered once at module init — avoids accumulating a closure
// per session (which would cause N observations per export cycle after N calls).
let _gaugeUncached = 0;
let _gaugeCacheRead = 0;

cacheHitRateGauge.addCallback((result) => {
  const totalInput = _gaugeUncached + _gaugeCacheRead;
  result.observe(
    totalInput > 0 ? (_gaugeCacheRead / totalInput) * 100 : 0,
    { "organization.id": ORGANIZATION_ID },
  );
});

// ---------------------------------------------------------------------------
// recordSessionCost — call from ResultMessage handler in agent loop
// ---------------------------------------------------------------------------
export function recordSessionCost(cost: AgentSessionCost): void {
  // Standard attributes matching Claude Code CLI OTel standard attribute set
  const attrs = {
    "organization.id": ORGANIZATION_ID,     // standard attribute; always include
    "session.id": cost.session_id,
    model: cost.model,
    workspace_id: cost.workspace_id,
    service_tier: cost.service_tier,
    context_window: cost.context_window,
  };

  costTotal.add(cost.cost_usd, attrs);
  tokenInput.add(cost.uncached_input_tokens, { ...attrs, type: "input" });
  tokenOutput.add(cost.output_tokens, { ...attrs, type: "output" });
  tokenCacheRead.add(cost.cache_read_input_tokens, { ...attrs, type: "cacheRead" });
  tokenCacheCreate5m.add(cost.cache_creation_5m_input_tokens, { ...attrs, type: "cacheCreation", ttl: "5m" });
  tokenCacheCreate1h.add(cost.cache_creation_1h_input_tokens, { ...attrs, type: "cacheCreation", ttl: "1h" });

  // Update rolling totals — the gauge callback (registered once at module init) reads these
  _gaugeUncached += cost.uncached_input_tokens;
  _gaugeCacheRead += cost.cache_read_input_tokens;

  const record: AgentSessionCost = { ...cost, recorded_at: new Date().toISOString() };
  fs.appendFileSync(COSTS_JSONL, JSON.stringify(record) + "\n");
  const eff = computeCacheEfficiency(cost);
  console.log(
    `[cost] session=${cost.session_id} cost=$${cost.cost_usd.toFixed(4)}` +
    ` cache_hit=${eff.cache_hit_rate.toFixed(1)}%` +
    ` model=${cost.model}`
  );
}

// ---------------------------------------------------------------------------
// computeCacheEfficiency — parity with Console /usage/cache metrics
// ---------------------------------------------------------------------------
export function computeCacheEfficiency(cost: AgentSessionCost): CacheEfficiencyMetrics {
  const totalInput = cost.uncached_input_tokens + cost.cache_read_input_tokens;
  const cacheCreation = cost.cache_creation_5m_input_tokens + cost.cache_creation_1h_input_tokens;
  const hitRate = totalInput > 0
    ? (cost.cache_read_input_tokens / totalInput) * 100
    : 0;
  // savings: cache reads at 0.1x vs full price at 1.0x — rough estimate
  const savingsUsd = cost.cache_read_input_tokens > 0
    ? (cost.cost_usd * (cost.cache_read_input_tokens / totalInput) * 0.9)
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

// ---------------------------------------------------------------------------
// buildCostRecord — construct AgentSessionCost from SDK ResultMessage fields
//
// TypeScript SDK:
//   result.total_cost_usd
//   result.usage.input_tokens              → uncached_input_tokens
//   result.usage.output_tokens
//   result.usage.cache_read_input_tokens
//   result.usage.cache_creation_input_tokens  (combined; split by TTL not exposed by SDK)
//   result.modelUsage[model].{costUSD, inputTokens, outputTokens, ...}
//
// Python SDK:
//   message.total_cost_usd
//   message.usage["input_tokens"]
//   message.usage.get("cache_read_input_tokens", 0)
//   message.usage.get("cache_creation_input_tokens", 0)
//   message.model_usage[model]
// ---------------------------------------------------------------------------
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
  }
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
    // SDK does not split 5m vs 1h; zero them individually, sum in cache_creation
    cache_creation_5m_input_tokens: usage.cache_creation_input_tokens ?? 0,
    cache_creation_1h_input_tokens: 0,
    cost_usd: totalCostUsd,
    model_usage: options?.modelUsage,
    pr_number: options?.prNumber,
    branch: options?.branch,
  };
}

// ---------------------------------------------------------------------------
// replayCostsFromJSONL — backfill OTel metrics from existing JSONL
// ---------------------------------------------------------------------------
export async function replayCostsFromJSONL(path: string): Promise<void> {
  const rl = readline.createInterface({ input: fs.createReadStream(path) });
  let skipped = 0;
  try {
    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        recordSessionCost(JSON.parse(line) as AgentSessionCost);
      } catch {
        skipped++;
      }
    }
  } finally {
    rl.close(); // release the read stream fd so the process can exit
  }
  if (skipped > 0) {
    console.warn(`[cost] replayCostsFromJSONL: skipped ${skipped} malformed lines`);
  }
}

// ---------------------------------------------------------------------------
// sdkOtelEnv — pass via options.env when creating Agent SDK sessions
// The CLI subprocess exports directly to the OTel Collector at OTLP_ENDPOINT.
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
// ---------------------------------------------------------------------------
// sdkOtelEnv — org-scoped; sets organization.id as a resource attribute so
// all CLI subprocess metrics carry it. Pass via options.env when creating sessions.
// @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
//   (standard attributes: organization.id, multi-team org support)
export const sdkOtelEnv: Record<string, string> = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: "1",
  OTEL_METRICS_EXPORTER: "otlp",
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_LOGS_EXPORTER: "otlp",
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_ENDPOINT: OTLP_ENDPOINT,
  OTEL_METRIC_EXPORT_INTERVAL: "15000",
  // OTEL_METRICS_INCLUDE_SESSION_ID defaults to true — session.id on all metrics
  // OTEL_METRICS_INCLUDE_ACCOUNT_UUID defaults to true — user.account_uuid on all metrics
  OTEL_SERVICE_NAME: "knowledge-engineering-agent",
  // organization.id is set here as a resource attribute — parity with Console /analytics
  OTEL_RESOURCE_ATTRIBUTES: [
    `organization.id=${ORGANIZATION_ID}`,
    `workspace.id=${WORKSPACE_ID}`,
  ].join(","),
};

// forceFlush drains in-flight OTLP HTTP requests before shutdown so the
// last metrics window is not silently dropped on graceful container stop.
process.on("SIGTERM", async () => {
  await meterProvider.forceFlush();
  await meterProvider.shutdown();
  process.exit(0);
});
