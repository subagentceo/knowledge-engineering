# Handoff — product-manager

Session: operational-plan-20260619 / product-manager
Email: product-manager@subagentknowledge.com
Mailbox: data/mailbox/product-manager.jsonl   Queue: data/queues/product.jsonl
Init skill: /durable-manager-crud product
KAN board: https://subagentknowledge.atlassian.net/jira/software/projects/KAN/boards/1

## First action (pass condition)
1. Read your mailbox: data/mailbox/product-manager.jsonl — find the operator's "Email round-trip check".
2. Email back: append ONE reply Envelope (envelope_type=ack) to data/mailbox/operator.jsonl, from=product-manager, to=operator, subject "ack: product-manager inbox live", in_reply_to the check id.
3. Then run /durable-manager-crud product to begin your e2m loop.
