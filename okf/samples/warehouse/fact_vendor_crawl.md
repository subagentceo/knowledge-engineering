---
okf_version: "0.1"
type: "AlloyDB Fact Table"
title: "Vendor crawl facts"
description: "One row per vendor per warehouse load — corpus size and citation extraction quality over time across all mirrored vendors."
resource: "alloydb://dw.fact_vendor_crawl"
tags: [warehouse, vendor, fact, semantic-layer]
timestamp: "2026-06-19T00:00:00Z"

e2m_okf_version: "0.1"
concept_id: "warehouse/fact_vendor_crawl"
semantics:
  ref: "data/models/alloydb/fact_vendor_crawl.yaml"
  table_kind: fact
  grain: "one row per vendor per warehouse load (vendor_name × loaded_at)"
relations:
  - { type: foreign_key, from: vendor_name, to: "warehouse/dim_vendor#vendor_name" }
  - { type: aggregated_by, to: "warehouse/rpt_vendor_freshness" }
citations:
  - id: kimball-dw-toolkit
    type: book
    title: "The Data Warehouse Toolkit"
    author: [{ family: Kimball }, { family: Ross }]
    issued: { date-parts: [[2013]] }
exchange:
  envelope_type: summary
  to: data-coworker
_provenance:
  source: kimball-model-yaml
  schemaRef: "schemas/table-semantics.schema.json"
  reviewerPassed: true
---

# Schema

Generated from `semantics` (`data/models/alloydb/fact_vendor_crawl.yaml`) — one source, not hand-kept.

| column | kind | sql_type | measure_type | notes |
|---|---|---|---|---|
| `vendor_name` | dimension | text | — | FK → [dim_vendor](/warehouse/dim_vendor.md)`#vendor_name` |
| `date_key` | time_dimension | integer | — | YYYYMMDD of the load run |
| `loaded_at` | time_dimension | timestamptz | — | load run wall-clock start |
| `doc_count` | measure | bigint | count | docs in the corpus at load time |
| `dated_count` | measure | bigint | count | docs with a parsed issued date |
| `dated_share` | measure | numeric | ratio | `dated_count / NULLIF(doc_count, 0)` — derives from the two above |

# Examples

```sql
-- freshness share by vendor for the latest load (semantic layer: a measure over a dimension)
SELECT vendor_name, dated_share
FROM dw.fact_vendor_crawl
WHERE loaded_at = (SELECT max(loaded_at) FROM dw.fact_vendor_crawl)
ORDER BY dated_share DESC;
```

# Relationships

- foreign key on `vendor_name` into [dim_vendor](/warehouse/dim_vendor.md) (SCD I).
- aggregated by [rpt_vendor_freshness](/warehouse/rpt_vendor_freshness.md).

# Citations

[1] Kimball & Ross, *The Data Warehouse Toolkit* (2013) — rendered from the typed `citations` array.
