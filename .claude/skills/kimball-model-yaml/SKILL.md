---
name: kimball-model-yaml
description: >
  Produce RedHat YAML Language Server-validated YAML configs AND PostgreSQL 16
  Kimball data-warehouse DDL (fact_, dim_ SCD I–IV, events_ tables) for any
  new Anthropic model release. Use whenever the user provides a model
  announcement document and wants a DW schema, model-registry YAML, or
  CSL-cited provenance record. Trigger phrases: "model schema", "DW for model",
  "fact table for model", "dim_ table", "SCD for model", "Kimball model",
  "events_ table", "model registry YAML", "cite model data", "LSP YAML for
  model". Always use this skill when the document describes a new Claude model
  and the user asks for YAML, SQL DDL, or data-warehouse artefacts — even if
  they just say "generate the tables" or "write the YAML config".
license: Proprietary
compatibility: "claude.ai web/mobile chat, Claude Code. Postgres 16, eemeli/yaml, yaml-language-server."
metadata:
  author: max
  version: "0.1.0"
  schemaRef: "urn:mailbox:schema:kimball:model-yaml:v1"
  spec_sources:
    - https://yaml.org/spec/1.2.2/
    - https://github.com/citation-style-language/schema
    - https://github.com/redhat-developer/yaml-language-server
    - https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/
---

# Kimball Model YAML Skill

Generates three artefacts from a model-release document:

1. **`model-registry.yaml`** — RedHat LSP-validated YAML with CSL citations
2. **`kimball_ddl.sql`** — PostgreSQL 16 `fact_` / `dim_` (SCD I–IV) / `events_` DDL
3. **`schema.ts`** — Matching Zod schema for the YAML (optional, on request)

---

## Step 0 — Extract source facts

From the document, extract:

| Field | Example |
|---|---|
| `model_id` | `claude-fable-5` |
| `display_name` | `Claude Fable 5` |
| `family` | `fable` |
| `tier` | `flagship` / `preview` / `limited` |
| `context_window_k` | `1000` |
| `max_output_k` | `128` |
| `price_input_mtok` | `10.00` |
| `price_output_mtok` | `50.00` |
| `ga_date` | `2026-06-09` |
| `thinking_mode` | `adaptive_only` |
| `safety_classifiers` | `true` / `false` |
| `glasswing_only` | `true` / `false` |
| `platforms` | list of platform strings |
| `features` | list of feature strings |
| `successor_to` | prior model id or `null` |

---

## Step 1 — Emit `model-registry.yaml`

### LSP header (required)

Every YAML file MUST open with the yaml-language-server modeline so RedHat
LSP can validate it in VS Code / Neovim / IntelliJ:

```yaml
# yaml-language-server: $schema=https://example.com/schemas/model-registry.schema.json
```

Replace the URL with the project's actual JSON Schema URL, or use a relative
path `../../schemas/model-registry.schema.json` for monorepos.

### YAML structure

```yaml
# yaml-language-server: $schema=../../schemas/model-registry.schema.json
---
apiVersion: anthropic.com/v1
kind: ModelRegistryEntry

metadata:
  name: <model_id>
  labels:
    family: <family>
    tier: <tier>
  annotations:
    glasswing-only: "<true|false>"

spec:
  displayName: <display_name>
  apiModelId: <model_id>
  contextWindowK: <context_window_k>
  maxOutputK: <max_output_k>
  pricing:
    inputPerMtok: <price_input_mtok>
    outputPerMtok: <price_output_mtok>
  capabilities:
    thinkingMode: <thinking_mode>
    safetyClassifiers: <safety_classifiers>
  platforms: [<platforms>]
  features: [<features>]
  gaDate: "<ga_date>"
  successorTo: <successor_to|null>

citations:
  - id: <model_id>-announcement
    type: webpage
    title: "Introducing <display_name>"
    URL: <source_url>
    issued:
      date-parts: [[<yyyy>, <mm>, <dd>]]
    publisher: Anthropic

_provenance:
  source: kimball-model-yaml-skill
  schemaRef: urn:mailbox:schema:kimball:model-yaml:v1
  freshness: "<iso8601_now>"
  reviewerPassed: true
```

### CSL citation rules (from style-yaml skill)

- Every `citations` entry MUST have `id`, `type`, `title`, `URL`, `issued`
- `type` MUST be a valid CSL type: use `webpage` for announcements, `dataset`
  for API specs, `article` for blog posts
- `issued.date-parts` is `[[yyyy, mm, dd]]` — three-element inner array
- One citation per distinct source URL; do not duplicate

---

## Step 2 — Emit `kimball_ddl.sql`

### Postgres 16 conventions

- All names `snake_case`, schema prefix `dw.`
- Every table has `surrogate_key BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY`
- Natural/business keys get a `UNIQUE` constraint
- Timestamps: `TIMESTAMPTZ` for all wall-clock fields
- Use `NUMERIC(18,6)` for prices; `INTEGER` for token counts in thousands

### `dim_model` — SCD Type II (history-preserving)

SCD II tracks every change to a model's attributes over time (pricing,
capability flags, deprecation status). Use for attributes that can change
and where history matters.

```sql
CREATE TABLE dw.dim_model (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- Natural key
    api_model_id        TEXT        NOT NULL,
    -- SCD II bookkeeping
    row_effective_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    row_effective_to    TIMESTAMPTZ NOT NULL DEFAULT 'infinity',
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    -- Slowly-changing attributes
    display_name        TEXT        NOT NULL,
    family              TEXT        NOT NULL,
    tier                TEXT        NOT NULL CHECK (tier IN ('flagship','mid','haiku','preview','limited')),
    context_window_k    INTEGER     NOT NULL,
    max_output_k        INTEGER     NOT NULL,
    price_input_mtok    NUMERIC(18,6) NOT NULL,
    price_output_mtok   NUMERIC(18,6) NOT NULL,
    thinking_mode       TEXT,
    safety_classifiers  BOOLEAN     NOT NULL DEFAULT TRUE,
    glasswing_only      BOOLEAN     NOT NULL DEFAULT FALSE,
    successor_to        TEXT,
    -- Audit
    source_system       TEXT        NOT NULL DEFAULT 'model-registry',
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (api_model_id, row_effective_from)
);
CREATE INDEX ON dw.dim_model (api_model_id) WHERE is_current;
```

**SCD II update procedure** (close old row, insert new):

```sql
-- 1. Expire the current row
UPDATE dw.dim_model
SET    row_effective_to = NOW(),
       is_current       = FALSE
WHERE  api_model_id = :'model_id'
  AND  is_current   = TRUE;

-- 2. Insert the new version
INSERT INTO dw.dim_model (api_model_id, display_name, ...)
VALUES (:'model_id', :'display_name', ...);
```

### `dim_model_platform` — SCD Type I (overwrite)

SCD I is used for platform availability: if a platform is removed we simply
update in place — no history needed.

```sql
CREATE TABLE dw.dim_model_platform (
    surrogate_key   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    api_model_id    TEXT NOT NULL,
    platform        TEXT NOT NULL,
    available       BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (api_model_id, platform)
);
```

### `dim_model_feature` — SCD Type I

```sql
CREATE TABLE dw.dim_model_feature (
    surrogate_key   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    api_model_id    TEXT NOT NULL,
    feature         TEXT NOT NULL,
    beta            BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (api_model_id, feature)
);
```

### `dim_date` — static dimension (SCD Type 0 — never changes)

Pre-populated; referenced by fact tables via `date_key`.

```sql
CREATE TABLE dw.dim_date (
    date_key        INTEGER PRIMARY KEY,  -- YYYYMMDD
    full_date       DATE    NOT NULL UNIQUE,
    year            SMALLINT NOT NULL,
    quarter         SMALLINT NOT NULL,
    month           SMALLINT NOT NULL,
    week_iso        SMALLINT NOT NULL,
    day_of_week     SMALLINT NOT NULL,    -- 1=Mon … 7=Sun (ISO)
    is_weekend      BOOLEAN  NOT NULL
);
```

### `dim_project` — SCD Type III (track one prior value)

SCD III records the previous value of `glasswing_only` alongside the current,
so analysts can see when a model transitioned from limited to general access.

```sql
CREATE TABLE dw.dim_model_access (
    surrogate_key           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    api_model_id            TEXT NOT NULL UNIQUE,
    current_access_tier     TEXT NOT NULL,  -- 'ga' | 'glasswing' | 'deprecated'
    prior_access_tier       TEXT,           -- previous value (SCD III)
    access_tier_changed_at  TIMESTAMPTZ,
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### `fact_model_pricing` — periodic snapshot fact

One row per model per day. Captures price at a point in time for billing
analytics and cost-trend queries.

```sql
CREATE TABLE dw.fact_model_pricing (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_key            INTEGER     NOT NULL REFERENCES dw.dim_date(date_key),
    model_sk            BIGINT      NOT NULL REFERENCES dw.dim_model(surrogate_key),
    price_input_mtok    NUMERIC(18,6) NOT NULL,
    price_output_mtok   NUMERIC(18,6) NOT NULL,
    context_window_k    INTEGER     NOT NULL,
    snapshot_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (date_key, model_sk)
);
CREATE INDEX ON dw.fact_model_pricing (date_key);
CREATE INDEX ON dw.fact_model_pricing (model_sk);
```

### `fact_model_usage` — transactional fact (stub)

Skeleton for when usage telemetry is available.

```sql
CREATE TABLE dw.fact_model_usage (
    surrogate_key       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_key            INTEGER     NOT NULL REFERENCES dw.dim_date(date_key),
    model_sk            BIGINT      NOT NULL REFERENCES dw.dim_model(surrogate_key),
    platform            TEXT        NOT NULL,
    input_tokens        BIGINT      NOT NULL DEFAULT 0,
    output_tokens       BIGINT      NOT NULL DEFAULT 0,
    cache_read_tokens   BIGINT      NOT NULL DEFAULT 0,
    refusal_count       INTEGER     NOT NULL DEFAULT 0,
    fallback_count      INTEGER     NOT NULL DEFAULT 0,
    loaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX ON dw.fact_model_usage (date_key, model_sk);
```

### `events_model` — Kimball event/audit table

Append-only log of every model lifecycle event. Never update; never delete.

```sql
CREATE TABLE dw.events_model (
    event_id        BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    occurred_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_key        INTEGER     NOT NULL REFERENCES dw.dim_date(date_key),
    api_model_id    TEXT        NOT NULL,
    event_type      TEXT        NOT NULL CHECK (event_type IN (
                        'model_announced',
                        'model_ga',
                        'model_deprecated',
                        'pricing_changed',
                        'feature_added',
                        'feature_removed',
                        'platform_added',
                        'platform_removed',
                        'access_tier_changed',
                        'successor_linked'
                    )),
    actor           TEXT,          -- 'anthropic' | pipeline | user id
    old_value       JSONB,         -- previous state snapshot
    new_value       JSONB,         -- new state snapshot
    source_url      TEXT,
    notes           TEXT
);
CREATE INDEX ON dw.events_model (api_model_id, occurred_at DESC);
CREATE INDEX ON dw.events_model (event_type, occurred_at DESC);
```

---

## Step 3 — Populate from extracted facts

After emitting DDL, emit INSERT statements for the new model:

```sql
-- Seed dim_model (current row)
INSERT INTO dw.dim_model (
    api_model_id, display_name, family, tier,
    context_window_k, max_output_k,
    price_input_mtok, price_output_mtok,
    thinking_mode, safety_classifiers, glasswing_only, successor_to
) VALUES (
    '<model_id>', '<display_name>', '<family>', '<tier>',
    <context_window_k>, <max_output_k>,
    <price_input_mtok>, <price_output_mtok>,
    '<thinking_mode>', <safety_classifiers>, <glasswing_only>, <successor_to_or_NULL>
);

-- Seed events_model
INSERT INTO dw.events_model (api_model_id, event_type, actor, new_value, source_url)
VALUES (
    '<model_id>', 'model_ga', 'anthropic',
    '{"display_name":"<display_name>","ga_date":"<ga_date>"}'::jsonb,
    '<source_url>'
);
```

---

## SCD Type selection guide

| Attribute | SCD Type | Rationale |
|---|---|---|
| Pricing, context window, flags | II | History required for billing audits |
| Platform availability | I | Overwrite; no history needed |
| Feature list | I | Overwrite |
| Access tier (GA vs Glasswing) | III | One prior value is enough |
| Date dimension | 0 | Immutable calendar |
| Model lifecycle events | events_ | Append-only audit log |

---

## LSP schema registration

To enable real-time validation in editors, register the JSON Schema:

```json
// .vscode/settings.json
{
  "yaml.schemas": {
    "../../schemas/model-registry.schema.json": "model-registry*.yaml"
  }
}
```

Or for the global RedHat LSP config:

```yaml
# .yaml-lint.yaml
yaml-language-server:
  schemas:
    - fileMatch: ["model-registry*.yaml"]
      url: "../../schemas/model-registry.schema.json"
```

---

## Output checklist

- [ ] `model-registry.yaml` with LSP modeline, CSL `citations:`, `_provenance:`
- [ ] `kimball_ddl.sql` with all six tables + indexes
- [ ] Seed INSERTs for new model rows
- [ ] SCD type noted in comment above each `dim_` table
- [ ] `events_model` row for `model_ga` event
