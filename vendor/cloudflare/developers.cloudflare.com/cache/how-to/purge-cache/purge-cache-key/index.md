---
title: Purge cache key resources
description: Purge cached resources by custom cache key.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Purge cache key resources

Instantly purge resources that use Cache Keys via the [Cloudflare API](https://developers.cloudflare.com/api/resources/cache/methods/purge/). If you use [Cloudflare's Purge by URL](https://developers.cloudflare.com/api/resources/cache/methods/purge/#purge-cached-content-by-url), include the headers and query strings that are in your custom Cache Key.

Currently, it is not possible to purge a URL stored through Cache API that uses a custom cache key set by a Worker. Instead, use a [custom key created by Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#cache-key). Alternatively, purge your assets using purge everything, purge by tag, purge by host or purge by prefix.

To instantly purge by `device_type`, `geo`, or `lang` use `CF-Device-Type`, `CF-IPCountry` or `accept-language`, respectively. [Purge by Tag / Host](https://developers.cloudflare.com/api/resources/cache/methods/purge/#purge-cached-content-by-tag-host-or-prefix) and [Purge Everything](https://developers.cloudflare.com/api/resources/cache/methods/purge/#purge-all-cached-content) are not impacted by the use of custom Cache Keys.

## Purge by device type

For a Cache Key based on device type, purge the asset by passing the `CF-Device-Type` header with the API purge request (valid headers include mobile, desktop, and tablet).

Refer to the example API request below to instantly purge all mobile assets on the root webpage.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cache Purge`

Purge Cached Content

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "files": [

        {

            "url": "http://my.website.com/",

            "headers": {

                "CF-Device-Type": "mobile"

            }

        }

    ]

  }'


```

## Purge by geo

Instantly purge resources for a location-based Cache Key by specifying the two-letter country code. Spain is used in the example below.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cache Purge`

Purge Cached Content

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "files": [

        {

            "url": "http://my.website.com/",

            "headers": {

                "CF-IPCountry": "ES"

            }

        }

    ]

  }'


```

## Purge by language

For a Cache Key based on language, purge the asset by passing the `accept-language` header. Refer to the example API request below to instantly purge all assets in Chinese (PRC).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cache Purge`

Purge Cached Content

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "files": [

        {

            "url": "http://my.website.com/",

            "headers": {

                "accept-language": "zh-CN"

            }

        }

    ]

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-cache-key/#page","headline":"Purge cache key resources · Cloudflare Cache (CDN) docs","description":"Purge cached resources by custom cache key.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-cache-key/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge-cache-key/","name":"Purge cache key resources"}}]}
```
