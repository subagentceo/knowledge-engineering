// claude-cost-poller.ts
// Reads cost data from the Claude Agent SDK ResultMessage stream and forwards
// it to the OTel Collector via OTLP HTTP. Does NOT call the Anthropic Admin API
// or require ANTHROPIC_ADMIN_KEY — the SDK emits total_cost_usd natively.
//
// The Claude Code CLI subprocess is configured with OTel env vars and exports
// metrics directly to the collector. This module is a session-level aggregator
// that collects result messages from running SDK sessions and writes structured
// cost records to a local JSONL file (agent-session-costs.jsonl) consumable by
// scripts/check-agent-costs.ts for the CI cost gate.
//
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/cost-tracking.md
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md

import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { metrics } from "@opentelemetry/api";
import * as fs from "fs";
import * as readline from "readline";

// OTel SDK env vars that must also be set on the Claude Code CLI subprocess:
//   CLAUDE_CODE_ENABLE_TELEMETRY=1
//   OTEL_METRICS_EXPORTER=otlp
//   OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318
//   OTEL_METRIC_EXPORT_INTERVAL=15000
//
// These are passed via options.env when creating Agent SDK sessions.
// This file handles the application-layer aggregation on top of that pipeline.

const OTLP_ENDPOINT =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318";
const WORKSPACE_ID =
  process.env.WORKSPACE_ID ?? "wrkspc_01CBeWLBbjPFi6iqmBnnh3vs";
const COSTS_JSONL = process.env.COSTS_JSONL ?? "/tmp/agent-session-costs.jsonl";

export interface AgentSessionCost {
  session_id: string;
  model: string;
  tokens_input: number;
  tokens_output: number;
  cache_creation_tokens: number;
  cache_read_tokens: number;
  cost_usd: number;
  workspace_id: string;
  recorded_at?: string;
  pr_number?: number;
  branch?: string;
}

// Initialize OTel MeterProvider pointing at the OTel Collector
const exporter = new OTLPMetricExporter({ url: `${OTLP_ENDPOINT}/v1/metrics` });
const meterProvider = new MeterProvider({
  readers: [
    new PeriodicExportingMetricReader({ exporter, exportIntervalMillis: 15000 }),
  ],
});
metrics.setGlobalMeterProvider(meterProvider);

const meter = metrics.getMeter("claude-cost-aggregator", "1.0.0");
const costCounter = meter.createCounter("claude.cost.usd", {
  description: "Cumulative USD cost of Claude agent sessions",
  unit: "USD",
});
const inputTokenCounter = meter.createCounter("claude.tokens.input", {
  description: "Input tokens consumed across Claude agent sessions",
  unit: "tokens",
});
const outputTokenCounter = meter.createCounter("claude.tokens.output", {
  description: "Output tokens produced across Claude agent sessions",
  unit: "tokens",
});
const cacheReadCounter = meter.createCounter("claude.tokens.cache_read", {
  description: "Tokens served from prompt cache",
  unit: "tokens",
});

// Record a cost entry from an SDK ResultMessage.
// Call this from your agent loop when block.type === "result".
export function recordSessionCost(cost: AgentSessionCost): void {
  const attrs = {
    session_id: cost.session_id,
    model: cost.model,
    workspace_id: cost.workspace_id,
  };

  costCounter.add(cost.cost_usd, attrs);
  inputTokenCounter.add(cost.tokens_input, attrs);
  outputTokenCounter.add(cost.tokens_output, attrs);
  cacheReadCounter.add(cost.cache_read_tokens, attrs);

  // Append to JSONL for CI gate consumption (scripts/check-agent-costs.ts)
  const line = JSON.stringify({ ...cost, recorded_at: new Date().toISOString() });
  fs.appendFileSync(COSTS_JSONL, line + "\n");
  console.log(`[cost] session=${cost.session_id} cost=$${cost.cost_usd.toFixed(4)} model=${cost.model}`);
}

// Tail an existing JSONL file of SDK result messages and emit OTel metrics.
export async function replayCostsFromJSONL(path: string): Promise<void> {
  const rl = readline.createInterface({ input: fs.createReadStream(path) });
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line) as AgentSessionCost;
      recordSessionCost({ ...entry, workspace_id: entry.workspace_id ?? WORKSPACE_ID });
    } catch {
      // skip malformed lines
    }
  }
}

// OTel env vars to pass via options.env when creating Agent SDK sessions.
// The CLI subprocess exports directly to the collector; no Admin API key needed.
// @cite vendor/anthropics/code.claude.com/docs/en/agent-sdk/observability.md
export const sdkOtelEnv: Record<string, string> = {
  CLAUDE_CODE_ENABLE_TELEMETRY: "1",
  CLAUDE_CODE_ENHANCED_TELEMETRY_BETA: "1",
  OTEL_METRICS_EXPORTER: "otlp",
  OTEL_TRACES_EXPORTER: "otlp",
  OTEL_LOGS_EXPORTER: "otlp",
  OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
  OTEL_EXPORTER_OTLP_ENDPOINT: OTLP_ENDPOINT,
  OTEL_METRIC_EXPORT_INTERVAL: "15000",
  OTEL_SERVICE_NAME: "knowledge-engineering-agent",
  OTEL_RESOURCE_ATTRIBUTES: `workspace.id=${WORKSPACE_ID}`,
};

// Graceful shutdown — flush pending metrics before exit
process.on("SIGTERM", async () => {
  await meterProvider.shutdown();
  process.exit(0);
});
