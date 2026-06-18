---
title: Fake bot detection blocking legitimate requests
description: WAF managed rules that detect fake bots may block legitimate services that share infrastructure with known bots.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fake bot detection blocking legitimate requests

The Cloudflare Managed Ruleset includes rules that detect requests impersonating well-known bots such as Googlebot and Bingbot. These rules compare the request's `User-Agent` header against known bot patterns and then verify the source using methods like reverse DNS lookup or IP validation. If the `User-Agent` matches a known bot but the source cannot be verified, the rule flags the request as a fake bot.

## Fake bot rules

The following table lists the fake bot detection rules in the Cloudflare Managed Ruleset:

| Rule name                                        | Rule ID     |
| ------------------------------------------------ | ----------- |
| Anomaly:Header:User-Agent - Fake Google Bot      | ...6aa0bef8 |
| Anomaly:Header:User-Agent - Fake Bing or MSN Bot | ...c12cf9c8 |

## Common false positive scenarios

Fake bot rules may trigger false positives for legitimate services that share infrastructure or user agent patterns with known bots but use different IP ranges. Common examples include:

* **Google Cloud services**: Services such as Google Cloud Workflows or Cloud Functions may send requests with a Google-related `User-Agent` header from IP addresses outside the standard Googlebot range. These requests fail the IP verification check and are flagged as fake Google bots.
* **Bing Webmaster Tools Site Scan**: Site Scan does not use the same IP range as Bingbot, causing the fake Bing bot rule to trigger. For specific guidance on this scenario, refer to [Bing's Site Scan blocked by a managed rule](https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/).
* **Monitoring and testing tools**: Third-party uptime monitors or automated testing tools that set a bot-like `User-Agent` header may also be flagged.

## Resolution

If a fake bot rule is blocking legitimate traffic, create an [exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip the specific managed rule for the affected requests.

When defining the exception expression, use request properties that identify the legitimate traffic without broadly disabling the rule. For example:

* Filter by source IP address or IP range if the service uses a known set of addresses.
* Filter by a specific URI path if the service only accesses certain endpoints.
* Filter by ASN if the service originates from a specific network.

The exception must appear in the rules list before the rule that executes the Cloudflare Managed Ruleset, or it will have no effect.

For instructions on creating exceptions, refer to [Create exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/fake-bot-managed-rules/#page","headline":"Fake bot detection blocking legitimate requests · Cloudflare Web Application Firewall (WAF) docs","description":"WAF managed rules that detect fake bots may block legitimate services that share infrastructure with known bots.","url":"https://developers.cloudflare.com/waf/troubleshooting/fake-bot-managed-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/troubleshooting/fake-bot-managed-rules/","name":"Fake bot detection blocking legitimate requests"}}]}
```
