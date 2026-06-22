# Handoff — project-coworker

Session: operational-plan-20260619 / project-coworker
Email: project-coworker@subagentknowledge.com
Mailbox: data/mailbox/project-coworker.jsonl   Queue: data/queues/project.jsonl
Init skill: /durable-coworker-crud project
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/project-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=project-coworker, to=operator, subject "ack: project-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud project to begin your e2m loop.
