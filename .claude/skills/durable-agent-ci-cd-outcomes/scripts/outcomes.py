#!/usr/bin/env python3
"""
durable-agent-ci-cd-outcomes — merge-gate verdict + DurableTask emission.

@cite .claude/skills/durable-agent-ci-cd-rubrics/SKILL.md
@cite cowork/templates/task-state-machine.ts
@cite cowork/mcp/e2m-mcp/server.ts
"""
from __future__ import annotations
import argparse, json, sys, uuid
from datetime import datetime, timezone
from pathlib import Path

BLOCKING_THRESHOLD = {"D1_type_safety": 2, "D2_durability": 2, "D3_agent_reuse": 3, "D4_packaging": 3}
KE_FIT = {"FAIL": 5, "BLOCK": 4, "ADVISORY": 2}

def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def collapse_grades(jsonl_path: Path) -> list[dict]:
    """Last-line-wins per skill name."""
    if not jsonl_path.exists():
        return []
    by_skill: dict[str, dict] = {}
    for line in jsonl_path.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            g = json.loads(line)
            by_skill[g["skill"]] = g
        except Exception:
            pass
    return list(by_skill.values())

def emit_durable_task(skill: str, dim: str, score: int, threshold: int,
                       evidence: str, fix: str, verdict: str) -> dict:
    ke = KE_FIT.get(verdict, 3)
    return {
        "id": str(uuid.uuid4()),
        "queue": "engineering",
        "subject": f"Skill gate: {skill} {dim} score={score} (threshold={threshold})",
        "state": "pending",
        "ke_fit_score": ke,
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "error": {
            "skill": skill,
            "dimension": dim,
            "score": score,
            "threshold": threshold,
            "evidence": evidence,
            "fix": fix,
            "resolvable": True,
            "suggested_skill": "durable-agent-ci-cd-rubrics",
        },
    }

def main() -> None:
    p = argparse.ArgumentParser(description="Skill merge-gate: emit DurableTasks for blocking gaps")
    p.add_argument("--grades",            default="cowork/data/queues/skill-grades.jsonl")
    p.add_argument("--engineering-queue", default="cowork/data/queues/engineering.jsonl")
    p.add_argument("--outcomes",          default="cowork/data/queues/skill-outcomes.jsonl")
    p.add_argument("--skill",             default=None, help="Gate a single skill by name")
    args = p.parse_args()

    grades = collapse_grades(Path(args.grades))
    if args.skill:
        grades = [g for g in grades if g["skill"] == args.skill]
    if not grades:
        print("[WARN] no grades found — run durable-agent-ci-cd-evals first", file=sys.stderr)
        sys.exit(0)

    eng_path = Path(args.engineering_queue)
    out_path = Path(args.outcomes)
    eng_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    total_blocking = 0
    total_advisory = 0
    any_fail = False

    print(f"\nSKILL MERGE GATE OUTCOMES — {datetime.now().strftime('%Y-%m-%d')}")
    print("=" * 72)

    with eng_path.open("a") as eng_f, out_path.open("a") as out_f:
        for g in sorted(grades, key=lambda x: x["total"]):
            verdict   = g["verdict"]
            skill     = g["skill"]
            blocking_dims = g.get("blocking", [])
            gaps      = g.get("gaps", [])
            bt = 0
            at = 0

            if verdict in ("BLOCK", "FAIL"):
                any_fail = True
                for gap in gaps:
                    dim = gap["dim"]
                    score_val = g["scores"][dim]["score"]
                    threshold = BLOCKING_THRESHOLD.get(dim, 0)
                    is_blocking = dim in blocking_dims or score_val < threshold
                    if is_blocking:
                        task = emit_durable_task(
                            skill, dim, score_val, threshold,
                            g["scores"][dim]["evidence"], gap["fix"], verdict
                        )
                        eng_f.write(json.dumps(task) + "\n")
                        bt += 1
                        total_blocking += 1

            elif verdict == "ADVISORY":
                for gap in gaps:
                    dim = gap["dim"]
                    task = emit_durable_task(
                        skill, dim, g["scores"][dim]["score"],
                        BLOCKING_THRESHOLD.get(dim, 0),
                        g["scores"][dim]["evidence"], gap["fix"], verdict
                    )
                    task["ke_fit_score"] = 2
                    eng_f.write(json.dumps(task) + "\n")
                    at += 1
                    total_advisory += 1

            outcome = {
                "skill": skill,
                "graded_at": g.get("graded_at", now_iso()),
                "outcome_at": now_iso(),
                "total": g["total"],
                "verdict": verdict,
                "blocking_tasks_emitted": bt,
                "advisory_tasks_emitted": at,
                "gaps": gaps,
            }
            out_f.write(json.dumps(outcome) + "\n")

            marker = "v" if verdict == "PASS" else ("~" if verdict == "ADVISORY" else "x")
            print(f"[{marker}] {skill:<42} {g['total']:.2f}  {verdict}"
                  + (f"  [{bt} blocking tasks]" if bt else "")
                  + (f"  [{at} advisory tasks]" if at else ""))

    print("=" * 72)
    print(f"Blocking DurableTasks emitted: {total_blocking}")
    print(f"Advisory DurableTasks emitted: {total_advisory}")
    print(f"Engineering queue -> {eng_path}")
    print(f"Outcomes log      -> {out_path}")

    sys.exit(1 if any_fail else 0)

if __name__ == "__main__":
    main()
