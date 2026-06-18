---
title: Server and pool health
description: Customize server and pool health thresholds.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Server and pool health

As discussed before, a monitor issues health checks periodically to evaluate the health of each server within a pool.

    flowchart RL
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health monitor requests, which validate the current status of servers within each pool.
      Monitor -- Health Monitor ----> Endpoint2
      Endpoint2 -- Response ----> Monitor
      subgraph Pool
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end

  
Requests issued by a monitor at regular interval and — depending on the monitor settings — return a **pass** or **fail** value to make sure an endpoint is still able to receive traffic.

Each health monitor request is trying to answer two questions:

1. **Is the endpoint offline?**: Does the endpoint respond to the health monitor request at all? If so, does it respond quickly enough (as specified in the monitor's **Timeout** field)?
2. **Is the endpoint working as expected?**: Does the endpoint respond with the expected HTTP response codes? Does it include specific information in the response body?

If the answer to either of these questions is "No", then the endpoint fails the health monitor request.

---

## Customizations

Based on the characteristics of your server pools, you have several customization options that affect how and whether a server is considered unhealthy.

### Pool-level settings

#### Health threshold

The Health Threshold is the number of healthy endpoints for the pool as a whole to be considered _Healthy_ and receive traffic based on pool order in a load balancer. Increasing this number makes the pool more reliable, but also more likely to become unhealthy.

  
#### Health monitor regions

For each option selected in a pool's **Health Monitor Regions**, Cloudflare sends health monitor requests from three separate data centers in that region.

![Health monitor requests come from three data centers within each selected region.](https://developers.cloudflare.com/_astro/health-check-component.wo0_f7k-_Z1C61Ll.webp) 

If the majority of data centers for that region pass the health monitor requests, that region is considered healthy. If the majority of regions is healthy, then the endpoint itself will be considered healthy.

##### Configurations

**All Data Centers (Enterprise only)**

Health monitor probes are sent from every single data center in Cloudflare’s network to the endpoints within the associated pool. This allows probes to hit each endpoint during intervals set by the customer.

**All Regions (Enterprise only)**

Three health monitor probes per region are sent to each endpoint in the associated pool. There are a total of 13 regions, resulting in 39 probes.

**Regional**

Three health monitor probes are sent from each specified region within the pool configuration.

Warning

Because of how Cloudflare checks health from [multiple regions](#health-monitor-regions), adding multiple regions — or choosing to check health from **All Data Centers** — can send a lot of traffic to your endpoint.

The same problem can occur when setting low values for a monitor's **Interval**.

---

### Monitor-level settings

When you [create a monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/), there are several configuration settings you can adjust based on the characteristics of the attached pools:

Basic settings

* **Type**: The protocol to use for health monitors  
   * _Non-enterprise customers_: Choose **HTTP**, **HTTPS**, or **TCP**.  
   * _Enterprise customers_: Choose **HTTP**, **HTTPS**, **TCP**, **UDP ICMP**, **ICMP Ping**, or **SMTP**.
* **Path**: The endpoint path to run health monitor requests against
* **Port**: The destination port for health monitors

Advanced settings

* **Interval**:  
   * By increasing the default, you can improve failover time, but you may also increase load on your endpoints.  
   * Minimum time in seconds is 60 (Pro), 15 (Business), and 10 (Enterprise).
* **Timeout** and **Retries**:  
   * The health monitor request will return unhealthy if it exceeds the duration specified in **Timeout** (and exceeds this duration more times than the specified number of **Retries**).
* **Expected Code(s)**: The expected HTTP response codes listed individually (`200`, `302`) or as a range (for example, entering `2xx` would cover all response codes in the `200` range).
* **Response Body**:  
   * Looks for a case-insensitive substring in the response body.  
   * Make sure that the value is relatively static and within the first 10 KB of the HTML page.
* **Simulate Zone**:  
   * It is recommended to use the same zone in which the Load Balancer exists.  
   * Changes the egress zone settings of a health monitor request to ensure compatibility with features like [Authenticated Origin Pulls (mTLS)](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/), [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/), [Bring your own CA (mTLS)](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/), [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/), and [HTTP/2 to Origin](https://developers.cloudflare.com/speed/optimization/protocol/http2-to-origin/).
* **Follow Redirects**:  
   * Instead of reporting a `301` or `302` code as unhealthy, the health monitor request follows redirects to the final endpoint.
* **Configure Request Header(s)**:  
   * Useful if your endpoints are expecting specific incoming headers.
* **Header**:  
   * The HTTP request headers to send in the health monitor. It is recommended that you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

Note

To increase confidence in pool status, you can also increase the `consecutive_up` and `consecutive_down` fields when [creating a monitor with the API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/monitors/methods/create/).

To become healthy or unhealthy, monitored endpoints must pass this health monitor request the consecutive number of times specified in these parameters.

---

### Fallback pool

You also need to decide which of the associated pools in a load balancer should be the fallback pool.

This pool is meant to be the pool of last resort, meaning that its health is not taken into account when directing traffic.

Fallback pools are important because traffic still might be coming to your load balancer even when all the pools are unreachable (disabled or unhealthy). Your load balancer needs somewhere to route this traffic, so it will send it to the fallback pool.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/server-pool-health/#page","headline":"Server and pool health · Cloudflare Learning Paths","description":"Customize server and pool health thresholds.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/server-pool-health/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/planning/","name":"Planning your load balancer"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/planning/server-pool-health/","name":"Server and pool health"}}]}
```
