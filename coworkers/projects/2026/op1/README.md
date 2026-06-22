# Coworkers — OP1 operational plan

The S-team yearly operating plan for the coworkers startup, as **standalone HTML** (the
["unreasonable effectiveness of HTML"](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)
approach — 13 self-contained files an agent can author or refine independently).

## The model — Amazon OP1, S-team = the 12 managers

Amazon runs on a yearly **OP1**: the senior team (S-team) each write a narrative for their area; the CEO
reviews and it becomes the year's strategy. Here:

- **operator** = the CEO — sets company-level outcomes.
- **the 12 managers = the S-team** — each owns one OP1 section (`<manager-id>.html`).
- **project-manager = the router** — routes operator asks to the right S-team manager (operator-routing.md).
- **coworkers + subagents** = execution — each section's outcomes become e2m DurableTasks, graded against
  the evaluator, gated by the Sentry/OTel + rubric durability gate, rolled up to the morning summary.

Each section is the same OP1 skeleton: last cycle · this cycle's top outcomes · metrics (inputs→outputs)
· dependencies · risks & asks. Managers fill them in; this is the scaffold, generated DRY.

## Files

```
index.html              cover + S-team roster + how the plan is written
<manager-id>.html × 12   one OP1 section per S-team manager (8-token design system)
manifest.json           the plan manifest (s_team, router)
build_op.py             generator — re-run after editing cowork/managers/managers.manifest.yaml
wrangler.jsonc          Cloudflare Worker (static assets) for the local sim
```

## Simulate locally (miniflare)

```bash
cd cowork/coworkers/operational-plan
npx wrangler dev          # serves index.html at http://localhost:8787 via miniflare/workerd
# or pure miniflare:
npx miniflare --assets .
```

This is the "simulate the multi-file first, before writing the `e2m/*` package code" step — the plan and
its serving harness exist as HTML + a Worker; the polyglot packages (`e2m/`, `e2m-ts`, `e2m-rs`,
`e2m-py`, `e2m-cli`, `e2m-swift`) come after the plan is agreed.

## Regenerate

```bash
python3 cowork/coworkers/operational-plan/build_op.py
```

Edit a manager's charter/model in `cowork/managers/managers.manifest.yaml`, re-run, and the section
regenerates — one source, twelve sections.
