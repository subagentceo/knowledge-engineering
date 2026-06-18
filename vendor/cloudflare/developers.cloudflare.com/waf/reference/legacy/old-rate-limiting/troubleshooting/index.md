---
title: Troubleshoot Rate Limiting (previous version)
description: Troubleshoot issues with the previous version of Rate Limiting.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot Rate Limiting (previous version)

A few common rate limiting configuration issues prevent proper request matches:

* **Including HTTP or HTTPS protocol schemes in rule patterns** (such as `https://example.com/*`). To restrict rules to match only HTTP or HTTPS traffic, use the schemes array in the request match. For example, `"schemes": [ "HTTPS" ]`.
* **Forgetting a trailing slash character (`/`)**. Cloudflare Rate Limiting only treats requests for the homepage (such as `example.com` and `example.com/`) as equivalent, but not any other path (such as `example.com/path/` and `example.com/path`). To match request paths both with and without the trailing slash, use a wildcard match (for example, `example.com/path*`).
* **Including a query string or anchor** (such as `example.com/path?foo=bar` or `example.com/path#section1`). A rule like `example.com/path` will match requests for `example.com/path?foo=bar`.
* **Overriding a rate limit with [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)**.
* **Including a port number** (such as `example.com:8443/api/`). Rate Limiting does not consider port numbers within rules. Remove the port number from the URL so that the rate limit rule triggers as expected.

## Common API errors

The following common errors may prevent configuring rate limiting rules via the [Cloudflare API](https://developers.cloudflare.com/api/resources/rate%5Flimits/methods/create/):

* `Decoding is not yet implemented` – Indicates that your request is missing the `Content-Type: application/json` header. Add the header to your API request to fix the issue.
* `Ratelimit.api.not_entitled` – Enterprise customers must contact their account team before adding rules.

Note

The `origin_traffic` parameter can only be set on Enterprise plans. Setting `"origin_traffic" = false` for a rule on a Free, Pro, or Business domain is automatically converted into `"origin_traffic" = true`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/rate-limiting-rules/troubleshooting/#page","headline":"Troubleshoot Rate Limiting (previous version) · Cloudflare Web Application Firewall (WAF) docs","description":"Troubleshoot issues with the previous version of Rate Limiting.","url":"https://developers.cloudflare.com/waf/rate-limiting-rules/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/reference/legacy/","name":"Legacy features"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/reference/legacy/old-rate-limiting/","name":"Rate Limiting (previous version)"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/reference/legacy/old-rate-limiting/troubleshooting/","name":"Troubleshoot Rate Limiting (previous version)"}}]}
```
