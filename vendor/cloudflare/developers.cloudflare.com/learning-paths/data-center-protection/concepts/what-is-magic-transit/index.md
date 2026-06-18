---
title: What is Magic Transit?
description: Understand Magic Transit DDoS protection for networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# What is Magic Transit?

Magic Transit is a network security and performance solution that offers Distributed Denial-of-Service (DDoS) protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

Magic Transit works at Layer 3 of the [OSI model ↗](https://www.cloudflare.com/en-gb/learning/ddos/glossary/open-systems-interconnection-model-osi/), protecting entire IP networks from DDoS attacks. Instead of relying on local infrastructure that can be overwhelmed by large DDoS attacks, Magic Transit uses the [global Cloudflare Network ↗](https://www.cloudflare.com/network/) to ingest and mitigate attacks close to their source.

Magic Transit delivers its connectivity, security, and performance benefits by serving as the front door to your IP network. This means it accepts IP packets destined for your network, processes them, and then forwards them to your origin infrastructure.

The Cloudflare network uses Border Gateway Protocol (BGP) to announce your company's IP address space, extending your network presence globally, and [anycast](https://developers.cloudflare.com/magic-transit/reference/gre-ipsec-tunnels/#anycast) to absorb and distribute attack traffic.

Once packets hit Cloudflare's network, traffic is inspected for attacks, filtered, steered, accelerated, and sent onward to your origin. Magic Transit users have two options for their implementation: ingress traffic or ingress and egress traffic. Users with an egress implementation will need to set up policy-based routing (PBR) or ensure default routing on their end forwards traffic to Cloudflare via tunnels.

For an in-depth explanation of Magic Transit, refer to [Magic Transit Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/what-is-magic-transit/#page","headline":"What is Magic Transit? · Cloudflare Learning Paths","description":"Understand Magic Transit DDoS protection for networks.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/concepts/what-is-magic-transit/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/data-center-protection/concepts/what-is-magic-transit/","name":"What is Magic Transit?"}}]}
```
