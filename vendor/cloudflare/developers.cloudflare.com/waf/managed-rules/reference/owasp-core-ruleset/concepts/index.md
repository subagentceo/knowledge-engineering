---
title: Concepts
description: Concepts for the OWASP ModSecurity Core Ruleset on Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

## Paranoia level

The paranoia level (PL) classifies OWASP rules according to their aggressiveness. Paranoia levels vary from PL1 to PL4, where PL4 is the most strict level:

* PL1 (default value)
* PL2
* PL3
* PL4

Each rule in the OWASP managed ruleset is associated with a paranoia level. Rules associated with higher paranoia levels are considered more aggressive and provide increased protection. However, they might cause more legitimate traffic to get blocked due to false positives.

When you configure the paranoia level of the OWASP ruleset, you are enabling all the rules belonging to all paranoia levels up to the level you select. For example, if you configure the ruleset paranoia level to PL3, you are enabling rules belonging to paranoia levels PL1, PL2, and PL3.

When you set the ruleset paranoia level, the WAF enables the corresponding rules in bulk. You then can disable specific rules individually or by tag, if needed. If you use the highest paranoia level (PL4) you will probably need to disable some of its rules for applications that need to receive complex input patterns.

## Request threat score

Each OWASP rule that matches the current request has an associated score. The request threat score is the sum of the individual scores of all OWASP rules that matched the request.

## Score threshold

The score threshold (or anomaly threshold) defines the minimum cumulative score — obtained from matching OWASP rules — for the WAF to apply the configured OWASP ruleset action.

The available score thresholds are the following:

* _Low – 60 and higher_
* _Medium – 40 and higher_ (default value)
* _High – 25 and higher_

Each threshold (_Low_, _Medium_, and _High_) has an associated value (_60_, _40_, and _25_, respectively). Configuring a _Low_ threshold means that more rules will have to match the current request for the WAF to apply the configured ruleset action.

When the OWASP Anomaly Score Threshold is set to _High_, file uploads may trigger the `949110: Inbound Anomaly Score Exceeded` rule due to the lower amount of scoring rules needed. Consider [adjusting the score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#ruleset-level-configuration), [adjusting individual rules](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#rule-level-configuration) in the ruleset, or [creating an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) if excessive false positives occur.

For an example, refer to [OWASP evaluation example](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#page","headline":"OWASP ruleset concepts · Cloudflare Web Application Firewall (WAF) docs","description":"Concepts for the OWASP ModSecurity Core Ruleset on Cloudflare.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/","name":"Cloudflare OWASP Core Ruleset"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/concepts/","name":"Concepts"}}]}
```
