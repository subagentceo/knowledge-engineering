---
title: Components of a load balancer
description: Understand pools, endpoints, and load balancers.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Components of a load balancer

At it's most basic, load balancing is made up of three components:

* **Pools**: Which contain one or more endpoints.
* **Endpoints**: Which respond to individual requests.
* **A load balancer**: Which decides which traffic goes to each pool.

## How it works

Normally, requests to your application would go to individual servers directly.

With a load balancer, requests first go through the load balancer. Your load balancer then routes requests to specific pools.

    flowchart LR
      accTitle: Load balancing flow
      accDescr: Load balancing involves a load balancer, pools, endpoints, monitors, and health monitors.
      B[Request 1] --> A
      C[Request 2] --> A
      D[Request 3] --> A
      A[Load balancer] -- Request 1 --> P1
      A -- Request 2 --> P2
      A -- Request 3 --> P3
      subgraph P1 [Pool 1]
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end
      subgraph P2 [Pool 2]
      Endpoint3((Endpoint 3))
      Endpoint4((Endpoint 4))
      end
      subgraph P3 [Pool 3]
      Endpoint5((Endpoint 5))
      Endpoint6((Endpoint 6))
      end

  
Within each pool, requests then go to individual endpoints. And that endpoint is what responds to the request.

    flowchart LR
      accTitle: Pool traffic flow
      accDescr: When an incoming request reaches a pool, it then goes to an endpoint within the pool.
    A[Request 1] --Routed by pool--> Endpoint2
      subgraph P1 [Pool]
        Endpoint1((Endpoint 1))
        Endpoint2((Endpoint 2))
      end

  
This progression of load balancer --> pool --> endpoint is the core part of how a load balancer works.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/load-balancer-components/#page","headline":"Components of a load balancer · Cloudflare Learning Paths","description":"Understand pools, endpoints, and load balancers.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/load-balancer-components/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/concepts/load-balancer-components/","name":"Components of a load balancer"}}]}
```
