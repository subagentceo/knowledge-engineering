---
title: Allow traffic from search engine bots
description: Allow traffic from search engine and verified bots.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Allow traffic from search engine bots

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) challenges requests from a list of countries, but allows traffic from search engine bots — such as Googlebot and Bingbot — and from other [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

The rule expression uses the [cf.client.bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.client.bot/) field to determine if the request originated from a known good bot or crawler.

* **When incoming requests match**:  
| Field      | Operator | Value                 | Logic |  
| ---------- | -------- | --------------------- | ----- |  
| Country    | is in    | Mexico, United States | And   |  
| Known Bots | equals   | false                 |       |  
If you are using the expression editor:  
`(ip.src.country in {"US" "MX"} and not cf.client.bot)`
* **Then take action**: _Managed Challenge_

## Other resources

* [Use case: Challenge bad bots](https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/)
* [Cloudflare bot solutions](https://developers.cloudflare.com/bots/)
* [Troubleshooting: Bing's Site Scan blocked by a WAF managed rule](https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/)
* [Learning Center: What is a web crawler? ↗](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/#page","headline":"Allow traffic from search engine bots and other verified bots · Cloudflare Web Application Firewall (WAF) docs","description":"Allow traffic from search engine and verified bots.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/","name":"Allow traffic from search engine bots"}}]}
```
