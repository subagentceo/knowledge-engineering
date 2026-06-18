---
title: Network analytics
description: Network analytics in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network analytics

You can access real-time and historical network data in Network Analytics. Explore Cloudflare WAN traffic (in packets or bytes) over time in a time series, and filter the data by different [packet](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) characteristics.

Data is aggregated into time intervals that vary based on the selected zoom level. For example, a daily view shows 24-hour averages, which can flatten short-term traffic spikes. As a result, longer time intervals display lower peak bandwidth values compared to more granular views like five-minute intervals.

For details, refer to the [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) documentation.

## Network traffic data filters

With Cloudflare WAN, you have increased insight into traffic flows across Cloudflare One products, including:

* Traffic entering Cloudflare's network via the Cloudflare One Client
* Traffic leaving Cloudflare's network via the Cloudflare One Client
* Traffic leaving Cloudflare's network via Cloudflare Tunnel (`cloudflared`)

The complete list of filters includes:

* A list of your top tunnels by traffic volume.
* Traffic source and destination by traffic type, on-ramps and off-ramps, IP addresses, and ports.
* Destination IP ranges and ASNs.
* Protocols and packet sizes.
* Samples of all GRE or IPsec tunnel traffic entering or leaving Cloudflare's network.
* Mitigations applied (such as DDoS and Cloudflare Network Firewall) to traffic entering Cloudflare's network.

For instructions, refer to [Access tunnel traffic analytics](#access-tunnel-traffic-analytics).

## Access tunnel traffic analytics

1. Go to the **Network Analytics** page.
[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics) 
1. In the **All Traffic** tab, scroll to **Top Insights** to access network traffic filters. By default, the dashboard displays five items, but you can display up to 25 items at once. To change the number of items, select the drop-down menu.
2. (Optional) Hover over a traffic type. You can then filter for that traffic or exclude it from the results.
3. To adjust the scope of information, scroll to **All traffic** \> **Add filter**.
4. In the **New filter** popover, select the data type from the left drop-down menu, an operator from the middle drop-down menu, and an action from the right drop-down menu. For example:  
```  
<DESTINATION_TUNNELS> | _equals_ | <NAME_OF_YOUR_TUNNEL>  
```  
This lets you examine traffic from specific Source tunnels and/or Destination tunnels.

## Feature notes

* For Cloudflare WAN, `Non-Tunnel traffic` refers to traffic outside GRE or IPsec tunnels. This can include traffic from:  
   * [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)  
   * [CNIs](https://developers.cloudflare.com/network-interconnect/)  
   * Traffic destined for the public Internet via [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)  
   * Traffic destined for applications behind [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)

The label `Non-Tunnel traffic` is a placeholder, and Cloudflare will apply more specific labels to this category of traffic in the future.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/analytics/network-analytics/#page","headline":"Cloudflare WAN Network Analytics · Cloudflare One docs","description":"Network analytics in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/analytics/network-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/analytics/","name":"Analytics"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/analytics/network-analytics/","name":"Network analytics"}}]}
```
