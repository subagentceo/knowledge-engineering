---
title: Rate limiting rulesets
description: Create rate limiting rulesets at the account level for multiple Enterprise zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rate limiting rulesets

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) allow you to define a rate limit for requests matching an [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/), and the action to perform when that rate limit is reached. You can configure rate limiting rules for a single zone or at the account level.

Account-level rate limiting rulesets allow you to define rate limiting rules once and deploy them to multiple Enterprise zones. Instead of configuring the same rules in each zone, you create a ruleset at the account level and control which zones it applies to.

Note

This feature requires an Enterprise plan.

To apply a rate limiting ruleset at the account level:

1. Create a rate limiting ruleset with one or more rate limiting rules.
2. Deploy the ruleset to one or more zones on an Enterprise plan.

For more information on how Cloudflare calculates request rates, refer to [Request rate calculation](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/).

## Next steps

For instructions on creating and deploying a rate limiting ruleset, refer to the following pages:

* [Create a rate limiting ruleset in the dashboard](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-dashboard/)
* [Create a rate limiting ruleset using the API](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-api/)

For Terraform examples, refer to [Rate limiting rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/rate-limiting-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/#page","headline":"Rate limiting rulesets · Cloudflare Web Application Firewall (WAF) docs","description":"Create rate limiting rulesets at the account level for multiple Enterprise zones.","url":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/rate-limiting-rulesets/","name":"Rate limiting rulesets"}}]}
```
