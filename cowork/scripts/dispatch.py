#!/usr/bin/env python3
"""
dispatch.py — append a DurableTask to queue JSONL + mailbox JSONL.
@cite cowork/templates/task-state-machine.ts
@cite cowork/coworkers/manifest.json
Usage: python3 cowork/scripts/dispatch.py --queue <domain> --subject "<text>" [--from <id>] [--ke <1-5>] [--payload '{}']
"""
import argparse, json, uuid, datetime, pathlib, sys

QUEUE_DIR   = pathlib.Path("cowork/data/queues")
MAILBOX_DIR = pathlib.Path("cowork/data/mailbox")

DOMAIN_TO_MAILBOX = {
  "product-management": "pm-coworker",
  "engineering":        "engineering-coworker",
  "design":             "design-coworker",
  "data":               "data-coworker",
  "sales":              "sales-coworker",
  "finance":            "finance-coworker",
  "operations":         "operations-coworker",
  "legal":              "legal-coworker",
  "marketing":          "marketing-coworker",
  "agent-resources":    "agent-resources-coworker",
  "human-resources":    "human-resources-coworker",
  "project-management": "project-management-coworker",
}

def main():
    p = argparse.ArgumentParser(description="Dispatch DurableTask to coworker queue + mailbox")
    p.add_argument("--queue",   required=True)
    p.add_argument("--subject", required=True)
    p.add_argument("--from",    dest="sender", default="pm-coworker")
    p.add_argument("--ke",      type=int, default=None, help="ke_fit_score 1-5")
    p.add_argument("--payload", default=None, help="JSON string for domain-specific data")
    args = p.parse_args()

    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    task_id = str(uuid.uuid4())

    task = {
        "_type": "task",
        "id": task_id,
        "queue": args.queue,
        "subject": args.subject,
        "state": "pending",
        "created_at": now,
        "updated_at": now,
        "from": args.sender,
    }
    if args.ke is not None:
        task["ke_fit_score"] = args.ke
    if args.payload:
        try:
            task["payload"] = json.loads(args.payload)
        except json.JSONDecodeError as e:
            print(f"ERROR: invalid --payload JSON: {e}", file=sys.stderr)
            sys.exit(1)

    # queue write (relative to repo root — run from knowledge-engineering/)
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)
    qfile = QUEUE_DIR / f"{args.queue}.jsonl"
    with open(qfile, "a") as f:
        f.write(json.dumps(task) + "\n")

    # mailbox write
    mb_id = DOMAIN_TO_MAILBOX[args.queue]
    MAILBOX_DIR.mkdir(parents=True, exist_ok=True)
    mbfile = MAILBOX_DIR / f"{mb_id}.jsonl"
    msg = {
        "_type": "message",
        "id": str(uuid.uuid4()),
        "task_id": task_id,
        "from": args.sender,
        "to": mb_id,
        "subject": args.subject,
        "state": "pending",
        "at": now,
    }
    with open(mbfile, "a") as f:
        f.write(json.dumps(msg) + "\n")

    print(f"dispatched → {args.queue}/{task_id}")
    print(f'  subject="{args.subject}"')
    print(f"  queue:   cowork/data/queues/{args.queue}.jsonl")
    print(f"  mailbox: cowork/data/mailbox/{mb_id}.jsonl")

if __name__ == "__main__":
    main()
