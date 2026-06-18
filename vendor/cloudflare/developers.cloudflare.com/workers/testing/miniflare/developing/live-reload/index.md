---
title: Live Reload
description: Enable automatic browser refresh in Miniflare when your Workers script changes during local development.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Live Reload

Miniflare automatically refreshes your browser when your Worker script changes when `liveReload` is set to `true`.

JavaScript

```

const mf = new Miniflare({

  liveReload: true,

});


```

Miniflare will only inject the `<script>` tag required for live-reload at the end of responses with the `Content-Type` header set to `text/html`:

JavaScript

```

export default {

  fetch() {

    const body = `

      <!DOCTYPE html>

      <html>

      <body>

        <p>Try update me!</p>

      </body>

      </html>

    `;


    return new Response(body, {

      headers: { "Content-Type": "text/html; charset=utf-8" },

    });

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/developing/live-reload/#page","headline":"Live Reload · Cloudflare Workers docs","description":"Enable automatic browser refresh in Miniflare when your Workers script changes during local development.","url":"https://developers.cloudflare.com/workers/testing/miniflare/developing/live-reload/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/developing/","name":"Developing"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/developing/live-reload/","name":"Live Reload"}}]}
```
