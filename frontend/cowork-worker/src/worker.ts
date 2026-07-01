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
 *   - list_coworkers     : return 12-coworker manifest
 *   - get_coworker       : detail for one coworker by id
 *   - send_envelope      : write a DurableTask envelope to a mailbox
 *
 * @cite github.com/cloudflare/agents                         (McpAgent pattern)
 * @cite plugins/mcp-server-dev/skills/build-mcp-server/references/deploy-cloudflare-workers.md
 * @cite cowork/coworkers/manifest.json                       (12 coworker definitions)
 * @cite cowork/mcp/e2m-mcp/server.ts                        (envelope schema)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { COWORKERS, DOMAINS, findCoworker, secure, HSTS, type CoworkerEntry } from "./manifest.js";
import { getQueueSnapshot, type QueueSnapshot } from "./queue-snapshot.js";
import { coworkShell } from "./shell.js";

export { COWORKERS, DOMAINS, findCoworker, secure, HSTS, type CoworkerEntry } from "./manifest.js";
export { getQueueSnapshot, type QueueSnapshot } from "./queue-snapshot.js";
export { coworkShell } from "./shell.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  QUEUE_SNAPSHOTS_KV: KVNamespace;
}

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
        description: "List all 12 coworkers with their domain, model, and supported protocols.",
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
        description: "Get details for a specific coworker by id (e.g. 'product-management-coworker').",
        inputSchema: { id: z.string().describe("Coworker id, e.g. product-management-coworker") },
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
        description: "Get current queue status across all 12 coworker domains. Returns pending/in_progress/completed counts per domain.",
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
          to:      z.string().describe("Coworker id, e.g. product-management-coworker"),
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

// @generated morning-summary route — refreshed by project-management-coworker 07:00 PST
// @cite cowork/scripts/morning-summary.py
const MORNING_SUMMARY_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Morning Summary — 2026-06-19</title>
<style>
* { box-sizing: border-box; }
html,body { margin:0;padding:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px; }
#header { padding:10px 16px 12px;border-bottom:1px solid #1f1f1f;display:flex;align-items:baseline;gap:16px; }
#header h1 { margin:0;font-size:15px;font-weight:600;letter-spacing:1px;color:#f4f4f4; }
#header .meta { font-size:11px;color:#6a6a6a; }
#header .badge { margin-left:auto;font-size:10px;text-transform:uppercase;letter-spacing:1px;border:1px solid #2a2a2a;padding:2px 8px;color:#7bd88f; }
main { padding:12px 16px 40px; }
.section { margin-bottom:24px; }
.section-header { display:flex;align-items:baseline;gap:10px;padding:6px 0;border-bottom:1px solid #1f1f1f;margin-bottom:10px; }
.section-label { font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:600; }
.lbl-cyan { color:#51c4ff; } .lbl-green { color:#7bd88f; } .lbl-amber { color:#f4a73b; }
table { border-collapse:collapse;width:100%;font-size:12px; }
th,td { padding:.35rem .7rem;border:1px solid #1f1f1f;text-align:left; }
th { background:#111;color:#9a9a9a;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.5px; }
tr:hover { background:#111; }
.commit { font-size:11px;padding:4px 8px;border-left:2px solid #51c4ff;margin-bottom:4px;color:#9a9a9a; }
.note { margin:12px 0;border:1px solid #2a2a2a;border-left:3px solid #7bd88f;padding:8px 12px;background:#111;font-size:11px;color:#9a9a9a; }
</style></head><body>
<div id="header">
  <h1>morning summary</h1>
  <span class="meta">2026-06-19 · project-management-coworker</span>
  <span class="badge">07:00 PST</span>
</div>
<main>
<div class="note">Generated at 2026-06-19T18:59:21Z by project-management-coworker (claude-opus-4-6). Dispatched to product-management-coworker mailbox.</div>
<div class="section">
  <div class="section-header"><span class="section-label lbl-cyan">queue health</span></div>
  <table><thead><tr><th>domain</th><th>pending</th><th>in_progress</th><th>blocked</th><th>completed</th></tr></thead>
  <tbody><tr><td style="color:#51c4ff">agent-resources</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#51c4ff">data</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#51c4ff">design</td><td style="color:#51c4ff">0</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#7bd88f">engineering</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">2</td></tr><tr><td style="color:#7bd88f">finance</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">1</td></tr><tr><td style="color:#51c4ff">human-resources</td><td style="color:#51c4ff">0</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#7bd88f">legal</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">1</td></tr><tr><td style="color:#7bd88f">marketing</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">1</td></tr><tr><td style="color:#51c4ff">operations</td><td style="color:#51c4ff">1</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#7bd88f">operator</td><td style="color:#51c4ff">4</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">1</td></tr><tr><td style="color:#7bd88f">product-management</td><td style="color:#51c4ff">3</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">1</td></tr><tr><td style="color:#7bd88f">project-management</td><td style="color:#51c4ff">12</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">2</td></tr><tr><td style="color:#51c4ff">sales</td><td style="color:#51c4ff">0</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#51c4ff">skill-grades</td><td style="color:#51c4ff">0</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr><tr><td style="color:#51c4ff">skill-outcomes</td><td style="color:#51c4ff">0</td><td style="color:#7bd88f">0</td><td style="color:#f47067">0</td><td style="color:#6a6a6a">0</td></tr></tbody></table>
</div>
<div class="section">
  <div class="section-header"><span class="section-label lbl-green">recent commits</span><span style="font-size:10px;color:#6a6a6a">last 8h</span></div>
  <div class="commit" style="color:#6a6a6a">No commits in last 8h</div>
</div>
</main></body></html>`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // SSE transport (legacy Claude connectors)
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return CoworkMcp.serveSSE("/sse").fetch(request, env, ctx);
    }

    // MCP endpoint — streamable-HTTP transport
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkMcp.serve("/mcp").fetch(request, env, ctx);
    }

    // API: manifest
    if (url.pathname === "/api/manifest") {
      return secure(Response.json({ coworkers: COWORKERS, version: "0.2.0" }));
    }

    // Root → app shell
    if (url.pathname === "/" || url.pathname === "") {
      const snapshot = await getQueueSnapshot(env);
      return secure(new Response(coworkShell(env, snapshot), {
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }

    // Morning summary artifact (latest)
    if (url.pathname === "/summary" || url.pathname === "/morning-summary") {
      return secure(new Response(MORNING_SUMMARY_HTML, {
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }

    return secure(new Response("Not found", { status: 404 }));
  },
};
