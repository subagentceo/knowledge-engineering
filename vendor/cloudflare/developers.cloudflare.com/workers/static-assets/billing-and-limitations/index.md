---
title: Billing and Limitations
description: Billing, troubleshooting, and limitations for Static assets on Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Billing and Limitations

## Billing

Requests to a project with static assets can either return static assets or invoke the Worker script, depending on if the request [matches a static asset or not](https://developers.cloudflare.com/workers/static-assets/routing/).

* Requests to static assets are free and unlimited. Requests to the Worker script (for example, in the case of SSR content) are billed according to Workers pricing. Refer to [pricing](https://developers.cloudflare.com/workers/platform/pricing/#example-2) for an example.
* There is no additional cost for storing Assets.
* **Important note for free tier users**: When using [run\_worker\_first](https://developers.cloudflare.com/workers/static-assets/binding/#run%5Fworker%5Ffirst), requests matching the specified patterns will always invoke your Worker script. If you exceed your free tier request limits, these requests will receive a 429 (Too Many Requests) response instead of falling back to static asset serving. Negative patterns (patterns beginning with `!/`) will continue to serve assets correctly, as requests are directed to assets, without invoking your Worker script.

## Limitations

See the [Platform Limits](https://developers.cloudflare.com/workers/platform/limits/#static-assets)

## Troubleshooting

* `assets.bucket is a required field` — if you see this error, you need to update Wrangler to at least `3.78.10` or later. `bucket` is not a required field.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/#page","headline":"Billing and Limitations · Cloudflare Workers docs","description":"Billing, troubleshooting, and limitations for Static assets on Workers","url":"https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/billing-and-limitations/","name":"Billing and Limitations"}}]}
```
