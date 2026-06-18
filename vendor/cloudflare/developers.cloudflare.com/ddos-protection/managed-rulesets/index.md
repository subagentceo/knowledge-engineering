---
title: Managed rulesets
description: Pre-configured DDoS rulesets that protect against attacks at layers 3, 4, and 7.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed rulesets

The DDoS Attack Protection managed rulesets provide comprehensive protection against a [variety of DDoS attacks](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/) across L3/4 (network layer) and L7 (application layer) of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/).

The available managed rulesets are:

* **[HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/)**  
   * This ruleset includes rules to detect and mitigate DDoS attacks over HTTP and HTTPS.
* **[Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/)**  
   * This ruleset includes rules to detect and mitigate DDoS attacks on L3/4 of the OSI model such as UDP floods, SYN-ACK reflection attacks, SYN Floods, and DNS floods.

---

## Proactive false positive detection for new rules

Note

Only available on Business and Enterprise plans.

When Cloudflare creates a new managed rule, we check the rule impact against the traffic of Business and Enterprise zones while the rule is not blocking traffic yet.

If a [false positive](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/#legitimate-traffic-is-incorrectly-identified-as-an-attack-and-causes-a-false-positive) is detected, we proactively reach out to the affected customers and help them make configuration changes (for example, to lower the sensitivity level of the new rule) before the rule starts mitigating traffic. This prevents the new rule from causing service disruptions and outages to your Internet properties.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/#page","headline":"Managed rulesets · Cloudflare DDoS Protection docs","description":"Pre-configured DDoS rulesets that protect against attacks at layers 3, 4, and 7.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}}]}
```
