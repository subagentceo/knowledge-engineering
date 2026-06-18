---
title: Test speed
description: Test your website speed and Internet connection using Cloudflare dashboard tools and third-party services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Test speed

Cloudflare offers several tools to test the speed of your website, as well as the speed of your Internet connection.

---

## Test website speed

### Using Cloudflare

Once your domain is [active on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/), you can run speed tests within the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/speed).

This speed test will provide information about critical loading times, performance with and without [Cloudflare's proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), and recommended optimizations.

If you experience any issues, make sure you are not blocking specific [user agents](https://developers.cloudflare.com/fundamentals/reference/cloudflare-site-crawling/#other-situations).

### Using third-party tools

If your domain is not yet active on Cloudflare or you want to measure the before and after improvements of using Cloudflare, Cloudflare recommends using the following third-party tools:

* [PageGym ↗](https://pagegym.com/)
* [GTmetrix ↗](https://gtmetrix.com/)
* [DebugBear ↗](https://www.debugbear.com/test/website-speed)
* [Lighthouse ↗](https://developer.chrome.com/docs/lighthouse/)
* [WebPageTest ↗](https://www.webpagetest.org/)

If you use these third-party tools, you should do the following to test website speed:

1. [Pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) to remove performance and caching benefits.
2. Run a speed test.
3. Unpause Cloudflare.
4. Run a speed test[1](#user-content-fn-1).
5. Run a second speed test to get your baseline performance with Cloudflare.

### Improve speed

Based on the results of these speed tests, you may want to explore other ways to [optimize your site speed](https://developers.cloudflare.com/speed/) using Cloudflare.

Note

Cloudflare does not consider Time to First Byte (TTFB) the most important measure of page load speed. If you are concerned about a slower TTFB while using Cloudflare, refer to our blog post about [Cloudflare and TTFB ↗](http://blog.cloudflare.com/ttfb-time-to-first-byte-considered-meaningles/).

---

## Test Internet speed

To test the speed of your home network connection (download, update, packet loss, ping measurements, and more), visit [speed.cloudflare.com ↗](https://speed.cloudflare.com).

## Footnotes

1. The results of your first speed test with Cloudflare will likely contain uncached results, which will provide inaccurate results.  
    
One of the key ways Cloudflare speeds up your site is through [caching](https://developers.cloudflare.com/cache/), which will appear in the results of the second test. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/performance/test-speed/#page","headline":"Test speed · Cloudflare Fundamentals docs","description":"Test your website speed and Internet connection using Cloudflare dashboard tools and third-party services.","url":"https://developers.cloudflare.com/fundamentals/performance/test-speed/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/performance/test-speed/","name":"Test speed"}}]}
```
