---
title: Monitors and health checks
description: Monitor server health with periodic health checks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitors and health checks

There's more to a load balancer than just distributing traffic, however.

After all, what good would it be if your load balancer and pools send a request to a server that's offline? Or one that's already overloaded with traffic? Ideally, your load balancer should only forward requests that a server can take care of.

That's where another part of the load balancing equation comes in: monitors and health checks.

    flowchart RL
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health monitor requests, which validate the current status of servers within each pool.
      Monitor -- Health Monitor ----> Endpoint2
      Endpoint2 -- Response ----> Monitor
      subgraph Pool
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end

## How it works

A monitor issues health checks periodically to evaluate the health of each server within a pool.

Requests issued by a monitor at regular interval and — depending on the monitor settings — return a **pass** or **fail** value to make sure an endpoint is still able to receive traffic.

Each health monitor request is trying to answer two questions:

1. **Is the endpoint offline?**: Does the endpoint respond to the health monitor request at all? If so, does it respond quickly enough (as specified in the monitor's **Timeout** field)?
2. **Is the endpoint working as expected?**: Does the endpoint respond with the expected HTTP response codes? Does it include specific information in the response body?

If the answer to either of these questions is "No", then the endpoint fails the health monitor request.

This system of request and response ensures that a load balancer knows which servers can handle incoming requests.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/health-checks/#page","headline":"Monitors and health checks · Cloudflare Learning Paths","description":"Monitor server health with periodic health checks.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/concepts/health-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/concepts/health-checks/","name":"Monitors and health checks"}}]}
```
