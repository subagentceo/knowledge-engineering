---
title: Balance traffic across origins
description: Distribute traffic across multiple servers for reliability and performance.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Balance traffic across origins

If a single origin server handles all your traffic, any failure or overload takes your application offline. Cloudflare's load balancing distributes traffic across multiple origins with health checks and automatic failover.

## Solutions

### Load balancing

Distribute traffic across origins with health checks and failover. [Learn more about load balancing](https://developers.cloudflare.com/load-balancing/).

* **Traffic distribution** \- Spread incoming load across multiple origin servers using weighted or latency-based policies
* **Failover** \- Reroute traffic to healthy origins instantly when a server fails its health check
* **Geographic steering** \- Route users to the nearest or best-performing origin based on latency or geography

### Health checks

Monitor origin server health and availability. [Learn more about health checks](https://developers.cloudflare.com/health-checks/).

* **Health monitoring** \- Continuously probe origins and automatically remove unhealthy servers from rotation

## Get started

1. [Create a load balancer](https://developers.cloudflare.com/load-balancing/get-started/)
2. [Configure health checks](https://developers.cloudflare.com/health-checks/get-started/)
3. [Set up steering policies](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/performance/load-balancing/#page","headline":"Balance traffic across origins · Cloudflare use cases","description":"Distribute traffic across multiple servers for reliability and performance.","url":"https://developers.cloudflare.com/use-cases/performance/load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/performance/load-balancing/","name":"Balance traffic across origins"}}]}
```
