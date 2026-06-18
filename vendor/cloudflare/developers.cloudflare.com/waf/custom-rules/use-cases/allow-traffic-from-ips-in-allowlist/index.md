---
title: Allow traffic from IP addresses in allowlist only
description: Allow traffic only from IP addresses in an allowlist.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Allow traffic from IP addresses in allowlist only

This example blocks incoming requests from IP addresses that are not present in an allowlist (defined using an [IP list](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists)).

1. [Create an IP list](https://developers.cloudflare.com/waf/tools/lists/create-dashboard/) with the IP addresses for which you want to allow access.  
For example, create an IP list named `allowed_ips` with one or more IP addresses. For more information on the accepted IP address formats, refer to [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists).
2. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocking any requests from IPs not present in the list you created (`allowed_ips` in the current example).  
   * **When incoming requests match**:  
   | Field             | Operator       | Value        |  
   | ----------------- | -------------- | ------------ |  
   | IP Source Address | is not in list | allowed\_ips |  
   If you are using the expression editor:  
   `(not ip.src in $allowed_ips)`  
   * **Then take action**: _Block_
3. (Optional) Update your expression with any extra filters, like blocking non-allowlisted IPs only for specific URI paths:  
| Field             | Operator       | Value        | Logic |  
| ----------------- | -------------- | ------------ | ----- |  
| IP Source Address | is not in list | allowed\_ips | And   |  
| URI Path          | wildcard       | /admin/\*    |       |  
If you are using the expression editor:  
`(not ip.src in $allowed_ips and http.request.uri.path wildcard "/admin/*")`

## Other resources

* [Use case: Require known IP addresses in site admin area](https://developers.cloudflare.com/waf/custom-rules/use-cases/site-admin-only-known-ips/)
* [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/#page","headline":"Allow traffic from IP addresses in allowlist only · Cloudflare Web Application Firewall (WAF) docs","description":"Allow traffic only from IP addresses in an allowlist.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/","name":"Allow traffic from IP addresses in allowlist only"}}]}
```
