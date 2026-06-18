---
title: Limits
description: Account, storage, CPU, and SQL limits for Durable Objects on Free and Workers Paid plans.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Durable Objects are a special kind of Worker, so [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/) apply according to your Workers plan. In addition, Durable Objects have specific limits as listed in this page.

## SQLite-backed Durable Objects general limits

| Feature                                      | Limit                                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Number of Objects                            | Unlimited (within an account or of a given class)                                                                                                                  |
| Maximum Durable Object classes (per account) | 500 (Workers Paid) / 100 (Free) [1](#user-content-fn-1)                                                                                                            |
| Storage per account                          | Unlimited (Workers Paid) / 5GB (Free) [2](#user-content-fn-2)                                                                                                      |
| Storage per class                            | Unlimited [3](#user-content-fn-3)                                                                                                                                  |
| Storage per Durable Object                   | 10 GB [3](#user-content-fn-3)                                                                                                                                      |
| Key size                                     | Key and value combined cannot exceed 2 MB                                                                                                                          |
| Value size                                   | Key and value combined cannot exceed 2 MB                                                                                                                          |
| WebSocket message size                       | 32 MiB (only for received messages)                                                                                                                                |
| CPU per request                              | 30 seconds (default) / configurable to 5 minutes of [active CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) [4](#user-content-fn-4) |
| Simultaneous outgoing connections/request    | 6 (same as [Workers](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections))                                                    |

### SQL storage limits

For Durable Object classes with [SQLite storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) these SQL limits apply:

| SQL                                                  | Limit                                           |
| ---------------------------------------------------- | ----------------------------------------------- |
| Maximum number of columns per table                  | 100                                             |
| Maximum number of rows per table                     | Unlimited (excluding per-object storage limits) |
| Maximum string, BLOB or table row size               | 2 MB                                            |
| Maximum SQL statement length                         | 100 KB                                          |
| Maximum bound parameters per query                   | 100                                             |
| Maximum arguments per SQL function                   | 32                                              |
| Maximum characters (bytes) in a LIKE or GLOB pattern | 50 bytes                                        |

## Key-value backed Durable Objects general limits

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-migration) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

| Feature                                      | Limit for class with key-value storage backend                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Number of Objects                            | Unlimited (within an account or of a given class)                                                               |
| Maximum Durable Object classes (per account) | 500 (Workers Paid) / 100 (Free) [5](#user-content-fn-5)                                                         |
| Storage per account                          | 50 GB (can be raised by contacting Cloudflare) [6](#user-content-fn-6)                                          |
| Storage per class                            | Unlimited                                                                                                       |
| Storage per Durable Object                   | Unlimited                                                                                                       |
| Key size                                     | 2 KiB (2048 bytes)                                                                                              |
| Value size                                   | 128 KiB (131072 bytes)                                                                                          |
| WebSocket message size                       | 32 MiB (only for received messages)                                                                             |
| CPU per request                              | 30s (including WebSocket messages) [7](#user-content-fn-7)                                                      |
| Simultaneous outgoing connections/request    | 6 (same as [Workers](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections)) |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Frequently Asked Questions

### How much work can a single Durable Object do?

Durable Objects can scale horizontally across many Durable Objects. Each individual Object is inherently single-threaded.

* An individual Object has a soft limit of 1,000 requests per second. You can have an unlimited number of individual objects per namespace.
* A simple [storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) `get()` on a small value that directly returns the response may realize a higher request throughput compared to a Durable Object that (for example) serializes and/or deserializes large JSON values.
* Similarly, a Durable Object that performs multiple `list()` operations may be more limited in terms of request throughput.

A Durable Object that receives too many requests will, after attempting to queue them, return an [overloaded](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-is-overloaded) error to the caller.

### How many Durable Objects can I create?

Durable Objects are designed such that the number of individual objects in the system do not need to be limited, and can scale horizontally.

* You can create and run as many separate Durable Objects as you want within a given Durable Object namespace.
* There are no limits for storage per account when using SQLite-backed Durable Objects on a Workers Paid plan.
* Each SQLite-backed Durable Object has a storage limit of 10 GB on a Workers Paid plan.
* Refer to [Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/) for more information.

### Can I increase Durable Objects' CPU limit?

Durable Objects are Worker scripts, and have the same [per invocation CPU limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) as any Workers do. Note that CPU time is active processing time: not time spent waiting on network requests, storage calls, or other general I/O, which don't count towards your CPU time or Durable Objects compute consumption.

By default, the maximum CPU time per Durable Objects invocation (HTTP request, WebSocket message, or Alarm) is set to 30 seconds, but can be increased for all Durable Objects associated with a Durable Object definition by setting `limits.cpu_ms` in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-8385)
* [  wrangler.toml ](#tab-panel-8386)

JSONC

```

{

  // ...rest of your configuration...

  "limits": {

    "cpu_ms": 300000, // 300,000 milliseconds = 5 minutes

  },

  // ...rest of your configuration...

}


```

TOML

```

[limits]

cpu_ms = 300_000


```

### What happens when a Durable Object exceeds its storage limit?

When a SQLite-backed Durable Object reaches its [maximum storage limit](https://developers.cloudflare.com/durable-objects/platform/limits/) (10 GB on Workers Paid, or 1 GB on the Free plan), write operations (such as `INSERT`, `UPDATE`, or calls to the `put()` and `sql.exec()` storage APIs) will fail with the following error:

```

database or disk is full: SQLITE_FULL


```

Read operations (such as `SELECT` queries, `get()`, and `list()` calls) will continue to work, and `DELETE` operations will also succeed so that you can remove data to free up space.

To handle this error in your Durable Object, catch the exception thrown by the storage API:

TypeScript

```

try {

  this.ctx.storage.sql.exec(

    "INSERT INTO my_table (key, value) VALUES (?, ?)",

    key,

    value,

  );

} catch (e) {

  if (e.message.includes("SQLITE_FULL")) {

    // Storage limit reached — reads and deletes still work

    // Consider deleting old data or returning a meaningful error to the caller

  }

  throw e;

}


```

## Wall time limits by invocation type

Wall time (also called wall-clock time) is the total elapsed time from the start to end of an invocation, including time spent waiting on network requests, I/O, and other asynchronous operations. This is distinct from [CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time), which only measures time the CPU spends actively executing your code.

The following table summarizes the wall time limits for different types of Worker invocations across the developer platform:

| Invocation type                                                                                     | Wall time limit | Details                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Incoming HTTP request                                                                               | Unlimited       | No hard limit while the client remains connected. A Worker that is still streaming a response body remains active. [waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) extends execution for up to 30 seconds after the response or disconnect. |
| [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)             | 15 minutes      | Scheduled Workers have a maximum wall time of 15 minutes per invocation.                                                                                                                                                                                                             |
| [Queue consumers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) | 15 minutes      | Each consumer invocation has a maximum wall time of 15 minutes.                                                                                                                                                                                                                      |
| [Durable Object alarm handlers](https://developers.cloudflare.com/durable-objects/api/alarms/)      | 15 minutes      | Alarm handler invocations have a maximum wall time of 15 minutes.                                                                                                                                                                                                                    |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/) (RPC / HTTP)                  | Unlimited       | No hard limit while the caller stays connected to the Durable Object. Durable Objects remain active while a request, RPC call, response stream, WebSocket, or pending I/O is in flight.                                                                                              |
| [Workflows](https://developers.cloudflare.com/workflows/) (per step)                                | Unlimited       | Each step can run for an unlimited wall time. Individual steps are subject to the configured [CPU time limit](https://developers.cloudflare.com/workers/platform/limits/#cpu-time).                                                                                                  |

## Footnotes

1. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/). [↩](#user-content-fnref-1)
2. Durable Objects both bills and measures storage based on a gigabyte  
 (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).  
[↩](#user-content-fnref-2)
3. Accounts on the Workers Free plan are limited to 5 GB total Durable Objects storage. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)
4. Each incoming HTTP request or WebSocket _message_ resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#can-i-increase-durable-objects-cpu-limit). [↩](#user-content-fnref-4)
5. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/). [↩](#user-content-fnref-5)
6. Durable Objects both bills and measures storage based on a gigabyte  
 (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).  
[↩](#user-content-fnref-6)
7. Each incoming HTTP request or WebSocket _message_ resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#can-i-increase-durable-objects-cpu-limit). [↩](#user-content-fnref-7)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/platform/limits/#page","headline":"Limits · Cloudflare Durable Objects docs","description":"Account, storage, CPU, and SQL limits for Durable Objects on Free and Workers Paid plans.","url":"https://developers.cloudflare.com/durable-objects/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/platform/limits/","name":"Limits"}}]}
```
