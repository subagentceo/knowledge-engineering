---
title: Cache and accelerate media delivery
description: Deliver media content from edge locations worldwide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache and accelerate media delivery

Streaming video and serving images to a global audience requires low-latency delivery from locations close to each viewer. Cloudflare Cache serves media globally, and Argo Smart Routing ensures cache misses take the fastest path back to your origin.

## Solutions

### Cache

Cache content at Cloudflare's global network of edge locations. [Learn more about Cache](https://developers.cloudflare.com/cache/).

* **Global edge caching** \- Media content served from 300+ edge locations to reduce latency for global audiences
* **Origin offload** \- Cached content is served directly from the edge, reducing origin bandwidth and compute costs
* **Tiered caching** \- Regional cache tiers absorb repeated requests before they reach the origin, further reducing load

### Argo Smart Routing

Route traffic through the fastest paths across Cloudflare's network. [Learn more about Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/).

* **Smart routing** \- Requests that miss cache are routed through the fastest available network paths to origin

## Get started

1. [Configure Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
2. [Enable Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/)
3. [Enable Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/get-started/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/media-streaming/cache-delivery/#page","headline":"Cache and accelerate media delivery · Cloudflare use cases","description":"Deliver media content from edge locations worldwide.","url":"https://developers.cloudflare.com/use-cases/media-streaming/cache-delivery/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/media-streaming/","name":"Media and streaming"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/media-streaming/cache-delivery/","name":"Cache and accelerate media delivery"}}]}
```
