---
title: Build DNS security policies
description: Secure Internet traffic and SaaS apps.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build DNS security policies

DNS security is an important, wide-reaching, and early action in the lifecycle of a request. Cloudflare operates one of the world's largest and fastest public DNS resolvers. Your users' public DNS requests will be resolved by that same resolution engine -- whether they are connecting from a network pointing its resolvers to Cloudflare or an endpoint running the Cloudflare One Client.

## Objectives

By the end of this module, you will be able to:

* Create your first Gateway DNS policy.
* Build an allow or block list for use in firewall policies.
* Onboard networks to Gateway to filter DNS queries.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/#page","headline":"Build DNS security policies · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-dns-policies/","name":"Build DNS security policies"}}]}
```
