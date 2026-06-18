---
title: robots.txt and sitemaps
description: Configure robots.txt rules and sitemaps to control how Browser Run accesses your website.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# robots.txt and sitemaps

This page provides general guidance on configuring `robots.txt` and sitemaps for websites you plan to access with Browser Run.

robots.txt is advisory, not enforceable

The `robots.txt` standard is a voluntary protocol. Only well-behaved bots choose to follow it. Any client can send any User-Agent string, so `robots.txt` rules that target a specific User-Agent cannot prevent a spoofed or malicious client from accessing your site. To enforce access restrictions, use server-side controls such as a web application firewall (WAF), request header validation, or authentication.

To verify that a request originated from Cloudflare Browser Run specifically, use the cryptographic [Web Bot Auth](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#about-web-bot-auth) signatures or the [non-configurable headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#non-configurable-headers) that Cloudflare attaches to every Browser Run request. You can also create [WAF rules](https://developers.cloudflare.com/browser-run/faq/#can-i-allowlist-browser-run-on-my-own-website) using the [bot detection IDs](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#bot-detection) to allow or block Browser Run traffic.

## Identifying Browser Run requests

Requests can be identified by the [automatic headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/) that Cloudflare attaches:

* [User-Agent](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#user-agent): Each Browser Run method has a different default User-Agent, which you can use to write targeted `robots.txt` rules
* `cf-brapi-request-id`: Unique identifier for Quick Actions requests
* `Signature-agent`: Pointer to Cloudflare's bot verification keys

To allow or block Browser Run traffic using WAF rules instead of `robots.txt`, use the [bot detection IDs](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#bot-detection) on the automatic request headers page.

## Best practices for robots.txt

A well-configured `robots.txt` helps crawlers understand which parts of your site they can access.

### Reference your sitemap

Include a reference to your sitemap in `robots.txt` so crawlers can discover your URLs:

robots.txt

```

User-agent: *

Allow: /


Sitemap: https://example.com/sitemap.xml


```

You can list multiple sitemaps:

robots.txt

```

User-agent: *

Allow: /


Sitemap: https://example.com/sitemap.xml

Sitemap: https://example.com/blog-sitemap.xml


```

### Set a crawl delay

Use `crawl-delay` to control how frequently crawlers request pages from your server:

robots.txt

```

User-agent: *

Crawl-delay: 2

Allow: /


Sitemap: https://example.com/sitemap.xml


```

The value is in seconds. A `crawl-delay` of 2 means the crawler waits two seconds between requests.

## Blocking crawlers with robots.txt

If you want to prevent Browser Run (or other crawlers) from accessing your site, you can configure your `robots.txt` to restrict access.

### Block all bots from your entire site

To prevent all crawlers from accessing any page on your site:

robots.txt

```

User-agent: *

Disallow: /


```

This is the most restrictive configuration and blocks all compliant bots, not just Browser Run.

### Block only the /crawl endpoint

The [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/) identifies itself with the User-Agent `CloudflareBrowserRenderingCrawler/1.0`. To block the `/crawl` endpoint while allowing all other traffic (including other Browser Run [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) endpoints, which use a [different User-Agent](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#user-agent)):

robots.txt

```

User-agent: CloudflareBrowserRenderingCrawler

Disallow: /


User-agent: *

Allow: /


```

### Block the /crawl endpoint on specific paths

To allow the [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/) to access your site but block specific sections:

robots.txt

```

User-agent: CloudflareBrowserRenderingCrawler

Disallow: /admin/

Disallow: /private/

Allow: /


User-agent: *

Allow: /


```

## Best practices for sitemaps

Structure your sitemap to help crawlers process your site efficiently:

sitemap.xml

```

<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>

    <loc>https://example.com/important-page</loc>

    <lastmod>2025-01-15T00:00:00+00:00</lastmod>

    <priority>1.0</priority>

  </url>

  <url>

    <loc>https://example.com/other-page</loc>

    <lastmod>2025-01-10T00:00:00+00:00</lastmod>

    <priority>0.5</priority>

  </url>

</urlset>


```

| Attribute  | Purpose                       | Recommendation                                                                           |
| ---------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| <loc>      | URL of the page               | Required. Use full URLs.                                                                 |
| <lastmod>  | Last modification date        | Include to help the crawler identify updated content. Use ISO 8601 format.               |
| <priority> | Relative importance (0.0-1.0) | Set higher values for important pages. The crawler will process pages in priority order. |

### Sitemap index files

For large sites with multiple sitemaps, use a sitemap index file. Browser Run uses the `depth` parameter to control how many levels of nested sitemaps are crawled:

sitemap.xml

```

<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  ...

</urlset>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   <sitemap>

      <loc>https://www.example.com/sitemap-products.xml</loc>

   </sitemap>

   <sitemap>

      <loc>https://www.example.com/sitemap-blog.xml</loc>

   </sitemap>

</sitemapindex>


```

### Caching headers

Browser Run periodically refetches sitemaps to keep content fresh. Serve your sitemap with `Last-Modified` or `ETag` response headers so the crawler can detect whether the sitemap has changed since the last fetch.

### Recommendations

* Include `<lastmod>` on all URLs to help identify which pages have changed. Use ISO 8601 format (for example, `2025-01-15T00:00:00+00:00`).
* Use sitemap index files for large sites with multiple sitemaps.
* Compress large sitemaps using `.gz` format to reduce bandwidth.
* Keep sitemaps under 50 MB and 50,000 URLs per file (standard sitemap limits).

## Related resources

* [FAQ: Will Browser Run be detected by Bot Management?](https://developers.cloudflare.com/browser-run/faq/#will-browser-run-be-detected-by-bot-management) — How Browser Run interacts with bot protection and how to create a WAF skip rule
* [Automatic request headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/) — User-Agent strings and non-configurable headers used by Browser Run

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/robots-txt/#page","headline":"robots.txt and sitemaps · Cloudflare Browser Run docs","description":"Configure robots.txt rules and sitemaps to control how Browser Run accesses your website.","url":"https://developers.cloudflare.com/browser-run/reference/robots-txt/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/robots-txt/","name":"robots.txt and sitemaps"}}]}
```
