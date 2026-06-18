---
title: Custom pages
description: Configure custom error and block pages.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom pages

Design your custom HTML page and host it online anywhere. Once published, Cloudflare will use the customized page instead of serving our standard page to your visitors.

Note

We encourage you to customize every page to provide a consistent branding experience for your users. You can also [turn on Origin Error Pages](https://developers.cloudflare.com/rules/custom-errors/#error-pages) for 5XX errors (except errors `520`\-`527`).

Pages you can customize:

* WAF block
* IP/Country block
* IP/Country challenge
* 500 class errors
* 1000 class errors
* Managed challenge / I'm Under Attack Mode
* Rate limiting block

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/concepts/custom-pages/#page","headline":"Custom pages · Cloudflare Learning Paths","description":"Configure custom error and block pages.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/concepts/custom-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/concepts/","name":"Prerequisites"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/concepts/custom-pages/","name":"Custom pages"}}]}
```
