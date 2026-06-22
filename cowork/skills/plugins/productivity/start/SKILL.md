---
name: productivity:start
description: >-
  Session start skill. Bootstraps a cowork session: reads mailbox, reconstructs
  queue state, claims highest-priority task. Replaces cold-start uncertainty.
  Use when: "start session", "/start", beginning any new cowork session.
coworker_affinity: [product-management-coworker]
plugin: productivity
---

<!--
  @cite cowork/coworkers/manifest.json
  @cite cowork/skills/user/structured-prompt-resume/SKILL.md
  @cite cowork/data/queues/                  (JSONL domain queues)
-->

<start_protocol>
STEP 1 — Read cowork/coworkers/manifest.json → identify this session's coworker domain
STEP 2 — Read all queue JSONL files in parallel (collapse by id, last-line-wins)
STEP 3 — Read cowork/data/mailbox/<coworker-id>.jsonl → check for messages
STEP 4 — Emit terse status YAML (resume_at, queue counts, highest_priority_pending)
STEP 5 — Claim highest_priority_pending → execute
</start_protocol>

<status_yaml_template>
```yaml
resume_at: <ISO-8601>
coworker: <id>
queues:
  product-management: { pending: N, in_progress: N, completed: N }
  engineering:        { pending: N, in_progress: N, completed: N }
mailbox_messages: N
highest_priority_pending:
  id: <uuid>
  subject: <subject>
  ke_fit_score: <1-5>
```
</status_yaml_template>
