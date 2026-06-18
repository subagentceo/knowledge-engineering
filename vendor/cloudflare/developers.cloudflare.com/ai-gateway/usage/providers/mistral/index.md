---
title: Mistral AI
description: Route Mistral AI requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Mistral AI

[Mistral AI ↗](https://mistral.ai) helps you build quickly with Mistral's advanced AI models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral


```

## Prerequisites

When making requests to the Mistral AI, you will need:

* AI Gateway Account ID
* AI Gateway gateway name
* Mistral AI API token
* Mistral AI model name

## URL structure

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral/`.

Then you can append the endpoint you want to hit, for example: `v1/chat/completions`

So your final URL will come together as: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral/v1/chat/completions`.

## Examples

### cURL

Example fetch request

```

curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral/v1/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer MISTRAL_TOKEN' \

 --data '{

    "model": "mistral-large-latest",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

### Use `@mistralai/mistralai` package with JavaScript

If you are using the `@mistralai/mistralai` package, you can set your endpoint like this:

JavaScript example

```

import { Mistral } from "@mistralai/mistralai";


const client = new Mistral({

  apiKey: MISTRAL_TOKEN,

  serverURL: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/mistral`,

});


await client.chat.create({

  model: "mistral-large-latest",

  messages: [

    {

      role: "user",

      content: "What is Cloudflare?",

    },

  ],

});


```

## OpenAI-Compatible Endpoint

You can also access Mistral models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "mistral/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/mistral/#page","headline":"Mistral AI · Cloudflare AI Gateway docs","description":"Route Mistral AI requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/mistral/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/mistral/","name":"Mistral AI"}}]}
```
