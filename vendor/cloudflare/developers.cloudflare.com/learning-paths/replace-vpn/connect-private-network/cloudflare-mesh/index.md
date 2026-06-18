---
title: Connect with Cloudflare Mesh
description: Connect your network using Cloudflare Mesh.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect with Cloudflare Mesh

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (formerly WARP Connector) connects your private networks to Cloudflare using the Cloudflare One Client (`warp-cli`) running in headless mode on a Linux server. Every enrolled device and node receives a private Mesh IP and can communicate with any other participant over TCP, UDP, or ICMP.

Mesh supports bidirectional traffic — devices can reach servers, servers can reach devices, and networks can reach other networks. This makes it the recommended approach for replacing a VPN, as it covers both user-to-network and network-to-network connectivity.

## Set up Cloudflare Mesh

To connect your private network using Cloudflare Mesh, refer to [Get started with Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/get-started/).

The setup wizard in the dashboard configures enrollment, device profiles, and connectivity settings automatically. Once a node is online, add [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) to make the subnet behind it reachable from any enrolled device.

## When to use Mesh

* Replacing a VPN for remote access to private networks
* Bidirectional connectivity (VoIP, SIP, Active Directory, SCCM, DevOps pipelines)
* Long-lived TCP connections sensitive to interruptions (SAP, database replication, ERP systems, RDP sessions)
* Site-to-site networking between offices, data centers, or cloud VPCs
* Client-to-client connectivity (two laptops reaching each other by private IP)
* Any L3/L4 workload where source IP preservation matters

## Best practices

* Enable [high availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) for production nodes with CIDR routes.
* Use [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to control which users and devices can reach specific resources.
* Refer to [Tips and best practices](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/tips/) for cloud VPC configuration and running alongside Cloudflare Tunnel.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/#page","headline":"Connect with Cloudflare Mesh · Cloudflare Learning Paths","description":"Connect your network using Cloudflare Mesh.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/","name":"Connect your private network"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/","name":"Connect with Cloudflare Mesh"}}]}
```
