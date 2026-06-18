---
title: Early Hints
description: Preload assets with 103 Early Hints to speed up page loads.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Early Hints

When a browser requests a page, the origin server takes time to prepare the full response. Early Hints uses this wait time to send the browser a preliminary `103` response containing `Link` headers that tell the browser which assets it will need. The browser can start loading those assets before the full response arrives, which speeds up page loads.

Early Hints is defined in [RFC 8297 ↗](https://httpwg.org/specs/rfc8297.html) as a new HTTP status code (`103 Early Hints`). Cloudflare caches and serves these `103` responses with `Link` headers from your HTML pages, reducing user-perceived latency.

Note

Early Hints is currently only supported over HTTP/2 and HTTP/3.

For more information about Early Hints, refer to the [Cloudflare ↗](https://blog.cloudflare.com/early-hints) and [Google Chrome ↗](https://developer.chrome.com/en/blog/early-hints/) blogs.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Enable Early Hints

1. In the Cloudflare dashboard, go to the **Speed** \> **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/optimization)
2. Go to the **Content Optimization** tab.
3. For **Early Hints**, toggle the switch to **On**.

## Generate Early Hints

Early Hints are only generated and cached:

* For URIs with `.html`, `.htm`, or `.php` file extensions, or no file extension
* On 200, 301, or 302 response return codes
* When the response contains [link headers ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Link) with preconnect or preload rel types, such as `Link: </img/preloaded.png>; rel=preload`

Note

Early Hints cache entries are keyed by request URI and ignore query strings.

## Emit Early Hints

Cloudflare will asynchronously look up and emit a cached 103 Early Hints response ahead of a main response.

Currently, only certain browser versions will take action to preload or preconnect on receiving Early Hints, such as Google Chrome M94 and higher. Instructions for running WebPageTest to experiment with compatible client browsers can be found in the [blog post ↗](https://blog.cloudflare.com/early-hints/#testing-early-hints-with-web-page-test).

Additionally, keep the following in mind:

* Early Hints responses may be emitted before reaching the origin server or Worker. When Early Hints is enabled and pages on your site require authentication, unauthenticated visitors may receive a 103 response. The 103 response would contain cached Link headers and be sent before a 403 Forbidden response from your origin.
* Early Hints may be emitted less frequently on requests where the content is cacheable. Cloudflare CDN is more likely to retrieve a response header before the asynchronous Early Hints lookup finishes if the response has been cached. Cloudflare will not send a 103 response if the main response header is already available.
* Cloudflare currently disables Early Hints on some User-Agents, for example, select search crawler bots that show incompatibility with 1xx responses.
* You may see an influx of `504` responses with the `RequestSource` of `earlyHintsCache` in Cloudflare Logs when Early Hints is enabled, which is expected and benign. Requests from `earlyHintsCache` are internal subrequests for cached Early Hints, and they are neither end user requests, nor do they go to your origin. Their response status only indicates whether there are cached Early Hints for the request URI (`200` on cache HIT, `504` on cache MISS). These requests are already filtered out in other views, such as Cache Analytics. To filter out these requests or to filter requests by end users of your website only, please refer to [Filter end users](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/#filter-end-users).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/advanced-configuration/early-hints/#page","headline":"Early Hints · Cloudflare Cache (CDN) docs","description":"Preload assets with 103 Early Hints to speed up page loads.","url":"https://developers.cloudflare.com/cache/advanced-configuration/early-hints/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/advanced-configuration/","name":"Advanced configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/advanced-configuration/early-hints/","name":"Early Hints"}}]}
```
