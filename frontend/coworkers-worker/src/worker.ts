/**
 * coworkers-worker/src/worker.ts
 *
 * CF Worker for coworkers.subagentknowledge.com.
 *
 * Surfaces:
 *   GET /      → coworker directory (HTML)
 *   GET /mcp   → McpAgent streamable-HTTP endpoint
 *   GET *      → 404
 *
 * MCP tools exposed (connectable from Claude):
 *   - list_coworkers     : full directory with protocols, peers, descriptions
 *   - get_coworker       : detail for one coworker
 *   - get_protocol_matrix: table of which coworkers support which protocols
 *   - send_to_coworker   : draft a mailbox message envelope
 *
 * @cite github.com/cloudflare/agents                (McpAgent pattern)
 * @cite plugins/mcp-server-dev/references/deploy-cloudflare-workers.md
 * @cite cowork/coworkers/manifest.json              (source of truth)
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORK_HOST: string;
  SITE_NAME: string;
}

// ── Coworker directory ────────────────────────────────────────────────────────

interface Coworker {
  id: string;
  display_name: string;
  domain: string;
  trigger_phrase: string;
  protocols: string[];
  peers: string[];
  description: string;
  model: string;
}

const COWORKERS: Coworker[] = [
  {
    id: "pm-coworker",
    display_name: "Product Management",
    domain: "product-management",
    trigger_phrase: "/pm-coworker",
    protocols: ["a2a", "e2m-mcp", "mcp"],
    peers: ["design-coworker", "engineering-coworker", "data-coworker", "sales-coworker", "operations-coworker", "finance-coworker"],
    description: "Lead PM. Routes work, manages priority-rerank cadence, orchestrates peer coworkers via e2m-mcp mailbox.",
    model: "claude-sonnet-4-6",
  },
  {
    id: "design-coworker",
    display_name: "Design",
    domain: "design",
    trigger_phrase: "/design-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["pm-coworker", "engineering-coworker"],
    description: "Design token + HTML artifact coworker. Owns cowork/artifacts/ and the 8-token design system.",
    model: "claude-sonnet-4-6",
  },
  {
    id: "engineering-coworker",
    display_name: "Engineering",
    domain: "engineering",
    trigger_phrase: "/engineering-coworker",
    protocols: ["a2a", "e2m-mcp", "mcp"],
    peers: ["pm-coworker", "data-coworker"],
    description: "TypeScript + Rust coworker. Owns cowork/mcp/, cowork/templates/, src/. OAuth-only, no API keys.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "data-coworker",
    display_name: "Data",
    domain: "data",
    trigger_phrase: "/data-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["pm-coworker", "engineering-coworker"],
    description: "AlloyDB / Kimball DW coworker. Owns dw.* schema, dim_agent_templates, fact tables.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "sales-coworker",
    display_name: "Sales",
    domain: "sales",
    trigger_phrase: "/sales-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["pm-coworker", "finance-coworker"],
    description: "Outreach + mail coworker. Queue-first drafts only. Finance gate before spend.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "operations-coworker",
    display_name: "Operations",
    domain: "operations",
    trigger_phrase: "/operations-coworker",
    protocols: ["a2a", "e2m-mcp", "acp"],
    peers: ["pm-coworker", "finance-coworker", "engineering-coworker"],
    description: "Infrastructure + process coworker. Manages CF Workers, scheduled tasks, deploy pipelines, subdomain provisioning.",
    model: "claude-haiku-4-5-20251001",
  },
  {
    id: "finance-coworker",
    display_name: "Finance",
    domain: "finance",
    trigger_phrase: "/finance-coworker",
    protocols: ["a2a", "e2m-mcp"],
    peers: ["pm-coworker", "sales-coworker", "operations-coworker"],
    description: "Cost tracking + vendor spend coworker. Owns finance.jsonl, cost approval gates.",
    model: "claude-haiku-4-5-20251001",
  },
];

const PROTOCOLS = ["a2a", "e2m-mcp", "mcp", "acp"] as const;
type Protocol = typeof PROTOCOLS[number];

// ── McpAgent ──────────────────────────────────────────────────────────────────

export class CoworkersMcp extends McpAgent<Env> {
  server = new McpServer(
    { name: "coworkers", version: "0.2.0" },
    { instructions: "coworkers.subagentknowledge.com MCP surface. Use list_coworkers to discover the directory before sending messages." },
  );

  async init() {
    this.server.registerTool(
      "list_coworkers",
      {
        description: "List all 7 coworkers with domain, protocols, peers, and description.",
        inputSchema: {
          protocol: z.enum(PROTOCOLS).optional().describe("Filter by protocol support (a2a, e2m-mcp, mcp, acp)."),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ protocol }) => {
        const result = protocol
          ? COWORKERS.filter(c => c.protocols.includes(protocol))
          : COWORKERS;
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      },
    );

    this.server.registerTool(
      "get_coworker",
      {
        description: "Get full detail for one coworker by id or trigger phrase.",
        inputSchema: {
          id: z.string().describe("Coworker id (e.g. pm-coworker) or trigger phrase (e.g. /pm-coworker)"),
        },
        annotations: { readOnlyHint: true },
      },
      async ({ id }) => {
        const cw = COWORKERS.find(c => c.id === id || c.trigger_phrase === id);
        if (!cw) return { content: [{ type: "text", text: `Unknown coworker: ${id}` }], isError: true };
        return { content: [{ type: "text", text: JSON.stringify(cw, null, 2) }] };
      },
    );

    this.server.registerTool(
      "get_protocol_matrix",
      {
        description: "Return the full protocol support matrix: which coworkers support which protocols (a2a, e2m-mcp, mcp, acp).",
        inputSchema: {},
        annotations: { readOnlyHint: true },
      },
      async () => {
        const matrix = COWORKERS.map(cw => ({
          id: cw.id,
          domain: cw.domain,
          ...Object.fromEntries(PROTOCOLS.map(p => [p, cw.protocols.includes(p)])),
        }));
        return { content: [{ type: "text", text: JSON.stringify(matrix, null, 2) }] };
      },
    );

    this.server.registerTool(
      "send_to_coworker",
      {
        description: "Draft a DurableTask envelope to send to a coworker's e2m-mcp mailbox. Returns the envelope JSON — write it via the e2m-mcp bridge server.",
        inputSchema: {
          to:      z.string().describe("Coworker id, e.g. pm-coworker"),
          subject: z.string().describe("Task subject line (imperative, <80 chars)"),
          ke_fit_score: z.number().int().min(1).max(5).default(3).describe("KE fit score 1-5"),
          depends_on: z.array(z.string()).optional().describe("Task IDs this depends on"),
        },
        annotations: { readOnlyHint: false },
      },
      async ({ to, subject, ke_fit_score, depends_on }) => {
        const cw = COWORKERS.find(c => c.id === to);
        if (!cw) return { content: [{ type: "text", text: `Unknown coworker: ${to}` }], isError: true };
        if (!cw.protocols.includes("e2m-mcp")) {
          return { content: [{ type: "text", text: `${to} does not support e2m-mcp. Protocols: ${cw.protocols.join(", ")}` }], isError: true };
        }
        const envelope = {
          id: crypto.randomUUID(),
          queue: cw.domain,
          subject,
          state: "pending",
          ke_fit_score,
          depends_on: depends_on ?? [],
          mailbox: `cowork/data/mailbox/${to}.jsonl`,
          created_at: new Date().toISOString(),
          instruction: `Append this JSON line to ${to}'s mailbox via: e2m-mcp mailbox_send tool`,
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
  out.headers.set("x-site", "coworkers.subagentknowledge.com");
  return out;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkersMcp.serve("/mcp").fetch(request, env, ctx);
    }

    if (url.pathname === "/" || url.pathname === "") {
      return secure(new Response(coworkersPage(env.COWORK_HOST), {
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }

    return secure(new Response("Not found", { status: 404 }));
  },
};

// ── HTML directory ────────────────────────────────────────────────────────────

const PROTOCOL_COLORS: Record<string, string> = {
  "a2a":     "#51c4ff",
  "e2m-mcp": "#7bd88f",
  "mcp":     "#e6b455",
  "acp":     "#c4a0ff",
};

const DOMAIN_COLORS: Record<string, string> = {
  "product-management": "#51c4ff",
  "design":             "#c4a0ff",
  "engineering":        "#7bd88f",
  "data":               "#e6b455",
  "sales":              "#ff8c69",
  "operations":         "#64d8cb",
  "finance":            "#a8e063",
};

function coworkersPage(coworkHost: string): string {
  const cards = COWORKERS.map(cw => {
    const domainColor = DOMAIN_COLORS[cw.domain] ?? "#d4d4d4";
    const protocolBadges = cw.protocols.map(p => {
      const color = PROTOCOL_COLORS[p] ?? "#d4d4d4";
      return `<span class="proto-pill" style="border-color:${color}20;color:${color};background:${color}12">${p}</span>`;
    }).join("");
    const modelBadge = cw.model.includes("haiku") ? "haiku" : "sonnet";
    const modelColor = cw.model.includes("haiku") ? "#e6b455" : "#51c4ff";
    const peerList = cw.peers.slice(0, 3).map(p => `<span class="peer">${p.replace("-coworker","")}</span>`).join("");
    const morePeers = cw.peers.length > 3 ? `<span class="peer">+${cw.peers.length - 3}</span>` : "";
    return `
    <div class="card" id="${cw.id}">
      <div class="card-header">
        <div class="domain-dot" style="background:${domainColor}"></div>
        <div class="card-title">${cw.display_name}</div>
        <div class="trigger">${cw.trigger_phrase}</div>
      </div>
      <div class="card-desc">${cw.description}</div>
      <div class="protocols">${protocolBadges}</div>
      <div class="meta-row">
        <span class="model-badge" style="color:${modelColor};border-color:${modelColor}33;background:${modelColor}0d">${modelBadge}</span>
        <div class="peers">${peerList}${morePeers}</div>
      </div>
    </div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>coworkers — subagentknowledge</title>
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
    .proto-legend{display:flex;gap:14px;margin-top:12px;flex-wrap:wrap;font-size:11px;color:#9a9a9a}
    .section{padding:14px 16px;border-bottom:1px solid #1f1f1f}
    .sec-title{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#51c4ff;margin-bottom:10px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:8px}
    .card{background:#111;border:1px solid #2a2a2a;padding:14px;transition:border-color .15s}
    .card:hover{border-color:#3a3a3a}
    .card-header{display:flex;align-items:center;gap:8px;margin-bottom:8px}
    .domain-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
    .card-title{font-size:13px;color:#f4f4f4;font-weight:600;flex:1}
    .trigger{font-size:10px;color:#e6b455;background:rgba(230,180,85,.1);padding:2px 5px;border:1px solid rgba(230,180,85,.2)}
    .card-desc{font-size:11px;color:#9a9a9a;line-height:1.6;margin-bottom:10px}
    .protocols{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:8px}
    .proto-pill{font-size:10px;padding:1px 5px;border:1px solid}
    .meta-row{display:flex;align-items:center;justify-content:space-between}
    .model-badge{font-size:10px;padding:1px 5px;border:1px solid}
    .peers{display:flex;gap:3px;flex-wrap:wrap}
    .peer{font-size:10px;background:#1a1a1a;border:1px solid #2a2a2a;padding:1px 4px;color:#9a9a9a}
    .ptable{width:100%;border-collapse:collapse;font-size:12px}
    .ptable th{text-align:left;padding:7px 10px;border-bottom:1px solid #1f1f1f;color:#f4f4f4;font-weight:600}
    .ptable td{padding:7px 10px;border-bottom:1px solid #1f1f1f;color:#d4d4d4;opacity:.8}
    .ptable tr:hover td{opacity:1}
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
    <a href="https://${coworkHost}">cowork/</a>
    <a href="/" class="active">coworkers/</a>
    <a href="/mcp">mcp</a>
    <div class="spacer"></div>
    <a href="https://subagentknowledge.com" class="ext">subagentknowledge.com ↗</a>
  </nav>

  <div class="hero">
    <h1>Coworker directory</h1>
    <p>7 protocol-native coworkers. Unlike simple agents, coworkers have peer relationships and can initiate work — not just receive it. They communicate via a2a, acp, mcp, and e2m-mcp.</p>
    <div class="mcp-box">
      <div class="lbl">MCP endpoint — paste into Claude connectors</div>
      <code>https://coworkers.subagentknowledge.com/mcp</code>
    </div>
    <div class="proto-legend">
      <span><strong style="color:#51c4ff">a2a</strong> agent-to-agent</span>
      <span><strong style="color:#7bd88f">e2m-mcp</strong> envelope-to-mailbox</span>
      <span><strong style="color:#e6b455">mcp</strong> model-context-protocol</span>
      <span><strong style="color:#c4a0ff">acp</strong> agent-client-protocol</span>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Active coworkers (${COWORKERS.length})</div>
    <div class="grid">
      ${cards}
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Protocol matrix</div>
    <table class="ptable">
      <thead>
        <tr>
          <th>Coworker</th>
          <th>Trigger</th>
          <th style="color:#51c4ff">a2a</th>
          <th style="color:#7bd88f">e2m-mcp</th>
          <th style="color:#e6b455">mcp</th>
          <th style="color:#c4a0ff">acp</th>
          <th>Model</th>
        </tr>
      </thead>
      <tbody>
        ${COWORKERS.map(cw => `
        <tr>
          <td>${cw.display_name}</td>
          <td style="color:#e6b455">${cw.trigger_phrase}</td>
          <td>${cw.protocols.includes("a2a")     ? "✓" : "—"}</td>
          <td>${cw.protocols.includes("e2m-mcp") ? "✓" : "—"}</td>
          <td>${cw.protocols.includes("mcp")     ? "✓" : "—"}</td>
          <td>${cw.protocols.includes("acp")     ? "✓" : "—"}</td>
          <td style="opacity:0.6">${cw.model.includes("haiku") ? "haiku" : "sonnet"}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>

  <footer>
    <span>coworkers.subagentknowledge.com — knowledge-engineering chassis v0.2.0</span>
    <span>7 coworkers · 7 domains · 4 protocols · MCP @ /mcp</span>
  </footer>
</div>
</body>
</html>`;
}
