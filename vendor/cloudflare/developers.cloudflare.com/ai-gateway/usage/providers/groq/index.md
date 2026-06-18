---
title: Groq
description: Route Groq API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Groq

[Groq ↗](https://groq.com/) delivers high-speed processing and low-latency performance.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq


```

## URL structure

When making requests to [Groq ↗](https://groq.com/), replace `https://api.groq.com/openai/v1` in the URL you're currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq`.

## Prerequisites

When making requests to Groq, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Groq API token.
* The name of the Groq model you want to use.

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/groq/chat/completions \

  --header 'Authorization: Bearer {groq_api_key}' \

  --header 'Content-Type: application/json' \

  --data '{

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ],

    "model": "llama3-8b-8192"

}'


```

### Use Groq SDK with JavaScript

If using the [groq-sdk ↗](https://www.npmjs.com/package/groq-sdk), set your endpoint like this:

JavaScript

```

import Groq from "groq-sdk";


const apiKey = env.GROQ_API_KEY;

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/groq`;


const groq = new Groq({

  apiKey,

  baseURL,

});


const messages = [{ role: "user", content: "What is Cloudflare?" }];

const model = "llama3-8b-8192";


const chatCompletion = await groq.chat.completions.create({

  messages,

  model,

});


```

## OpenAI-Compatible Endpoint

You can also access Groq models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "groq/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/groq/#page","headline":"Groq · Cloudflare AI Gateway docs","description":"Route Groq API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/groq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/groq/","name":"Groq"}}]}
```
