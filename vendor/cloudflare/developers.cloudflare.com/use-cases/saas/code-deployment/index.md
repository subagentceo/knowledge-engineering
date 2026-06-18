---
title: Enable customer code deployment
description: Let your customers deploy their own code on your platform with isolated execution environments.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable customer code deployment

SaaS platforms often need to let customers run their own code — custom logic, integrations, webhooks — without compromising tenant isolation or platform stability. Cloudflare Workers for Platforms runs each customer's code in a separate V8 isolate with dispatch routing based on hostname, path, or header.

## Solutions

### Workers for Platforms

Deploy isolated Workers execution environments for your customers. [Learn more about Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/).

* **Tenant isolation** \- Each customer's code runs in a separate V8 isolate with no shared memory between tenants
* **Custom logic** \- Customers can deploy their own Workers to extend or customize your platform's behavior
* **Dispatch routing** \- Route incoming requests to the correct customer Worker based on hostname, path, or header
* **Observability** \- Tail Workers capture logs and errors across all tenant code from a single integration

## Get started

1. [Workers for Platforms get started](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/get-started/)
2. [Configure Dispatch Namespaces](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/code-deployment/#page","headline":"Enable customer code deployment · Cloudflare use cases","description":"Let your customers deploy their own code on your platform with isolated execution environments.","url":"https://developers.cloudflare.com/use-cases/saas/code-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/saas/","name":"SaaS platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/saas/code-deployment/","name":"Enable customer code deployment"}}]}
```
