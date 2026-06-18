---
title: Use indicator feeds to improve security policies
description: Enhance policies with threat indicator feeds.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use indicator feeds to improve security policies

When building DNS, network, or HTTP policies to block malicious activity for your organization, you can use external indicator feeds supplied by Cloudflare and other third-party providers.

## Subscribe to indicator feeds

Cloudflare threat intelligence data consists of a data exchange between providers and subscribers.

A provider is an organization that has a set of data that they are interested in sharing with other Cloudflare organizations. Any organization can be a provider. Examples of current providers are Government Cyber Defense groups.

Subscribers can be any Cloudflare customer that wants to secure their environment further by creating rules based on provider datasets. Subscribers must be authorized by a provider. Authorization is granted using the [Grant permission to indicator feed endpoint](https://developers.cloudflare.com/api/resources/intel/subresources/indicator%5Ffeeds/subresources/permissions/methods/create/).

To subscribe to an indicator feed, contact your account team. For more information, refer to [Custom Indicator Feeds](https://developers.cloudflare.com/security-center/indicator-feeds/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/indicator-feeds/#page","headline":"Use indicator feeds to improve security policies · Cloudflare Learning Paths","description":"Enhance policies with threat indicator feeds.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/indicator-feeds/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/","name":"Understand and streamline policy creation"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/indicator-feeds/","name":"Use indicator feeds to improve security policies"}}]}
```
