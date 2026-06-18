---
title: ​Purge cache by prefix (URL)
description: Purge cached resources by URL prefix.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ​Purge cache by prefix (URL)

You can instantly purge their cache by URL prefix or path separators in their URL. For an example URL like `https://www.example.com/foo/bar/baz/qux.jpg`, valid purge requests include:

* `www.example.com`
* `www.example.com/foo`
* `www.example.com/foo/bar`
* `www.example.com/foo/bar/baz`
* `www.example.com/foo/bar/baz/qux.jpg`

Purging by prefix is useful in different scenarios, such as:

* Purging everything within a directory.
* Increasing control over cached objects in a path.
* Simplifying the number of purge calls sent.
1. In the Cloudflare dashboard, go to the **Configuration** page.  
[ Go to **Configuration** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
3. Under **Purge by**, select **Prefix**.
4. Follow the syntax instructions.  
   * One prefix per line.  
   * Maximum 30 prefixes per API call.
5. Enter the appropriate value(s) in the text field using the format shown in the example.
6. Select **Purge**.

For information on rate limits, refer to the [Availability and limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits) section.

Warning

If you have a [Transform Rule](https://developers.cloudflare.com/rules/transform/) in place that is modifying part of a URL path, you must use the post-transformed (origin) URL when performing a prefix purge so that purge can take effect.

## Resulting cache status

Purging by prefix deletes the resource, causing `CF-Cache-Status` header to show [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) for the subsequent request.

If [tiered cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) is used, purging by prefix may return `EXPIRED`, as the lower tier tries to revalidate with the upper tier to reduce load on the latter. Depending on whether the upper tier has the resource or not, and whether the end user is reaching the lower tier or the upper tier, `EXPIRED` or `MISS` are returned.

## Limitations

There are several limitations regarding purge by prefix:

* Path separators are limited to 31 for a prefix `(example.com/a/b/c/d/e/f/g/h/i/j/k/l/m…)`.
* Purge requests are limited to 30 prefixes per request.
* [Purge rate-limits apply](https://developers.cloudflare.com/api/resources/cache/methods/purge/).
* URI query strings & fragments cannot purge by prefix:  
   * `www.example.com/foo?a=b` (query string)  
   * `www.example.com/foo#bar` (fragment)

Warning

Because purge by prefix purges a directory, any URI for a resource within the purged directory is purged regardless of query string or fragment (though fragments are not generally sent by browsers). Purge by prefix rules do not accept fragments and query strings.

Example: If you purge `foo.com/bar`, any asset that starts with `foo.com/bar` will be purged, for example, `foo.com/bar/baz`, `foo.com/bar?good=bad`, etc. and purging `foo.com/bar?good=bad` itself will not work.

## Purge by prefix normalization

Using purge by prefix normalization, when a purge by prefix request comes into Cloudflare for a normalized URL path, the purge service respects the [URL normalization](https://developers.cloudflare.com/rules/normalization/) and purges the normalized URL.

### How does URL Normalization work

Take the following website as an example: `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`. The table below shows you how Cloudflare’s cache views these paths with [normalization on/off](https://developers.cloudflare.com/rules/normalization/).

| Request from visitor to EDGE                                                                                                                                                                                                                                                                | What Cloudflare cache sees with Normalize Incoming URLs ON                                                                                                                                                                                                                                  | What Cloudflare cache sees with Normalize Incoming URLs OFF                                                                                                                                                                                                                                 | |  [https://cloudflare.com/انشاء-موقع-الكتروني/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) | [https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) | [https://cloudflare.com/انشاء-موقع-الكتروني/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) | [https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) | [https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img\_1.jpg ↗](https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img%5F1.jpg) |                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                        |
| [https://cloudflare.com/hello/img\_1.jpg ↗](https://cloudflare.com/hello/img%5F1.jpg)                                                                                                                                                                                                       | [https://cloudflare.com/hello/img\_1.jpg ↗](https://cloudflare.com/hello/img%5F1.jpg)                                                                                                                                                                                                       | [https://cloudflare.com/hello/img\_1.jpg ↗](https://cloudflare.com/hello/img%5F1.jpg)                                                                                                                                                                                                       |                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                        |

As shown above, with URL normalization **ON**, visitors to the two URLs, `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` and `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`, will be served the same cached asset. Purging `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` will instantly purge that asset for both visitors.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/#page","headline":"​Purge cache by prefix (URL) · Cloudflare Cache (CDN) docs","description":"Purge cached resources by URL prefix.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge_by_prefix/","name":"​Purge cache by prefix (URL)"}}]}
```
