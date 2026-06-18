---
title: Using ETag Headers with Cloudflare
description: How ETag headers work with Cloudflare caching.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using ETag Headers with Cloudflare

ETag headers identify whether the version of a resource cached in the browser is the same as the resource at the origin web server. A visitor's browser stores ETags. When a visitor revisits a site, the browser compares each ETag to the one it stored. Matching values cause a `304 Not-Modified HTTP` response that indicates the cached resource version is current. Cloudflare supports both strong and weak ETags configured at your origin web server.

## Weak ETags

Weak ETag headers indicate a cached resource is semantically equivalent to the version on the web server but not necessarily byte-for-byte identical.

Note

When using weak ETag headers, it is necessary to disable certain features such as [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) and [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) to prevent Cloudflare from removing the ETag headers set by your origin web server. For a comprehensive list of the features you need to disable, refer to the [Notes about end-to-end compression](https://developers.cloudflare.com/speed/optimization/content/compression/#notes-about-end-to-end-compression).

## Strong ETags

Strong ETag headers ensure the resource in browser cache and on the web server are byte-for-byte identical. Use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to enable strong ETag headers.

### Behavior with Respect Strong ETags enabled

When you enable **Respect Strong ETags** in a cache rule, Cloudflare will use strong ETag header validation to ensure that resources in the Cloudflare cache and on the origin server are byte-for-byte identical.

However, in some situations Cloudflare will convert strong ETags to weak ETags. For example, given the following conditions:

* **Respect Strong ETags** is enabled
* [Brotli compression](https://developers.cloudflare.com/speed/optimization/content/compression/) is enabled
* The origin server's response includes an `etag: "foobar"` strong ETag header

The Cloudflare network will take the following actions, depending on the visitor's `accept-encoding` header and the compression used in the origin server's response:

| accept-encodingheader from visitor | Compression used in origin server response | Cloudflare actions                                                                                     |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| gzip, br                           | GZIP                                       | Return GZIP-compressed response to visitor with strong ETag header: etag: "foobar".                    |
| gzip, br                           | Brotli                                     | Return Brotli-compressed response to visitor with strong ETag header: etag: "foobar".                  |
| br                                 | GZIP                                       | Decompress GZIP and return uncompressed response to visitor with weak ETag header: etag: W/"foobar".   |
| gzip                               | Brotli                                     | Decompress Brotli and return uncompressed response to visitor with weak ETag header: etag: W/"foobar". |
| gzip                               | (none)                                     | Return uncompressed response to visitor with strong ETag header: etag: "foobar".                       |
| gzip, br, zstd                     | Zstandard                                  | Return zstd-compressed response to visitor with strong ETag header: etag: "foobar".                    |
| gzip, br                           | Zstandard                                  | Decompress zstd and return br response to visitor with weak ETag header: etag: W/"foobar".             |
| zstd                               | Brotli/GZIP                                | Decompress zstd and return zstd response to visitor with weak ETag header: etag: W/"foobar".           |

Enabling **Respect Strong ETags** in Cloudflare automatically disables Rocket Loader, Email Obfuscation, and Automatic HTTPS Rewrites.

### Behavior with Respect Strong ETags disabled

When **Respect Strong ETags** is disabled, Cloudflare will preserve strong ETag headers set by the origin web server if all the following conditions apply:

* The origin server sends a response compressed using GZIP or Brotli, or an uncompressed response.
* If the origin server sends a compressed response, the visitor accepts the same compression (GZIP, Brotli), according to the `accept-encoding` header.
* [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) and [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) features are disabled.

In all other situations, Cloudflare will either convert strong ETag headers to weak ETag headers or remove the strong ETag. For example, given the following conditions:

* **Respect Strong ETags** is disabled
* [Brotli compression](https://developers.cloudflare.com/speed/optimization/content/compression/) is enabled
* The origin server's response includes an `etag: "foobar"` strong ETag header

The Cloudflare network will take the following actions, depending on the visitor's `accept-encoding` header and the compression used in the origin server's response:

| accept-encodingheader from visitor | Compression used in origin server response | Cloudflare actions                                                                                                                              |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| gzip, br                           | GZIP                                       | Decompress GZIP and return Brotli-compressed response to visitor (since Brotli compression is enabled) with weak ETag header: etag: W/"foobar". |
| gzip, br                           | Brotli                                     | Return Brotli-compressed response to visitor with strong ETag header: etag: "foobar".                                                           |
| br                                 | GZIP                                       | Decompress GZIP and return Brotli-compressed response to visitor with weak ETag header: etag: W/"foobar".                                       |
| gzip                               | Brotli                                     | Decompress Brotli and return GZIP-compressed response to visitor with weak ETag header: etag: W/"foobar".                                       |
| gzip                               | (none)                                     | Compress origin response using GZIP and return it to visitor with weak ETag header: etag: W/"foobar".                                           |
| gzip, br, zstd                     | Zstandard                                  | Return zstd-compressed response to visitor with strong ETag header: etag: "foobar".                                                             |
| gzip, br                           | Zstandard                                  | Decompress zstd and return uncompressed response to visitor with weak ETag header: etag: W/"foobar".                                            |
| zstd                               | Brotli                                     | Decompress zstd and return uncompressed response to visitor with weak ETag header: etag: W/"foobar".                                            |

Refer to [Content compression](https://developers.cloudflare.com/speed/optimization/content/compression/) for more information.

## Important remarks

* You must set the value in a strong ETag header using double quotes (for example, `etag: "foobar"`). If you use an incorrect format, Cloudflare will remove the ETag header instead of converting it to a weak ETag.
* If a resource is cacheable and there is a cache miss, Cloudflare does not send ETag headers to the origin server. This is because Cloudflare requires the full response body to fill its cache.
* If your origin (or R2) applies compression based on `accept-encoding`, the first compression type will be cached. Consider whether strong ETags fit your use case, or use cache key rules to handle different compression types.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/reference/etag-headers/#page","headline":"Using ETag Headers with Cloudflare · Cloudflare Cache (CDN) docs","description":"How ETag headers work with Cloudflare caching.","url":"https://developers.cloudflare.com/cache/reference/etag-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/reference/etag-headers/","name":"Using ETag Headers with Cloudflare"}}]}
```
