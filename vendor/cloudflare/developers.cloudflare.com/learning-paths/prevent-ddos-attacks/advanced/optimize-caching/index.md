---
title: Optimize caching
description: Optimize caching to reduce origin load.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Optimize caching

The more content is cached, the fewer requests go back to your origin server (whether due to legitimate or illegitimate traffic).

A few ways to optimize Cloudflare caching include:

* Creating [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to customize the cache properties of specific HTTP requests.
* Enabling the [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) feature, which dramatically increases cache hit ratios.
* Reviewing our other various [configuration options](https://developers.cloudflare.com/cache/get-started/), which may vary based on your plan and application setup.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/#page","headline":"Optimize caching · Cloudflare Learning Paths","description":"Optimize caching to reduce origin load.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/","name":"Optimize caching"}}]}
```
