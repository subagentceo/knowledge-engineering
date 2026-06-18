---
title: TypeScript
description: How TypeScript types for your Worker or Durable Object's RPC methods are generated and exposed to clients
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TypeScript

Running [wrangler types](https://developers.cloudflare.com/workers/languages/typescript/#generate-types) generates runtime types including the `Service` and `DurableObjectNamespace` types, each of which accepts a single type parameter for the [WorkerEntrypoint](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc) or [DurableObject](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#call-rpc-methods) types.

Using higher-order types, we automatically generate client-side stub types (e.g., forcing all methods to be async).

[wrangler types](https://developers.cloudflare.com/workers/languages/typescript/#generate-types) also generates types for the `env` object. You can pass in the path to the config files of the Worker or Durable Object being called so that the generated types include the type parameters for the `Service` and `DurableObjectNamespace` types.

For example, if your client Worker had bindings to a Worker in `../sum-worker/` and a Durable Object in `../counter/`, you should generate types for the client Worker's `env` by running:

 npm  yarn  pnpm 

```
npx wrangler types -c ./client/wrangler.jsonc -c ../sum-worker/wrangler.jsonc -c ../counter/wrangler.jsonc
```

```
yarn wrangler types -c ./client/wrangler.jsonc -c ../sum-worker/wrangler.jsonc -c ../counter/wrangler.jsonc
```

```
pnpm wrangler types -c ./client/wrangler.jsonc -c ../sum-worker/wrangler.jsonc -c ../counter/wrangler.jsonc
```

This will produce a `worker-configuration.d.ts` file that includes:

worker-configuration.d.ts

```

interface Env {

  SUM_SERVICE: Service<import("../sum-worker/src/index").SumService>;

  COUNTER_OBJECT: DurableObjectNamespace<

    import("../counter/src/index").Counter

  >;

}


```

Now types for RPC method like the `env.SUM_SERVICE.sum` method will be exposed to the client Worker.

src/index.ts

```

export default {

  async fetch(req, env, ctx): Promise<Response> {

    const result = await env.SUM_SERVICE.sum(1, 2);

    return new Response(result.toString());

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/rpc/typescript/#page","headline":"Workers RPC — TypeScript · Cloudflare Workers docs","description":"How TypeScript types for your Worker or Durable Object's RPC methods are generated and exposed to clients","url":"https://developers.cloudflare.com/workers/runtime-apis/rpc/typescript/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/rpc/","name":"Remote-procedure call (RPC)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/rpc/typescript/","name":"TypeScript"}}]}
```
