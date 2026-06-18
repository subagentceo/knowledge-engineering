---
title: Purge cache
description: Remove cached content from Cloudflare edge servers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Purge cache

Cloudflare's Instant Purge ensures that updates to your content are reflected immediately. Multiple options are available for purging content, with single-file cache purging (purge by URL) being the recommended method. However, the following additional options are also available:

* [ ​Purge by single-file ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/)
* [ ​Purge everything ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/)
* [ Purge cache by cache-tags ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/)
* [ ​Purge cache by hostname ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/)
* [ ​Purge cache by prefix (URL) ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge%5Fby%5Fprefix/)
* [ Purge cache key resources ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-cache-key/)
* [ P​urge varied images ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-varied-images/)
* [ Purge zone versions via API ](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-zone-versions/)

Note

If versioning is active on your zone and multiple environments are configured, you can select the specific environment you want to purge. For more details, refer to the [Version Management](https://developers.cloudflare.com/version-management/) documentation.

## Availability and limits

| Free          | Pro                                              | Business                                         | Enterprise                                       |                                                  |
| ------------- | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| Availability  | Yes                                              | Yes                                              | Yes                                              | Yes                                              |
| Purge options | URL, Hostname, Tag, Prefix, and Purge Everything | URL, Hostname, Tag, Prefix, and Purge Everything | URL, Hostname, Tag, Prefix, and Purge Everything | URL, Hostname, Tag, Prefix, and Purge Everything |

### Hostname, tag, prefix URL, and purge everything limits

The current purge limits are applied per **account**:

| Free                       | Pro                   | Business              | Enterprise             |                        |
| -------------------------- | --------------------- | --------------------- | ---------------------- | ---------------------- |
| Requests                   | 5 requests per minute | 5 requests per second | 10 requests per second | 50 requests per second |
| Bucket size                | 25                    | 25                    | 50                     | 500                    |
| Max operations per request | 100                   | 100                   | 100                    | 100                    |

If your account includes zones with different Cloudflare plans, the above limits are shared between all the zones with the same plan. For example, all the zones in your account with a Pro plan will share the limits for the Pro plan, and all the zones in your account with a Business plan will share the limits for the Business plan.

### Single-file purge limits

The current purge limits are applied per **account**:

| Free                       | Pro                 | Business             | Enterprise           |                      |
| -------------------------- | ------------------- | -------------------- | -------------------- | -------------------- |
| URLs                       | 800 URLs per second | 1500 URLs per second | 1500 URLs per second | 3000 URLs per second |
| Max operations per request | 100                 | 100                  | 100                  | 500                  |

If your account includes zones with different Cloudflare plans, the above limits are shared between all the zones with the same plan. For example, all the zones in your account with a Pro plan will share the limits for the Pro plan, and all the zones in your account with a Business plan will share the limits for the Business plan.

Note that the thresholds for URLs are calculated using a moving average.

### Token bucket rate limiting

Cloudflare uses token bucket rate limiting to limit the number of purge requests flowing through the system at any given time, ensuring a steady and manageable flow.

Each account tier has a defined request rate (for example, Free: 5 requests per minute, Business: 10 requests per second), and requests are only allowed if there are available tokens in the bucket. Tokens refill at a consistent rate, but each bucket has a maximum capacity (for example, Free: 25 tokens, Enterprise: 500 tokens), allowing short bursts of requests if tokens have accumulated.

If the bucket is empty, further requests must wait until new tokens are added. This system maintains fair usage while allowing occasional bursts within the bucket's capacity.

If you are an Enterprise customer and you need more operations, reach out to your account team for support.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/#page","headline":"Purge cache · Cloudflare Cache (CDN) docs","description":"Remove cached content from Cloudflare edge servers.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}}]}
```
