---
title: Session affinity
description: Maintain user sessions on the same server.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Session affinity

When you enable session affinity, your load balancer directs all requests from a particular end user to a specific endpoint. This continuity preserves information about the user session — such as items in their shopping cart — that might otherwise be lost if requests were spread out among multiple servers.

Session affinity can also help reduce network requests, leading to savings for customers with usage-based billing.

Note

Session Affinity is only supported by Public Load Balancers.

## How it works

Session affinity automatically directs requests from the same client to the same endpoint:

1. When a client makes its first request, Cloudflare sets a `__cflb` cookie on the client (to track the associated endpoint).
2. Subsequent requests by the same client are forwarded to that endpoint for the duration of the cookie and as long as the endpoint remains healthy.
3. If the cookie expires or the endpoint becomes unhealthy, Cloudflare sets a new cookie tracking the new failover endpoint.

    flowchart LR
      accTitle: Session affinity process
      accDescr: Session affinity directs requests from the same client to the same server.
     A[Client] --Request--> B{<code>__cflb</code> cookie set?}
     B -->|Yes| C[Route to previous endpoint]
     C --> O2
     B ---->|No| E[Follow normal routing]
     E --> O2
     E --Set <code>__cflb</code> cookie--> A
     subgraph P1 [Pool 1]
        O1[Endpoint 1]
        O2[Endpoint 2]
     end

  
All cookie-based sessions default to 23 hours unless you set a custom session _Time to live_ (TTL).

The session cookie is secure when [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/session-affinity/#page","headline":"Session affinity · Cloudflare Learning Paths","description":"Maintain user sessions on the same server.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/session-affinity/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/planning/","name":"Planning your load balancer"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/planning/session-affinity/","name":"Session affinity"}}]}
```
