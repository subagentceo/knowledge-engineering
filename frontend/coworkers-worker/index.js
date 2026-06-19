// coworkers-worker — coworker directory + protocol matrix
// @cite cowork/coworkers/manifest.json
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
  background: #0a0a0a; z-index: 10;
}
#header h1 { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: 1px; color: #f4f4f4; }
#header .meta { font-size: 11px; color: #6a6a6a; }
#header .badge { margin-left: auto; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #2a2a2a; padding: 2px 8px; color: #51c4ff; }
nav { padding: 6px 16px; border-bottom: 1px solid #1f1f1f; font-size: 11px; color: #6a6a6a; display: flex; gap: 16px; flex-wrap: wrap; }
nav a { color: #51c4ff; text-decoration: none; }
main { padding: 12px 16px 48px; }
.section { margin-bottom: 28px; }
.section-header { display: flex; align-items: baseline; gap: 10px; padding: 6px 0; border-bottom: 1px solid #1f1f1f; margin-bottom: 12px; }
.section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.lbl-cyan { color: #51c4ff; } .lbl-green { color: #7bd88f; } .lbl-amber { color: #f4a73b; } .lbl-red { color: #f47067; } .lbl-muted { color: #6a6a6a; }
.coworker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
.cw-card {
  border: 1px solid #2a2a2a; padding: 12px 14px; background: #111;
  transition: border-color .15s;
}
.cw-card:hover { border-color: #51c4ff44; }
.cw-card h3 { margin: 0 0 4px; font-size: 13px; color: #f4f4f4; }
.cw-card .domain { font-size: 10px; color: #51c4ff; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 6px; }
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
.note { margin: 12px 0; border: 1px solid #2a2a2a; border-left: 3px solid #51c4ff; padding: 8px 12px; background: #111; font-size: 11px; color: #9a9a9a; }
table { border-collapse: collapse; width: 100%; font-size: 11px; }
th, td { padding: .3rem .6rem; border: 1px solid #1f1f1f; }
th { background: #111; color: #9a9a9a; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: .5px; }
.check { color: #7bd88f; } .dash { color: #2a2a2a; }
.plugin-list { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 10px; }
.plugin-tag { font-size: 9px; padding: 1px 7px; border: 1px solid #2a2a2a; color: #6a6a6a; background: #0a0a0a; }
`;

const COWORKERS = [
  // TODO: pm-coworker → product-management-coworker (operator decision pending)
  { id: "pm-coworker", display: "Product Management", domain: "product-management",
    desc: "Lead orchestrator. Routes work, manages priority-rerank, assigns tasks to peer coworkers via e2m-mcp mailbox_send.",
    trigger: "/pm-agent", protocols: ["a2a","e2m-mcp","mcp"],
    peers: ["engineering-coworker","design-coworker","data-coworker","sales-coworker","operations-coworker","finance-coworker"],
    model: "claude-sonnet-4-6" },
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
    desc: "NDA triage, compliance checks, contract review, vendor due-diligence. All correspondence queued.",
    trigger: "/legal-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","sales-coworker","engineering-coworker"], model: "claude-sonnet-4-6" },
  { id: "marketing-coworker", display: "Marketing", domain: "marketing",
    desc: "Brand, content, SEO, campaigns, competitive intelligence. All content queued for approval.",
    trigger: "/marketing-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","sales-coworker","legal-coworker"], model: "claude-sonnet-4-6" },
  { id: "agent-resources-coworker", display: "Agent Resources", domain: "agent-resources",
    desc: "HR for agents. Onboard new coworkers, upgrade skills, track performance (ke_fit_score), retire agents.",
    trigger: "/agent-resources-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","engineering-coworker","human-resources-coworker"], model: "claude-sonnet-4-6" },
  { id: "human-resources-coworker", display: "Human Resources", domain: "human-resources",
    desc: "People ops for humans. Recruiting, onboarding, performance, comp, org planning. Drafts only.",
    trigger: "/human-resources-coworker", protocols: ["a2a","e2m-mcp"],
    peers: ["pm-coworker","legal-coworker","finance-coworker","agent-resources-coworker"], model: "claude-sonnet-4-6" },
];

const PROTOCOL_MATRIX = [
  { proto: "a2a", full: "agent-to-agent", desc: "Direct peer invocation — coworkers call each other by id without a broker.", color: "proto-a2a" },
  { proto: "e2m-mcp", full: "envelope-to-mailbox-mcp", desc: "JSONL durable queue — typed DurableTask envelopes via cowork/mcp/e2m-mcp/server.ts.", color: "proto-e2m" },
  { proto: "mcp", full: "model-context-protocol", desc: "Typed MCP tools exposed to models and other coworkers.", color: "proto-mcp" },
  { proto: "acp", full: "agent-client-protocol", desc: "HTTP REST — /run endpoints consumed by external clients.", color: "proto-acp" },
];

function protoTag(p) {
  const cls = p === 'a2a' ? 'proto-a2a' : p === 'e2m-mcp' ? 'proto-e2m' : p === 'mcp' ? 'proto-mcp' : 'proto-acp';
  return `<span class="proto-tag ${cls}">${p}</span>`;
}

function renderCards() {
  return COWORKERS.map(cw => `
    <div class="cw-card" id="${cw.id}">
      <h3>${cw.display}</h3>
      <div class="domain">${cw.domain}</div>
      <div class="desc">${cw.desc}</div>
      <div class="protos">${cw.protocols.map(protoTag).join('')}</div>
      <div class="trigger">trigger: <code>${cw.trigger}</code></div>
      <div class="peers">peers: ${cw.peers.slice(0,3).join(', ')}${cw.peers.length > 3 ? ` +${cw.peers.length-3}` : ''}</div>
    </div>`).join('');
}

function renderMatrix() {
  // rows = coworkers, cols = protocols
  const protocols = ['a2a','e2m-mcp','mcp','acp'];
  const rows = COWORKERS.map(cw => {
    const cells = protocols.map(p =>
      cw.protocols.includes(p)
        ? `<td class="check" style="text-align:center">✓</td>`
        : `<td class="dash" style="text-align:center">·</td>`
    ).join('');
    return `<tr><td style="color:#f4f4f4">${cw.display}</td><td style="color:#6a6a6a;font-size:10px">${cw.model.replace('claude-','').replace('-20251001','')}</td>${cells}</tr>`;
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

function html(deployedAt) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>coworkers — knowledge-engineering</title>
<style>${CSS}</style>
</head>
<body>
<div id="header">
  <h1>coworkers</h1>
  <span class="meta">knowledge-engineering · ${COWORKERS.length} coworkers · 4 protocols</span>
  <span class="badge">v0.2</span>
</div>
<nav>
  <a href="/">directory</a>
  <a href="#matrix">protocol matrix</a>
  <a href="#protocols">protocols</a>
  <a href="https://cowork.subagentknowledge.com">cowork ops ↗</a>
  <a href="https://github.com/subagentceo/knowledge-engineering" target="_blank">github ↗</a>
  <span style="margin-left:auto;color:#6a6a6a">deployed ${deployedAt}</span>
</nav>
<main>

<div class="note">
  Coworkers communicate via 4 peer protocols: <strong>a2a</strong> (direct peer), <strong>e2m-mcp</strong> (durable JSONL queue),
  <strong>mcp</strong> (typed tools), <strong>acp</strong> (HTTP REST). Unlike agents, coworkers can <em>initiate</em> work — not just receive it.
</div>

<div class="section">
  <div class="section-header">
    <span class="section-label lbl-cyan">directory</span>
    <span class="lbl-muted" style="font-size:10px">${COWORKERS.length} active coworkers</span>
  </div>
  <div class="coworker-grid">${renderCards()}</div>
</div>

<div class="section" id="matrix">
  <div class="section-header">
    <span class="section-label lbl-amber">protocol matrix</span>
    <span class="lbl-muted" style="font-size:10px">coworker × protocol capability</span>
  </div>
  ${renderMatrix()}
</div>

<div class="section" id="protocols">
  <div class="section-header">
    <span class="section-label lbl-green">peer protocols</span>
  </div>
  ${renderProtocols()}
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
