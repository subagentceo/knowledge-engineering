---
title: Pay Per Crawl FAQ
description: Answers to common Pay Per Crawl questions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pay Per Crawl FAQ

## Frequently asked questions for site owners

### Can I set different prices for different AI crawlers?

No. Pay per crawl allows you to configure different actions (Block, Charge, or Allow) for each crawler, but you can only set a single price that applies to all crawlers configured with the "Charge" option.

## Frequently asked questions for AI bot operators

### Will I be charged for re-crawling the same page?

Yes. Every time your AI crawler accesses content on a website protected with pay per crawl, it will incur the cost set by the site owner. You should implement mechanisms within your crawler to track expenditure and enforce any spending limits you want to set.

Some paths are always free to crawl. These paths are: `/robots.txt`, `/sitemap.xml`, `/security.txt`, `/.well-known/security.txt`, `/crawlers.json`.

### Am I charged for error responses?

No. Charging events are only triggered for successful HTTP response codes. Error responses are not billed, even if you have sent the `crawler-exact-price` or `crawler-max-price` headers.

### What user agent should I use?

Use the standard user agents associated with your AI crawler that you have onboarded to Cloudflare and identified through Web Bot Auth.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/#page","headline":"Pay Per Crawl FAQ · Cloudflare AI Crawl Control docs","description":"Answers to common Pay Per Crawl questions.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/faq/","name":"Pay Per Crawl FAQ"}}]}
```
