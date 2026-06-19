---
name: productivity:update
description: >-
  End-of-session update: write heartbeat tick, emit YAML status block, route
  outstanding tasks to peer coworkers. Use when: "wrap up", "end session",
  "save progress", "update status", "what's outstanding".
coworker_affinity: [pm-coworker]
plugin: productivity
---

<!--
  @cite seeds/memory/heartbeat/               (heartbeat memory)
  @cite cowork/mcp/e2m-mcp/server.ts          (mailbox_send)
  @cite cowork/coworkers/manifest.json
-->

<update_protocol>
STEP 1 — Collect completed task IDs from this session's queue transitions
STEP 2 — Collect in_progress tasks (not completed — will be re-claimed next session)
STEP 3 — Write heartbeat tick to seeds/memory/heartbeat/last-tick.md
STEP 4 — For each blocked task with unmet depends_on: mailbox_send type=interrupt to peer
STEP 5 — Emit YAML session-end status block
</update_protocol>

<session_end_yaml>
```yaml
session_end: <ISO-8601>
coworker: <id>
completed:
  - id: <uuid>
    subject: <subject>
    verdict: pass | fail
in_progress:
  - id: <uuid>
    subject: <subject>
    next_action: <what to do next session>
routed:
  - to: <coworker-id>
    subject: <task subject>
    reason: <why routed>
```
</session_end_yaml>
