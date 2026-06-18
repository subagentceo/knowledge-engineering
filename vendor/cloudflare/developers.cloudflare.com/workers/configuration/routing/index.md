---
title: Routes and domains
description: Connect your Worker to an external endpoint (via Routes, Custom Domains or a `workers.dev` subdomain) such that it can be accessed by the Internet.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routes and domains

To allow a Worker to receive inbound HTTP requests, you must connect it to an external endpoint such that it can be accessed by the Internet.

There are three types of routes:

* [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains): Routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin.
* [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/): Routes that are set within a Cloudflare zone where your origin server, if you have one, is behind a Worker that the Worker can communicate with.
* [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/): A `workers.dev` subdomain route is automatically created for each Worker to help you getting started quickly. You may choose to [disable](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) your `workers.dev` subdomain.

## What is best for me?

It's recommended to run production Workers on a [Workers route or custom domain](https://developers.cloudflare.com/workers/configuration/routing/), rather than on your `workers.dev` subdomain. Your `workers.dev` subdomain is treated as a [Free website ↗](https://www.cloudflare.com/plans/) and is intended for personal or hobby projects that aren't business-critical.

Custom Domains are recommended for use cases where your Worker is your application's origin server. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

Routes are recommended for use cases where your application's origin server is external to Cloudflare. Note that Routes cannot be the target of a same-zone `fetch()` call.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/configuration/routing/#page","headline":"Routes and domains · Cloudflare Workers docs","description":"Connect your Worker to an external endpoint (via Routes, Custom Domains or a workers.dev subdomain) such that it can be accessed by the Internet.","url":"https://developers.cloudflare.com/workers/configuration/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/routing/","name":"Routes and domains"}}]}
```
