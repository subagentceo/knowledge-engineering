// cowork-worker — live operations dashboard
// @cite cowork/coworkers/manifest.json
// @cite cowork/data/queues/*.jsonl  (read at request time via KV or inline JSON)
// Deploy: wrangler deploy (custom domain: cowork.subagentknowledge.com)

const CSS = `* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0;
  font-family: ui-monospace, SFMono-Regular, "Menlo", "Monaco", "Consolas", monospace;
  background: #0a0a0a; color: #d4d4d4;
  -webkit-font-smoothing: antialiased; font-size: 13px;
}
#header {
  padding: 10px 16px 12px; border-bottom: 1px solid #1f1f1f;
  display: flex; align-items: baseline; gap: 16px; position: sticky; top: 0;
  background: #0a0a0a; z-index: 10;
}
#header h1 { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: 1px; color: #f4f4f4; }
#header .meta { font-size: 11px; color: #6a6a6a; }
#header .badge { margin-left: auto; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #2a2a2a; padding: 2px 8px; color: #51c4ff; }
nav { padding: 6px 16px; border-bottom: 1px solid #1f1f1f; font-size: 11px; color: #6a6a6a; display: flex; gap: 16px; flex-wrap: wrap; }
nav a { color: #51c4ff; text-decoration: none; }
main { padding: 12px 16px 40px; }
.section { margin-bottom: 24px; }
.section-header { display: flex; align-items: baseline; gap: 10px; padding: 6px 0; border-bottom: 1px solid #1f1f1f; margin-bottom: 10px; }
.section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.lbl-cyan { color: #51c4ff; } .lbl-green { color: #7bd88f; } .lbl-amber { color: #f4a73b; } .lbl-red { color: #f47067; } .lbl-muted { color: #6a6a6a; }
.pill { display: inline-block; font-size: 10px; padding: 1px 7px; border-radius: 2px; letter-spacing: .5px; text-transform: uppercase; }
.pill-pending  { background: #1a1a2e; color: #51c4ff; border: 1px solid #51c4ff44; }
.pill-progress { background: #1a2e1a; color: #7bd88f; border: 1px solid #7bd88f44; }
.pill-done     { background: #1a1a1a; color: #6a6a6a; border: 1px solid #2a2a2a; }
.pill-blocked  { background: #2e1a1a; color: #f47067; border: 1px solid #f4706744; }
table { border-collapse: collapse; width: 100%; font-size: 12px; }
th, td { padding: .35rem .7rem; border: 1px solid #1f1f1f; text-align: left; }
th { background: #111; color: #9a9a9a; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: .5px; }
tr:hover { background: #111; }
.ts { color: #6a6a6a; font-size: 10px; }
.ke-5 { color: #7bd88f; } .ke-4 { color: #b8d88f; } .ke-3 { color: #f4a73b; } .ke-2,.ke-1 { color: #f47067; }
.note { margin: 12px 0; border: 1px solid #2a2a2a; border-left: 3px solid #51c4ff; padding: 8px 12px; background: #111; font-size: 11px; color: #9a9a9a; }
.queue-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
@media(max-width:600px) { .queue-grid { grid-template-columns: 1fr; } }
.queue-card { border: 1px solid #2a2a2a; padding: 10px 14px; background: #111; }
.queue-card h3 { margin: 0 0 6px; font-size: 12px; color: #f4f4f4; }
.queue-stat { display: flex; justify-content: space-between; font-size: 11px; margin: 3px 0; }
.queue-stat .label { color: #6a6a6a; }
.queue-stat .val-pending { color: #51c4ff; }
.queue-stat .val-progress { color: #7bd88f; }
.queue-stat .val-blocked { color: #f47067; }
.queue-stat .val-done { color: #6a6a6a; }
.msg-card { margin-bottom: 8px; border: 1px solid #2a2a2a; padding: 8px 12px; background: #111; font-size: 11px; }
.msg-card .msg-head { display: flex; gap: 8px; align-items: baseline; margin-bottom: 3px; }
.msg-card .from { color: #51c4ff; } .msg-card .to { color: #7bd88f; }
.msg-card .subj { color: #f4f4f4; flex:1; }
.msg-card .body { color: #9a9a9a; }
.stat-row { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 16px; }
.stat-box { border: 1px solid #2a2a2a; padding: 10px 16px; background: #111; min-width: 120px; }
.stat-box .stat-val { font-size: 24px; font-weight: 700; color: #51c4ff; }
.stat-box .stat-lbl { font-size: 10px; color: #6a6a6a; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
#refresh { background: none; border: 1px solid #2a2a2a; color: #51c4ff; padding: 2px 10px; font-family: inherit; font-size: 11px; cursor: pointer; }
#refresh:hover { background: #111; }
#last-refresh { font-size: 10px; color: #6a6a6a; margin-left: 8px; }`;

// Queue data is embedded at deploy time OR fetched from KV if wired up.
// For now: static snapshot approach — operator re-deploys to refresh.
// Next iteration: wire to R2 bucket that cowork/scripts/export-queues.sh writes.
const QUEUES = {
  "product-management": { pending: 3, in_progress: 0, blocked: 0, completed: 4 },
  "engineering":        { pending: 59, in_progress: 0, blocked: 0, completed: 1 },
  "design":             { pending: 1, in_progress: 0, blocked: 0, completed: 0 },
  "data":               { pending: 0, in_progress: 0, blocked: 0, completed: 1 },
  "sales":              { pending: 3, in_progress: 0, blocked: 0, completed: 0 },
  "finance":            { pending: 0, in_progress: 0, blocked: 0, completed: 1 },
  "marketing":          { pending: 1, in_progress: 0, blocked: 0, completed: 0 },
  "legal":              { pending: 1, in_progress: 0, blocked: 0, completed: 0 },
  "operations":         { pending: 0, in_progress: 0, blocked: 0, completed: 0 },
  "agent-resources":    { pending: 1, in_progress: 0, blocked: 0, completed: 0 },
  "human-resources":    { pending: 1, in_progress: 0, blocked: 0, completed: 0 },
};

const RECENT_MESSAGES = [
  { from: "finance-coworker", to: "pm-coworker", subject: "Cloudflare Worker spend tracked ($0.00 infrastructure)", state: "completed", at: "2026-06-19T01:28Z" },
  { from: "pm-coworker", to: "sales-coworker", subject: "Bootstrap: draft outreach for cowork.subagentknowledge.com launch", state: "pending", at: "2026-06-18T22:00Z" },
  { from: "pm-coworker", to: "design-coworker", subject: "Audit 11 cowork/ templates for design token compliance", state: "pending", at: "2026-06-18T21:04Z" },
  { from: "pm-coworker", to: "operations-coworker", subject: "Deploy cowork-frontend + coworkers-frontend CF Workers", state: "pending", at: "2026-06-18T22:00Z" },
  { from: "pm-coworker", to: "legal-coworker", subject: "Bootstrap: triage-nda for subagentknowledge.com TOS", state: "pending", at: "2026-06-19T04:00Z" },
  { from: "pm-coworker", to: "marketing-coworker", subject: "Bootstrap: competitive-brief for multi-agent orchestration space", state: "pending", at: "2026-06-19T04:00Z" },
];

const TOP_TASKS = [
  { id: "b0000001", queue: "product-management", subject: "Deploy cowork-frontend Worker to cowork.subagentknowledge.com", ke: 5, state: "pending" },
  { id: "b0000002", queue: "product-management", subject: "Deploy coworkers-frontend Worker to coworkers.subagentknowledge.com", ke: 5, state: "pending" },
  { id: "skill-gate-001", queue: "engineering", subject: "Skill gate: structured-prompt-formatter D2_durability score=0 (threshold=2)", ke: 4, state: "pending" },
  { id: "sales-001", queue: "sales", subject: "Bootstrap sales-coworker: draft outreach for cowork.subagentknowledge.com launch", ke: 5, state: "pending" },
  { id: "ar-001", queue: "agent-resources", subject: "Audit cowork/coworkers/manifest.json — confirm all 11 SKILL.md files exist", ke: 5, state: "pending" },
];

function pillHtml(state) {
  const cls = state === 'pending' ? 'pill-pending' : state === 'in_progress' ? 'pill-progress' : state === 'completed' ? 'pill-done' : 'pill-blocked';
  return `<span class="pill ${cls}">${state}</span>`;
}

function renderQueues() {
  let total_pending = 0, total_done = 0;
  let cards = '';
  for (const [name, q] of Object.entries(QUEUES)) {
    total_pending += q.pending;
    total_done += q.completed;
    const total = q.pending + q.in_progress + q.blocked + q.completed;
    cards += `<div class="queue-card">
      <h3>${name}</h3>
      <div class="queue-stat"><span class="label">pending</span><span class="val-pending">${q.pending}</span></div>
      <div class="queue-stat"><span class="label">in_progress</span><span class="val-progress">${q.in_progress}</span></div>
      <div class="queue-stat"><span class="label">blocked</span><span class="val-blocked">${q.blocked}</span></div>
      <div class="queue-stat"><span class="label">completed</span><span class="val-done">${q.completed}</span></div>
    </div>`;
  }
  return { cards, total_pending, total_done };
}

function renderMessages() {
  return RECENT_MESSAGES.map(m => `
    <div class="msg-card">
      <div class="msg-head">
        <span class="from">${m.from}</span>
        <span style="color:#6a6a6a">→</span>
        <span class="to">${m.to}</span>
        ${pillHtml(m.state)}
        <span class="ts">${m.at}</span>
      </div>
      <div class="subj">${m.subject}</div>
    </div>`).join('');
}

function renderTopTasks() {
  return `<table>
    <thead><tr><th>queue</th><th>subject</th><th>ke_fit</th><th>state</th></tr></thead>
    <tbody>${TOP_TASKS.map(t => `<tr>
      <td class="lbl-cyan">${t.queue}</td>
      <td>${t.subject}</td>
      <td class="ke-${t.ke}">${t.ke}</td>
      <td>${pillHtml(t.state)}</td>
    </tr>`).join('')}</tbody>
  </table>`;
}

function html(deployedAt) {
  const { cards, total_pending, total_done } = renderQueues();
  const coworkers_url = 'https://coworkers.subagentknowledge.com';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>cowork — knowledge-engineering ops</title>
<style>${CSS}</style>
</head>
<body>
<div id="header">
  <h1>cowork</h1>
  <span class="meta">knowledge-engineering · ops dashboard</span>
  <span class="badge">live</span>
</div>
<nav>
  <a href="/">dashboard</a>
  <a href="/queues">queues</a>
  <a href="/messages">messages</a>
  <a href="${coworkers_url}">coworkers ↗</a>
  <a href="https://github.com/subagentceo/knowledge-engineering" target="_blank">github ↗</a>
  <span style="margin-left:auto;color:#6a6a6a">deployed ${deployedAt}</span>
</nav>
<main>

<div class="stat-row">
  <div class="stat-box"><div class="stat-val">${total_pending}</div><div class="stat-lbl">tasks pending</div></div>
  <div class="stat-box"><div class="stat-val">${total_done}</div><div class="stat-lbl">completed</div></div>
  <div class="stat-box"><div class="stat-val">${Object.keys(QUEUES).length}</div><div class="stat-lbl">domains</div></div>
  <div class="stat-box"><div class="stat-val">11</div><div class="stat-lbl">coworkers</div></div>
</div>

<div class="note">
  <strong>Queue data</strong> is a static snapshot embedded at deploy time.
  To refresh: run <code>cowork/scripts/export-queues.sh</code> then <code>wrangler deploy</code>.
  Next: wire to R2 for live reads.
</div>

<div class="section">
  <div class="section-header">
    <span class="section-label lbl-cyan">top tasks</span>
    <span class="lbl-muted" style="font-size:10px">highest ke_fit_score pending</span>
  </div>
  ${renderTopTasks()}
</div>

<div class="section">
  <div class="section-header">
    <span class="section-label lbl-amber">queue status</span>
    <span class="lbl-muted" style="font-size:10px">all 11 domains</span>
  </div>
  <div class="queue-grid">${cards}</div>
</div>

<div class="section">
  <div class="section-header">
    <span class="section-label lbl-green">recent messages</span>
    <span class="lbl-muted" style="font-size:10px">coworker mailbox activity</span>
  </div>
  ${renderMessages()}
</div>

</main>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const deployedAt = new Date().toISOString().slice(0,16).replace('T',' ') + ' UTC';
    return new Response(html(deployedAt), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8',
                 'Cache-Control': 'public,max-age=60' }
    });
  }
};

// Durable Object stub — required by existing binding (namespace_id: 911009528f624617874e6a8951f69ab3)
// The binding is kept for future MCP-over-DO use; this worker serves static HTML.
export class CoworkMcp {
  constructor(state, env) { this.state = state; this.env = env; }
  async fetch(request) {
    return new Response("CoworkMcp DO not in use on this endpoint", { status: 404 });
  }
}
