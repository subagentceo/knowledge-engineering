---
title: Add Watermark
description: Add a custom image watermark to RealtimeKit recordings with configurable position and size.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add Watermark

RealtimeKit's watermark feature enables you to include an image as a watermark in your recording. To add watermark, configure the following parameters to video\_config in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

| **Parameter** | **Description**                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URL           | Specify the URL of the watermark image                                                                                                                                         |
| Position      | Specify the placement of the watermark, you have the flexibility to choose between left top, right top, left bottom, or right bottom. The default position is set to left top. |
| Size          | Specify the height and width of the watermark in pixels.                                                                                                                       |

```

{

  "video_config": {

    "watermark": {

      "url": "https://test.io/images/client-logos-6.webp",

      "position": "left top",

      "size": {

        "height": 20,

        "width": 100

      }

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/#page","headline":"Add Watermark · Cloudflare Realtime docs","description":"Add a custom image watermark to RealtimeKit recordings with configurable position and size.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/add-watermark/","name":"Add Watermark"}}]}
```
