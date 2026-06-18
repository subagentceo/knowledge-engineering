---
title: Dynamic dispatch Worker
description: Create a dynamic dispatch Worker to route incoming requests to user Workers in your dispatch namespace.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dynamic dispatch Worker

A [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) is a specialized routing Worker that directs incoming requests to the appropriate user Workers in your dispatch namespace. Instead of using [Workers Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), dispatch Workers let you programmatically control request routing through code.

![Figure 1: Workers for Platforms: Main Flow](https://developers.cloudflare.com/_astro/programmable-platforms-1.BCCEhzLr_2d88FE.svg) 

Note

You can also create a dispatch Worker from the Cloudflare dashboard. Go to **Workers for Platforms**, select your namespace, and click **Create** \> **Dispatch Worker**. The dashboard provides templates for path-based and subdomain-based routing.

#### Why use a dynamic dispatch Worker?

* **Scale**: Route requests to millions of hostnames to different Workers, without defining [Workers Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) configuration for each one
* **Custom routing logic**: Write code to determine exactly how requests should be routed. For example:  
   * Store hostname-to-Worker mappings in [Workers KV](https://developers.cloudflare.com/kv/) and look them up dynamically  
   * Route requests based on subdomain, path, headers, or other request properties  
   * Use [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) attached to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) for routing decisions
* **Add platform functionality**: Build additional features at the routing layer:  
   * Run authentication checks before requests reach user Workers  
   * Remove or add headers or metadata from incoming requests  
   * Attach useful context like user IDs or account information  
   * Transform requests or responses as needed

### Configure the dispatch namespace binding

To allow your dynamic dispatch Worker to dynamically route requests to Workers in a namespace, you need to configure a dispatch namespace [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). This binding enables your dynamic dispatch Worker to call any user Worker within that namespace using `env.dispatcher.get()`.

* [  wrangler.jsonc ](#tab-panel-7033)
* [  wrangler.toml ](#tab-panel-7034)

JSONC

```

{

  "dispatch_namespaces": [

    {

      "binding": "DISPATCHER",

      "namespace": "my-dispatch-namespace"

    }

  ]

}


```

TOML

```

[[dispatch_namespaces]]

binding = "DISPATCHER"

namespace = "my-dispatch-namespace"


```

Once the binding is configured, your dynamic dispatch Worker can route requests to any Worker in the namespace. Below are common routing patterns you can implement in your dispatcher.

### Routing examples

![Figure 2: Workers for Platforms: Main Flow](https://developers.cloudflare.com/_astro/programmable-platforms-2.DGAT6ZDR_Z19nioR.svg) 

#### KV-Based Routing

Store the routing mappings in [Workers KV](https://developers.cloudflare.com/kv/). This allows you to modify your routing logic without requiring you to change or redeploy the dynamic dispatch Worker.

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      const url = new URL(request.url);


      // Use hostname, path, or any combination as the routing key

      const routingKey = url.hostname;


      // Lookup user Worker name from KV store

      const userWorkerName = await env.USER_ROUTING.get(routingKey);


      if (!userWorkerName) {

        return new Response("Route not configured", { status: 404 });

      }


      // Optional: Cache the KV lookup result

      const userWorker = env.DISPATCHER.get(userWorkerName);

      return await userWorker.fetch(request);

    } catch (e) {

      if (e.message.startsWith("Worker not found")) {

        return new Response("", { status: 404 });

      }

      return new Response(e.message, { status: 500 });

    }

  },

};


```

#### Subdomain-Based Routing

Route subdomains to the corresponding Worker. For example, `my-customer.example.com` will route to the Worker named `my-customer` in the dispatch namespace.

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      // Extract user Worker name from subdomain

      // Example: customer1.example.com -> customer1

      const url = new URL(request.url);

      const userWorkerName = url.hostname.split(".")[0];


      // Get user Worker from dispatch namespace

      const userWorker = env.DISPATCHER.get(userWorkerName);

      return await userWorker.fetch(request);

    } catch (e) {

      if (e.message.startsWith("Worker not found")) {

        // User Worker doesn't exist in dispatch namespace

        return new Response("", { status: 404 });

      }

      // Could be any other exception from fetch() or from the dispatched Worker

      return new Response(e.message, { status: 500 });

    }

  },

};


```

#### Path-Based routing

Route URL paths to the corresponding Worker. For example, `example.com/customer-1` will route to the Worker named `customer-1` in the dispatch namespace.

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      const url = new URL(request.url);

      const pathParts = url.pathname.split("/").filter(Boolean);


      if (pathParts.length === 0) {

        return new Response("Invalid path", { status: 400 });

      }


      // example.com/customer-1 -> routes to 'customer-1' worker

      const userWorkerName = pathParts[0];


      const userWorker = env.DISPATCHER.get(userWorkerName);

      return await userWorker.fetch(request);

    } catch (e) {

      if (e.message.startsWith("Worker not found")) {

        return new Response("", { status: 404 });

      }

      return new Response(e.message, { status: 500 });

    }

  },

};


```

### Enforce custom limits

Use [custom limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/) to control how much CPU time a given user Worker can use, or how many subrequests it can make. You can set different limits based on customer plan type or other criteria.

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      const url = new URL(request.url);

      const userWorkerName = url.hostname.split(".")[0];


      // Look up customer plan from your database or KV

      const customerPlan = await env.CUSTOMERS.get(userWorkerName);


      // Set limits based on plan type

      const plans = {

        enterprise: { cpuMs: 50, subRequests: 50 },

        pro: { cpuMs: 20, subRequests: 20 },

        free: { cpuMs: 10, subRequests: 5 },

      };

      const limits = plans[customerPlan] || plans.free;


      const userWorker = env.DISPATCHER.get(userWorkerName, {}, { limits });

      return await userWorker.fetch(request);

    } catch (e) {

      if (e.message.startsWith("Worker not found")) {

        return new Response("", { status: 404 });

      }

      if (e.message.includes("CPU time limit")) {

        // Track limit violations with Analytics Engine

        env.ANALYTICS.writeDataPoint({

          indexes: [userWorkerName],

          blobs: ["cpu_limit_exceeded"],

        });

        return new Response("CPU limit exceeded", { status: 429 });

      }

      return new Response(e.message, { status: 500 });

    }

  },

};


```

For more details on available limits, refer to [Custom limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/).

To track limit violations and other metrics across user Workers, use [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/). For detailed logging and debugging, configure a [Tail Worker](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) to capture events from your dispatch Worker.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/#page","headline":"Dynamic dispatch Worker · Cloudflare for Platforms docs","description":"Create a dynamic dispatch Worker to route incoming requests to user Workers in your dispatch namespace.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/","name":"Configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/","name":"Dynamic dispatch Worker"}}]}
```
