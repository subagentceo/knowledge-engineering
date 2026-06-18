---
title: Cloudflare DDoS Protection
description: Detect and mitigate DDoS attacks automatically across all Cloudflare plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare DDoS Protection

Detect and mitigate distributed denial-of-service (DDoS) attacks automatically.

 Available on all plans 

Cloudflare automatically detects and mitigates [distributed denial-of-service (DDoS) attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) via our autonomous DDoS systems.

These systems include multiple dynamic mitigation rules exposed as [DDoS attack protection managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/). You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

---

## Features

###  Managed rulesets 

Protect against a variety of DDoS attacks across layers 3/4 (network layer) and layer 7 (application layer) of the OSI model.

[ Use Managed rulesets ](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) 

###  Adaptive DDoS Protection 

Get increased protection against sophisticated DDoS attacks on layer 7 and layers 3/4.

[ Use Adaptive DDoS Protection ](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/) 

###  Advanced TCP Protection 

Detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, or SYN and SYN-ACK floods.

[ Use Advanced TCP Protection ](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) 

###  Advanced DNS Protection 

Protect against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as random prefix attacks.

[ Use Advanced DNS Protection ](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) 

###  Programmable Flow Protection 

Deploy custom eBPF packet logic across Cloudflare's network to inspect and mitigate DDoS attacks against UDP-based Layer 7 protocols.

[ Use Programmable Flow Protection ](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) 

---

## Availability

| Free                                                   | Pro                                                                                      | Business                                                                                 | Enterprise                                                                               | Enterprise with Advanced DDoS Protection add-on                                          |                                                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Availability                                           | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Standard, unmetered DDoS protection (layers 3-7)       | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| HTTP DDoS attack protection                            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Network-layer (L3/4) DDoS attack protection            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Managed rules customization                            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes, with Log action                                                                     | Expression fields & multi-rule support                                                   |
| Proactive false positive detection for new rules       | No                                                                                       | No                                                                                       | No                                                                                       | Yes                                                                                      | Yes                                                                                      |
| Adaptive DDoS protection                               | Only error adaptive rules                                                                | Only error adaptive rules                                                                | Only error adaptive rules                                                                | Only error adaptive rules                                                                | All adaptive rules                                                                       |
| Traffic profiling signals for adaptive DDoS protection | Error rates only                                                                         | Error rates only                                                                         | Error rates & historical trends                                                          | Error rates & historical trends                                                          | Error rates & historical trends, client country, user agent, query string, ML-scores     |
| Advanced TCP Protection                                | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers |
| Advanced DNS Protection                                | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers |
| Number of ruleset overrides allowed                    | 1                                                                                        | 1                                                                                        | 1                                                                                        | 1                                                                                        | 10                                                                                       |
| Alerts                                                 | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Advanced alerts with filtering                                                           |

---

## Related products

**[Spectrum](https://developers.cloudflare.com/spectrum/)** 

Provides security and acceleration for any TCP or UDP based application.

**[Magic Transit](https://developers.cloudflare.com/magic-transit/)** 

A network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

**[Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/)** 

Get automatic protection from vulnerabilities and the flexibility to create custom rules.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ddos-protection/#page","headline":"Overview · Cloudflare DDoS Protection docs","description":"Detect and mitigate DDoS attacks automatically across all Cloudflare plans.","url":"https://developers.cloudflare.com/ddos-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}}]}
```
