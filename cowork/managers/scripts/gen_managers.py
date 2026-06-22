#!/usr/bin/env python3
"""
gen_managers.py — render the 12 manager skills from one template + manifest (DRY).
Writes cowork/coworkers/skills/<id>/SKILL.md for each manager (mirrors the coworker skills).

  python3 cowork/managers/scripts/gen_managers.py

@cite cowork/managers/manager.template.md
@cite cowork/managers/managers.manifest.yaml
@cite cowork/standards/agent-hierarchy.md
"""
import pathlib, yaml, sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
TPL = (ROOT / "cowork/managers/manager.template.md").read_text()
MAN = yaml.safe_load((ROOT / "cowork/managers/managers.manifest.yaml").read_text())
OUT = ROOT / "cowork/coworkers/skills"

ROUTER = """
<routing>
You are the DEFAULT ROUTER. When the operator opens a Cowork session **not attached to a coworker**,
the request lands here. Triage and route — do not execute it yourself.

1. CLASSIFY — match the request's intent against the keyword map (cowork/standards/operator-routing.md,
   sourced from managers.manifest.yaml `routing`).
2. ROUTE — `mailbox_send` the outcome to the matched `<domain>-manager` (or, if direct, the coworker
   queue), preserving the operator's acceptance criteria as the evaluator.
3. AMBIGUOUS / CROSS-DOMAIN — keep it: decompose into per-domain outcomes, fan out to multiple managers,
   and track delivery across them.
4. NEVER silently drop. If you cannot classify, emit ONE `operator` envelope asking the operator to pick
   a domain, then route on their answer.

Default target when `to` is unset/unclear on any operator envelope: **project-manager** (you).
The protocol is: operator → project-manager → domain manager → coworker → team → subagent.
</routing>
"""

written = []
for m in MAN["managers"]:
    body = TPL
    for k in ("id", "display", "domain", "coworker", "queue", "model", "charter"):
        body = body.replace("{{" + k + "}}", str(m[k]))
    body = body.replace("{{ROUTER}}", ROUTER if m.get("router") else "")
    d = OUT / m["id"]; d.mkdir(parents=True, exist_ok=True)
    (d / "SKILL.md").write_text(body)
    written.append(m["id"])

# leftover placeholder check
import re
leftover = []
for mid in written:
    t = (OUT / mid / "SKILL.md").read_text()
    if re.search(r"\{\{.*?\}\}", t):
        leftover.append(mid)
print({"written": len(written), "managers": written, "router": [m["id"] for m in MAN["managers"] if m.get("router")],
       "leftover_placeholders": leftover})
sys.exit(1 if leftover else 0)
