---
title: 2023-05-15 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2023-05-15 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                        |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | ------------------------------------------------------------ |
| ...1fc1e601 | HTTP requests with unusual HTTP headers or URI path (signature #31). | N/A             | block         |                                                              |
| ...863134d5 | HTTP requests from known bad user agents.                            | block           | block         | Widen detection scope.                                       |
| ...bb3cefd0 | HTTP requests with unusual HTTP headers or URI path (signature #53). | N/A             | block         |                                                              |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Extend the rule to catch attacks across multiple subdomains. |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Expand the filter to catch more attacks.                     |
| ...f2494447 | HTTP requests attempting to bypass the cache.                        | ddos\_dynamic   | ddos\_dynamic | Make rule more accurate when blocking attacks.               |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-05-15-emergency/#page","headline":"2023-05-15 - Emergency · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-05-15-emergency/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-05-15-emergency/","name":"2023-05-15 - Emergency"}}]}
```
