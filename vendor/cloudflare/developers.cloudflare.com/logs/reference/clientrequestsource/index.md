---
title: ClientRequestSource field
description: Understand ClientRequestSource field values in logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ClientRequestSource field

The possible values for the `ClientRequestSource` field are the following:

| Value | Request source     | Description                                                                                                                             |
| ----- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | unknown            | Should never happen.                                                                                                                    |
| 1     | eyeball            | A request from an end user. If you want to count requests made the Cloudflare Edge, the query should filter on requestSource=eyeball.   |
| 2     | purge              | A request made by Cloudflare's purge system.                                                                                            |
| 3     | alwaysOnline       | A request made by Cloudflare's Always Online crawler.                                                                                   |
| 4     | healthcheck        | A request made by Cloudflare's Health Check system.                                                                                     |
| 5     | edgeWorkerFetch    | A fetch request made from an edge Worker.                                                                                               |
| 6     | edgeWorkerCacheAPI | A cache API call made from an edge Worker.                                                                                              |
| 7     | edgeWorkerKV       | A KV call made from an edge Worker.                                                                                                     |
| 8     | imageResizing      | Requests made by Cloudflare's Image Resizing product.                                                                                   |
| 9     | orangeToOrange     | A request that comes from another orange clouded zone.                                                                                  |
| 10    | sslDetector        | A request made by Cloudflare's [SSL Detector system ↗](https://blog.cloudflare.com/ssl-tls-recommender/).                               |
| 11    | earlyHintsCache    | An [Early Hint request ↗](https://blog.cloudflare.com/early-hints/).                                                                    |
| 12    | inBrowserChallenge | An end user request caused by a Cloudflare security product (Challenges, JavaScript Detections). These requests never reach the origin. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/reference/clientrequestsource/#page","headline":"ClientRequestSource field · Cloudflare Logs docs","description":"Understand ClientRequestSource field values in logs.","url":"https://developers.cloudflare.com/logs/reference/clientrequestsource/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/reference/clientrequestsource/","name":"ClientRequestSource field"}}]}
```
