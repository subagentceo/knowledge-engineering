---
title: Traffic types
description: How Traffic types works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traffic types

Cloudflare Network Firewall enables you to allow or block traffic on a variety of packet characteristics, including:

* **Source and destination IP** — the sender's and receiver's IP addresses
* **Source and destination port** — the numeric port identifying the specific service (for example, port 80 for HTTP)
* **Protocol** — the communication method, such as TCP or UDP
* **Packet length** — the size of the packet in bytes
* **Bit field match** — inspect individual flags within packet headers

Cloudflare Network Firewall operates at OSI layers 3 and 4 — the network layer (IP addressing and routing) and transport layer (port-based connections). It supports protocols such as TCP (reliable, ordered connections), UDP (fast, connectionless messages), and ICMP (network diagnostic messages like ping). You can write rules against any layer 3 or 4 protocol, not only TCP and UDP.

To see the full list of fields you can use when writing filter expressions, refer to [Cloudflare Network Firewall fields](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/traffic-types/#page","headline":"Traffic types · Cloudflare One docs","description":"How Traffic types works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/traffic-types/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP","UDP","ICMP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/traffic-types/","name":"Traffic types"}}]}
```
