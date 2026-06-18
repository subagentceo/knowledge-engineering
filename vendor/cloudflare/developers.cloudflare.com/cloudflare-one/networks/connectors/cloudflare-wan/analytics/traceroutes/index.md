---
title: Traceroutes
description: Traceroutes in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traceroutes

You can run traceroutes to analyze the hop-by-hop Internet path and latency between Cloudflare's network and your network.

To run a traceroute from a specific Cloudflare data center to your network:

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/) \> **Insights**.
2. Go to **Network health** \> **WAN connector health**.
3. Find the tunnel for the traceroute.
4. Select the three dots > **Traceroute details**.

You can access detailed data from the traceroute, including:

* Time to live (TTL) and host
* Autonomous system (AS) number
* [Packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) sent in the traceroute
* Average, minimum, and maximum latency
* Standard deviation of latency

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/analytics/traceroutes/#page","headline":"Traceroutes · Cloudflare One docs","description":"Traceroutes in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/analytics/traceroutes/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/analytics/","name":"Analytics"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/analytics/traceroutes/","name":"Traceroutes"}}]}
```
