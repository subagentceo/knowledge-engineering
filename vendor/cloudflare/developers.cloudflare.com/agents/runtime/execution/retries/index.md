---
title: Retries
description: Retry failed operations with exponential backoff and jitter using the built-in retry system in the Agents SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Retries

Retry failed operations with exponential backoff and jitter. The Agents SDK provides built-in retry support for scheduled tasks, queued tasks, and a general-purpose `this.retry()` method for your own code.

## Overview

Transient failures are common when calling external APIs, interacting with other services, or running background tasks. The retry system handles these automatically:

* **Exponential backoff** — each retry waits longer than the last
* **Jitter** — randomized delays prevent thundering herd problems
* **Configurable** — tune attempts, delays, and caps per call site
* **Built-in** — schedule, queue, and workflow operations retry automatically

## Quick start

Use `this.retry()` to retry any async operation:

* [  JavaScript ](#tab-panel-6059)
* [  TypeScript ](#tab-panel-6060)

JavaScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async fetchWithRetry(url) {

    const response = await this.retry(async () => {

      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res.json();

    });


    return response;

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  async fetchWithRetry(url: string) {

    const response = await this.retry(async () => {

      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res.json();

    });


    return response;

  }

}


```

By default, `this.retry()` retries up to three times with jittered exponential backoff.

## `this.retry()`

The `retry()` method is available on every `Agent` instance. It retries the provided function on any thrown error by default.

TypeScript

```

async retry<T>(

  fn: (attempt: number) => Promise<T>,

  options?: RetryOptions & {

    shouldRetry?: (err: unknown, nextAttempt: number) => boolean;

  }

): Promise<T>


```

**Parameters:**

* `fn` — the async function to retry. Receives the current attempt number (1-indexed).
* `options` — optional retry configuration (refer to [RetryOptions](#retryoptions) below). Options are validated eagerly — invalid values throw immediately.
* `options.shouldRetry` — optional predicate called with the thrown error and the next attempt number. Return `false` to stop retrying immediately. If not provided, all errors are retried.

**Returns:** the result of `fn` on success.

**Throws:** the last error if all attempts fail or `shouldRetry` returns `false`.

### Examples

**Basic retry:**

* [  JavaScript ](#tab-panel-6055)
* [  TypeScript ](#tab-panel-6056)

JavaScript

```

const data = await this.retry(() => fetch("https://api.example.com/data"));


```

TypeScript

```

const data = await this.retry(() => fetch("https://api.example.com/data"));


```

**Custom retry options:**

* [  JavaScript ](#tab-panel-6061)
* [  TypeScript ](#tab-panel-6062)

JavaScript

```

const data = await this.retry(

  async () => {

    const res = await fetch("https://slow-api.example.com/data");

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res.json();

  },

  {

    maxAttempts: 5,

    baseDelayMs: 500,

    maxDelayMs: 10000,

  },

);


```

TypeScript

```

const data = await this.retry(

  async () => {

    const res = await fetch("https://slow-api.example.com/data");

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res.json();

  },

  {

    maxAttempts: 5,

    baseDelayMs: 500,

    maxDelayMs: 10000,

  },

);


```

**Using the attempt number:**

* [  JavaScript ](#tab-panel-6057)
* [  TypeScript ](#tab-panel-6058)

JavaScript

```

const result = await this.retry(async (attempt) => {

  console.log(`Attempt ${attempt}...`);

  return await this.callExternalService();

});


```

TypeScript

```

const result = await this.retry(async (attempt) => {

  console.log(`Attempt ${attempt}...`);

  return await this.callExternalService();

});


```

**Selective retry with `shouldRetry`:**

Use `shouldRetry` to stop retrying on specific errors. The predicate receives both the error and the next attempt number:

* [  JavaScript ](#tab-panel-6067)
* [  TypeScript ](#tab-panel-6068)

JavaScript

```

const data = await this.retry(

  async () => {

    const res = await fetch("https://api.example.com/data");

    if (!res.ok) throw new HttpError(res.status, await res.text());

    return res.json();

  },

  {

    maxAttempts: 5,

    shouldRetry: (err, nextAttempt) => {

      // Do not retry 4xx client errors — our request is wrong

      if (err instanceof HttpError && err.status >= 400 && err.status < 500) {

        return false;

      }

      return true; // retry everything else (5xx, network errors, etc.)

    },

  },

);


```

TypeScript

```

const data = await this.retry(

  async () => {

    const res = await fetch("https://api.example.com/data");

    if (!res.ok) throw new HttpError(res.status, await res.text());

    return res.json();

  },

  {

    maxAttempts: 5,

    shouldRetry: (err, nextAttempt) => {

      // Do not retry 4xx client errors — our request is wrong

      if (err instanceof HttpError && err.status >= 400 && err.status < 500) {

        return false;

      }

      return true; // retry everything else (5xx, network errors, etc.)

    },

  },

);


```

## Retries in schedules

Pass retry options when creating a schedule:

* [  JavaScript ](#tab-panel-6083)
* [  TypeScript ](#tab-panel-6084)

JavaScript

```

// Retry up to 5 times if the callback fails

await this.schedule(

  "processTask",

  60,

  { taskId: "123" },

  {

    retry: { maxAttempts: 5 },

  },

);


// Retry with custom backoff

await this.schedule(

  new Date("2026-03-01T09:00:00Z"),

  "sendReport",

  {},

  {

    retry: {

      maxAttempts: 3,

      baseDelayMs: 1000,

      maxDelayMs: 30000,

    },

  },

);


// Cron with retries

await this.schedule(

  "0 8 * * *",

  "dailyDigest",

  {},

  {

    retry: { maxAttempts: 3 },

  },

);


// Interval with retries

await this.scheduleEvery(

  30,

  "poll",

  { source: "api" },

  {

    retry: { maxAttempts: 5, baseDelayMs: 200 },

  },

);


```

TypeScript

```

// Retry up to 5 times if the callback fails

await this.schedule(

  "processTask",

  60,

  { taskId: "123" },

  {

    retry: { maxAttempts: 5 },

  },

);


// Retry with custom backoff

await this.schedule(

  new Date("2026-03-01T09:00:00Z"),

  "sendReport",

  {},

  {

    retry: {

      maxAttempts: 3,

      baseDelayMs: 1000,

      maxDelayMs: 30000,

    },

  },

);


// Cron with retries

await this.schedule(

  "0 8 * * *",

  "dailyDigest",

  {},

  {

    retry: { maxAttempts: 3 },

  },

);


// Interval with retries

await this.scheduleEvery(

  30,

  "poll",

  { source: "api" },

  {

    retry: { maxAttempts: 5, baseDelayMs: 200 },

  },

);


```

If the callback throws, it is retried according to the retry options. If all attempts fail, the error is logged and routed through `onError()`. The schedule is still removed (for one-time schedules) or rescheduled (for cron/interval) regardless of success or failure.

## Retries in queues

Pass retry options when adding a task to the queue:

* [  JavaScript ](#tab-panel-6071)
* [  TypeScript ](#tab-panel-6072)

JavaScript

```

await this.queue(

  "sendEmail",

  { to: "user@example.com" },

  {

    retry: { maxAttempts: 5 },

  },

);


await this.queue("processWebhook", webhookData, {

  retry: {

    maxAttempts: 3,

    baseDelayMs: 500,

    maxDelayMs: 5000,

  },

});


```

TypeScript

```

await this.queue(

  "sendEmail",

  { to: "user@example.com" },

  {

    retry: { maxAttempts: 5 },

  },

);


await this.queue("processWebhook", webhookData, {

  retry: {

    maxAttempts: 3,

    baseDelayMs: 500,

    maxDelayMs: 5000,

  },

});


```

If the callback throws, it is retried before the task is dequeued. After all attempts are exhausted, the task is dequeued and the error is logged.

## Validation

Retry options are validated eagerly when you call `this.retry()`, `queue()`, `schedule()`, or `scheduleEvery()`. Invalid options throw immediately instead of failing later at execution time:

* [  JavaScript ](#tab-panel-6077)
* [  TypeScript ](#tab-panel-6078)

JavaScript

```

// Throws immediately: "retry.maxAttempts must be >= 1"

await this.queue("sendEmail", data, {

  retry: { maxAttempts: 0 },

});


// Throws immediately: "retry.baseDelayMs must be > 0"

await this.schedule(

  60,

  "process",

  {},

  {

    retry: { baseDelayMs: -100 },

  },

);


// Throws immediately: "retry.maxAttempts must be an integer"

await this.retry(() => fetch(url), { maxAttempts: 2.5 });


// Throws immediately: "retry.baseDelayMs must be <= retry.maxDelayMs"

// because baseDelayMs: 5000 exceeds the default maxDelayMs: 3000

await this.queue("sendEmail", data, {

  retry: { baseDelayMs: 5000 },

});


```

TypeScript

```

// Throws immediately: "retry.maxAttempts must be >= 1"

await this.queue("sendEmail", data, {

  retry: { maxAttempts: 0 },

});


// Throws immediately: "retry.baseDelayMs must be > 0"

await this.schedule(

  60,

  "process",

  {},

  {

    retry: { baseDelayMs: -100 },

  },

);


// Throws immediately: "retry.maxAttempts must be an integer"

await this.retry(() => fetch(url), { maxAttempts: 2.5 });


// Throws immediately: "retry.baseDelayMs must be <= retry.maxDelayMs"

// because baseDelayMs: 5000 exceeds the default maxDelayMs: 3000

await this.queue("sendEmail", data, {

  retry: { baseDelayMs: 5000 },

});


```

Validation resolves partial options against class-level or built-in defaults before checking cross-field constraints. This means `{ baseDelayMs: 5000 }` is caught immediately when the resolved `maxDelayMs` is 3000, rather than failing later at execution time.

## Default behavior

Even without explicit retry options, scheduled and queued callbacks are retried with sensible defaults:

| Setting     | Default |
| ----------- | ------- |
| maxAttempts | 3       |
| baseDelayMs | 100     |
| maxDelayMs  | 3000    |

These defaults apply to `this.retry()`, `queue()`, `schedule()`, and `scheduleEvery()`. Per-call-site options override them.

### Class-level defaults

Override the defaults for your entire agent via `static options`:

* [  JavaScript ](#tab-panel-6063)
* [  TypeScript ](#tab-panel-6064)

JavaScript

```

class MyAgent extends Agent {

  static options = {

    retry: { maxAttempts: 5, baseDelayMs: 200, maxDelayMs: 5000 },

  };

}


```

TypeScript

```

class MyAgent extends Agent {

  static options = {

    retry: { maxAttempts: 5, baseDelayMs: 200, maxDelayMs: 5000 },

  };

}


```

You only need to specify the fields you want to change — unset fields fall back to the built-in defaults:

* [  JavaScript ](#tab-panel-6065)
* [  TypeScript ](#tab-panel-6066)

JavaScript

```

class MyAgent extends Agent {

  // Only override maxAttempts; baseDelayMs (100) and maxDelayMs (3000) stay default

  static options = {

    retry: { maxAttempts: 10 },

  };

}


```

TypeScript

```

class MyAgent extends Agent {

  // Only override maxAttempts; baseDelayMs (100) and maxDelayMs (3000) stay default

  static options = {

    retry: { maxAttempts: 10 },

  };

}


```

Class-level defaults are used as fallbacks when a call site does not specify retry options. Per-call-site options always take priority:

* [  JavaScript ](#tab-panel-6069)
* [  TypeScript ](#tab-panel-6070)

JavaScript

```

// Uses class-level defaults (10 attempts)

await this.retry(() => fetch(url));


// Overrides to 2 attempts for this specific call

await this.retry(() => fetch(url), { maxAttempts: 2 });


```

TypeScript

```

// Uses class-level defaults (10 attempts)

await this.retry(() => fetch(url));


// Overrides to 2 attempts for this specific call

await this.retry(() => fetch(url), { maxAttempts: 2 });


```

To disable retries for a specific task, set `maxAttempts: 1`:

* [  JavaScript ](#tab-panel-6075)
* [  TypeScript ](#tab-panel-6076)

JavaScript

```

await this.schedule(

  60,

  "oneShot",

  {},

  {

    retry: { maxAttempts: 1 },

  },

);


```

TypeScript

```

await this.schedule(

  60,

  "oneShot",

  {},

  {

    retry: { maxAttempts: 1 },

  },

);


```

## RetryOptions

TypeScript

```

interface RetryOptions {

  /** Maximum number of attempts (including the first). Must be an integer >= 1. Default: 3 */

  maxAttempts?: number;

  /** Base delay in milliseconds for exponential backoff. Must be > 0 and <= maxDelayMs. Default: 100 */

  baseDelayMs?: number;

  /** Maximum delay cap in milliseconds. Must be > 0. Default: 3000 */

  maxDelayMs?: number;

}


```

The delay between retries uses **full jitter exponential backoff**:

```

delay = random(0, min(2^attempt * baseDelayMs, maxDelayMs))


```

This means early retries are fast (often under 200ms), and later retries back off to avoid overwhelming a failing service. The randomization (jitter) prevents multiple agents from retrying at the exact same moment.

## How it works

### Backoff strategy

The retry system uses the "Full Jitter" strategy from the [AWS Architecture Blog ↗](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/). Given 3 attempts with default settings:

| Attempt | Upper Bound                   | Actual Delay     |
| ------- | ----------------------------- | ---------------- |
| 1       | min(2^1 \* 100, 3000) = 200ms | random(0, 200ms) |
| 2       | min(2^2 \* 100, 3000) = 400ms | random(0, 400ms) |
| 3       | (no retry — final attempt)    | —                |

With `maxAttempts: 5` and `baseDelayMs: 500`:

| Attempt | Upper Bound                   | Actual Delay      |
| ------- | ----------------------------- | ----------------- |
| 1       | min(2 \* 500, 3000) = 1000ms  | random(0, 1000ms) |
| 2       | min(4 \* 500, 3000) = 2000ms  | random(0, 2000ms) |
| 3       | min(8 \* 500, 3000) = 3000ms  | random(0, 3000ms) |
| 4       | min(16 \* 500, 3000) = 3000ms | random(0, 3000ms) |
| 5       | (no retry — final attempt)    | —                 |

### MCP server retries

When adding an MCP server, you can configure retry options for connection and reconnection attempts:

* [  JavaScript ](#tab-panel-6073)
* [  TypeScript ](#tab-panel-6074)

JavaScript

```

await this.addMcpServer("github", "https://mcp.github.com", {

  retry: { maxAttempts: 5, baseDelayMs: 1000, maxDelayMs: 10000 },

});


```

TypeScript

```

await this.addMcpServer("github", "https://mcp.github.com", {

  retry: { maxAttempts: 5, baseDelayMs: 1000, maxDelayMs: 10000 },

});


```

These options are persisted and used when:

* Restoring server connections after hibernation
* Establishing connections after OAuth completion

Default: 3 attempts, 500ms base delay, 5s max delay.

## Patterns

### Retry with logging

* [  JavaScript ](#tab-panel-6081)
* [  TypeScript ](#tab-panel-6082)

JavaScript

```

class MyAgent extends Agent {

  async resilientTask(payload) {

    try {

      const result = await this.retry(

        async (attempt) => {

          if (attempt > 1) {

            console.log(`Retrying ${payload.url} (attempt ${attempt})...`);

          }

          const res = await fetch(payload.url);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          return res.json();

        },

        { maxAttempts: 5 },

      );

      console.log("Success:", result);

    } catch (e) {

      console.error("All retries failed:", e);

    }

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async resilientTask(payload: { url: string }) {

    try {

      const result = await this.retry(

        async (attempt) => {

          if (attempt > 1) {

            console.log(`Retrying ${payload.url} (attempt ${attempt})...`);

          }

          const res = await fetch(payload.url);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          return res.json();

        },

        { maxAttempts: 5 },

      );

      console.log("Success:", result);

    } catch (e) {

      console.error("All retries failed:", e);

    }

  }

}


```

### Retry with fallback

* [  JavaScript ](#tab-panel-6079)
* [  TypeScript ](#tab-panel-6080)

JavaScript

```

class MyAgent extends Agent {

  async fetchData() {

    try {

      return await this.retry(

        () => fetch("https://primary-api.example.com/data"),

        { maxAttempts: 3, baseDelayMs: 200 },

      );

    } catch {

      // Primary failed, try fallback

      return await this.retry(

        () => fetch("https://fallback-api.example.com/data"),

        { maxAttempts: 2 },

      );

    }

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async fetchData() {

    try {

      return await this.retry(

        () => fetch("https://primary-api.example.com/data"),

        { maxAttempts: 3, baseDelayMs: 200 },

      );

    } catch {

      // Primary failed, try fallback

      return await this.retry(

        () => fetch("https://fallback-api.example.com/data"),

        { maxAttempts: 2 },

      );

    }

  }

}


```

### Combining retries with scheduling

For operations that might take a long time to recover (minutes or hours), combine `this.retry()` for immediate retries with `this.schedule()` for delayed retries:

* [  JavaScript ](#tab-panel-6085)
* [  TypeScript ](#tab-panel-6086)

JavaScript

```

class MyAgent extends Agent {

  async syncData(payload) {

    const attempt = payload.attempt ?? 1;


    try {

      // Immediate retries for transient failures (seconds)

      await this.retry(() => this.fetchAndProcess(payload.source), {

        maxAttempts: 3,

        baseDelayMs: 1000,

      });

    } catch (e) {

      if (attempt >= 5) {

        console.error("Giving up after 5 scheduled attempts");

        return;

      }


      // Schedule a retry in 5 minutes for longer outages

      const delaySeconds = 300 * attempt;

      await this.schedule(delaySeconds, "syncData", {

        source: payload.source,

        attempt: attempt + 1,

      });

      console.log(`Scheduled retry ${attempt + 1} in ${delaySeconds}s`);

    }

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async syncData(payload: { source: string; attempt?: number }) {

    const attempt = payload.attempt ?? 1;


    try {

      // Immediate retries for transient failures (seconds)

      await this.retry(() => this.fetchAndProcess(payload.source), {

        maxAttempts: 3,

        baseDelayMs: 1000,

      });

    } catch (e) {

      if (attempt >= 5) {

        console.error("Giving up after 5 scheduled attempts");

        return;

      }


      // Schedule a retry in 5 minutes for longer outages

      const delaySeconds = 300 * attempt;

      await this.schedule(delaySeconds, "syncData", {

        source: payload.source,

        attempt: attempt + 1,

      });

      console.log(`Scheduled retry ${attempt + 1} in ${delaySeconds}s`);

    }

  }

}


```

## Limitations

* **No dead-letter queue.** If a queued or scheduled task fails all retry attempts, it is removed. Implement your own persistence if you need to track failed tasks.
* **Retry delays block the agent.** During the backoff delay, the Durable Object is awake but idle. For short delays (under 3 seconds) this is fine. For longer recovery times, use `this.schedule()` instead.
* **Queue retries are head-of-line blocking.** Queue items are processed sequentially. If one item is being retried with long delays, it blocks all subsequent items. If you need independent retry behavior, use `this.retry()` inside the callback rather than per-task retry options on `queue()`.
* **No circuit breaker.** The retry system does not track failure rates across calls. If a service is persistently down, each task will exhaust its retry budget independently.
* **`shouldRetry` is only available on `this.retry()`.** The `shouldRetry` predicate cannot be used with `schedule()` or `queue()` because functions cannot be serialized to the database. For scheduled/queued tasks, handle non-retryable errors inside the callback itself.

## Next steps

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Schedule tasks for future execution. 

[ Queue tasks ](https://developers.cloudflare.com/agents/runtime/execution/queue-tasks/) Background task queue for immediate processing. 

[ Run Workflows ](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/) Durable multi-step processing with automatic retries. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/retries/#page","headline":"Retries · Cloudflare Agents docs","description":"Retry failed operations with exponential backoff and jitter using the built-in retry system in the Agents SDK.","url":"https://developers.cloudflare.com/agents/runtime/execution/retries/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/retries/","name":"Retries"}}]}
```
