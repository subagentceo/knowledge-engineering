# Handoff — project-manager

Session: operational-plan-20260619 / project-manager
Email: project-manager@subagentknowledge.com
Mailbox: data/mailbox/project-manager.jsonl   Queue: data/queues/project.jsonl
Init skill: /durable-manager-crud project
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/project-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=project-manager, to=operator, subject "ack: project-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud project to begin your e2m loop.
