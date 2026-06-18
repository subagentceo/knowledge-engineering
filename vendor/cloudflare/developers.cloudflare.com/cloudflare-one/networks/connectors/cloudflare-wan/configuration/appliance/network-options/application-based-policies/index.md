---
title: Application-aware policies
description: How Application-aware policies works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application-aware policies

Standard traffic policies match on network-layer attributes like IP addresses and port ranges. Application-aware policies go further — they identify traffic by the application generating it, so you can make routing and security decisions based on what the traffic is, not just where it is going.

Cloudflare One Appliance (formerly Magic WAN Connector) classifies traffic using the same application categories used across Cloudflare's [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/policies/gateway/). This means routing decisions on the Appliance and security policies in Gateway use the same application definitions.

For the full list of recognized applications and categories, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/policies/gateway/application-app-types/).

With application-aware policies, you can:

* **Break out traffic directly to the Internet** — route specific applications directly to the Internet from the Appliance, bypassing Cloudflare's security filtering.
* **Prioritize traffic** — assign higher priority to specific applications so the Appliance processes them first when the network is congested.

For details, refer to the following pages:

* [ Breakout traffic ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/)
* [ Prioritized traffic ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/#page","headline":"Application-aware policies · Cloudflare One docs","description":"How Application-aware policies works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","name":"Application-aware policies"}}]}
```
