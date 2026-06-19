#!/usr/bin/env python3
"""
type-safety-audit.py — run by project-management-coworker at 06:00 PST
@cite cowork/templates/task-state-machine.ts
Scans all mailbox JSONL for missing required DurableTask fields.
Emits DurableTask to engineering queue for each violation found.
"""
import json, uuid, datetime, pathlib

MAILBOX_DIR = pathlib.Path("cowork/data/mailbox")
QUEUE_DIR   = pathlib.Path("cowork/data/queues")
now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

REQUIRED_TASK_FIELDS = {"_type", "id", "queue", "subject", "state", "created_at", "updated_at"}
REQUIRED_MSG_FIELDS  = {"_type", "id", "from", "to", "subject", "at"}

violations = []

for mbf in sorted(MAILBOX_DIR.glob("*.jsonl")):
    for i, line in enumerate(mbf.read_text().strip().splitlines()):
        if not line.strip(): continue
        try:
            rec = json.loads(line)
        except json.JSONDecodeError as e:
            violations.append({"file": str(mbf), "line": i+1, "issue": f"invalid JSON: {e}"})
            continue
        rtype = rec.get("_type")
        if rtype == "task":
            missing = REQUIRED_TASK_FIELDS - set(rec.keys())
            if missing:
                violations.append({"file": str(mbf), "line": i+1, "issue": f"missing fields: {sorted(missing)}", "id": rec.get("id", "?")})
        elif rtype == "message":
            missing = REQUIRED_MSG_FIELDS - set(rec.keys())
            if missing:
                violations.append({"file": str(mbf), "line": i+1, "issue": f"missing fields: {sorted(missing)}"})

# Emit one engineering task per violation batch (cap at 10)
QUEUE_DIR.mkdir(parents=True, exist_ok=True)
if violations:
    task = {
        "_type": "task",
        "id": str(uuid.uuid4()),
        "queue": "engineering",
        "subject": f"Type-safety audit: {len(violations)} mailbox schema violations found",
        "state": "pending",
        "created_at": now, "updated_at": now,
        "from": "project-management-coworker",
        "ke_fit_score": 4,
        "payload": {"violations": violations[:10]}
    }
    with open(QUEUE_DIR / "engineering.jsonl", "a") as f:
        f.write(json.dumps(task) + "\n")

print(json.dumps({"status": "ok", "violations": len(violations), "at": now}))
