#!/usr/bin/env python3
"""
nightly-review.py — run by project-management-coworker at 00:00 PST
@cite cowork/templates/task-state-machine.ts
@cite cowork/coworkers/manifest.json
Reads all queue JSONL, emits cross-coworker summary task to product-management.
"""
import json, uuid, datetime, pathlib, collections, sys

QUEUE_DIR   = pathlib.Path("cowork/data/queues")
MAILBOX_DIR = pathlib.Path("cowork/data/mailbox")
now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

def last_state_per_task(qfile):
    counts = collections.Counter()
    if not qfile.exists():
        return counts
    for line in qfile.read_text().strip().splitlines():
        if not line.strip(): continue
        try:
            rec = json.loads(line)
        except: continue
        if rec.get("_type") == "transition":
            state = rec.get("new_state", "unknown")
        elif rec.get("_type") == "task":
            state = rec.get("state", "pending")
        else:
            continue
        counts[state] += 1
    return counts

summary = {}
blocked_queues = []
for qf in sorted(QUEUE_DIR.glob("*.jsonl")):
    domain = qf.stem
    counts = last_state_per_task(qf)
    summary[domain] = dict(counts)
    if counts.get("blocked", 0) > 0:
        blocked_queues.append(domain)

# Emit summary task to product-management queue
task_id = str(uuid.uuid4())
task = {
    "_type": "task",
    "id": task_id,
    "queue": "product-management",
    "subject": f"Nightly review complete — {len(summary)} queues scanned, {len(blocked_queues)} blocked",
    "state": "pending",
    "created_at": now,
    "updated_at": now,
    "from": "project-management-coworker",
    "ke_fit_score": 4,
    "payload": {"queue_summary": summary, "blocked_queues": blocked_queues}
}
QUEUE_DIR.mkdir(parents=True, exist_ok=True)
with open(QUEUE_DIR / "product-management.jsonl", "a") as f:
    f.write(json.dumps(task) + "\n")

# Reply to product-management-coworker mailbox
MAILBOX_DIR.mkdir(parents=True, exist_ok=True)
msg = {
    "_type": "message", "id": str(uuid.uuid4()), "task_id": task_id,
    "from": "project-management-coworker", "to": "product-management-coworker",
    "subject": f"Nightly review: {sum(v.get('completed',0) for v in summary.values())} completed, {len(blocked_queues)} blocked",
    "state": "pending", "at": now,
    "payload": summary
}
with open(MAILBOX_DIR / "product-management-coworker.jsonl", "a") as f:
    f.write(json.dumps(msg) + "\n")

print(json.dumps({"status": "ok", "queues_scanned": len(summary), "blocked": blocked_queues, "at": now}))
