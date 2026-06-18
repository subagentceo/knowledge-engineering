---
title: Default cache behavior
description: Default file extensions and content types that Cloudflare caches.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Default cache behavior

Cloudflare respects the origin web server’s cache headers in the following order unless an [Edge Cache TTL cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) overrides the headers. Refer to the [Edge TTL](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code/#edge-ttl) section for details on default TTL behavior.

* Cloudflare **does not** cache the resource when:  
   * The `Cache-Control` header is set to `private`, `no-store`, `no-cache`, or `max-age=0`.  
   * The [Set-Cookie header](https://developers.cloudflare.com/cache/concepts/cache-behavior/#interaction-of-set-cookie-response-header-with-cache) exists.  
   * The HTTP request method is anything other than a `GET`.
* Cloudflare **does** cache the resource when:  
   * The `Cache-Control` header is set to `public` and `max-age` is greater than 0.  
   * The `Expires` header is set to a future date.

Note

Cloudflare does cache the resource even if there is no `Cache-Control` header based on [status codes](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code/#edge-ttl).

Note

If both `max-age` and an `Expires` header are set, `max-age` will be used by Cloudflare.

When [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/) is enabled on an Enterprise customer’s website, it indicates that Cloudflare should strictly respect `Cache-Control` directives received from the origin server. Free, Pro and Business customers have this feature enabled by default. For a list of directives and behaviors when Origin Cache-Control is enabled or disabled, refer to [Cache-Control directives](https://developers.cloudflare.com/cache/concepts/cache-control/#cache-control-directives).

## Client side range requests

Clients can send range requests to be served from the cache using the `Range` header. Note that:

* If the origin response includes a `Content-Length` header, then the specified byte range will be returned with an [HTTP 206](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/2xx-success/#206-partial-content) response.
* If the origin response does not include the `Content-Length` header, the cache will return the full content with an HTTP 200 response.

## Request collapsing

When multiple requests arrive simultaneously at a single Cloudflare data center for the same asset that is not in cache (a cache miss), Cloudflare uses a cache lock to avoid sending duplicate requests to your origin. Only the first request is forwarded to the origin to fetch the asset. The remaining requests wait for the first request to complete, after which the response is [streamed ↗](https://blog.cloudflare.com/introducing-concurrent-streaming-acceleration/) to all waiting requests.

The cache lock ensures that Cloudflare only sends one request at a time to the origin for a given asset from a single location in Cloudflare's network, preventing the origin from receiving excessive traffic.

## Default cached file extensions

Cloudflare only caches based on file extension and not by MIME type. The Cloudflare CDN does not cache HTML or JSON by default. Additionally, by default Cloudflare caches a website's robots.txt.

| 7Z    | CSV  | GIF  | MIDI | PNG  | TIF   | ZIP |
| ----- | ---- | ---- | ---- | ---- | ----- | --- |
| AVI   | DOC  | GZ   | MKV  | PPT  | TIFF  | ZST |
| AVIF  | DOCX | ICO  | MP3  | PPTX | TTF   |     |
| APK   | DMG  | ISO  | MP4  | PS   | WEBM  |     |
| BIN   | EJS  | JAR  | OGG  | RAR  | WEBP  |     |
| BMP   | EOT  | JPG  | OTF  | SVG  | WOFF  |     |
| BZ2   | EPS  | JPEG | PDF  | SVGZ | WOFF2 |     |
| CLASS | EXE  | JS   | PICT | SWF  | XLS   |     |
| CSS   | FLAC | MID  | PLS  | TAR  | XLSX  |     |

To cache additional content, refer to [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to create a rule to cache everything.

## Edge TTL

By default, Cloudflare caches certain HTTP response codes with the following Edge Cache TTL when a `cache-control` directive or `expires` response header are not present.

| HTTP status code | Default TTL |
| ---------------- | ----------- |
| 200, 206, 301    | 120m        |
| 302, 303         | 20m         |
| 404, 410         | 3m          |

All other status codes are not cached by default.

## Customization options and limits

Cloudflare’s CDN provides several cache customization options:

* Caching behavior for individual URLs via [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
[ Go to **Cache Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules) 
* Customize caching with [Cloudflare Workers](https://developers.cloudflare.com/workers/reference/how-the-cache-works/)
* Adjust caching level, cache TTL, and more in the Caching page in the Cloudflare dashboard:
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration) 

### Upload limits

| Free            | Pro    | Business | Enterprise |         |
| --------------- | ------ | -------- | ---------- | ------- |
| Availability    | Yes    | Yes      | Yes        | Yes     |
| Max upload size | 100 MB | 100 MB   | 200 MB     | 500+ MB |

Customers can reduce the **Maximum Upload Size** from the zone's **Network** page.

If you require a larger upload, you can group requests into smaller chunks, upload the full resource through a [DNS-only (unproxied) DNS record](https://developers.cloudflare.com/dns/proxy-status/) or [upgrade your plan](https://developers.cloudflare.com/billing/manage/change-plan/).

### Cacheable size limits

Cloudflare cacheable file limits:

* Free, Pro and Business customers have a limit of 512 MB.
* For Enterprise customers the default maximum cacheable file size is 5 GB. Contact your account team to request a limit increase.

## When does Cloudflare cache successfully?

The connection status between visitors and Cloudflare can vary, affecting whether Cloudflare caches the content or not. If Cloudflare has already established a connection to the origin and started fetching the content, it will continue to retrieve and cache the entire content, even if the visitor disconnects midway. However, if a visitor disconnects before the origin responds to Cloudflare's request, no content will have been fetched yet, so Cloudflare will not start caching the content.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#page","headline":"Default Cache Behavior · Cloudflare Cache (CDN) docs","description":"Default file extensions and content types that Cloudflare caches.","url":"https://developers.cloudflare.com/cache/concepts/default-cache-behavior/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/concepts/default-cache-behavior/","name":"Default cache behavior"}}]}
```
