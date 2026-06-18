---
title: Routing traffic
description: Control how traffic routes to pools and servers.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routing traffic

Before, we covered how requests move from load balancers to pools and then from pools to individual servers.

What we did not mention, however, was _how_ the load balancer and pools make those decisions.

This is a concept known as routing.

## How it works

Generally, there are five questions involved with routing:

1. By default, how does the load balancer distribute requests to pools?
2. By default, how do pools distribute requests to individual servers?
3. Within a pool, which servers are healthy?
4. Within a load balancer, which pools are healthy?
5. Are there any specialized routing rules?

### Distributing requests to pools

A load balancer's [traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) controls how the load balancer distributes requests to pools.

Routing decisions can be based on proximity, pool performance, geography, and more.

### Distributing requests within pools

Once the request reaches a pool, that pool's [endpoint steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/) controls how each pool distributes requests to the servers in the pool.

These decisions can be based on default percentages of traffic sent to individual servers (also known as the **Weight**), aspects of the request (such as source IP address), or both.

### Endpoint health

If an endpoint fails a health check - which would mark it as unhealthy - its pool will adjust routing according to its endpoint steering policy.

Both new and existing requests will go to healthy endpoints in the pool, ignoring the unhealthy endpoint.

### Pool health

With enough unhealthy endpoints, the pool itself may be considered unhealthy as well.

When a pool reaches **Critical** health, your load balancer will begin diverting traffic according to its [Traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/):

* **Off**:  
   * If the active pool becomes unhealthy, traffic goes to the next pool in order.  
   * If an inactive pool becomes unhealthy, traffic continues to go to the active pool (but would skip over the unhealthy pool in the failover order).
* **All other methods**: Traffic is distributed across all remaining pools according to the traffic steering policy.

#### Fallback pools

Often, load balancers have a special pool known as the **Fallback Pool**, which receives traffic no matter what.

This pool is meant to be the pool of last resort, meaning that its health is not taken into account when directing traffic.

Fallback pools are important because traffic still might be coming to your load balancer even when all the pools are unreachable (disabled or unhealthy). Your load balancer needs somewhere to route this traffic, so it will send it to the fallback pool.

### Specialized routing

Finally, specific settings can also affect the ways a load balancer distributes traffic, such as:

* Routing based on [specific aspects](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) of the request.
* Sending all requests from a [specific end user](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) to the same server, preserving information about their user session like items in a shopping cart.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/routing/#page","headline":"Routing traffic · Cloudflare Learning Paths","description":"Control how traffic routes to pools and servers.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/concepts/routing/","name":"Routing traffic"}}]}
```
