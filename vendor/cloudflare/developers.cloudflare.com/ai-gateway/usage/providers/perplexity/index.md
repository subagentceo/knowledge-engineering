---
title: Perplexity
description: Route Perplexity API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Perplexity

[Perplexity ↗](https://www.perplexity.ai/) is an AI powered answer engine.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai


```

## Prerequisites

When making requests to Perplexity, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Perplexity API token.
* The name of the Perplexity model you want to use.

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/perplexity-ai/chat/completions \

     --header 'accept: application/json' \

     --header 'content-type: application/json' \

     --header 'Authorization: Bearer {perplexity_token}' \

     --data '{

      "model": "mistral-7b-instruct",

      "messages": [

        {

          "role": "user",

          "content": "What is Cloudflare?"

        }

      ]

    }'


```

### Use Perplexity through OpenAI SDK with JavaScript

Perplexity does not have their own SDK, but they have compatibility with the OpenAI SDK. You can use the OpenAI SDK to make a Perplexity call through AI Gateway as follows:

JavaScript

```

import OpenAI from "openai";


const apiKey = env.PERPLEXITY_API_KEY;

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/perplexity-ai`;


const perplexity = new OpenAI({

  apiKey,

  baseURL,

});


const model = "mistral-7b-instruct";

const messages = [{ role: "user", content: "What is Cloudflare?" }];

const maxTokens = 20;


const chatCompletion = await perplexity.chat.completions.create({

  model,

  messages,

  max_tokens: maxTokens,

});


```

## OpenAI-Compatible Endpoint

You can also access Perplexity models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "perplexity/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/#page","headline":"Perplexity · Cloudflare AI Gateway docs","description":"Route Perplexity API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/perplexity/","name":"Perplexity"}}]}
```
