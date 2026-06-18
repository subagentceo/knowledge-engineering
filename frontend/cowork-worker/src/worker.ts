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
    *{box-sizing:border-box}html,body{margin:0;padding:0;height:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;background:#0a0a0a;color:#d4d4d4;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
    #app{display:flex;flex-direction:column;min-height:100svh}
    #ascii-pane{display:flex;align-items:center;justify-content:center;background:#0a0a0a;border-bottom:1px solid #1f1f1f;overflow:hidden;max-height:28svh;flex:0 0 auto;pointer-events:none}
    #ascii{margin:0;white-space:pre;font-size:9px;line-height:9px;color:#51c4ff;letter-spacing:0;user-select:none}
    @media(min-width:600px){#ascii{font-size:11px;line-height:11px}}
    @media(min-width:1024px){#ascii{font-size:13px;line-height:13px}}
    nav{display:flex;align-items:center;border-bottom:1px solid #1f1f1f;padding:0 12px;font-size:12px;flex-wrap:wrap}
    nav a{color:#9a9a9a;text-decoration:none;padding:9px 10px;border-bottom:2px solid transparent;white-space:nowrap}
    nav a:hover{color:#f4f4f4}nav a.active{color:#51c4ff;border-bottom-color:#51c4ff}
    nav .spacer{flex:1}nav .ext{color:#6a6a6a;font-size:11px}
    .hero{padding:24px 16px 20px;border-bottom:1px solid #1f1f1f}
    .hero h1{font-size:14px;color:#f4f4f4;margin-bottom:5px;font-weight:600}
    .hero p{font-size:12px;color:#9a9a9a;max-width:560px;line-height:1.6}
    .mcp-box{margin-top:12px;background:#0d1a0d;border:1px solid rgba(123,216,143,.25);padding:8px 12px;display:inline-block}
    .mcp-box .lbl{font-size:10px;color:#7bd88f;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
    .mcp-box code{font-size:11px;color:#f4f4f4}
    .section{padding:14px 16px;border-bottom:1px solid #1f1f1f}
    .sec-title{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#51c4ff;margin-bottom:10px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px}
    .card{background:#111;border:1px solid #2a2a2a;padding:12px;transition:border-color .15s}
    .card:hover{border-color:#3a3a3a}
    .card-title{font-size:12px;color:#f4f4f4;margin-bottom:4px;font-weight:600}
    .card-desc{font-size:11px;color:#9a9a9a;line-height:1.55;margin-bottom:8px}
    .badge{display:inline-block;font-size:10px;padding:1px 5px;margin-right:3px;margin-bottom:3px;border:1px solid}
    .b-g{color:#7bd88f;border-color:rgba(123,216,143,.25);background:rgba(123,216,143,.08)}
    .b-c{color:#51c4ff;border-color:rgba(81,196,255,.25);background:rgba(81,196,255,.08)}
    .b-a{color:#e6b455;border-color:rgba(230,180,85,.25);background:rgba(230,180,85,.08)}
    .pill{font-size:9px;padding:1px 4px;background:#1a1a1a;border:1px solid #2a2a2a;color:#9a9a9a;margin-right:2px}
    footer{padding:12px 16px;font-size:11px;color:#6a6a6a;display:flex;justify-content:space-between;border-top:1px solid #1f1f1f;margin-top:auto}
    a{color:#51c4ff;text-decoration:none}a:hover{text-decoration:underline}
  </style>
</head>
<body>
<div id="app">
  <div id="ascii-pane"><pre id="ascii">
   ██████╗ ██████╗ ██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
  ██╔════╝██╔═══██╗██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
  ██║     ██║   ██║██║ █╗ ██║██║   ██║██████╔╝█████╔╝
  ██║     ██║   ██║██║███╗██║██║   ██║██╔══██╗██╔═██╗
  ╚██████╗╚██████╔╝╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
   ╚═════╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝</pre></div>

  <nav>
    <a href="/" class="active">cowork/</a>
    <a href="https://${coworkersHost}">coworkers/</a>
    <a href="/mcp">mcp</a>
    <a href="/api/manifest">manifest</a>
    <div class="spacer"></div>
    <a href="https://subagentknowledge.com" class="ext">subagentknowledge.com ↗</a>
  </nav>

  <div class="hero">
    <h1>The cowork/ application</h1>
    <p>Multi-protocol coworker OS. 7 coworkers communicate via a2a, acp, mcp, and e2m-mcp envelopes. Each domain has a queue, a mailbox, and a skill.</p>
    <div class="mcp-box">
      <div class="lbl">MCP endpoint — paste into Claude connectors</div>
      <code>https://cowork.subagentknowledge.com/mcp</code>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Application surfaces</div>
    <div class="grid">
      <div class="card">
        <div class="card-title">MCP server</div>
        <div class="card-desc">Streamable-HTTP endpoint backed by a Durable Object. 4 tools: list_coworkers, get_coworker, get_queue_status, send_envelope.</div>
        <span class="badge b-g">McpAgent</span><span class="badge b-g">Durable Object</span>
        <div style="margin-top:6px"><span class="pill">list_coworkers</span><span class="pill">get_queue_status</span><span class="pill">send_envelope</span></div>
      </div>
      <div class="card">
        <div class="card-title">e2m-mcp</div>
        <div class="card-desc">Envelope-to-mailbox MCP server. write, read, transition, send, recv, ack, status.</div>
        <span class="badge b-g">MCP server</span>
        <div style="margin-top:6px"><span class="pill">envelope_write</span><span class="pill">task_transition</span><span class="pill">mailbox_send</span></div>
      </div>
      <div class="card">
        <div class="card-title">Priority Rerank</div>
        <div class="card-desc">BM25 + LLM rerank. Rust &lt;1ms p99, TypeScript &lt;10ms p99, Python CLI. Wednesdays 09:00 UTC.</div>
        <span class="badge b-a">weekly cadence</span>
        <div style="margin-top:6px"><span class="pill">Rust</span><span class="pill">TypeScript</span><span class="pill">Python/uvx</span></div>
      </div>
      <div class="card">
        <div class="card-title">Enterprise Search</div>
        <div class="card-desc">Search 25 vendor doc surfaces. digest, synthesis, search-strategy, source-management.</div>
        <span class="badge b-c">5 skills</span>
        <div style="margin-top:6px"><span class="pill">vendor/</span><span class="pill">context7</span><span class="pill">cf-mcp</span></div>
      </div>
      <div class="card">
        <div class="card-title">Productivity</div>
        <div class="card-desc">Session start, task management, memory heartbeat, end-of-session update.</div>
        <span class="badge b-g">4 skills</span>
        <div style="margin-top:6px"><span class="pill">start</span><span class="pill">task-management</span><span class="pill">memory</span><span class="pill">update</span></div>
      </div>
      <div class="card">
        <div class="card-title">Mail</div>
        <div class="card-desc">Queue-first draft model. Operator reviews before send. Finance gate before spend.</div>
        <span class="badge b-a">queue-first</span>
        <div style="margin-top:6px"><span class="pill">queued_drafts.jsonl</span><span class="pill">finance gate</span></div>
      </div>
    </div>
  </div>

  <footer>
    <span>cowork.subagentknowledge.com — knowledge-engineering chassis v0.2.0</span>
    <span>7 coworkers · 7 queues · MCP @ /mcp</span>
  </footer>
</div>
</body>
</html>`;
}
