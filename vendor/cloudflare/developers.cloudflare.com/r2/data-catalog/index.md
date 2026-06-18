---
title: R2 Data Catalog
description: A managed Apache Iceberg data catalog built directly into R2 buckets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2 Data Catalog

Note

R2 Data Catalog is in **public beta**, and any developer with an [R2 subscription](https://developers.cloudflare.com/r2/pricing/) can start using it. Currently, outside of standard R2 storage and operations, you will not be billed for your use of R2 Data Catalog.

R2 Data Catalog is a managed [Apache Iceberg ↗](https://iceberg.apache.org/) data catalog built directly into your R2 bucket. It exposes a standard Iceberg REST catalog interface, so you can connect the engines you already use, like [Spark](https://developers.cloudflare.com/r2/data-catalog/config-examples/spark-scala/), [Snowflake](https://developers.cloudflare.com/r2/data-catalog/config-examples/snowflake/), and [PyIceberg](https://developers.cloudflare.com/r2/data-catalog/config-examples/pyiceberg/).

R2 Data Catalog makes it easy to turn an R2 bucket into a data warehouse or lakehouse for a variety of analytical workloads including log analytics, business intelligence, and data pipelines. R2's zero-egress fee model means that data users and consumers can access and analyze data from different clouds, data platforms, or regions without incurring transfer costs.

To get started with R2 Data Catalog, refer to the [R2 Data Catalog: Getting started](https://developers.cloudflare.com/r2/data-catalog/get-started/).

## What is Apache Iceberg?

[Apache Iceberg ↗](https://iceberg.apache.org/) is an open table format designed to handle large-scale analytics datasets stored in object storage. Key features include:

* ACID transactions - Ensures reliable, concurrent reads and writes with full data integrity.
* Optimized metadata - Avoids costly full table scans by using indexed metadata for faster queries.
* Full schema evolution - Allows adding, renaming, and deleting columns without rewriting data.

Iceberg is already [widely supported ↗](https://iceberg.apache.org/vendors/) by engines like Apache Spark, Trino, Snowflake, DuckDB, and ClickHouse, with a fast-growing community behind it.

## Why do you need a data catalog?

Although the Iceberg data and metadata files themselves live directly in object storage (like [R2 ↗](https://developers.cloudflare.com/r2/)), the list of tables and pointers to the current metadata need to be tracked centrally by a data catalog.

Think of a data catalog as a library's index system. While books (your data) are physically distributed across shelves (object storage), the index provides a single source of truth about what books exist, their locations, and their latest editions. Without this index, readers (query engines) would waste time searching for books, might access outdated versions, or could accidentally shelve new books in ways that make them unfindable.

Similarly, data catalogs ensure consistent, coordinated access, which allows multiple query engines to safely read from and write to the same tables without conflicts or data corruption.

## Learn more

[ Get started ](https://developers.cloudflare.com/r2/data-catalog/get-started/) Learn how to enable the R2 Data Catalog on your bucket, load sample data, and run your first query. 

[ Managing catalogs ](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/) Enable or disable R2 Data Catalog on your bucket, retrieve configuration details, and authenticate your Iceberg engine. 

[ Connect to Iceberg engines ](https://developers.cloudflare.com/r2/data-catalog/config-examples/) Find detailed setup instructions for Apache Spark and other common query engines. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/r2/data-catalog/#page","headline":"R2 Data Catalog · Cloudflare R2 docs","description":"A managed Apache Iceberg data catalog built directly into R2 buckets.","url":"https://developers.cloudflare.com/r2/data-catalog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}}]}
```
