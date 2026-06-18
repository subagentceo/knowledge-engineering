---
title: Limits
description: D1 account and database limits for storage, queries, row sizes, and SQL statements.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

| Feature                                                                                                                          | Limit                                                     |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Databases per account                                                                                                            | 50,000 (Workers Paid) [1](#user-content-fn-1) / 10 (Free) |
| Maximum database size                                                                                                            | 10 GB (Workers Paid) / 500 MB (Free)                      |
| Maximum storage per account                                                                                                      | 1 TB (Workers Paid) [2](#user-content-fn-2) / 5 GB (Free) |
| [Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) duration (point-in-time recovery)                     | 30 days (Workers Paid) / 7 days (Free)                    |
| Maximum Time Travel restore operations                                                                                           | 10 restores per 10 minutes (per database)                 |
| Queries per Worker invocation (read [subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests)) | 1000 (Workers Paid) / 50 (Free)                           |
| Maximum number of columns per table                                                                                              | 100                                                       |
| Maximum number of rows per table                                                                                                 | Unlimited (excluding per-database storage limits)         |
| Maximum string, BLOB or table row size                                                                                           | 2,000,000 bytes (2 MB)                                    |
| Maximum SQL statement length                                                                                                     | 100,000 bytes (100 KB)                                    |
| Maximum bound parameters per query                                                                                               | 100                                                       |
| Maximum arguments per SQL function                                                                                               | 32                                                        |
| Maximum characters (bytes) in a LIKE or GLOB pattern                                                                             | 50 bytes                                                  |
| Maximum bindings per Workers script                                                                                              | Approximately 5,000 [3](#user-content-fn-3)               |
| Maximum SQL query duration                                                                                                       | 30 seconds [4](#user-content-fn-4)                        |
| Maximum file import (d1 execute) size                                                                                            | 5 GB [5](#user-content-fn-5)                              |

Batch limits

Limits for individual queries (listed above) apply to each individual statement contained within a batch statement. For example, the maximum SQL statement length of 100 KB applies to each statement inside a `db.batch()`.

Cloudflare also offers other storage solutions such as [Workers KV](https://developers.cloudflare.com/kv/api/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), and [R2](https://developers.cloudflare.com/r2/get-started/). Each product has different advantages and limits. Refer to [Choose a data or storage product](https://developers.cloudflare.com/workers/platform/storage-options/) to review which storage option is right for your use case.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Frequently Asked Questions

Frequently asked questions related to D1 limits:

### How much work can a D1 database do?

D1 is designed for horizontal scale out across multiple, smaller (10 GB) databases, such as per-user, per-tenant or per-entity databases. D1 allows you to build applications with thousands of databases at no extra cost, as the pricing is based only on query and storage costs.

#### Storage

Each D1 database can store up to 10 GB of data.

Warning

Note that the 10 GB limit of a D1 database cannot be further increased.

#### Concurrency and throughput

Each individual D1 database is inherently single-threaded, and processes queries one at a time.

Your maximum throughput is directly related to the duration of your queries.

* If your average query takes 1 ms, you can run approximately 1,000 queries per second.
* If your average query takes 100 ms, you can run 10 queries per second.

A database that receives too many concurrent requests will first attempt to queue them. If the queue becomes full, the database will return an ["overloaded" error](https://developers.cloudflare.com/d1/observability/debug-d1/#error-list).

Each individual D1 database is backed by a single [Durable Object](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/). When using [D1 read replication ↗](https://developers.cloudflare.com/d1/best-practices/read-replication/#primary-database-instance-vs-read-replicas) each replica instance is a different Durable Object and the guidelines apply to each replica instance independently.

#### Query performance

Query performance is the most important factor for throughput. As a rough guideline:

* Read queries like `SELECT name FROM users WHERE id = ?` with an appropriate index on `id` will take less than a millisecond for SQL duration.
* Write queries like `INSERT` or `UPDATE` can take several milliseconds for SQL duration, and depend on the number of rows written. Writes need to be durably persisted across several locations - learn more on [how D1 persists data under the hood ↗](https://blog.cloudflare.com/d1-read-replication-beta/#under-the-hood-how-d1-read-replication-is-implemented).
* Data migrations like a large `UPDATE` or `DELETE` affecting millions of rows must be run in batches. A single query that attempts to modify hundreds of thousands of rows or hundreds of MBs of data at once will exceed execution limits. Break the work into smaller chunks (e.g., processing 1,000 rows at a time) to stay within platform limits.

To ensure your queries are fast and efficient, [use appropriate indexes in your SQL schema](https://developers.cloudflare.com/d1/best-practices/use-indexes/).

#### CPU and memory

Operations on a D1 database, including query execution and result serialization, run within the [Workers platform CPU and memory limits](https://developers.cloudflare.com/workers/platform/limits/#memory).

Exceeding these limits, or hitting other platform limits, will generate errors. Refer to the [D1 error list for more details](https://developers.cloudflare.com/d1/observability/debug-d1/#error-list).

### How many simultaneous connections can a Worker open to D1?

You can open up to six connections (to D1) simultaneously for each invocation of your Worker.

For more information on a Worker's simultaneous connections, refer to [Simultaneous open connections](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections).

## Footnotes

1. The maximum number of databases per account can be increased by request on Workers Paid and Enterprise plans, with support for millions to tens-of-millions of databases (or more) per account. Refer to the guidance on limit increases on this page to request an increase. [↩](#user-content-fnref-1)
2. The maximum storage per account can be increased by request on Workers Paid and Enterprise plans. Refer to the guidance on limit increases on this page to request an increase. [↩](#user-content-fnref-2)
3. A single Worker script can have up to 1 MB of script metadata. A binding is defined as a binding to a resource, such as a D1 database, KV namespace, [environmental variable](https://developers.cloudflare.com/workers/configuration/environment-variables/), or secret. Each resource binding is approximately 150-bytes, however environmental variables and secrets are controlled by the size of the value you provide. Excluding environmental variables, you can bind up to \~5,000 D1 databases to a single Worker script. [↩](#user-content-fnref-3)
4. Requests to Cloudflare API must resolve in 30 seconds. Therefore, this duration limit also applies to the entire batch call. [↩](#user-content-fnref-4)
5. The imported file is uploaded to R2\. Refer to [R2 upload limit](https://developers.cloudflare.com/r2/platform/limits). [↩](#user-content-fnref-5)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/platform/limits/#page","headline":"Limits · Cloudflare D1 docs","description":"D1 account and database limits for storage, queries, row sizes, and SQL statements.","url":"https://developers.cloudflare.com/d1/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/platform/limits/","name":"Limits"}}]}
```
