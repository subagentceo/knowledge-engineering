---
title: Limits
description: Cloudflare Workers plan and platform limits.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

## Account plan limits

| Feature                                                                                                      | Workers Free | Workers Paid   |
| ------------------------------------------------------------------------------------------------------------ | ------------ | -------------- |
| [Requests](#daily-requests)                                                                                  | 100,000/day  | No limit       |
| [CPU time](#cpu-time)                                                                                        | 10 ms        | 5 min          |
| [Memory](#memory)                                                                                            | 128 MB       | 128 MB         |
| [Subrequests](#subrequests)                                                                                  | 50/request   | 10,000/request |
| [Simultaneous outgoing connections/request](#simultaneous-open-connections)                                  | 6            | 6              |
| [Environment variables](#environment-variables)                                                              | 64/Worker    | 128/Worker     |
| [Environment variable size](#environment-variables)                                                          | 5 KB         | 5 KB           |
| [Worker size](#worker-size)                                                                                  | 3 MB         | 10 MB          |
| [Worker startup time](#worker-startup-time)                                                                  | 1 second     | 1 second       |
| [Number of Workers](#number-of-workers)1                                                                     | 100          | 500            |
| Number of [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)per account | 5            | 250            |
| Number of [Static Asset](#static-assets) files per Worker version                                            | 20,000       | 100,000        |
| Individual [Static Asset](#static-assets) file size                                                          | 25 MiB       | 25 MiB         |

1 If you reach this limit, consider using [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

---

## Request and response limits

| Limit                | Value             |
| -------------------- | ----------------- |
| URL size             | 16 KB             |
| Request header size  | 128 KB (total)    |
| Response header size | 128 KB (total)    |
| Response body size   | No enforced limit |

Request body size limits depend on your Cloudflare account plan, not your Workers plan. Requests exceeding these limits return a `413 Request entity too large` error.

| Cloudflare Plan | Maximum request body size |
| --------------- | ------------------------- |
| Free            | 100 MB                    |
| Pro             | 100 MB                    |
| Business        | 200 MB                    |
| Enterprise      | 500 MB (by default)       |

Enterprise customers can contact their account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for a higher request body limit.

Cloudflare does not enforce response body size limits. [CDN cache limits](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) apply: 512 MB for Free, Pro, and Business plans, and 5 GB for Enterprise.

---

## CPU time

CPU time measures how long the CPU spends executing your Worker code. Waiting on network requests (such as `fetch()` calls, KV reads, or database queries) does **not** count toward CPU time.

| Limit                     | Workers Free | Workers Paid                                                |
| ------------------------- | ------------ | ----------------------------------------------------------- |
| CPU time per HTTP request | 10 ms        | 5 min (default: 30 seconds)                                 |
| CPU time per Cron Trigger | 10 ms        | 30 seconds (< 1 hour interval)  15 min (>= 1 hour interval) |

Most Workers consume very little CPU time. The average Worker uses approximately 2.2 ms per request. Heavier workloads that handle authentication, server-side rendering, or parse large payloads typically use 10-20 ms.

Each [isolate](https://developers.cloudflare.com/workers/reference/how-workers-works/#isolates) has some built-in flexibility to allow for cases where your Worker infrequently runs over the configured limit. If your Worker starts hitting the limit consistently, its execution will be terminated according to the limit configured.

#### Error: exceeded CPU time limit

When a Worker exceeds its CPU time limit, Cloudflare returns [Error 1102](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1102/#error-1102-worker-exceeded-resource-limits) to the client with the message `Worker exceeded resource limits`. In the dashboard, this appears as `Exceeded CPU Time Limits` under **Metrics** \> **Errors** \> **Invocation Statuses**. In analytics and Logpush, the invocation outcome is `exceededCpu`.

To resolve a CPU time limit error:

1. **Increase the CPU time limit** — On the Workers Paid plan, you can raise the limit from the default 30 seconds up to 5 minutes (300,000 ms). Set this in your Wrangler configuration or in the dashboard.
2. **Optimize your code** — Use [CPU profiling with DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/) to identify CPU-intensive sections of your code.
3. **Offload work** — Move expensive computation to [Durable Objects](https://developers.cloudflare.com/durable-objects/) or process data in smaller chunks across multiple requests.

#### Increasing the CPU time limit

On the Workers Paid plan, you can increase the maximum CPU time from the default 30 seconds to 5 minutes (300,000 ms).

* [  wrangler.jsonc ](#tab-panel-11898)
* [  wrangler.toml ](#tab-panel-11899)

JSONC

```

{

  // ...rest of your configuration...

  "limits": {

    "cpu_ms": 300000, // default is 30000 (30 seconds)

  },

  // ...rest of your configuration...

}


```

TOML

```

[limits]

cpu_ms = 300_000


```

You can also change this in the dashboard: go to **Workers & Pages** \> select your Worker > **Settings** \> adjust the CPU time limit.

#### Monitoring CPU usage

* **Workers Logs** — CPU time and wall time appear in the [invocation log](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#invocation-logs).
* **Tail Workers / Logpush** — CPU time and wall time appear at the top level of the [Workers Trace Events object](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers%5Ftrace%5Fevents/).
* **DevTools** — Use [CPU profiling with DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/) locally to identify CPU-intensive sections of your code.

---

## Memory

| Limit              | Value  |
| ------------------ | ------ |
| Memory per isolate | 128 MB |

Each [isolate](https://developers.cloudflare.com/workers/reference/how-workers-works/#isolates) can consume up to 128 MB of memory, including the JavaScript heap and [WebAssembly](https://developers.cloudflare.com/workers/runtime-apis/webassembly/) allocations. This limit is per-isolate, not per-invocation. A single isolate can handle many concurrent requests.

When an isolate exceeds 128 MB, the Workers runtime lets in-flight requests complete and creates a new isolate for subsequent requests. During extremely high load, the runtime may cancel some incoming requests to maintain stability.

#### Error: exceeded memory limit

When a Worker exceeds its memory limit, Cloudflare returns [Error 1102](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1102/#error-1102-worker-exceeded-resource-limits) to the client with the message `Worker exceeded resource limits`. In the dashboard, this appears as `Exceeded Memory` under **Metrics** \> **Errors** \> **Invocation Statuses**. In analytics and Logpush, the invocation outcome is `exceededMemory`.

You may also see the runtime error `Memory limit would be exceeded before EOF` when attempting to buffer a response body that exceeds the limit.

To resolve a memory limit error:

1. **Stream request and response bodies** — Use [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) or [node:stream](https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams/) instead of buffering entire payloads in memory.
2. **Avoid large in-memory objects** — Store large data in [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), or [D1](https://developers.cloudflare.com/d1/) instead of holding it in Worker memory.
3. **Profile memory usage** — Use [memory profiling with DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/) locally to identify leaks and high-memory allocations.

To view memory errors in the dashboard:

1. Go to **Workers & Pages**.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select the Worker you want to investigate.
3. Under **Metrics**, select **Errors** \> **Invocation Statuses** and examine **Exceeded Memory**.

---

## Duration

Duration measures wall-clock time from start to end of a Worker invocation.

| Trigger type                                                                                       | Duration limit |
| -------------------------------------------------------------------------------------------------- | -------------- |
| HTTP request                                                                                       | No limit       |
| [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/)             | 15 min         |
| [Durable Object Alarm](https://developers.cloudflare.com/durable-objects/api/alarms/)              | 15 min         |
| [Queue Consumer](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) | 15 min         |

There is no hard limit on duration for HTTP-triggered Workers. As long as the client remains connected, the Worker can continue processing, making subrequests, and streaming a response body. When the client disconnects or the response is complete, tasks associated with that request may be canceled. Use [ctx.waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) to perform work after returning a response. `waitUntil()` can extend execution for up to 30 seconds after the response is sent or the client disconnects.

Note

Cloudflare updates the Workers runtime a few times per week. The runtime gives in-flight requests a 30-second grace period to finish. If a request does not finish within this time, the runtime terminates it. This scenario is very unlikely because it requires a long-running request to coincide with a runtime update.

---

## Daily requests

Workers scale automatically across the Cloudflare global network. There is no general limit on requests per second.

Accounts on the Workers Free plan have a daily request limit of 100,000 requests, resetting at midnight UTC. When a Worker exceeds this limit, Cloudflare returns **Error 1027**.

| Route mode  | Behavior                                                                      |
| ----------- | ----------------------------------------------------------------------------- |
| Fail open   | Bypasses the Worker. Requests behave as if no Worker is configured.           |
| Fail closed | Returns a Cloudflare 1027 error page. Use this for security-critical Workers. |

You can configure the fail mode by toggling the corresponding [route](https://developers.cloudflare.com/workers/configuration/routing/routes/).

---

## Subrequests

A subrequest is any request a Worker makes using the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) or to Cloudflare services like [R2](https://developers.cloudflare.com/r2/), [KV](https://developers.cloudflare.com/kv/), or [D1](https://developers.cloudflare.com/d1/).

| Limit                            | Workers Free | Workers Paid                              |
| -------------------------------- | ------------ | ----------------------------------------- |
| Subrequests per invocation       | 50           | 10,000 (up to 10M)                        |
| Subrequests to internal services | 1,000        | Matches configured limit (default 10,000) |

Each subrequest in a redirect chain counts against this limit. The total number of subrequests may exceed the number of `fetch()` calls in your code. You can change the subrequest limit per Worker using the [limits configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#limits) in your Wrangler configuration file.

There is no set time limit on individual subrequests. As long as the client remains connected, the Worker can continue making subrequests. When the client disconnects or the response is complete, outstanding work may be canceled unless it is passed to [ctx.waitUntil()](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil), which can extend execution for up to 30 seconds.

### Worker-to-Worker subrequests

Use [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) to send requests from one Worker to another on your account without going over the Internet.

Using global [fetch()](https://developers.cloudflare.com/workers/runtime-apis/fetch/) to call another Worker on the same [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) without service bindings fails. Workers accept requests sent to a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#worker-to-worker-communication).

---

## Simultaneous open connections

Each Worker invocation can have up to six connections simultaneously waiting for response headers. The following API calls count toward this limit while the initial connection is being established and the server has not yet responded:

* `fetch()` method of the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/)
* `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV namespace objects](https://developers.cloudflare.com/kv/api/)
* `put()`, `match()`, and `delete()` methods of [Cache objects](https://developers.cloudflare.com/workers/runtime-apis/cache/)
* `list()`, `get()`, `put()`, `delete()`, and `head()` methods of [R2](https://developers.cloudflare.com/r2/)
* `send()` and `sendBatch()` methods of [Queues](https://developers.cloudflare.com/queues/)
* Opening a TCP socket using the [connect()](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) API

Outbound WebSocket connections also count toward this limit.

Once response headers arrive for a connection, it no longer counts toward the six-connection limit. This means a Worker can have many connections open simultaneously, as long as no more than six are in the initial "waiting for headers" phase at the same time. If a seventh connection is attempted while six are already waiting for headers, it is queued until one of the existing connections receives its response headers.

If you use `fetch()` but do not need the response body, calling `response.body.cancel()` is still good practice to free memory:

* [  JavaScript ](#tab-panel-11900)
* [  TypeScript ](#tab-panel-11901)

src/index.js

```

const response = await fetch(url);


// Only read the response body for successful responses

if (response.status <= 299) {

  // Call response.json(), response.text() or otherwise process the body

} else {

  // Explicitly cancel it

  response.body.cancel();

}


```

src/index.ts

```

const response = await fetch(url);


// Only read the response body for successful responses

if (response.status <= 299) {

  // Call response.json(), response.text() or otherwise process the body

} else {

  // Explicitly cancel it

  response.body.cancel();

}


```

Note

The runtime measures simultaneous open connections from the top-level request. Workers triggered via [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) share the same connection limit.

---

## Environment variables

| Limit                                 | Workers Free | Workers Paid |
| ------------------------------------- | ------------ | ------------ |
| Variables per Worker (secrets + text) | 64           | 128          |
| Variable size                         | 5 KB         | 5 KB         |
| Variables per account                 | No limit     | No limit     |

---

## Worker size

| Limit                    | Workers Free | Workers Paid |
| ------------------------ | ------------ | ------------ |
| After compression (gzip) | 3 MB         | 10 MB        |
| Before compression       | 64 MB        | 64 MB        |

Larger Worker bundles can impact startup time. To check your compressed bundle size:

Terminal window

```

wrangler deploy --outdir bundled/ --dry-run


```

```

# Output will resemble the below:

Total Upload: 259.61 KiB / gzip: 47.23 KiB


```

To reduce Worker size:

* Remove unnecessary dependencies and packages.
* Store configuration files, static assets, and binary data in [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), [D1](https://developers.cloudflare.com/d1/), or [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) instead of bundling them.
* Split functionality across multiple Workers using [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

---

## Worker startup time

| Limit        | Value    |
| ------------ | -------- |
| Startup time | 1 second |

A Worker must parse and execute its global scope (top-level code outside of handlers) within 1 second. Larger bundles and expensive initialization code in global scope increase startup time.

When the platform rejects a deployment because the Worker exceeds the startup time limit, the validation returns the error `Script startup exceeded CPU time limit` (error code `10021`). Wrangler automatically generates a CPU profile that you can import into Chrome DevTools or open in VS Code. Refer to [wrangler check startup](https://developers.cloudflare.com/workers/wrangler/commands/general/#startup) for more details.

To measure startup time, run `npx wrangler@latest deploy` or `npx wrangler@latest versions upload`. Wrangler reports `startup_time_ms` in the output.

To reduce startup time, avoid expensive work in global scope. Move initialization logic into your handler or to build time. For example, generating or consuming a large schema at the top level is a common cause of exceeding this limit.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

---

## Number of Workers

| Limit               | Workers Free | Workers Paid |
| ------------------- | ------------ | ------------ |
| Workers per account | 100          | 500          |

If you need more than 500 Workers, consider using [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/).

---

## Routes and domains

| Limit                                                                                                      | Value |
| ---------------------------------------------------------------------------------------------------------- | ----- |
| [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) per zone                 | 1,000 |
| Routes per zone ([wrangler dev --remote](#routes-remote-dev))                                              | 50    |
| [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) per zone | 100   |
| Routed zones per Worker                                                                                    | 1,000 |

### Routes with `wrangler dev --remote`

When you run a [remote development](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) session using the `--remote` flag, Cloudflare enforces a limit of 50 routes per zone. The Quick Editor in the Cloudflare dashboard also uses `wrangler dev --remote`, so the same limit applies.

If your zone has more than 50 routes, you cannot run a remote session until you remove routes to get under the limit.

If you require more than 1,000 routes or 1,000 routed zones per Worker, consider using [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/). If you require more than 100 custom domains per zone, consider using a wildcard [route](https://developers.cloudflare.com/workers/configuration/routing/routes/).

---

## Cache API limits

| Feature             | Workers Free | Workers Paid |
| ------------------- | ------------ | ------------ |
| Maximum object size | 512 MB       | 512 MB       |
| Calls per request   | 50           | 1,000        |

Calls per request is the number of `put()`, `match()`, or `delete()` Cache API calls per request. This shares the same quota as subrequests (`fetch()`).

Note

The size of chunked response bodies (`Transfer-Encoding: chunked`) is not known in advance. Calling `.put()` with such a response blocks subsequent `.put()` calls until the current one completes.

---

## Log size

| Limit                | Value  |
| -------------------- | ------ |
| Log data per request | 256 KB |

This limit covers all data emitted via `console.log()` statements, exceptions, request metadata, and headers for a single request. After exceeding this limit, the system does not record additional context for that request in logs, tail logs, or [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/).

Refer to the [Workers Trace Event Logpush documentation](https://developers.cloudflare.com/workers/observability/logs/logpush/#limits) for limits on fields sent to Logpush destinations.

---

## Image Resizing with Workers

Refer to the [Image Resizing documentation](https://developers.cloudflare.com/images/optimization/transformations/overview/) for limits that apply when using Image Resizing with Workers.

---

## Static Assets

| Limit                           | Workers Free | Workers Paid |
| ------------------------------- | ------------ | ------------ |
| Files per Worker version        | 20,000       | 100,000      |
| Individual file size            | 25 MiB       | 25 MiB       |
| \_headers rules                 | 100          | 100          |
| \_headers characters per line   | 2,000        | 2,000        |
| \_redirects static redirects    | 2,000        | 2,000        |
| \_redirects dynamic redirects   | 100          | 100          |
| \_redirects total               | 2,100        | 2,100        |
| \_redirects characters per rule | 1,000        | 1,000        |

Note

To use the increased file count limits in Wrangler, you must use version 4.34.0 or higher.

---

## Unbound and Bundled plan limits

Note

Unbound and Bundled plans have been deprecated and are no longer available for new accounts.

If your Worker is on an Unbound plan, limits match the Workers Paid plan.

If your Worker is on a Bundled plan, limits match the Workers Paid plan with these exceptions:

| Feature                  | Bundled plan limit |
| ------------------------ | ------------------ |
| Subrequests              | 50/request         |
| CPU time (HTTP requests) | 50 ms              |
| CPU time (Cron Triggers) | 50 ms              |
| Cache API calls/request  | 50                 |

Bundled plan Workers have no duration limits for [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/), [Durable Object Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/), or [Queue Consumers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer).

---

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

---

## Related resources

* [KV limits](https://developers.cloudflare.com/kv/platform/limits/)
* [Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/)
* [Queues limits](https://developers.cloudflare.com/queues/platform/limits/)
* [Workers errors reference](https://developers.cloudflare.com/workers/observability/errors/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/limits/#page","headline":"Limits · Cloudflare Workers docs","description":"Cloudflare Workers plan and platform limits.","url":"https://developers.cloudflare.com/workers/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/platform/limits/","name":"Limits"}}]}
```
