---
title: 2023-11-10 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2023-11-10 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                              |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | -------------------------------------------------- |
| ...7d0f1e5f | HTTP requests from known botnet (signature #72).                     | N/A             | block         |                                                    |
| ...94547a95 | HTTP requests with unusual HTTP headers or URI path (signature #59). | N/A             | ddos\_dynamic |                                                    |
| ...e269dfd6 | HTTP requests with unusual HTTP headers or URI path (signature #56). | log             | block         | Enable filter early to mitigate widespread impact. |
| ...f35a42a0 | HTTP requests with unusual HTTP headers or URI path (signature #57). | log             | block         | Enable filter early to mitigate widespread impact. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-11-10-emergency/#page","headline":"2023-11-10 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-11-10-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-11-10-emergency/","name":"2023-11-10 - Emergency"}}]}
```
