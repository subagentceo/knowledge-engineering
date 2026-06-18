---
title: Block traffic by geographical location
description: Block traffic based on geographic location.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block traffic by geographical location

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests by autonomous system number (ASN), continent, or country of origin.

* **When incoming requests match**:  
| Field     | Operator | Value        | Logic |  
| --------- | -------- | ------------ | ----- |  
| AS Num    | equals   | 131279       | Or    |  
| Continent | equals   | Asia         | Or    |  
| Country   | equals   | Korea, North |       |  
If you are using the expression editor:  
`(ip.src.asnum eq 131279) or (ip.src.continent eq "AS") or (ip.src.country eq "KP")`
* **Then take action**: _Block_

## Other resources

* [Use case: Block traffic from specific countries](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/)
* [Use case: Allow traffic from specific countries only](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-specific-countries/)
* [Fields reference: Geolocation](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Geolocation)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/#page","headline":"Block traffic by geographical location · Cloudflare Web Application Firewall (WAF) docs","description":"Block traffic based on geographic location.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/block-by-geographical-location/","name":"Block traffic by geographical location"}}]}
```
