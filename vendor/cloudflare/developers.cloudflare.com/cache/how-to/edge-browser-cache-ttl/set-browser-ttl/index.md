---
title: Set Browser Cache TTL
description: Set how long browsers cache resources from your site.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set Browser Cache TTL

Specify a time for a visitor’s Browser Cache TTL to accelerate the page load for repeat visitors to your website. To configure cache duration within Cloudflare’s data centers, refer to [Edge Cache TTL](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl).

By default, Cloudflare honors the cache expiration set in your `Expires` and `Cache-Control` headers. Cloudflare overrides any `Cache-Control` or `Expires` headers with values set via the **Browser Cache TTL** option under **Caching** on your dashboard if:

* The value of the `Cache-Control` header from the origin web server is less than the **Browser Cache TTL** setting. This means that **Browser cache TTL** value needs to be higher than origin `max-age`.
* The origin web server does not send a `Cache-Control` or an `Expires` header.

Unless specifically set in a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/), Cloudflare does not override or insert `Cache-Control` headers if you set **Browser Cache TTL** to **Respect Existing Headers**.

Nevertheless, the value you set via Cache Rule will be ignored if `Cache-Control: max-age` is higher. In other words, you can override to make browsers cache longer than Cloudflare's edge but not less.

## Set Browser Cache TTL

Note

If you modify cached assets, the new asset is not displayed to repeat visitors before the Browser Cache TTL duration. [Purging Cloudflare’s cache](https://developers.cloudflare.com/cache/how-to/purge-cache/) does not affect assets cached in a visitor’s browser.

1. In the Cloudflare dashboard, go to the **Caching** page.  
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Browser Cache TTL**, select the desired cache expiration time from the drop-down menu.

The **Respect Existing Headers** option tells Cloudflare to honor the settings in the `Cache-Control` headers from your origin web server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/set-browser-ttl/#page","headline":"Set Browser Cache TTL · Cloudflare Cache (CDN) docs","description":"Set how long browsers cache resources from your site.","url":"https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/set-browser-ttl/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/edge-browser-cache-ttl/","name":"Edge and Browser Cache TTL"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/edge-browser-cache-ttl/set-browser-ttl/","name":"Set Browser Cache TTL"}}]}
```
