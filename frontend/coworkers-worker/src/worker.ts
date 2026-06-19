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
    .hero p { font-size: 14px; color: var(--text); opacity: 0.8; max-width: 560px; line-height: 1.6; }
    .mcp-connect { margin-top: 16px; background: #0d1a0d; border: 1px solid rgba(123,216,143,0.3); border-radius: var(--radius); padding: 10px 14px; display: inline-block; }
    .mcp-connect .label { font-size: 10px; color: var(--green); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .mcp-connect code { font-size: 12px; color: var(--bright); }
    .proto-legend { display: flex; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
    .proto-def { font-size: 11px; opacity: 0.7; }
    .proto-def strong { opacity: 1; }
    .section { padding: 0 32px 48px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--cyan); margin-bottom: 16px; padding-bottom: 8px; border-bottom: var(--border); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }
    .card { background: var(--card-bg); border: var(--border); border-radius: var(--radius); padding: 20px; transition: border-color 0.15s; }
    .card:hover { border-color: #3a3a3a; }
    .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .domain-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .card-title { font-size: 14px; color: var(--bright); font-weight: 600; flex: 1; }
    .trigger { font-size: 11px; color: var(--amber); background: rgba(230,180,85,0.1); padding: 2px 6px; border-radius: 2px; border: 1px solid rgba(230,180,85,0.2); }
    .card-desc { font-size: 12px; color: var(--text); opacity: 0.75; line-height: 1.6; margin-bottom: 12px; }
    .protocols { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
    .proto-pill { font-size: 10px; padding: 2px 6px; border-radius: 2px; border: 1px solid; }
    .meta-row { display: flex; align-items: center; justify-content: space-between; }
    .model-badge { font-size: 10px; padding: 2px 6px; border-radius: 2px; border: 1px solid; }
    .peers { display: flex; gap: 4px; flex-wrap: wrap; }
    .peer { font-size: 10px; background: #1a1a1a; border: var(--border); padding: 1px 5px; border-radius: 2px; opacity: 0.8; }
    .protocol-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .protocol-table th { text-align: left; padding: 8px 12px; border-bottom: var(--border); color: var(--bright); font-weight: 600; }
    .protocol-table td { padding: 8px 12px; border-bottom: var(--border); color: var(--text); opacity: 0.8; }
    .protocol-table tr:hover td { opacity: 1; }
    footer { border-top: var(--border); padding: 20px 32px; font-size: 11px; opacity: 0.5; display: flex; justify-content: space-between; }
    a { color: var(--cyan); text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header>
    <div class="logo">coworkers<span>.subagentknowledge.com</span></div>
    <nav>
      <a href="https://${coworkHost}">cowork/</a>
      <a href="/mcp">MCP</a>
      <a href="https://subagentknowledge.com">Knowledge</a>
    </nav>
  </header>

  <div class="hero">
    <h1>Coworker directory</h1>
    <p>7 protocol-native coworkers. Unlike simple agents, coworkers have peer relationships and can initiate work — not just receive it. They communicate via a2a, acp, mcp, and e2m-mcp.</p>
    <div class="mcp-connect">
      <div class="label">MCP endpoint — paste into Claude</div>
      <code>https://coworkers.subagentknowledge.com/mcp</code>
    </div>
    <div class="proto-legend">
      <span class="proto-def"><strong style="color:#51c4ff">a2a</strong> agent-to-agent direct peer call</span>
      <span class="proto-def"><strong style="color:#7bd88f">e2m-mcp</strong> envelope-to-mailbox JSONL queue</span>
      <span class="proto-def"><strong style="color:#e6b455">mcp</strong> model-context-protocol tool surface</span>
      <span class="proto-def"><strong style="color:#c4a0ff">acp</strong> agent-client-protocol /run endpoint</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Active coworkers (${COWORKERS.length})</div>
    <div class="grid">
      ${cards}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Protocol matrix</div>
    <table class="protocol-table">
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
          <td style="color:var(--amber)">${cw.trigger_phrase}</td>
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
</body>
</html>`;
}
