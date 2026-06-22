#!/usr/bin/env python3
"""
type-safety-audit.py — run by project-management-coworker at 06:00 PST
@cite cowork/standards/mailbox-envelope-canon.md
@cite cowork/scripts/mailbox-schema-validate.py
@cite cowork/templates/task-state-machine.ts

Delegates record validation to the single canonical validator so the audit, the
emitter (e2m-mcp/server.ts), and the schema doc cannot drift apart again.
Emits a DurableTask to the engineering queue when violations are found.
"""
import json, uuid, datetime, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "cowork" / "scripts"))
from importlib import import_module
validate = import_module("mailbox-schema-validate")

MAILBOX_DIR = ROOT / "cowork" / "data" / "mailbox"
QUEUE_DIR   = ROOT / "cowork" / "data" / "queues"
now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

_, raw_violations = validate.scan([MAILBOX_DIR])
violations = [{"file": v["file"], "line": v["line"], "id": v.get("id"),
              "issue": "; ".join(v["issues"])} for v in raw_violations]

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
