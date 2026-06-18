---
title: 2024-01-05
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2024-01-05

| Rule ID     | Description                                                         | Previous Action | New Action | Notes                                                  |
| ----------- | ------------------------------------------------------------------- | --------------- | ---------- | ------------------------------------------------------ |
| ...2de94fb2 | HTTP requests with unusual HTTP headers or URI path (signature #3). | block           | block      | Fine-tune the characteristics of the unusual requests. |
| ...177059f1 | HTTP requests from known botnet (signature #31).                    | block           | N/A        | Removed due to false positives.                        |
| ...6fe7a312 | HTTP requests from known botnet (signature #70).                    | block           | N/A        | Removed due to false positives.                        |
| ...82c0ed5f | HTTP requests from known botnet (signature #77).                    | N/A             | block      |                                                        |
| ...e4f3ea4d | HTTP requests from known botnet (signature #76).                    | N/A             | block      |                                                        |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-01-05/#page","headline":"2024-01-05 · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2024-01-05/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2024-01-05/","name":"2024-01-05"}}]}
```
