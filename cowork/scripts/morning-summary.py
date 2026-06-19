#!/usr/bin/env python3
"""
morning-summary.py — run by project-management-coworker at 07:00 PST
@cite cowork/templates/task-state-machine.ts
Generates HTML morning summary, dispatches to pm-coworker mailbox.
Saves to cowork/artifacts/morning-summary-YYYY-MM-DD.html
"""
import json, uuid, datetime, pathlib, subprocess, collections

QUEUE_DIR   = pathlib.Path("cowork/data/queues")
MAILBOX_DIR = pathlib.Path("cowork/data/mailbox")
ARTIFACT_DIR = pathlib.Path("cowork/artifacts")
now = datetime.datetime.utcnow()
now_str = now.strftime("%Y-%m-%dT%H:%M:%SZ")
date_str = now.strftime("%Y-%m-%d")

# Collect queue stats
queue_stats = {}
total_completed = 0
for qf in sorted(QUEUE_DIR.glob("*.jsonl")):
    counts = collections.Counter()
    last_states = {}
    for line in qf.read_text().strip().splitlines():
        if not line.strip(): continue
        try:
            rec = json.loads(line)
        except: continue
        if rec.get("_type") == "transition":
            last_states[rec.get("task_id","?")] = rec.get("new_state","?")
        elif rec.get("_type") == "task":
            last_states[rec.get("id","?")] = rec.get("state","pending")
    for s in last_states.values():
        counts[s] += 1
    queue_stats[qf.stem] = dict(counts)
    total_completed += counts.get("completed", 0)

# Get recent git log (last 8h)
try:
    result = subprocess.run(
        ["git", "log", "--oneline", "--since=8 hours ago", "--no-merges"],
        capture_output=True, text=True, timeout=10
    )
    recent_commits = result.stdout.strip().splitlines()[:10]
except:
    recent_commits = ["(git log unavailable)"]

# Build HTML
rows = ""
for domain, counts in sorted(queue_stats.items()):
    p = counts.get("pending", 0)
    ip = counts.get("in_progress", 0)
    c = counts.get("completed", 0)
    b = counts.get("blocked", 0)
    color = "#f47067" if b > 0 else ("#7bd88f" if c > 0 else "#51c4ff")
    rows += f'<tr><td style="color:{color}">{domain}</td><td style="color:#51c4ff">{p}</td><td style="color:#7bd88f">{ip}</td><td style="color:#f47067">{b}</td><td style="color:#6a6a6a">{c}</td></tr>'

commits_html = "".join(f'<div class="commit">{c}</div>' for c in recent_commits) if recent_commits else '<div class="commit" style="color:#6a6a6a">No commits in last 8h</div>'

html = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Morning Summary — {date_str}</title>
<style>
* {{ box-sizing: border-box; }}
html,body {{ margin:0;padding:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;background:#0a0a0a;color:#d4d4d4;font-size:13px; }}
#header {{ padding:10px 16px 12px;border-bottom:1px solid #1f1f1f;display:flex;align-items:baseline;gap:16px; }}
#header h1 {{ margin:0;font-size:15px;font-weight:600;letter-spacing:1px;color:#f4f4f4; }}
#header .meta {{ font-size:11px;color:#6a6a6a; }}
#header .badge {{ margin-left:auto;font-size:10px;text-transform:uppercase;letter-spacing:1px;border:1px solid #2a2a2a;padding:2px 8px;color:#7bd88f; }}
main {{ padding:12px 16px 40px; }}
.section {{ margin-bottom:24px; }}
.section-header {{ display:flex;align-items:baseline;gap:10px;padding:6px 0;border-bottom:1px solid #1f1f1f;margin-bottom:10px; }}
.section-label {{ font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:600; }}
.lbl-cyan {{ color:#51c4ff; }} .lbl-green {{ color:#7bd88f; }} .lbl-amber {{ color:#f4a73b; }}
table {{ border-collapse:collapse;width:100%;font-size:12px; }}
th,td {{ padding:.35rem .7rem;border:1px solid #1f1f1f;text-align:left; }}
th {{ background:#111;color:#9a9a9a;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.5px; }}
tr:hover {{ background:#111; }}
.commit {{ font-size:11px;padding:4px 8px;border-left:2px solid #51c4ff;margin-bottom:4px;color:#9a9a9a; }}
.note {{ margin:12px 0;border:1px solid #2a2a2a;border-left:3px solid #7bd88f;padding:8px 12px;background:#111;font-size:11px;color:#9a9a9a; }}
</style></head><body>
<div id="header">
  <h1>morning summary</h1>
  <span class="meta">{date_str} · project-management-coworker</span>
  <span class="badge">07:00 PST</span>
</div>
<main>
<div class="note">Generated at {now_str} by project-management-coworker (claude-opus-4-6). Dispatched to product-management-coworker mailbox.</div>
<div class="section">
  <div class="section-header"><span class="section-label lbl-cyan">queue health</span></div>
  <table><thead><tr><th>domain</th><th>pending</th><th>in_progress</th><th>blocked</th><th>completed</th></tr></thead>
  <tbody>{rows}</tbody></table>
</div>
<div class="section">
  <div class="section-header"><span class="section-label lbl-green">recent commits</span><span style="font-size:10px;color:#6a6a6a">last 8h</span></div>
  {commits_html}
</div>
</main></body></html>"""

ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
out = ARTIFACT_DIR / f"morning-summary-{date_str}.html"
out.write_text(html)
print(f"written: {out}")

# Dispatch to pm-coworker mailbox
MAILBOX_DIR.mkdir(parents=True, exist_ok=True)
msg = {
    "_type": "message", "id": str(uuid.uuid4()),
    "from": "project-management-coworker", "to": "pm-coworker",
    "subject": f"Morning summary ready — {total_completed} completed tasks, {len(recent_commits)} commits",
    "state": "pending", "at": now_str,
    "payload": {"artifact": str(out), "queue_stats": queue_stats}
}
with open(MAILBOX_DIR / "pm-coworker.jsonl", "a") as f:
    f.write(json.dumps(msg) + "\n")
print(json.dumps({"status": "ok", "artifact": str(out), "at": now_str}))
