---
title: D1
description: Specify D1 Databases to add to your environment as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# D1

* [D1 Reference](https://developers.cloudflare.com/d1/)

## Databases

Specify D1 Databases to add to your environment as follows:

JavaScript

```

const mf = new Miniflare({

  d1Databases: {

    DB: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",

  },

});


```

## Working with D1 Databases

For testing, it can be useful to put/get data from D1 storage bound to a Worker. You can do this with the `getD1Database` method:

JavaScript

```

const db = await mf.getD1Database("DB");

const stmt = await db.prepare("<Query>");

const returnValue = await stmt.run();


return Response.json(returnValue.results);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/storage/d1/#page","headline":"D1 · Cloudflare Workers docs","description":"Specify D1 Databases to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/storage/d1/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/storage/","name":"Storage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/storage/d1/","name":"D1"}}]}
```
