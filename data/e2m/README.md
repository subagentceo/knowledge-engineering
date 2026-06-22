# `data/e2m` — the e2m entity-relationship model

The typed data model for e2m, generated from one source and projected to postgres.

- **`model.ts`** — the e2m-ts **zod** data model + enums, versioned `EM_MODEL_VERSION = 1.0.0` (semver:
  MAJOR on breaking column/enum change, MINOR additive, PATCH docs/semantics). tsc-clean.
- **`tables/<entity>.sql`** — **one postgres table per file**, each with a **semantics YAML header** above the
  `CREATE TABLE` (entity, version, grain, owner, keys, dimensions/measures, relationships). 6 entities:
  `agent`, `team`, `team_member`, `envelope`, `durable_task`, `transition`.
- **`erd.mermaid`** — the entity-relationship diagram.

```
operator/…/data-manager  →  model.ts (zod, v1.0.0)  →  tables/*.sql (1 table/file + semantics yaml)  →  erd.mermaid
```

The semantics header is the per-table semantic layer (grain + dimensions + measures + relationships) — the
substrate the plan-frontend completion metrics read from. Apply order: `agent` → `team` → `team_member` →
`envelope` → `durable_task` → `transition` (FK order).
