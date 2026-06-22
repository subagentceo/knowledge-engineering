# Handoff — design-subagent

Session: operational-plan-20260619 / design-subagent
Email: design-subagent@subagentknowledge.com
Mailbox: data/mailbox/design-subagent.jsonl   Queue: data/queues/design.jsonl
Init skill: /durable-subagent-crud design
Charter: agents/design-subagent/SKILL.md (deterministic design pieces — tokens, contrast, spec tables, copy lint)
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/design-subagent.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=design-subagent, to=operator, subject "ack: design-subagent inbox live", in_reply_to the check id.
3. Then run /durable-subagent-crud design to begin your e2m loop.
