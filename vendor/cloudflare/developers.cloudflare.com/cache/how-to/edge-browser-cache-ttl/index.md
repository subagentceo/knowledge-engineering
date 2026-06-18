---
title: Edge and Browser Cache TTL
description: Configure edge and browser cache TTL for your resources.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Edge and Browser Cache TTL

## Edge Cache TTL

Edge Cache TTL (Time to Live) specifies the maximum time to cache a resource in the Cloudflare global network. Edge Cache TTL is not visible in response headers and the minimum Edge Cache TTL depends on plan type.

| Free                   | Pro     | Business | Enterprise |          |
| ---------------------- | ------- | -------- | ---------- | -------- |
| Availability           | Yes     | Yes      | Yes        | Yes      |
| Minimum Edge Cache TTL | 2 hours | 1 hour   | 1 second   | 1 second |

For more information on how to set up Edge Cache TTL, refer to [Cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl).

## Browser Cache TTL

The Browser Cache TTL sets the expiration for resources cached in a visitor’s browser. By default, Cloudflare honors the cache expiration set in your `Expires` and `Cache-Control` headers but overrides those headers if:

* The value of the `Expires` or `Cache-Control` header from the origin web server is less than the Browser Cache TTL Cloudflare setting.
* The origin web server does not send a `Cache-Control` or an `Expires` header.

Unless specifically set in a cache rule, Cloudflare does not override or insert `Cache-Control` headers if you set **Browser Cache TTL** to **Respect Existing Headers**.

Note

* Setting high Browser Cache TTL values means that the assets will be cached for a long time by users’ browsers.
* If you modify cached assets, the new assets may not be displayed to repeat visitors before the Browser Cache TTL expires.
* Purging Cloudflare’s cache does not affect assets stored by a visitor’s browser.

| Free                                   | Pro       | Business  | Enterprise |            |
| -------------------------------------- | --------- | --------- | ---------- | ---------- |
| Availability                           | Yes       | Yes       | Yes        | Yes        |
| Minimum Browser Cache TTL (Page Rules) | 2 minutes | 2 minutes | 2 minutes  | 30 seconds |
| Minimum Browser Cache TTL              | 1 second  | 1 second  | 1 second   | 1 second   |
| Default Browser Cache TTL              | 4 hours   | 4 hours   | 4 hours    | 4 hours    |

For more information on setting the Browser Cache TTL, refer to [Set Browser Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/set-browser-ttl/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/#page","headline":"Edge and Browser Cache TTL · Cloudflare Cache (CDN) docs","description":"Configure edge and browser cache TTL for your resources.","url":"https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/edge-browser-cache-ttl/","name":"Edge and Browser Cache TTL"}}]}
```
