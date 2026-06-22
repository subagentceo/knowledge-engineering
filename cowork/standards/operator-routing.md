# Operator routing — project-manager as the default e2m router

> When the operator opens a Cowork session **not attached to a specific coworker**, the request has no
> clear `to`. This protocol routes it deterministically:
> **operator → project-manager (default router) → domain manager → coworker → team → subagent.**
> Dogfoods e2m + the agent hierarchy; adds no new broker.
>
> @cite cowork/standards/agent-hierarchy.md
> @cite cowork/managers/managers.manifest.yaml (the routing keyword map + default_router)
> @cite cowork/mcp/e2m-mcp/server.ts (mailbox_send / envelope_write)

## The problem

The operator (human) opens sessions that aren't bound to a domain. An e2m envelope from the operator may
have `to` unset or unclear. Something must decide where it goes — deterministically, never silently
dropped.

## The rule

```yaml
default_route:
  when: "operator envelope with `to` unset / unclear / cross-domain"
  to: project-manager        # the default router (managers.manifest.yaml: default_router)
```

`project-manager` is the only manager with a `<routing>` section — it triages and dispatches.

## The flow

```text
operator (unattached session)
  → e2m envelope (to: unset)             default → project-manager
    → project-manager CLASSIFY           keyword map (managers.manifest.yaml `routing`)
      → ROUTE: mailbox_send → <domain>-manager   (acceptance criteria preserved as the evaluator)
        → <domain>-manager DISPATCH       DurableTask → coworker queue
          → coworker / team / subagent    execute (red/green/refactor, plugin chain)
      ← ENFORCE gate (Sentry + rubric + evaluator) ← coworker transitions
  ← REPORT summary → operator.jsonl (morning summary);  ESCALATE fails → iMessage
```

## Triage (project-manager)

```yaml
classify:                     # intent keyword → target manager (full map in managers.manifest.yaml)
  design-manager:          [design, token, css, html, artifact]
  engineering-manager:     [typescript, rust, code, pr, bug, feature, ci, mcp]
  data-manager:            [warehouse, sql, model, dw, alloydb]
  legal-manager:           [contract, nda, legal, risk, terms]
  compliance-manager:      [compliance, audit, policy, regulatory]
  finance-manager:         [cost, budget, spend, invoice, close]
  human-resources-manager: [hire, onboard, review, people, comp]
  agent-resources-manager: [agent, skill, provision, eval]
  operations-manager:      [deploy, runbook, uptime, ops, incident]
  sales-manager:           [pipeline, outreach, lead, sales]
  product-manager:         [roadmap, spec, prioritize, product]
rules:
  - "single clear match → route to that manager"
  - "cross-domain → decompose into per-domain outcomes, fan out, track delivery"
  - "no match → emit ONE `operator` envelope asking the operator to pick a domain; route on the answer"
  - "never silently drop"
```

## Why project-manager (not a new broker)

The hierarchy already names project-management as the cross-domain delivery tracker
(`cowork/coworkers/manifest.json`). Making it the default router reuses that role — no new broker, no
new protocol. Routing is just `mailbox_send` over the existing e2m queues. (Don't-reinvent.)
