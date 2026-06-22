/**
 * plan-worker/src/worker.ts
 *
 * CF Worker for plan.subagentknowledge.com — agent-native plan template
 * over e2m. A plan = a group of DurableTasks with dependencies, milestones,
 * and owners.
 *
 * @cite https://www.agent-native.com/docs/template-plan
 * @cite frontend/cowork-worker/src/worker.ts (worker pattern)
 * @cite cowork/templates/task-state-machine.ts
 */

import { PlanMcp } from "./plan.app.js";
export { PlanMcp } from "./plan.app.js";
import { ACTIONS, HSTS, secure, DOMAINS } from "./manifest.js";

export { ACTIONS, HSTS, secure, DOMAINS, PLAN_STATES, queuePath } from "./manifest.js";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_HOST: string;
  SITE_NAME: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.protocol !== "https:") { url.protocol = "https:"; return Response.redirect(url.toString(), 301); }
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) return PlanMcp.serveSSE("/sse").fetch(request, env, ctx);
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) return PlanMcp.serve("/mcp").fetch(request, env, ctx);
    if (url.pathname === "/api/manifest")
      return secure(Response.json({ app: "plan", template: "agent-native/plan", protocol: "e2m", actions: [...ACTIONS], version: "0.1.0" }));
    if (url.pathname === "/" || url.pathname === "")
      return secure(new Response(planShell(env.COWORKERS_HOST), { headers: { "content-type": "text/html; charset=utf-8" } }));
    return secure(new Response("Not found", { status: 404 }));
  },
};

function planShell(coworkersHost: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>plan — subagentknowledge</title><style>
*{box-sizing:border-box}html,body{margin:0;height:100%;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px}
nav{display:flex;align-items:center;border-bottom:1px solid #1f1f1f;padding:0 12px;font-size:12px}nav a{color:#9a9a9a;text-decoration:none;padding:9px 10px}nav a.active{color:#51c4ff;border-bottom:2px solid #51c4ff}nav .spacer{flex:1}
.hero{padding:18px 16px;border-bottom:1px solid #1f1f1f}.hero h1{font-size:14px;color:#f4f4f4;margin:0 0 5px}.hero p{font-size:12px;color:#9a9a9a;max-width:580px;margin:0;line-height:1.6}
.mcp{margin-top:12px;background:#0d1a0d;border:1px solid rgba(123,216,143,.25);padding:8px 12px;display:inline-block}.mcp .l{font-size:10px;color:#7bd88f;text-transform:uppercase;letter-spacing:1px}.mcp code{font-size:11px;color:#f4f4f4}
.board{display:flex;gap:8px;padding:14px 16px;overflow-x:auto;min-height:300px}
.col{flex:0 0 200px;background:#111;border:1px solid #2a2a2a;padding:10px}
.col-title{font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #1f1f1f}
.col-title.draft{color:#6a6a6a}.col-title.active{color:#51c4ff}.col-title.progress{color:#e6b455}.col-title.done{color:#7bd88f}.col-title.archived{color:#9a9a9a}
.card{background:#0a0a0a;border:1px solid #2a2a2a;border-left:2px solid #51c4ff;padding:8px;margin-bottom:6px;font-size:11px}
.card .t{color:#f4f4f4;margin-bottom:3px}.card .m{color:#6a6a6a;font-size:10px}
.card.op{border-left-color:#e6b455}.card.gr{border-left-color:#7bd88f}
footer{padding:12px 16px;font-size:11px;color:#6a6a6a;border-top:1px solid #1f1f1f}a{color:#51c4ff;text-decoration:none}
</style></head><body>
<nav><a href="/" class="active">plan/</a><a href="https://${coworkersHost}">coworkers/</a><a href="/mcp">mcp</a><a href="/api/manifest">manifest</a><div class="spacer"></div><a href="https://subagentknowledge.com">subagentknowledge.com &nearr;</a></nav>
<div class="hero"><h1>Plan — agent-native over e2m</h1><p>A <b>plan</b> groups DurableTasks with dependencies, milestones, and owners. Plans are the coordination surface for multi-coworker execution — the OP1 cadence, sprint plans, and project roadmaps.</p>
<div class="mcp"><div class="l">MCP endpoint</div><code>https://plan.subagentknowledge.com/mcp</code></div></div>
<div class="board" id="board"></div>
<footer>plan.subagentknowledge.com &middot; actions: list_plans &middot; get_plan &middot; create_plan &middot; update_plan_status &middot; template: agent-native/plan</footer>
<script>
var COLS=[{id:'draft',title:'Draft',cls:'draft'},{id:'active',title:'Active',cls:'active'},{id:'in_progress',title:'In Progress',cls:'progress'},{id:'done',title:'Done',cls:'done'},{id:'archived',title:'Archived',cls:'archived'}];
var PLANS=[
{col:'active',title:'Type-safety batch',owner:'engineering-coworker',tasks:'495 tests',cls:''},
{col:'active',title:'Email routing setup',owner:'operations-coworker',tasks:'12 addresses',cls:'op'},
{col:'in_progress',title:'Plan worker deploy',owner:'engineering-coworker',tasks:'4 MCP tools',cls:''},
{col:'done',title:'Manifest validation',owner:'product-management-coworker',tasks:'16 tests',cls:'gr'},
{col:'done',title:'e2m migration',owner:'engineering-coworker',tasks:'317 records',cls:'gr'},
{col:'draft',title:'Sprint 2026-W26',owner:'project-management-coworker',tasks:'roadmap',cls:'op'}
];
var b=document.getElementById('board');
b.innerHTML=COLS.map(function(c){var cards=PLANS.filter(function(p){return p.col===c.id;}).map(function(p){return '<div class="card '+p.cls+'"><div class="t">'+p.title+'</div><div class="m">'+p.owner.replace('-coworker','')+'  &middot; '+p.tasks+'</div></div>';}).join('');return '<div class="col"><div class="col-title '+c.cls+'">'+c.title+'</div>'+cards+'</div>';}).join('');
</script></body></html>`;
}
