/**
 * calendar-worker/src/worker.ts
 *
 * CF Worker for calendar.subagentknowledge.com — the agent-native `calendar`
 * template, implemented over our e2m protocol. Mirrors frontend/cowork-worker.
 *
 * e2m mapping (agent-native calendar actions → e2m):
 *   event          = scheduled DurableTask  (cowork/data/queues/<domain>.jsonl, with due_date)
 *   create-event   = envelope_write a task   (the manager cadence: WBR/MBR/QBR + the OP1 calendar)
 *   list-events    = read tasks with due_date
 *   availability   = query open queue slots
 *
 * Surfaces:
 *   GET /              → calendar app shell (HTML week view, 8-token)
 *   GET /sse           → McpAgent SSE transport (legacy clients)
 *   GET /mcp           → McpAgent streamable-HTTP endpoint
 *   GET /api/manifest  → app + actions manifest JSON
 *   GET *              → 404
 *
 * MCP tools: list_events · check_availability · create_event
 *
 * @cite frontend/calendar-worker/src/calendar.app.ts    (CalendarMcp DO)
 * @cite frontend/cowork-worker/src/worker.ts            (worker pattern, mirrored)
 * @cite uploads agent-native templates/calendar (list-events · check-availability · create-event)
 * @cite cowork/coworkers/operational-plan/operating-cadence.md  (the OP1 calendar)
 */

import { CalendarMcp } from "./calendar.app.js";
export { CalendarMcp } from "./calendar.app.js";
import { ACTIONS, HSTS, secure } from "./manifest.js";

export { ACTIONS, HSTS, secure, DOMAINS, QUEUE_DIR, queuePath } from "./manifest.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.protocol !== "https:") { url.protocol = "https:"; return Response.redirect(url.toString(), 301); }
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) return CalendarMcp.serveSSE("/sse").fetch(request, env, ctx);
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) return CalendarMcp.serve("/mcp").fetch(request, env, ctx);
    if (url.pathname === "/api/manifest")
      return secure(Response.json({ app: "calendar", template: "agent-native/calendar", protocol: "e2m", actions: ACTIONS, version: "0.1.0" }));
    if (url.pathname === "/" || url.pathname === "")
      return secure(new Response(calendarShell(env.COWORKERS_HOST), { headers: { "content-type": "text/html; charset=utf-8" } }));
    return secure(new Response("Not found", { status: 404 }));
  },
};

function calendarShell(coworkersHost: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>calendar — subagentknowledge</title><style>
*{box-sizing:border-box}html,body{margin:0;height:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px}
nav{display:flex;align-items:center;border-bottom:1px solid #1f1f1f;padding:0 12px;font-size:12px}nav a{color:#9a9a9a;text-decoration:none;padding:9px 10px}nav a.active{color:#51c4ff;border-bottom:2px solid #51c4ff}nav .spacer{flex:1}
.hero{padding:18px 16px;border-bottom:1px solid #1f1f1f}.hero h1{font-size:14px;color:#f4f4f4;margin:0 0 5px}.hero p{font-size:12px;color:#9a9a9a;max-width:580px;margin:0;line-height:1.6}
.mcp{margin-top:12px;background:#0d1a0d;border:1px solid rgba(123,216,143,.25);padding:8px 12px;display:inline-block}.mcp .l{font-size:10px;color:#7bd88f;text-transform:uppercase;letter-spacing:1px}.mcp code{font-size:11px;color:#f4f4f4}
.cal{display:grid;grid-template-columns:54px repeat(7,1fr);gap:6px;padding:14px 16px}.cal .h{color:#9a9a9a;font-size:11px;text-transform:uppercase;letter-spacing:.5px}.cal .t{color:#6a6a6a;font-size:10.5px}
.ev{background:#111;border:1px solid #2a2a2a;border-left:2px solid #51c4ff;padding:3px 6px;font-size:10.5px;color:#d4d4d4}.ev.op{border-left-color:#e6b455}.ev.gr{border-left-color:#7bd88f}.slot{min-height:26px}
footer{padding:12px 16px;font-size:11px;color:#6a6a6a;border-top:1px solid #1f1f1f}a{color:#51c4ff;text-decoration:none}
</style></head><body>
<nav><a href="/" class="active">calendar/</a><a href="https://${coworkersHost}">coworkers/</a><a href="/mcp">mcp</a><a href="/api/manifest">manifest</a><div class="spacer"></div><a href="https://subagentknowledge.com">subagentknowledge.com ↗</a></nav>
<div class="hero"><h1>Calendar — agent-native over e2m</h1><p>An agent-powered calendar where an <b>event = a scheduled DurableTask</b> (due_date) on a domain queue. This is the OP1 cadence surface — the WBR / MBR / QBR rhythm and the milestone calendar.</p>
<div class="mcp"><div class="l">MCP endpoint — paste into Claude connectors</div><code>https://calendar.subagentknowledge.com/mcp</code></div></div>
<div class="cal" id="cal"></div>
<footer>calendar.subagentknowledge.com · actions: list_events · check_availability · create_event · template: agent-native/calendar</footer>
<script>
var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],times=['09','11','13','15'];
var EV={'09-0':['Eng standup','gr'],'09-1':['Eng standup','gr'],'09-4':['WBR / morning summary','op'],'11-0':['OP1 review','op'],'11-3':['Roadmap',''],'13-1':['1:1',''],'15-3':['Skip-level','']};
var cal=document.getElementById('cal');var html='<div class="h"></div>'+days.map(function(d){return '<div class="h">'+d+'</div>';}).join('');
times.forEach(function(t,ti){html+='<div class="t">'+t+':00</div>';for(var d=0;d<7;d++){var k=t+'-'+d,ev=EV[k];html+='<div class="slot">'+(ev?'<div class="ev '+ev[1]+'">'+ev[0]+'</div>':'')+'</div>';}});
cal.innerHTML=html;
</script></body></html>`;
}
