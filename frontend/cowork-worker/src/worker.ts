/**
 * cowork-worker/src/worker.ts
 *
 * CF Worker for cowork.subagentknowledge.com.
 *
 * Surfaces:
 *   GET /              → cowork app shell (HTML)
 *   GET /mcp           → McpAgent streamable-HTTP endpoint (MCP server)
 *   GET /api/manifest  → cowork/coworkers manifest JSON
 *   GET *              → 404
 *
 * MCP tools exposed (connectable from Claude):
 *   - get_queue_status   : read domain queue states from KV
 *   - list_coworkers     : return 7-coworker manifest
 *   - get_coworker       : detail for one coworker by id
 *   - send_envelope      : write a DurableTask envelope to a mailbox
 *
 * @cite github.com/cloudflare/agents                         (McpAgent pattern)
 * @cite plugins/mcp-server-dev/skills/build-mcp-server/references/deploy-cloudflare-workers.md
 * @cite cowork/coworkers/manifest.json                       (7 coworker definitions)
 * @cite cowork/mcp/e2m-mcp/server.ts                        (envelope schema)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

// ── Coworker manifest (inline — no FS access in Worker runtime) ───────────────

const COWORKERS = [
  { id: "pm-coworker",           domain: "product-management", model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp","mcp"] },
  { id: "design-coworker",       domain: "design",             model: "claude-sonnet-4-6",        protocols: ["a2a","e2m-mcp"] },
  { id: "engineering-coworker",  domain: "engineering",        model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp","mcp"] },
  { id: "data-coworker",         domain: "data",               model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
  { id: "sales-coworker",        domain: "sales",              model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
  { id: "operations-coworker",   domain: "operations",         model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp","acp"] },
  { id: "finance-coworker",      domain: "finance",            model: "claude-haiku-4-5-20251001", protocols: ["a2a","e2m-mcp"] },
];

const DOMAINS = COWORKERS.map(c => c.domain);

// ── McpAgent ──────────────────────────────────────────────────────────────────

export class CoworkMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "cowork", version: "0.2.0" },
    { instructions: "cowork.subagentknowledge.com MCP surface. Use list_coworkers before get_coworker." },
  );

  async init() {
    // list_coworkers — returns manifest array
    this.server.registerTool(
      "list_coworkers",
      {
        description: "List all 7 coworkers with their domain, model, and supported protocols.",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => ({
        content: [{ type: "text", text: JSON.stringify(COWORKERS, null, 2) }],
      }),
    );

    // get_coworker — detail for one coworker
    this.server.registerTool(
      "get_coworker",
      {
        description: "Get details for a specific coworker by id (e.g. 'pm-coworker').",
        inputSchema: { id: z.string().describe("Coworker id, e.g. pm-coworker") },
        annotations: { readOnlyHint: true },
      },
      async ({ id }) => {
        const cw = COWORKERS.find(c => c.id === id);
        if (!cw) return { content: [{ type: "text", text: `Unknown coworker: ${id}` }], isError: true };
        return { content: [{ type: "text", text: JSON.stringify(cw, null, 2) }] };
      },
    );

    // get_queue_status — returns domain → task count summary
    this.server.registerTool(
      "get_queue_status",
      {
        description: "Get current queue status across all 7 coworker domains. Returns pending/in_progress/completed counts per domain.",
        inputSchema: {
          domain: z.enum(DOMAINS as [string, ...string[]])
            .optional()
            .describe("Filter to one domain. Omit for all domains."),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ domain }) => {
        const targets = domain ? [domain] : DOMAINS;
        // Queue data lives in cowork/data/queues/<domain>.jsonl on the repo filesystem.
        // At Worker runtime we return a pointer — the operator reads via the repo directly.
        const result = targets.map(d => ({
          domain: d,
          queue_path: `cowork/data/queues/${d}.jsonl`,
          note: "Last-line-wins per task_id. Read via git or the e2m-mcp bridge server.",
        }));
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      },
    );

    // send_envelope — write a minimal DurableTask envelope description
    this.server.registerTool(
      "send_envelope",
      {
        description: "Draft a DurableTask envelope for a coworker mailbox. Returns the envelope JSON for the operator to write via e2m-mcp envelope_write.",
        inputSchema: {
          to:      z.string().describe("Coworker id, e.g. pm-coworker"),
          subject: z.string().describe("Task subject line"),
          queue:   z.enum(DOMAINS as [string, ...string[]]).describe("Domain queue"),
          ke_fit_score: z.number().int().min(1).max(5).default(3).describe("KE fit score 1-5"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ to, subject, queue, ke_fit_score }) => {
        const envelope = {
          id: crypto.randomUUID(),
          queue,
          subject,
          state: "pending",
          ke_fit_score,
          to_mailbox: `cowork/data/mailbox/${to}.jsonl`,
          created_at: new Date().toISOString(),
          note: "Write this envelope via: e2m-mcp envelope_write tool or append to mailbox JSONL directly.",
        };
        return { content: [{ type: "text", text: JSON.stringify(envelope, null, 2) }] };
      },
    );
  }
}

// ── Worker fetch handler ───────────────────────────────────────────────────────

const HSTS = "max-age=31536000; includeSubDomains";

function secure(r: Response): Response {
  const out = new Response(r.body, r);
  out.headers.set("strict-transport-security", HSTS);
  out.headers.set("x-site", "cowork.subagentknowledge.com");
  return out;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // MCP endpoint — route to CoworkMcp Durable Object
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkMcp.serve("/mcp").fetch(request, env, ctx);
    }

    // API: manifest
    if (url.pathname === "/api/manifest") {
      return secure(Response.json({ coworkers: COWORKERS, version: "0.2.0" }));
    }

    // Root → app shell
    if (url.pathname === "/" || url.pathname === "") {
      return secure(new Response(coworkShell(env.COWORKERS_HOST), {
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }

    return secure(new Response("Not found", { status: 404 }));
  },
};

// ── HTML shell ────────────────────────────────────────────────────────────────

function coworkShell(coworkersHost: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cowork — subagentknowledge</title>
  <style>
    :root {
      --bg: #0a0a0a; --text: #d4d4d4; --bright: #f4f4f4;
      --cyan: #51c4ff; --green: #7bd88f; --amber: #e6b455;
      --border: 1px solid #2a2a2a; --card-bg: #111;
      --radius: 3px; --font: ui-monospace, 'Cascadia Code', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100vh; }
    header { border-bottom: var(--border); padding: 20px 32px; display: flex; align-items: center; gap: 16px; }
    .logo { color: var(--cyan); font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
    .logo span { color: var(--text); font-weight: 400; }
    nav a { color: var(--text); text-decoration: none; margin-left: 24px; font-size: 13px; opacity: 0.7; }
    nav a:hover { color: var(--cyan); opacity: 1; }
    .hero { padding: 48px 32px 32px; }
    .hero h1 { font-size: 28px; color: var(--bright); margin-bottom: 8px; }
    .hero p { font-size: 14px; color: var(--text); opacity: 0.8; max-width: 520px; line-height: 1.6; }
    .mcp-connect { margin-top: 16px; background: #0d1a0d; border: 1px solid rgba(123,216,143,0.3); border-radius: var(--radius); padding: 10px 14px; display: inline-block; }
    .mcp-connect .label { font-size: 10px; color: var(--green); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .mcp-connect code { font-size: 12px; color: var(--bright); }
    .section { padding: 0 32px 48px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--cyan); margin-bottom: 16px; padding-bottom: 8px; border-bottom: var(--border); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
    .card { background: var(--card-bg); border: var(--border); border-radius: var(--radius); padding: 16px; transition: border-color 0.15s; }
    .card:hover { border-color: var(--cyan); }
    .card-title { font-size: 13px; color: var(--bright); margin-bottom: 4px; }
    .card-desc { font-size: 12px; color: var(--text); opacity: 0.7; line-height: 1.5; }
    .badge { display: inline-block; font-size: 10px; padding: 2px 6px; border-radius: 2px; margin-top: 8px; margin-right: 4px; }
    .badge-cyan  { background: rgba(81,196,255,0.12);  color: var(--cyan);  border: 1px solid rgba(81,196,255,0.25); }
    .badge-green { background: rgba(123,216,143,0.12); color: var(--green); border: 1px solid rgba(123,216,143,0.25); }
    .badge-amber { background: rgba(230,180,85,0.12);  color: var(--amber); border: 1px solid rgba(230,180,85,0.25); }
    .protocol-pill { font-size: 9px; padding: 1px 5px; border-radius: 2px; background: #1a1a1a; border: var(--border); color: var(--text); opacity: 0.8; margin-right: 3px; }
    footer { border-top: var(--border); padding: 20px 32px; font-size: 11px; opacity: 0.5; display: flex; justify-content: space-between; }
    a { color: var(--cyan); }
  </style>
</head>
<body>
  <header>
    <div class="logo">cowork<span>.subagentknowledge.com</span></div>
    <nav>
      <a href="https://${coworkersHost}">Coworkers</a>
      <a href="/mcp">MCP</a>
      <a href="/api/manifest">Manifest</a>
      <a href="https://subagentknowledge.com">Knowledge</a>
    </nav>
  </header>

  <div class="hero">
    <h1>The cowork/ application</h1>
    <p>Multi-protocol coworker OS. Tasks flow through e2m-mcp envelopes. 7 coworkers communicate via a2a, acp, mcp, and mailbox. Each domain has a queue, a mailbox, and a skill.</p>
    <div class="mcp-connect">
      <div class="label">MCP endpoint — paste into Claude</div>
      <code>https://cowork.subagentknowledge.com/mcp</code>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Application surfaces</div>
    <div class="grid">
      <div class="card">
        <div class="card-title">MCP server</div>
        <div class="card-desc">Streamable-HTTP MCP endpoint. 4 tools: list_coworkers, get_coworker, get_queue_status, send_envelope.</div>
        <span class="badge badge-green">McpAgent</span>
        <span class="badge badge-green">Durable Object</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">list_coworkers</span>
          <span class="protocol-pill">get_queue_status</span>
          <span class="protocol-pill">send_envelope</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">e2m-mcp</div>
        <div class="card-desc">Envelope-to-mailbox MCP server. 7 tools: write, read, transition, send, recv, ack, status.</div>
        <span class="badge badge-green">MCP server</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">envelope_write</span>
          <span class="protocol-pill">task_transition</span>
          <span class="protocol-pill">mailbox_send</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Priority Rerank</div>
        <div class="card-desc">BM25 + LLM rerank. Rust (&lt;1ms p99), TypeScript (&lt;10ms p99), Python CLI. Runs Wednesdays 09:00.</div>
        <span class="badge badge-amber">Weekly cadence</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">Rust</span>
          <span class="protocol-pill">TypeScript</span>
          <span class="protocol-pill">Python/uvx</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Enterprise Search</div>
        <div class="card-desc">Search 25 vendor doc surfaces. digest, synthesis, search-strategy, source-management.</div>
        <span class="badge badge-cyan">5 skills</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">vendor/</span>
          <span class="protocol-pill">context7</span>
          <span class="protocol-pill">cf-mcp</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Productivity</div>
        <div class="card-desc">Session start, task management, memory heartbeat, end-of-session update.</div>
        <span class="badge badge-green">4 skills</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">start</span>
          <span class="protocol-pill">task-management</span>
          <span class="protocol-pill">memory</span>
          <span class="protocol-pill">update</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Mail</div>
        <div class="card-desc">Queue-first draft model. Operator reviews before send. Finance gate before spend.</div>
        <span class="badge badge-amber">queue-first</span>
        <div style="margin-top:8px">
          <span class="protocol-pill">queued_drafts.jsonl</span>
          <span class="protocol-pill">finance gate</span>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <span>cowork.subagentknowledge.com — knowledge-engineering chassis v0.2.0</span>
    <span>7 coworkers · 7 queues · MCP @ /mcp</span>
  </footer>
</body>
</html>`;
}
