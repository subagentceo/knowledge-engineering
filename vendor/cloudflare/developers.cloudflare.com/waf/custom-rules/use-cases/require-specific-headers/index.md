---
title: Require specific HTTP headers
description: Require specific HTTP headers in incoming requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Require specific HTTP headers

Many organizations qualify traffic based on the presence of specific HTTP request headers. Use the Rules language [HTTP request header fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Headers&search-term=http.request) to target requests with specific headers.

## Example 1: Require presence of HTTP header

This example custom rule uses the [http.request.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/) field to look for the presence of an `X-CSRF-Token` header. The [lower()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lower) transformation function converts the header name to lowercase so that the expression is case-insensitive.

When the `X-CSRF-Token` header is missing, Cloudflare blocks the request.

* **When incoming requests match**:  
Use the expression editor:  
`not any(lower(http.request.headers.names[*])[*] eq "x-csrf-token") and (http.request.full_uri eq "https://www.example.com/somepath")`
* **Then take action**: _Block_

## Example 2: Require HTTP header with a specific value

This example custom rule uses the [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/) field to look for the presence of the `X-Example-Header` header and to get its value (if any). When the `X-Example-Header` header is missing or it does not have the value `example-value`, Cloudflare blocks the request.

* **When incoming requests match**:  
Use the expression editor:  
`not any(http.request.headers["x-example-header"][*] eq "example-value") and (http.request.uri.path eq "/somepath")`
* **Then take action**: _Block_

The keys in the `http.request.headers` field, corresponding to HTTP header names, are in lowercase.

In this example the header name is case-insensitive, but the header value is case-sensitive.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-headers/#page","headline":"Require specific HTTP headers · Cloudflare Web Application Firewall (WAF) docs","description":"Require specific HTTP headers in incoming requests.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/require-specific-headers/","name":"Require specific HTTP headers"}}]}
```
