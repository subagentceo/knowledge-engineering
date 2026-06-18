---
title: Glossary
description: Review AI Crawl Control terminology definitions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Glossary

Review the definitions for terms used across Cloudflare's AI Crawl Control documentation.

| Term               | Definition                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI crawler         | A bot which scrapes content from websites in support of an AI model, including by scraping content for indexing, retrieval augmented generation, or training.                                                                                               |
| canonical URL      | The preferred version of a web page, specified by a <link rel="canonical"> HTML tag in the page's <head> section. When multiple URLs serve the same or similar content, the canonical URL tells search engines and crawlers which version is authoritative. |
| category           | A classification describing a crawler's stated purpose: "AI Crawler", "AI Search", "AI Assistant", or "Search Engine". One category per crawler.                                                                                                            |
| Content Signals    | An emerging IETF standard for expressing AI content preferences via HTTP headers or metadata. Aims to replace non-standard vendor signals. Refer to contentsignals.org.                                                                                     |
| crawl              | A single HTTP request from a bot to access a page on your site.                                                                                                                                                                                             |
| crawler            | A specific bot operated by a company to access web content. One operator (like OpenAI) may run multiple crawlers (GPTBot, ChatGPT-User).                                                                                                                    |
| In-band pricing    | Pricing transmitted in HTTP response headers alongside content. In Pay Per Crawl, the origin sets prices via the crawler-price header.                                                                                                                      |
| Merchant of Record | The entity who facilitates "buying and selling". For pay per crawl, Cloudflare is the merchant of record.                                                                                                                                                   |
| operator           | The company or organization that owns and operates an AI crawler. Examples include OpenAI, Microsoft, Google, ByteDance, Anthropic, and Meta. In AI Crawl Control, crawlers are grouped by their operators.                                                 |
| Referrer           | The site a user was on before visiting your domain, tracked via the HTTP Referer header. In AI Crawl Control, referrer data shows traffic arriving from AI platforms like ChatGPT or Perplexity.                                                            |
| robots.txt         | A text file at the root of a website that instructs crawlers which pages they should or should not access. Compliance is voluntary. AI Crawl Control helps monitor which crawlers violate your robots.txt rules.                                            |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/glossary/#page","headline":"Glossary · Cloudflare AI Crawl Control docs","description":"Review AI Crawl Control terminology definitions.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/reference/glossary/","name":"Glossary"}}]}
```
