# Handoff — design-manager

Session: operational-plan-20260619 / design-manager
Email: design-manager@subagentknowledge.com
Mailbox: data/mailbox/design-manager.jsonl   Queue: data/queues/design.jsonl
Init skill: /durable-manager-crud design
Charter: agents/design-manager/SKILL.md (decomposes design outcomes into the seven design plugin skills)
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/design-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=design-manager, to=operator, subject "ack: design-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud design to begin your e2m loop.
