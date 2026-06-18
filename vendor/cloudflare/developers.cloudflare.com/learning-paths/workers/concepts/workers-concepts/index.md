---
title: Cloudflare Workers
description: Learn Workers runtime and execution model.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Workers

Cloudflare Workers gives developers the power to deploy serverless code instantly to Cloudflare's global network.

Cloudflare Workers significantly differs from other serverless computing providers in its execution model and architecture.

## What you can do with Workers

A single Worker project can have logic as complex or as simple as the developer desires. A project of smaller scale might look like a Worker that [returns a small HTML page](https://developers.cloudflare.com/workers/examples/return-html/) on a single route. A more complex Worker project would span multiple domains, multiple routes for each domain, and different logic for each route. The developer decides the architectural complexity of their Worker project.

Your application can be made up of multiple Workers that work together and deliver a single experience to end users. Workers can also integrate with other Cloudflare Developer Platform functionality such as storage, media and AI. You will learn more about this in the [Developer Platform module](https://developers.cloudflare.com/learning-paths/workers/devplat/).

## Runtime

The [Workers runtime ↗](https://blog.cloudflare.com/workerd-open-source-workers-runtime) is designed to be JavaScript-standards compliant and web-interoperable. The Workers runtime uses the V8 engine — the same engine used by Chromium and Node.js, and has an open-source version, [workerd ↗](https://github.com/cloudflare/workerd).

## Execution

The Cloudflare Workers runtime runs in every data center of [Cloudflare's global network ↗](https://www.cloudflare.com/network/). Every Worker run within its own isolate. Isolate architecture is what makes Workers efficient.

### Isolates

Workers uses [isolates](https://developers.cloudflare.com/workers/reference/how-workers-works/#isolates): lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. You could even consider an isolate a sandbox for your function to run in.

A single instance of the runtime can run hundreds or thousands of isolates, seamlessly switching between them. Each isolate's memory is completely isolated, so each piece of code is protected from other untrusted or user-written code on the runtime. Isolates are also designed to start very quickly. Instead of creating a virtual machine for each function, an isolate is created within an existing environment. This model eliminates the cold starts of the virtual machine model.

Unlike other serverless providers which use [containerized processes ↗](https://www.cloudflare.com/learning/serverless/serverless-vs-containers/) each running an instance of a language runtime, Workers pays the overhead of a JavaScript runtime once on the start of a container. Workers processes are able to run essentially limitless scripts with almost no individual overhead. Any given isolate can start around a hundred times faster than a Node process on a container or virtual machine. Notably, on startup isolates consume an order of magnitude less memory.

Scheduling and routing

Scheduling and routing 

HTTP client

HTTP client 

HTTP server

HTTP server 

Inbound  
HTTP proxy  

\[Not supported by viewer\] 

Outbound  
HTTP proxy  

\[Not supported by viewer\] 

Supervisor  

\[Not supported by viewer\] 

Main Runtime Process

Main Runtime Process 

Outer Sandbox

Outer Sandbox 

Disk

Disk 

Control plane  

\[Not supported by viewer\] 

 HTTP 

\[Not supported by viewer\] 

 Cap'n Proto RPC 

\[Not supported by viewer\] 

 In-process calls 

\[Not supported by viewer\] 

 Other 

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

Process  
Sandbox  

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

Scheduling and routing

Scheduling and routing 

Process  
Sandbox  

\[Not supported by viewer\] 

 V8 Isolate 

\[Not supported by viewer\] 

Scheduling and routing

Scheduling and routing 

## Compute per request

Most Workers are a variation on the default Workers flow:

* [  JavaScript ](#tab-panel-9296)
* [  TypeScript ](#tab-panel-9297)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response('Hello World!');

  },

};


```

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    return new Response('Hello World!');

  },

} satisfies ExportedHandler<Env>;


```

For Workers written in [ES modules syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/), when a request to your `*.workers.dev` subdomain or to your Cloudflare-managed domain is received by any of Cloudflare's data centers, the request invokes the [fetch() handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) defined in your Worker code with the given request. You can respond to the request by returning a [Response](https://developers.cloudflare.com/workers/runtime-apis/response/) object.

## Summary

By reading this page, you have learned:

* The basics of how Worker projects are organized.
* The fundamentals of how Workers execute on the Cloudflare network.
* How the request to response flow executes.

In the next module, you build and deploy your first Worker to the Cloudflare global network.

## Related resources

* [Cloud computing without containers ↗](https://blog.cloudflare.com/cloud-computing-without-containers) \- A blog post detailing the containers versus isolates difference in the context of Cloudflare.
* [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/) \- Learn the difference between the Workers runtime versus traditional browsers and Node.js.
* [How the cache works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/) \- Learn how Workers interacts with the Cloudflare cache.

## Feedback

To improve this learning path or report any missing or incorrect information, [file an issue on GitHub ↗](https://github.com/cloudflare/cloudflare-docs/issues/new/choose).

## Community

Connect with the [Cloudflare Developer Platform community on Discord ↗](https://discord.cloudflare.com) to ask questions, share what you are building, and discuss the platform with other developers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/workers/concepts/workers-concepts/#page","headline":"Cloudflare Workers · Cloudflare Learning Paths","description":"Learn Workers runtime and execution model.","url":"https://developers.cloudflare.com/learning-paths/workers/concepts/workers-concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workers/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workers/concepts/workers-concepts/","name":"Cloudflare Workers"}}]}
```
