---
title: hls.js
description: Example of video playback with Cloudflare Stream and the HLS reference player (hls.js)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# hls.js

**Last reviewed:**  almost 4 years ago 

Example of video playback with Cloudflare Stream and the HLS reference player (hls.js)

```

<html>

  <head>

    <script src="//cdn.jsdelivr.net/npm/hls.js@latest"></script>

  </head>

  <body>

    <video id="video"></video>

    <script>

      if (Hls.isSupported()) {

        const video = document.getElementById('video');

        const hls = new Hls();

        hls.attachMedia(video);

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {

          hls.loadSource(

            'https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8'

          );

        });

      }


      video.play();

    </script>

  </body>

</html>


```

Refer to the [hls.js documentation ↗](https://github.com/video-dev/hls.js/blob/master/docs/API.md) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/hls-js/#page","headline":"hls.js · Cloudflare Stream docs","description":"Example of video playback with Cloudflare Stream and the HLS reference player (hls.js)","url":"https://developers.cloudflare.com/stream/examples/hls-js/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/hls-js/","name":"hls.js"}}]}
```
