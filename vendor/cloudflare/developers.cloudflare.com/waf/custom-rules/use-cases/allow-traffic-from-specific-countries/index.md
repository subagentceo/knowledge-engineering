---
title: Allow traffic from specific countries only
description: Allow traffic only from specific countries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Allow traffic from specific countries only

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests based on country code using the [ip.src.country](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.country/) field, only allowing requests from two countries: United States and Mexico.

* **When incoming requests match**:  
| Field   | Operator  | Value                 |  
| ------- | --------- | --------------------- |  
| Country | is not in | Mexico, United States |  
If you are using the expression editor:  
`(not ip.src.country in {"US" "MX"})`
* **Then take action**: _Block_

## Other resources

* [Use case: Block traffic by geographical location](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/)
* [Use case: Block traffic from specific countries](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/#page","headline":"Allow traffic from specific countries only · Cloudflare Web Application Firewall (WAF) docs","description":"Allow traffic only from specific countries.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/","name":"Allow traffic from specific countries only"}}]}
```
