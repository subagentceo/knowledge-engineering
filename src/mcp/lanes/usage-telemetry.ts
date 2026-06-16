/**
 * Bridge lane: D1-backed usage telemetry query tools.
 *
 * Wraps the GET /query/* endpoints on the claude-telemetry Worker as MCP tools.
 * This is the "Admin API replacement" for claude.ai Max 5x accounts:
 * no sk-ant-admin, no sk-ant-api03, no credit purchase required.
 *
 * Tools:
 *   usage_cost_daily     — cost_daily rollup: date × model × query_source
 *   usage_sessions       — session-level aggregates (cost, tokens, request count)
 *   usage_requests       — raw api_requests (last N, newest first)
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 * @cite vendor/anthropics/code.claude.com/docs/en/costs.md
 * @cite src/mcp/usage-telemetry/src/index.ts
 */
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "../bridge-utils.js";

const BASE_URL = process.env.OTEL_QUERY_BASE_URL ?? "https://claude-telemetry.subagentceo.workers.dev";

async function queryWorker(path: string, limit: number): Promise<unknown> {
  const url = `${BASE_URL}${path}?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`claude-telemetry worker error: ${res.status} ${await res.text()}`);
  return res.json();
}

export function registerUsageTelemetry(server: McpServer): void {
  server.tool(
    "usage_cost_daily",
    "Query daily cost rollup from the claude-telemetry D1 sink. Returns rows keyed by date × model × query_source. " +
    "This is the Max 5x replacement for the Admin API /v1/organizations/cost_report endpoint.",
    {
      limit: z.number().int().min(1).max(500).optional().describe("max rows, default 100"),
    },
    async ({ limit = 100 }) => {
      const data = await queryWorker("/query/daily", limit);
      return jsonResult(data);
    },
  );

  server.tool(
    "usage_sessions",
    "Query per-session cost and token aggregates from D1. Each row is one Claude Code session: total cost, " +
    "input/output tokens, request count, first/last seen timestamps.",
    {
      limit: z.number().int().min(1).max(500).optional().describe("max sessions, default 100"),
    },
    async ({ limit = 100 }) => {
      const data = await queryWorker("/query/sessions", limit);
      return jsonResult(data);
    },
  );

  server.tool(
    "usage_requests",
    "Query raw API request records from D1 (newest first). Each row is one claude_code.api_request OTel event: " +
    "timestamp, model, cost_usd, token counts, request_id, query_source, agent_name, stop_reason.",
    {
      limit: z.number().int().min(1).max(500).optional().describe("max records, default 100"),
    },
    async ({ limit = 100 }) => {
      const data = await queryWorker("/query/requests", limit);
      return jsonResult(data);
    },
  );
}
