// @cite vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
// Polls /v1/organizations/usage_report/messages and /v1/organizations/cost_report
// every POLL_INTERVAL_MS, emits OTel metrics to OTEL_EXPORTER_OTLP_ENDPOINT.
// Auth: ANTHROPIC_ADMIN_KEY (sk-ant-admin...) — never ANTHROPIC_API_KEY.

import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { metrics } from "@opentelemetry/api";

const ADMIN_KEY = process.env.ANTHROPIC_ADMIN_KEY;
const WORKSPACE_ID = process.env.WORKSPACE_ID ?? "";
const OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318";
const POLL_MS = parseInt(process.env.POLL_INTERVAL_MS ?? "60000", 10);
const API_BASE = "https://api.anthropic.com";

if (!ADMIN_KEY) {
  console.error("ANTHROPIC_ADMIN_KEY not set — cost poller cannot authenticate");
  process.exit(1);
}

const exporter = new OTLPMetricExporter({ url: `${OTLP_ENDPOINT}/v1/metrics` });
const meterProvider = new MeterProvider({
  readers: [new PeriodicExportingMetricReader({ exporter, exportIntervalMillis: POLL_MS })],
});
metrics.setGlobalMeterProvider(meterProvider);

const meter = metrics.getMeter("claude-cost-poller", "0.1.0");

const inputTokens = meter.createObservableGauge("claude.tokens.input", {
  description: "Uncached input tokens consumed",
  unit: "tokens",
});
const outputTokens = meter.createObservableGauge("claude.tokens.output", {
  description: "Output tokens consumed",
  unit: "tokens",
});
const cacheReadTokens = meter.createObservableGauge("claude.tokens.cache_read", {
  description: "Cache-read input tokens",
  unit: "tokens",
});
const costUsd = meter.createObservableGauge("claude.cost.usd", {
  description: "API cost in USD cents",
  unit: "cents",
});

type UsageBucket = {
  start_time: string;
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  model?: string;
};

type CostBucket = {
  start_time: string;
  cost: string;
  description?: string;
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": ADMIN_KEY!,
      "User-Agent": "claude-cost-poller/0.1.0 (knowledge-engineering)",
    },
  });
  if (!res.ok) throw new Error(`${path} → ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

function yesterday(): { starting_at: string; ending_at: string } {
  const now = new Date();
  const end = new Date(now);
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 1);
  return {
    starting_at: start.toISOString(),
    ending_at: end.toISOString(),
  };
}

async function poll() {
  const { starting_at, ending_at } = yesterday();
  const wsParam = WORKSPACE_ID ? `&workspace_ids[]=${WORKSPACE_ID}` : "";

  try {
    const usageUrl =
      `/v1/organizations/usage_report/messages?` +
      `starting_at=${starting_at}&ending_at=${ending_at}` +
      `&group_by[]=model&bucket_width=1d${wsParam}`;

    const usageData = await fetchJson<{ data: UsageBucket[] }>(usageUrl);

    for (const bucket of usageData.data ?? []) {
      const attrs = {
        workspace_id: WORKSPACE_ID || "default",
        model: bucket.model ?? "unknown",
        date: bucket.start_time.slice(0, 10),
      };
      inputTokens.addCallback((res) => res.observe(bucket.input_tokens, attrs));
      outputTokens.addCallback((res) => res.observe(bucket.output_tokens, attrs));
      cacheReadTokens.addCallback((res) => res.observe(bucket.cache_read_input_tokens, attrs));
    }
  } catch (e) {
    console.error("usage poll failed:", e);
  }

  try {
    const costUrl =
      `/v1/organizations/cost_report?` +
      `starting_at=${starting_at}&ending_at=${ending_at}` +
      `&group_by[]=workspace_id&group_by[]=description&bucket_width=1d`;

    const costData = await fetchJson<{ data: CostBucket[] }>(costUrl);

    for (const bucket of costData.data ?? []) {
      const attrs = {
        workspace_id: WORKSPACE_ID || "default",
        description: bucket.description ?? "unknown",
        date: bucket.start_time.slice(0, 10),
      };
      // cost is a decimal string in USD cents
      const cents = parseFloat(bucket.cost) * 100;
      costUsd.addCallback((res) => res.observe(cents, attrs));
    }
  } catch (e) {
    console.error("cost poll failed:", e);
  }

  console.log(`[${new Date().toISOString()}] poll complete — next in ${POLL_MS}ms`);
}

await poll();
setInterval(poll, POLL_MS);
