---
title: FAQs
description: Frequently asked questions about D1 pricing, limits, and usage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQs

## Pricing

### Will D1 always have a Free plan?

Yes, the [Workers Free plan](https://developers.cloudflare.com/workers/platform/pricing/#workers) will always include the ability to prototype and experiment with D1 for free.

### What happens if I exceed the daily limits on reads and writes, or the total storage limit, on the Free plan?

When your account hits the daily read and/or write limits, you will not be able to run queries against D1\. D1 API will return errors to your client indicating that your daily limits have been exceeded. Once you have reached your included storage limit, you will need to delete unused databases or clean up stale data before you can insert new data, create or alter tables or create indexes and triggers.

Upgrading to the Workers Paid plan will remove these limits, typically within minutes.

### What happens if I exceed the monthly included reads, writes and/or storage on the paid tier?

You will be billed for the additional reads, writes and storage according to [D1's pricing metrics](https://developers.cloudflare.com/d1/platform/pricing/#billing-metrics).

### How can I estimate my (eventual) bill?

Every query returns a `meta` object that contains a total count of the rows read (`rows_read`) and rows written (`rows_written`) by that query. For example, a query that performs a full table scan (for instance, `SELECT * FROM users`) from a table with 5000 rows would return a `rows_read` value of `5000`:

```

"meta": {

  "duration": 0.20472300052642825,

  "size_after": 45137920,

  "rows_read": 5000,

  "rows_written": 0

}


```

These are also included in the D1 [Cloudflare dashboard ↗](https://dash.cloudflare.com) and the [analytics API](https://developers.cloudflare.com/d1/observability/metrics-analytics/), allowing you to attribute read and write volumes to specific databases, time periods, or both.

### Does D1 charge for data transfer / egress?

No.

### Does D1 charge additional for additional compute?

D1 itself does not charge for additional compute. Workers querying D1 and computing results: for example, serializing results into JSON and/or running queries, are billed per [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/#workers), in addition to your D1 specific usage.

### Do queries I run from the dashboard or Wrangler (the CLI) count as billable usage?

Yes, any queries you run against your database, including inserting (`INSERT`) existing data into a new database, table scans (`SELECT * FROM table`), or creating indexes count as either reads or writes.

### Can I use an index to reduce the number of rows read by a query?

Yes, you can use an index to reduce the number of rows read by a query. [Creating indexes](https://developers.cloudflare.com/d1/best-practices/use-indexes/) for your most queried tables and filtered columns reduces how much data is scanned and improves query performance at the same time. If you have a read-heavy workload (most common), this can be particularly advantageous. Writing to columns referenced in an index will add at least one (1) additional row written to account for updating the index, but this is typically offset by the reduction in rows read due to the benefits of an index.

### Does a freshly created database, and/or an empty table with no rows, contribute to my storage?

Yes, although minimal. An empty table consumes at least a few kilobytes, based on the number of columns (table width) in the table. An empty database consumes approximately 12 KB of storage.

## Limits

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/reference/faq/#page","headline":"FAQs · Cloudflare D1 docs","description":"Frequently asked questions about D1 pricing, limits, and usage.","url":"https://developers.cloudflare.com/d1/reference/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/reference/faq/","name":"FAQs"}}]}
```
