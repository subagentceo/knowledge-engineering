---
title: Queues
description: Specify Queue producers to add to your environment as follows:
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Queues

* [Queues Reference](https://developers.cloudflare.com/queues/)

## Producers

Specify Queue producers to add to your environment as follows:

JavaScript

```

const mf = new Miniflare({

  queueProducers: { MY_QUEUE: "my-queue" },

  queueProducers: ["MY_QUEUE"], // If binding and queue names are the same

});


```

## Consumers

Specify Workers to consume messages from your Queues as follows:

JavaScript

```

const mf = new Miniflare({

  queueConsumers: {

    "my-queue": {

      maxBatchSize: 5, // default: 5

      maxBatchTimeout: 1 /* second(s) */, // default: 1

      maxRetries: 2, // default: 2

      deadLetterQueue: "my-dead-letter-queue", // default: none

    },

  },

  queueConsumers: ["my-queue"], // If using default consumer options

});


```

## Manipulating Outside Workers

For testing, it can be valuable to interact with Queues outside a Worker. You can do this by using the `workers` option to run multiple Workers in the same instance:

JavaScript

```

const mf = new Miniflare({

  workers: [

    {

      name: "a",

      modules: true,

      script: `

      export default {

        async fetch(request, env, ctx) {

          await env.QUEUE.send(await request.text());

        }

      }

      `,

      queueProducers: { QUEUE: "my-queue" },

    },

    {

      name: "b",

      modules: true,

      script: `

      export default {

        async queue(batch, env, ctx) {

          console.log(batch);

        }

      }

      `,

      queueConsumers: { "my-queue": { maxBatchTimeout: 1 } },

    },

  ],

});


const queue = await mf.getQueueProducer("QUEUE", "a"); // Get from worker "a"

await queue.send("message"); // Logs "message" 1 second later


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/queues/#page","headline":"Queues · Cloudflare Workers docs","description":"Specify Queue producers to add to your environment as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/queues/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/core/","name":"Core"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/core/queues/","name":"Queues"}}]}
```
