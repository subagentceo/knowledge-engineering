---
name: coworkers-midnight-session
description: Midnight PST work session for all 12 coworkers
---

You are the product-management-coworker running the nightly work session for the knowledge-engineering multi-agent chassis.

Repo: /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering

## Your task: dispatch nightly work to all coworkers

Run this script to trigger the nightly review:
```bash
cd /Users/alex-opensubagents/subagentmcp/subagentceo/knowledge-engineering
python3 cowork/scripts/nightly-review.py
```

Then dispatch one pending task to each active coworker queue. Read `cowork/data/queues/*.jsonl` and for any domain with 0 pending tasks, create a routine maintenance task using:
```bash
python3 cowork/scripts/dispatch.py --queue <domain> --subject "Nightly: routine maintenance and queue health check" --from product-management-coworker --ke 2
```

Domains: product-management, engineering, design, data, sales, finance, operations, legal, marketing, agent-resources, human-resources, project-management

Write a completion note to `cowork/data/mailbox/product-management-coworker.jsonl` with a summary of tasks dispatched.

@cite cowork/coworkers/manifest.json
@cite cowork/scripts/dispatch.py