---
title: Build and run AI applications
description: Build AI applications with serverless compute, edge inference, multi-provider gateways, and stateful coordination.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build and run AI applications

To build and deploy an AI application, you need compute for application logic, a way to run inference, and a gateway to manage costs across providers. Cloudflare Workers hosts your application logic and serves your frontend. Workers AI runs inference at the edge with pay-per-use pricing. AI Gateway adds caching, rate limiting, and observability across OpenAI, Anthropic, and other providers. Durable Objects coordinate stateful workflows and multi-turn conversations.

## Solutions

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **Streaming responses** \- Stream AI responses token-by-token as they generate, without buffering the full reply
* **Full-stack deployment** \- Serve frontend and backend from a single deployment without managing separate infrastructure

### Workers AI

Run inference on Cloudflare's global network via a Workers binding, with pay-per-use pricing. [Learn more about Workers AI](https://developers.cloudflare.com/workers-ai/).

* **Global inference** \- Run models at the Cloudflare location nearest to the user, reducing round-trip latency
* **Pay-per-use pricing** \- No GPU reservations or idle costs; pay only for tokens processed

### AI Gateway

Proxy requests to any AI provider with caching, rate limiting, and unified analytics. [Learn more about AI Gateway](https://developers.cloudflare.com/ai-gateway/).

* **Provider flexibility** \- Route requests to OpenAI, Anthropic, Workers AI, or any other provider through a single endpoint
* **Unified observability** \- Track request volume, latency, costs, and errors across all providers in one place

### Durable Objects

Stateful objects with strongly consistent storage and coordination. [Learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/).

* **Stateful workflows** \- Coordinate multi-step AI pipelines and maintain conversation state across requests

## Get started

1. [Workers AI get started](https://developers.cloudflare.com/workers-ai/get-started/)
2. [AI Gateway get started](https://developers.cloudflare.com/ai-gateway/get-started/)
3. [Durable Objects get started](https://developers.cloudflare.com/durable-objects/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/ai/build-and-run/#page","headline":"Build and run AI applications · Cloudflare use cases","description":"Build AI applications with serverless compute, edge inference, multi-provider gateways, and stateful coordination.","url":"https://developers.cloudflare.com/use-cases/ai/build-and-run/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/ai/","name":"AI applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/ai/build-and-run/","name":"Build and run AI applications"}}]}
```
