---
title: Customize cache
description: Methods for customizing cache behavior with rules, Workers, and headers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize cache

Some possible combinations of origin web server settings and Cloudflare [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) include:

## Create a directory for static content at your origin web server

For example, create a `/static/` subdirectory at your origin web server and a Cache Everything Cache Rule matching the following expression:

* Using the Expression Builder: `Hostname contains "example.com" AND URI Path starts with "/static"`
* Using the Expression Editor: `(http.host contains "example.com" and starts_with(http.request.uri.path, "/static"))`

## Append a unique file extension to static pages

For example, create a `.shtml` file extension for resources at your origin web server and a Cache Everything Cache Rule matching the following expression:

* Using the Expression Builder: `Hostname contains "example.com" AND URI Path ends with ".shtml"`
* Using the Expression Editor: `(http.host contains "example.com" and ends_with(http.request.uri.path, ".shtml"))`

## Add a query string to a resource’s URL to mark the content as static

For example, add a `static=true` query string for resources at your origin web server and a Cache Everything Cache Rule matching the following expression:

* Using the Expression Builder: `Hostname contains "example.com" AND URI Query String contains "static=true"`
* Using the Expression Editor: `(http.host contains "example.com" and http.request.uri.query contains "static=true")`

Resources that match a Cache Everything Cache Rule are still not cached if the origin web server sends a Cache-Control header of `max-age=0`, `private`, `no-cache`, or an `Expires` header with an already expired date. Include the [Edge Cache TTL](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) setting within the Cache Everything Cache Rule to additionally override the `Cache-Control` headers from the origin web server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/concepts/customize-cache/#page","headline":"Customize cache · Cloudflare Cache (CDN) docs","description":"Methods for customizing cache behavior with rules, Workers, and headers.","url":"https://developers.cloudflare.com/cache/concepts/customize-cache/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/concepts/customize-cache/","name":"Customize cache"}}]}
```
