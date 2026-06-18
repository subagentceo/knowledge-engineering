---
title: Bandwidth measurement
description: How Bandwidth measurement works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bandwidth measurement

Cloudflare measures Cloudflare WAN (formerly Magic WAN) usage based on the 95th percentile of bandwidth utilized by your configured network. This measurement reflects your overall network capacity consumption.

## How bandwidth is measured

Cloudflare WAN bandwidth includes the sum of traffic routed to and from the Cloudflare WAN network namespace across all your connections. This measurement includes traffic from the following tunnel types:

* [GRE (Generic Routing Encapsulation) ↗](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/)
* [IPsec (Internet Protocol Security) ↗](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/)
* [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)

For each tunnel, Cloudflare uses the highest 95th percentile value (ingress or egress traffic). The usage measurement excludes [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) traffic.

## 95th percentile calculation

The 95th percentile method is an industry-standard approach to bandwidth measurement that accounts for short traffic spikes. By discarding the highest 5% of samples, the measurement reflects your sustained bandwidth usage rather than momentary peaks.

To calculate the 95th percentile, Cloudflare records bandwidth to and from the global network at five-minute intervals, sorts these measurements in descending order, and discards the top 5% of recorded measurements. The highest remaining value is the 95th percentile bandwidth measurement for that time period.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/bandwidth-measurement/#page","headline":"Bandwidth measurement · Cloudflare One docs","description":"How Bandwidth measurement works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/bandwidth-measurement/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/reference/","name":"Reference"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/reference/bandwidth-measurement/","name":"Bandwidth measurement"}}]}
```
