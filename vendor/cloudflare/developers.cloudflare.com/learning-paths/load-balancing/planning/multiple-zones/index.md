---
title: Account-level load balancing
description: Learn about account-level load balancing in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Account-level load balancing

If you want to set up load balancing for multiple hostnames or domains within your account, your approach would depend on the requirements for each hostname.

## Shared configurations

If you want to share a load balancing configuration across multiple hostnames, you can use the same load balancer through `CNAME` routing.

1. When you [set up](https://developers.cloudflare.com/learning-paths/load-balancing/setup/) the load balancer, create the load balancer on a new hostname (`lb.example.com`).
2. When you are ready to [route production traffic](https://developers.cloudflare.com/learning-paths/load-balancing/setup/production-traffic/), [create](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` record on a hostname that points to the load balancer created in step 1 (`lb.example.com`).
3. Repeat steps 1 and 2 with all other hostnames.

Note

You could also achieve the same goal or create more advanced routing decisions by setting up DNS Overrides within [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) on each hostname that override the hostname to `lb.example.com`.

## Unique configurations

If each zone needs unique load balancer configurations (failover order, routing), you should create separate load balancers. Since pools and monitors are configured at the account level, even different load balancers can share the same pools and monitors.

For simpler routing, create a load balancer on each hostname.

For more advanced routing, create multiple load balancers and then set up [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) to route traffic to each load balancer based on specific characteristics of the request.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/multiple-zones/#page","headline":"Account-level load balancing · Cloudflare Learning Paths","description":"Learn about account-level load balancing in this guide.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/multiple-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/planning/","name":"Planning your load balancer"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/planning/multiple-zones/","name":"Account-level load balancing"}}]}
```
