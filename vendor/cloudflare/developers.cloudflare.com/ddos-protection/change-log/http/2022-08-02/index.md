---
title: 2022-08-02
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2022-08-02

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                                                      |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | ------------------------------------------------------------------------------------------ |
| ...1712a123 | HTTP requests with unusual HTTP headers or URI path (signature #16). | log             | block         | Allow requests matching this rule to match other rules too in order to catch more attacks. |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Extend the scope of this filter to match a wider set of requests.                          |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2022-08-02/#page","headline":"2022-08-02 · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2022-08-02/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2022-08-02/","name":"2022-08-02"}}]}
```
