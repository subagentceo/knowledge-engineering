/**
 * Bridge lane: agent session cost telemetry.
 *
 * Dogfoods AgentSessionCost, ModelCostBreakdown, CacheEfficiencyMetrics,
 * computeCacheEfficiency, and buildCostRecord from the cost poller.
 *
 * Tools:
 *   telemetry_session_list      - list sessions from COSTS_JSONL file
 *   telemetry_cost_query        - query Prometheus for claude_code.cost.usage
 *   telemetry_cache_efficiency  - compute cache efficiency for a session
 *   telemetry_record_cost       - append an AgentSessionCost record to COSTS_JSONL
 *
 * @cite src/sdk/cost-types.ts
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */
import * as fs from "node:fs";
import * as readline from "node:readline";
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { jsonResult } from "../bridge-utils.js";
import {
  type AgentSessionCost,
  type CacheEfficiencyMetrics,
  computeCacheEfficiency,
  buildCostRecord,
  recordSessionCost,
} from "../../sdk/cost-types.js";

const COSTS_JSONL = process.env.COSTS_JSONL ?? "/tmp/agent-session-costs.jsonl";
const PROMETHEUS_URL = process.env.PROMETHEUS_URL ?? "http://localhost:9090";

async function readSessionsFromJSONL(path: string): Promise<AgentSessionCost[]> {
  if (!fs.existsSync(path)) return [];
  const sessions: AgentSessionCost[] = [];
  const rl = readline.createInterface({ input: fs.createReadStream(path) });
  for await (const line of rl) {
    if (!line.trim()) continue;
    try { sessions.push(JSON.parse(line) as AgentSessionCost); } catch { /* skip */ }
  }
  return sessions;
}

async function prometheusQuery(query: string): Promise<unknown> {
  const url = `${PROMETHEUS_URL}/api/v1/query?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Prometheus query failed: ${res.status}`);
  return res.json();
}

export function registerTelemetry(server: McpServer): void {
  server.tool(
    "telemetry_session_list",
    "List agent session cost records from the COSTS_JSONL file. Returns sessions with token counts, cache efficiency, and cost.",
    {
      limit: z.number().int().min(1).max(200).optional().describe("max sessions to return, default 50"),
      model: z.string().optional().describe("filter by model substring"),
      branch: z.string().optional().describe("filter by branch name"),
    },
    async ({ limit = 50, model, branch }) => {
      const all = await readSessionsFromJSONL(COSTS_JSONL);
      let filtered = all;
      if (model) filtered = filtered.filter(s => s.model.includes(model));
      if (branch) filtered = filtered.filter(s => s.branch?.includes(branch));
      const sessions = filtered.slice(-limit).map(s => ({
        ...s,
        cache_efficiency: computeCacheEfficiency(s),
      }));
      return jsonResult({ count: sessions.length, sessions });
    },
  );

  server.tool(
    "telemetry_cost_query",
    "Query Prometheus for claude_code.cost.usage metrics. Returns time-series data scoped to the org.",
    {
      query: z.string().optional().describe(
        "PromQL query string; defaults to sum by model of claude_code.cost.usage for the org"
      ),
      range: z.enum(["1h", "6h", "24h", "7d", "30d"]).optional().describe("lookback range, default 24h"),
    },
    async ({ query, range = "24h" }) => {
      const orgId = process.env.ORGANIZATION_ID ?? "c38224f8-0e34-45c0-abee-739f89331d6a";
      const defaultQuery =
        `sum by (model) (increase(claude_code_cost_usage_total{organization_id="${orgId}"}[${range}]))`;
      const pql = query ?? defaultQuery;
      try {
        const result = await prometheusQuery(pql);
        return jsonResult({ query: pql, range, result });
      } catch (err) {
        return jsonResult({ error: String(err), query: pql });
      }
    },
  );

  server.tool(
    "telemetry_cache_efficiency",
    "Compute prompt-cache efficiency metrics for one or all sessions. Parity with Console /usage/cache hit rate view.",
    {
      session_id: z.string().optional().describe("specific session ID; omit for aggregate over all sessions"),
    },
    async ({ session_id }) => {
      const all = await readSessionsFromJSONL(COSTS_JSONL);
      if (session_id) {
        const s = all.find(x => x.session_id === session_id);
        if (!s) return jsonResult({ error: `session not found: ${session_id}` });
        return jsonResult(computeCacheEfficiency(s));
      }
      // aggregate
      const agg: AgentSessionCost = {
        session_id: "aggregate",
        model: "all",
        workspace_id: "",
        service_tier: "standard",
        context_window: "0-200k",
        uncached_input_tokens: 0,
        output_tokens: 0,
        cache_read_input_tokens: 0,
        cache_creation_5m_input_tokens: 0,
        cache_creation_1h_input_tokens: 0,
        cost_usd: 0,
      };
      for (const s of all) {
        agg.uncached_input_tokens += s.uncached_input_tokens;
        agg.output_tokens += s.output_tokens;
        agg.cache_read_input_tokens += s.cache_read_input_tokens;
        agg.cache_creation_5m_input_tokens += s.cache_creation_5m_input_tokens;
        agg.cache_creation_1h_input_tokens += s.cache_creation_1h_input_tokens;
        agg.cost_usd += s.cost_usd;
      }
      return jsonResult({ session_count: all.length, ...computeCacheEfficiency(agg), total_cost_usd: agg.cost_usd });
    },
  );

  server.tool(
    "telemetry_record_cost",
    "Append an agent session cost record to COSTS_JSONL and emit OTel metrics. Use after each agent SDK session.",
    {
      total_cost_usd: z.number().min(0),
      input_tokens: z.number().int().min(0),
      output_tokens: z.number().int().min(0),
      cache_read_input_tokens: z.number().int().min(0).optional(),
      cache_creation_input_tokens: z.number().int().min(0).optional(),
      session_id: z.string(),
      model: z.string(),
      workspace_id: z.string().optional(),
      service_tier: z.enum(["standard", "batch", "priority", "flex"]).optional(),
      context_window: z.enum(["0-200k", "200k-1M"]).optional(),
      pr_number: z.number().int().optional(),
      branch: z.string().optional(),
    },
    async (args) => {
      const record = buildCostRecord(
        args.total_cost_usd,
        {
          input_tokens: args.input_tokens,
          output_tokens: args.output_tokens,
          ...(args.cache_read_input_tokens !== undefined && { cache_read_input_tokens: args.cache_read_input_tokens }),
          ...(args.cache_creation_input_tokens !== undefined && { cache_creation_input_tokens: args.cache_creation_input_tokens }),
        },
        args.session_id,
        args.model,
        {
          ...(args.workspace_id !== undefined && { workspaceId: args.workspace_id }),
          ...(args.service_tier !== undefined && { serviceTier: args.service_tier }),
          ...(args.context_window !== undefined && { contextWindow: args.context_window }),
          ...(args.pr_number !== undefined && { prNumber: args.pr_number }),
          ...(args.branch !== undefined && { branch: args.branch }),
        },
      );
      recordSessionCost(record);
      return jsonResult({ recorded: true, session_id: record.session_id, cost_usd: record.cost_usd,
        cache_efficiency: computeCacheEfficiency(record) });
    },
  );
}
