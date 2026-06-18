---
title: Enable cache in an R2 bucket
description: Serve cached content from R2 buckets through Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable cache in an R2 bucket

By default, R2 buckets are private. To serve R2 objects through Cloudflare's cache, you need to attach a domain name you control — called a [Custom Domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains) — to the bucket. This creates a public URL backed by Cloudflare's network, so requests for your stored files go through Cloudflare's cache instead of hitting R2 directly every time.

Follow these steps to set up a Custom Domain for your bucket:

1. Go to **R2** and select your bucket.
2. On the bucket page, select **Settings**.
3. Under **Public access** \> **Custom Domains**, select **Connect Domain**.
4. Enter the domain name you want to connect to and select **Continue**.
5. Review the new DNS record that will be added and select **Connect Domain**.

Cloudflare automatically adds a CNAME record that maps your domain to the bucket, generating a publicly available URL in the format `[name].domain.com`.

Note

The development URL (`r2.dev`) does not support caching, WAF, or bot management. You must use a Custom Domain for these features.

## Tiered Cache

By default, Cloudflare caches R2 content at edge data centers (the data centers closest to visitors) based on [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/). Each edge data center that gets a cache miss fetches content directly from R2.

[Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) changes this by organizing data centers into a hierarchy. When a nearby data center has a cache miss, it first checks a designated upper-tier data center before going to R2\. This reduces the number of requests that reach R2.

To enable Tiered Cache for R2, configure [Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#smart-tiered-cache), which automatically selects the upper-tier data center with the lowest latency to your R2 bucket.

## Additional considerations

* **Access controls**: When you connect a Custom Domain, your R2 bucket becomes publicly accessible. Apply access controls to restrict who can request your files. Refer to [Control cache access with WAF and Snippets](https://developers.cloudflare.com/cache/interaction-cloudflare-products/waf-snippets/) for more information.
* **Cacheable size limits**: Files that exceed the [cacheable size limits](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#cacheable-size-limits) are not cached. Free, Pro, and Business plans have a limit of 512 MB per file. Enterprise plans default to 5 GB per file.
* **Default cached file types**: Cloudflare does not cache all file types by default. For example, HTML and JSON are not cached unless you create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/) with the appropriate settings.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/r2/#page","headline":"Enable cache in an R2 bucket · Cloudflare Cache (CDN) docs","description":"Serve cached content from R2 buckets through Cloudflare.","url":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/r2/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/r2/","name":"Enable cache in an R2 bucket"}}]}
```
