#!/usr/bin/env python3
"""
build_op.py — generate the Coworkers OP1 as standalone HTML, one ~6-page document per S-team manager.

Amazon OP1 model (references/amazon-operating-cadence.md): the 12 managers are the S-team; each owns one
6-page OP1 narrative for their domain + business strategy as of June 2026, across the provider landscape
(GCP / Azure / AWS / Anthropic / OpenAI), to launch the coworkers startup. Authored as standalone HTML —
the "unreasonable effectiveness of HTML" — so each is written/iterated independently (impossible to one-shot
by design; filled over the WBR/PR-FAQ cadence). Served locally via miniflare.

  python3 cowork/coworkers/operational-plan/build_op.py

@cite cowork/managers/managers.manifest.yaml · references/amazon-operating-cadence.md
@cite cowork/standards/agent-hierarchy.md, operator-routing.md
@cite https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html
"""
import yaml, json, pathlib, html

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MAN = yaml.safe_load((ROOT / "cowork/managers/managers.manifest.yaml").read_text())
PROVIDERS = ["GCP / Vertex", "Azure / Foundry", "AWS / Bedrock", "Anthropic (1p)", "OpenAI"]

SEED = {  # §3b — what this domain shipped this session (managers extend)
    "engineering": "support-claude-docs .mcpb + the support-claude-sitemap crawler",
    "data": "e2m-OKF (semantic layer over the postgres DDL)",
    "design": "the canonical 8-token design system (this plan uses it)",
    "operations": "provider portability 1p→3p (Configure Third-Party Inference gateway)",
    "project-management": "the operator-routing protocol (this manager is the default router)",
    "product-management": "the product-vision roadmap + this OP1 scaffold",
    "agent-resources": "the agent hierarchy + the session-memory operator skill",
    "finance": "1p-subscription bootstrap economics + the 3p token-billing model",
    "legal": "the OAuth-only invariant + subscription-vs-API policy reconciliation",
    "compliance": "OTel-first observability (Cowork isn't in audit logs) + the durability gate",
    "sales": "—", "human-resources": "—",
}

TOK = ":root{--bg:#0a0a0a;--text:#d4d4d4;--bright:#f4f4f4;--cyan:#51c4ff;--green:#7bd88f;--amber:#e6b455;--red:#ff6b6b;--border:#2a2a2a;--card:#111;--mut:#6a6a6a}"
CSS = (TOK + "*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6}"
       ".wrap{max-width:920px;margin:0 auto;padding:26px 20px 80px}h1{color:var(--bright);font-size:18px;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px}"
       ".meta{color:var(--mut);font-size:11px;text-transform:uppercase;letter-spacing:1px}a{color:var(--cyan);text-decoration:none}a:hover{color:var(--bright)}"
       "h2{color:var(--cyan);font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--border);padding-bottom:5px;margin:26px 0 8px}"
       "h3{color:var(--bright);font-size:12px;margin:12px 0 4px}.card{background:var(--card);border:1px solid var(--border);padding:11px 13px;margin:8px 0}"
       "table{border-collapse:collapse;width:100%;font-size:11.5px;margin:6px 0}th,td{border:1px solid var(--border);padding:4px 7px;text-align:left}"
       "th{color:var(--mut);text-transform:uppercase;letter-spacing:.5px;font-size:10px}.badge{color:var(--green)}.amber{color:var(--amber)}.red{color:var(--red)}.mut{color:var(--mut)}"
       ".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}@media(max-width:680px){.grid{grid-template-columns:1fr}}"
       "ul{margin:5px 0;padding-left:18px}li{margin:3px 0}.tbd{color:var(--mut);font-style:italic}footer{color:var(--mut);font-size:11px;margin-top:30px;border-top:1px solid var(--border);padding-top:10px}")

def page(title, body):
    return (f"<!doctype html><html lang=en><head><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>"
            f"<title>{html.escape(title)}</title><style>{CSS}</style></head><body><div class=wrap>{body}</div></body></html>")

def metrics_table():
    rows = "".join("<tr><td class=tbd>&lt;metric&gt;</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td></tr>" for _ in range(6))
    return ("<table><tr><th>metric (input/output)</th><th>2025</th><th>2026 YTD</th><th>2026 plan</th><th>2027 goal</th><th>YoY%</th></tr>"
            + rows + "</table><div class=mut>propose 8–15 metrics; inputs are controllable + customer-facing, outputs are financial/commercial.</div>")

def provider_table(domain):
    head = "<tr><th>capability</th>" + "".join(f"<th>{html.escape(p)}</th>" for p in PROVIDERS) + "</tr>"
    rows = "".join("<tr><td class=tbd>&lt;" + domain + " capability&gt;</td>" + "".join("<td class=tbd>·</td>" for _ in PROVIDERS) + "</tr>" for _ in range(3))
    return "<table>" + head + rows + "</table><div class=mut>position this domain across the 5 providers — where we build on each, where we stay neutral (our 1p→3p gateway).</div>"

def initiative(n):
    return (f"<div class=card><b class=badge>Initiative {n}</b> <span class=tbd>&lt;SMART name&gt;</span>"
            "<table><tr><th>owner</th><th>start</th><th>end</th><th>metric impact</th><th>resources</th><th>baseline/incr</th><th>deps</th></tr>"
            "<tr><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td><td class=tbd>·</td></tr></table>"
            "<div class=mut>1–2 paragraphs: specific description, projected impact on §2 metrics, resources, fixed/variable costs, PR/FAQ link.</div></div>")

def section(m):
    e = html.escape; seed = SEED.get(m["domain"], "—")
    body = f"""
<h1>OP1 2026 · {e(m['display'])}</h1>
<div class=meta>S-team author: {e(m['id'])}  ·  team: {e(m['coworker'])} + {e(m['domain'])}-subagents  ·  <a href=index.html>← S-team plan</a>  ·  <a href=references/amazon-operating-cadence.md>cadence</a></div>

<h2>1 · Introduction</h2>
<div class=card><b>Charter:</b> {e(m['charter'])}<br><span class=mut>team / scope / tenets — manager fills (¼ page).</span></div>

<h2>2 · Metrics (inputs &amp; outputs)</h2>
{metrics_table()}

<h2>3 · Prior-year review &amp; trends</h2>
<div class=card>
<h3>a · metric commentary</h3><span class=tbd>explain the key variances in §2.</span>
<h3>b · outcomes delivered</h3>shipped this session: {e(seed)} <span class=mut>(manager extends vs plan)</span>
<h3>c · wins / mistakes / misses / learnings</h3><span class=tbd>what worked, what didn't, learnings carried forward.</span>
<h3>d · new trends — provider landscape (June 2026)</h3>{provider_table(m['domain'])}
</div>

<h2>4 · Key initiatives (SMART, priority order)</h2>
{initiative(1)}{initiative(2)}{initiative(3)}
<div class=mut>baseline = current resources; incremental = needs S-team-approved resources. List in priority order; call out dependencies + whether they appear in the dependent manager's OP1.</div>

<h2>5 · Resources</h2>
<table><tr><th>role / agent</th><th>today</th><th>plan 2027</th></tr>
<tr><td>{e(m['coworker'])}</td><td>1</td><td class=tbd>·</td></tr>
<tr><td>{e(m['domain'])}-subagents</td><td class=tbd>·</td><td class=tbd>·</td></tr></table>
<div class=mut>non-HC costs (provider tokens, SaaS, marketing) — manager fills; tie to the 1p→3p gateway economics.</div>

<h2>Appendices</h2>
<div class=card><b>A1 · P&amp;L</b> <span class=tbd>· A2 · initiatives table · A3 · HC detail · A4 · roadmap by month</span>
<h3>A5 · FAQ</h3><ul>
<li class=mut>single biggest needle-mover for this domain, and how we organize for it?</li>
<li class=mut>disruptive (bold/risky) ideas?</li>
<li class=mut>top misses + learnings?</li>
<li class=mut>dependencies you wish you controlled? "dogs not barking" (blind spots)?</li></ul></div>

<footer>contributors: {e(m['coworker'])} + {e(m['domain'])}-subagents · outcomes → e2m DurableTasks (evaluator = the goal) · gated by OTel/Sentry + rubric · iterated over the WBR/PR-FAQ cadence — impossible to one-shot by design · 8-token system</footer>
"""
    return page(f"OP1 2026 — {m['display']}", body)

def index(managers):
    e = html.escape
    cards = "".join(f"<a class=card href={m['id']}.html><b style='color:var(--bright)'>{e(m['display'])}</b><br><span class=mut>{e(m['id'])}</span>"
                    + (" <span class=badge>· router</span>" if m.get('router') else "") + "</a>" for m in managers)
    body = f"""
<h1>Coworkers — OP1 2026 (the year plan)</h1>
<div class=meta>the S-team annual operating plan · launch the coworkers startup · as of June 2026</div>
<div class=card>Amazon <b style='color:var(--bright)'>OP1</b> model (<a href=references/amazon-operating-cadence.md>cadence reference</a>):
the <b style='color:var(--bright)'>S-team = the 12 managers</b>, each owning a ~6-page OP1 narrative for their domain
+ business strategy across <b style='color:var(--bright)'>GCP · Azure · AWS · Anthropic · OpenAI</b>. The operator = CEO sets
top-down targets; managers write bottom-up plans; the S-team reviews and approves. Written as standalone HTML so each
section is authored/iterated independently — <b style='color:var(--bright)'>impossible to one-shot by design</b>, filled over the
WBR / PR-FAQ cadence.</div>
<h2>S-team ({len(managers)}) — one 6-page OP1 each</h2>
<div class=grid>{cards}</div>
<h2>Cadence</h2>
<div class=card><ul>
<li><span class=badge>WBR (weekly)</span> = the morning-summary / nightly-review over the e2m queues.</li>
<li><span class=badge>PR/FAQ (continuous)</span> = the product process turning ideas → SMART initiatives.</li>
<li><span class=badge>annual</span> = this OP1: CEO guidance (June) → managers write (now) → S-team review → approve.</li>
<li><span class=badge>S-team goals</span> = ~15% of initiatives the operator designates as company-critical; tracked to green.</li></ul></div>
<footer>simulate locally: <span style='color:var(--cyan)'>npx wrangler dev</span> (miniflare) — see README.md · top-down guidance: operating-cadence.md</footer>
"""
    return page("Coworkers — OP1 2026", body)

def main():
    managers = MAN["managers"]
    (HERE / "index.html").write_text(index(managers))
    for m in managers:
        (HERE / f"{m['id']}.html").write_text(section(m))
    (HERE / "manifest.json").write_text(json.dumps(
        {"_type": "op1_plan", "year": 2026, "model": "amazon-op1 / s-team", "pages_per_section": 6,
         "providers": PROVIDERS, "sections": len(managers),
         "s_team": [m["id"] for m in managers], "router": [m["id"] for m in managers if m.get("router")]}, indent=2))
    print(json.dumps({"ok": True, "sections": len(managers), "providers": len(PROVIDERS),
                      "files": ["index.html"] + [f"{m['id']}.html" for m in managers]}))

if __name__ == "__main__":
    main()
