---
title: Rule phase interactions
description: Understand how request rewrites, IP Access rules, custom rules, and managed rules interact across WAF phases.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rule phase interactions

Cloudflare evaluates request processing features in [phases](https://developers.cloudflare.com/ruleset-engine/about/phases/). A rule that appears correct in isolation can behave differently when another product has already modified or terminated the request.

## Custom rules are evaluated against the rewritten URL

Cloudflare applies [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/) before [custom rules](https://developers.cloudflare.com/waf/custom-rules/).

If a transform rule rewrites `/public-login` to `/internal/login`, later WAF phases will evaluate the rewritten path.

This means that:

* A custom rule matching `/public-login` may not fire after the rewrite.
* A custom rule matching `/internal/login` may fire even though the visitor requested `/public-login`.

### Resolution

When troubleshooting a custom rule, check whether a rewrite rule already changed the URL before WAF evaluation. You can use [Trace](https://developers.cloudflare.com/rules/trace-request/) to check the evaluation order of your rules based on an example request.

For more information, refer to the request execution order in [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/#application-layer).

## IP Access rules can bypass custom rules

[IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) run before WAF custom rules.

If an IP Access rule with an **Allow** action matches a request, Cloudflare will not evaluate later custom rules for that request.

### What this means

* A custom rule may appear to "not fire" for a specific IP address even though the expression is correct.
* Allowlisting a source IP address too early can prevent other app security logic from running (namely custom rules).

### Resolution

If a request is unexpectedly bypassing a custom rule, check for matching IP Access rules first.

## Skip and Allow do not behave the same way

The _Allow_ action in IP Access rules has a different behavior from the _Skip_ action available in WAF custom rules.

The _Allow_ action in IP Access rules bypasses WAF custom rules, rate limiting rules, WAF Managed Rules (except for country-level entries), and deprecated firewall rules. Any matches do not appear in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). An allowed request never reaches WAF custom rules, including any logging or tracking rules.

The _Skip_ action in WAF custom rules instructs Cloudflare to selectively skip certain application security products or components, such as WAF managed rules. Depending on the configuration of the custom rule with the _Skip_ action, other security products will still evaluate the request and might block it.

WAF custom rules do not have an _Allow_ action. To control what a matching request bypasses, you must use the [_Skip_](https://developers.cloudflare.com/waf/custom-rules/skip/) action and select the specific products or phases to skip.

### Resolution

Review your configuration (namely IP Access rules and custom rules with the _Skip_ action) to ensure the intended behavior is achieved.

If specific rules of [WAF managed rulesets](https://developers.cloudflare.com/waf/managed-rules/) are blocking requests you want to allow, you can create [managed rules exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip specific managed rules or rulesets for particular requests instead of skipping WAF Managed Rules entirely.

## Page Rules do not use the same request view as modern rules

[Page Rules](https://developers.cloudflare.com/rules/page-rules/) are legacy behavior and do not line up exactly with modern Rules products.

In mixed configurations, you may see:

* A rewrite affecting custom rules and Managed Rules
* Different results between a Page Rule and a modern rule that appear to target the same path

### Resolution

When possible, migrate older Page Rules behavior to the current Rules products so the request is evaluated in one model.

## Recommended troubleshooting workflow

When a WAF decision looks incorrect:

1. Check for earlier request rewrites.
2. Check for matching IP Access rules.
3. Confirm whether the request was expected to stop in the custom rules phase or skip later phases.
4. Review whether a managed rule still ran after a custom rule match.
5. Use [Trace](https://developers.cloudflare.com/rules/trace-request/) when available to confirm the actual phase-by-phase result.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/phase-interactions/#page","headline":"Rule phase interactions · Cloudflare Web Application Firewall (WAF) docs","description":"Understand how request rewrites, IP Access rules, custom rules, and managed rules interact across WAF phases.","url":"https://developers.cloudflare.com/waf/troubleshooting/phase-interactions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/troubleshooting/phase-interactions/","name":"Rule phase interactions"}}]}
```
