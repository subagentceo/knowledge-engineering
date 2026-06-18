---
title: Block requests by attack score
description: Block requests with high WAF attack scores.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block requests by attack score

The [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) helps identify variations of known attacks and their malicious payloads.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests based on country code ([ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format), from requests with an attack score lower than 20\. For more information, refer to [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/).

* **When incoming requests match**:  
| Field            | Operator  | Value                                        | Logic |  
| ---------------- | --------- | -------------------------------------------- | ----- |  
| Country          | is in     | China, Taiwan, United Kingdom, United States | And   |  
| WAF Attack Score | less than | 20                                           |       |  
If you are using the expression editor:  
`(ip.src.country in {"CN" "TW" "US" "GB"} and cf.waf.score lt 20)`
* **Then take action**: _Block_

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-attack-score/#page","headline":"Block requests by attack score · Cloudflare Web Application Firewall (WAF) docs","description":"Block requests with high WAF attack scores.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-attack-score/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/block-attack-score/","name":"Block requests by attack score"}}]}
```
