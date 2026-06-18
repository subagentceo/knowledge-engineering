---
title: Get live viewer counts
description: Retrieve real-time viewer counts for Cloudflare Stream live videos using the views endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get live viewer counts

The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a `GET` request to the `/views` endpoint.

Terminal window

```

https://customer-<CODE>.cloudflarestream.com/<INPUT_ID>/views


```

Below is a response for a live video with several active viewers:

```

{ "liveViewers": 113 }


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/#page","headline":"Get live viewer counts · Cloudflare Stream docs","description":"Retrieve real-time viewer counts for Cloudflare Stream live videos using the views endpoint.","url":"https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/getting-analytics/","name":"Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/getting-analytics/live-viewer-count/","name":"Get live viewer counts"}}]}
```
