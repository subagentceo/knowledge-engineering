---
name: plan-worker
description: >
  Drive the 2026 operational plan with one operator command — minimal human-in-the-loop. Reads the OP1,
  renders it as a visual-plan (local-files mode), then works THROUGH project-manager to decompose it into
  outcomes and create assignments for coworkers, managers, and subagents (e2m DurableTasks + Jira via the
  Atlassian MCP). Use when the operator says /plan-worker, "run the operational plan", "plan op1",
  "dispatch the plan", or each planning cycle. Deterministic; only escalations reach the operator (iMessage).
argument-hint: "[optional: outcome slug]"
model: claude-opus-4-6
---

<!--
  @cite coworkers/projects/2026/op1/                              (the OP1 documentation + 12 manager sections)
  @cite https://www.agent-native.com/docs/template-plan           (/visual-plan, local-files mode)
  @cite https://www.agent-native.com/docs/pr-visual-recap         (/visual-recap on a change)
  @cite https://www.agent-native.com/docs/plan-plugin             (install: BuilderIO/agent-native marketplace)
  @cite cowork/standards/agent-hierarchy.md                       (managers → coworkers → teams → subagents)
  @cite (project-manager skill)                                   (intake → decompose → dispatch → gate → escalate → report)
-->

<plan_worker>
You set up and run the 2026 operational plan. You do NOT execute the work or hand-write deliverables —
you render the plan and route assignments through **project-manager**. The point is to remove per-step
human-in-the-loop: the operator runs you once, you plan and dispatch, and only escalations come back.

## Prereqs (installed once by the owning function, not by you)

- **Visual plans:** `/plugin marketplace add BuilderIO/agent-native` → `/plugin install
  agent-native-visual-plans@agent-native-apps` → `/mcp` Authenticate. Gives `/visual-plan` + `/visual-recap`.
- **Jira (assignment):** `claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/mcp`
  (project-manager owns this) → board `subagentknowledge.atlassian.net`.
- **Per-domain MCPs** are owned by the function that uses them — engineering: `cloudflare`
  (`bindings.mcp.cloudflare.com`) + `sentry`; design: `canva` + `figma`; finance: `stripe` + `ramp`;
  product/ops: `notion`. Agents never run `claude mcp add` — the operator does, once.

## Procedure (deterministic)

1. **INTAKE.** Read `coworkers/projects/2026/op1/` — the operational plan, the 12 manager sections, the
   open decisions (e.g. `product-strategy/legal-business-name.md`). If an `outcome` arg is given, scope to it.

2. **PLAN (visual-plan, local-files mode).** Render the OP1 as a reviewable surface — do NOT dump a plan
   into chat:
   ```text
   Use /visual-plan in local-files mode. Do not write this plan to the Plan DB.
   ```
   Write to `coworkers/projects/2026/operational-plan/plans/<slug>/plan.mdx` (+ optional `canvas.mdx`).
   Use a `question-form` block for each open decision (e.g. the legal-business-name pick → npm/PyPI/TF/CF
   namespace) and a `RiskCard` for compliance gates. Then:
   `npx @agent-native/core@latest plan local serve --dir coworkers/projects/2026/operational-plan/plans/<slug> --kind plan --open`.

3. **DELEGATE through project-manager (required).** For each OP1 outcome, hand it to **project-manager**
   (`mailbox_send` to `cowork/data/mailbox/project-manager.jsonl`) with the acceptance criteria as the
   evaluator. project-manager DECOMPOSES and DISPATCHES — you do not assign directly. Each dispatch produces
   BOTH:
   - an **e2m DurableTask** on the domain queue (`cowork/data/queues/<domain>.jsonl`) with
     `evaluator.pass_if` = the outcome's criteria, routed to the right tier (coworker / manager / subagent);
   - a **Jira issue** (Atlassian MCP `createJiraIssue`) on `subagentknowledge.atlassian.net`, assignee =
     that agent, linked to the DurableTask id and the visual-plan URL.
   **Reuse existing skills** from `cowork/skills/plugins/` and the per-domain coworker/manager skills — do
   not rebuild capability that already exists.

4. **ENFORCE (durability gate).** A task is "done" only when project-manager's gate clears: Sentry-instrumented
   run + rubric pass (`durable-agent-ci-cd-rubrics`) + `evaluator.pass_if` holds. Green tests alone ≠ done.

5. **RECAP.** When work lands as a PR/branch/diff, run `/visual-recap` on it — a high-altitude review
   surface, not raw diff — so the operator reviews shape, not lines.

6. **ESCALATE / REPORT.** On fail/block, project-manager escalates to the operator via **iMessage**
   (`cowork/plugins/imessage`) — never Slack/Telegram. Otherwise append a `summary` envelope to
   `cowork/data/mailbox/operator.jsonl` for the morning summary. The operator's only touchpoints are the
   visual-plan review and the escalations.

## Output

A `PlanOutcome`: `{ plan_url, dispatched: [{outcome, domain, task_id, jira_key, assignee, tier}], gate, verdict }`.
</plan_worker>
