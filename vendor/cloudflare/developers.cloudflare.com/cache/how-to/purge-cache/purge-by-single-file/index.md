---
title: ​Purge by single-file
description: Purge a single cached file by URL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ​Purge by single-file

With purge by single-file, cached resources are instantly removed from the stored assets in your Content Delivery Network (CDN) across all data centers. New requests for the purged asset receive the latest version from your origin web server and add it back to your CDN cache within the specific Cloudflare data center that served the request.

For information on single-file purge rate limits, refer to the [limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#single-file-purge-limits) section.

A single-file purge performed through your Cloudflare dashboard does not clear objects that contain any of the following:

* [Custom cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/)
* [Origin header ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin)
* Any of these request headers:  
   * `X-Forwarded-Host`  
   * `X-Host`  
   * `X-Forwarded-Scheme`  
   * `X-Original-URL`  
   * `X-Rewrite-URL`  
   * `Forwarded`

You can purge objects with these characteristics using an API call to ([purge files by URL](https://developers.cloudflare.com/api/resources/cache/methods/purge/)). In the data/header section of the API call, you must include all headers and cache keys contained in the cached resource, along with their matching values.

Warning

Always use UTF-8 encoded URLs for single-file cache purges. Wildcards are not supported on single file purge, and you must use purge by hostname, prefix, or implement cache tags as an alternative solution.

1. In the Cloudflare dashboard, go to the **Configuration** page.  
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
3. Under **Purge by**, select **URL**.
4. Enter the appropriate value(s) in the text field using the format shown in the example. Be aware that the host part of the URL is not case-sensitive, meaning it will always be converted to lowercase according to RFC standards. However, the path portion is case-sensitive. For example, `https://EXAMPLE.com/helloHI` would be treated as `https://example.com/helloHI`.
5. Perform any additional instructions to complete the form.
6. Review your entries.
7. Select **Purge**.

Note

For information on how to use single-file purge to purge assets cached by a Workers fetch, refer to [Single file purge assets cached by a Worker](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#single-file-purge-assets-cached-by-a-worker).

For information on how to purge assets cached by [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) operations, refer to [Purge assets stored with the Cache API](https://developers.cloudflare.com/workers/reference/how-the-cache-works/#purge-assets-stored-with-the-cache-api).

Warning

If you have a [Transform Rule](https://developers.cloudflare.com/rules/transform/) in place that is modifying part of a URL path, you must use the non-transform (end user) URL when performing single file purge so that purge can take effect.

## Resulting cache status

Purging by single-file deletes the resource, resulting in the `CF-Cache-Status` header being set to [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) for subsequent requests.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/#page","headline":"​Purge by single-file · Cloudflare Cache (CDN) docs","description":"Purge a single cached file by URL.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge-by-single-file/","name":"​Purge by single-file"}}]}
```
