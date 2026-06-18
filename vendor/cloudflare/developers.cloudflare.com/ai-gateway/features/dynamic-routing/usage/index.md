---
title: Using a dynamic route
description: Send requests through an AI Gateway dynamic route using the OpenAI SDK or REST API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Using a dynamic route

Warning

Ensure your gateway has [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) turned on and you have your upstream providers keys stored with [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## Examples

### OpenAI SDK

JavaScript

```

import OpenAI from "openai";


const cloudflareToken = "CF_AIG_TOKEN";

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`;


const openai = new OpenAI({

  apiKey: cloudflareToken,

  baseURL,

});


try {

  const model = "dynamic/<your-dynamic-route-name>";

  const messages = [{ role: "user", content: "What is a neuron?" }];

  const chatCompletion = await openai.chat.completions.create({

    model,

    messages,

  });

  const response = chatCompletion.choices[0].message;

  console.log(response);

} catch (e) {

  console.error(e);

}


```

### Fetch

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "dynamic/<your-dynamic-route-name>",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

### Workers

index.ts

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request: Request, env: Env) {

    const response = await env.AI.gateway("default").run({

      provider: "compat",

      endpoint: "chat/completions",

      headers: {},

      query: {

        model: "dynamic/<your-dynamic-route-name>",

        messages: [

          {

            role: "user",

            content: "What is Cloudflare?",

          },

        ],

      },

    });

    return Response(response);

  },

};


```

## Response Metadata

The response from a dynamic route is the same as the response from a model. There is additional metadata used to notify the model and provider used, you can check the following headers

* `cf-aig-model` \- The model used
* `cf-aig-provider` \- The slug of provider used

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/#page","headline":"Using a dynamic route · Cloudflare AI Gateway docs","description":"Send requests through an AI Gateway dynamic route using the OpenAI SDK or REST API.","url":"https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/dynamic-routing/","name":"Dynamic routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/features/dynamic-routing/usage/","name":"Using a dynamic route"}}]}
```
