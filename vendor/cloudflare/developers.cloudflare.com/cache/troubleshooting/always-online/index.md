---
title: Always Online
description: Troubleshoot Always Online cached page issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Always Online

Observe the following best practices when enabling Always Online with Internet Archive integration.

* **Allow requests from the Internet Archive IP addresses.** Origin servers receive requests from the Internet Archive IPs. Make sure you are not blocking requests from the Internet Archive IP range: `207.241.224.0/20` and `208.70.24.0/21`.
* **The Internet Archive does not consider your origin server's cache-control header.** When the Internet Archive is crawling sites, it will crawl sites regardless of their cache-control, since the Internet Archive does not cache assets, but archives them.
* **Consider potential conflicts with Cloudflare features that transform URIs.** Always Online with Internet Archive integration may cause issues with Cache Rules and other Cloudflare features that transform URIs due to the way the Internet Archive crawls pages to archive. Specifically, some redirects that take place at the edge may cause the Internet Archive's crawler not to archive the target URL. Before enabling Origin Cache Control, review [how Cloudflare caches resources by default](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) as well as any Cache Rules you have configured so that you can avoid these issues. If you experience problems, disable Always Online.
* **Do not block Known Bots or Verified Bots via a WAF custom rule.** If you block either of these bot lists, the Internet Archive will not be able to crawl.

Do not use Always Online with:

* API traffic.
* An [IP Access rule](https://developers.cloudflare.com/waf/tools/ip-access-rules/) or a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) that blocks the United States or
* Bypass Cache cache rules. Always Online ignores Bypass Cache cache rules and serves Always Online cached assets.

## Limitations

There are limitations with the Always Online functionality:

1. Always Online is not immediately active for sites recently added due to:  
   * DNS record propagation, which can take 24-72 hours  
   * Always Online has not initially crawled the website
2. Cloudflare cannot show private content behind logins or handle form submission (POSTs) if your origin web server is offline.

Always Online does not trigger for HTTP response codes such as [404](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-404/), [503](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-503/), or [500](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/) errors such as database connection errors or internal server errors. This is because these status codes indicate the origin is reachable and responding — Always Online only activates when Cloudflare cannot connect to your origin at all (resulting in Cloudflare-generated [520–527](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-520/) status codes). If your origin returns a 5xx error, the origin is online by definition and Always Online will not intervene.

## Frequently asked questions

1. How can I know if a page has been crawled?  
   * You can go to the [Internet Archive ↗](https://web.archive.org/) and search for the page URL to see if it has been crawled or not.  
   * You can also check this via the [Internet Archive Availability API ↗](https://archive.org/help/wayback%5Fapi.php).
2. Why were not pages x, y, and z crawled?  
   * Since Cloudflare only requests to crawl the most popular pages on the site, it is possible that there will be missing pages. If you really want to archive a page, then you can visit the [Internet Archive ↗](https://web.archive.org/save) save page and ask them to crawl a particular page.
3. What IP addresses do we need to allowlist to make sure crawling works?  
   * IP Range: `207.241.224.0/20` and `208.70.24.0/21`. Note that this ip range belongs to Internet Archive and NOT Cloudflare, since it is the Internet Archive that does the crawling.
4. What user agent should the origin expect to see?  
   * Currently the Internet Archive uses: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/605.1.15`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/always-online/#page","headline":"Always Online - Troubleshooting · Cloudflare Cache (CDN) docs","description":"Troubleshoot Always Online cached page issues.","url":"https://developers.cloudflare.com/cache/troubleshooting/always-online/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/troubleshooting/always-online/","name":"Always Online"}}]}
```
