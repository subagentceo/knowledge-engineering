---
title: Block Microsoft Exchange Autodiscover requests
description: Block Microsoft Exchange Autodiscover requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block Microsoft Exchange Autodiscover requests

In some cases, Microsoft Exchange Autodiscover service requests can be "noisy", triggering large numbers of `HTTP 404` (`Not found`) errors.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests for `autodiscover.xml` and `autodiscover.src`:

* **When incoming requests match**:  
Use the expression editor:  
`(ends_with(http.request.uri.path, "/autodiscover.xml") or ends_with(http.request.uri.path, "/autodiscover.src"))`
* **Then take action**: _Block_

Alternatively, customers on a Business or Enterprise plan can use the `matches` [comparison operator](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) for the same purpose. For this example, the expression would be the following:

```

(http.request.uri.path matches "/autodiscover.(xml|src)$")


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/#page","headline":"Block Microsoft Exchange Autodiscover requests · Cloudflare Web Application Firewall (WAF) docs","description":"Block Microsoft Exchange Autodiscover requests.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/","name":"Block Microsoft Exchange Autodiscover requests"}}]}
```
