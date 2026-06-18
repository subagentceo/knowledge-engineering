---
title: Available skip options
description: Available skip options for WAF custom rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Available skip options

The following sections cover the available skip options in custom rules.

Note

If you configure a skip rule at the account level it will only affect other rules/phases configured at the account level, not at the zone level. To skip rules/phases at the zone level you must configure a skip rule at the zone level.

## Skip the remaining custom rules (current ruleset)

* Dashboard option: **All remaining custom rules**
* API action parameter: `ruleset`

Skips the remaining rules in the current ruleset.

## Skip phases

* Dashboard options: **All rate limiting rules**, **All Super Bot Fight Mode rules**, and **All managed rules**
* API action parameter: `phases`

Skips the execution of one or more phases. Based on the phases you can skip, this option effectively allows you to skip [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), [Super Bot Fight Mode rules](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/), and/or [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

The phases you can skip are the following:

* `http_ratelimit`
* `http_request_sbfm`
* `http_request_firewall_managed`

Refer to [Phases](https://developers.cloudflare.com/ruleset-engine/about/phases/) for more information.

Notes

Currently, you cannot skip [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/), only Super Bot Fight Mode.

Skipping a phase does not skip security products that run outside the Ruleset Engine, such as [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) or [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/). To skip those products, use the [Skip products](#skip-products) option instead.

## Skip products

* API action parameter: `products`

Skips specific security products that are not based on the Ruleset Engine. The products you can skip are the following:

| Product name in the dashboard                                                                                       | API value     |
| ------------------------------------------------------------------------------------------------------------------- | ------------- |
| [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/)                                         | zoneLockdown  |
| [User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/)                             | uaBlock       |
| [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/)                     | bic           |
| [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)                 | hot           |
| [Security Level](https://developers.cloudflare.com/waf/tools/security-level/)                                       | securityLevel |
| [Rate limiting rules (Previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/) | rateLimit     |
| [Managed rules (Previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/)   | waf           |

The API values in the table are case-sensitive.

## Skip the remaining custom rules (current phase)

* Dashboard option: N/A (currently only available via API)
* API action parameter: `phase`

Skips all the remaining rules in the current phase. If used in a custom ruleset (at the zone level), it will skip all remaining rules in the custom ruleset, as well as all later rules in the entry point ruleset where the rule executing the custom ruleset was defined.

Currently, this option is only available at the zone level for the `http_request_firewall_custom` phase. You can use it in custom rulesets or entry point rulesets.

## Other options

### Log requests matching the skip rule

* Dashboard option: **Log matching requests**
* API action parameter: `logging` \> `enabled` (boolean, optional)

When disabled, Cloudflare will not log any requests matching the current skip rule, and these requests will not appear in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).

If you do not specify this option in the API, the default value is `true` for custom rules with the skip action (logs requests matching the skip rule).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/skip/options/#page","headline":"Available skip options · Cloudflare Web Application Firewall (WAF) docs","description":"Available skip options for WAF custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/skip/options/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/skip/","name":"Configure a rule with the Skip action"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/skip/options/","name":"Available skip options"}}]}
```
