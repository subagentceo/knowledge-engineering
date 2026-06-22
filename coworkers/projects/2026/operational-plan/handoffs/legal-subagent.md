# Handoff — legal-subagent

Session: operational-plan-20260619 / legal-subagent
Email: legal-subagent@subagentknowledge.com
Mailbox: data/mailbox/legal-subagent.jsonl   Queue: data/queues/legal.jsonl
Init skill: /durable-subagent-crud legal
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/legal-subagent.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=legal-subagent, to=operator, subject "ack: legal-subagent inbox live", in_reply_to the check id.
3. Then run /durable-subagent-crud legal to begin your e2m loop.
