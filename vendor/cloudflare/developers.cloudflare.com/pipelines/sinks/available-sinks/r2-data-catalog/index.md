---
title: R2 Data Catalog
description: Write data as Apache Iceberg tables to R2 Data Catalog
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2 Data Catalog

R2 Data Catalog sinks write processed data from pipelines as [Apache Iceberg ↗](https://iceberg.apache.org/) tables to [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). Iceberg tables provide ACID transactions, schema evolution, and time travel capabilities for analytics workloads.

To create an R2 Data Catalog sink, run the [pipelines sinks create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-create) command and specify the sink type, target bucket, namespace, and table name:

Terminal window

```

npx wrangler pipelines sinks create my-sink \

  --type r2-data-catalog \

  --bucket my-bucket \

  --namespace my_namespace \

  --table my_table \

  --catalog-token YOUR_CATALOG_TOKEN


```

The sink will create the specified namespace and table if they do not exist. Sinks cannot be created for existing Iceberg tables.

## Format

R2 Data Catalog sinks only support Parquet format. JSON format is not supported for Iceberg tables.

### Compression options

Configure Parquet compression for optimal storage and query performance:

Terminal window

```

--compression zstd


```

**Available compression options:**

* `zstd` (default) - Best compression ratio
* `snappy` \- Fastest compression
* `gzip` \- Good compression, widely supported
* `lz4` \- Fast compression with reasonable ratio
* `uncompressed` \- No compression

### Row group size

[Row groups ↗](https://parquet.apache.org/docs/file-format/configurations/) are sets of rows in a Parquet file that are stored together, affecting memory usage and query performance. Configure the target row group size in MB:

Terminal window

```

--target-row-group-size 256


```

## Batching and rolling policy

Control when data is written to Iceberg tables. Configure based on your needs:

* **Lower values**: More frequent writes, smaller files, lower latency
* **Higher values**: Less frequent writes, larger files, better query performance

### Roll interval

Set how often files are written (default: 300 seconds, minimum: 60 seconds):

Terminal window

```

--roll-interval 60  # Write files every 60 seconds


```

The minimum interval for R2 Data Catalog sinks is 60 seconds to prevent compaction issues. Iceberg tables require periodic compaction to merge small files into larger ones for optimal query performance. Writing too often creates merge conflicts with the compaction process.

### Roll size

Set maximum file size in MB before creating a new file:

Terminal window

```

--roll-size 100  # Create new file after 100MB


```

## Authentication

R2 Data Catalog sinks require an API token with [R2 Admin Read & Write permissions](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#create-api-token-in-the-dashboard). This permission grants the sink access to both R2 Data Catalog and R2 storage.

Terminal window

```

--catalog-token YOUR_CATALOG_TOKEN


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sinks/available-sinks/r2-data-catalog/#page","headline":"R2 Data Catalog · Cloudflare Pipelines Docs","description":"Write data as Apache Iceberg tables to R2 Data Catalog","url":"https://developers.cloudflare.com/pipelines/sinks/available-sinks/r2-data-catalog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sinks/","name":"Sinks"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sinks/available-sinks/","name":"Available sinks"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sinks/available-sinks/r2-data-catalog/","name":"R2 Data Catalog"}}]}
```
