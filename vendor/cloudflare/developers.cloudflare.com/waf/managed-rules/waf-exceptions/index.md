---
title: Create exceptions
description: Skip WAF managed rules for specific requests with exceptions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create exceptions

Create an exception to skip the execution of WAF managed rulesets or some of their rules. The exception configuration includes an expression that defines the skip conditions, and the rules or rulesets to skip under those conditions.

## Types of exceptions

An exception can have one of the following behaviors (from highest to lowest priority):

* Skip all remaining rules (belonging to WAF managed rulesets)
* Skip one or more WAF managed rulesets
* Skip one or more rules of WAF managed rulesets

For more information on exceptions, refer to [Create an exception](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/create-exception/) in the Ruleset Engine documentation.

## Scope and execution order

You can define exceptions at the account level and at the zone level. The scope of an exception determines which rules it affects:

* An account-level exception only skips rules configured at the account level. It does not affect zone-level rules.
* A zone-level exception only skips rules configured at the zone level. It does not affect account-level rules.

Within each phase, account-level rulesets run before zone-level rulesets. This means that if you deploy managed rules at both the account level and the zone level, a request is evaluated against account-level rules first. An exception defined at the zone level will not prevent a match at the account level.

For more information on how WAF features run in sequence, refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/).

Note

Exceptions apply to WAF managed rulesets only. To skip other security features such as [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) or [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/), create a custom rule with the [skip action](https://developers.cloudflare.com/waf/custom-rules/skip/) and select the specific products you want to skip.

## Next steps

Add exceptions [in the Cloudflare dashboard](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/) or [via API](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/#page","headline":"Create WAF exceptions · Cloudflare Web Application Firewall (WAF) docs","description":"Skip WAF managed rules for specific requests with exceptions.","url":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/waf-exceptions/","name":"Create exceptions"}}]}
```
