---
title: Vary for images
description: Serve images in the best format for each visitor browser.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vary for images

The `Vary` HTTP response header tells Cloudflare that an origin can serve different versions of the same resource depending on the request headers. For images, this allows your origin to serve modern formats like WebP or AVIF to browsers that support them, while continuing to serve JPEG or PNG to others.

When Cloudflare receives a response with image variants, it caches each variant separately. Subsequent requests from browsers with the same image format preferences are served directly from cache without contacting your origin.

Vary for Images works by parsing the `Accept` header in each request to determine which image format the browser supports, then serving the matching cached variant.

Vary for images is available for Pro, Business, and Enterprise customers.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | Yes      | Yes        | Yes |

## File extensions

You can use vary for images on the file extensions below if the origin server sends the `Vary: Accept` response header. If the origin server sends `Vary: Accept` but does not serve the set variant, the response is not cached and displays `BYPASS` in the cache status in the response header. Additionally, the list of variant types the origin serves for each extension must be configured so that Cloudflare decides which variant to serve without contacting the origin server.

File extensions enabled for varying

* .avif
* .bmp
* .gif
* .jpg
* .jpeg
* .jp2
* .png
* .tif
* .tiff
* .webp

## Enable vary for images

Vary for Images is enabled through Cloudflare's API by creating a variants rule. In the examples below, learn how to serve JPEG, WebP, and AVIF variants for `.jpeg` and `.jpg` extensions.

### Create a variants rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": {

        "jpeg": [

            "image/webp",

            "image/avif"

        ],

        "jpg": [

            "image/webp",

            "image/avif"

        ]

    }

  }'


```

### Modify to only allow WebP variants

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": {

        "jpeg": [

            "image/webp"

        ],

        "jpg": [

            "image/webp"

        ]

    }

  }'


```

### Delete the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Delete variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Get the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Settings Read`
* `Zone Read`
* `Zone Write`

Get variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

To learn more about purging varied images, refer to [Purge varied images](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-varied-images/).

## Limitations

* For Vary for images to work, your image URLs must include the file extension in the path and not the query string. For example the URL `https://example.com/image.jpg` is compatible but `https://example.com/index.php?file=image.jpg` is not compatible.
* Your origin must return an image type matching the file extension in the URL when a HTTP client sends no `Accept` header, or an `Accept: */*` header. Otherwise, you will see `CF-Cache-Status: BYPASS` in the HTTP response headers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/#page","headline":"Vary for images · Cloudflare Cache (CDN) docs","description":"Serve images in the best format for each visitor browser.","url":"https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/advanced-configuration/","name":"Advanced configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/advanced-configuration/vary-for-images/","name":"Vary for images"}}]}
```
