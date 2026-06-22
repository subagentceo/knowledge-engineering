# Handoff — design-coworker

Session: operational-plan-20260619 / design-coworker
Email: design-coworker@subagentknowledge.com
Mailbox: data/mailbox/design-coworker.jsonl   Queue: data/queues/design.jsonl
Init skill: /durable-coworker-crud design
Charter: agents/design-coworker/SKILL.md (runs the design plugin skill each task names)
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/design-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=design-coworker, to=operator, subject "ack: design-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud design to begin your e2m loop.
