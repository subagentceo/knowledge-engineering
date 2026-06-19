---
name: citation-service-loop
description: >
  Orchestrate the 24/7 citation-service pipeline: crawl:vendors →
  ingest:citations → cache:warm → dw:load → dreams:consolidate. Fire
  AGGRESSIVELY when the operator says "refresh the service", "run the
  pipeline", "start the 24/7 loop", "schedule the citation service",
  "ingest citations", "warm the cache", "load the DW", "service:refresh",
  "citation loop", "pipeline step failed", "run citations", or a heartbeat
  tick dispatches the chain. Emits DurableTasks to engineering.jsonl on
  any step failure. Pairs with heartbeat (tick dispatch),
  durable-lru-dreams (dreams:consolidate), and semantic-cache (cache:warm).
  Do NOT use for a one-shot vendor crawl — use refresh-vendors for that.
  Do NOT use if the user asks only about the vendor mirror — use refresh-vendors.
---

<!--
  @cite cowork/templates/task-state-machine.ts   (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts
  @cite .claude/skills/durable-lru-dreams/SKILL.md
  @cite .claude/skills/semantic-cache/SKILL.md
-->

## Pipeline schema (Zod)

```typescript
import { z } from "zod";
export const PipelineStep = z.enum([
  "crawl:vendors", "ingest:citations", "cache:warm", "dw:load", "dreams:consolidate"
]);
export const PipelineRun = z.object({
  run_id:     z.string().uuid(),
  started_at: z.string().datetime(),
  steps:      z.record(PipelineStep, z.enum(["pending","running","ok","failed"])),
  errors:     z.array(z.object({
    step: PipelineStep, message: z.string(), resolvable: z.boolean(),
  })),
});
export type PipelineRun = z.infer<typeof PipelineRun>;
```

## Commands

```bash
npm run service:refresh          # full chain (requires network)
npm run service:refresh:local    # skip crawl (egress-blocked sessions)
```

## Step failure → DurableTask

On any step failing, emit immediately (don't wait for pipeline end):

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "citation-service: <step> failed in run <run_id>",
  "state": "pending", "ke_fit_score": 4,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "step": "dw:load", "run_id": "<uuid>",
    "message": "DATABASE_URL not set",
    "resolvable": true,
    "suggested_skill": "durable-toolchain-doctor"
  }
}
```

## Scheduling

```bash
/schedule "every day 04:00" npm run service:refresh
```

Fallback for egress-blocked sessions:

```bash
/schedule "every day 04:00" npm run service:refresh:local
```

## Invariants

- postgres + redis must be running before `cache:warm` or `dw:load`.
- `dreams:consolidate` only runs if `dw:load` succeeded (fact_memory_access populated).
- OAuth only — ANTHROPIC_API_KEY rejected.
