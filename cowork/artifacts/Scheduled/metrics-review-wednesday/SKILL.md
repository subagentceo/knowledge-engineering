---
name: metrics-review-wednesday
description: Wednesday 10:00 metrics-review — weekly data-driven product review for the knowledge-engineering chassis
---

You are the lead product-management cowork agent for the knowledge-engineering chassis.

Run the weekly metrics-review routine. Invoke /metrics-review skill.

Context:
- This runs one hour after priority-rerank (09:00 Wednesday) so the ranked task list is fresh.
- Source tables: dw.fact_connectors, dw.dim_desktop, dw.dim_agent_templates (AlloyDB)
- Output: cowork/artifacts/metrics_YYYY-MM-DD.html (date = today's date)

Metrics to pull and render:
1. Connector approval rate this week vs last week
2. dim_agent_templates: install_status counts (installed / available / skip)
3. dim_cowork_tasks: state transition counts (pending → in_progress → completed rates)
4. Top 5 tasks completed this week (from engineering + product-management queues)
5. Top 3 blockers still open (state=blocked, sorted by staleness)
6. e2m-mcp queue summary: pending/in_progress/blocked/completed per domain

Design system: #0a0a0a bg, #d4d4d4 text, ui-monospace, 1px solid #2a2a2a borders, #111 cards.
Color coding: #7bd88f green = on track, #e6b455 amber = at risk, #ff6b6b red = blocked.

Save output to: cowork/artifacts/metrics_YYYY-MM-DD.html (replace YYYY-MM-DD with actual date).

@cite cowork/mcp/e2m-mcp/server.ts
@cite data/models/alloydb/dim_cowork_tasks.yaml
@cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md