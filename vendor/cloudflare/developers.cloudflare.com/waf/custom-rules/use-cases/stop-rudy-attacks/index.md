---
title: Stop R-U-Dead-Yet? (R.U.D.Y.) attacks
description: Block R-U-Dead-Yet slow POST attacks with custom rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stop R-U-Dead-Yet? (R.U.D.Y.) attacks

R-U-Dead-Yet (R.U.D.Y.) attacks accomplish denial of service (DoS) by submitting long form fields. Use custom rules to stop these attacks by blocking requests that do not have a legitimate session cookie.

This example combines three expressions to target HTTP `POST` requests that do not contain a legitimate authenticated session cookie:

* The first expression uses the [http.request.uri.path](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path/) field to target the paths to secure from R.U.D.Y.:  
```  
http.request.uri.path matches "(comment|conversation|event|poll)/create"  
```
* The second uses a regular expression to match the format of a legitimate `auth_session` cookie. The `not` operator targets requests where that cookie is not formatted correctly:  
```  
not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}"  
```
* The third expression targets HTTP `POST` requests:  
```  
http.request.method eq "POST"  
```

To generate the final [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) expression for this example, the three expressions are combined into a compound expression using the `and` operator. When an HTTP `POST` request to any of the specified URIs does not contain a properly formatted `auth_session` cookie, Cloudflare blocks the request:

* **When incoming requests match**:  
Use the expression editor:  
`(http.request.method eq "POST" and http.request.uri.path matches "(comment|conversation|event|poll)/create" and not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}")`
* **Then take action**: _Block_

Note

The [matches](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) operator requires a Cloudflare Business or Enterprise plan.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/stop-rudy-attacks/#page","headline":"Stop R-U-Dead-Yet? (R.U.D.Y.) attacks · Cloudflare Web Application Firewall (WAF) docs","description":"Block R-U-Dead-Yet slow POST attacks with custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/stop-rudy-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/stop-rudy-attacks/","name":"Stop R-U-Dead-Yet? (R.U.D.Y.) attacks"}}]}
```
