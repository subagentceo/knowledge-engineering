---
title: Accelerate connections
description: Reduce latency with Argo Smart Routing, HTTP/3, and Early Hints asset preloading.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Accelerate connections

Network congestion and suboptimal routing between your origin and visitors add latency. Cloudflare Argo Smart Routing uses real-time network telemetry to route requests through the fastest paths, while Early Hints preloads assets before the full HTML response arrives.

## Solutions

### Argo Smart Routing

Route traffic through the fastest paths across Cloudflare's network. [Learn more about Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/).

* **Smart routing** \- Automatically route requests through uncongested network paths, reducing latency between edge and origin
* **Optimized paths** \- Real-time network telemetry selects the fastest available route for each request

### Speed

Improve the performance of your website or web application. [Learn more about Speed](https://developers.cloudflare.com/speed/).

* **Faster handshakes** \- Assess the performance of your website and gain recommendations on how to optimize your website

### Early Hints

Preload assets before the HTML response arrives. [Learn more about Early Hints](https://developers.cloudflare.com/speed/optimization/content/early-hints/).

* **Asset preloading** \- Send `103 Early Hints` responses so browsers start fetching assets before the full HTML arrives

## Get started

1. [Enable Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/get-started/)
2. [Enable HTTP/3](https://developers.cloudflare.com/speed/optimization/protocol/http3/)
3. [Enable Early Hints](https://developers.cloudflare.com/speed/optimization/content/early-hints/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/performance/connections/#page","headline":"Accelerate connections · Cloudflare use cases","description":"Reduce latency with Argo Smart Routing, HTTP/3, and Early Hints asset preloading.","url":"https://developers.cloudflare.com/use-cases/performance/connections/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/performance/connections/","name":"Accelerate connections"}}]}
```
