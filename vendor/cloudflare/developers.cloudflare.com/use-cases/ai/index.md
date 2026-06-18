---
title: AI applications
description: Build AI applications on Cloudflare with Workers AI inference, AI Gateway, Vectorize, and serverless storage.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI applications

Build and deploy AI applications on Cloudflare's global network with inference at the edge, vector databases, and model gateways. Workers AI runs Large Language Models (LLMs), text embeddings, image generation, and other models with pay-per-use pricing. AI Gateway proxies requests to OpenAI, Anthropic, and other providers with caching and unified analytics. Vectorize stores embeddings for Retrieval Augmented Generation (RAG) workflows.

AI applications can present unique infrastructure challenges, such as unpredictable inference costs, latency-sensitive user experiences, and the need to work with multiple model providers. Cloudflare provides a complete platform for building AI applications that are fast, cost-effective, and globally distributed.

* [ Build and run AI applications ](https://developers.cloudflare.com/use-cases/ai/build-and-run/)
* [ Store and retrieve context ](https://developers.cloudflare.com/use-cases/ai/store-and-retrieve-context/)
* [ Control costs and improve quality ](https://developers.cloudflare.com/use-cases/ai/control-costs/)

## Architecture patterns

### Retrieval Augmented Generation (RAG)

Combine vector search with Large Language Model (LLM) inference to ground responses in your own data:

* **Vectorize** stores embeddings of your knowledge base
* **Workers** receives user queries and searches for relevant context
* **Workers AI** or **AI Gateway** generates responses using retrieved context

### Multi-provider AI gateway

Use AI Gateway to route requests across providers while maintaining a single interface:

* **AI Gateway** proxies requests to OpenAI, Anthropic, or Workers AI
* Built-in caching reduces costs for repeated queries
* Unified logging and analytics across all providers

### Real-time AI features

Deploy low-latency AI features directly at the edge:

* **Workers** handles requests at the nearest Cloudflare location and runs inference via the Workers AI binding — no round-trips to origin servers
* **KV** caches frequent responses to reduce inference calls and latency
* **D1** stores session state and conversation history alongside the inference logic

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) installed on your machine.
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed. Wrangler is the command-line interface (CLI) for deploying Workers and managing bindings.

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* [AI Gateway](https://developers.cloudflare.com/ai-gateway/) does not require a domain added to Cloudflare. You can place it in front of any existing AI provider (OpenAI, Anthropic, and others) by updating your API endpoint to route through AI Gateway.
* If you plan to add Workers AI inference or Vectorize to an existing application, you also need [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.

---

## Related resources

[Workers AI models](https://developers.cloudflare.com/workers-ai/models/) 

Browse available models for text generation, embeddings, image generation, and more.

[AI Gateway providers](https://developers.cloudflare.com/ai-gateway/usage/providers/) 

Connect to OpenAI, Anthropic, Google AI, and other providers through AI Gateway.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/ai/#page","headline":"AI applications · Use cases · Cloudflare use cases","description":"Build AI applications on Cloudflare with Workers AI inference, AI Gateway, Vectorize, and serverless storage.","url":"https://developers.cloudflare.com/use-cases/ai/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/ai/","name":"AI applications"}}]}
```
