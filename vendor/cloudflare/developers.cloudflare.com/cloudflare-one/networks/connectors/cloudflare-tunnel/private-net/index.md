---
title: Private networks
description: How Private networks works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Private networks

With Cloudflare Zero Trust, you can connect private networks and the services running in those networks to Cloudflare's global network. This involves installing a [connector](#connectors) on the private network, and then [setting up routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2b-connect-a-network) which define the IP addresses available in that environment. Unlike [published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), private network routes can expose both HTTP and non-HTTP resources.

To reach private network IPs, end users must connect their device to Cloudflare and enroll in your Zero Trust organization. The most common method is to install the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on their device, or you can onboard their network traffic to Cloudflare using [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/), or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-tunnel/).

Administrators can optionally set [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to control access to services based on user identity and device posture.

## Connectors

Here are the different ways you can connect your private network to Cloudflare:

* [**Cloudflare Mesh**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) creates a private network between mesh nodes, client devices, and the services behind them. Each participant is assigned a [Mesh IP](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#device-ips) for direct connectivity. Mesh nodes install on a Linux server and act as subnet routers for site-to-site, bidirectional, and mesh networking. Client devices install the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) for device-to-device and device-to-network connectivity.
* [**Cloudflare Tunnel (cloudflared)**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) installs on a server in your private network and creates a secure, outbound-only tunnel to Cloudflare. `cloudflared` only proxies traffic initiated from a user to a server. Any service or application running behind the tunnel will use the server's default routing table for server-initiated connectivity.
* [**Cloudflare WAN**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/) connects entire network locations to Cloudflare using anycast GRE or IPsec tunnels configured on your existing networking equipment.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/#page","headline":"Private networks · Cloudflare One docs","description":"How Private networks works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/","name":"Private networks"}}]}
```
