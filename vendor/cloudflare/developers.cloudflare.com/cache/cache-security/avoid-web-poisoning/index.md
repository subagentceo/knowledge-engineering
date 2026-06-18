---
title: Avoid web cache poisoning
description: Protect your site from web cache poisoning attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Avoid web cache poisoning

A cache poisoning attack uses an HTTP request to trick an origin web server into responding with a harmful resource that has the same cache key as a clean request. As a result, the poisoned resource gets cached and served to other users.

A Content Delivery Network (CDN) like Cloudflare relies on cache keys to compare new requests against cached resources. The CDN then determines whether the resource should be served from the cache or requested directly from the origin web server.

## Learn about Cache Poisoning

To deepen your understanding of the risks and vulnerabilities associated with cache poisoning, consult the following resources:

* [Practical Web Cache Poisoning ↗](https://portswigger.net/blog/practical-web-cache-poisoning)
* [How Cloudflare protects customers from cache poisoning ↗](https://blog.cloudflare.com/cache-poisoning-protection/)

## Only cache files that are truly static

Review the caching configuration for your origin web server and ensure you are caching files that are static and do not depend on user input in any way. To learn more about Cloudflare caching, review:

* [Which file extensions does Cloudflare cache for static content?](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)
* [How Do I Tell Cloudflare What to Cache?](https://developers.cloudflare.com/cache/how-to/cache-rules/)

## Do not trust data in HTTP headers

Attackers can exploit HTTP headers to inject malicious content into cached responses. For example, if your application reflects an untrusted header value in the response body, an attacker could use this to perform cross-site scripting (XSS) through the cache. To reduce this risk:

* Do not rely on values in HTTP headers if they are not part of your [cache key](https://developers.cloudflare.com/cache/how-to/cache-keys/).
* Do not include untrusted header values in your response body.

## Do not trust GET request bodies

Cloudflare caches contents of GET request bodies, but they are not included in the cache key. GET request bodies should be considered untrusted and should not modify the contents of a response. If a GET body can change the contents of a response, consider bypassing cache or using a POST request.

## Monitor web security advisories

To keep informed about Internet security threats, Cloudflare recommends that you monitor web security advisories on a regular basis. Some of the more popular advisories include:

* [Drupal Security Advisories ↗](https://www.drupal.org/security)
* [Symfony Security Advisories ↗](https://symfony.com/blog/category/security-advisories)
* [Laminas Security Advisories ↗](https://getlaminas.org/security/advisories)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/#page","headline":"Avoid Web Cache Poisoning · Cloudflare Cache (CDN) docs","description":"Protect your site from web cache poisoning attacks.","url":"https://developers.cloudflare.com/cache/cache-security/avoid-web-poisoning/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/cache-security/","name":"Cache security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/cache-security/avoid-web-poisoning/","name":"Avoid web cache poisoning"}}]}
```
