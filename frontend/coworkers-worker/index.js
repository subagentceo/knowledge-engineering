// coworkers-worker — coworker directory + operator inbox + protocol matrix
// @cite cowork/coworkers/manifest.json
// @cite cowork/schemas/envelope.ts
// Deploy: wrangler deploy (custom domain: coworkers.subagentknowledge.com)

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
  background: rgba(10,10,10,.92); backdrop-filter: blur(8px); z-index: 10;
  padding-top: calc(10px + env(safe-area-inset-top));
}
#header h1 { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: 1px; color: #f4f4f4; }
#header .meta { font-size: 11px; color: #6a6a6a; }
#header .badge { margin-left: auto; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #2a2a2a; padding: 2px 8px; color: #51c4ff; }
nav {
  display: flex; gap: 0; overflow-x: auto; border-bottom: 1px solid #1f1f1f;
  scrollbar-width: none;
}
nav::-webkit-scrollbar { display: none; }
nav a {
  padding: 8px 14px; font-size: 11px; color: #6a6a6a; text-decoration: none;
  white-space: nowrap; border-bottom: 2px solid transparent;
}
nav a.active, nav a:hover { color: #51c4ff; border-bottom-color: #51c4ff; }
main { padding: 12px 16px calc(48px + env(safe-area-inset-bottom)); }
.section { margin-bottom: 28px; }
.section-header { display: flex; align-items: baseline; gap: 10px; padding: 6px 0; border-bottom: 1px solid #1f1f1f; margin-bottom: 12px; }
.section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.lbl-cyan { color: #51c4ff; } .lbl-green { color: #7bd88f; } .lbl-amber { color: #f4a73b; }
.lbl-red { color: #f47067; } .lbl-muted { color: #6a6a6a; } .lbl-purple { color: #c084fc; }
.coworker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
.cw-card {
  border: 1px solid #2a2a2a; padding: 12px 14px; background: #111;
  transition: border-color .15s;
}
.cw-card:hover { border-color: #51c4ff44; }
.cw-card.operator-card { border-color: #c084fc44; background: #110d1a; }
.cw-card h3 { margin: 0 0 4px; font-size: 13px; color: #f4f4f4; }
.cw-card .domain { font-size: 10px; color: #51c4ff; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 6px; }
.cw-card.operator-card .domain { color: #c084fc; }
.cw-card .desc { font-size: 11px; color: #9a9a9a; line-height: 1.5; margin-bottom: 8px; }
.cw-card .protos { display: flex; gap: 5px; flex-wrap: wrap; }
.proto-tag {
  font-size: 9px; padding: 1px 6px; border: 1px solid #2a2a2a; color: #6a6a6a;
  text-transform: uppercase; letter-spacing: .5px;
}
.proto-a2a { border-color: #51c4ff44; color: #51c4ff; }
.proto-e2m { border-color: #7bd88f44; color: #7bd88f; }
.proto-mcp { border-color: #f4a73b44; color: #f4a73b; }
.proto-acp { border-color: #c084fc44; color: #c084fc; }
.cw-card .trigger { font-size: 10px; color: #6a6a6a; margin-top: 8px; }
.cw-card .trigger code { color: #51c4ff; background: #0d1a2e; padding: 1px 5px; }
.cw-card .peers { font-size: 10px; color: #6a6a6a; margin-top: 4px; }
.model-badge { font-size: 9px; padding: 1px 6px; border: 1px solid #2a2a2a; color: #6a6a6a; margin-left: auto; }
.model-opus { border-color: #f4a73b44; color: #f4a73b; }
.model-sonnet { border-color: #51c4ff44; color: #51c4ff; }
.model-haiku { border-color: #7bd88f44; color: #7bd88f; }
.note { margin: 0 0 16px; border: 1px solid #2a2a2a; border-left: 3px solid #51c4ff; padding: 8px 12px; background: #111; font-size: 11px; color: #9a9a9a; }
table { border-collapse: collapse; width: 100%; font-size: 11px; }
th, td { padding: .3rem .6rem; border: 1px solid #1f1f1f; }
th { background: #111; color: #9a9a9a; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: .5px; }
.check { color: #7bd88f; } .dash { color: #2a2a2a; }
/* inbox */
.inbox { display: flex; flex-direction: column; gap: 8px; }
.envelope {
  border: 1px solid #2a2a2a; padding: 10px 12px; background: #111;
  display: flex; flex-direction: column; gap: 4px;
}
.envelope.priority-high { border-left: 3px solid #f47067; }
.envelope.priority-med  { border-left: 3px solid #f4a73b; }
.envelope.priority-low  { border-left: 3px solid #2a2a2a; }
.env-header { display: flex; align-items: center; gap: 8px; }
.env-type { font-size: 9px; text-transform: uppercase; letter-spacing: .5px; padding: 1px 6px; border: 1px solid #2a2a2a; }
.env-type-summary  { color: #51c4ff; border-color: #51c4ff44; }
.env-type-escalate { color: #f47067; border-color: #f4706744; }
.env-type-notify   { color: #f4a73b; border-color: #f4a73b44; }
.env-type-operator { color: #c084fc; border-color: #c084fc44; }
.env-from { font-size: 10px; color: #6a6a6a; }
.env-subject { font-size: 12px; color: #f4f4f4; }
.env-decision { margin-top: 4px; font-size: 10px; color: #f4a73b; }
.env-options { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.env-opt { font-size: 9px; padding: 2px 8px; border: 1px solid #f4a73b44; color: #f4a73b; cursor: pointer; }
.queue-task { border: 1px solid #2a2a2a; padding: 8px 12px; background: #111; font-size: 11px; }
.queue-task .qt-subject { color: #f4f4f4; margin-bottom: 4px; }
.queue-task .qt-meta { font-size: 10px; color: #6a6a6a; }
`;

// ── 13 coworkers + operator ────────────────────────────────────────────────
const COWORKERS = [
  { id: "operator", display: "Operator", domain: "operator",
    desc: "The human principal. Receives escalations, summaries, and decision requests from coworkers. Steers via skills — not interrupts. Has mailbox + queue.",
    trigger: "—", protocols: ["e2m-mcp"],
    peers: ["pm-coworker","project-management-coworker","legal-coworker"],
    model: "human", isOperator: true },
  { id: "pm-coworker", display: "Product Management", domain: "product-management",
    desc: "Lead orchestrator. Routes work, manages priority-rerank, assigns tasks to peer coworkers via e2m-mcp mailbox. Reports to operator.",
    trigger: "/pm-agent", protocols: ["a2a","e2m-mcp","mcp"],
    peers: ["project-management-coworker","engineering-coworker","design-coworker","legal-coworker"],
    model: "claude-sonnet-4-6" },
  { id: "project-management-coworker", display: "Project Management", domain: "project-management",
    desc: "Execution tracker. Nightly review (00:00), type-safety audit (06:00), morning summary (07:00). Reports to product-management. Uses opus-4-6 for high-effort tasks.",
    trigger: "/project-management-coworker", protocols: ["a2a","e2m-mcp","mcp"],
    peers: ["pm-coworker","engineering-coworker"],
    model: "claude-opus-4-6", modelBudget: "claude-opus-4-8" },
  { id: "engineering-coworker", display: "Engineering", domain: "engineering",
    desc: "TypeScript + Rust implementation. Owns cowork/mcp/, cowork/templates/, src/. Processes skill-gate DurableTasks.",
    trigger: "/engineering-coworker", protocols: ["a2a","e2m-mcp","mcp"],
    peers: ["pm-coworker","data-coworker"], model: "claude-haiku-4-5-20251001" },
  { id: "design-coworker", display: "Design", domain: "design",
    desc: "Design token + HTML artifact coworker. Owns cowork/artifacts/ and the 8-token design system.",
    trigger: "/design-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","engineering-coworker"], model: "claude-sonnet-4-6" },
  { id: "data-coworker", display: "Data", domain: "data",
    desc: "AlloyDB / Kimball DW coworker. Owns dw.* schema, dim_agent_templates, fact tables.",
    trigger: "/data-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","engineering-coworker"], model: "claude-haiku-4-5-20251001" },
  { id: "sales-coworker", display: "Sales", domain: "sales",
    desc: "Outreach + mail coworker. Owns cowork/apps/mail/, sales queue. All sends require operator approval.",
    trigger: "/sales-agent", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","finance-coworker"], model: "claude-haiku-4-5-20251001" },
  { id: "operations-coworker", display: "Operations", domain: "operations",
    desc: "CF Workers, scheduled tasks, deploy pipelines, subdomain provisioning.",
    trigger: "/run-operations", protocols: ["a2a","e2m-mcp","acp"],
    peers: ["pm-coworker","finance-coworker","engineering-coworker"], model: "claude-haiku-4-5-20251001" },
  { id: "finance-coworker", display: "Finance", domain: "finance",
    desc: "Cost tracking, vendor spend, budget gates, third-party cost entries.",
    trigger: "/finance-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","sales-coworker","operations-coworker"], model: "claude-haiku-4-5-20251001" },
  { id: "legal-coworker", display: "Legal", domain: "legal",
    desc: "NDA triage, compliance checks, contract review. Writes to cowork/apps/legal/. All correspondence queued.",
    trigger: "/legal-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","sales-coworker","engineering-coworker"], model: "claude-opus-4-6" },
  { id: "marketing-coworker", display: "Marketing", domain: "marketing",
    desc: "Brand, content, SEO, campaigns, competitive intelligence. All content queued for approval.",
    trigger: "/marketing-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","sales-coworker","legal-coworker"], model: "claude-sonnet-4-6" },
  { id: "agent-resources-coworker", display: "Agent Resources", domain: "agent-resources",
    desc: "HR for agents. Onboard new coworkers, upgrade skills, track ke_fit_score, retire agents.",
    trigger: "/agent-resources-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","engineering-coworker","human-resources-coworker"], model: "claude-sonnet-4-6" },
  { id: "human-resources-coworker", display: "Human Resources", domain: "human-resources",
    desc: "People ops for humans. Recruiting, onboarding, performance, comp, org planning. Drafts only.",
    trigger: "/human-resources-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","legal-coworker","finance-coworker","agent-resources-coworker"], model: "claude-sonnet-4-6" },
];

// ── operator inbox snapshot ────────────────────────────────────────────────
// In Phase 23 this will be live KV reads; for now static snapshot from
// cowork/data/mailbox/operator.jsonl at last deploy.
const OPERATOR_INBOX = [
  {
    envelope_type: "summary", from: "project-management-coworker", priority: 3,
    subject: "Session summary: local-model routing shipped, 12 DurableTasks queued",
    requires_decision: false,
    payload: "Branch claude/frontend-workers-dispatch-skill-2026-06-18 pushed. ~18k tokens/night saved when WSL local model online."
  },
  {
    envelope_type: "notify", from: "legal-coworker", priority: 4,
    subject: "NDA triage: subagentknowledge.com TOS — 7 issues, counsel review needed",
    requires_decision: true,
    decision_options: ["schedule-counsel-review", "defer-30-days", "draft-tos-now"],
    payload: "Classification: YELLOW. Risk: medium. No TOS draft exists. See cowork/apps/legal/nda-triage-2026-06-19.jsonl"
  },
  {
    envelope_type: "notify", from: "pm-coworker", priority: 3,
    subject: "coworkers.subagentknowledge.com rebuilt: 13 coworkers + operator inbox added",
    requires_decision: false,
    payload: "project-management card now visible. Envelope schema published at cowork/schemas/envelope.ts."
  },
];

const OPERATOR_QUEUE = [
  { subject: "Set OLLAMA_TAILSCALE_IP — verify local model connectivity", from: "project-management-coworker", ke_fit_score: 5 },
  { subject: "Decide: legal TOS path — counsel / defer / draft", from: "legal-coworker", ke_fit_score: 4 },
];

const PROTOCOL_MATRIX = [
  { proto: "a2a",     full: "agent-to-agent",         desc: "Direct peer invocation. Coworkers call each other by id without a broker.", color: "proto-a2a" },
  { proto: "e2m-mcp", full: "envelope-to-mailbox-mcp", desc: "Durable typed Envelopes via cowork/data/mailbox/<id>.jsonl. Canonical inter-coworker protocol. Schema: cowork/schemas/envelope.ts.", color: "proto-e2m" },
  { proto: "mcp",     full: "model-context-protocol",  desc: "Typed MCP tools exposed to models and peer coworkers.", color: "proto-mcp" },
  { proto: "acp",     full: "agent-client-protocol",   desc: "HTTP REST /run endpoints consumed by external clients.", color: "proto-acp" },
];

// ── helpers ───────────────────────────────────────────────────────────────
function protoTag(p) {
  const cls = p === 'a2a' ? 'proto-a2a' : p === 'e2m-mcp' ? 'proto-e2m' : p === 'mcp' ? 'proto-mcp' : 'proto-acp';
  return `<span class="proto-tag ${cls}">${p}</span>`;
}

function modelBadge(model, budget) {
  if (model === 'human') return `<span class="model-badge" style="color:#c084fc;border-color:#c084fc44">human</span>`;
  const short = model.replace('claude-','').replace('-20251001','').replace('-4-6','4.6').replace('-4-8','4.8').replace('-4-5','4.5');
  const cls = model.includes('opus') ? 'model-opus' : model.includes('sonnet') ? 'model-sonnet' : 'model-haiku';
  const budgetStr = budget ? ` / ${budget.replace('claude-','').replace('-4-8','4.8')}` : '';
  return `<span class="model-badge ${cls}">${short}${budgetStr}</span>`;
}

function renderCards() {
  const nonOp = COWORKERS.filter(c => !c.isOperator);
  const op = COWORKERS.find(c => c.isOperator);
  const cards = [op, ...nonOp].map(cw => `
    <div class="cw-card${cw.isOperator ? ' operator-card' : ''}" id="${cw.id}">
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">
        <h3 style="margin:0">${cw.display}</h3>
        ${modelBadge(cw.model, cw.modelBudget)}
      </div>
      <div class="domain">${cw.domain}</div>
      <div class="desc">${cw.desc}</div>
      <div class="protos">${cw.protocols.map(protoTag).join('')}</div>
      ${cw.trigger !== '—' ? `<div class="trigger">trigger: <code>${cw.trigger}</code></div>` : ''}
      <div class="peers">peers: ${cw.peers.slice(0,3).join(', ')}${cw.peers.length > 3 ? ` +${cw.peers.length-3}` : ''}</div>
    </div>`).join('');
  return cards;
}

function renderMatrix() {
  const protocols = ['a2a','e2m-mcp','mcp','acp'];
  const rows = COWORKERS.map(cw => {
    const cells = protocols.map(p =>
      cw.protocols.includes(p)
        ? `<td class="check" style="text-align:center">✓</td>`
        : `<td class="dash" style="text-align:center">·</td>`
    ).join('');
    const short = cw.model === 'human' ? 'human' : cw.model.replace('claude-','').replace('-20251001','');
    return `<tr><td style="color:${cw.isOperator?'#c084fc':'#f4f4f4'}">${cw.display}</td><td style="color:#6a6a6a;font-size:10px">${short}</td>${cells}</tr>`;
  }).join('');
  return `<table>
    <thead><tr>
      <th>coworker</th><th>model</th>
      ${protocols.map(p => `<th class="${p==='a2a'?'lbl-cyan':p==='e2m-mcp'?'lbl-green':p==='mcp'?'lbl-amber':'lbl-muted'}" style="text-align:center">${p}</th>`).join('')}
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderProtocols() {
  return PROTOCOL_MATRIX.map(p => `
    <div style="margin-bottom:8px;border:1px solid #2a2a2a;padding:8px 12px;background:#111">
      <div style="display:flex;gap:8px;align-items:baseline;margin-bottom:3px">
        ${protoTag(p.proto)}
        <span style="font-size:11px;color:#f4f4f4">${p.full}</span>
      </div>
      <div style="font-size:11px;color:#9a9a9a">${p.desc}</div>
    </div>`).join('');
}

function envTypeCls(t) {
  return t === 'summary' ? 'env-type-summary' : t === 'escalate' ? 'env-type-escalate' : t === 'notify' ? 'env-type-notify' : 'env-type-operator';
}

function renderInbox() {
  const envelopes = OPERATOR_INBOX.map(e => {
    const priCls = e.priority >= 4 ? 'priority-high' : e.priority === 3 ? 'priority-med' : 'priority-low';
    const opts = e.decision_options
      ? `<div class="env-decision">⚡ decision required</div>
         <div class="env-options">${e.decision_options.map(o => `<span class="env-opt">${o}</span>`).join('')}</div>`
      : '';
    return `<div class="envelope ${priCls}">
      <div class="env-header">
        <span class="env-type ${envTypeCls(e.envelope_type)}">${e.envelope_type}</span>
        <span class="env-from">from: ${e.from}</span>
      </div>
      <div class="env-subject">${e.subject}</div>
      <div style="font-size:10px;color:#6a6a6a;margin-top:2px">${e.payload}</div>
      ${opts}
    </div>`;
  }).join('');

  const queueRows = OPERATOR_QUEUE.map(t => `
    <div class="queue-task">
      <div class="qt-subject">${t.subject}</div>
      <div class="qt-meta">from: ${t.from} · ke_fit_score: ${t.ke_fit_score}</div>
    </div>`).join('');

  return `
    <div class="note" style="border-left-color:#c084fc">
      <strong style="color:#c084fc">Operator inbox</strong> — envelopes from coworkers requiring your attention.
      In Phase 23 this updates live from Cloudflare KV. Source: <code>cowork/data/mailbox/operator.jsonl</code>.
      Envelope schema: <code>cowork/schemas/envelope.ts</code>.
    </div>
    <div style="margin-bottom:14px">
      <div class="section-header" style="margin-bottom:8px">
        <span class="section-label lbl-purple">mailbox</span>
        <span class="lbl-muted" style="font-size:10px">${OPERATOR_INBOX.length} messages</span>
      </div>
      <div class="inbox">${envelopes}</div>
    </div>
    <div>
      <div class="section-header" style="margin-bottom:8px">
        <span class="section-label lbl-amber">queue</span>
        <span class="lbl-muted" style="font-size:10px">${OPERATOR_QUEUE.length} pending tasks</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">${queueRows}</div>
    </div>`;
}

function html(deployedAt) {
  const cwCount = COWORKERS.filter(c => !c.isOperator).length;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>coworkers — knowledge-engineering</title>
<style>${CSS}</style>
</head>
<body>
<div id="header">
  <h1>coworkers</h1>
  <span class="meta">${cwCount} coworkers · 4 protocols</span>
  <span class="badge">v0.3</span>
</div>
<nav>
  <a href="#directory" class="active">directory</a>
  <a href="#inbox">operator inbox</a>
  <a href="#matrix">protocol matrix</a>
  <a href="#protocols">protocols</a>
  <a href="https://cowork.subagentknowledge.com">cowork ↗</a>
  <span style="margin-left:auto;padding:8px 14px;font-size:10px;color:#3a3a3a">${deployedAt}</span>
</nav>
<main>

<div class="note">
  Coworkers communicate via 4 peer protocols: <strong>a2a</strong> (direct peer),
  <strong>e2m-mcp</strong> (typed <a href="#protocols" style="color:#7bd88f">Envelope</a> → mailbox JSONL),
  <strong>mcp</strong> (typed tools), <strong>acp</strong> (HTTP REST).
  <strong style="color:#c084fc">operator</strong> is a first-class participant with mailbox + queue.
  Schema: <code>cowork/schemas/envelope.ts</code>.
</div>

<div class="section" id="directory">
  <div class="section-header">
    <span class="section-label lbl-cyan">directory</span>
    <span class="lbl-muted" style="font-size:10px">${cwCount} coworkers + operator</span>
  </div>
  <div class="coworker-grid">${renderCards()}</div>
</div>

<div class="section" id="inbox">
  <div class="section-header">
    <span class="section-label lbl-purple">operator inbox</span>
    <span class="lbl-muted" style="font-size:10px">cowork/data/mailbox/operator.jsonl</span>
  </div>
  ${renderInbox()}
</div>

<div class="section" id="matrix">
  <div class="section-header">
    <span class="section-label lbl-amber">protocol matrix</span>
    <span class="lbl-muted" style="font-size:10px">coworker × protocol</span>
  </div>
  ${renderMatrix()}
</div>

<div class="section" id="protocols">
  <div class="section-header">
    <span class="section-label lbl-green">peer protocols</span>
    <span class="lbl-muted" style="font-size:10px">e2m-mcp: envelope → mailbox</span>
  </div>
  ${renderProtocols()}
  <div style="margin-top:12px;border:1px solid #2a2a2a;padding:10px 12px;background:#111;font-size:11px;color:#9a9a9a">
    <strong style="color:#7bd88f">Envelope</strong> is the canonical wrapper for all e2m-mcp messages.
    Fields: <code>_type:"envelope"</code>, <code>envelope_type</code>, <code>from</code>, <code>to</code>,
    <code>subject</code>, <code>at</code>, <code>state</code>, <code>payload</code>, <code>requires_decision</code>.
    Coworkers MUST emit typed Envelopes — never raw JSON blobs.
    Source: <code>cowork/schemas/envelope.ts</code>.
  </div>
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
                 'Cache-Control': 'public,max-age=300' }
    });
  }
};

// Durable Object stub — required by existing binding (namespace_id: d92ab82b768b49d0b254f15476c6446c)
export class CoworkersMcp {
  constructor(state, env) { this.state = state; this.env = env; }
  async fetch(request) {
    return new Response("CoworkersMcp DO not in use on this endpoint", { status: 404 });
  }
}
