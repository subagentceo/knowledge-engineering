---
title: Build network security policies
description: Secure Internet traffic and SaaS apps.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build network security policies

After creating policies for security based on DNS resolution, we can layer in additional security controls with the Gateway network firewall, which operates at Layer 4 of the OSI model. The Gateway network firewall allows you to build specific policies to block users or services' ability to connect to endpoints at specific IPs or on specific ports. You can also use [Protocol Detection ↗](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) to block proxying specific protocols.

## Objectives

By the end of this module, you will be able to:

* Creat your first Gateway network policy.
* Add recommended network security policies.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/#page","headline":"Build network security policies · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-network-policies/","name":"Build network security policies"}}]}
```
