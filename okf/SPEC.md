# e2m-OKF — the e2m Open Knowledge Format

**Version 0.1 — draft.** A strict superset of [Google's Open Knowledge Format v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf): every e2m-OKF concept is a valid OKF concept (markdown + YAML frontmatter), so any OKF consumer can read it — but e2m-OKF adds what OKF v0.1 deliberately leaves out: a **predefined semantic layer over the postgres DDL**, a tiered **L1/L2/L3 (in-process LRU → redis → postgres) + memory-store + dreams** substrate, **structured citations + provenance**, **typed relationships**, and a real **exchange protocol (e2m)**.

> Built on specs already established in this repo — it does not reinvent them:
>
> @cite data/models/alloydb/*_ddl.sql (the postgres DDL — the physical floor)
> @cite schemas/table-semantics.schema.json + src/lib/table-semantics.ts (the semantic-layer contract + zod validator)
> @cite src/cache/tiered.ts (L1 in-process LRU → L2 redis → L3 postgres semantic_cache)
> @cite .claude/skills/durable-pg-memory-store + .claude/skills/durable-lru-dreams (memory store + dreams)
> @cite cowork/schemas/envelope.ts (e2m Envelope / Task / Transition)
> @cite cowork/skills/user/style-citations (CSL-JSON citations)

## 1. Why a superset, not a fork

OKF v0.1's thesis is "knowledge is markdown + frontmatter; no schema, no tooling." That makes it
trivially portable but **inert**: a consumer can *read* a table description but can't *compute* a
measure, *trust* a citation, *traverse* a typed relationship, or *receive* an update. e2m-OKF keeps
OKF's read-anywhere surface and adds the machine-actionable layer underneath. Concretely:

| dimension | Google OKF v0.1 | e2m-OKF |
| :-- | :-- | :-- |
| concept type | uncontrolled string (`type`) | OKF `type` + typed `semantics` over the postgres DDL (`table_kind` ∈ fact/dim/rpt/events, SCD, grain) |
| measures / dimensions | prose `# Schema` table | typed columns: `dimension` / `time_dimension` / `measure` + `measure_type` + `calculation` — a semantic layer over the DDL |
| serving / cache | ship the directory | tiered **L1 in-process LRU → L2 redis → L3 postgres** `semantic_cache` (fixed-size, allkeys-lru) |
| memory / curation | none | Managed Agents **memory store** + **dreams** consolidation (durable-pg-memory-store, durable-lru-dreams) |
| relationships | untyped markdown links, prose-conveyed, broken tolerated | typed `relations` edges (`foreign_key`, `aggregated_by`, `derives_from`, `depends_on`) |
| citations | numbered free-text links | CSL-JSON + W3C PROV-O `_provenance` |
| exchange | "ship the directory" (undefined) | **e2m** Envelope / Task / Transition over append-only JSONL mailbox |
| validation | none ("no required tooling") | zod (`src/lib/table-semantics.ts`) + JSON Schema + pydantic/serde mirrors; CI fail-closed |
| `log.md` history | hand-written prose | generated from e2m `transition` rows (latest-line-wins) |
| portability | markdown only | markdown surface + typed YAML/JSON/zod/pydantic/serde (one source → many bindings) |
| OKF interop | native | **projects down to OKF v0.1** (lossy markdown) and reads any OKF bundle |

The last row is the contract: **e2m-OKF ⊃ OKF v0.1**. Strip the typed blocks and you have a conformant
OKF bundle; keep them and agents get a queryable, citable, exchangeable knowledge graph.

## 2. Bundle structure

Identical to OKF (a directory of markdown concepts), plus three reserved additions:

```
bundle/
├── index.md            # OKF progressive-disclosure listing (frontmatter: okf_version, e2m_okf_version)
├── log.md              # GENERATED from e2m transition rows — not hand-written
├── <concept>.md        # an e2m-OKF concept (OKF-compatible + typed frontmatter)
├── _mailbox.jsonl      # e2m exchange log for this bundle (Envelope/Transition rows)
└── <subdir>/ …
```

`index.md` and `log.md` keep their OKF meaning. `_mailbox.jsonl` is the e2m exchange channel (§6).

## 3. Concept frontmatter (typed)

Two layers in one YAML block. The **OKF surface** (any OKF reader) and the **e2m-OKF extensions**
(agents). Validated by `okf/e2m-okf.schema.json`.

```yaml
---
# ── OKF v0.1 surface (unchanged semantics; OKF consumers read only these) ──
okf_version: "0.1"
type: "AlloyDB Fact Table"                 # OKF type string (uncontrolled, but SHOULD name the kind)
title: "Vendor crawl facts"
description: "One row per vendor per warehouse load — corpus size + citation quality over time."
resource: "alloydb://dw.fact_vendor_crawl"
tags: [warehouse, vendor, fact, semantic-layer]
timestamp: "2026-06-19T00:00:00Z"

# ── e2m-OKF typed extensions ──
e2m_okf_version: "0.1"
concept_id: "warehouse/fact_vendor_crawl"
semantics:                                  # the semantic layer over the postgres DDL
  ref: "data/models/alloydb/fact_vendor_crawl.yaml"   # semantic layer over the postgres DDL
  table_kind: fact
  grain: "one row per vendor per warehouse load (vendor_name × loaded_at)"
relations:                                  # TYPED edges, not prose links
  - { type: foreign_key, from: vendor_name, to: "warehouse/dim_vendor#vendor_name" }
  - { type: aggregated_by, to: "warehouse/rpt_vendor_freshness" }
citations:                                  # CSL-JSON, not numbered free-text
  - id: kimball-dw-toolkit
    type: book
    title: "The Data Warehouse Toolkit"
    author: [{ family: Kimball }, { family: Ross }]
    issued: { date-parts: [[2013]] }
exchange:                                   # how updates move (§6)
  envelope_type: summary
  to: data-coworker
_provenance:
  source: kimball-model-yaml
  schemaRef: "schemas/table-semantics.schema.json"
  reviewerPassed: true
---
```

### 3.1 The `semantics` block — the predefined layer over the postgres DDL

`semantics` either **`ref`s** a canonical `data/models/alloydb/<name>.yaml` (an `AlloyDbTableSemantics`
doc) or inlines the same shape. It is a **predefined semantic layer modeled on top of the physical
postgres DDL** (`data/models/alloydb/*_ddl.sql`) — it carries what OKF's prose `# Schema` cannot:

- `table_kind`: `fact` (needs `grain`) · `dim` (needs `scd_type` 0–4) · `rpt` (needs `aggregates: fact_*`) · `events`.
- columns with `kind` ∈ `dimension` / `time_dimension` / `measure`; measures carry `measure_type`
  (`count`/`sum`/`ratio`/`percentile`/…) and optional `calculation.expression` that `inherits` from
  named base columns with a typed `result_type`.

That is a **semantic layer**: dimensions to slice by, measures to aggregate, calculations that compose
— defined once over the physical DDL, machine-readable, so a consumer can build a query, not just read
a paragraph. Validation is the repo's existing zod (`src/lib/table-semantics.ts`) +
`schemas/table-semantics.schema.json`; no new validator. (Data-warehousing best practices — e.g.
Kimball's *Data Warehouse Toolkit* — *inform* how the DDL and this layer are modeled; they are a cited
reference, §5, not the name of a layer.)

### 3.2 `relations` (typed knowledge graph)

OKF links are untyped (relationship lives in prose). e2m-OKF edges are typed:

```yaml
relations:
  - { type: foreign_key,  from: <col>, to: "<concept_id>#<col>" }
  - { type: aggregated_by, to: "<rpt concept_id>" }        # fact → rpt (mirrors `aggregates`)
  - { type: derives_from,  to: "<concept_id>#<col>" }       # mirrors calculation.inherits
  - { type: depends_on,    to: "<concept_id>" }             # mirrors e2m DurableTask.depends_on
```

Edge types reuse relationships the repo already encodes (`aggregates`, `calculation.inherits`,
`depends_on`), so the graph is derivable from the typed models — not hand-maintained.

## 4. Body

Standard OKF markdown body with the conventional `# Schema`, `# Examples`, `# Citations` headings.
The body is the **human** view; the frontmatter `semantics`/`relations`/`citations` are the
**machine** view. A generator keeps the `# Schema` table in sync with `semantics.columns` (one source).

## 5. Citations & provenance

OKF citations are a numbered list of links. e2m-OKF citations are **CSL-JSON** objects (the
`style-citations` schema) — id, type, title, author, issued, URL — so they deduplicate, render in any
CSL style, and bind to the Anthropic Citations API. `_provenance` (W3C PROV-O shape) records who/what
produced the concept and which schema governs it. The `# Citations` body section is rendered *from*
the typed `citations` array.

## 6. Exchange over e2m (the part OKF leaves undefined)

OKF says "facilitate exchange" but defines no wire format. e2m-OKF uses the repo's **e2m** protocol:

- A concept create/update is emitted as a typed **Envelope** (`envelope_type: summary` for a digest,
  `notify` for a single change) to the producing coworker's mailbox JSONL.
- A consuming coworker reads its mailbox (`mailbox_recv`), acks (`mailbox_ack` → a `transition` row).
- The bundle's `log.md` is **generated** by collapsing the `transition` rows (latest-line-wins per id)
  — so history is durable and machine-written, not prose a human forgot to update.

This makes a knowledge bundle a **living, version-controlled, multi-agent artifact**: producers are
coworkers, updates are typed envelopes, the audit log is append-only JSONL. Storage stays git-native
(diffable plain text); project into AlloyDB/redis later — the records are the contract.

## 7. Storage, cache & memory (L1/L2/L3 · postgres · memory store · dreams)

A concept is more than a file — e2m-OKF defines how it is **served, persisted, remembered, and
consolidated**, reusing the repo's durable stack. The postgres **DDL** (`data/models/alloydb/*_ddl.sql`)
is the physical floor; the `semantics` layer (§3.1) is the predefined model over it; the tiers below
are how that knowledge stays fast, durable, and clean:

```yaml
read_path:                         # src/cache/tiered.ts — tieredGet, fixed-size, no TTL
  L1: "in-process LRU (lru-cache) — hot concepts, fixed max"
  L2: "redis — maxmemory + allkeys-lru (infra/redis/redis.conf); backfilled on an L3 hit"
  L3: "postgres dw.semantic_cache — durable; promoted to after PROMOTE_AFTER_HITS read-heat"
persist:
  ddl: "data/models/alloydb/*_ddl.sql — the physical tables a concept's `semantics` describes"
  warehouse: "npm run dw:load — the dim/fact/rpt rows the concepts model"
remember:
  memory_store: "curated concept facts persist to a Managed Agents memory store (durable-pg-memory-store)"
consolidate:
  dreams: "periodic dream runs dedup + reorganize the memory store (durable-lru-dreams / Dreams API)"
```

So a knowledge bundle is **cached** (L1→L2→L3), **durable** (postgres), **remembered** (memory store),
and **kept curated over time** (dreams) — none of which OKF v0.1 addresses. The headline is the whole
stack: a predefined semantic layer over the postgres DDL, wired into the redis L1/L2/L3 + postgres +
memory-store + dreams substrate the chassis already runs.

## 8. OKF v0.1 projection (interop — the "do better without breaking compatibility")

`okf project <bundle>` (spec'd here; see README for the command) emits a **plain OKF v0.1 bundle**:

- Drop the e2m-OKF extension keys from frontmatter (keep `type`/`title`/`description`/`resource`/`tags`/`timestamp`).
- Render `semantics.columns` into a `# Schema` markdown table.
- Render `citations` (CSL-JSON) into a numbered `# Citations` list.
- Render `relations` into prose links in a `# Relationships` section.
- Drop `_mailbox.jsonl`; render `log.md` as prose.

The result is byte-conformant with Google OKF v0.1 §9 — so it drops into Google's `knowledge-catalog`
tooling unchanged. e2m-OKF is the richer source; OKF v0.1 is a generated, lossy view.

## 9. Conformance

A bundle is **e2m-OKF v0.1 conformant** if:

1. It is OKF v0.1 conformant (every non-reserved `.md` has parseable frontmatter with non-empty `type`).
2. Every concept frontmatter validates against `okf/e2m-okf.schema.json` (`okf_version`,
   `e2m_okf_version`, `concept_id` present; `semantics`/`relations`/`citations` well-typed when present).
3. Every `semantics` that inlines columns validates against `schemas/table-semantics.schema.json`.
4. Every `_mailbox.jsonl` line is a valid e2m record (`cowork/schemas/envelope.ts`).

Consumers MUST tolerate plain-OKF concepts (no e2m extensions) — those are a valid subset.

## 10. Versioning

`<major>.<minor>`, declared per concept via `e2m_okf_version` and per bundle in `index.md` frontmatter.
Minor = backward-compatible additions; major = breaking. Tracks OKF's own version in the `okf_version`
field so projection (§7) always targets a known OKF release.
