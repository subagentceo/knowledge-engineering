---
title: Cloudflare bot solutions
description: Identify and mitigate automated traffic to protect your domain from bad bots.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare bot solutions

Identify and mitigate automated traffic to protect your domain from bad bots.

 Available on all plans 

Bots — automated software that sends requests to your site — can scrape content, stuff stolen credentials into login forms, hoard inventory, and inflate server costs. Cloudflare's bot solutions detect this automated traffic and let you decide how to respond.

Cloudflare offers three bot-specific products: Bot Fight Mode, Super Bot Fight Mode, and Bot Management for Enterprise.

Note

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Which bot solution do I need?

If you need a simple toggle that challenges detected bots across your entire domain, use Bot Fight Mode (Free) or Super Bot Fight Mode (Pro, Business, Enterprise without Bot Management add-on). These products are included with your plan but do not allow you to write rules based on bot score or target specific endpoints. Super Bot Fight Mode adds configurable actions per bot category and supports WAF custom rule exceptions, but does not offer the granular per-request scoring of Bot Management.

If you need granular control — per-request bot scores, custom rules, per-endpoint handling, and detailed analytics — use Bot Management for Enterprise. This is recommended for ecommerce, banking, and security use cases. To enable Bot Management for Enterprise, contact your account team.

To see the differences in features and functionality, visit [Plans](https://developers.cloudflare.com/bots/plans/).

## Features

###  Bot Fight Mode 

Challenge detected bot traffic across your entire domain with a single toggle.

[ Use Bot Fight Mode ](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) 

###  Super Bot Fight Mode 

Identify traffic matching patterns of known bots, challenge or block bots, protect static resources, and view analytics to help you understand bot traffic using Super Bot Fight Mode.

[ Use Super Bot Fight Mode ](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) 

###  Bot Analytics 

Use Bot Analytics to dynamically examine bot traffic.

[ Use Bot Analytics ](https://developers.cloudflare.com/bots/bot-analytics/) 

###  Firewall variables 

Access several new variables within the Firewall expression builder.

[ Use Firewall variables ](https://developers.cloudflare.com/bots/reference/bot-management-variables/) 

## Related products

**[API Shield](https://developers.cloudflare.com/api-shield/)** 

Identify and address API vulnerabilities using API Shield.

**[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)** 

Detect and mitigate Distributed Denial of Service (DDoS) attacks using Cloudflare's Autonomous Edge.

**[Turnstile](https://developers.cloudflare.com/turnstile/)** 

Use Cloudflare's smart CAPTCHA alternative to run less intrusive challenges.

**[WAF](https://developers.cloudflare.com/waf/)** 

Get automatic protection from vulnerabilities and the flexibility to create custom rules.

## More resources

[Plans](https://www.cloudflare.com/plans/#overview) 

Compare available Cloudflare plans

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/#page","headline":"Overview · Cloudflare bot solutions docs","description":"Identify and mitigate automated traffic to protect your domain from bad bots.","url":"https://developers.cloudflare.com/bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}}]}
```
