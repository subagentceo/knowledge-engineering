---
title: Common calculations FAQ
description: Learn more about calculating bytes served by the origin and bandwidth usage.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common calculations FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/logs/faq/)

### How can I calculate bytes served by the origin from Cloudflare Logs?

The best way to calculate bytes served by the origin is to use the `CacheResponseBytes` field in Cloudflare Logs, and to filter only requests that come from the origin. Make sure to filter out `OriginResponseStatus` values `0` and `304`, which indicate a revalidated response.

### How do I calculate bandwidth usage for my zone?

Bandwidth (or data transfer) can be calculated by adding the `EdgeResponseBytes` field in HTTP request logs. There are some types of requests that are not factored into bandwidth calculations. In order to only include relevant requests in calculations, add the filter `ClientRequestSource = 'eyeball'`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/faq/common-calculations/#page","headline":"Common calculations FAQ · Cloudflare Logs docs","description":"Learn more about calculating bytes served by the origin and bandwidth usage.","url":"https://developers.cloudflare.com/logs/faq/common-calculations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/faq/common-calculations/","name":"Common calculations FAQ"}}]}
```
