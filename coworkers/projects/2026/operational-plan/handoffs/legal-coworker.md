# Handoff — legal-coworker

Session: operational-plan-20260619 / legal-coworker
Email: legal-coworker@subagentknowledge.com
Mailbox: data/mailbox/legal-coworker.jsonl   Queue: data/queues/legal.jsonl
Init skill: /durable-coworker-crud legal
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/legal-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=legal-coworker, to=operator, subject "ack: legal-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud legal to begin your e2m loop.
