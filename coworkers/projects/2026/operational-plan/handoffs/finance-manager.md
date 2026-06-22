# Handoff — finance-manager

Session: operational-plan-20260619 / finance-manager
Email: finance-manager@subagentknowledge.com
Mailbox: data/mailbox/finance-manager.jsonl   Queue: data/queues/finance.jsonl
Init skill: /durable-manager-crud finance
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/finance-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=finance-manager, to=operator, subject "ack: finance-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud finance to begin your e2m loop.
