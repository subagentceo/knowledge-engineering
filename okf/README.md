# `okf/` — e2m-OKF, our Open Knowledge Format

Our answer to [Google's Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf)
([blog](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)).
e2m-OKF is a **strict superset of OKF v0.1**: same markdown + YAML surface, so OKF tooling reads it —
plus the substrate OKF leaves out, all built from specs **already in this repo**.

| OKF v0.1 leaves out | e2m-OKF adds it from |
| :-- | :-- |
| a semantic layer over the postgres DDL | `data/models/alloydb/*_ddl.sql` + `schemas/table-semantics.schema.json` + `src/lib/table-semantics.ts` (zod) |
| tiered cache (L1/L2/L3) | `src/cache/tiered.ts` — in-process LRU → redis → postgres `semantic_cache` |
| memory + consolidation | `durable-pg-memory-store` (memory store) + `durable-lru-dreams` (dreams) |
| structured citations + provenance | `cowork/skills/user/style-citations` (CSL-JSON) + `_provenance` (PROV-O) |
| typed relationships | the repo's own `aggregates` / `calculation.inherits` / `depends_on` edges |
| an exchange protocol | **e2m** — `cowork/schemas/envelope.ts` (Envelope / Task / Transition) |

Full spec: [`SPEC.md`](SPEC.md). Frontmatter contract: [`e2m-okf.schema.json`](e2m-okf.schema.json).

## The one-line difference

OKF lets you **read** a knowledge corpus. e2m-OKF lets agents **compute** its measures (a semantic
layer over the DDL), **serve** them from a tiered L1/L2/L3 cache, **trust** its citations, **traverse**
its typed graph, **receive** its updates over e2m, and **keep it curated** with dreams — while still
being byte-readable by any OKF consumer. e2m-OKF ⊃ OKF v0.1.

## Layout

```
okf/
├── SPEC.md                 # the format spec (superset of OKF v0.1)
├── e2m-okf.schema.json     # frontmatter JSON Schema (composes table-semantics + envelope + CSL)
├── README.md               # this file
└── samples/
    ├── index.md            # OKF progressive-disclosure listing
    └── warehouse/
        ├── index.md
        └── fact_vendor_crawl.md   # a REAL concept over data/models/alloydb/fact_vendor_crawl.yaml
```

## Map to existing primitives (nothing reinvented)

- **Semantic layer** = a predefined model over the postgres DDL (`data/models/alloydb/*_ddl.sql`), expressed as the 20 `*.yaml` models, validated by the existing zod + JSON Schema.
- **Serving** = `src/cache/tiered.ts` — L1 in-process LRU → L2 redis → L3 postgres `semantic_cache` (fixed-size, allkeys-lru).
- **Memory + dreams** = curated facts in a Managed Agents memory store (`durable-pg-memory-store`), kept clean by periodic dream consolidation (`durable-lru-dreams`).
- **Exchange** = the e2m mailbox/queue JSONL we already run (`cowork/data/mailbox`, `cowork/data/queues`).
- **Citations** = the `style-citations` CSL-JSON the warehouse models already carry (`_provenance` blocks).
- **History** = e2m `transition` rows → generated `log.md`.

## Commands (spec'd; implement against existing libs)

```bash
# validate a bundle against e2m-okf.schema.json + table-semantics.schema.json + envelope.ts
okf validate okf/samples

# project DOWN to a plain Google OKF v0.1 bundle (drops typed blocks, renders prose) — interop
okf project okf/samples --to dist/okf-v0.1

# emit a concept update as an e2m envelope to the producing coworker's mailbox
okf publish okf/samples/warehouse/fact_vendor_crawl.md --to data-coworker
```

`validate` and `project` reuse `src/lib/table-semantics.ts` and `cowork/schemas/envelope.zod.ts`; no new
schema engine. `publish` writes an Envelope via the e2m emitter (`cowork/mcp/e2m-mcp/server.ts`).

## Why "we can do better" is fair, not just louder

OKF v0.1 optimizes for *zero tooling*. That's a real virtue — and we keep it (the projection is a true
OKF bundle). But "no tooling" also means no validation, no computable measures, no trusted provenance,
and no defined exchange. e2m-OKF keeps the zero-tooling read path **and** layers the typed,
agent-actionable, multi-agent-exchangeable substrate on top — using primitives this repo already
ships and validates in CI. Same floor, much higher ceiling.
