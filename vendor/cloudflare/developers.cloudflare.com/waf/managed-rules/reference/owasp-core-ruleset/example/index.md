---
title: OWASP evaluation example
description: Example of how OWASP paranoia level and score threshold interact.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OWASP evaluation example

The following example calculates the OWASP request threat score for an incoming request. The OWASP managed ruleset configuration is the following:

* OWASP Anomaly Score Threshold: _High - 25 and higher_
* OWASP Paranoia Level: _PL3_
* OWASP Action: _Managed Challenge_

This table shows the progress of the OWASP ruleset evaluation:

| Rule ID     | Paranoia level | Rule matched?   | Rule score | Cumulativethreat score |
| ----------- | -------------- | --------------- | ---------- | ---------------------- |
| –           | –              | –               | –          | 0                      |
| ...1813a269 | PL3            | Yes             | +5         | 5                      |
| ...ccc02be6 | PL3            | No              | –          | 5                      |
| ...96bfe867 | PL2            | Yes             | +5         | 10                     |
| ...48b74690 | PL1            | Yes             | +5         | 15                     |
| ...3297003f | PL2            | Yes             | +3         | 18                     |
| ...317f28e1 | PL1            | No              | –          | 18                     |
| ...682bb405 | PL2            | Yes             | +5         | 23                     |
| ...56bb8946 | PL2            | No              | –          | 23                     |
| ...e5f94216 | PL3            | Yes             | +3         | 26                     |
| (...)       | (...)          | (...)           | (...)      | (...)                  |
| ...f3b37cb1 | PL4            | (not evaluated) | –          | 26                     |

Final request threat score: `26`

Since `26` \>= `25` — that is, the threat score is greater than the configured score threshold — Cloudflare will apply the configured action (_Managed Challenge_). If you had configured a score threshold of _Medium - 40 and higher_, Cloudflare would not apply the action, since the request threat score would be lower than the score threshold (`26` < `40`).

[**Sampled logs** in Security Events](https://developers.cloudflare.com/waf/analytics/security-events/#sampled-logs) would display the following details for the example incoming request handled by the OWASP Core Ruleset:

![Event log for example incoming request mitigated by the OWASP Core Ruleset](https://developers.cloudflare.com/_astro/owasp-example-event-log.B3Lc0T9C_2mq13Y.webp) 

In sampled logs, the rule associated with requests mitigated by the Cloudflare OWASP Core Ruleset is the last rule in this managed ruleset: `949110: Inbound Anomaly Score Exceeded`, with rule ID ...843b323c . To get the scores of individual rules contributing to the final request threat score, expand **Additional logs** in the event details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/#page","headline":"OWASP evaluation example · Cloudflare Web Application Firewall (WAF) docs","description":"Example of how OWASP paranoia level and score threshold interact.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/","name":"Cloudflare OWASP Core Ruleset"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/example/","name":"OWASP evaluation example"}}]}
```
