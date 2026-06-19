---
name: metrics-review
description: >-
  Weekly Wednesday 10:00 UTC data-driven product review for the
  knowledge-engineering multi-agent chassis. Pulls metrics from
  dw.fact_connectors, dw.dim_desktop, and dw.dim_agent_templates.
  Produces a dated HTML scorecard (design system: subagentknowledge.com)
  saved to cowork/artifacts/metrics_YYYY-MM-DD.html.
  Use: /metrics-review [week ending YYYY-MM-DD] or fire via scheduled task.
argument-hint: "[week-ending YYYY-MM-DD]"
---

# /metrics-review — knowledge-engineering weekly cadence

> **@cite** `data/models/alloydb/fact_connectors.yaml`
> **@cite** `data/models/alloydb/dim_desktop.yaml`
> **@cite** `data/models/alloydb/dim_agent_templates.yaml`
> **@cite** `data/models/alloydb_connectors_ddl.sql`
> **@cite** `vendor/anthropics/platform.claude.com/docs/en/managed-agents/overview.md`
>
> Cadence: **every Wednesday at 10:00 UTC**.
> Schedule via: `mcp__scheduled-tasks__create_scheduled_task` with `cronExpression: "0 10 * * 3"`.

## Usage

```
/metrics-review                      # uses current week
/metrics-review 2026-06-25           # specific week-end date
```

## Agent roles

This skill is designed to be run by **three coordinated agents** (see `cowork/artifacts/product_vision.html`):

| role | skill chain | writes |
|---|---|---|
| collector | data:sql-queries → data:validate-data | JSONL snapshot to cowork/data/ |
| analyst | this skill → data:build-dashboard | cowork/artifacts/metrics_YYYY-MM-DD.html |
| pm agent | product-management:roadmap-update | delta appended to product_vision.html |

The collector MUST complete before analyst starts.

## Workflow

### 1. Identify the review period

Default: 7 days ending the most recent Wednesday at 10:00 UTC.
If `$ARGUMENTS` is a date string, use that as the period end.

### 2. Pull metrics from AlloyDB

Run the following queries against `dw.*` (readonly):

#### Connector usage (fact_connectors)
```sql
SELECT
  d.slug,
  d.display_name,
  d.os_target,
  SUM(f.tool_calls_readonly)  AS total_ro_calls,
  SUM(f.tool_calls_write)     AS total_w_calls,
  AVG(f.approval_rate)        AS avg_approval_rate,
  SUM(f.tool_errors)          AS total_errors,
  COUNT(DISTINCT f.session_id) AS sessions
FROM dw.fact_connectors f
JOIN dw.dim_desktop d ON d.surrogate_key = f.connector_sk
WHERE f.date_key BETWEEN :start_date AND :end_date
GROUP BY d.slug, d.display_name, d.os_target
ORDER BY (total_ro_calls + total_w_calls) DESC;
```

#### Template adoption (dim_agent_templates)
```sql
SELECT slug, display_name, install_status, ke_fit_score, pm_relevance
FROM dw.dim_agent_templates
ORDER BY ke_fit_score DESC, install_status;
```

#### Session-level approval funnel (fact_connectors)
```sql
SELECT
  d.slug,
  SUM(f.approval_prompts) AS prompts,
  SUM(f.approval_granted) AS granted,
  SUM(f.approval_denied)  AS denied,
  ROUND(100.0 * SUM(f.approval_granted) / NULLIF(SUM(f.approval_prompts), 0), 1) AS pct_granted
FROM dw.fact_connectors f
JOIN dw.dim_desktop d ON d.surrogate_key = f.connector_sk
WHERE f.date_key BETWEEN :start_date AND :end_date
GROUP BY d.slug
HAVING SUM(f.approval_prompts) > 0;
```

If AlloyDB is not reachable, ask the user to paste:
- Tool call counts per connector for the week
- Any notable events (new connectors installed, failed calls)

### 3. Organize the review

North Star: **total tool calls per session** (measures agent productivity enabled by connectors).

L1 health indicators:
- **adoption**: which connectors saw use this week
- **write ratio**: tool_calls_write / (tool_calls_readonly + tool_calls_write) — rising = agents doing more
- **approval rate**: avg_approval_rate across write-tier connectors — target ≥ 0.85
- **error rate**: total_errors / total_calls — target < 0.05
- **template advancement**: any dim_agent_templates rows moving from 'consider' → 'recommended'

### 4. Generate the scorecard HTML

Output file: `cowork/artifacts/metrics_<YYYY-MM-DD>.html`

Design system: identical to `cowork/artifacts/connector_audit_94.html`:
- Background: `#0a0a0a`
- Font: `ui-monospace, SFMono-Regular, "Menlo"`
- Accent: `#51c4ff` (fact), `#7bd88f` (dim/green), `#e6b455` (amber/measure)
- Borders: `1px solid #2a2a2a`, `border-left: 3px solid <accent>`
- No rounded corners, no gradients

Sections required in the HTML:
1. **header**: week ending date, model, session count
2. **connector scorecard**: table with tool call volumes, write ratio, approval rate, error count per connector
3. **approval funnel**: bar-style display of prompts → granted → denied per connector
4. **template status**: current dim_agent_templates install_status for all 12 templates
5. **highlights**: 2–3 sentences on what improved, what regressed, what to investigate
6. **recommended actions**: 1–5 specific next steps (install a template, adjust approval settings, add a connector)

### 5. PM agent delta

After the analyst saves the HTML, the PM agent:
- Compares recommended actions to the current roadmap in `docs/pending.md`
- If any action is new: appends to pending.md using Conventional Commits format
- If a template moved to 'recommended': updates dim_agent_templates via SCD-1 overwrite

### 6. Follow up

After delivering the scorecard:
- Offer to open the HTML in the browser via Control Chrome MCP
- Offer to schedule or confirm the next Wednesday 10:00 UTC run via `mcp__scheduled-tasks__*`
- Offer to draft a `product-management:stakeholder-update` summarizing the week

## Key metrics reference

| metric | definition | target | source column |
|---|---|---|---|
| total tool calls | ro + write calls per session | growing | fact_connectors |
| write ratio | write / total | < 0.4 (safety) | computed |
| approval rate | granted / prompts | ≥ 0.85 | fact_connectors.approval_rate |
| error rate | errors / total calls | < 0.05 | computed |
| connector coverage | connectors with calls / connectors installed | ≥ 0.75 | computed |
| template advancement | templates moved to recommended this week | ≥ 1/month | dim_agent_templates |

## North Star OKR

```
Objective: Make cowork/ the operating system for this repo

Key Results (by end of Q3 2026):
- All 4 installed connectors used in ≥ 3 sessions per week
- analytics + plan + brain templates installed and active
- Approval rate ≥ 0.9 for write-tier tools
- Weekly metrics review runs unattended (wednesday 10:00 UTC scheduled task)
```

## Output format

Lead with the "so what" in the scorecard header: one sentence stating the most important metric movement this week. Then the table. Then actions. Keep the summary to 30 seconds of reading.

@cite `cowork/artifacts/product_vision.html` (state machine reference)
@cite `cowork/artifacts/connector_audit_94.html` (design system reference)
