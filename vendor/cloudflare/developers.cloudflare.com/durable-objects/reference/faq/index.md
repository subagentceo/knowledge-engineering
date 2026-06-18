---
title: FAQs
description: Frequently asked questions about Durable Objects pricing, limits, and metrics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQs

## Pricing

### When does a Durable Object incur duration charges?

A Durable Object incurs duration charges when it is actively executing JavaScript — either handling a request or running event handlers — or when it is idle but does not meet the [conditions for hibernation](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/). An idle Durable Object that qualifies for hibernation does not incur duration charges, even during the brief window before the runtime hibernates it.

Once an object has been evicted from memory, the next time it is needed, it will be recreated (calling the constructor again).

There are several factors that can prevent a Durable Object from hibernating and cause it to continue incurring duration charges.

Find more information in [Lifecycle of a Durable Object](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/).

### Does an empty table / SQLite database contribute to my storage?

Yes, although minimal. Empty tables can consume at least a few kilobytes, based on the number of columns (table width) in the table. An empty SQLite database consumes approximately 12 KB of storage.

### Does metadata stored in Durable Objects count towards my storage?

All writes to a SQLite-backed Durable Object stores nominal amounts of metadata in internal tables in the Durable Object, which counts towards your billable storage.

The metadata remains in the Durable Object until you call [deleteAll()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#deleteall).

## Limits

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

* [  wrangler.jsonc ](#tab-panel-8411)
* [  wrangler.toml ](#tab-panel-8412)

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

## Metrics and analytics

### How can I identify which Durable Object instance generated a log entry?

You can use `$workers.durableObjectId` to identify the specific Durable Object instance that generated the log entry.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/reference/faq/#page","headline":"FAQs · Cloudflare Durable Objects docs","description":"Frequently asked questions about Durable Objects pricing, limits, and metrics.","url":"https://developers.cloudflare.com/durable-objects/reference/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/reference/faq/","name":"FAQs"}}]}
```
