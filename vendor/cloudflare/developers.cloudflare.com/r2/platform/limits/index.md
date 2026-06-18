---
title: Limits
description: Account, bucket, and object limits for Cloudflare R2 storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

| Feature                                                                         | Limit                                                                |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Data storage per bucket                                                         | Unlimited                                                            |
| Number of objects per bucket                                                    | Unlimited                                                            |
| Maximum number of buckets per account                                           | 1,000,000                                                            |
| Maximum rate of bucket management operations per bucket [1](#user-content-fn-1) | 50 per second                                                        |
| Number of custom domains per bucket                                             | 100                                                                  |
| Object key length                                                               | 1,024 bytes                                                          |
| Object metadata size                                                            | 8,192 bytes                                                          |
| Object size                                                                     | 5 TiB per object [2](#user-content-fn-2)                             |
| Maximum upload size [3](#user-content-fn-3)                                     | 5 GiB (single-part) / 4.995 TiB (multi-part) [4](#user-content-fn-4) |
| Maximum upload parts                                                            | 10,000                                                               |
| Maximum concurrent writes to the same object name (key)                         | 1 per second [5](#user-content-fn-5)                                 |

Limits specified in MiB (mebibyte), GiB (gibibyte), or TiB (tebibyte) are storage units of measurement based on base-2\. 1 GiB (gibibyte) is equivalent to 230 bytes (or 10243 bytes). This is distinct from 1 GB (gigabyte), which is 109 bytes (or 10003 bytes).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Rate limiting on managed public buckets through `r2.dev`

Managed public bucket access through an `r2.dev` subdomain is not intended for production usage and has a variable rate limit applied to it. The `r2.dev` endpoint for your bucket is designed to enable testing.

* If you exceed the rate limit (hundreds of requests/second), requests to your `r2.dev` endpoint will be temporarily throttled and you will receive a `429 Too Many Requests` response.
* Bandwidth (throughput) may also be throttled when using the `r2.dev` endpoint.

For production use cases, connect a [custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains) to your bucket. Custom domains allow you to serve content from a domain you control (for example, `assets.example.com`), configure fine-grained caching, set up redirect and rewrite rules, mutate content via [Cloudflare Workers](https://developers.cloudflare.com/workers/), and get detailed URL-level analytics for content served from your R2 bucket.

## Cloudflare REST API

The [Cloudflare REST API](https://developers.cloudflare.com/api/resources/r2/) is rate limited to 1,200 requests per five minutes across all R2 REST API operations on your account.

For high-throughput object operations, use the [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead. The Cloudflare REST API is best suited for lower-volume management and configuration operations.

## Footnotes

1. Bucket management operations include creating, deleting, listing, and configuring buckets. This limit does _not_ apply to reading or writing objects to a bucket. [↩](#user-content-fnref-1)
2. The object size limit is 5 GiB less than 5 TiB, so 4.995 TiB. [↩](#user-content-fnref-2)
3. Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or copying into a part of a multipart upload. If you have a Worker, its inbound request size is constrained by [Workers request limits](https://developers.cloudflare.com/workers/platform/limits#request-limits). The max upload size limit does not apply to subrequests. [↩](#user-content-fnref-3)
4. The max upload size is 5 MiB less than 5 GiB, so 4.995 GiB. [↩](#user-content-fnref-4)
5. Concurrent writes to the same object name (key) at a higher rate return HTTP 429 (rate limited) responses. [↩](#user-content-fnref-5)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/limits/#page","headline":"Limits · Cloudflare R2 docs","description":"Account, bucket, and object limits for Cloudflare R2 storage.","url":"https://developers.cloudflare.com/r2/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/platform/limits/","name":"Limits"}}]}
```
