---
title: Scheduled Events
description: scheduled events are automatically dispatched according to the specified cron
triggers:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scheduled Events

* [ScheduledEvent Reference](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)

## Cron Triggers

`scheduled` events are automatically dispatched according to the specified cron triggers:

JavaScript

```

const mf = new Miniflare({

  crons: ["15 * * * *", "45 * * * *"],

});


```

## HTTP Triggers

Because waiting for cron triggers is annoying, you can also make HTTP requests to `/cdn-cgi/mf/scheduled` to trigger `scheduled` events:

Terminal window

```

$ curl "http://localhost:8787/cdn-cgi/mf/scheduled"


```

To simulate different values of `scheduledTime` and `cron` in the dispatched event, use the `time` and `cron` query parameters:

Terminal window

```

$ curl "http://localhost:8787/cdn-cgi/mf/scheduled?time=1000"

$ curl "http://localhost:8787/cdn-cgi/mf/scheduled?cron=*+*+*+*+*"


```

## Dispatching Events

When using the API, the `getWorker` function can be used to dispatch`scheduled` events to your Worker. This can be used for testing responses. It takes optional `scheduledTime` and `cron` parameters, which default to the current time and the empty string respectively. It will return a promise which resolves to an array containing data returned by all waited promises:

JavaScript

```

import { Miniflare } from "miniflare";


const mf = new Miniflare({

  modules: true,

  script: `

  export default {

    async scheduled(controller, env, ctx) {

      const lastScheduledController = controller;

      if (controller.cron === "* * * * *") controller.noRetry();

    }

  }

  `,

});


const worker = await mf.getWorker();


let scheduledResult = await worker.scheduled({

  cron: "* * * * *",

});

console.log(scheduledResult); // { outcome: 'ok', noRetry: true }


scheduledResult = await worker.scheduled({

  scheduledTime: new Date(1000),

  cron: "30 * * * *",

});


console.log(scheduledResult); // { outcome: 'ok', noRetry: false }


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/#page","headline":"Scheduled Events · Cloudflare Workers docs","description":"scheduled events are automatically dispatched according to the specified cron\ntriggers:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/scheduled/","name":"Scheduled Events"}}]}
```
