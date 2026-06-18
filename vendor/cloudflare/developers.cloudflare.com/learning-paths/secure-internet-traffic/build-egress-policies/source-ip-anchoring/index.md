---
title: Source IP anchoring
description: Anchor traffic to consistent source IPs.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Source IP anchoring

Source IP anchoring has become increasingly common recently as businesses begin to shift more traffic out of their office perimeter but still rely on their corporate IPs as a primary source of truth for trusted egress. Cloudflare understands the relevance of this model. Because subsequent backhauling and often single-threaded points of failure are inherent to static IP egress, Cloudflare offers several similar concepts that can help organizations transition from static IP egress to source IP anchoring. You can maintain your existing services, such as SaaS apps, while applying more granular and accurate control over access and data security.

The next section discusses best practices for migrating from managing backhauled user traffic in the context of IP allowlisting to delivering consistent security practices and IP consistency without sacrificing performance.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/#page","headline":"Source IP anchoring · Cloudflare Learning Paths","description":"Anchor traffic to consistent source IPs.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-egress-policies/","name":"Control traffic egress with source IP anchoring and allowlisting"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-egress-policies/source-ip-anchoring/","name":"Source IP anchoring"}}]}
```
