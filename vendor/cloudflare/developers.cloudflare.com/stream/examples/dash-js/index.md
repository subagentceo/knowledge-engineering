---
title: dash.js
description: Example of video playback with Cloudflare Stream and the DASH reference player (dash.js)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# dash.js

**Last reviewed:**  almost 4 years ago 

Example of video playback with Cloudflare Stream and the DASH reference player (dash.js)

```

<html>

  <head>

    <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>

  </head>

  <body>

    <div>

      <div class="code">

        <video

          data-dashjs-player=""

          autoplay=""

          src="https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd"

          controls="true"

        ></video>

      </div>

    </div>

  </body>

</html>


```

Refer to the [dash.js documentation ↗](https://github.com/Dash-Industry-Forum/dash.js/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/dash-js/#page","headline":"dash.js · Cloudflare Stream docs","description":"Example of video playback with Cloudflare Stream and the DASH reference player (dash.js)","url":"https://developers.cloudflare.com/stream/examples/dash-js/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/dash-js/","name":"dash.js"}}]}
```
