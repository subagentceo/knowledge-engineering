---
title: Pricing
description: Cloudflare Pipelines pricing for SQL transforms, sinks, and free tier details.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Pipelines charges based on two dimensions:

1. **SQL transforms**: The volume of data processed by stateless SQL transformations (optional).
2. **Sinks**: The volume of data delivered to each sink destination.

Ingress into a Pipeline stream is free. Standard [R2 storage and operations](https://developers.cloudflare.com/r2/pricing/) charges apply for data written to R2 buckets. [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/platform/pricing/) charges apply when writing to Iceberg tables.

All included usage is on a monthly basis.

## Pipelines pricing

| Workers Free                               | Workers Paid |               |
| ------------------------------------------ | ------------ | ------------- |
| **Streams (ingress)**                      |              |               |
| Included                                   | 1 GB / month | Unlimited     |
| **SQL transforms** [1](#user-content-fn-1) |              |               |
| Included                                   | 1 GB / month | 50 GB / month |
| Additional                                 | N/A          | $0.04 / GB    |
| **Sinks (egress)** [2](#user-content-fn-2) |              |               |
| Included                                   | 1 GB / month | 50 GB / month |
| R2 — JSON format                           | N/A          | $0.03 / GB    |
| R2 — Parquet / Iceberg                     | N/A          | $0.06 / GB    |

### Streams

Streams provide durable, distributed log storage that buffers incoming messages. Ingress into a stream is free regardless of volume. A single stream can be read by multiple pipelines.

### SQL transforms

SQL transforms let you filter, reshape, and compute over data before it reaches a sink. Any query that filters, renames, casts, or computes columns counts as a transform.

Pricing covers stateless transforms only (for example, filter, reshape, unnest, cast, and compute). Future stateful operations such as aggregations, joins, and windows may be priced separately.

### Sinks

Sink pricing is based on the volume of uncompressed data delivered to the destination. The rate varies by output format:

* **JSON**: $0.03 / GB — lowest compute cost, suitable for simple log forwarding.
* **Parquet / Iceberg**: $0.06 / GB — higher compute cost for columnar encoding and Iceberg table management. Best for analytics workloads.

## Billing examples

### Example 1: Simple JSON log forwarding

A pipeline ingests 200 GB of log data per month and writes it directly to an R2 bucket in JSON format with no SQL transforms.

| Dimension      | Usage     | Included | Billable | Cost  |
| -------------- | --------- | -------- | -------- | ----- |
| Streams        | 200 GB    | 50 GB    | 150 GB   | $0.00 |
| SQL transforms | 0 GB      | 50 GB    | 0 GB     | $0.00 |
| Sinks (JSON)   | 200 GB    | 50 GB    | 150 GB   | $4.50 |
| **Total**      | **$4.50** |          |          |       |

### Example 2: Filtered ingest to Iceberg with SQL

A pipeline ingests 500 GB of event data per month. A SQL transform filters and reshapes the data, reducing output to 300 GB written to an R2 Data Catalog Iceberg table.

| Dimension       | Usage      | Included | Billable | Cost   |
| --------------- | ---------- | -------- | -------- | ------ |
| Streams         | 500 GB     | 50 GB    | 450 GB   | $0.00  |
| SQL transforms  | 500 GB     | 50 GB    | 450 GB   | $18.00 |
| Sinks (Iceberg) | 300 GB     | 50 GB    | 250 GB   | $15.00 |
| **Total**       | **$33.00** |          |          |        |

## Cloudflare billing policy

To learn more about how usage is billed, refer to [Cloudflare Billing Policy](https://developers.cloudflare.com/billing/understand/billing-policy/).

## Footnotes

1. Optional. Includes stateless SQL transforms only (for example, filter, reshape, unnest, cast, compute). [↩](#user-content-fnref-1)
2. Sink egress is measured on uncompressed data. [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/platform/pricing/#page","headline":"Cloudflare Pipelines - Pricing · Cloudflare Pipelines Docs","description":"Cloudflare Pipelines pricing for SQL transforms, sinks, and free tier details.","url":"https://developers.cloudflare.com/pipelines/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/platform/pricing/","name":"Pricing"}}]}
```
