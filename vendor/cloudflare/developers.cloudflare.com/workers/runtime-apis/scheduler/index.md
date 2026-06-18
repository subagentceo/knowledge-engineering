---
title: Scheduler
description: Use the scheduler.wait() API to delay execution in Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scheduler

## Background

The `scheduler` global provides task scheduling APIs based on the [WICG Scheduling APIs proposal ↗](https://github.com/WICG/scheduling-apis). Workers currently implement the `scheduler.wait()` method.

`scheduler.wait()` returns a Promise that resolves after a given number of milliseconds. It is an `await`\-able alternative to `setTimeout()` that does not require a callback.

Like other [timers in Workers](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#timers), `scheduler.wait()` does not advance during CPU execution when deployed to Cloudflare. This is a [security measure to mitigate against Spectre attacks](https://developers.cloudflare.com/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading). In local development, timers advance regardless of whether I/O occurs.

## Syntax

JavaScript

```

await scheduler.wait(delay);

await scheduler.wait(delay, options);


```

## Parameters

* `delay` number  
   * The number of milliseconds to wait before the returned Promise resolves.
* `options` object optional  
   * Optional configuration for the wait operation.  
   * `signal` AbortSignal optional  
         * An [AbortSignal](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#abortcontroller-and-abortsignal) that cancels the wait. When the signal is aborted, the returned Promise rejects with an `AbortError`.

## Return value

A `Promise<void>` that resolves after `delay` milliseconds. If an `AbortSignal` is provided and aborted before the delay elapses, the Promise rejects with an `AbortError`.

## Examples

### Basic delay

Use `scheduler.wait()` to pause execution for a specified duration.

* [  JavaScript ](#tab-panel-12059)
* [  TypeScript ](#tab-panel-12060)

JavaScript

```

export default {

  async fetch(request) {

    // Wait for 1 second

    await scheduler.wait(1000);

    return new Response("Delayed response");

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    // Wait for 1 second

    await scheduler.wait(1000);

    return new Response("Delayed response");

  },

} satisfies ExportedHandler;


```

### Retry with exponential backoff

Use `scheduler.wait()` to implement a delay between retry attempts. This example uses exponential backoff with jitter.

* [  JavaScript ](#tab-panel-12063)
* [  TypeScript ](#tab-panel-12064)

JavaScript

```

async function fetchWithRetry(url, maxAttempts = 3) {

  const baseBackoffMs = 100;

  const maxBackoffMs = 10000;


  for (let attempt = 0; attempt < maxAttempts; attempt++) {

    try {

      return await fetch(url);

    } catch (err) {

      if (attempt + 1 >= maxAttempts) {

        throw err;

      }

      const backoffMs = Math.min(

        maxBackoffMs,

        baseBackoffMs * Math.random() * Math.pow(2, attempt),

      );

      await scheduler.wait(backoffMs);

    }

  }

  throw new Error("unreachable");

}


export default {

  async fetch(request) {

    const response = await fetchWithRetry("https://example.com/api");

    return new Response(response.body, response);

  },

};


```

TypeScript

```

async function fetchWithRetry(url: string, maxAttempts = 3): Promise<Response> {

  const baseBackoffMs = 100;

  const maxBackoffMs = 10000;


  for (let attempt = 0; attempt < maxAttempts; attempt++) {

    try {

      return await fetch(url);

    } catch (err) {

      if (attempt + 1 >= maxAttempts) {

        throw err;

      }

      const backoffMs = Math.min(

        maxBackoffMs,

        baseBackoffMs * Math.random() * Math.pow(2, attempt),

      );

      await scheduler.wait(backoffMs);

    }

  }

  throw new Error("unreachable");

}


export default {

  async fetch(request): Promise<Response> {

    const response = await fetchWithRetry("https://example.com/api");

    return new Response(response.body, response);

  },

} satisfies ExportedHandler;


```

### Cancel with AbortSignal

Use an [AbortController](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#abortcontroller-and-abortsignal) to cancel a pending wait.

* [  JavaScript ](#tab-panel-12061)
* [  TypeScript ](#tab-panel-12062)

JavaScript

```

export default {

  async fetch(request) {

    const controller = new AbortController();


    // Cancel the wait after 500ms

    setTimeout(() => controller.abort(), 500);


    try {

      await scheduler.wait(5000, { signal: controller.signal });

      return new Response("Wait completed");

    } catch (err) {

      if (err instanceof DOMException && err.name === "AbortError") {

        return new Response("Wait was cancelled", { status: 408 });

      }

      throw err;

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const controller = new AbortController();


    // Cancel the wait after 500ms

    setTimeout(() => controller.abort(), 500);


    try {

      await scheduler.wait(5000, { signal: controller.signal });

      return new Response("Wait completed");

    } catch (err) {

      if (err instanceof DOMException && err.name === "AbortError") {

        return new Response("Wait was cancelled", { status: 408 });

      }

      throw err;

    }

  },

} satisfies ExportedHandler;


```

## Related resources

* [Timers](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#timers) — `setTimeout()` and `setInterval()` APIs
* [Performance and timers](https://developers.cloudflare.com/workers/runtime-apis/performance/) — `performance.now()` and timer security behavior
* [AbortController and AbortSignal](https://developers.cloudflare.com/workers/runtime-apis/web-standards/#abortcontroller-and-abortsignal) — cancel asynchronous operations
* [WICG Scheduling APIs proposal ↗](https://github.com/WICG/scheduling-apis) — the specification this API is based on

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/scheduler/#page","headline":"Scheduler · Cloudflare Workers docs","description":"Use the scheduler.wait() API to delay execution in Workers.","url":"https://developers.cloudflare.com/workers/runtime-apis/scheduler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/scheduler/","name":"Scheduler"}}]}
```
