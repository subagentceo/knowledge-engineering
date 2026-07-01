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
import { COWORKERS, PROTOCOLS, findCoworker, protocolMatrix, secure, HSTS, type Coworker, type Protocol } from "./manifest.js";

export { COWORKERS, PROTOCOLS, findCoworker, protocolMatrix, secure, HSTS, type Coworker, type Protocol } from "./manifest.js";

import { CoworkersMcpApp } from "./coworkers.app.js";
export { CoworkersMcpApp };

export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  COWORKERS_MCP_APP: DurableObjectNamespace;
  COWORK_HOST: string;
}

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
        description: "List all 12 coworkers with domain, protocols, peers, and description.",
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
          id: z.string().describe("Coworker id (e.g. product-management-coworker) or trigger phrase (e.g. /product-management-coworker)"),
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
          to:      z.string().describe("Coworker id, e.g. product-management-coworker"),
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol !== "https:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // SSE transport (Claude Desktop / legacy clients)
    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return CoworkersMcpApp.serveSSE("/sse").fetch(request, env, ctx);
    }

    // Streamable-HTTP transport (MCP 2025-03-26+)
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return CoworkersMcpApp.serve("/mcp").fetch(request, env, ctx);
    }

    if (url.pathname === "/" || url.pathname === "") {
      return secure(new Response(coworkersPage(env), {
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

function coworkersPage(env: Env): string {
  const coworkHost = env.COWORK_HOST || "cowork.subagentknowledge.com";
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
  <div id="ascii-pane"><pre id="ascii"></pre></div>
  <script>
  (function(){
    var LUMA=" .:;+*xX$#@";
    var FRAME_MS=1000/30;
    var ATTRACTORS=[
      {radiusScale:0.32,speed:0.00045,phase:0},
      {radiusScale:0.22,speed:-0.0007,phase:2.1},
      {radiusScale:0.38,speed:0.00055,phase:4.2}
    ];
    var el=document.getElementById("ascii");
    var running=true,raf=null,lastFrame=0;
    var opts,particles,buf;
    var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    function computeOpts(){
      var rect=el.parentElement.getBoundingClientRect();
      var fs=parseFloat(getComputedStyle(el).fontSize)||11;
      var cellW=fs*0.6,cellH=fs;
      var cols=Math.max(20,Math.floor(rect.width/cellW));
      var rows=Math.max(4,Math.floor(rect.height/cellH));
      var pc=Math.min(60,Math.max(16,Math.floor((cols*rows)/55)));
      var ar=Math.max(4,Math.floor(Math.min(cols,rows)/4));
      return{cols:cols,rows:rows,particleCount:pc,attractorRadius:ar};
    }
    function seed(o){
      var out=[];
      for(var i=0;i<o.particleCount;i++){
        out.push({x:Math.random()*o.cols,y:Math.random()*o.rows,
                  vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.4});
      }
      return out;
    }
    function step(t){
      var cx=opts.cols/2,cy=opts.rows/2;
      var orb=Math.min(opts.cols,opts.rows);
      for(var i=0;i<particles.length;i++){
        var p=particles[i];
        for(var j=0;j<ATTRACTORS.length;j++){
          var a=ATTRACTORS[j];
          var angle=t*a.speed+a.phase;
          var ax=cx+Math.cos(angle)*orb*a.radiusScale;
          var ay=cy+Math.sin(angle)*orb*a.radiusScale*0.5;
          var dx=ax-p.x,dy=ay-p.y;
          var d2=dx*dx+dy*dy+1;
          var pull=0.05/Math.sqrt(d2);
          p.vx+=dx*pull; p.vy+=dy*pull;
        }
        p.vx*=0.985; p.vy*=0.985;
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x+=opts.cols; if(p.x>=opts.cols)p.x-=opts.cols;
        if(p.y<0)p.y+=opts.rows; if(p.y>=opts.rows)p.y-=opts.rows;
      }
    }
    function rasterize(){
      buf.fill(0);
      var r=opts.attractorRadius;
      for(var i=0;i<particles.length;i++){
        var p=particles[i];
        var xi=Math.floor(p.x),yi=Math.floor(p.y);
        for(var dy=-r;dy<=r;dy++){
          for(var dx=-r;dx<=r;dx++){
            var x=xi+dx,y=yi+dy;
            if(x<0||x>=opts.cols||y<0||y>=opts.rows)continue;
            var dist=Math.sqrt(dx*dx+dy*dy);
            if(dist>r)continue;
            var idx=y*opts.cols+x;
            buf[idx]=(buf[idx]||0)+(1-dist/r);
          }
        }
      }
    }
    function renderBuf(){
      var max=0;
      for(var i=0;i<buf.length;i++){if(buf[i]>max)max=buf[i];}
      var norm=max>0?1/max:0;
      var lines=[];
      for(var y=0;y<opts.rows;y++){
        var line="";
        for(var x=0;x<opts.cols;x++){
          var v=(buf[y*opts.cols+x]||0)*norm;
          var idx2=Math.min(LUMA.length-1,Math.max(0,Math.floor(v*(LUMA.length-1))));
          line+=LUMA[idx2];
        }
        lines.push(line);
      }
      return lines.join("\\n");
    }
    function frame(now){
      if(!running)return;
      if(!reduce)raf=requestAnimationFrame(frame);
      if(now-lastFrame<FRAME_MS)return;
      lastFrame=now;
      step(now);
      rasterize();
      el.textContent=renderBuf();
    }
    function init(){
      opts=computeOpts();
      particles=seed(opts);
      buf=new Float32Array(opts.cols*opts.rows);
    }
    init();
    if(reduce){step(0);rasterize();el.textContent=renderBuf();}
    else{raf=requestAnimationFrame(frame);}
    var io=new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){running=true;if(!reduce)raf=requestAnimationFrame(frame);}
      else{running=false;if(raf)cancelAnimationFrame(raf);raf=null;}
    });
    io.observe(el);
    document.addEventListener("visibilitychange",function(){
      if(document.hidden){running=false;if(raf)cancelAnimationFrame(raf);raf=null;}
      else{running=true;if(!reduce)raf=requestAnimationFrame(frame);}
    });
    var rt=null;
    window.addEventListener("resize",function(){
      if(rt)clearTimeout(rt);
      rt=setTimeout(function(){init();if(reduce){step(0);rasterize();el.textContent=renderBuf();}},150);
    });
  })();
  </script>

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
    <span>12 coworkers · 12 domains · 4 protocols · MCP @ /mcp</span>
  </footer>
</div>
</body>
</html>`;
}
