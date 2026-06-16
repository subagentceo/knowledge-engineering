/**
 * OTLP HTTP/JSON ingestion for claude_code metrics and log events.
 *
 * Handles:
 *   POST /v1/metrics  — claude_code.cost.usage gauge DataPoints
 *   POST /v1/logs     — claude_code.api_request LogRecords
 *
 * @cite vendor/anthropics/code.claude.com/docs/en/monitoring-usage.md
 */
import type { Env } from "./env.js";

type KV = Array<{ key: string; value: Record<string, unknown> }>;

function attr(attrs: KV | undefined, key: string): string | number | boolean | null {
  if (!attrs) return null;
  const entry = attrs.find((a) => a.key === key);
  if (!entry) return null;
  const v = entry.value as Record<string, unknown>;
  return (v.stringValue ?? v.intValue ?? v.doubleValue ?? v.boolValue ?? null) as string | number | boolean | null;
}

export async function handleMetrics(db: D1Database, body: Record<string, unknown>): Promise<void> {
  const stmts: D1PreparedStatement[] = [];
  const resourceMetrics = (body.resourceMetrics ?? []) as Array<Record<string, unknown>>;

  for (const rm of resourceMetrics) {
    const res = ((rm.resource as Record<string, unknown>)?.attributes ?? []) as KV;
    const orgId = attr(res, "organization.id") ?? attr(res, "org.id");
    const email = attr(res, "user.email");

    for (const sm of ((rm.scopeMetrics ?? []) as Array<Record<string, unknown>>)) {
      for (const m of ((sm.metrics ?? []) as Array<Record<string, unknown>>)) {
        if (m.name !== "claude_code.cost.usage") continue;
        const gauge = m.gauge as Record<string, unknown> | undefined;
        for (const dp of ((gauge?.dataPoints ?? []) as Array<Record<string, unknown>>)) {
          const da = (dp.attributes ?? []) as KV;
          const ts = new Date(Number(dp.timeUnixNano) / 1e6).toISOString();
          const sid = attr(da, "session.id");
          const model = attr(da, "model");
          const cost = (dp.asDouble ?? dp.asInt ?? 0) as number;
          const qs = attr(da, "query_source");

          stmts.push(
            db.prepare(
              "INSERT INTO api_requests (ts,session_id,org_id,user_email,model,cost_usd,query_source,speed,effort,agent_name,skill_name,raw_metric) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            ).bind(ts, sid, orgId, email, model, cost, qs, attr(da, "speed"), attr(da, "effort"), attr(da, "agent.name"), attr(da, "skill.name"), "claude_code.cost.usage")
          );

          stmts.push(
            db.prepare(
              "INSERT INTO cost_daily (date,org_id,model,query_source,total_cost_usd,request_count) VALUES (?,?,?,?,?,1) ON CONFLICT(date,org_id,model,query_source) DO UPDATE SET total_cost_usd=total_cost_usd+excluded.total_cost_usd,request_count=request_count+1"
            ).bind(ts.slice(0, 10), orgId, model, qs, cost)
          );

          if (sid) {
            stmts.push(
              db.prepare(
                "INSERT INTO sessions (session_id,org_id,user_email,first_seen,last_seen,total_cost_usd,request_count) VALUES (?,?,?,?,?,?,1) ON CONFLICT(session_id) DO UPDATE SET last_seen=excluded.last_seen,total_cost_usd=total_cost_usd+excluded.total_cost_usd,request_count=request_count+1"
              ).bind(sid, orgId, email, ts, ts, cost)
            );
          }
        }
      }
    }
  }

  if (stmts.length > 0) await db.batch(stmts);
}

export async function handleLogs(db: D1Database, body: Record<string, unknown>): Promise<void> {
  const stmts: D1PreparedStatement[] = [];
  const resourceLogs = (body.resourceLogs ?? []) as Array<Record<string, unknown>>;

  for (const rl of resourceLogs) {
    const res = ((rl.resource as Record<string, unknown>)?.attributes ?? []) as KV;
    const orgId = attr(res, "organization.id") ?? attr(res, "org.id");
    const email = attr(res, "user.email");

    for (const sl of ((rl.scopeLogs ?? []) as Array<Record<string, unknown>>)) {
      for (const lr of ((sl.logRecords ?? []) as Array<Record<string, unknown>>)) {
        const la = (lr.attributes ?? []) as KV;
        const eventName = attr(la, "event.name") ?? (lr.body as Record<string, unknown>)?.stringValue ?? "";
        if (eventName !== "claude_code.api_request") continue;

        const ts = new Date(Number(lr.timeUnixNano) / 1e6).toISOString();
        const sid = attr(la, "session.id");
        const cost = attr(la, "cost_usd") as number | null;
        const it = attr(la, "input_tokens") as number | null;
        const ot = attr(la, "output_tokens") as number | null;

        stmts.push(
          db.prepare(
            "INSERT INTO api_requests (ts,session_id,org_id,user_email,model,cost_usd,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,request_id,prompt_id,stop_reason,raw_metric) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
          ).bind(ts, sid, orgId, email, attr(la, "model"), cost, it, ot, attr(la, "cache_read_tokens"), attr(la, "cache_write_tokens"), attr(la, "request_id"), attr(la, "prompt.id"), attr(la, "stop_reason"), "claude_code.api_request")
        );

        if (sid) {
          stmts.push(
            db.prepare(
              "INSERT INTO sessions (session_id,org_id,user_email,first_seen,last_seen,total_cost_usd,total_input_tokens,total_output_tokens,request_count) VALUES (?,?,?,?,?,?,?,?,1) ON CONFLICT(session_id) DO UPDATE SET last_seen=excluded.last_seen,total_cost_usd=total_cost_usd+COALESCE(excluded.total_cost_usd,0),total_input_tokens=total_input_tokens+COALESCE(excluded.total_input_tokens,0),total_output_tokens=total_output_tokens+COALESCE(excluded.total_output_tokens,0),request_count=request_count+1"
            ).bind(sid, orgId, email, ts, ts, cost ?? 0, it ?? 0, ot ?? 0)
          );
        }
      }
    }
  }

  if (stmts.length > 0) await db.batch(stmts);
}
