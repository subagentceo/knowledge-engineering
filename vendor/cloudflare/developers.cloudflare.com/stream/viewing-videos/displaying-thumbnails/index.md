---
title: Display thumbnails
description: Generate and customize thumbnail images from Cloudflare Stream videos.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Display thumbnails

Note

Stream thumbnails are not supported for videos with non-square pixels.

## Use Case 1: Generating a thumbnail on-the-fly

A thumbnail from your video can be generated using a special link where you specify the time from the video you'd like to get the thumbnail from.

`https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg?time=1s&height=270`

![Example of thumbnail image generated from example video](https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg?time=1s&height=270) 

Using the `poster` query parameter in the embed URL, you can set a thumbnail to any time in your video. If [signed URLs](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/) are required, you must use a signed URL instead of video UIDs.

```

<iframe

  src="https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/iframe?poster=https%3A%2F%2Fcustomer-f33zs165nr7gyfy4.cloudflarestream.com%2F6b9e68b07dfee8cc2d116e4c51d6a957%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"

  style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"

  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"

  allowfullscreen="true"

></iframe>


```

Supported URL attributes are:

* **`time`** (default `0s`, configurable) time from the video for example `8m`, `5m2s`
* **`height`** (default `640`)
* **`width`** (default `640`)
* **`fit`** (default `crop`) to clarify what to do when requested height and width does not match the original upload, which should be one of:  
   * **`crop`** cut parts of the video that doesn't fit in the given size  
   * **`clip`** preserve the entire frame and decrease the size of the image within given size  
   * **`scale`** distort the image to fit the given size  
   * **`fill`** preserve the entire frame and fill the rest of the requested size with black background

## Use Case 2: Set the default thumbnail timestamp using the API

By default, the Stream Player sets the thumbnail to the first frame of the video. You can change this on a per-video basis by setting the "thumbnailTimestampPct" value using the API:

Terminal window

```

curl -X POST \

-H "Authorization: Bearer <API_TOKEN>" \

-d '{"thumbnailTimestampPct": 0.5}' \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>


```

`thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). For example, you wanted the thumbnail to be the frame at the half way point of your videos, you can set the `thumbnailTimestampPct` value to 0.5\. Using relative values in this way allows you to set the default thumbnail even if you or your users' videos vary in duration.

## Use Case 3: Generating animated thumbnails

Stream supports animated GIFs as thumbnails. Viewing animated thumbnails does not count toward billed minutes delivered or minutes viewed in [Stream Analytics](https://developers.cloudflare.com/stream/getting-analytics/).

### Animated GIF thumbnails

` https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.gif?time=1s&height=200&duration=4s`

![Animated gif example, generated on-demand from Cloudflare Stream](https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.gif?time=1s&height=200&duration=4s) 

Supported URL attributes for animated thumbnails are:

* **`time`** (default `0s`) time from the video for example `8m`, `5m2s`
* **`height`** (default `640`)
* **`width`** (default `640`)
* **`fit`** (default `crop`) to clarify what to do when requested height and width does not match the original upload, which should be one of:  
   * **`crop`** cut parts of the video that doesn't fit in the given size  
   * **`clip`** preserve the entire frame and decrease the size of the image within given size  
   * **`scale`** distort the image to fit the given size  
   * **`fill`** preserve the entire frame and fill the rest of the requested size with black background
* **`duration`** (default `5s`)
* **`fps`** (default `8`)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/#page","headline":"Display thumbnails · Cloudflare Stream docs","description":"Generate and customize thumbnail images from Cloudflare Stream videos.","url":"https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/viewing-videos/","name":"Play video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/viewing-videos/displaying-thumbnails/","name":"Display thumbnails"}}]}
```
