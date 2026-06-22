# Handoff — finance-coworker

Session: operational-plan-20260619 / finance-coworker
Email: finance-coworker@subagentknowledge.com
Mailbox: data/mailbox/finance-coworker.jsonl   Queue: data/queues/finance.jsonl
Init skill: /durable-coworker-crud finance
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/finance-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=finance-coworker, to=operator, subject "ack: finance-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud finance to begin your e2m loop.
