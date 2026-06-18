---
title: Get started
description: Set up and configure Cloudflare caching for your website.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Cloudflare speeds up your website by caching content across globally distributed data centers.

Content can be static or dynamic. Static content — such as images, CSS, and JavaScript files — is [cacheable](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions) by default. Dynamic content, such as HTML pages, is not cached by default, but you can use [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to cache it.

Cloudflare caches static content based on the following factors:

* [Caching levels](https://developers.cloudflare.com/cache/how-to/set-caching-levels/)
* [File extension](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions)
* Presence of [query strings](https://developers.cloudflare.com/cache/advanced-configuration/query-string-sort/)
* [Origin cache-control headers](https://developers.cloudflare.com/cache/concepts/cache-control/)
* Origin headers that indicate dynamic content
* Cache rules that bypass cache on cookie

Cloudflare only caches resources within the Cloudflare data center that serve the request. Cloudflare does not cache off-site or third-party resources, or content hosted on [DNS-only (unproxied)](https://developers.cloudflare.com/dns/proxy-status/) DNS records.

## Learn the basics

Discover the benefits of caching with Cloudflare's CDN and understand the default cache behavior.

* [Understand what is a CDN ↗](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
* [Understand default cache behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)
* [Understand the default file types Cloudflare caches](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions)

## Make more resources cacheable

Configure your settings to cache static HTML or cache anonymous page views of dynamic content.

* [Customize Caching with Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
* [Specify which resources to cache](https://developers.cloudflare.com/cache/concepts/customize-cache/)
* [Understand Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/)
* [Cache by device type (Enterprise only)](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-device-type/)

## Improve cache HIT rates

Include or exclude query strings, optimize cache keys, or enable [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) to improve HIT rates and reduce traffic to your origin.

* [Choose a cache level](https://developers.cloudflare.com/cache/how-to/set-caching-levels/)
* [Enable Tiered Cache with Argo](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache)
* [Configure custom cache keys (Enterprise only)](https://developers.cloudflare.com/cache/how-to/cache-keys/)
* [Enable Prefetch URLs (Enterprise only)](https://developers.cloudflare.com/speed/optimization/content/prefetch-urls/)

## Secure your cache configuration

Control resources a client is allowed to load and set access permissions to allow different origins to access your origin's resources. Protect your site from web cache deception attacks while still caching static assets.

* [Avoid web cache poisoning attacks](https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/)
* [Configure Cross-Origin Resource Sharing (CORS)](https://developers.cloudflare.com/cache/cache-security/cors/)
* [Enable Cache Deception Armor](https://developers.cloudflare.com/cache/cache-security/cache-deception-armor/#enable-cache-deception-armor)

## Features that alter cached content

Some Cloudflare features modify your HTML or cached objects at the edge to enable optimizations or security protections. These alterations only affect cached copies at Cloudflare's edge and do not change your original source files. Cloudflare removes the changes when you disable the feature and purge the cache. These alterations only affect cached copies at Cloudflare's edge and do not change your original source files. The changes are removed if the feature is disabled and the cache is purged.

* [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/)
* [Polish](https://developers.cloudflare.com/images/polish/)
* [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/)
* [Email address obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/)
* [Bot Management JavaScript Detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/)

## Troubleshoot

Resolve common caching concerns.

* [Learn about Cloudflare's cache response statuses](https://developers.cloudflare.com/cache/concepts/cache-responses/)
* [Investigate Cloudflare's cache response with cURL](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#troubleshoot-requests-with-curl)
* [Diagnose Always Online issues](https://developers.cloudflare.com/cache/troubleshooting/always-online/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/get-started/#page","headline":"Get started with Cache · Cloudflare Cache (CDN) docs","description":"Set up and configure Cloudflare caching for your website.","url":"https://developers.cloudflare.com/cache/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CORS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/get-started/","name":"Get started"}}]}
```
