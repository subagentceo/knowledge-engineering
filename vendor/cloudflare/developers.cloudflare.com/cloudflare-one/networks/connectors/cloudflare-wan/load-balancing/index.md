---
title: Load Balancing
description: How Load Balancing works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Load Balancing

If your network has multiple paths to the same destination — for example, redundant tunnels to a data center — you can use Cloudflare Load Balancing to distribute traffic across those paths. This prevents any single path from becoming a bottleneck and allows traffic to fail over automatically if a path goes down.

Cloudflare WAN (formerly Magic WAN) uses Private Network Load Balancing, which balances traffic across your private network endpoints. It supports both on-ramping (traffic entering Cloudflare's network) and off-ramping (traffic exiting to your sites).

Refer to [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) for more information about the feature and how to set it up. Before using this feature, [enable Load Balancing](https://developers.cloudflare.com/load-balancing/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/load-balancing/#page","headline":"Load Balancing · Cloudflare One docs","description":"How Load Balancing works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/load-balancing/","name":"Load Balancing"}}]}
```
