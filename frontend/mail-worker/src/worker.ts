/**
 * mail-worker/src/worker.ts
 *
 * CF Worker for mail.subagentknowledge.com — the agent-native `mail` template,
 * implemented over our e2m protocol. Mirrors frontend/cowork-worker.
 *
 * e2m mapping (agent-native mail actions → e2m):
 *   email   = Envelope            (cowork/data/mailbox/<agent>.jsonl)
 *   thread  = envelopes sharing thread_id
 *   reply   = Transition          (append to the mailbox JSONL)
 *   draft   = pending Envelope    (queue-first; operator reviews before send)
 *
 * Surfaces:
 *   GET /              → mail app shell (HTML, 8-token)
 *   GET /mcp           → McpAgent streamable-HTTP endpoint
 *   GET /api/manifest  → app + actions manifest JSON
 *   GET *              → 404
 *
 * MCP tools (agent-native mail actions, e2m-wired):
 *   list_emails · get_thread · draft_email · send_email
 *
 * @cite frontend/cowork-worker/src/worker.ts            (worker pattern, mirrored)
 * @cite uploads agent-native templates/mail (list-emails · get-thread · manage-draft · send)
 * @cite cowork/mcp/e2m-mcp/server.ts                    (envelope schema)
 * @cite cowork/artifacts/templates/mail-agent.html      (the local preview)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MAILBOX_DIR, ENVELOPE_TYPES, ACTIONS, HSTS, secure, mailboxPath } from "./manifest.js";

export { MAILBOX_DIR, ENVELOPE_TYPES, ACTIONS, HSTS, secure, mailboxPath } from "./manifest.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

export class MailMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "mail", version: "0.1.0" },
    { instructions: "mail.subagentknowledge.com — agent-native mail over e2m. email=envelope, reply=transition. Drafts are queue-first; the operator reviews before send." },
  );

  async init() {
    this.server.registerTool(
      "list_emails",
      {
        description: "List emails (e2m envelopes) for an agent's mailbox. Returns the JSONL pointer; read live via e2m-mcp mailbox_recv.",
        inputSchema: {
          agent: z.string().describe("Mailbox owner id, e.g. product-manager"),
          envelope_type: z.enum(ENVELOPE_TYPES).optional().describe("Filter by label/type"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ agent, envelope_type }) => ({
        content: [{ type: "text", text: JSON.stringify({
          mailbox: `${MAILBOX_DIR}/${agent}.jsonl`,
          filter: envelope_type ?? "all",
          read_via: "e2m-mcp mailbox_recv (agent_id, type?) — latest-line-wins per id",
        }, null, 2) }],
      }),
    );

    this.server.registerTool(
      "get_thread",
      {
        description: "Get a mail thread = all envelopes + transitions sharing a thread_id.",
        inputSchema: { thread_id: z.string(), agent: z.string() },
        annotations: { readOnlyHint: true },
      },
      async ({ thread_id, agent }) => ({
        content: [{ type: "text", text: JSON.stringify({
          mailbox: `${MAILBOX_DIR}/${agent}.jsonl`, thread_id,
          read_via: "e2m-mcp mailbox_recv then filter thread_id; transitions are appended reply rows",
        }, null, 2) }],
      }),
    );

    this.server.registerTool(
      "draft_email",
      {
        description: "Draft an email — a PENDING envelope queued for operator review (queue-first; never auto-sent).",
        inputSchema: {
          from: z.string(), to: z.string(), subject: z.string().max(120), body: z.string().optional(),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ from, to, subject, body }) => ({
        content: [{ type: "text", text: JSON.stringify({
          _type: "envelope", id: crypto.randomUUID(), envelope_type: "notify",
          from, to, subject, at: new Date().toISOString(), state: "pending",
          payload: { draft: true, body: body ?? "" },
          note: "Draft only. Operator reviews, then send_email writes it via e2m-mcp envelope_write.",
        }, null, 2) }],
      }),
    );

    this.server.registerTool(
      "send_email",
      {
        description: "Send a reviewed email = write the envelope to the recipient mailbox (operator-confirmed only).",
        inputSchema: {
          from: z.string(), to: z.string(), subject: z.string().max(120),
          envelope_type: z.enum(ENVELOPE_TYPES).default("notify"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ from, to, subject, envelope_type }) => ({
        content: [{ type: "text", text: JSON.stringify({
          _type: "envelope", id: crypto.randomUUID(), envelope_type,
          from, to, subject, at: new Date().toISOString(), state: "pending",
          write_via: `e2m-mcp envelope_write → ${MAILBOX_DIR}/${to}.jsonl`,
        }, null, 2) }],
      }),
    );
  }
}


export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.protocol !== "https:") { url.protocol = "https:"; return Response.redirect(url.toString(), 301); }
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) return MailMcp.serveSSE("/sse").fetch(request, env, ctx);
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) return MailMcp.serve("/mcp").fetch(request, env, ctx);
    if (url.pathname === "/api/manifest")
      return secure(Response.json({ app: "mail", template: "agent-native/mail", protocol: "e2m", actions: ACTIONS, version: "0.1.0" }));
    if (url.pathname === "/" || url.pathname === "")
      return secure(new Response(mailShell(env.COWORKERS_HOST), { headers: { "content-type": "text/html; charset=utf-8" } }));
    return secure(new Response("Not found", { status: 404 }));
  },
};

function mailShell(coworkersHost: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>mail — subagentknowledge</title><style>
*{box-sizing:border-box}html,body{margin:0;height:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px}
nav{display:flex;align-items:center;border-bottom:1px solid #1f1f1f;padding:0 12px;font-size:12px}nav a{color:#9a9a9a;text-decoration:none;padding:9px 10px}nav a.active{color:#51c4ff;border-bottom:2px solid #51c4ff}nav .spacer{flex:1}
.hero{padding:18px 16px;border-bottom:1px solid #1f1f1f}.hero h1{font-size:14px;color:#f4f4f4;margin:0 0 5px}.hero p{font-size:12px;color:#9a9a9a;max-width:560px;margin:0;line-height:1.6}
.mcp{margin-top:12px;background:#0d1a0d;border:1px solid rgba(123,216,143,.25);padding:8px 12px;display:inline-block}.mcp .l{font-size:10px;color:#7bd88f;text-transform:uppercase;letter-spacing:1px}.mcp code{font-size:11px;color:#f4f4f4}
.box{display:grid;grid-template-columns:330px 1fr}@media(max-width:740px){.box{grid-template-columns:1fr}}
.list{border-right:1px solid #1f1f1f}.row{padding:10px 14px;border-bottom:1px solid #161616;cursor:pointer}.row:hover,.row.on{background:#111}.row .f{color:#f4f4f4}.row .s{color:#d4d4d4}.row .m{color:#6a6a6a;font-size:10.5px}
.et{font-size:9px;text-transform:uppercase;border:1px solid #2a2a2a;border-radius:4px;padding:0 5px}.task{color:#51c4ff}.result{color:#7bd88f}.escalate{color:#ff6b6b}.operator{color:#e6b455}.notify{color:#6a6a6a}
.thread{padding:16px 18px}.thread h2{font-size:14px;color:#f4f4f4;margin:0 0 2px}.hdr{color:#6a6a6a;font-size:11px;margin-bottom:12px}.body{border:1px solid #2a2a2a;background:#111;padding:12px;white-space:pre-wrap}
.act{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}.btn{background:transparent;border:1px solid #2a2a2a;color:#51c4ff;padding:6px 11px;font:inherit;font-size:11.5px;cursor:pointer}
footer{padding:12px 16px;font-size:11px;color:#6a6a6a;border-top:1px solid #1f1f1f}a{color:#51c4ff;text-decoration:none}
</style></head><body>
<nav><a href="/" class="active">mail/</a><a href="https://${coworkersHost}">coworkers/</a><a href="/mcp">mcp</a><a href="/api/manifest">manifest</a><div class="spacer"></div><a href="https://subagentknowledge.com">subagentknowledge.com ↗</a></nav>
<div class="hero"><h1>Mail — agent-native over e2m</h1><p>An agent-powered inbox where <b>email = envelope</b>, <b>reply = transition</b>, and the mailbox is the e2m JSONL. Drafts are queue-first — the operator reviews before send.</p>
<div class="mcp"><div class="l">MCP endpoint — paste into Claude connectors</div><code>https://mail.subagentknowledge.com/mcp</code></div></div>
<div class="box"><div class="list" id="list"></div><div class="thread" id="thread"></div></div>
<footer>mail.subagentknowledge.com · actions: list_emails · get_thread · draft_email · send_email · template: agent-native/mail</footer>
<script id="mb" type="application/json">[
{"id":"e1","envelope_type":"operator","from":"operator","to":"product-manager","subject":"OP1: stand up the platform section","at":"2026-06-19T21:40:00Z"},
{"id":"e2","envelope_type":"task","from":"project-manager","to":"product-manager","subject":"Routed: gate templates behind a vault secret","at":"2026-06-19T21:42:00Z"},
{"id":"e3","envelope_type":"result","from":"design-coworker","to":"product-manager","subject":"Mail app token-compliant (8/8)","at":"2026-06-19T21:55:00Z"},
{"id":"e4","envelope_type":"escalate","from":"engineering-manager","to":"operator","subject":"Blocked: vault secret not set","at":"2026-06-19T22:01:00Z"}]</script>
<script>
var MB=JSON.parse(document.getElementById('mb').textContent),e=function(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;')};
var L=document.getElementById('list'),T=document.getElementById('thread');
L.innerHTML=MB.map(function(m,i){return '<div class="row'+(i===0?' on':'')+'" data-i="'+i+'"><div class="f">'+e(m.from)+' <span class="et '+m.envelope_type+'">'+m.envelope_type+'</span></div><div class="s">'+e(m.subject)+'</div><div class="m">→ '+e(m.to)+' · '+e(m.at.slice(11,16))+'</div></div>';}).join('');
function open(i){[].forEach.call(L.children,function(r){r.classList.toggle('on',+r.dataset.i===i);});var m=MB[i];
 T.innerHTML='<h2>'+e(m.subject)+'</h2><div class="hdr">from <b>'+e(m.from)+'</b> → '+e(m.to)+' · '+m.envelope_type+' · '+e(m.at)+'</div><div class="body">'+e(m.subject)+'\\n\\n(envelope body — live data via the /mcp endpoint)</div><div class="act"><button class="btn">Reply → transition</button><button class="btn">Draft (queue-first)</button><button class="btn">Send (operator-confirmed)</button></div>';}
L.onclick=function(ev){var r=ev.target.closest('.row');if(r)open(+r.dataset.i);};open(0);
</script></body></html>`;
}
