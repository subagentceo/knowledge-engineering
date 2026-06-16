/**
 * claude-telemetry Cloudflare Worker.
 *
 * Routes:
 *   GET  /             health probe
 *   GET  /v1/metrics   health probe (OTLP collectors hit this with GET)
 *   POST /v1/metrics   OTLP metric ingestion (claude_code.cost.usage)
 *   POST /v1/logs      OTLP log ingestion (claude_code.api_request)
 *   GET  /query/daily  cost_daily table as JSON
 *   GET  /query/sessions  sessions table as JSON
 *   GET  /query/requests  api_requests table as JSON (last N)
 *
 * The GET /query/* routes are the "Admin API replacement" for Max 5x accounts
 * that cannot use sk-ant-admin or the Console usage page programmatically.
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 * @cite vendor/anthropics/code.claude.com/docs/en/costs.md
 */
import type { Env } from "./env.js";
import { handleMetrics, handleLogs } from "./otlp.js";

const JSON_HEADERS = { "Content-Type": "application/json" };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // health / OTLP GET probe
    if (method === "GET" && (pathname === "/" || pathname === "/v1/metrics" || pathname === "/v1/logs")) {
      return new Response(JSON.stringify({ status: "ok", service: "claude-telemetry" }), {
        headers: { ...JSON_HEADERS, ...corsHeaders() },
      });
    }

    // OTLP ingestion
    if (method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return new Response("bad json", { status: 400 });
      }

      if (pathname === "/v1/metrics") {
        await handleMetrics(env.DB, body);
      } else if (pathname === "/v1/logs") {
        await handleLogs(env.DB, body);
      } else {
        return new Response("not found", { status: 404 });
      }

      return new Response(JSON.stringify({ partialSuccess: {} }), {
        status: 200,
        headers: { ...JSON_HEADERS, ...corsHeaders() },
      });
    }

    // query endpoints — Admin API replacement for Max 5x
    if (method === "GET") {
      const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100"), 500);

      if (pathname === "/query/daily") {
        const rows = await env.DB.prepare(
          "SELECT date, org_id, model, query_source, total_cost_usd, request_count FROM cost_daily ORDER BY date DESC, total_cost_usd DESC LIMIT ?"
        ).bind(limit).all();
        return Response.json({ rows: rows.results }, { headers: corsHeaders() });
      }

      if (pathname === "/query/sessions") {
        const rows = await env.DB.prepare(
          "SELECT session_id, org_id, user_email, first_seen, last_seen, total_cost_usd, total_input_tokens, total_output_tokens, request_count FROM sessions ORDER BY last_seen DESC LIMIT ?"
        ).bind(limit).all();
        return Response.json({ rows: rows.results }, { headers: corsHeaders() });
      }

      if (pathname === "/query/requests") {
        const rows = await env.DB.prepare(
          "SELECT ts, session_id, model, cost_usd, input_tokens, output_tokens, request_id, query_source, agent_name, stop_reason FROM api_requests ORDER BY ts DESC LIMIT ?"
        ).bind(limit).all();
        return Response.json({ rows: rows.results }, { headers: corsHeaders() });
      }
    }

    return new Response("not found", { status: 404 });
  },
};

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
