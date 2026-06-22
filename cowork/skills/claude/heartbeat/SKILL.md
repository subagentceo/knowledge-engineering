---
name: heartbeat
description: >
  Cross-session orchestrator: reads the e2m JSONL queues, claims the
  highest-priority pending DurableTask, executes it, writes the state
  transition, and yields. Use whenever the user starts a new session and
  asks "what's next", "continue", "heartbeat", "pick up where we left off",
  or a /loop tick fires. Fire eagerly at session start — always read the
  queues before answering "what should I work on". Do NOT use for
  single-shot questions with no recurrence — just answer those directly.
  Pairs with structured-prompt-resume (interrupt recovery) and
  durable-toolchain-autoresolve (gap remediation).
---

<!--
  @cite cowork/data/queues/                       (JSONL domain queues)
  @cite cowork/templates/task-state-machine.ts    (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts              (envelope_write, mailbox)
  @cite seeds/posture/session-start.xml           (auth + posture)
-->

## Protocol

Every tick is a single atomic unit: read → claim → execute → write.

```python
# Pseudocode — exact schema from cowork/templates/task-state-machine.ts
task = read_highest_priority("cowork/data/queues/product-management.jsonl")
write_transition(task.id, state="in_progress", updated_at=now())
result = execute(task)
write_transition(task.id, state="completed" if result.ok else "failed",
                 result=result.payload, error=result.error)
```

## Queue read order (priority)

1. `cowork/data/queues/product-management.jsonl` — pm tasks
2. `cowork/data/queues/engineering.jsonl` — skill gate + toolchain gaps
3. `cowork/data/queues/data.jsonl`, `design.jsonl`, `sales.jsonl`, `finance.jsonl`

Last-line-wins per `task_id`. Skip `state=completed|failed|blocked`.

## DurableTask state machine

```
pending → in_progress → completed
                      → failed      (write error + resolvable flag)
                      → blocked     (write depends_on list)
```

Emit every transition as a JSONL append — never update in place.

## Failure pattern

```json
{
  "id": "<uuid>", "queue": "engineering", "subject": "...",
  "state": "failed", "ke_fit_score": 4,
  "created_at": "...", "updated_at": "...",
  "error": {
    "message": "npm run verify exited 1",
    "resolvable": true,
    "suggested_skill": "durable-toolchain-autoresolve"
  }
}
```

## Scheduling

```bash
# session-start hook (always)
python3 .claude/skills/durable-agent-ci-cd-evals/scripts/eval_skills.py   --skills-dir .claude/skills --output cowork/data/queues/skill-grades.jsonl

# nightly at 04:00 UTC
/schedule "every day 04:00" npm run service:refresh
```

## Invariants

- OAuth only. `ANTHROPIC_API_KEY` presence = bug.
- One task per commit. Conventional commit: `<type>(<scope>): <subject>`.
- Branch must start with `claude/`. Labels: `automerge`.
- OAUTO17: bot close/reopen cycles → silent skip.
