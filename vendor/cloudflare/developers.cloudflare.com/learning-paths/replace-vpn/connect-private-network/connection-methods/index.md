---
title: Choose a connection method
description: Compare Cloudflare Mesh and Tunnel options.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Choose a connection method

There are [multiple ways](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks) to onramp traffic from your private networks to Cloudflare. This page covers the two software-based methods commonly used for VPN replacement: Cloudflare Mesh and Cloudflare Tunnel. Both involve installing lightweight software on a host machine in your network to create a secure connection to Cloudflare's global network.

## Cloudflare Mesh

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) (formerly WARP Connector) runs the Cloudflare One Client (`warp-cli`) in headless mode on a Linux server. It operates as a Layer 3 proxy, supports bidirectional traffic (TCP, UDP, ICMP), and assigns a private Mesh IP to every participant. Use Mesh when you need:

* User-to-network access (replacing a VPN)
* Network-to-network / site-to-site connectivity
* Server-initiated connections (VoIP, SIP, AD updates, SCCM, DevOps)
* Client-to-client connectivity between enrolled devices

## Cloudflare Tunnel

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) runs the `cloudflared` daemon on a host machine. It creates an outbound-only connection and proxies traffic from Cloudflare to your internal applications or network. Use Tunnel when you need:

* Publishing specific applications by hostname
* Outbound-only connectivity (no inbound ports opened)
* Proxying HTTP/S, TCP, or SSH traffic to specific services
* Running on non-Linux platforms (macOS, Windows)

## Comparison table

| Cloudflare Mesh       | Cloudflare Tunnel                                                      |                                                                                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bidirectional traffic | ✅                                                                      | ❌                                                                                                                                                                                                                                                 |
| High availability     | ✅ (active-passive)                                                     | ✅ (active-active replicas)                                                                                                                                                                                                                        |
| Source IP of request  | Virtual IP of requesting device                                        | cloudflared host machine                                                                                                                                                                                                                          |
| Host machine          | Linux (amd64, arm64)                                                   | Linux, macOS, Windows                                                                                                                                                                                                                             |
| IPv4                  | ✅                                                                      | ✅                                                                                                                                                                                                                                                 |
| IPv6                  | ✅                                                                      | ✅                                                                                                                                                                                                                                                 |
| OSI layer             | L3                                                                     | L7                                                                                                                                                                                                                                                |
| Protocol              | MASQUE                                                                 | QUIC or HTTP/2                                                                                                                                                                                                                                    |
| Protocols proxied     | TCP, UDP, ICMP                                                         | HTTP/S, TCP, SSH, RDP, SMB                                                                                                                                                                                                                        |
| Connection handling   | End-to-end — preserves long-lived TCP connections across the full path | Proxied — TCP connections are terminated and re-established at Cloudflare, which can interrupt long-lived sessions (for example, SAP transactions, database replication streams, or persistent RDP sessions may drop when cloudflared reconnects) |

## Recommendation

For most VPN replacement scenarios, [Cloudflare Tunnel](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflared/) is the easiest way to get started. It runs on all platforms (Linux, macOS, Windows, containers, Raspberry Pi), does not require return route configuration (traffic is source-NATed to the `cloudflared` host), and does not interfere with existing VPN software on the same machine.

Use [Cloudflare Mesh](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/cloudflare-mesh/) when you need bidirectional connectivity with server-initiated traffic (VoIP, SIP, AD updates, SCCM), site-to-site networking between multiple locations, deployments where preserving the original source IP is important, or workloads with long-lived TCP connections sensitive to interruptions (SAP, database replication, ERP systems).

Both methods can be used together. For example, use Tunnel for straightforward user-to-application access and add Mesh nodes where you need bidirectional or site-to-site connectivity.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/connection-methods/#page","headline":"Choose a connection method · Cloudflare Learning Paths","description":"Compare Cloudflare Mesh and Tunnel options.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/connection-methods/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/","name":"Connect your private network"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/connection-methods/","name":"Choose a connection method"}}]}
```
