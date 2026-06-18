---
title: Order and priority
description: How Cache Rules are ordered and which rule takes priority.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Order and priority

Cache rules affect requests differently from Page Rules. This is how they are applied:

1. Cache Rules are stackable. This means that multiple matching rules can be combined and applied to the same request. For example, if multiple cache rules match the same URL, then the features set in those cache rules will all be applied in order. If several matching rules set a value for the same setting, the value in the last matching rule wins. For an example of a similar scenario where multiple rules match, refer to the [Origin Rules FAQ](https://developers.cloudflare.com/rules/origin-rules/faq/#what-happens-if-more-than-one-origin-rule-matches-the-current-request).
2. For conflicting settings (for example, bypass cache versus eligible for cache), the last matching rule wins. For example, if cache rule #1 is set to cache everything on `example.com/images` and cache rule #2 is set to bypass cache on `example.com`, then cache will be bypassed for all URLs that match `example.com`, since rule #2 is the last matching rule.
3. If you have Page Rules implemented for caching on the same path, Cache Rules will take precedence by design.
4. Cache rules can be more specific than website-wide settings in the cache configuration tab, so they take precedence over website-wide settings on requests they match against. For example, if browser cache TTL is set to 4 hours for the entire website `example.com` and there is a cache rule matching requests with a path of `/feed` setting browser cache TTL to 10 seconds, the cache rule will override the website-wide setting for requests to `https://example.com/feed`.

## Execution order of Rules products

The execution order of Rules features is the following:

* [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
* [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/)
* [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/)
* [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/)
* [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)
* [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)
* [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/)
* [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
* [Snippets](https://developers.cloudflare.com/rules/snippets/)
* [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/)

The different types of rules listed above will take precedence over [Page Rules](https://developers.cloudflare.com/rules/page-rules/). This means that Page Rules will be overridden if there is a match for both Page Rules and the Rules products listed above.

Generally speaking, for [non-terminating actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) the last change made by rules in the same [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) will win (later rules can overwrite changes done by previous rules). However, for terminating actions (_Block_, _Redirect_, or one of the challenge actions), rule evaluation will stop and the action will be executed immediately.

For example, if multiple rules with the _Redirect_ action match, Cloudflare will always use the URL redirect of the first rule that matches. Also, if you configure URL redirects using different Cloudflare products (Single Redirects and Bulk Redirects), the product executed first will apply, if there is a rule match (in this case, Single Redirects).

Refer to the [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) for the product execution order.

Warning

Using Cloudflare challenges along with Rules features may cause challenge loops. Refer to [Rules troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/order/#page","headline":"Order and priority · Cloudflare Cache (CDN) docs","description":"How Cache Rules are ordered and which rule takes priority.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/order/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/order/","name":"Order and priority"}}]}
```
