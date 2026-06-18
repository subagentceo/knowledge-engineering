---
title: Require known IP addresses in site admin area
description: Restrict admin area access to known IP addresses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Require known IP addresses in site admin area

If an attack compromises the administrative area of your website, the consequences can be severe. With custom rules, you can protect your site's admin area by blocking requests for access to admin paths that do not come from a known IP address.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) limits access to the WordPress admin area, `/wp-admin/`, by blocking requests that do not originate from a specified set of IP addresses:

* **When incoming requests match**:  
| Field             | Operator  | Value                      | Logic |  
| ----------------- | --------- | -------------------------- | ----- |  
| IP Source Address | is not in | 10.20.30.40 192.168.1.0/24 | And   |  
| URI Path          | wildcard  | /wp-admin/\*               |       |  
If you are using the expression editor:  
`(not ip.src in {10.20.30.40 192.168.1.0/24} and http.request.uri.path wildcard "/wp-admin/*")`
* **Then take action**: _Block_

## Other resources

* [Use case: Allow traffic from IP addresses in allowlist only](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/site-admin-only-known-ips/#page","headline":"Require known IP addresses in site admin area · Cloudflare Web Application Firewall (WAF) docs","description":"Restrict admin area access to known IP addresses.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/site-admin-only-known-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/site-admin-only-known-ips/","name":"Require known IP addresses in site admin area"}}]}
```
