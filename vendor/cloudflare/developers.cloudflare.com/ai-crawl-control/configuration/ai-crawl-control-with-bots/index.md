---
title: AI Crawl Control with Cloudflare Bots
description: Use AI Crawl Control alongside bot management.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI Crawl Control with Cloudflare Bots

AI Crawl Control works alongside other Cloudflare products, such as Cloudflare [bot solutions](https://developers.cloudflare.com/bots/). Bot solutions identifies traffic matching patterns of known bots, and can challenge or block the bots as you wish.

## Order of precedence

* AI Crawl Control's AI crawler blocking uses [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), which take place before Cloudflare bot solutions.
* AI Crawl Control's pay per crawl takes place after Cloudflare bot solutions.

graph LR
A[Traffic] --> B[WAF custom rules<br>AI Crawl Control: Crawler blocks]
B --> C[Cloudflare<br>Bot Solutions]
C --> D[AI Crawl Control:<br>Pay Per Crawl]
classDef highlight fill:#F6821F,color:white

For more information on how Cloudflare bot solutions works with WAF custom rules, refer to [How it works](https://developers.cloudflare.com/bots/concepts/bot/#how-it-works).

## Examples

Consider the following examples.

### Bot rule which blocks all AI bots vs pay per crawl

You may have both of the following enabled:

* A selection of AI crawlers to be charged through AI Crawl Control's pay per crawl
* Bot configuration option to [Block AI Bots](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#block-ai-bots).

Since pay per crawl happens after bot solutions, you need to first turn off **Block AI Bots** to ensure pay per crawl works as intended.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/#page","headline":"AI Crawl Control with Cloudflare Bots · Cloudflare AI Crawl Control docs","description":"Use AI Crawl Control alongside bot management.","url":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/configuration/ai-crawl-control-with-bots/","name":"AI Crawl Control with Cloudflare Bots"}}]}
```
