---
name: run-operations
description: >-
  Operations coworker session runner. Reads mailbox from
  cowork/data/mailbox/operations-coworker.jsonl, claims highest-priority pending
  task from cowork/data/queues/operations.jsonl, reads engineering queue for
  cross-domain context, executes CF Worker deploys and wrangler configs and
  scheduled tasks, writes outcome transitions via e2m-mcp, and emits DurableTask
  envelopes to engineering.jsonl on failure with resolvable and error_type and
  suggested_skill fields. Trigger on /run-operations, /operations-coworker,
  "check operations mailbox", "deploy workers", "operations queue status",
  "what's pending for operations". Do NOT trigger for product-management-coworker or
  engineering-coworker tasks. Pairs with durable-agent-ci-cd-rubrics for skill
  gate scoring and product-management-coworker for task routing.
---

<!--
  @cite cowork/coworkers/skills/operations-coworker/SKILL.md
  @cite cowork/coworkers/manifest.json
  @cite cowork/mcp/e2m-mcp/server.ts
  @cite cowork/data/queues/operations.jsonl
  @cite cowork/data/mailbox/operations-coworker.jsonl
  @cite cowork/data/queues/engineering.jsonl
  @cite cowork/templates/task-state-machine.ts
  @cite .claude/skills/durable-agent-ci-cd-rubrics/SKILL.md
-->

# run-operations

Operations coworker session skill. Reads mailbox + queues, executes infra tasks,
writes outcomes. Emits typed DurableTask envelopes on failure.

## Typed schemas

All outputs conform to the Zod schemas defined in `cowork/mcp/e2m-mcp/server.ts`.

### OperationsResult — success output (Zod)

```typescript
/** @cite cowork/mcp/e2m-mcp/server.ts Envelope schema */
const OperationsResult = z.object({
  task_id:      z.string().uuid(),
  state:        z.enum(["completed", "failed", "blocked"]),
  deployed_at:  z.string().optional(),
  workers:      z.array(z.string()).default([]),
  hostnames:    z.array(z.string()).default([]),
  files:        z.array(z.string()).default([]),
  deploy_cmd:   z.string().optional(),
  mcp_verified: z.boolean().default(false),
});
```

### OperationsFailure — failure output (Zod)

```typescript
/** @cite cowork/templates/task-state-machine.ts DurableTask schema */
const OperationsFailure = z.object({
  id:              z.string().uuid(),
  queue:           z.literal("engineering"),
  subject:         z.string(),
  state:           z.literal("pending"),
  ke_fit_score:    z.number().int().min(1).max(5),
  created_at:      z.string(),
  updated_at:      z.string(),
  error: z.object({
    skill:           z.literal("run-operations"),
    dimension:       z.string(),
    error_type:      z.string(),
    evidence:        z.string(),
    fix:             z.string(),
    resolvable:      z.boolean(),
    suggested_skill: z.string(),
  }),
});
```

## Session contract

```
STEP 1 — MAILBOX: Read cowork/data/mailbox/operations-coworker.jsonl
         Parse each line as JSON. Filter status=pending messages.
         Report: {count, subjects, senders}.

STEP 2 — QUEUE: Read cowork/data/queues/operations.jsonl
         Collapse to latest state per task_id (last-line-wins).
         Report: {pending, in_progress, blocked, completed, failed} counts.
         List pending tasks sorted by ke_fit_score desc.

STEP 3 — CROSS-DOMAIN: Read cowork/data/queues/engineering.jsonl
         Collapse, filter pending tasks.
         Summarize: skill-gate failures, blocked tasks, items relevant to operations.

STEP 4 — EXPLORE: Scan cowork/ for operations-relevant files:
         - cowork/skills/plugins/operations:*/SKILL.md (9 operations plugins)
         - cowork/artifacts/ (deployed artifacts)
         - cowork/mcpb/ (MCP bridge status)
         - frontend/ wrangler configs (CF Worker patterns)

STEP 5 — CLAIM: If pending operations tasks exist, claim highest ke_fit_score.
         Write task_transition event=claim to operations.jsonl.

STEP 6 — EXECUTE: Based on task type:
         - CF Worker deploy: use mcp__3e5cbdb5* tools (workers_list, kv_*, r2_*)
         - Wrangler config: write/update wrangler.jsonc files
         - Subdomain provisioning: custom_domain:true pattern
         - Scheduled tasks: create/update via schedule skill
         - Status report: read all queues, summarize cross-domain

STEP 7 — OUTCOME: On success, write task_transition event=complete with
         OperationsResult payload. Evaluate pass_if[] / fail_if[] from evaluator.
         mailbox_send type=outcome to product-management-coworker.

         On failure, emit OperationsFailure DurableTask to engineering.jsonl
         with resolvable=true, error_type, and suggested_skill. Then write
         task_transition event=fail with error string.

STEP 8 — ACK: mailbox_ack any processed messages.
```

## Failure handling (D2 durability)

Every failure path emits a typed DurableTask envelope to `cowork/data/queues/engineering.jsonl`:

```json
{
  "id": "<uuid4>",
  "queue": "engineering",
  "subject": "ops-fail: <task subject> — <error_type>",
  "state": "pending",
  "ke_fit_score": 4,
  "created_at": "<iso>",
  "updated_at": "<iso>",
  "error": {
    "skill": "run-operations",
    "dimension": "operations",
    "error_type": "deploy_failed | wrangler_config_invalid | subdomain_unreachable | api_key_leak",
    "evidence": "<stderr or HTTP status>",
    "fix": "<actionable remediation>",
    "resolvable": true,
    "suggested_skill": "durable-toolchain-autoresolve"
  }
}
```

Additionally, `task_transition event=fail` is appended to `operations.jsonl` so
the queue state machine stays consistent. Partial failures (e.g., Worker A deployed,
Worker B failed) emit both a `complete` transition for A and a `fail` DurableTask for B.

## Queue file format

Both queue and mailbox files are append-only JSONL. Last line per id = current state.

### Operations queue envelope (Envelope schema from e2m-mcp)

```
id, queue="operations", subject, state, ke_fit_score (1-5),
depends_on[], blocks[], evaluator{pass_if[], fail_if[]},
result{}, deployed_at, workers[], hostnames[]
```

### Mailbox message (MailboxMessage schema from e2m-mcp)

```
id, from, to, type (task|outcome|interrupt|dispatch|routine|ping|ack),
subject, body, payload, ack_required, status (pending|acked|expired), sent_at
```

## CF Worker pattern

New subdomain Workers follow `frontend/wrangler.jsonc`:
- name: cowork-frontend | coworkers-frontend
- assets.directory: ./dist
- assets.not_found_handling: single-page-application
- routes[].custom_domain: true
- vars.SITE_NAME: cowork | coworkers

## Operations plugins (9)

Under `cowork/skills/plugins/operations:*`:
capacity-plan, change-request, compliance-tracking, process-doc,
process-optimization, risk-assessment, runbook, status-report, vendor-review.

## Hard invariants

- ANTHROPIC_API_KEY is NEVER present. OAuth-only. Fail closed if found.
- Never delete a Worker without operator explicit confirmation.
- Never add routes to subagentknowledge.com zone without reading current wrangler.jsonc first.
- Conventional Commits: feat(ops): ... (O<N>)
- No half-implementations. Ship a working slice or don't open the file.
- If no pending mailbox message and no pending queue task: emit { state: "blocked" } and halt.

## Peer coworkers

| Coworker | Mailbox | Queue |
|---|---|---|
| product-management-coworker | product-management-coworker.jsonl | product-management.jsonl |
| engineering-coworker | engineering-coworker.jsonl | engineering.jsonl |
| finance-coworker | finance-coworker.jsonl | finance.jsonl |

## Example session

```
> /run-operations

STEP 1 — Mailbox: 1 pending from product-management-coworker
  "Deploy cowork-frontend + coworkers-frontend CF Workers"

STEP 2 — Queue: 1 task (completed)
  d84f2c1a... deploy cowork + coworkers — completed

STEP 3 — Engineering: 30 pending skill-gate failures (D1/D2 across 15 skills)
  No operations-blocking items.

STEP 4 — No new pending operations tasks.

STEP 5 — Ack ops-mail-0001 (task already completed).
  mailbox_send type=outcome to product-management-coworker.

Result: { state: "blocked" } — no pending work.
```

## Example failure (DurableTask emission)

```
> /run-operations
STEP 6 — EXECUTE: wrangler deploy cowork-frontend
  stderr: "Error: could not resolve custom domain cowork.subagentknowledge.com"

→ DurableTask emitted to engineering.jsonl:
  { queue: "engineering", subject: "ops-fail: deploy cowork-frontend — subdomain_unreachable",
    error: { skill: "run-operations", error_type: "subdomain_unreachable",
             resolvable: true, suggested_skill: "durable-toolchain-autoresolve" } }

→ task_transition event=fail written to operations.jsonl
→ mailbox_send type=outcome status=failed to product-management-coworker
```
