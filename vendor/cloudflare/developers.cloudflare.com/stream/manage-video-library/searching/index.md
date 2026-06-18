---
title: Search for videos
description: Search your Cloudflare Stream video library by name using the Stream API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Search for videos

You can search for videos by name through the Stream API by adding a `search` query parameter to the [list media files](https://developers.cloudflare.com/api/resources/stream/methods/list/) endpoint.

## What you will need

To make API requests you will need a [Cloudflare API token ↗](https://www.cloudflare.com/a/account/my-account) and your Cloudflare [account ID ↗](https://www.cloudflare.com/a/overview/).

## cURL example

This example lists media where the name matches `puppy.mp4`.

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream?search=puppy" \

     -H "Authorization: Bearer <API_TOKEN>" \

     -H "Content-Type: application/json"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/manage-video-library/searching/#page","headline":"Search for videos · Cloudflare Stream docs","description":"Search your Cloudflare Stream video library by name using the Stream API.","url":"https://developers.cloudflare.com/stream/manage-video-library/searching/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/manage-video-library/","name":"Manage videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/manage-video-library/searching/","name":"Search for videos"}}]}
```
