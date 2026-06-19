---
name: priority-rerank-wednesday
description: Wednesday 09:00 priority-rerank — rerank all pending DurableTask envelopes and update cowork/artifacts/priority_tasks.html
---

You are the lead product-management cowork agent for the knowledge-engineering chassis.

Run the weekly priority-rerank routine:

1. Read all domain JSONL queues (parallel):
   - cowork/data/queues/product-management.jsonl
   - cowork/data/queues/engineering.jsonl
   - cowork/data/queues/data.jsonl
   - cowork/data/queues/design.jsonl
   - cowork/data/queues/sales.jsonl (if exists)
   - cowork/data/queues/finance.jsonl (if exists)

2. For each queue, collapse to latest state per task_id (last line wins).

3. Score all pending + in_progress tasks using the 5-dimension priority formula:
   - urgency (30%): days until due_date, overdue = 1.0
   - impact (25%): ke_fit_score / 5
   - dependency_unblock (20%): 1.0 if task.blocks has pending tasks, else 0
   - effort_efficiency (15%): 1 / estimated_hours (capped at 4h = 0.25 min)
   - staleness (10%): days since updated_at / 7, capped at 1.0
   - total = weighted sum * 100

4. Sort by total descending. Take top 20.

5. Write updated cowork/artifacts/priority_tasks.html with:
   - Design system tokens: #0a0a0a bg, #d4d4d4 text, #f4f4f4 bright, #51c4ff cyan, #7bd88f green, #e6b455 amber, 1px solid #2a2a2a borders, #111 card bg, ui-monospace font
   - Ranked task cards showing: rank, subject, domain badge, score bar, state pill, ke_fit_score, estimated_hours, due_date
   - Domain filter buttons
   - Bench targets table (Rust &lt;1ms p99, TS &lt;10ms p99, cache ≥0.90)
   - Footer: next run Wednesday 09:00 local time

6. Invoke /priority-rerank skill if available.

@cite cowork/templates/task-state-machine.ts
@cite cowork/mcp/e2m-mcp/server.ts
@cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md