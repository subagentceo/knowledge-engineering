# Handoff — operator-subagent

Session: operational-plan-20260619 / operator-subagent
Email: operator-subagent@subagentknowledge.com
Mailbox: data/mailbox/operator-subagent.jsonl   Queue: data/queues/operator.jsonl
Init skill: /durable-subagent-crud operator
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/operator-subagent.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=operator-subagent, to=operator, subject "ack: operator-subagent inbox live", in_reply_to the check id.
3. Then run /durable-subagent-crud operator to begin your e2m loop.
