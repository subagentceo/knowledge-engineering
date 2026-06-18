---
title: Optimize performance
description: Accelerate your application with caching, smart routing, and edge optimization.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Optimize performance

Slow page loads increase bounce rates and reduce conversions. Cloudflare accelerates your application with edge caching, Argo Smart Routing to avoid congested network paths, and automatic asset optimization that improves Core Web Vitals scores.

## Solutions

### Cache

Cache content at Cloudflare's global network of edge locations. [Learn more about Cache](https://developers.cloudflare.com/cache/).

* **Edge caching** \- Serve responses from the nearest Cloudflare location to reduce latency and origin load

### Argo Smart Routing

Route traffic through the fastest paths across Cloudflare's network. [Learn more about Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/).

* **Smart routing** \- Automatically avoid congested network paths between edge and origin

### Speed

Automatic optimizations for HTML, CSS, JavaScript, and fonts. [Learn more about Speed](https://developers.cloudflare.com/speed/).

* **Asset optimization** \- Automatic minification of HTML, CSS, and JavaScript plus Brotli compression
* **Core Web Vitals** \- Improve Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) scores with built-in optimizations

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **Edge logic** \- Run custom performance optimizations at the edge, such as HTML rewriting and dynamic content assembly, without round-trips to your origin

## Get started

1. [Configure Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
2. [Enable Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/get-started/)
3. [Enable Speed optimizations](https://developers.cloudflare.com/speed/optimization/)
4. [Rewrite HTML at the edge with HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/web-apps/performance/#page","headline":"Optimize performance · Cloudflare use cases","description":"Accelerate your application with caching, smart routing, and edge optimization.","url":"https://developers.cloudflare.com/use-cases/web-apps/performance/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/web-apps/","name":"Web sites and web apps"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/web-apps/performance/","name":"Optimize performance"}}]}
```
