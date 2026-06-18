---
title: OpenAI compatible API endpoints
description: Use the OpenAI SDK to call Workers AI models through compatible API endpoints.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenAI compatible API endpoints

Workers AI supports OpenAI compatible endpoints for [text generation](https://developers.cloudflare.com/workers-ai/models/) (`/v1/chat/completions`) and [text embedding models](https://developers.cloudflare.com/workers-ai/models/) (`/v1/embeddings`). This allows you to use the same code as you would for your OpenAI commands, but swap in Workers AI easily.

  
## Usage

### Workers AI

Normally, Workers AI requires you to specify the model name in the cURL endpoint or within the `env.AI.run` function.

With OpenAI compatible endpoints, you can leverage the [openai-node sdk ↗](https://github.com/openai/openai-node) to make calls to Workers AI. This allows you to use Workers AI by simply changing the base URL and the model name.

OpenAI SDK Example

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: env.CLOUDFLARE_API_KEY,

  baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,

});


// Use chat completions

const chatCompletion = await openai.chat.completions.create({

  messages: [{ role: "user", content: "Make some robot noises" }],

  model: "@cf/meta/llama-3.1-8b-instruct",

});


// Use responses

const response = await openai.responses.create({

  model: "@cf/openai/gpt-oss-120b",

  input: "Talk to me about open source",

});


const embeddings = await openai.embeddings.create({

  model: "@cf/baai/bge-large-en-v1.5",

  input: "I love matcha",

});


```

cURL example

```

curl --request POST \

  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '

    {

      "model": "@cf/meta/llama-3.1-8b-instruct",

      "messages": [

        {

          "role": "user",

          "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"

        }

      ]

    }

'


```

### AI Gateway

These endpoints are also compatible with [AI Gateway](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/#openai-compatible-endpoints).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/#page","headline":"OpenAI compatible API endpoints · Cloudflare Workers AI docs","description":"Use the OpenAI SDK to call Workers AI models through compatible API endpoints.","url":"https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/configuration/open-ai-compatibility/","name":"OpenAI compatible API endpoints"}}]}
```
