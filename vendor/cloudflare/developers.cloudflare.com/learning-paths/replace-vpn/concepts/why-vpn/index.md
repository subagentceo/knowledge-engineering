---
title: Why should you replace your VPN?
description: Learn benefits of Zero Trust over VPNs.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Why should you replace your VPN?

Many organizations rely on VPNs to protect their data, but for many reasons, VPNs are often not ideal for defending against today's risks.

## Downsides of a VPN

VPNs invoke a perimeter-based security model (often called the [castle-and-moat model ↗](https://www.cloudflare.com/learning/access-management/castle-and-moat-network-security/)), which grant users access to the entire internal network once they login to the VPN client. In castle-and-moat security, it is hard to obtain access from outside the network, but everyone inside the network is trusted by default. The problem with this approach is that once an attacker gains access to the network, they have free rein over everything inside. In the modern digital landscape, where users can access resources from various locations and devices, this concept of a fixed perimeter is no longer effective.

## ZTNA vs. VPNs

[Zero Trust Network Access (ZTNA) ↗](https://www.cloudflare.com/learning/access-management/what-is-ztna/) is the main technology that enables organizations to transition from a traditional VPN configuration to a more secure and modern approach.

**Insider threats** — ZTNA enhances security by assuming that threats may exist both inside and outside the network. Whereas a VPN implicitly trusts all logged-in users, ZTNA emphasizes the [principle of least privilege ↗](https://www.cloudflare.com/learning/access-management/principle-of-least-privilege/) and enforces continuous verification of user identity.

**Network security** — A ZTNA architecture reduces the blast radius of potential threats by facilitating network [micro-segmentation ↗](https://www.cloudflare.com/learning/access-management/what-is-microsegmentation/). Unlike VPNs, which grant users access to the entire corporate network, ZTNA only grants access to a specific application and denies access to all other resources by default.

**Performance** — ZTNA connects users to corporate networks via [the cloud ↗](https://www.cloudflare.com/learning/cloud/what-is-the-cloud/) instead of via on-premise VPN servers. This enables users to connect from anywhere without experiencing performance degradation and integrates more easily with cloud-based infrastructure.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/why-vpn/#page","headline":"Why should you replace your VPN? · Cloudflare Learning Paths","description":"Learn benefits of Zero Trust over VPNs.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/why-vpn/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/concepts/why-vpn/","name":"Why should you replace your VPN?"}}]}
```
