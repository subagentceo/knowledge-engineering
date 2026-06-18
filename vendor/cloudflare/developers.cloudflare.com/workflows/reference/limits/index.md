---
title: Limits
description: Limits for Cloudflare Workflows, including maximum steps, payload sizes, and instance concurrency.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Limits that apply to authoring, deploying, and running Workflows are detailed below.

Many limits are inherited from those applied to Workers scripts and as documented in the [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) documentation.

Note

Workflows cannot be deployed to Workers for Platforms namespaces, as Workflows do not support Workers for Platforms.

| Feature                                                                                                                        | Workers Free                                                                                                                      | Workers Paid                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Workflow class definitions per script                                                                                          | 3MB max script size per [Worker size limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits)      | 10MB max script size per [Worker size limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits)              |
| Total scripts per account                                                                                                      | 100                                                                                                                               | 500 (shared with [Worker script limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits)                    |
| Compute time per step [1](#user-content-fn-3)                                                                                  | 10 ms                                                                                                                             | 30 seconds (default) / configurable to 5 minutes of [active CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) |
| Duration (wall clock) per step [1](#user-content-fn-3)                                                                         | Unlimited                                                                                                                         | Unlimited - for example, waiting on network I/O calls or querying a database                                                               |
| Maximum non-stream step result per step [2](#user-content-fn-9)                                                                | 1MiB (2^20 bytes)                                                                                                                 | 1MiB (2^20 bytes)                                                                                                                          |
| Maximum event [payload size](https://developers.cloudflare.com/workflows/build/events-and-parameters/)                         | 1MiB (2^20 bytes)                                                                                                                 | 1MiB (2^20 bytes)                                                                                                                          |
| Maximum state that can be persisted per Workflow instance [3](#user-content-fn-10)                                             | 100MB                                                                                                                             | 1GB                                                                                                                                        |
| Maximum step.sleep duration                                                                                                    | 365 days (1 year)                                                                                                                 | 365 days (1 year)                                                                                                                          |
| Maximum steps per Workflow [4](#user-content-fn-5)                                                                             | 1,024                                                                                                                             | 10,000 (default) / configurable up to 25,000                                                                                               |
| Maximum Workflow executions                                                                                                    | 100,000 per day [shared with Workers daily limit](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) | Unlimited                                                                                                                                  |
| Concurrent Workflow instances (executions) per account [5](#user-content-fn-7)                                                 | 100                                                                                                                               | 50,000                                                                                                                                     |
| Maximum Workflow instance creation rate [6](#user-content-fn-8)                                                                | 100 per second [7](#user-content-fn-6)                                                                                            | 300 per second per account [7](#user-content-fn-6), 100 per second per workflow                                                            |
| Maximum number of [queued instances](https://developers.cloudflare.com/workflows/observability/metrics-analytics/#event-types) | 100,000                                                                                                                           | 2,000,000                                                                                                                                  |
| Retention limit for completed Workflow instance state                                                                          | 3 days                                                                                                                            | 30 days [8](#user-content-fn-2)                                                                                                            |
| Maximum length of a Workflow name [9](#user-content-fn-4)                                                                      | 64 characters                                                                                                                     | 64 characters                                                                                                                              |
| Maximum length of a Workflow instance ID [9](#user-content-fn-4)                                                               | 100 characters                                                                                                                    | 100 characters                                                                                                                             |
| Maximum number of subrequests per Workflow instance                                                                            | 50/request                                                                                                                        | 10,000/request (default) / configurable up to 10 million                                                                                   |
| Maximum number of retries per step                                                                                             | 10,000                                                                                                                            | 10,000                                                                                                                                     |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

In JavaScript Workflows, if you need to persist large binary output from a step, return a `ReadableStream<Uint8Array>`. Streamed outputs still count toward the per-instance storage limit, so store very large or long-lived artifacts in external storage such as [R2](https://developers.cloudflare.com/r2/) and return a reference when appropriate.

### `waiting` instances do not count towards instance concurrency limits

Instances that are in a `waiting` state — either sleeping via `step.sleep`, waiting for a retry, or waiting for an event via `step.waitForEvent` — do **not** count towards concurrency limits. This means you can have millions of Workflow instances sleeping or waiting for events simultaneously, as only actively `running` instances count toward the 10,000 concurrent instance limit. However, if there are 10,000 concurrent instances actively running, an instance that has been in a `waiting` state will be queued instead of resuming immediately. When an instance transitions from `running` to `waiting`, other `queued` instances will be scheduled (usually the oldest queued instance, on a best-effort basis). This state transition may not occur if the wait duration is very short.

For example, consider a Workflow that does some work, waits for 30 days, and then continues with more work:

src/index.ts

```

import {

  WorkflowEntrypoint,

  WorkflowStep,

  WorkflowEvent,

} from "cloudflare:workers";


type Env = {

  MY_WORKFLOW: Workflow;

};


export class MyWorkflow extends WorkflowEntrypoint<Env> {

  async run(event: WorkflowEvent<unknown>, step: WorkflowStep) {

    await step.do("initial work", async () => {

      let resp = await fetch("https://api.cloudflare.com/client/v4/ips");

      return await resp.json<any>();

    });


    await step.sleep("wait 30 days", "30 days");


    await step.do(

      "make a call to write that could maybe, just might, fail",

      {

        retries: {

          limit: 5,

          delay: "5 seconds",

          backoff: "exponential",

        },

        timeout: "15 minutes",

      },

      async () => {

        if (Math.random() > 0.5) {

          throw new Error("API call to $STORAGE_SYSTEM failed");

        }

      },

    );

  }

}


```

While a given Workflow instance is waiting for 30 days, it will transition to the `waiting` state, allowing other `queued` instances to run if concurrency limits are reached.

### Cron-triggered instances on Workers Paid

On [Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/#workers), Workflow instances created by `schedules` can run for up to one hour per cron firing without consuming a Workflow concurrency slot.

After that budget is used, the instance yields and enters the normal concurrency queue. It resumes when a concurrency slot is available. The instance does not fail, time out, or terminate because it used this cron concurrency budget.

The following limits apply to Workflow `schedules`:

| Limit                                                      | Value          |
| ---------------------------------------------------------- | -------------- |
| Maximum number of schedules (cron expressions) per account | 100            |
| Maximum length of a cron expression                        | 256 characters |

### Increasing Workflow step limits

Each Workflow instance supports 10,000 steps by default, but this can be increased up to 25,000 steps in your Wrangler configuration. Refer to [Workflow step limits](https://developers.cloudflare.com/workflows/build/workers-api/#workflow-step-limits) for more information.

### Increasing Workflow CPU limits

Workflows are Worker scripts, and share the same [per invocation CPU limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) as any Workers do. Note that CPU time is active processing time: not time spent waiting on network requests, storage calls, or other general I/O, which don't count towards your CPU time or Workflows compute consumption.

If your Workflow exceeds its CPU time limit, it will throw the following error:

```

Error: Worker exceeded CPU time limit.


```

This will appear as `exceededCpu` in [wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail) outcomes and as `exceededResources` in [Workers metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/#invocation-statuses).

By default, the maximum CPU time per Workflow invocation is set to 30 seconds, but can be increased for all invocations associated with a Workflow definition by setting `limits.cpu_ms` in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-13077)
* [  wrangler.toml ](#tab-panel-13078)

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

To learn more about CPU time and limits, [review the Workers documentation](https://developers.cloudflare.com/workers/platform/limits/#cpu-time).

### Increasing Workflow subrequest limits

A subrequest is any request that a Workflow makes to either Internet resources using the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) or requests to other Cloudflare services like [R2](https://developers.cloudflare.com/r2/), [KV](https://developers.cloudflare.com/kv/), or [D1](https://developers.cloudflare.com/d1/). Because Workflows are long-running and often make many calls to external services or Cloudflare APIs, they can exceed the default subrequest limit.

If your Workflow exceeds its subrequest limit, it will throw the following error:

```

Error: Too many subrequests.


```

This will appear as `exceededResources` in [Workers metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/#invocation-statuses) and as `exception` in [wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail) outcomes.

By default, the maximum number of subrequests per Workflow instance is 10,000 on Workers Paid plans, but this can be increased up to 10 million by setting `limits.subrequests` in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-13079)
* [  wrangler.toml ](#tab-panel-13080)

JSONC

```

{

  // ...rest of your configuration...

  "limits": {

    "subrequests": 10000000, // 10 million (maximum)

  },

  // ...rest of your configuration...

}


```

TOML

```

[limits]

subrequests = 10_000_000


```

Workers on the free plan remain limited to 50 external subrequests and 1,000 subrequests to Cloudflare services per invocation.

To learn more about subrequest limits, [review the Workers documentation](https://developers.cloudflare.com/workers/platform/limits/#subrequests).

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

1. A Workflow instance can run forever, as long as each step does not take more than the CPU time limit and the maximum number of steps per Workflow is not reached. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)
2. Applies to non-stream `step.do()` return values. In JavaScript Workflows, `ReadableStream<Uint8Array>` is also a supported serializable return type for larger binary output. [↩](#user-content-fnref-9)
3. This total includes persisted bytes from streamed step outputs returned from JavaScript `step.do()` calls. [↩](#user-content-fnref-10)
4. `step.sleep` does not count towards the maximum steps limit [↩](#user-content-fnref-5)
5. Only instances with a `running` state count towards the concurrency limits. Instances in the `waiting` state are excluded from these limits. Workers Paid cron-triggered Workflow instances have a separate one-hour cron concurrency budget per firing. [↩](#user-content-fnref-7)
6. Each instance created or restarted counts towards this limit [↩](#user-content-fnref-8)
7. Workflows will return a HTTP 429 rate limited error if you exceed the rate of new Workflow instance creation. [↩](#user-content-fnref-6) [↩2](#user-content-fnref-6-2)
8. Workflow instance state and logs will be retained for 3 days on the Workers Free plan and for 30 days on the Workers Paid plan. [↩](#user-content-fnref-2)
9. Match pattern: \_`^[a-zA-Z0-9_][a-zA-Z0-9-_]\*$`\_ [↩](#user-content-fnref-4) [↩2](#user-content-fnref-4-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/reference/limits/#page","headline":"Limits · Cloudflare Workflows docs","description":"Limits for Cloudflare Workflows, including maximum steps, payload sizes, and instance concurrency.","url":"https://developers.cloudflare.com/workflows/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/reference/limits/","name":"Limits"}}]}
```
