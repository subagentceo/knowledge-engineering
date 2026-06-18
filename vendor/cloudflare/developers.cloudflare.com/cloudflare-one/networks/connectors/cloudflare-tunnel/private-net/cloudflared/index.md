---
title: Connect with cloudflared
description: How Connect with cloudflared works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect with cloudflared

`cloudflared` is a daemon that runs on a host machine in your private network and proxies traffic from Cloudflare to local services. The tunnel created by `cloudflared` is outbound-only, meaning it only handles requests initiated from a user to your private network. Server-initiated requests (from applications behind the tunnel) use the server's default routing table and do not pass through the tunnel.

On the client side, end users connect to Cloudflare's global network using the Cloudflare One Client. The Cloudflare One Client can be rolled out to your entire organization in just a few minutes using your in-house MDM tooling. When users connect to an IP address or hostname made available through Cloudflare Tunnel, WARP sends their connection through Cloudflare's network and down the corresponding tunnel to the internal service. Traffic to services behind the tunnel will carry the local source IP address of the host machine running the `cloudflared` daemon.

![Diagram displaying connections between a device, Cloudflare, and a private network.](https://developers.cloudflare.com/_astro/private-ips-diagram.BXgaklt9_7ovDi.webp) 

To enable remote access to your private network, refer to the following guides:

* [**Connect a private hostname**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/): Route network traffic to an internal application using its hostname.
* [**Connect an IP/CIDR**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/): Route traffic to an internal IP address or CIDR range.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#page","headline":"Connect with cloudflared · Cloudflare One docs","description":"How Connect with cloudflared works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/","name":"Connect with cloudflared"}}]}
```
