# Handoff — product-coworker

Session: operational-plan-20260619 / product-coworker
Email: product-coworker@subagentknowledge.com
Mailbox: data/mailbox/product-coworker.jsonl   Queue: data/queues/product.jsonl
Init skill: /durable-coworker-crud product
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/product-coworker.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=product-coworker, to=operator, subject "ack: product-coworker inbox live", in_reply_to the check id.
3. Then run /durable-coworker-crud product to begin your e2m loop.
