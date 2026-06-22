# Handoff — legal-manager

Session: operational-plan-20260619 / legal-manager
Email: legal-manager@subagentknowledge.com
Mailbox: data/mailbox/legal-manager.jsonl   Queue: data/queues/legal.jsonl
Init skill: /durable-manager-crud legal
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/legal-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=legal-manager, to=operator, subject "ack: legal-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud legal to begin your e2m loop.
