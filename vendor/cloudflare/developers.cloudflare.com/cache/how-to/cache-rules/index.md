---
title: Cache Rules
description: Control what and how Cloudflare caches with Cache Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache Rules

Use Cache Rules to customize cache settings on Cloudflare. Cache Rules allows you to make adjustments to what is eligible to cache, how long it should be cached and where, as well as trigger specific interactions with Cloudflare's cache and other Rules products for matching requests.

Cache Rules can be created in the [dashboard](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/), via [API](https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/) or [Terraform](https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/).

Notes

Cache Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

Rules can be versioned. Refer to the [Version Management](https://developers.cloudflare.com/version-management/) documentation for more information.

## Rules templates

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

## Availability

The following table describes Cache Rules availability per plan.

| Free            | Pro | Business | Enterprise |     |
| --------------- | --- | -------- | ---------- | --- |
| Availability    | Yes | Yes      | Yes        | Yes |
| Number of rules | 10  | 25       | 50         | 300 |

## Troubleshooting

When troubleshooting Cache Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/#page","headline":"Cache Rules · Cloudflare Cache (CDN) docs","description":"Control what and how Cloudflare caches with Cache Rules.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}}]}
```
