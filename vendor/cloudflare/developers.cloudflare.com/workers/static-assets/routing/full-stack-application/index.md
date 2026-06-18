---
title: Full-stack application
description: How to configure and use a full-stack application with Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Full-stack application

Full-stack applications are web applications which are span both the client and server. The build process of these applications will produce a HTML files, accompanying client-side resources (e.g. JavaScript bundles, CSS stylesheets, images, fonts, etc.) and a Worker script. Data is typically fetched the Worker script at request-time and the initial page response is usually server-side rendered (SSR). From there, the client is then hydrated and a SPA-like experience ensues.

The following full-stack frameworks are natively supported by Workers:

* [ Astro ](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
* [ React Router (formerly Remix) ](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
* [ Next.js ](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
* [ RedwoodSDK ](https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/)
* [ TanStack Start ](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
* [ Vike ](https://developers.cloudflare.com/workers/framework-guides/web-apps/vike/)
* [ Analog ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/)
* [ Angular ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/angular/)
* [ Nuxt ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/)
* [ Qwik ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/qwik/)
* [ Solid ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/solid/)
* [ Waku ](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/waku/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/#page","headline":"Full-stack application · Cloudflare Workers docs","description":"How to configure and use a full-stack application with Workers.","url":"https://developers.cloudflare.com/workers/static-assets/routing/full-stack-application/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/routing/","name":"Routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/static-assets/routing/full-stack-application/","name":"Full-stack application"}}]}
```
