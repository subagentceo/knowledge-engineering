---
name: productivity:task-management
description: >-
  Create, claim, transition, and route DurableTask envelopes via e2m-mcp.
  Use when: "create a task", "assign task to <coworker>", "route this to engineering",
  "mark task complete", "what tasks are pending".
coworker_affinity: [pm-coworker]
plugin: productivity
---

<!--
  @cite cowork/mcp/e2m-mcp/server.ts         (envelope_write, task_transition, mailbox_send)
  @cite cowork/templates/task-state-machine.ts (DurableTask, computeScore)
  @cite cowork/coworkers/manifest.json
-->

<task_management_protocol>
CREATE:
  envelope_write: { queue: <domain>, subject, description, ke_fit_score, estimated_hours,
                    due_date, depends_on, blocks, evaluator: { pass_if, fail_if } }

CLAIM:
  task_transition: { id, event: "claim" } → state: in_progress

COMPLETE:
  task_transition: { id, event: "complete", result: { ... } }

ROUTE to coworker:
  mailbox_send: { to: "<coworker-id>", type: "task", subject, body: <envelope> }

LIST pending:
  envelope_read: { queue: <domain>, state: "pending" } → sorted by ke_fit_score desc
</task_management_protocol>

<priority_scoring>
ke_fit_score 1–5 maps to: 1=nice-to-have, 3=important, 5=critical-path.
computeScore weights: urgency 30%, impact 25%, dependency_unblock 20%, effort_efficiency 15%, staleness 10%.
</priority_scoring>
