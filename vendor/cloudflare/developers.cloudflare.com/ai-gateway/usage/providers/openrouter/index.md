---
title: OpenRouter
description: Route OpenRouter API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenRouter

[OpenRouter ↗](https://openrouter.ai/) is a platform that provides a unified interface for accessing and using large language models (LLMs).

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter


```

## URL structure

When making requests to [OpenRouter ↗](https://openrouter.ai/), replace `https://openrouter.ai/api/v1/chat/completions` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/chat/completions`.

## Prerequisites

When making requests to OpenRouter, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active OpenRouter API token or a token from the original model provider.
* The name of the OpenRouter model you want to use.

## Examples

### cURL

Request

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openrouter/v1/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer OPENROUTER_TOKEN' \

 --data '{

    "model": "openai/gpt-5-mini",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

### Use OpenAI SDK with JavaScript

If you are using the OpenAI SDK with JavaScript, you can set your endpoint like this:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: env.OPENROUTER_TOKEN,

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openrouter",

});


try {

  const chatCompletion = await openai.chat.completions.create({

    model: "openai/gpt-5-mini",

    messages: [{ role: "user", content: "What is Cloudflare?" }],

  });


  const response = chatCompletion.choices[0].message;


  return new Response(JSON.stringify(response));

} catch (e) {

  return new Response(e);

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/#page","headline":"OpenRouter · Cloudflare AI Gateway docs","description":"Route OpenRouter API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/openrouter/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/openrouter/","name":"OpenRouter"}}]}
```
