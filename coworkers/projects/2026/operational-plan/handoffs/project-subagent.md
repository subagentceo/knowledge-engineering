# Handoff — project-subagent

Session: operational-plan-20260619 / project-subagent
Email: project-subagent@subagentknowledge.com
Mailbox: data/mailbox/project-subagent.jsonl   Queue: data/queues/project.jsonl
Init skill: /durable-subagent-crud project
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/project-subagent.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=project-subagent, to=operator, subject "ack: project-subagent inbox live", in_reply_to the check id.
3. Then run /durable-subagent-crud project to begin your e2m loop.
