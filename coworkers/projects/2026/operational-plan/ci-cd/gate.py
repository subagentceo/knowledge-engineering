#!/usr/bin/env python3
"""Improved skill gate: rubrics -> evals -> outcomes, composed with the structured-prompt skills.

Scans SKILL.md files, applies RUBRIC.md (hard gates + scored dims), writes grades.jsonl and a pass/block
verdict. Hard gate #1 = no XML/angle-bracket tags in SKILL.md (description or body).

Usage: python3 gate.py [skills_dir]   (default: ../skills and ../agents)
"""
import sys, os, re, json, glob, datetime

ROOT = os.path.dirname(os.path.abspath(__file__))
DIRS = sys.argv[1:] or [os.path.join(ROOT, "..", "skills"), os.path.join(ROOT, "..", "agents")]
GRADES = os.path.join(ROOT, "grades.jsonl")
ENG_QUEUE = os.path.normpath(os.path.join(ROOT, "..", "data", "queues", "engineering.jsonl"))

def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m: return None, text
    import yaml
    try:
        return yaml.safe_load(m.group(1)), m.group(2)
    except yaml.YAMLError:
        return None, m.group(2)  # unparseable frontmatter -> hard-gate block

def grade(path):
    text = open(path).read()
    fm, body = frontmatter(text)
    gaps, hard_fail = [], False
    # hard gate 1: no XML anywhere
    if re.search(r"<[^>]+>", text):
        gaps.append("XML/angle-bracket tags in SKILL.md (hard gate)"); hard_fail = True
    # hard gate 2: frontmatter
    if not fm or not all(k in (fm or {}) for k in ("name", "description", "model")):
        gaps.append("frontmatter missing name/description/model (hard gate)"); hard_fail = True
    # hard gate 3: outcome contract
    if not re.search(r"outcome|evaluator|pass_if|verdict|rubric", body, re.I):
        gaps.append("no outcome/evaluator contract (hard gate)"); hard_fail = True
    # scored dims (0-5)
    dims = {
        "type-safety": 4 if re.search(r"typed|schema|zod|Envelope|DurableTask", body) else 2,
        "durability":  4 if re.search(r"JSONL|e2m|durable|append", body, re.I) else 2,
        "agent-reuse": 4 if re.search(r"agent_directory|skills|plugins|reuse|registry", body, re.I) else 2,
        "packaging":   4 if (fm and fm.get("name")) else 2,
        "triggering":  4 if (fm and len(re.findall(r",", fm.get("description",""))) >= 2) else 2,
        "determinism": 4 if re.search(r"\b1\.\s|\bstep|deterministic|loop", body, re.I) else 2,
        "io_contract": 4 if re.search(r"input|output|result|argument", body, re.I) else 2,
        "traceability":4 if re.search(r"Sources|cite|@cite", body) else 2,
    }
    weighted = round(sum(dims.values()) / len(dims), 2)
    if hard_fail: verdict = "block"
    elif weighted >= 3.5: verdict = "pass"
    elif weighted >= 3.0: verdict = "advisory"
    else: verdict = "block"; gaps.append(f"weighted {weighted} < 3.0")
    return {"skill": os.path.basename(os.path.dirname(path)), "path": path,
            "verdict": verdict, "weighted": weighted, "dims": dims, "gaps": gaps}

def main():
    now = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z")
    results = []
    for d in DIRS:
        for p in sorted(glob.glob(os.path.join(d, "**", "SKILL.md"), recursive=True)):
            results.append(grade(p))
    with open(GRADES, "w") as f:
        for r in results: f.write(json.dumps({**r, "at": now}) + "\n")
    # outcomes: block -> DurableTask to engineering queue
    blocks = [r for r in results if r["verdict"] == "block"]
    if blocks:
        os.makedirs(os.path.dirname(ENG_QUEUE), exist_ok=True)
        with open(ENG_QUEUE, "a") as f:
            for r in blocks:
                f.write(json.dumps({"_type":"task","id":__import__("uuid").uuid4().hex,"queue":"engineering",
                    "subject":f"skill-gate BLOCK: {r['skill']}","state":"pending","from":"ci-cd-gate",
                    "created_at":now,"updated_at":now,"payload":{"gaps":r["gaps"],"weighted":r["weighted"]}})+"\n")
    for r in results:
        print(f"{r['verdict']:9} {r['weighted']:>4}  {r['skill']}" + (f"  gaps={r['gaps']}" if r['gaps'] else ""))
    print(f"\n{len(results)} skills | pass={sum(r['verdict']=='pass' for r in results)} "
          f"advisory={sum(r['verdict']=='advisory' for r in results)} block={len(blocks)}")
    sys.exit(1 if blocks else 0)

if __name__ == "__main__":
    main()
