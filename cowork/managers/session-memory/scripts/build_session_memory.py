#!/usr/bin/env python3
"""
build_session_memory.py — deterministic generator for the session-memory operator/manager skill.

Two modes, both emit a token-minimized memory store (JSON) + a self-contained light-mode HTML
artifact (data embedded inline → 0 tokens to view). Schema: Anthropic Messages API + e2m envelope.

  index   — cross-session map from `session_info.list_sessions` metadata (CHEAP, no transcript reads).
            python build_session_memory.py index --sessions sessions.json --out <dir>
            sessions.json = [{ "id":..., "title":..., "status":..., "cwd":... }, ...]

  session — deep per-session store from a consolidated turns list (the agent reads the transcript
            ONCE, summarizes each turn into episodes, then calls this). One transcript = one token cost.
            python build_session_memory.py session --turns turns.json --out <dir>
            turns.json = { "session": {...}, "turns": [{ seq, user:{summary}, assistant:{summary,model},
                          io:{tools,files,envelopes,queues}, tokens_est }, ...] }

@cite cowork/standards/agent-hierarchy.md (managers run this nightly — the consolidation/dreams pass)
@cite cowork/schemas/envelope.ts (e2m envelope shape)
"""
import json, sys, argparse, pathlib, html

THEMES = [
    ("coworker-setup", ("coworker setup", "coworker skill")),
    ("scheduled",      ("midnight", "morning summary", "type safety audit", "nightly", "heartbeat")),
    ("infra",          ("toolchain", "directory creation", "alpine", "install")),
    ("assessment",     ("status assessment", "apps status", "audit")),
    ("protocol",       ("envelope", "mailbox", "protocol", "e2m")),
]
def theme_of(title):
    t = title.lower()
    for name, keys in THEMES:
        if any(k in t for k in keys):
            return name
    return "other"

def est_tokens(path):
    return round(len(pathlib.Path(path).read_text()) / 4)

# ── HTML (shared shell; renders either sessions[] or turns[]) ───────────────────
SHELL = r"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>__TITLE__</title><style>
:root{color-scheme:light;--bg:#fbfbfd;--card:#fff;--ink:#1c1c22;--mut:#6b6b78;--line:#e7e7ee;
--accent:#5b4bd6;--chip:#f1f1f7;--mono:ui-monospace,SFMono-Regular,Menlo,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);
font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:980px;margin:0 auto;padding:20px 18px 60px}
h1{font-size:19px;margin:0 0 2px}.sub{color:var(--mut);font-size:12.5px;font-family:var(--mono)}
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:16px 0}
@media(max-width:680px){.stats{grid-template-columns:repeat(2,1fr)}}
.stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:9px 11px}
.stat.hl{background:linear-gradient(180deg,#f4f2ff,#fff);border-color:#ddd7fb}
.stat .n{font-size:18px;font-weight:650}.stat .l{color:var(--mut);font-size:10.5px;text-transform:uppercase;letter-spacing:.4px}
.grp{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--mut);margin:16px 0 6px}
.card{background:var(--card);border:1px solid var(--line);border-radius:11px;padding:10px 13px;margin-bottom:8px}
.tag{font-family:var(--mono);font-size:10px;font-weight:700;padding:1px 6px;border-radius:5px}
.chips{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 0}
.chip{font-family:var(--mono);font-size:10.5px;background:var(--chip);border:1px solid var(--line);border-radius:6px;padding:1px 6px}
.chip.f{background:#f3f7f4;border-color:#dcebe3}.chip.e{background:#fff5ec;border-color:#f4ddc4}
.id{font-family:var(--mono);font-size:10.5px;color:var(--mut)}
footer{color:var(--mut);font-size:11.5px;margin-top:18px;font-family:var(--mono)}
</style></head><body><div class="wrap"><h1>__TITLE__</h1><div class="sub" id="sub"></div>
<div class="stats" id="stats"></div><div id="body"></div><footer id="foot"></footer></div>
<script id="mem" type="application/json">__DATA__</script><script>
const M=JSON.parse(document.getElementById('mem').textContent),e=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;');
document.getElementById('sub').textContent=(M.meta||[]).join('  ·  ');
document.getElementById('stats').innerHTML=(M.stats||[]).map((c,i)=>`<div class="stat${i>=M.stats.length-1?' hl':''}"><div class="n">${c[1]}</div><div class="l">${e(c[0])}</div></div>`).join('');
const B=document.getElementById('body');
if(M._type==='sessions_index'){
  const groups={};M.sessions.forEach(s=>{(groups[s.theme]=groups[s.theme]||[]).push(s)});
  B.innerHTML=Object.keys(groups).sort().map(g=>`<div class="grp">${e(g)} (${groups[g].length})</div>`+
    groups[g].map(s=>`<div class="card"><span class="tag" style="background:#eef;color:#5b4bd6">${e(s.status)}</span>
      <b style="margin-left:7px">${e(s.title)}</b><div class="id">${e(s.id)}${s.deep?'  ·  deep store ✓':''}</div></div>`).join('')).join('');
}else{ // deep turns
  B.innerHTML=M.turns.map(t=>{const ch=(a,c)=>a&&a.length?`<div class="chips">${a.map(x=>`<span class="chip ${c}">${e(x)}</span>`).join('')}</div>`:'';
    return `<div class="card"><span class="tag" style="background:#eaf0ff;color:#2f57d6">${t.seq}</span>
      <b style="margin-left:7px">${e(t.user.summary)}</b><div style="margin-top:3px">${e(t.assistant.summary)}</div>
      ${ch(t.io.files,'f')}${ch(t.io.tools,'')}${ch(t.io.envelopes,'e')}</div>`;}).join('');
}
document.getElementById('foot').textContent='schema: '+(M.schema||'')+'  ·  '+(M.note||'')+'  ·  self-contained, 0 tokens to view';
</script></body></html>"""

def write_html(out_dir, title, data):
    p = pathlib.Path(out_dir) / "index.html"
    p.write_text(SHELL.replace("__TITLE__", html.escape(title)).replace("__DATA__", json.dumps(data, ensure_ascii=False)))
    return p

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="mode", required=True)
    pi = sub.add_parser("index"); pi.add_argument("--sessions", required=True); pi.add_argument("--out", required=True)
    ps = sub.add_parser("session"); ps.add_argument("--turns", required=True); ps.add_argument("--out", required=True)
    a = ap.parse_args()
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)

    if a.mode == "index":
        sessions = json.loads(pathlib.Path(a.sessions).read_text())
        rows = [{"id": s["id"], "title": s["title"], "status": s.get("status", "idle"),
                 "theme": theme_of(s["title"]), "deep": s.get("deep", False)} for s in sessions]
        themes = sorted({r["theme"] for r in rows})
        mem = {"_type": "sessions_index", "schema": "messages-api + e2m-envelope",
               "note": "cross-session map (metadata-level); deep stores generated per session on demand",
               "meta": ["Cowork · macOS", "operator index", f"{len(rows)} sessions"],
               "stats": [["sessions", len(rows)], ["themes", len(themes)],
                         ["coworker-setups", sum(r["theme"] == "coworker-setup" for r in rows)],
                         ["deep stores", sum(bool(r["deep"]) for r in rows)],
                         ["tokens (this index)", "~0"]],
               "sessions": rows}
        mp = out / "memory.json"; mp.write_text(json.dumps(mem, ensure_ascii=False, indent=2))
        mem["stats"][-1][1] = "~" + str(est_tokens(mp))
        mp.write_text(json.dumps(mem, ensure_ascii=False, indent=2))
        hp = write_html(out, "Cowork sessions — operator index", mem)
        print(json.dumps({"ok": True, "mode": "index", "sessions": len(rows),
                          "memory": str(mp), "html": str(hp), "index_tokens": mem["stats"][-1][1]}))

    elif a.mode == "session":
        data = json.loads(pathlib.Path(a.turns).read_text())
        turns = data["turns"]
        full = sum(t.get("tokens_est", 0) for t in turns)
        mem = {"_type": "session_memory", "schema": "messages-api + e2m-envelope",
               "session": data.get("session", {}),
               "note": "curated episode index (dreams-style) — one record per exchange, not the raw transcript",
               "meta": [data.get("session", {}).get("surface", "Cowork"), data.get("session", {}).get("model", ""),
                        data.get("session", {}).get("date", "")],
               "turns": turns}
        mp = out / "memory.json"; mp.write_text(json.dumps(mem, ensure_ascii=False, indent=2))
        memt = est_tokens(mp); comp = f"{round(full / memt)}:1" if memt else "n/a"
        mem["stats"] = [["turns", len(turns)],
                        ["files", len({f for t in turns for f in t["io"]["files"] if "<16" not in f})],
                        ["e2m tasks", sum(len(t["io"].get("envelopes", [])) for t in turns)],
                        ["full→mem tok", f"{full}→{memt}"], ["compression", comp]]
        mp.write_text(json.dumps(mem, ensure_ascii=False, indent=2))
        hp = write_html(out, "Session memory — " + data.get("session", {}).get("title", ""), mem)
        print(json.dumps({"ok": True, "mode": "session", "turns": len(turns),
                          "compression": comp, "memory": str(mp), "html": str(hp)}))

if __name__ == "__main__":
    main()
