# Coworkers operating cadence + CEO top-down guidance (June 2026)

> Our operating cadence (mapped to Amazon's) and the operator-as-CEO top-down guidance the 12 managers
> plan their OP1 against. Companion to `operational-plan/` (the OP1 sections) + `agent-hierarchy.md`.
>
> @cite references/amazon-operating-cadence.md · cowork/standards/agent-hierarchy.md, operator-routing.md

## The cadence, mapped to the agent world

| Amazon | coworkers | mechanism |
| :-- | :-- | :-- |
| WBR (weekly) | morning-summary / nightly-review | `cowork/scripts/*` over the e2m queues |
| PR/FAQ (continuous) | product process | product-manager + a PR/FAQ skill |
| MBR / QBR | manager rollups | manager REPORT envelopes → `operator.jsonl` |
| annual OP1 | this plan | `operational-plan/` (12 manager sections) |
| S-team goals | operator-designated outcomes | ~15% flagged; tracked to green via e2m transitions |
| audit / control | the durability gate | OTel / Sentry + rubric + evaluator |

## CEO (operator) top-down guidance — the Investment Envelope

The operator sets targets first (per the cadence — skipping guidance causes weeks of rework). For the
coworkers launch:

```yaml
company_outcome: "launch coworkers — the operator's agentic startup — 1p now → 3p (gcp/azure/aws) as funded"
targets:                          # the envelope each manager plans against
  metrics_first: "every manager proposes 8–15 input+output metrics with 2025 / 2026 / 2027 columns"
  providers: ["Anthropic 1p (now)", "AWS Bedrock", "GCP Vertex", "Azure Foundry", "OpenAI (compare)"]
  bootstrap: "1p Claude subscription (budget); 3p token-billed by the cloud at scale (no seat licensing)"
  surfaces: ["iOS 27 app", "cowork./coworkers./workspaces. subdomains"]
  durability: "OTel-first observability; Sentry error sink; iMessage alerts"
asks_of_managers:
  - "baseline (current resources) vs incremental (needs approval) initiatives, priority-ordered"
  - "SMART, with dependencies committed by the dependent manager"
  - "separate one-way (fixed, long-term) from two-way (variable) doors; spend most discussion on one-way"
  - "decide what NOT to do"
```

## Working backward — the OP1 calendar (this cycle)

Start from the end and work backward (cadence reference). Compressed for a solo operator + an agent S-team:

```yaml
calendar:
  guidance: "operator sets the envelope (this doc) — done"
  write:    "each manager writes its 6-page OP1 (operational-plan/<id>.html) — over the cadence, NOT one-shot"
  review:   "project-manager rolls up; operator reviews each section (Amazon budgeted 2–4h per plan)"
  approve:  "operator designates S-team goals (~15%); approve baseline + selected incremental initiatives"
  execute:  "outcomes → e2m → coworkers/subagents; WBR (morning summary) tracks to green; OP2 from actuals"
```

## Why it can't be one-shot (by design)

The cadence is **distributed and iterative**: 12 managers each author a 6-page narrative, refined via
continuous PR/FAQ + WBR, reviewed by the S-team. That is the point — granularity drives precision and
achievability. This repo provides the **framework** (the 6-page template), the **process** (this cadence),
and the **guidance** (the envelope); the managers fill the content across the operating year. Today writes
the scaffold and the targets — not 72 finished pages.
