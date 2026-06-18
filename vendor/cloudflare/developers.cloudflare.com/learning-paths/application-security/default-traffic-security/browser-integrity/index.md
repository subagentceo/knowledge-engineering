---
title: Browser Integrity
description: Detect and block requests with invalid headers.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser Integrity

Cloudflare's Browser Integrity Check (BIC) looks for common HTTP headers abused most commonly by spammers and denies access to your page.

It also challenges visitors without a user agent or with a non-standard user agent such as commonly used by abusive bots, crawlers, or visitors.

[BIC is enabled by default](https://developers.cloudflare.com/waf/tools/browser-integrity-check/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/browser-integrity/#page","headline":"Browser Integrity · Cloudflare Learning Paths","description":"Detect and block requests with invalid headers.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/browser-integrity/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/default-traffic-security/","name":"Default traffic security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/default-traffic-security/browser-integrity/","name":"Browser Integrity"}}]}
```
