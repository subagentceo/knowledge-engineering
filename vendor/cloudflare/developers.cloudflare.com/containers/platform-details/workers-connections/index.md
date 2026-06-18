---
title: Connect to Workers and Bindings
description: Access KV, R2, Durable Objects, and other bindings from a container.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to Workers and Bindings

Containers can access [Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) — KV, R2, D1, Durable Objects, and others — through [outbound handlers](https://developers.cloudflare.com/containers/platform-details/outbound-traffic/#define-outbound-handlers). An outbound handler intercepts HTTP requests from the container and runs inside the Workers runtime, where all of your configured bindings are available.

The container makes a plain HTTP request to a virtual hostname (for example, `http://my.kv/some-key`), and the outbound handler resolves it using the bound resource. No SDK or client library is required inside the container.

## Use bindings in outbound handlers

Define an `outboundByHost` handler for each virtual hostname. The `env` argument gives you access to every binding declared in your Wrangler configuration.

JavaScript

```

export class MyContainer extends Container {}


MyContainer.outboundByHost = {

  "my.kv": async (request, env, ctx) => {

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    const value = await env.KV.get(key);

    return new Response(value);

  },

  "my.r2": async (request, env, ctx) => {

    const url = new URL(request.url);

    // Scope access to this container's ID

    const path = `${ctx.containerId}${url.pathname}`;

    const object = await env.R2.get(path);

    return new Response(object?.body ?? null, { status: object ? 200 : 404 });

  },

};


```

The container calls `http://my.kv/some-key` and the handler resolves it using the KV binding. A call to `http://my.r2/file.png` reads from R2, scoped to the current container instance.

Note

You can use `ctx.containerId` to apply different rules per container instance — for example, to look up per-instance configuration from KV.

## Access Durable Object state

The `ctx` argument exposes `containerId`, which lets you interact with the container's own Durable Object from an outbound handler.

JavaScript

```

"get-state.do": async (request, env, ctx) => {

  const id = env.MY_CONTAINER.idFromString(ctx.containerId);

  const stub = env.MY_CONTAINER.get(id);

  // Assumes getStateForKey is defined on your DO

  return stub.getStateForKey(request.body);

},


```

## Related resources

* [Handle outbound traffic](https://developers.cloudflare.com/containers/platform-details/outbound-traffic/) — Block, allow, and intercept all outbound HTTP from a container
* [Environment variables and secrets](https://developers.cloudflare.com/containers/platform-details/environment-variables/) — Configure secrets and environment variables
* [Durable Object interface](https://developers.cloudflare.com/durable-objects/api/container/) — Full `ctx.container` API reference

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/workers-connections/#page","headline":"Connect to Workers and Bindings · Cloudflare Containers docs","description":"Access KV, R2, Durable Objects, and other bindings from a container.","url":"https://developers.cloudflare.com/containers/platform-details/workers-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/workers-connections/","name":"Connect to Workers and Bindings"}}]}
```
