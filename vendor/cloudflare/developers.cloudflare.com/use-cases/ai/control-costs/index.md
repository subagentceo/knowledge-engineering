---
title: Control costs and improve quality
description: Reduce AI inference costs and improve reliability with response caching, rate limiting, and unified provider analytics.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Control costs and improve quality

AI inference costs can grow unpredictably as your application scales, especially when using multiple providers. Cloudflare AI Gateway caches identical queries to avoid redundant inference calls, applies rate limits per user or API key, and provides unified analytics across all providers.

## Solutions

### AI Gateway

Cache responses, rate limit requests, and monitor usage across providers. [Learn more about AI Gateway](https://developers.cloudflare.com/ai-gateway/).

* **Response caching** \- Cache identical queries so repeated prompts do not trigger a new inference call
* **Rate limiting** \- Set request limits per user or Application Programming Interface (API) key to prevent abuse and control spending
* **Unified analytics** \- Track usage, latency, and cost across all AI providers from one dashboard

### Workers Analytics Engine

Store and query time-series analytics data from Workers. [Learn more about Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/).

* **Custom metrics** \- Build AI-specific dashboards tracking tokens, latency distributions, and error rates

## Get started

1. [AI Gateway get started](https://developers.cloudflare.com/ai-gateway/get-started/)
2. [Configure caching](https://developers.cloudflare.com/ai-gateway/features/caching/)
3. [Workers Analytics Engine get started](https://developers.cloudflare.com/analytics/analytics-engine/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/ai/control-costs/#page","headline":"Control costs and improve quality · Cloudflare use cases","description":"Reduce AI inference costs and improve reliability with response caching, rate limiting, and unified provider analytics.","url":"https://developers.cloudflare.com/use-cases/ai/control-costs/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/ai/","name":"AI applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/ai/control-costs/","name":"Control costs and improve quality"}}]}
```
