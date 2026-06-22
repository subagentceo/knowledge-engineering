---
name: dispatch-coworker
description: >
  Dispatch a task to any coworker's JSONL queue and mailbox via e2m-mcp pattern.
  Fire whenever the operator says "dispatch to X", "send to X coworker", "assign to X",
  "trigger the Y agent/coworker", "queue a task for Z", or invokes /dispatch-coworker.
  Covers all 11 coworkers: pm, engineering, design, data, sales, finance, operations,
  legal, marketing, agent-resources, human-resources.
  Do NOT use for reading queue state (use /product-management-coworker for that) or for running skills
  that don't produce a DurableTask envelope.
  Pairs with structured-prompt-resume (product-management state), product-management-coworker (queue reader/claimer),
  heartbeat (weekly cadence).
---

# dispatch-coworker

<!-- @cite cowork/coworkers/manifest.json -->
<!-- @cite cowork/templates/task-state-machine.ts -->

Dispatch a DurableTask envelope to any coworker queue and mailbox atomically.
Token-minimized: one JSONL append + one mailbox append per dispatch. Reusable scripts handle
the write so no reinvention per call.

## Identity map

| trigger | queue domain | mailbox file |
|---|---|---|
| pm / product-management | product-management | cowork/data/mailbox/product-management-coworker.jsonl |
| engineering | engineering | cowork/data/mailbox/engineering-coworker.jsonl |
| design | design | cowork/data/mailbox/design-coworker.jsonl |
| data | data | cowork/data/mailbox/data-coworker.jsonl |
| sales | sales | cowork/data/mailbox/sales-coworker.jsonl |
| finance | finance | cowork/data/mailbox/finance-coworker.jsonl |
| operations | operations | cowork/data/mailbox/operations-coworker.jsonl |
| legal | legal | cowork/data/mailbox/legal-coworker.jsonl |
| marketing | marketing | cowork/data/mailbox/marketing-coworker.jsonl |
| agent-resources | agent-resources | cowork/data/mailbox/agent-resources-coworker.jsonl |
| human-resources | human-resources | cowork/data/mailbox/human-resources-coworker.jsonl |

## DurableTask schema (required fields)

```typescript
// @cite cowork/templates/task-state-machine.ts
interface DurableTask {
  _type: "task";
  id: string;           // uuid v4
  queue: string;        // domain from identity map above
  subject: string;      // imperative, ≤120 chars
  state: "pending";
  created_at: string;   // ISO-8601
  updated_at: string;   // same as created_at on create
  from?: string;        // sender coworker id (e.g. "product-management-coworker")
  ke_fit_score?: number; // 1-5, optional
  payload?: Record<string, unknown>; // domain-specific data
}
```

## Dispatch protocol

1. **Identify target** from operator input → look up queue domain + mailbox path in identity map.
2. **Build envelope** — generate uuid, set state=pending, populate required fields.
3. **Run dispatch script** (reusable, avoids re-inventing JSONL writes):

```bash
python3 cowork/scripts/dispatch.py   --queue <domain>   --subject "<subject>"   --from product-management-coworker   --ke <1-5>   [--payload '{"key":"value"}']
```

If the script does not exist, create it (see scripts/ section below) then run it.

4. **Confirm** with terse output: `dispatched → <domain>/<id> subject="<subject>"`.

## Invariants

- NEVER send external correspondence (email, Slack, etc.) — only write to JSONL files.
- legal-coworker and marketing-coworker tasks must have `state=pending` until operator triggers the coworker session.
- human-resources-coworker tasks: redact PII before payload write.
- Keep subjects imperative, ≤120 chars, no trailing period.

## scripts/dispatch.py (create if missing)

Create at `cowork/scripts/dispatch.py`:

```python
#!/usr/bin/env python3
"""
dispatch.py — append a DurableTask to queue JSONL + mailbox JSONL.
@cite cowork/templates/task-state-machine.ts
@cite cowork/coworkers/manifest.json
Usage: python3 cowork/scripts/dispatch.py --queue <domain> --subject "<text>" [--from <id>] [--ke <1-5>] [--payload \'{}\']
"""
import argparse, json, uuid, datetime, pathlib, sys

QUEUE_DIR   = pathlib.Path("cowork/data/queues")
MAILBOX_DIR = pathlib.Path("cowork/data/mailbox")

DOMAIN_TO_MAILBOX = {
  "product-management": "product-management-coworker",
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
}

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--queue",   required=True)
    p.add_argument("--subject", required=True)
    p.add_argument("--from",    dest="sender", default="product-management-coworker")
    p.add_argument("--ke",      type=int, default=None)
    p.add_argument("--payload", default=None)
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
    if args.ke:
        task["ke_fit_score"] = args.ke
    if args.payload:
        task["payload"] = json.loads(args.payload)

    # queue write
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)
    qfile = QUEUE_DIR / f"{args.queue}.jsonl"
    with open(qfile, "a") as f:
        f.write(json.dumps(task) + "\n")

    # mailbox write
    mb_id = DOMAIN_TO_MAILBOX.get(args.queue, args.queue + "-coworker")
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

    print(f"dispatched → {args.queue}/{task_id} subject=\"{args.subject}\"")

if __name__ == "__main__":
    main()
```

## Example invocations

```
Dispatch a legal review task:
  → python3 cowork/scripts/dispatch.py --queue legal --subject "Triage NDA for subagentknowledge.com TOS" --ke 5

Assign a design audit:
  → python3 cowork/scripts/dispatch.py --queue design --subject "Audit 11 cowork/templates for design token compliance" --ke 4

Queue a marketing competitive brief:
  → python3 cowork/scripts/dispatch.py --queue marketing --subject "Competitive brief: multi-agent orchestration space" --ke 4
```
