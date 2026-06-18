---
title: Rule categories
description: Categories of rules in the Network-layer DDoS Attack Protection managed ruleset.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rule categories

The main categories (or tags) of Network-layer DDoS Attack Protection managed rules are the following:

| Name      | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gre       | Rules for DDoS attacks over Generic Routing Encapsulation (GRE) that usually target GRE endpoints.                                                                                                                                                                                                                                                                                                                     |
| esp       | Rules for DDoS attacks related to the Encapsulating Security Payload (ESP) protocol, which is part of the IPsec secure network protocol suite.                                                                                                                                                                                                                                                                         |
| advanced  | Rules related to features available to Enterprise customers, such as [Adaptive DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/).                                                                                                                                                                                                                              |
| generic   | Rules for detecting and mitigating floods of packets. These rules are useful for mitigating attacks that have no known signatures, but they may also trigger on unusually high volumes of legitimate traffic. To reduce the risk of false positives, their packet per second (pps) activation threshold is higher. These rules rate-limit traffic by default, but you can override them to block traffic if necessary. |
| read-only | Highly targeted rules for mitigating DDoS attacks with a high confidence rate. These rules are read-only — you cannot override their sensitivity level or action.                                                                                                                                                                                                                                                      |
| test      | Rules used for testing the detection, mitigation, and alerting capabilities of Cloudflare's DDoS protection products.                                                                                                                                                                                                                                                                                                  |

There are other rule categories based on the attack vector/protocol, such as `dns`, `quic`, and `sip`. The categories list is dynamic and may change over time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/rule-categories/#page","headline":"Rule categories — Network-layer DDoS · Cloudflare DDoS Protection docs","description":"Categories of rules in the Network-layer DDoS Attack Protection managed ruleset.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/rule-categories/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/network/rule-categories/","name":"Rule categories"}}]}
```
