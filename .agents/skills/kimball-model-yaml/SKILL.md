---
name: kimball-model-yaml
description: >
  Produce Kimball-style PostgreSQL 16 DDL (fact_, dim_ SCD I-IV, events_
  tables) and YAML model-registry configs for new Anthropic model releases or
  any structured dataset. Use whenever the user provides a model announcement
  or dataset description and asks for DW schema, model-registry YAML, DDL,
  or provenance records. Trigger on: "model schema", "DW for model",
  "fact table", "dim_ table", "SCD", "Kimball model", "events_ table",
  "model registry YAML", "generate the tables", "write the YAML config".
  Emits a DurableTask to engineering.jsonl if schema generation fails.
  Pairs with durable-pg-memory-store (postgres layer) and
  durable-agent-ci-cd-evals (schema validation).
---

<!--
  @cite data/models/alloydb/                      (existing model YAML)
  @cite cowork/templates/task-state-machine.ts    (DurableTask schema)
  @cite cowork/mcp/e2m-mcp/server.ts              (queue write)
  @cite https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/
-->

## Output contract

Every run produces three artefacts:

```yaml
outputs:
  model_registry_yaml:  data/models/alloydb/<model>.yaml    # validated YAML
  kimball_ddl_sql:      data/models/alloydb/<model>.sql     # pg16 DDL
  zod_schema:           data/models/alloydb/<model>.schema.ts  # optional
```

If generation fails, emit a DurableTask and exit non-zero:

```json
{
  "id": "<uuid>", "queue": "engineering",
  "subject": "kimball-model-yaml: schema generation failed for <model>",
  "state": "pending", "ke_fit_score": 3,
  "created_at": "<iso>", "updated_at": "<iso>",
  "error": {
    "model": "<name>", "step": "ddl|yaml|zod",
    "message": "<reason>", "resolvable": true,
    "suggested_skill": "kimball-model-yaml"
  }
}
```

## Zod schema (TypeScript)

```typescript
// @cite data/models/alloydb/<model>.schema.ts
import { z } from "zod";
export const ModelRelease = z.object({
  model_id:      z.string().uuid(),
  model_family:  z.string(),
  release_date:  z.string().datetime(),
  context_window: z.number().int().positive(),
  modalities:    z.array(z.string()),
  scd_type:      z.enum(["I","II","III","IV"]),
});
export type ModelRelease = z.infer<typeof ModelRelease>;
```

## DDL pattern (SCD II dim_)

```sql
-- dim_model SCD Type II
CREATE TABLE dim_model (
  model_sk        BIGSERIAL PRIMARY KEY,
  model_id        UUID NOT NULL,
  model_family    TEXT NOT NULL,
  release_date    DATE NOT NULL,
  context_window  INT NOT NULL,
  modalities      TEXT[] NOT NULL,
  valid_from      TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_to        TIMESTAMPTZ,
  is_current      BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX dim_model_current ON dim_model (model_id) WHERE is_current;
```

## YAML registry pattern

```yaml
# data/models/alloydb/<model>.yaml
model_id: <uuid>
model_family: Codex-sonnet
release_date: "2026-06-01"
context_window: 200000
modalities: [text, image, tool_use]
scd_type: II
```

## Procedure

1. Extract facts from the source document (model_id, family, release_date, context_window, modalities).
2. Emit `model_registry_yaml` — validate with `eemeli/yaml` schema.
3. Emit `kimball_ddl_sql` — `fact_model_usage`, `dim_model` SCD II, `events_model_release`.
4. Emit `zod_schema` — matching TypeScript Zod schema.
5. On any failure → append DurableTask to `cowork/data/queues/engineering.jsonl`.
