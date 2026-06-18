---
title: Control incoming requests
description: Filter incoming requests with WAF rules.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Control incoming requests

Use [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) to allow you to control incoming traffic by filtering requests to a zone. They work as customized web application firewall (WAF) rules that you can use to perform actions like Block or Managed Challenge on incoming requests.

Use WAF [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) to apply custom criteria for all incoming HTTP requests.

## Understand hosting plan limits

Cloudflare offsets most of the load to your website via caching and request filtering, but some traffic will still pass through to your origin. Knowing the limits of your hosting plan can help prevent a bottleneck from your host.

Once you are aware of your plan limits, you can use [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/) to restrict how many times a requesting entity can make a request to your website.

To help you define the best rate limiting setting for your use case, refer to [How Cloudflare determines the request rate](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/).

## Security models

* Positive Security policy: Allow specific requests and deny everything else.
* Negative Security policy: Block specific requests and allow everything else.

## Actions

* Log: Test rule effectiveness before committing to a more severe action.
* Allow: Allow matching requests to access the site.
* Block: Block matching requests from accessing the site.
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before proceeding.
* Interactive Challenge: Visitors will be shown an interactive challenge before proceeding.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-incoming-requests/#page","headline":"Control incoming requests · Cloudflare Learning Paths","description":"Filter incoming requests with WAF rules.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-incoming-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/control-incoming-requests/","name":"Control incoming requests"}}]}
```
