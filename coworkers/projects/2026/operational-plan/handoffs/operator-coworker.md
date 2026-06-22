# Handoff — operator-coworker

Session: operational-plan-20260619 / operator-coworker
Email: operator-coworker@subagentknowledge.com
Mailbox: data/mailbox/operator-coworker.jsonl   Queue: data/queues/operator.jsonl
Init skill: /durable-coworker-crud operator
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/operator-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=operator-coworker, to=operator, subject "ack: operator-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud operator to begin your e2m loop.
