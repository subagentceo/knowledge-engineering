---
title: How Workers interact with Cache Rules
description: How Workers interact with Cache Rules execution.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Workers interact with Cache Rules

When you use both [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) and [Workers](https://developers.cloudflare.com/workers/) on the same request, the Worker's cache settings take priority — but only when the required [compatibility flags](#compatibility-flags) are enabled.

Your Workers script can override Cache Rules behavior, whether the request is for a domain proxied through Cloudflare or a domain that is not. For example, if a Cache Rule is configured to bypass cache for `example.com/foo`, but your Workers script sets `cacheEverything: true` in the [cf object](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) of a `fetch()` request, the Worker's setting takes precedence and the response is cached.

## Precedence order

Cache behavior is determined by the following order of precedence:

1. [Workers](https://developers.cloudflare.com/workers/) script settings
2. [Cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
3. [Page rules](https://developers.cloudflare.com/rules/page-rules/)

Workers override Cache Rules, and Cache Rules override Page Rules. When multiple rules at the same level match the same request, the [last matching rule wins](https://developers.cloudflare.com/cache/how-to/cache-rules/order/) for any conflicting settings.

## Compatibility flags

The override behavior is controlled by [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/) — configuration settings that opt your Worker into specific runtime behaviors. There are two flags because Workers have two ways to interact with the cache:

* For the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) (`fetch()` with `cf` properties): `request_cf_overrides_cache_rules`
* For the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) (`caches.default.put()` / `caches.default.match()`): `cache_api_request_cf_overrides_cache_rules`

These flags must be enabled to allow Workers scripts to override Cache Rules. If the correct flag is not enabled for the API you are using, your Worker's cache settings are silently ignored and Cache Rules apply instead.

### Compatibility date behavior

A Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) determines which flags are active by default. When you set a compatibility date, all flags with an enable date on or before that date are automatically turned on.

| Flag                                                         | Enabled by default                         | Prerequisite                       |
| ------------------------------------------------------------ | ------------------------------------------ | ---------------------------------- |
| request\_cf\_overrides\_cache\_rules (Fetch API)             | Compatibility dates on or after 2025-04-02 | None                               |
| cache\_api\_compat\_flags                                    | Compatibility dates on or after 2025-04-19 | None                               |
| cache\_api\_request\_cf\_overrides\_cache\_rules (Cache API) | Compatibility dates on or after 2025-05-19 | Requires cache\_api\_compat\_flags |

The Cache API has an extra requirement: `cache_api_compat_flags` must be enabled for any compatibility flags to take effect on the Cache API. Without it, the Cache API ignores all compatibility flags, even ones you explicitly list in your configuration.

If your Worker uses a compatibility date before the dates listed above, you must manually add the flags to your configuration. Otherwise, cache behavior follows Cache Rules instead of the Worker's settings.

### Example (Older compatibility date)

A Cache Rule bypasses cache for `example.com/foo`. A Worker with a compatibility date before `2025-04-02` sets `cacheEverything: true` via `fetch()`. Because the compatibility date is too old for `request_cf_overrides_cache_rules` to be active by default, the Cache Rule wins and the response is not cached.

Similarly, if you use the Cache API and your compatibility date is before `2025-04-19`, `cache_api_compat_flags` is not active. Even if you manually add `cache_api_request_cf_overrides_cache_rules` to your configuration, it has no effect because the Cache API does not recognize compatibility flags without `cache_api_compat_flags`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers-cache-rules/#page","headline":"How Workers interact with Cache Rules · Cloudflare Cache (CDN) docs","description":"How Workers interact with Cache Rules execution.","url":"https://developers.cloudflare.com/cache/interaction-cloudflare-products/workers-cache-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/interaction-cloudflare-products/","name":"Interaction with Cloudflare products"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/interaction-cloudflare-products/workers-cache-rules/","name":"How Workers interact with Cache Rules"}}]}
```
