---
title: R2
description: Write data as JSON or Parquet files to R2 object storage
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# R2

R2 sinks write processed data from pipelines as raw files to [R2 object storage](https://developers.cloudflare.com/r2/). They currently support writing to JSON and Parquet formats.

To create an R2 sink, run the [pipelines sinks create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-sinks-create) command and specify the sink type and target [bucket](https://developers.cloudflare.com/r2/buckets/):

Terminal window

```

npx wrangler pipelines sinks create my-sink \

  --type r2 \

  --bucket my-bucket


```

## Format options

R2 sinks support two output formats:

### JSON format

Write data as newline-delimited JSON files:

Terminal window

```

--format json


```

### Parquet format

Write data as Parquet files for better query performance and compression:

Terminal window

```

--format parquet --compression zstd


```

**Compression options for Parquet:**

* `zstd` (default) - Best compression ratio
* `snappy` \- Fastest compression
* `gzip` \- Good compression, widely supported
* `lz4` \- Fast compression with reasonable ratio
* `uncompressed` \- No compression

**Row group size:** [Row groups ↗](https://parquet.apache.org/docs/file-format/configurations/) are sets of rows in a Parquet file that are stored together, affecting memory usage and query performance. Configure the target row group size in MB:

Terminal window

```

--target-row-group-size 256


```

## File organization

Files are written with UUID names within the partitioned directory structure. For example, with path `analytics` and default partitioning:

```

analytics/year=2025/month=09/day=18/002507a5-d449-48e8-a484-b1bea916102f.parquet


```

### Path

Set a base directory in your bucket where files will be written:

Terminal window

```

--path analytics/events


```

### Partitioning

R2 sinks automatically partition files by time using a configurable pattern. The default pattern is `year=%Y/month=%m/day=%d` (Hive-style partitioning).

Terminal window

```

--partitioning "year=%Y/month=%m/day=%d/hour=%H"


```

For available format specifiers, refer to [strftime documentation ↗](https://docs.rs/chrono/latest/chrono/format/strftime/index.html).

## Batching and rolling policy

Control when files are written to R2\. Configure based on your needs:

* **Lower values**: More frequent writes, smaller files, lower latency
* **Higher values**: Less frequent writes, larger files, better query performance

### Roll interval

Set how often files are written (default: 300 seconds, minimum: 10 seconds):

Terminal window

```

--roll-interval 10  # Write files every 10 seconds


```

### Roll size

Set maximum file size in MB before creating a new file:

Terminal window

```

--roll-size 100  # Create new file after 100MB


```

## Authentication

R2 sinks require an API credentials (Access Key ID and Secret Access Key) with [Object Read & Write permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions) to write data to your bucket.

Terminal window

```

npx wrangler pipelines sinks create my-sink \

  --type r2 \

  --bucket my-bucket \

  --access-key-id YOUR_ACCESS_KEY_ID \

  --secret-access-key YOUR_SECRET_ACCESS_KEY


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sinks/available-sinks/r2/#page","headline":"R2 · Cloudflare Pipelines Docs","description":"Write data as JSON or Parquet files to R2 object storage","url":"https://developers.cloudflare.com/pipelines/sinks/available-sinks/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sinks/","name":"Sinks"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sinks/available-sinks/","name":"Available sinks"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sinks/available-sinks/r2/","name":"R2"}}]}
```
