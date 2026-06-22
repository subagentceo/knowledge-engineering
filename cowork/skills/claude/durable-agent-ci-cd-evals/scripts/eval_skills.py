#!/usr/bin/env python3
"""
durable-agent-ci-cd-evals — deterministic skill scorer.

@cite .claude/skills/durable-agent-ci-cd-rubrics/SKILL.md
@cite cowork/templates/task-state-machine.ts
@cite cowork/mcp/e2m-mcp/server.ts
"""
from __future__ import annotations
import argparse, json, re, sys
from datetime import datetime, timezone
from pathlib import Path

RUBRIC_VERSION = "1.0.0"
BLOCKING = {"D1_type_safety": 2, "D2_durability": 2, "D3_agent_reuse": 3, "D4_packaging": 3}
WEIGHTS  = {"D1_type_safety": 0.30, "D2_durability": 0.30, "D3_agent_reuse": 0.25, "D4_packaging": 0.15}

# ── scorers ──────────────────────────────────────────────────────────────────

def score_d1(text: str, skill_dir: Path) -> tuple[int, str]:
    has_cite      = "@cite" in text
    ref_dir       = skill_dir / "references"
    has_ref_schema = any(
        f.suffix in (".ts", ".py") and "schema" in f.name
        for f in ref_dir.iterdir()
    ) if ref_dir.exists() else False
    has_schema    = any(x in text for x in ["z.object","Zod","zod","BaseModel","Pydantic","schema.ts","schema.py","DurableTask"])
    emit_typed    = bool(re.search(
        r'(append|emit|write|json\.dumps|jsonl|appendLine).{0,300}(DurableTask|schema|Zod|BaseModel|queue)',
        text, re.DOTALL | re.IGNORECASE
    ))
    if has_cite and (has_schema or has_ref_schema) and emit_typed: return 5, "cite+schema+emit-typed"
    if (has_schema or has_ref_schema) and emit_typed:              return 4, "schema+emit-typed"
    if has_schema or has_ref_schema:                               return 3, "schema present"
    if re.search(r'```json', text):                                return 2, "inline JSON example"
    if re.search(r'emit|output|json', text, re.IGNORECASE):        return 1, "implicit types"
    return 0, "no types"

def score_d2(text: str, _skill_dir: Path) -> tuple[int, str]:
    has_jsonl   = bool(re.search(r'engineering\.jsonl|skill-grades\.jsonl|\.jsonl', text))
    has_task    = bool(re.search(r'DurableTask|durable_task|"queue".*engineering', text))
    has_fields  = bool(re.search(r'resolvable|error_type|suggested_skill', text))
    full_schema = bool(re.search(r'ke_fit_score|created_at.*updated_at|"queue"', text))
    has_echo    = bool(re.search(r'\[FAIL\]|\[OK\]|\[INSTALL\]|stderr|log_fail', text))
    has_struct  = bool(re.search(r'json\.dumps|JSON\.stringify', text, re.IGNORECASE))
    if has_task and has_fields and full_schema: return 5, "full DurableTask schema"
    if has_task and has_fields:                 return 4, "DurableTask+fields"
    if has_task or has_jsonl:                   return 3, "DurableTask/JSONL present"
    if has_struct:                              return 2, "structured failure output"
    if has_echo:                                return 1, "echo logging only"
    return 0, "no failure handling"

def _extract_desc(text: str) -> str:
    m = re.search(r'^description:\s*>\n((?:  .+\n)+)', text, re.MULTILINE)
    if m:
        return re.sub(r'\n\s+', ' ', m.group(1)).strip()
    m2 = re.search(r'^description:\s*(.+)', text, re.MULTILINE)
    return m2.group(1).strip() if m2 else ""

def score_d3(text: str, desc: str) -> tuple[int, str]:
    dlen         = len(desc)
    has_triggers = bool(re.search(r'[Ff]ire|[Tt]rigger|[Ww]henever|[Uu]se when', text))
    has_negative = bool(re.search(r'[Dd]o NOT|[Nn]ever use|[Nn]ot for|[Dd]o not use', text))
    has_peer     = bool(re.search(r'[Pp]airs with|durable-agent|durable-toolchain|durable-lru|durable-pg', text))
    valid_len    = 100 <= dlen <= 1024
    no_angle     = "<" not in desc and ">" not in desc
    if valid_len and no_angle and has_triggers and has_negative and has_peer:
        return 5, f"desc {dlen}ch triggers+neg+peer"
    if valid_len and no_angle and has_triggers and has_negative:
        return 4, f"desc {dlen}ch triggers+neg"
    if (valid_len or dlen > 100) and has_triggers:
        return 3, f"desc {dlen}ch triggers present"
    if dlen > 100:
        return 2, f"desc {dlen}ch no triggers"
    if dlen > 0:
        return 1, f"desc {dlen}ch too terse"
    return 0, "description missing"

def score_d4(text: str, skill_dir: Path) -> tuple[int, str]:
    has_name    = bool(re.search(r'^name:\s*\S', text, re.MULTILINE))
    has_desc_kw = bool(re.search(r'^description:', text, re.MULTILINE))
    desc        = _extract_desc(text)
    desc_ok     = 0 < len(desc) <= 1024 and "<" not in desc and ">" not in desc
    refs_needed = bool(re.search(r'references/|scripts/', text))
    has_refs    = (skill_dir / "references").is_dir()
    has_scripts = (skill_dir / "scripts").is_dir()
    bundled_ok  = (not refs_needed) or has_refs or has_scripts
    packaged    = bool(list(skill_dir.parent.glob(f"{skill_dir.name}.skill")))
    if not (skill_dir / "SKILL.md").exists():    return 0, "no SKILL.md"
    if not (has_name and has_desc_kw):           return 1, "frontmatter incomplete"
    if not desc_ok:
        reason = f"len={len(desc)}" + (" angle=Y" if "<" in desc or ">" in desc else "")
        return 2, f"desc invalid: {reason}"
    if not bundled_ok:                           return 3, "refs/scripts missing"
    if packaged:                                 return 5, "packaged .skill present"
    return 3, "valid frontmatter, not packaged"

# ── grade ────────────────────────────────────────────────────────────────────

def grade_skill(skill_dir: Path) -> dict:
    md = skill_dir / "SKILL.md"
    text = md.read_text() if md.exists() else ""
    desc = _extract_desc(text)

    d1, e1 = score_d1(text, skill_dir)
    d2, e2 = score_d2(text, skill_dir)
    d3, e3 = score_d3(text, desc)
    d4, e4 = score_d4(text, skill_dir)

    scores = {
        "D1_type_safety": {"score": d1, "weight": 0.30, "evidence": e1},
        "D2_durability":  {"score": d2, "weight": 0.30, "evidence": e2},
        "D3_agent_reuse": {"score": d3, "weight": 0.25, "evidence": e3},
        "D4_packaging":   {"score": d4, "weight": 0.15, "evidence": e4},
    }
    total = sum(v["score"] * v["weight"] for v in scores.values())

    blocking = [
        k for k, v in scores.items()
        if v["score"] < BLOCKING[k]
    ]
    if total >= 3.5 and not blocking:
        verdict = "PASS"
    elif total >= 3.5 and blocking:
        verdict = "BLOCK"
    elif total >= 2.5:
        verdict = "ADVISORY"
    else:
        verdict = "FAIL"

    gaps = []
    targets = {"D1_type_safety": 5, "D2_durability": 5, "D3_agent_reuse": 5, "D4_packaging": 5}
    fixes = {
        "D1_type_safety": "Add Zod/Pydantic schema and @cite on every emit path",
        "D2_durability":  "Emit DurableTask to engineering.jsonl on failure with resolvable+error_type+suggested_skill",
        "D3_agent_reuse": "Add trigger phrases, negative cases, and a peer skill name to description frontmatter",
        "D4_packaging":   "Run skill-creator packager and commit .skill zip alongside directory",
    }
    for k, v in scores.items():
        if v["score"] < targets[k]:
            gaps.append({"dim": k, "current": v["score"], "target": targets[k], "fix": fixes[k]})

    return {
        "skill": skill_dir.name,
        "rubric_version": RUBRIC_VERSION,
        "graded_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "scores": scores,
        "total": round(total, 2),
        "verdict": verdict,
        "blocking": blocking,
        "gaps": gaps,
    }

# ── HTML ─────────────────────────────────────────────────────────────────────

def render_html(grades: list[dict], run_date: str) -> str:
    color = {"PASS": "#22c55e", "ADVISORY": "#f59e0b", "BLOCK": "#f97316", "FAIL": "#ef4444"}
    rows = ""
    for g in sorted(grades, key=lambda x: x["total"]):
        s = g["scores"]
        top_gap = g["gaps"][0]["fix"][:60] if g["gaps"] else "—"
        rows += f"""<tr>
  <td>{g['skill']}</td>
  <td class="c">{s['D1_type_safety']['score']}</td>
  <td class="c">{s['D2_durability']['score']}</td>
  <td class="c">{s['D3_agent_reuse']['score']}</td>
  <td class="c">{s['D4_packaging']['score']}</td>
  <td class="c"><b>{g['total']:.2f}</b></td>
  <td style="color:{color.get(g['verdict'],'#888')};font-weight:bold">{g['verdict']}</td>
  <td style="font-size:0.8em">{top_gap}</td>
</tr>"""
    counts = {v: sum(1 for g in grades if g["verdict"] == v) for v in ["PASS","ADVISORY","BLOCK","FAIL"]}
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Skill Gate {run_date}</title>
<style>body{{font-family:monospace;background:#0f172a;color:#e2e8f0;padding:2rem}}
table{{border-collapse:collapse;width:100%}}th,td{{padding:.4rem .8rem;border:1px solid #334155;text-align:left}}
th{{background:#1e293b}}.c{{text-align:center}}tr:hover{{background:#1e293b}}</style></head><body>
<h2>Skill Merge Gate — {run_date}</h2>
<p>PASS: {counts['PASS']} &nbsp; ADVISORY: {counts['ADVISORY']} &nbsp;
BLOCK: {counts['BLOCK']} &nbsp; FAIL: {counts['FAIL']}</p>
<table><tr><th>Skill</th><th>D1</th><th>D2</th><th>D3</th><th>D4</th>
<th>Total</th><th>Verdict</th><th>Top gap</th></tr>{rows}</table></body></html>"""

# ── main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    p = argparse.ArgumentParser(description="Score skills against the durable-agent-ci-cd rubric")
    p.add_argument("--skills-dir", default=".claude/skills", help="Root of skill directories")
    p.add_argument("--skill", default=None, help="Grade a single skill by name")
    p.add_argument("--output", default="cowork/data/queues/skill-grades.jsonl")
    p.add_argument("--html", default=None, help="Write HTML scorecard to this path")
    args = p.parse_args()

    skills_dir = Path(args.skills_dir)
    if not skills_dir.exists():
        print(f"[FAIL] skills-dir not found: {skills_dir}", file=sys.stderr)
        sys.exit(1)

    if args.skill:
        dirs = [skills_dir / args.skill]
    else:
        dirs = sorted(d for d in skills_dir.iterdir() if d.is_dir() and not d.name.endswith(".skill"))

    grades = []
    for skill_dir in dirs:
        if not (skill_dir / "SKILL.md").exists():
            print(f"[SKIP] {skill_dir.name}: no SKILL.md", file=sys.stderr)
            continue
        g = grade_skill(skill_dir)
        grades.append(g)

    # write grades
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("a") as f:
        for g in grades:
            f.write(json.dumps(g) + "\n")

    # print table
    print(f"\nSKILL MERGE GATE — {datetime.now().strftime('%Y-%m-%d')}")
    print("═" * 80)
    print(f"{'skill':<40} D1  D2  D3  D4  total  verdict")
    print("─" * 80)
    for g in sorted(grades, key=lambda x: x["total"]):
        s = g["scores"]
        print(f"{g['skill']:<40} {s['D1_type_safety']['score']}   {s['D2_durability']['score']}   "
              f"{s['D3_agent_reuse']['score']}   {s['D4_packaging']['score']}   "
              f"{g['total']:.2f}   {g['verdict']}"
              + (f"  ← blocking: {','.join(g['blocking'])}" if g["blocking"] else ""))
    print("═" * 80)
    counts = {v: sum(1 for g in grades if g["verdict"] == v) for v in ["PASS","ADVISORY","BLOCK","FAIL"]}
    print(f"PASS: {counts['PASS']}  ADVISORY: {counts['ADVISORY']}  BLOCK: {counts['BLOCK']}  FAIL: {counts['FAIL']}")

    # html
    if args.html:
        html_path = Path(args.html)
        html_path.parent.mkdir(parents=True, exist_ok=True)
        html_path.write_text(render_html(grades, datetime.now().strftime("%Y-%m-%d")))
        print(f"\nHTML scorecard → {html_path}")

    print(f"Grades appended → {out}")

if __name__ == "__main__":
    main()
