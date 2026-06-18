---
title: Threat intelligence
description: Match incoming requests against Cloudforce One threat intelligence in WAF rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Threat intelligence

The threat intelligence detection matches incoming requests against indicators in the [Cloudforce One](https://developers.cloudflare.com/security-center/cloudforce-one/) threat intelligence database. The detection matches on client IP address. If the IP was involved in threat activity in the past seven days, Cloudflare populates [threat intelligence fields](https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/) you can use in WAF rule expressions.

You can use these fields in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to match on:

* Known threat actor names (`cf.intel.ip.attacker_names`)
* Industries the IP address has targeted (`cf.intel.ip.target_industries`)
* Source and target countries of threat activity (`cf.intel.ip.attacker_countries`, `cf.intel.ip.target_countries`)
* The dataset that flagged the IP address (`cf.intel.ip.datasets` — values: `ddos`, `waf`)

You can review matches in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to see which threat actors and campaigns are reaching your application.

Warning

IP addresses are often shared through NAT, proxies, and cloud providers. Test rules with the _Log_ action first and combine threat intelligence with other signals — such as [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) — before you block.

## Data freshness

The threat intelligence database reflects a rolling seven-day window:

* An IP address flagged earlier in the window still matches, even if the threat is no longer active.
* An IP address ages out seven days after the last observed activity. Rules that matched it stop matching with no notification.

## Availability

Requires an active [Cloudforce One](https://developers.cloudflare.com/security-center/cloudforce-one/) subscription. Contact your account team for access.

The WAF must be enabled on your zone before threat intelligence fields can be used in rule expressions.

## More resources

* [Threat intelligence fields](https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/) — Available fields and matching behavior.
* [Get started](https://developers.cloudflare.com/waf/detections/threat-intelligence/get-started/) — Create your first threat intelligence rule.
* [Threat Events](https://developers.cloudflare.com/security-center/cloudforce-one/) — Investigate threats in the Cloudforce One dashboard.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/threat-intelligence/#page","headline":"Threat intelligence · Cloudflare Web Application Firewall (WAF) docs","description":"Match incoming requests against Cloudforce One threat intelligence in WAF rules.","url":"https://developers.cloudflare.com/waf/detections/threat-intelligence/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Threat Intelligence"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/threat-intelligence/","name":"Threat intelligence"}}]}
```
