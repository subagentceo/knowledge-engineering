---
title: R2 SQL
description: A distributed SQL engine for R2 Data Catalog
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2 SQL

Note

R2 SQL is in **open beta**, and any developer with an [R2 subscription](https://developers.cloudflare.com/r2/pricing/) can start using it. Currently, outside of standard R2 storage and operations, you will not be billed for your use of R2 SQL. We will update [the pricing page](https://developers.cloudflare.com/r2-sql/platform/pricing) and provide at least 30 days notice before enabling billing.

Query Apache Iceberg tables managed by R2 Data Catalog using SQL.

R2 SQL is Cloudflare's serverless, distributed, analytics query engine for querying [Apache Iceberg ↗](https://iceberg.apache.org/) tables stored in [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). R2 SQL is designed to efficiently query large amounts of data by automatically utilizing file pruning, Cloudflare's distributed compute, and R2 object storage.

Terminal window

```

❯ npx wrangler r2 sql query "3373912de3f5202317188ae01300bd6_data-catalog" \

"SELECT * FROM default.transactions LIMIT 10"


 ⛅️ wrangler 4.38.0

────────────────────────────────────────────────────────────────────────────

▲ [WARNING] 🚧 `wrangler r2 sql query` is an open-beta command. Please report any issues to https://github.com/cloudflare/workers-sdk/issues/new/choose


┌─────────────────────────────┬──────────────────────────────────────┬─────────┬──────────┬──────────────────────────────────┬───────────────┬───────────────────┬──────────┐

│ __ingest_ts                 │ transaction_id                       │ user_id │ amount   │ transaction_timestamp            │ location      │ merchant_category │ is_fraud │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.872554Z │ fdc1beed-157c-4d2d-90cf-630fdea58051 │ 1679    │ 13241.59 │ 2025-09-20T02:23:04.269988+00:00 │ NEW_YORK      │ RESTAURANT        │ false    │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.724378Z │ ea7ef106-8284-4d08-9348-ad33989b6381 │ 1279    │ 17615.79 │ 2025-09-20T02:23:04.271090+00:00 │ MIAMI         │ GAS_STATION       │ true     │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.724330Z │ afcdee4d-5c71-42be-97ec-e282b6937a8c │ 1843    │ 7311.65  │ 2025-09-20T06:23:04.267890+00:00 │ SEATTLE       │ GROCERY           │ true     │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.657007Z │ b99d14e0-dbe0-49bc-a417-0ee57f8bed99 │ 1976    │ 15228.21 │ 2025-09-16T23:23:04.269426+00:00 │ NEW_YORK      │ RETAIL            │ false    │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.656992Z │ 712cd094-ad4c-4d24-819a-0d3daaaceea1 │ 1184    │ 7570.89  │ 2025-09-20T00:23:04.269163+00:00 │ LOS_ANGELES   │ RESTAURANT        │ true     │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.656912Z │ b5a1aab3-676d-4492-92b8-aabcde6db261 │ 1196    │ 46611.25 │ 2025-09-20T16:23:04.268693+00:00 │ NEW_YORK      │ RETAIL            │ true     │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.613740Z │ 432d3976-8d89-4813-9099-ea2afa2c0e70 │ 1720    │ 21547.9  │ 2025-09-20T05:23:04.273681+00:00 │ SAN FRANCISCO │ GROCERY           │ true     │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.532068Z │ 25e0b851-3092-4ade-842f-e3189e07d4ee │ 1562    │ 29311.54 │ 2025-09-20T05:23:04.277405+00:00 │ NEW_YORK      │ RETAIL            │ false    │

├─────────────────────────────┼──────────────────────────────────────┼─────────┼──────────┼──────────────────────────────────┼───────────────┼───────────────────┼──────────┤

│ 2025-09-20T22:30:11.526037Z │ 8001746d-05fe-42fe-a189-40caf81d7aa2 │ 1817    │ 15976.5  │ 2025-09-15T16:23:04.266632+00:00 │ SEATTLE       │ RESTAURANT        │ true     │

└─────────────────────────────┴──────────────────────────────────────┴─────────┴──────────┴──────────────────────────────────┴───────────────┴───────────────────┴──────────┘

Read 11.3 kB across 4 files from R2

On average, 3.36 kB / s


```

Create an end-to-end data pipeline by following [this step by step guide](https://developers.cloudflare.com/r2-sql/get-started/), which shows you how to stream events into an Apache Iceberg table and query it with R2 SQL.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/r2-sql/#page","headline":"R2 SQL · R2 SQL docs","description":"A distributed SQL engine for R2 Data Catalog","url":"https://developers.cloudflare.com/r2-sql/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}}]}
```
