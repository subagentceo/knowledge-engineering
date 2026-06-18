---
title: Advertise prefixes
description: Advertise IP prefixes via Magic Transit.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advertise prefixes

Once pre-flight checks are completed, Cloudflare unlocks your prefixes for you to [advertise via the dashboard, API or BGP](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/) at a time of your choosing. Refer to [Dynamic advertisement best practices](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/) to learn more about advertising prefixes.

If you are using a Cloudflare IP, you do not need to advertise your prefixes.

Warning

You must [put the appropriate MSS clamps](#set-maximum-segment-size) in place before [routing ↗](https://www.cloudflare.com/learning/network-layer/what-is-routing/) changes are made. Failure to apply an MSS clamp can result in dropped packets and hard-to-debug connectivity issues.

Also, when using [Cloudflare Network Interconnect](https://developers.cloudflare.com/magic-transit/network-interconnect/) with Magic Transit you must set the following MSS clamp sizes to accommodate additional overhead:

* GRE tunnels over CNI with Dataplane v1: 1476 bytes
* CNI with Dataplane v2 / CNI with Dataplane v1 with a maximum transmission unit (MTU) size of 1500 bytes handoff does not require an MSS clamp.

MSS clamps are used to backhaul data from the data center where traffic is ingested (close to the end user) to the facility with the CNI link.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/advertise-prefixes/#page","headline":"Advertise prefixes · Cloudflare Learning Paths","description":"Advertise IP prefixes via Magic Transit.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/advertise-prefixes/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/advertise-prefixes/","name":"Advertise prefixes"}}]}
```
