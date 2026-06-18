---
title: Connect to Workers bindings
description: Access KV, R2, Durable Objects, and other bindings from a sandbox.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to Workers bindings

Sandboxes can access [Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) — KV, R2, D1, Durable Objects, and others — through [outbound handlers](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/#define-outbound-handlers). An outbound handler intercepts HTTP requests from the sandbox and runs inside the Workers runtime, where all of your configured bindings are available.

The sandbox makes a plain HTTP request to a virtual hostname (for example, `http://my.kv/some-key`), and the outbound handler resolves it using the bound resource. No SDK or client library is required inside the sandbox.

## Use bindings in outbound handlers

Define an `outboundByHost` handler for each virtual hostname. The `env` argument gives you access to every binding declared in your Wrangler configuration.

* [  JavaScript ](#tab-panel-10517)
* [  TypeScript ](#tab-panel-10518)

JavaScript

```

export class MySandbox extends Sandbox {}


MySandbox.outboundByHost = {

  "my.kv": async (request, env, ctx) => {

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    const value = await env.KV.get(key);

    return new Response(value ?? "", { status: value ? 200 : 404 });

  },

  "my.r2": async (request, env, ctx) => {

    const url = new URL(request.url);

    // Scope access to this sandbox's ID

    const path = `${ctx.containerId}${url.pathname}`;

    const object = await env.R2.get(path);

    return new Response(object?.body ?? null, { status: object ? 200 : 404 });

  },

};


```

TypeScript

```

export class MySandbox extends Sandbox {}


MySandbox.outboundByHost = {

  "my.kv": async (request: Request, env: Env, ctx: OutboundHandlerContext) => {

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    const value = await env.KV.get(key);

    return new Response(value ?? "", { status: value ? 200 : 404 });

  },

  "my.r2": async (request: Request, env: Env, ctx: OutboundHandlerContext) => {

    const url = new URL(request.url);

    // Scope access to this sandbox's ID

    const path = `${ctx.containerId}${url.pathname}`;

    const object = await env.R2.get(path);

    return new Response(object?.body ?? null, { status: object ? 200 : 404 });

  },

};


```

The sandbox calls `http://my.kv/some-key` and the handler resolves it using the KV binding. A call to `http://my.r2/file.png` reads from R2, scoped to the current sandbox instance.

Note

You can use `ctx.containerId` to apply different rules per sandbox instance — for example, to look up per-instance configuration from KV.

## Access Durable Object state

The `ctx` argument exposes `containerId`, which lets you interact with the sandbox's own Durable Object from an outbound handler.

* [  JavaScript ](#tab-panel-10515)
* [  TypeScript ](#tab-panel-10516)

JavaScript

```

export class MySandbox extends Sandbox {}


MySandbox.outboundByHost = {

  "get-state.do": async (request, env, ctx) => {

    const id = env.MY_SANDBOX.idFromString(ctx.containerId);

    const stub = env.MY_SANDBOX.get(id);

    // Assumes getStateForKey is defined on your DO

    return stub.getStateForKey(request.body);

  },

};


```

TypeScript

```

export class MySandbox extends Sandbox {}


MySandbox.outboundByHost = {

  "get-state.do": async (

    request: Request,

    env: Env,

    ctx: { containerId: string },

  ) => {

    const id = env.MY_SANDBOX.idFromString(ctx.containerId);

    const stub = env.MY_SANDBOX.get(id);

    // Assumes getStateForKey is defined on your DO

    return stub.getStateForKey(request.body);

  },

};


```

## Related resources

* [Handle outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) — Block, allow, and intercept all outbound HTTP from a sandbox
* [Sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) — Configure sandbox behavior
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) — Configure secrets and environment variables

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/workers-connections/#page","headline":"Connect to Workers bindings · Cloudflare Sandbox SDK docs","description":"Access KV, R2, Durable Objects, and other bindings from a sandbox.","url":"https://developers.cloudflare.com/sandbox/guides/workers-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/workers-connections/","name":"Connect to Workers bindings"}}]}
```
