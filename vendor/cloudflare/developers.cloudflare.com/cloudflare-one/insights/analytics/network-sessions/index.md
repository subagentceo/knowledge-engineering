---
title: Network session analytics
description: Reference information for Network session analytics in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network session analytics

The Network session analytics dashboard provides visibility into your Cloudflare One traffic patterns. This dashboard helps you understand how traffic flows through your network, including on-ramps (how traffic enters Cloudflare, such as the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), [proxy endpoints (PAC files)](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/), [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/), or Cloudflare Tunnel) and off-ramps (how traffic exits Cloudflare, such as the public Internet or a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)).

The dashboard is based on the [Zero Trust network sessions Logpush dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/). For definitions on any field, refer to the dataset schema documentation.

To review Network session analytics:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Dashboards**.
2. Select **Network session analytics**.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Use cases

The Network session analytics dashboard helps you:

* **Understand traffic patterns**: Visualize how traffic flows through your network infrastructure.
* **Monitor bandwidth usage**: Track upload, download, and total bytes transferred across your network.
* **Identify connection issues**: Analyze connection close reasons to troubleshoot network problems.
* **Track user and device activity**: Monitor unique users and devices accessing your network.

## Provided analytics

### Summary metrics

* **Session count**: Total number of network sessions. Each session represents an individual TCP, UDP, ICMP, or ICMPv6 flow that passes through Gateway.
* **Bytes total**: Total bytes transferred (upload + download)
* **Unique users**: Number of distinct users

### Traffic by location

* **World map**: Geographic visualization of network traffic by the Cloudflare data center where traffic entered the network (ingress) and where it exited (egress)
* **Location list**: Top Cloudflare data center locations by ingress and egress session count with accompanying graph
* **Change**: Shows the total change across ingress and egress for each location

### Top analytics

* **Top protocols**: Most used network protocols (TCP, UDP, ICMP, ICMPv6)
* **Top connection close reasons**: Common reasons for session termination:  
   * Client closed  
   * Origin closed  
   * Client idle timeout  
   * Client error  
   * Unknown  
   * Client TLS error  
   * Origin unreachable  
   * Too many new sessions for user  
   * Origin TLS error  
   * Origin unroutable

For the full list of reasons for session termination, refer to [ConnectionCloseReason](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/#connectionclosereason).

## Related resources

* [Zero Trust network sessions Logpush dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/): View detailed logs for individual network sessions.
* [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/): Configure policies that apply to network traffic.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/network-sessions/#page","headline":"Network session analytics · Cloudflare One docs","description":"Reference information for Network session analytics in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/network-sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/network-sessions/","name":"Network session analytics"}}]}
```
