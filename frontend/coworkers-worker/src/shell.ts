/**
 * coworkers-worker/src/shell.ts
 *
 * Pure HTML-shell renderer for coworkers.subagentknowledge.com's root route.
 * Deliberately split out of worker.ts (which imports `agents/mcp` → transitive
 * `cloudflare:*` scheme imports unresolvable under plain vitest/node) so this
 * module — and its render tests — can run without a Workers runtime shim.
 * Mirrors the same split in frontend/cowork-worker/src/shell.ts (KAN-34).
 *
 * @cite frontend/coworkers-worker/src/manifest.ts        (COWORKERS, Coworker)
 * @cite frontend/coworkers-worker/src/queue-snapshot.ts   (QueueSnapshot shape)
 * @cite frontend/cowork-worker/src/shell.ts                (KAN-34 sibling pattern)
 */

import { COWORKERS } from "./manifest.js";
import type { QueueSnapshot } from "./queue-snapshot.js";

export interface CoworkersShellEnv {
  COWORK_HOST: string;
}

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

const MODEL_COLORS: Record<string, string> = {
  "opus":   "#f4a73b",
  "haiku":  "#e6b455",
  "sonnet": "#51c4ff",
};

function modelTier(model: string): "opus" | "haiku" | "sonnet" {
  if (model.includes("opus")) return "opus";
  if (model.includes("haiku")) return "haiku";
  return "sonnet";
}

// Pure render fn — takes the already-resolved snapshot (or null) so it's
// testable without a KV mock. @cite frontend/coworkers-worker/src/queue-snapshot.ts
export function coworkersPage(env: CoworkersShellEnv, snapshot: QueueSnapshot | null): string {
  const coworkHost = env.COWORK_HOST || "cowork.subagentknowledge.com";
  const cards = COWORKERS.map(cw => {
    const domainColor = DOMAIN_COLORS[cw.domain] ?? "#d4d4d4";
    const protocolBadges = cw.protocols.map(p => {
      const color = PROTOCOL_COLORS[p] ?? "#d4d4d4";
      return `<span class="proto-pill" style="border-color:${color}20;color:${color};background:${color}12">${p}</span>`;
    }).join("");
    const modelBadge = modelTier(cw.model);
    const modelColor = MODEL_COLORS[modelBadge];
    const peerList = cw.peers.slice(0, 3).map(p => `<span class="peer">${p.replace("-coworker","")}</span>`).join("");
    const morePeers = cw.peers.length > 3 ? `<span class="peer">+${cw.peers.length - 3}</span>` : "";
    const counts = snapshot?.domains[cw.domain];
    const liveBadge = counts
      ? `<span class="model-badge" style="color:#51c4ff;border-color:#51c4ff33;background:#51c4ff0d">${counts.pending} pending</span><span class="model-badge" style="color:#7bd88f;border-color:#7bd88f33;background:#7bd88f0d">${counts.completed} done</span>`
      : `<span class="model-badge" style="color:${modelColor};border-color:${modelColor}33;background:${modelColor}0d">${modelBadge}</span>`;
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
        ${liveBadge}
        <div class="peers">${peerList}${morePeers}</div>
      </div>
    </div>`;
  }).join("\n");

  const snapshotNote = snapshot
    ? `<span class="pill" style="font-size:10px;background:#1a1a1a;border:1px solid #2a2a2a;color:#9a9a9a;padding:1px 5px">snapshot @ ${snapshot.at}</span>`
    : `<span class="pill" style="font-size:10px;background:#1a1a1a;border:1px solid #2a2a2a;color:#9a9a9a;padding:1px 5px">no live snapshot yet</span>`;

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
    <div class="sec-title">Active coworkers (${COWORKERS.length}) — ${snapshotNote}</div>
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
          <td style="opacity:0.6">${modelTier(cw.model)}</td>
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
