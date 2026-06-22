#!/usr/bin/env python3
"""
mailbox-schema-validate.py — canonical type-safety validator for e2m records.

Single enforcement point for the record canon defined in
cowork/standards/mailbox-envelope-canon.md. Used as the RED/GREEN gate in the
outcome-driven workflow and delegated to by type-safety-audit.py.

Exit 0 = all records conform. Exit 1 = violations (prints JSON report).

@cite cowork/standards/mailbox-envelope-canon.md
@cite cowork/schemas/envelope.ts
@cite cowork/templates/task-state-machine.ts
"""
import json, sys, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parents[2]
MAILBOX_DIR = ROOT / "cowork" / "data" / "mailbox"
QUEUE_DIR   = ROOT / "cowork" / "data" / "queues"

ENVELOPE_TYPES = {"task", "ack", "result", "escalate", "notify", "summary", "operator"}
ENVELOPE_STATES = {"pending", "read", "actioned", "archived"}
TASK_STATES = {"pending", "in_progress", "blocked", "completed", "failed"}

REQ = {
    "envelope":   {"_type", "id", "envelope_type", "from", "to", "subject", "at", "state"},
    "task":       {"_type", "id", "queue", "subject", "state", "created_at", "updated_at"},
    "transition": {"_type", "id", "at"},
}


def check_record(rec):
    """Return list of violation strings for one record ([] if clean)."""
    errs = []
    t = rec.get("_type")
    if t is None:
        return ["missing _type (must be envelope|task|transition)"]
    if t not in REQ:
        return [f"unknown _type={t!r} (must be envelope|task|transition)"]
    missing = REQ[t] - set(rec.keys())
    if missing:
        errs.append(f"{t} missing required fields: {sorted(missing)}")
    if t == "envelope":
        if rec.get("envelope_type") not in ENVELOPE_TYPES:
            errs.append(f"envelope_type={rec.get('envelope_type')!r} not in {sorted(ENVELOPE_TYPES)}")
        if rec.get("state") not in ENVELOPE_STATES:
            errs.append(f"envelope state={rec.get('state')!r} not in {sorted(ENVELOPE_STATES)}")
    if t == "task":
        if rec.get("state") not in TASK_STATES:
            errs.append(f"task state={rec.get('state')!r} not in {sorted(TASK_STATES)}")
    return errs


def scan(dirs):
    violations = []
    scanned = 0
    for d in dirs:
        for f in sorted(pathlib.Path(d).glob("*.jsonl")):
            for i, line in enumerate(f.read_text().strip().splitlines()):
                if not line.strip():
                    continue
                scanned += 1
                try:
                    rec = json.loads(line)
                except json.JSONDecodeError as e:
                    violations.append({"file": f.name, "line": i + 1, "issues": [f"invalid JSON: {e}"]})
                    continue
                errs = check_record(rec)
                if errs:
                    violations.append({"file": f.name, "line": i + 1, "id": rec.get("id"), "issues": errs})
    return scanned, violations


if __name__ == "__main__":
    targets = sys.argv[1:] or ["mailbox"]
    dirs = []
    if "mailbox" in targets: dirs.append(MAILBOX_DIR)
    if "queues" in targets:  dirs.append(QUEUE_DIR)
    scanned, violations = scan(dirs)
    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    print(json.dumps({
        "status": "ok" if not violations else "violations",
        "scanned": scanned,
        "violations": len(violations),
        "detail": violations,
        "at": now,
    }, indent=2))
    sys.exit(0 if not violations else 1)
