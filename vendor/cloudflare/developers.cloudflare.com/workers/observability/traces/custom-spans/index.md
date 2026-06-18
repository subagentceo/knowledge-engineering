---
title: Custom spans
description: Create custom spans to trace your own application logic alongside Cloudflare's automatic instrumentation.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom spans

Cloudflare Workers [automatically instruments](https://developers.cloudflare.com/workers/observability/traces/spans-and-attributes/) platform operations like fetch calls, KV reads, and D1 queries. Custom spans let you extend this visibility into your own application logic, so you can trace custom code paths alongside the built-in instrumentation.

The custom spans API is available in two ways — both provide the same `enterSpan()` method and behave identically:

* **`import { tracing } from "cloudflare:workers"`** — works anywhere in your codebase, including utility functions, libraries, and modules that do not have access to the handler context.
* **`ctx.tracing`** — available on the [ExecutionContext](https://developers.cloudflare.com/workers/runtime-apis/context/) passed to your handler, convenient when you are already working within a handler.

## Enable tracing

Custom spans require tracing to be enabled on your Worker. If you have not already done so, set `observability.traces.enabled` to `true` in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#observability):

* [  wrangler.jsonc ](#tab-panel-11876)
* [  wrangler.toml ](#tab-panel-11877)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "observability": {

    "traces": {

      "enabled": true

    }

  }

}


```

TOML

```

[observability.traces]

enabled = true


```

Note

In the future, Cloudflare plans to enable automatic tracing in addition to logs when you set `observability.enabled = true` in your Wrangler configuration.

While automatic tracing is in early beta, this setting will not enable tracing by default, and will only enable logs.

An updated [compatibility\_date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) will be required for this change to take effect.

## Create a custom span

Use `tracing.enterSpan()` to wrap a section of code in a named span. The span automatically becomes a child of whichever span is currently active, and ends when the callback returns or its returned promise settles.

The following example uses both access methods — the `cloudflare:workers` import and `ctx.tracing` — to show that they are interchangeable:

* [  JavaScript ](#tab-panel-11878)
* [  TypeScript ](#tab-panel-11879)

src/index.js

```

import { tracing } from "cloudflare:workers";


export default {

  async fetch(request, env, ctx) {

    // Using the import

    return tracing.enterSpan("handleRequest", async (span) => {

      span.setAttribute("url.path", new URL(request.url).pathname);


      const user = await ctx.tracing.enterSpan("auth", async () => {

        // Using ctx.tracing

        return authenticate(request, env);

      });


      return buildResponse(user);

    });

  },

};


```

src/index.ts

```

import { tracing } from "cloudflare:workers";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // Using the import

    return tracing.enterSpan("handleRequest", async (span) => {

      span.setAttribute("url.path", new URL(request.url).pathname);


      const user = await ctx.tracing.enterSpan("auth", async () => {

        // Using ctx.tracing

        return authenticate(request, env);

      });


      return buildResponse(user);

    });

  },

};


```

## API reference

### `tracing.enterSpan(name, callback, ...args)`

Creates a new span and runs `callback` inside it. The span is automatically ended when the callback returns (synchronous or asynchronous) or throws.

**Parameters:**

| Parameter | Type                          | Description                                                                                                                                        |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | string                        | The name of the span. This appears in trace visualizations.                                                                                        |
| callback  | (span: Span, ...args: A) => T | The function to execute within the span. Receives the Span object as its first argument, followed by any additional arguments passed to enterSpan. |
| ...args   | A                             | Optional additional arguments forwarded to the callback after the span parameter.                                                                  |

**Returns:** The return value of `callback`.

**Behavior:**

* The new span is a child of whichever span is currently active on the async context. If no span is active, it becomes a child of the request's root span.
* Nested `enterSpan` calls and runtime-created spans (such as `fetch` or KV operations) that run inside the callback automatically become children of this span.
* The span ends when the callback returns synchronously, throws synchronously, or when its returned promise fulfills or rejects.

TypeScript

```

// Synchronous callback — span ends when the function returns

const result = tracing.enterSpan("parse", (span) => {

  span.setAttribute("format", "json");

  return JSON.parse(body);

});


// Async callback — span ends when the promise settles

const data = await tracing.enterSpan("fetchData", async (span) => {

  const res = await fetch("https://api.example.com/data");

  span.setAttribute("http.response.status_code", res.status);

  return res.json();

});


// Forwarding arguments

const doubled = tracing.enterSpan("compute", (span, x) => x * 2, 21);


```

### `Span`

The `Span` object is passed into the `enterSpan` callback. It provides methods to annotate the span with metadata.

#### `span.setAttribute(key, value)`

Sets an attribute on the span.

| Parameter | Type             | Description         |           |                                                    |
| --------- | ---------------- | ------------------- | --------- | -------------------------------------------------- |
| key       | string           | The attribute name. |           |                                                    |
| value     | string \| number | boolean             | undefined | The attribute value. Passing undefined is a no-op. |

Attributes appear alongside the span in your traces and OpenTelemetry exports.

TypeScript

```

span.setAttribute("user.plan", "enterprise");

span.setAttribute("item.count", 42);

span.setAttribute("cache.hit", true);


```

#### `span.isTraced`

A `readonly boolean` indicating whether this invocation is being traced. When the request is not sampled (based on your [head\_sampling\_rate](https://developers.cloudflare.com/workers/observability/traces/#sampling)), `isTraced` is `false` and `enterSpan` still runs the callback but does not record any telemetry.

You can use this to skip expensive attribute computation when the request is not being traced:

TypeScript

```

tracing.enterSpan("process", (span) => {

  if (span.isTraced) {

    span.setAttribute("request.body.preview", JSON.stringify(body).slice(0, 200));

  }

  return processBody(body);

});


```

## Nested spans

Spans nest automatically based on the JavaScript async context. Any `enterSpan` call or platform operation (like `fetch`, `env.MY_KV.get()`, and so on) that runs inside a callback becomes a child of the enclosing span.

* [  JavaScript ](#tab-panel-11880)
* [  TypeScript ](#tab-panel-11881)

src/index.js

```

import { tracing } from "cloudflare:workers";


async function handleOrder(env, orderId) {

  return tracing.enterSpan("handleOrder", async (span) => {

    span.setAttribute("order.id", orderId);


    // This KV read is automatically a child of "handleOrder"

    const order = await env.ORDERS_KV.get(orderId, "json");


    // This nested span is also a child of "handleOrder"

    const total = tracing.enterSpan("calculateTotal", (innerSpan) => {

      innerSpan.setAttribute("item.count", order.items.length);

      return order.items.reduce((sum, item) => sum + item.price, 0);

    });


    // This fetch is a child of "handleOrder"

    await fetch("https://api.example.com/notify", {

      method: "POST",

      body: JSON.stringify({ orderId, total }),

    });


    return new Response(JSON.stringify({ orderId, total }));

  });

}


```

src/index.ts

```

import { tracing } from "cloudflare:workers";


async function handleOrder(env: Env, orderId: string) {

  return tracing.enterSpan("handleOrder", async (span) => {

    span.setAttribute("order.id", orderId);


    // This KV read is automatically a child of "handleOrder"

    const order = await env.ORDERS_KV.get(orderId, "json");


    // This nested span is also a child of "handleOrder"

    const total = tracing.enterSpan("calculateTotal", (innerSpan) => {

      innerSpan.setAttribute("item.count", order.items.length);

      return order.items.reduce((sum: number, item: any) => sum + item.price, 0);

    });


    // This fetch is a child of "handleOrder"

    await fetch("https://api.example.com/notify", {

      method: "POST",

      body: JSON.stringify({ orderId, total }),

    });


    return new Response(JSON.stringify({ orderId, total }));

  });

}


```

![Trace waterfall showing custom spans nested alongside automatic KV and fetch instrumentation](https://developers.cloudflare.com/_astro/wobs_custom_spans_screenshot.B-hsHjyv_ZGVlIY.webp) 

## Logging within spans

`console.log()` and other console methods emit log events that are automatically attributed to the currently active span. This means log output from inside an `enterSpan` callback is associated with that span in your traces and OpenTelemetry exports.

TypeScript

```

tracing.enterSpan("processPayment", async (span) => {

  console.log("Starting payment processing"); // attributed to "processPayment"

  const result = await chargeCard(token, amount);

  console.log("Payment complete", result.id); // also attributed to "processPayment"

});


```

## TypeScript types

The full type declarations for the custom spans API:

TypeScript

```

declare module "cloudflare:workers" {

  namespace tracing {

    function enterSpan<T, A extends unknown[]>(

      name: string,

      callback: (span: Span, ...args: A) => T,

      ...args: A

    ): T;

  }


  class Span {

    readonly isTraced: boolean;

    setAttribute(

      key: string,

      value: string | number | boolean | undefined,

    ): void;

  }

}


```

The same API is available on the handler context as `ctx.tracing`, with the same types.

## Limitations

* **No manual span lifetime management.** Spans are always scoped to the `enterSpan` callback. You cannot start a span and end it later.
* **No manual parent-child wiring.** Parent-child relationships are determined by the JavaScript async context automatically.
* **No `setAttributes` (bulk set) yet.** Use individual `setAttribute` calls. Bulk setting is planned for a future release.
* **No `spanContext()` (trace/span IDs) yet.** Access to trace and span identifiers for manual propagation across boundaries is planned for a future release.
* **No `setOutcome` yet.** Setting span outcome status is planned for a future release.

For other tracing limitations, refer to the [known limitations](https://developers.cloudflare.com/workers/observability/traces/known-limitations/) page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/traces/custom-spans/#page","headline":"Custom spans · Cloudflare Workers docs","description":"Create custom spans to trace your own application logic alongside Cloudflare's automatic instrumentation.","url":"https://developers.cloudflare.com/workers/observability/traces/custom-spans/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/traces/","name":"Traces"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/traces/custom-spans/","name":"Custom spans"}}]}
```
