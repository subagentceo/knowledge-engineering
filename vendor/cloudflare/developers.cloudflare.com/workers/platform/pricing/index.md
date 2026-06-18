---
title: Pricing
description: Workers plans and pricing information.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

By default, users have access to the Workers Free plan. The Workers Free plan includes limited usage of Workers, Pages Functions, Workers KV and Hyperdrive. Read more about the [Free plan limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits).

The Workers Paid plan includes Workers, Pages Functions, Workers KV, Hyperdrive, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan. There are no additional charges for data transfer (egress) or throughput (bandwidth).

All included usage is on a monthly basis.

Pages Functions billing

All [Pages Functions](https://developers.cloudflare.com/pages/functions/) are billed as Workers. All pricing and inclusions in this document apply to Pages Functions. Refer to [Functions Pricing](https://developers.cloudflare.com/pages/functions/pricing/) for more information on Pages Functions pricing.

## Workers

Users on the Workers Paid plan have access to the Standard usage model. Workers Enterprise accounts are billed based on the usage model specified in their contract. To switch to the Standard usage model, contact your Account Manager.

| Requests1, 2, 3 | Duration                                                     | CPU time                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Free**        | 100,000 per day                                              | No charge for duration          | 10 milliseconds of CPU time per invocation                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Standard**    | 10 million included per month  +$0.30 per additional million | No charge or limit for duration | 30 million CPU milliseconds included per month +$0.02 per additional million CPU milliseconds Max of [5 minutes of CPU time](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) per invocation (default: 30 seconds) Max of 15 minutes of CPU time per [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) or [Queue Consumer](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) invocation |

1 Inbound requests to your Worker. Cloudflare does not bill for[subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests) you make from your Worker.

2 WebSocket connections made to a Worker are charged as a request, representing the initial `Upgrade` connection made to establish the WebSocket. WebSocket messages routed through a Worker do not count as requests.

3 Requests to static assets are free and unlimited.

### Example pricing

#### Example 1

A Worker that serves 15 million requests per month, and uses an average of 7 milliseconds (ms) of CPU time per request, would have the following estimated costs:

| Monthly Costs    | Formula |                                                                                                           |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| **Subscription** | $5.00   |                                                                                                           |
| **Requests**     | $1.50   | (15,000,000 requests - 10,000,000 included requests) / 1,000,000 \* $0.30                                 |
| **CPU time**     | $1.50   | ((7 ms of CPU time per request \* 15,000,000 requests) - 30,000,000 included CPU ms) / 1,000,000 \* $0.02 |
| **Total**        | $8.00   |                                                                                                           |

#### Example 2

A project that serves 15 million requests per month, with 80% (12 million) requests serving [static assets](https://developers.cloudflare.com/workers/static-assets/) and the remaining invoking dynamic Worker code. The Worker uses an average of 7 milliseconds (ms) of time per request.

Requests to static assets are free and unlimited. This project would have the following estimated costs:

| Monthly Costs                 | Formula |    |
| ----------------------------- | ------- | -- |
| **Subscription**              | $5.00   |    |
| **Requests to static assets** | $0      | \- |
| **Requests to Worker**        | $0      | \- |
| **CPU time**                  | $0      | \- |
| **Total**                     | $5.00   |    |

#### Example 3

A Worker that runs on a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) once an hour to collect data from multiple APIs, process the data and create a report.

* 720 requests/month
* 3 minutes (180,000ms) of CPU time per request

In this scenario, the estimated monthly cost would be calculated as:

| Monthly Costs    | Formula |                                                                                                          |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription** | $5.00   |                                                                                                          |
| **Requests**     | $0.00   | \-                                                                                                       |
| **CPU time**     | $1.99   | ((180,000 ms of CPU time per request \* 720 requests) - 30,000,000 included CPU ms) / 1,000,000 \* $0.02 |
| **Total**        | $6.99   |                                                                                                          |

#### Example 4

A high traffic Worker that serves 100 million requests per month, and uses an average of 7 milliseconds (ms) of CPU time per request, would have the following estimated costs:

| Monthly Costs    | Formula |                                                                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| **Subscription** | $5.00   |                                                                                                            |
| **Requests**     | $27.00  | (100,000,000 requests - 10,000,000 included requests) / 1,000,000 \* $0.30                                 |
| **CPU time**     | $13.40  | ((7 ms of CPU time per request \* 100,000,000 requests) - 30,000,000 included CPU ms) / 1,000,000 \* $0.02 |
| **Total**        | $45.40  |                                                                                                            |

Custom limits

To prevent accidental runaway bills or denial-of-wallet attacks, configure the maximum amount of CPU time that can be used per invocation by [defining limits in your Worker's Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#limits), or via the Cloudflare dashboard (**Workers & Pages** \> Select your Worker > **Settings** \> **CPU Limits**).

If you had a Worker on the Bundled usage model prior to the migration to Standard pricing on March 1, 2024, Cloudflare has automatically added a 50 ms CPU limit on your Worker.

### How to switch usage models

Note

Some Workers Enterprise customers maintain the ability to change usage models.

Users on the Workers Paid plan have access to the Standard usage model. However, some users may still have a legacy usage model configured. Legacy usage models include Workers Unbound and Workers Bundled. Users are advised to move to the Workers Standard usage model. Changing the usage model only affects billable usage, and has no technical implications.

To change your default account-wide usage model:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Find **Usage Model** on the right-side menu > **Change**.

Usage models may be changed at the individual Worker level:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker > **Settings** \> **Usage Model**.

Existing Workers will not be impacted when changing the default usage model. You may change the usage model for individual Workers without affecting your account-wide default usage model.

## Workers Logs

Workers Logs is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

| Log Events Written | Retention                                                    |        |
| ------------------ | ------------------------------------------------------------ | ------ |
| **Workers Free**   | 200,000 per day                                              | 3 Days |
| **Workers Paid**   | 20 million included per month  +$0.60 per additional million | 7 Days |

Workers Logs documentation

For more information and [examples of Workers Logs billing](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#example-pricing), refer to the [Workers Logs documentation](https://developers.cloudflare.com/workers/observability/logs/workers-logs).

## Workers Trace Events Logpush

Workers Logpush is only available on the Workers Paid plan.

| Paid plan  |                                    |
| ---------- | ---------------------------------- |
| Requests 1 | 10 million / month, +$0.05/million |

1 Workers Logpush charges for request logs that reach your end destination after applying filtering or sampling.

## Workers KV

Workers KV is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

| Free plan1    | Paid plan     |                                   |
| ------------- | ------------- | --------------------------------- |
| Keys read     | 100,000 / day | 10 million/month, + $0.50/million |
| Keys written  | 1,000 / day   | 1 million/month, + $5.00/million  |
| Keys deleted  | 1,000 / day   | 1 million/month, + $5.00/million  |
| List requests | 1,000 / day   | 1 million/month, + $5.00/million  |
| Stored data   | 1 GB          | 1 GB, + $0.50/ GB-month           |

1 The Workers Free plan includes limited Workers KV usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

Note

Workers KV pricing for read, write and delete operations is on a per-key basis. Bulk read operations are billed by the amount of keys read in a bulk read operation.

KV documentation

To learn more about KV, refer to the [KV documentation](https://developers.cloudflare.com/kv/).

## Hyperdrive

Hyperdrive is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

| Free plan[1](#user-content-fn-1)        | Paid plan     |           |
| --------------------------------------- | ------------- | --------- |
| Database queries[2](#user-content-fn-2) | 100,000 / day | Unlimited |

Footnotes

1: The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

2: Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`).

## Footnotes

1. The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error. [↩](#user-content-fnref-1)
2. Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`). [↩](#user-content-fnref-2)

Hyperdrive documentation

To learn more about Hyperdrive, refer to the [Hyperdrive documentation](https://developers.cloudflare.com/hyperdrive/).

## Queues

Cloudflare Queues charges for the total number of operations against each of your queues during a given month.

* An operation is counted for each 64 KB of data that is written, read, or deleted.
* Messages larger than 64 KB are charged as if they were multiple messages: for example, a 65 KB message and a 127 KB message would both incur two operation charges when written, read, or deleted.
* A KB is defined as 1,000 bytes, and each message includes approximately 100 bytes of internal metadata.
* Operations are per message, not per batch. A batch of 10 messages (the default batch size), if processed, would incur 10x write, 10x read, and 10x delete operations: one for each message in the batch.
* There are no data transfer (egress) or throughput (bandwidth) charges.

| Workers Free        | Workers Paid                   |                                                                |
| ------------------- | ------------------------------ | -------------------------------------------------------------- |
| Standard operations | 10,000 operations/day included | 1,000,000 operations/month included + $0.40/million operations |
| Message retention   | 24 hours (non-configurable)    | 4 days default, configurable up to 14 days                     |

In most cases, it takes 3 operations to deliver a message: 1 write, 1 read, and 1 delete. Therefore, you can use the following formula to estimate your monthly bill:

```

((Number of Messages * 3) - 1,000,000) / 1,000,000  * $0.40


```

Additionally:

* Each retry incurs a read operation. A batch of 10 messages that is retried would incur 10 operations for each retry.
* Messages that reach the maximum retries and that are written to a [Dead Letter Queue](https://developers.cloudflare.com/queues/configuration/batching-retries/) incur a write operation for each 64 KB chunk. A message that was retried 3 times (the default), fails delivery on the fourth time and is written to a Dead Letter Queue would incur five (5) read operations.
* Messages that are written to a queue, but that reach the maximum persistence duration (or "expire") before they are read, incur only a write and delete operation per 64 KB chunk.

Queues billing examples

To learn more about Queues pricing and review billing examples, refer to [Queues Pricing](https://developers.cloudflare.com/queues/platform/pricing/).

## D1

D1 is available on both the Workers Free and Workers Paid plans.

| [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) | [Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/#workers) |                                                           |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Rows read                                                                           | 5 million / day                                                                     | First 25 billion / month included + $0.001 / million rows |
| Rows written                                                                        | 100,000 / day                                                                       | First 50 million / month included + $1.00 / million rows  |
| Storage (per GB stored)                                                             | 5 GB (total)                                                                        | First 5 GB included + $0.75 / GB-mo                       |

Track your D1 usage

To accurately track your usage, use the [meta object](https://developers.cloudflare.com/d1/worker-api/return-object/), [GraphQL Analytics API](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-via-the-graphql-api), or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/d1/). Select your D1 database, then view: Metrics > Row Metrics.

### Definitions

1. Rows read measure how many rows a query reads (scans), regardless of the size of each row. For example, if you have a table with 5000 rows and run a `SELECT * FROM table` as a full table scan, this would count as 5,000 rows read. A query that filters on an [unindexed column](https://developers.cloudflare.com/d1/best-practices/use-indexes/) may return fewer rows to your Worker, but is still required to read (scan) more rows to determine which subset to return.
2. Rows written measure how many rows were written to D1 database. Write operations include `INSERT`, `UPDATE`, and `DELETE`. Each of these operations contribute towards rows written. A query that `INSERT` 10 rows into a `users` table would count as 10 rows written.
3. DDL operations (for example, `CREATE`, `ALTER`, and `DROP`) are used to define or modify the structure of a database. They may contribute to a mix of read rows and write rows. Ensure you are accurately tracking your usage through the available tools ([meta object](https://developers.cloudflare.com/d1/worker-api/return-object/), [GraphQL Analytics API](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-via-the-graphql-api), or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/d1/)).
4. Row size or the number of columns in a row does not impact how rows are counted. A row that is 1 KB and a row that is 100 KB both count as one row.
5. Defining [indexes](https://developers.cloudflare.com/d1/best-practices/use-indexes/) on your table(s) reduces the number of rows read by a query when filtering on that indexed field. For example, if the `users` table has an index on a timestamp column `created_at`, the query `SELECT * FROM users WHERE created_at > ?1` would only need to read a subset of the table.
6. Indexes will add an additional written row when writes include the indexed column, as there are two rows written: one to the table itself, and one to the index. The performance benefit of an index and reduction in rows read will, in nearly all cases, offset this additional write.
7. Storage is based on gigabytes stored per month, and is based on the sum of all databases in your account. Tables and indexes both count towards storage consumed.
8. Free limits reset daily at 00:00 UTC. Monthly included limits reset based on your monthly subscription renewal date, which is determined by the day you first subscribed.
9. There are no data transfer (egress) or throughput (bandwidth) charges for data accessed from D1.
10. [Read replication](https://developers.cloudflare.com/d1/best-practices/read-replication/) does not charge extra for read replicas. You incur the same usage billing based on `rows_read` and `rows_written` by your queries.

D1 billing

Refer to [D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/) to learn more about how D1 is billed.

## Durable Objects

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-migration) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

### Compute billing

Durable Objects are billed for compute duration (wall-clock time) while the Durable Object is actively running or is idle in memory but unable to [hibernate](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/). Durable Objects that are idle and eligible for hibernation are not billed for duration, even before the runtime has hibernated them. Requests to a Durable Object keep it active or create the object if it was inactive.

| Free plan | Paid plan         |                                                                                                                      |
| --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Requests  | 100,000 / day     | 1 million / month, + $0.15/million Includes HTTP requests, RPC sessions1, WebSocket messages2, and alarm invocations |
| Duration3 | 13,000 GB-s / day | 400,000 GB-s / month, + $12.50/million GB-s4,5                                                                       |

Footnotes

1 Each [RPC session](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/) is billed as one request to your Durable Object. Every [RPC method call](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) on a [Durable Objects stub](https://developers.cloudflare.com/durable-objects/) is its own RPC session and therefore a single billed request.

RPC method calls can return objects (stubs) extending [RpcTarget](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/#lifetimes-memory-and-resource-management) and invoke calls on those stubs. Subsequent calls on the returned stub are part of the same RPC session and are not billed as separate requests. For example:

JavaScript

```

let durableObjectStub = OBJECT_NAMESPACE.get(id); // retrieve Durable Object stub

using foo = await durableObjectStub.bar(); // billed as a request

await foo.baz(); // treated as part of the same RPC session created by calling bar(), not billed as a request

await durableObjectStub.cat(); // billed as a request


```

2 A request is needed to create a WebSocket connection. There is no charge for outgoing WebSocket messages, nor for incoming [WebSocket protocol pings ↗](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2). For compute requests billing-only, a 20:1 ratio is applied to incoming WebSocket messages to factor in smaller messages for real-time communication. For example, 100 WebSocket incoming messages would be charged as 5 requests for billing purposes. The 20:1 ratio does not affect Durable Object metrics and analytics, which reflect actual usage.

3 Application level auto-response messages handled by [state.setWebSocketAutoResponse()](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) will not incur additional wall-clock time, and so they will not be charged.

4 Duration is billed in wall-clock time as long as the Object is active and not eligible for hibernation, but is shared across all requests active on an Object at once. Calling `accept()` on a WebSocket in an Object will incur duration charges for the entire time the WebSocket is connected. It is recommended to use the WebSocket Hibernation API to avoid incurring duration charges once all event handlers finish running. For a complete explanation, refer to [When does a Durable Object incur duration charges?](https://developers.cloudflare.com/durable-objects/platform/pricing/#when-does-a-durable-object-incur-duration-charges).

5 Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage. If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.

### Storage billing

The [Durable Objects Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) is only accessible from within Durable Objects. Pricing depends on the storage backend of your Durable Objects.

* **SQLite-backed Durable Objects (recommended)**: [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) is recommended for all new Durable Object classes. Workers Free plan can only create and access SQLite-backed Durable Objects.
* **Key-value backed Durable Objects**: [Key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) is only available on the Workers Paid plan.

#### SQLite storage backend

Storage billing on SQLite-backed Durable Objects

Storage billing for SQLite-backed Durable Objects will be enabled in January 2026, with a target date of January 7, 2026 (no earlier). Only SQLite storage usage on and after the billing target date will incur charges. For more information, refer to [Billing for SQLite Storage](https://developers.cloudflare.com/changelog/2025-12-12-durable-objects-sqlite-storage-billing/).

| Workers Free plan    | Workers Paid plan |                                                           |
| -------------------- | ----------------- | --------------------------------------------------------- |
| Rows reads 1,2       | 5 million / day   | First 25 billion / month included + $0.001 / million rows |
| Rows written 1,2,3,4 | 100,000 / day     | First 50 million / month included + $1.00 / million rows  |
| SQL Stored data 5    | 5 GB (total)      | 5 GB-month, + $0.20/ GB-month                             |

Footnotes

1 Rows read and rows written included limits and rates match [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), Cloudflare's serverless SQL database.

2 Key-value methods like `get()`, `put()`, `delete()`, or `list()` store and query data in a hidden SQLite table and are billed as rows read and rows written.

3 Each `setAlarm()` is billed as a single row written.

4 Deletes are counted as rows written.

5 Durable Objects will be billed for stored data until the [data is removed](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#remove-a-durable-objects-storage). Once the data is removed, the object will be cleaned up automatically by the system.

#### Key-value storage backend

| Workers Paid plan     |                            |
| --------------------- | -------------------------- |
| Read request units1,2 | 1 million, + $0.20/million |
| Write request units3  | 1 million, + $1.00/million |
| Delete requests4      | 1 million, + $1.00/million |
| Stored data5          | 1 GB, + $0.20/ GB-month    |

Footnotes

1 A request unit is defined as 4 KB of data read or written. A request that writes or reads more than 4 KB will consume multiple units, for example, a 9 KB write will consume 3 write request units.

2 List operations are billed by read request units, based on the amount of data examined. For example, a list request that returns a combined 80 KB of keys and values will be billed 20 read request units. A list request that does not return anything is billed for 1 read request unit.

3 Each `setAlarm` is billed as a single write request unit.

4 Delete requests are unmetered. For example, deleting a 100 KB value will be charged one delete request.

5 Durable Objects will be billed for stored data until the data is removed. Once the data is removed, the object will be cleaned up automatically by the system.

Requests that hit the [Durable Objects in-memory cache](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) or that use the [multi-key versions of get()/put()/delete() methods](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) are billed the same as if they were a normal, individual request for each key.

Durable Objects billing examples

For more information and [examples of Durable Objects billing](https://developers.cloudflare.com/durable-objects/platform/pricing#compute-billing-examples), refer to [Durable Objects Pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/).

## Vectorize

Vectorize is currently only available on the Workers paid plan.

| [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) | [Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/#workers) |                                                                                 |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Total queried vector dimensions**                                                 | 30 million queried vector dimensions / month                                        | First 50 million queried vector dimensions / month included + $0.01 per million |
| **Total stored vector dimensions**                                                  | 5 million stored vector dimensions                                                  | First 10 million stored vector dimensions + $0.05 per 100 million               |

### Calculating vector dimensions

To calculate your potential usage, calculate the queried vector dimensions and the stored vector dimensions, and multiply by the unit price. The formula is defined as `((queried vectors + stored vectors) * dimensions * ($0.01 / 1,000,000)) + (stored vectors * dimensions * ($0.05 / 100,000,000))`

* For example, inserting 10,000 vectors of 768 dimensions each, and querying those 1,000 times per day (30,000 times per month) would be calculated as `((30,000 + 10,000) * 768) = 30,720,000` queried dimensions and `(10,000 * 768) = 7,680,000` stored dimensions (within the included monthly allocation)
* Separately, and excluding the included monthly allocation, this would be calculated as `(30,000 + 10,000) * 768 * ($0.01 / 1,000,000) + (10,000 * 768 * ($0.05 / 100,000,000))` and sum to $0.31 per month.

## R2

R2 charges based on the total volume of data stored, along with two classes of operations on that data:

1. **Class A operations** which are more expensive and tend to mutate state.
2. **Class B operations** which tend to read existing state.

There are no charges for egress bandwidth.

| Free                               | Standard storage            | Infrequent Access storage |                          |
| ---------------------------------- | --------------------------- | ------------------------- | ------------------------ |
| Storage                            | 10 GB-month / month         | $0.015 / GB-month         | $0.01 / GB-month         |
| Class A Operations                 | 1 million requests / month  | $4.50 / million requests  | $9.00 / million requests |
| Class B Operations                 | 10 million requests / month | $0.36 / million requests  | $0.90 / million requests |
| Data Retrieval (processing)        | None                        | None                      | $0.01 / GB               |
| Egress (data transfer to Internet) | Free                        | Free                      | Free                     |

R2 documentation

To learn more about R2 pricing, including billing examples, refer to [R2 Pricing](https://developers.cloudflare.com/r2/pricing/).

## Containers

Containers are billed for every 10ms that they are actively running at the following rates, with included monthly usage as part of the $5 USD per month [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/):

| Memory           | CPU                                                                | Disk                                                           |                                                           |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| **Free**         | N/A                                                                | N/A                                                            | N/A                                                       |
| **Workers Paid** | 25 GiB-hours/month included  +$0.0000025 per additional GiB-second | 375 vCPU-minutes/month \+ $0.000020 per additional vCPU-second | 200 GB-hours/month  +$0.00000007 per additional GB-second |

You only pay for what you use — charges start when a request is sent to the container or when it is manually started. Charges stop after the container instance goes to sleep, which can happen automatically after a timeout.

### Network Egress

Egress from Containers is priced at the following rates:

| Region                 | Price per GB | Included Allotment per month |
| ---------------------- | ------------ | ---------------------------- |
| North America & Europe | $0.025       | 1 TB                         |
| Oceania, Korea, Taiwan | $0.05        | 500 GB                       |
| Everywhere Else        | $0.04        | 500 GB                       |

Containers documentation

To learn more about Containers pricing, refer to [Containers Pricing](https://developers.cloudflare.com/containers/pricing/).

## Service bindings

Requests made from your Worker to another worker via a [Service Binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) do not incur additional request fees. This allows you to split apart functionality into multiple Workers, without incurring additional costs.

For example, if Worker A makes a subrequest to Worker B via a Service Binding, or calls an RPC method provided by Worker B via a Service Binding, this is billed as:

* One request (for the initial invocation of Worker A)
* The total amount of CPU time used across both Worker A and Worker B

Only available on Workers Standard pricing

If your Worker is on the deprecated Bundled or Unbound pricing plans, incoming requests from Service Bindings are charged the same as requests from the Internet. In the example above, you would be charged for two requests, one to Worker A, and one to Worker B.

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. Refer to [Limits](https://developers.cloudflare.com/workers/platform/limits/) to review definitions and behavior after a limit is hit.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/pricing/#page","headline":"Pricing · Cloudflare Workers docs","description":"Workers plans and pricing information.","url":"https://developers.cloudflare.com/workers/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/platform/pricing/","name":"Pricing"}}]}
```
