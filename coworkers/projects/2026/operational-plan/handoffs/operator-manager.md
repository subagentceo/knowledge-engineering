# Handoff — operator-manager

Session: operational-plan-20260619 / operator-manager
Email: operator-manager@subagentknowledge.com
Mailbox: data/mailbox/operator-manager.jsonl   Queue: data/queues/operator.jsonl
Init skill: /durable-manager-crud operator
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/operator-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=operator-manager, to=operator, subject "ack: operator-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud operator to begin your e2m loop.
