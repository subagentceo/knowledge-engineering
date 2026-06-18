---
title: Workers Binding
description: Send and retrieve batch inference requests using a Workers AI binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Binding

You can use Workers Bindings to interact with the Batch API.

## Send a Batch request

Send your initial batch inference request by composing a JSON payload containing an array of individual inference requests and the `queueRequest: true` property (which is what controls queueing behavior).

Note

Ensure that the total payload is under 10 MB.

src/index.ts

```

export interface Env {

  AI: Ai;

}

export default {

  async fetch(request, env): Promise<Response> {

    const embeddings = await env.AI.run(

      "@cf/baai/bge-m3",

      {

        requests: [

          {

            query: "This is a story about Cloudflare",

            contexts: [

              {

                text: "This is a story about an orange cloud",

              },

              {

                text: "This is a story about a llama",

              },

              {

                text: "This is a story about a hugging emoji",

              },

            ],

          },

        ],

      },

      { queueRequest: true },

    );


    return Response.json(embeddings);

  },

} satisfies ExportedHandler<Env>;


```

```

{

  "status": "queued",

  "model": "@cf/baai/bge-m3",

  "request_id": "000-000-000"

}


```

You will get a response with the following values:

* **`status`**: Indicates that your request is queued.
* **`request_id`**: A unique identifier for the batch request.
* **`model`**: The model used for the batch inference.

Of these, the `request_id` is important for when you need to [poll the batch status](#poll-batch-status).

### Poll batch status

Once your batch request is queued, use the `request_id` to poll for its status. During processing, the API returns a status `queued` or `running` indicating that the request is still in the queue or being processed.

src/index.ts

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const status = await env.AI.run("@cf/baai/bge-m3", {

      request_id: "000-000-000",

    });


    return Response.json(status);

  },

} satisfies ExportedHandler<Env>;


```

```

{

  "responses": [

    {

      "id": 0,

      "result": {

        "response": [

          { "id": 0, "score": 0.73974609375 },

          { "id": 1, "score": 0.642578125 },

          { "id": 2, "score": 0.6220703125 }

        ]

      },

      "success": true,

      "external_reference": "reference-1"

    }

  ],

  "usage": { "prompt_tokens": 12, "completion_tokens": 0, "total_tokens": 12 }

}


```

When the inference is complete, the API returns a final HTTP status code of `200` along with an array of responses. Each response object corresponds to an individual input prompt, identified by an `id` that maps to the index of the prompt in your original request.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/#page","headline":"Workers Binding · Cloudflare Workers AI docs","description":"Send and retrieve batch inference requests using a Workers AI binding.","url":"https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/batch-api/","name":"Asynchronous Batch API"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/batch-api/workers-binding/","name":"Workers Binding"}}]}
```
