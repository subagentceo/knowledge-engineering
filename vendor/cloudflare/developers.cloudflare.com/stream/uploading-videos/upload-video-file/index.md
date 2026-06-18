---
title: Basic video uploads
description: Upload video files under 200 MB to Cloudflare Stream using the dashboard or API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Basic video uploads

## Basic Uploads

For files smaller than 200 MB, you can use simple form-based uploads.

## Upload through the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Stream** page.  
[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos)
2. Drag and drop your video into the **Quick upload** area. You can also click to browse for the file on your machine.

After the video finishes uploading, the video appears in the list.

## Upload with the Stream API

Make a `POST` request with the `content-type` header set to `multipart/form-data` and include the media as an input with the name set to `file`.

Upload video POST request

```

curl --request POST \

--header "Authorization: Bearer <API_TOKEN>" \

--form file=@/Users/user_name/Desktop/my-video.mp4 \

https://api.cloudflare.com/client/v4/accounts/{account_id}/stream


```

Note

Note that cURL's `--form` flag automatically configures the `content-type` header and maps `my-video.mp4` to a form input called `file`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/#page","headline":"Basic video uploads · Cloudflare Stream docs","description":"Upload video files under 200 MB to Cloudflare Stream using the dashboard or API.","url":"https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/uploading-videos/","name":"Upload videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/uploading-videos/upload-video-file/","name":"Basic video uploads"}}]}
```
