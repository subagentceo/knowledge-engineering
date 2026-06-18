---
title: Baseten
description: Route Baseten model inference requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Baseten

[Baseten ↗](https://www.baseten.co/) provides infrastructure for building and deploying machine learning models at scale. Baseten offers access to various language models through a unified chat completions API.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/baseten


```

## Prerequisites

When making requests to Baseten, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Baseten API token.
* The name of the Baseten model you want to use.

## OpenAI-compatible chat completions API

Baseten provides an OpenAI-compatible chat completions API for supported models.

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/baseten/v1/chat/completions \

  --header 'Authorization: Bearer {baseten_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "openai/gpt-oss-120b",

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ]

  }'


```

### Use OpenAI SDK with JavaScript

JavaScript

```

import OpenAI from "openai";


const apiKey = "{baseten_api_token}";

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/baseten`;


const openai = new OpenAI({

  apiKey,

  baseURL,

});


const model = "openai/gpt-oss-120b";

const messages = [{ role: "user", content: "What is Cloudflare?" }];


const chatCompletion = await openai.chat.completions.create({

  model,

  messages,

});


console.log(chatCompletion);


```

## OpenAI-Compatible Endpoint

You can also access Baseten models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "baseten/{model}"

}


```

## Model-specific endpoints

For models that don't use the OpenAI-compatible API, you can access them through their specific model endpoints.

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/baseten/model/{model_id} \

  --header 'Authorization: Bearer {baseten_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "prompt": "What is Cloudflare?",

    "max_tokens": 100

  }'


```

### Use with JavaScript

JavaScript

```

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const basetenApiToken = "{baseten_api_token}";

const modelId = "{model_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/baseten`;


const response = await fetch(`${baseURL}/model/${modelId}`, {

  method: "POST",

  headers: {

    "Authorization": `Bearer ${basetenApiToken}`,

    "Content-Type": "application/json",

  },

  body: JSON.stringify({

    prompt: "What is Cloudflare?",

    max_tokens: 100,

  }),

});


const result = await response.json();

console.log(result);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/baseten/#page","headline":"Baseten · Cloudflare AI Gateway docs","description":"Route Baseten model inference requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/baseten/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/baseten/","name":"Baseten"}}]}
```
