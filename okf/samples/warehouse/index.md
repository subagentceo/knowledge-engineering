# warehouse

Dimensional-model concepts over the AlloyDB citation warehouse (`dw` schema). Each `.md` carries typed
`semantics` (a semantic layer of measures + dimensions) over its canonical `data/models/alloydb/*.yaml` model.

# Facts

* [fact_vendor_crawl](fact_vendor_crawl.md) - one row per vendor per warehouse load; corpus size + dated share over time.

# Dimensions

* dim_vendor - SCD I vendor registry (vendor_name, host, doc_count). *(concept pending)*

# Reports

* rpt_vendor_freshness - aggregates fact_vendor_crawl; last load + run count per vendor. *(concept pending)*
