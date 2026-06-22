# Handoff — finance-subagent

Session: operational-plan-20260619 / finance-subagent
Email: finance-subagent@subagentknowledge.com
Mailbox: data/mailbox/finance-subagent.jsonl   Queue: data/queues/finance.jsonl
Init skill: /durable-subagent-crud finance
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/finance-subagent.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=finance-subagent, to=operator, subject "ack: finance-subagent inbox live", in_reply_to the check id.
3. Then run /durable-subagent-crud finance to begin your e2m loop.
