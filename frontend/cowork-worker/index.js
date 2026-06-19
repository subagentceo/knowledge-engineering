// cowork-worker — cowork.subagentknowledge.com
// @cite seeds/references/agent-native-links.yaml
// agent-native dispatch/plan/calendar/schedule patterns, iPhone 16 Pro optimized

export class CoworkMcp {
  constructor(state, env) { this.state = state; this.env = env; }
  async fetch(request) { return new Response("CoworkMcp DO", { status: 200 }); }
}

const COWORKERS = [
  { id:"pm-coworker",                 label:"product-management",  model:"sonnet-4-6", color:"#51c4ff", role:"chief-of-staff" },
  { id:"project-management-coworker", label:"project-management",  model:"opus-4-6",   color:"#f4a73b", role:"execution" },
  { id:"engineering-coworker",        label:"engineering",         model:"sonnet-4-6", color:"#7bd88f", role:"implementation" },
  { id:"design-coworker",             label:"design",              model:"haiku-4-5",  color:"#c084fc", role:"ux" },
  { id:"data-coworker",               label:"data",                model:"haiku-4-5",  color:"#38bdf8", role:"analytics" },
  { id:"sales-coworker",              label:"sales",               model:"sonnet-4-6", color:"#fb923c", role:"revenue" },
  { id:"finance-coworker",            label:"finance",             model:"haiku-4-5",  color:"#a78bfa", role:"budget" },
  { id:"operations-coworker",         label:"operations",          model:"haiku-4-5",  color:"#34d399", role:"ops" },
  { id:"legal-coworker",              label:"legal",               model:"opus-4-6",   color:"#f87171", role:"compliance" },
  { id:"marketing-coworker",          label:"marketing",           model:"sonnet-4-6", color:"#fbbf24", role:"growth" },
  { id:"agent-resources-coworker",    label:"agent-resources",     model:"sonnet-4-6", color:"#60a5fa", role:"infra" },
  { id:"human-resources-coworker",    label:"human-resources",     model:"haiku-4-5",  color:"#f9a8d4", role:"people" },
];

const QUEUE_STATS = {
  "product-management":2,"project-management":1,"engineering":5,
  "design":3,"data":4,"sales":0,"finance":1,"operations":1,
  "legal":0,"marketing":2,"agent-resources":3,"human-resources":0,
};

const SCHEDULE = [
  { time:"00:00 PST", label:"nightly session",   icon:"moon", desc:"All 12 coworkers process queues autonomously" },
  { time:"06:00 PST", label:"type-safety audit", icon:"scan", desc:"Schema validation across all mailboxes" },
  { time:"07:00 PST", label:"morning summary",   icon:"sun",  desc:"Merged code + improvements delivered" },
];

const RECENT_WORK = [
  { at:"02:24", from:"project-management", subject:"Nightly review — 14 queues scanned, 0 blocked", state:"completed" },
  { at:"02:24", from:"project-management", subject:"Type-safety audit — 0 violations", state:"completed" },
  { at:"02:24", from:"project-management", subject:"Morning summary artifact written", state:"completed" },
  { at:"01:15", from:"pm-coworker",        subject:"project-management-coworker SKILL.md deployed", state:"completed" },
  { at:"00:42", from:"engineering",        subject:"CF Workers upgraded: cowork + coworkers", state:"completed" },
  { at:"23:55", from:"pm-coworker",        subject:"3 scheduled tasks created (00:00/06:00/07:00 PST)", state:"completed" },
];

function buildHTML() {
  const cwJson = JSON.stringify(COWORKERS);
  const qsJson = JSON.stringify(QUEUE_STATS);
  const schJson = JSON.stringify(SCHEDULE);
  const rwJson = JSON.stringify(RECENT_WORK);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0a0a0a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>cowork</title>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0}
html,body{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px;min-height:100dvh;overflow-x:hidden}
body{padding-top:env(safe-area-inset-top);padding-bottom:calc(env(safe-area-inset-bottom) + 48px)}
#hdr{position:sticky;top:0;z-index:100;background:rgba(10,10,10,.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid #1a1a1a;padding:calc(10px + env(safe-area-inset-top)) 16px 10px;display:flex;align-items:center;gap:10px}
.logo{font-size:15px;font-weight:700;letter-spacing:1.5px;color:#f4f4f4}
.badge{font-size:9px;text-transform:uppercase;letter-spacing:1px;border:1px solid;padding:2px 7px;border-radius:3px;font-weight:600}
.b-cyan{color:#51c4ff;border-color:#1a3a4a}.b-green{color:#7bd88f;border-color:#1a3a2a}
.pulse{margin-left:auto;width:7px;height:7px;background:#7bd88f;border-radius:50%;box-shadow:0 0 8px #7bd88f88;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
#nav{display:flex;border-bottom:1px solid #1a1a1a;overflow-x:auto;scrollbar-width:none;background:#0a0a0a}
#nav::-webkit-scrollbar{display:none}
.tab{flex-shrink:0;padding:9px 14px;font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:#4a4a4a;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;-webkit-user-select:none;user-select:none}
.tab.active{color:#51c4ff;border-bottom-color:#51c4ff}.tab:active{opacity:.6}
.panel{display:none;padding:12px 16px 24px}.panel.active{display:block}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.stat{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:11px 14px}
.stat .val{font-size:24px;font-weight:700;line-height:1;margin-bottom:2px}
.stat .lbl{font-size:9px;color:#5a5a5a;text-transform:uppercase;letter-spacing:.6px}
.v-cyan{color:#51c4ff}.v-green{color:#7bd88f}.v-amber{color:#f4a73b}.v-white{color:#f4f4f4}
.sh{display:flex;align-items:baseline;gap:8px;padding:0 0 8px;border-bottom:1px solid #1a1a1a;margin-bottom:12px}
.sh-l{font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:600;color:#51c4ff}
.sh-s{font-size:9px;color:#4a4a4a}
.agents-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ac{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:10px;position:relative;transition:transform .1s}
.ac:active{transform:scale(.97)}
.dot{width:5px;height:5px;border-radius:50%;display:inline-block;margin-right:5px;vertical-align:middle}
.aname{font-size:11px;font-weight:600;color:#f4f4f4;word-break:break-word;line-height:1.25}
.amodel{font-size:9px;color:#4a4a4a;margin-top:3px}.arole{font-size:8px;text-transform:uppercase;letter-spacing:.5px;color:#3a3a3a;margin-top:2px}
.aq{font-size:12px;font-weight:700;position:absolute;top:10px;right:10px}
.fi{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid #121212;align-items:flex-start}
.fi:last-child{border-bottom:none}
.ft{font-size:10px;color:#3a3a3a;flex-shrink:0;min-width:38px;padding-top:1px}
.ff{font-size:9px;text-transform:uppercase;letter-spacing:.4px;color:#4a4a4a;margin-bottom:2px}
.fs{font-size:11px;color:#b4b4b4;line-height:1.35}
.fstate{font-size:8px;padding:1px 5px;border-radius:3px;margin-top:4px;display:inline-block}
.s-completed{background:rgba(123,216,143,.1);color:#7bd88f}
.s-pending{background:rgba(81,196,255,.08);color:#51c4ff}
.s-in_progress{background:rgba(244,167,59,.1);color:#f4a73b}
.si{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:11px 13px;margin-bottom:8px;display:flex;align-items:center;gap:14px}
.si-icon{font-size:20px;width:30px;text-align:center}
.si-time{font-size:11px;font-weight:700;color:#51c4ff;min-width:82px;flex-shrink:0}
.si-label{font-size:11px;font-weight:600;color:#f4f4f4;margin-bottom:2px}
.si-desc{font-size:10px;color:#5a5a5a;line-height:1.35}
.pc{background:#111;border:1px solid #1a1a1a;border-left:3px solid #51c4ff;border-radius:0 8px 8px 0;padding:11px 13px;margin-bottom:9px}
.pc.amber{border-left-color:#f4a73b}.pc.green{border-left-color:#7bd88f}.pc.muted{border-left-color:#2a2a2a}
.pc-title{font-size:12px;font-weight:600;color:#f4f4f4;margin-bottom:4px}
.pc-body{font-size:11px;color:#7a7a7a;line-height:1.45}
.pc-tag{font-size:8px;text-transform:uppercase;letter-spacing:.6px;padding:2px 6px;border-radius:3px;background:#181818;color:#5a5a5a;margin-top:7px;display:inline-block;font-weight:600}
.pt{width:100%;border-collapse:collapse;font-size:11px}
.pt th,.pt td{padding:7px 8px;border:1px solid #141414;text-align:left}
.pt th{background:#0e0e0e;color:#4a4a4a;font-size:9px;text-transform:uppercase;letter-spacing:.5px}
.p-on{color:#7bd88f}
#footer{position:fixed;bottom:0;left:0;right:0;padding:8px 16px;padding-bottom:calc(8px + env(safe-area-inset-bottom));background:rgba(10,10,10,.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid #1a1a1a;text-align:center;font-size:9px;color:#2e2e2e}
#footer a{color:#3a3a3a;text-decoration:none}
</style>
</head>
<body>
<div id="hdr">
  <span class="logo">cowork</span>
  <span class="badge b-cyan">12 agents</span>
  <span class="badge b-green">live</span>
  <span class="pulse"></span>
</div>
<div id="nav">
  <div class="tab active" onclick="show('dispatch')">Dispatch</div>
  <div class="tab" onclick="show('feed')">Feed</div>
  <div class="tab" onclick="show('schedule')">Schedule</div>
  <div class="tab" onclick="show('plan')">Plan</div>
  <div class="tab" onclick="show('protocols')">Protocols</div>
</div>
<div id="panel-dispatch" class="panel active">
  <div class="stats">
    <div class="stat"><div class="val v-green">12</div><div class="lbl">coworkers</div></div>
    <div class="stat"><div class="val v-cyan">22</div><div class="lbl">pending</div></div>
    <div class="stat"><div class="val v-amber">3</div><div class="lbl">scheduled</div></div>
    <div class="stat"><div class="val v-white">0</div><div class="lbl">blocked</div></div>
  </div>
  <div class="sh"><span class="sh-l">agents</span><span class="sh-s">queue depth</span></div>
  <div class="agents-grid" id="agents-grid"></div>
</div>
<div id="panel-feed" class="panel">
  <div class="sh"><span class="sh-l">activity</span><span class="sh-s">last 8h</span></div>
  <div id="feed-list"></div>
</div>
<div id="panel-schedule" class="panel">
  <div class="sh"><span class="sh-l">nightly schedule</span><span class="sh-s">PST</span></div>
  <div id="sched-list"></div>
  <div style="margin-top:14px">
    <div class="pc amber">
      <div class="pc-title">Autonomous loop</div>
      <div class="pc-body">Coworkers run while you sleep. project-management (opus-4-6) reviews work and enforces type-safety. Morning summary ready at 07:00. Steer with skills — not interrupts.</div>
      <span class="pc-tag">no human in loop</span>
    </div>
  </div>
</div>
<div id="panel-plan" class="panel">
  <div class="sh"><span class="sh-l">product roadmap</span><span class="sh-s">pm-coworker</span></div>
  <div class="pc green">
    <div class="pc-title">Phase 20 — agent-native visualization</div>
    <div class="pc-body">cowork.subagentknowledge.com rebuilt with dispatch/plan/calendar patterns. Mobile-first for iPhone 16 Pro. Version-controlled via git + CF Worker deploy.</div>
    <span class="pc-tag">in progress</span>
  </div>
  <div class="pc muted">
    <div class="pc-title">Phase 21 — scheduled automation</div>
    <div class="pc-body">3 scheduled tasks live: 00:00 nightly, 06:00 type-safety audit, 07:00 morning summary. project-management-coworker owns execution review.</div>
    <span class="pc-tag">completed</span>
  </div>
  <div class="pc amber">
    <div class="pc-title">Phase 22 — coworkers directory v2</div>
    <div class="pc-body">Rebuild coworkers.subagentknowledge.com with agent-native dispatch integration, real-time queue depth from Cloudflare KV, and A2A protocol matrix.</div>
    <span class="pc-tag">planned</span>
  </div>
  <div class="pc">
    <div class="pc-title">Phase 23 — KV live data bridge</div>
    <div class="pc-body">Replace static snapshots with live JSONL reads via Cloudflare KV. Dashboard becomes real-time window into agent state.</div>
    <span class="pc-tag">planned</span>
  </div>
</div>
<div id="panel-protocols" class="panel">
  <div class="sh"><span class="sh-l">peer protocols</span><span class="sh-s">12 coworkers</span></div>
  <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
  <table class="pt">
    <thead><tr><th>coworker</th><th>a2a</th><th>e2m</th><th>mcp</th><th>model</th></tr></thead>
    <tbody id="proto-body"></tbody>
  </table>
  </div>
  <div style="margin-top:10px;font-size:9px;color:#3a3a3a;line-height:1.8">
    <b style="color:#5a5a5a">a2a</b> direct &nbsp;<b style="color:#5a5a5a">e2m</b> durable mailbox &nbsp;<b style="color:#5a5a5a">mcp</b> typed tools
  </div>
</div>
<div id="footer">
  cowork.subagentknowledge.com &nbsp;&middot;&nbsp; <a href="https://coworkers.subagentknowledge.com">coworkers &nearr;</a>
</div>
<script>
const CW=${cwJson};
const QS=${qsJson};
const SCH=${schJson};
const RW=${rwJson};
const ICONS={moon:'🌙',scan:'🔍',sun:'☀️'};
function show(t){
  document.querySelectorAll('.tab,.panel').forEach(e=>e.classList.remove('active'));
  document.querySelector('[onclick="show(\\''+t+'\\')"]').classList.add('active');
  document.getElementById('panel-'+t).classList.add('active');
}
const g=document.getElementById('agents-grid');
CW.forEach(c=>{
  const q=QS[c.label]||0,qc=q===0?'#2a2a2a':q>3?'#f4a73b':'#51c4ff';
  g.innerHTML+=\`<div class="ac"><span class="dot" style="background:\${c.color}"></span><span class="aname">\${c.label}</span><div class="amodel">\${c.model}</div><div class="arole">\${c.role}</div><div class="aq" style="color:\${qc}">\${q}</div></div>\`;
});
const fl=document.getElementById('feed-list');
RW.forEach(i=>{
  fl.innerHTML+=\`<div class="fi"><div class="ft">\${i.at}</div><div><div class="ff">\${i.from}</div><div class="fs">\${i.subject}</div><span class="fstate s-\${i.state}">\${i.state}</span></div></div>\`;
});
const sl=document.getElementById('sched-list');
SCH.forEach(s=>{
  sl.innerHTML+=\`<div class="si"><div class="si-icon">\${ICONS[s.icon]||s.icon}</div><div class="si-time">\${s.time}</div><div><div class="si-label">\${s.label}</div><div class="si-desc">\${s.desc}</div></div></div>\`;
});
const pb=document.getElementById('proto-body');
CW.forEach(c=>{
  pb.innerHTML+=\`<tr><td style="color:\${c.color};font-size:10px">\${c.label}</td><td class="p-on">✓</td><td class="p-on">✓</td><td class="p-on">✓</td><td style="color:#4a4a4a;font-size:9px">\${c.model}</td></tr>\`;
});
</script>
</body>
</html>`;
}

export default {
  async fetch(request, env, ctx) {
    return new Response(buildHTML(), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60",
        "X-Content-Type-Options": "nosniff",
      },
    });
  },
};
