---
title: Anthropic
description: Route Anthropic API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Anthropic

[Anthropic ↗](https://www.anthropic.com/) helps build reliable, interpretable, and steerable AI systems.

## Endpoint

**Base URL**

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic


```

## Examples

### cURL

With API Key in Request

* [ With Authenticated Gateway ](#tab-panel-6572)
* [ Unauthenticated Gateway ](#tab-panel-6573)

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'x-api-key: {anthropic_api_key}' \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'x-api-key: {anthropic_api_key}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

With Stored Keys (BYOK) / Unified Billing

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/anthropic/v1/messages \

 --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{

    "model": "claude-sonnet-4-5",

    "max_tokens": 1024,

    "messages": [

      {"role": "user", "content": "What is Cloudflare?"}

    ]

  }'


```

### Anthropic SDK

With Key in Request

* [ With Authenticated Gateway ](#tab-panel-6574)
* [ Unauthenticated Gateway ](#tab-panel-6575)

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  apiKey: "{ANTHROPIC_API_KEY}",

  baseURL,

  defaultHeaders: {

    Authorization: `Bearer {cf_api_token}`,

  },

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  apiKey: "{ANTHROPIC_API_KEY}",

  baseURL,

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

With Stored Keys (BYOK) / Unified Billing

```

import Anthropic from "@anthropic-ai/sdk";


const baseURL = `https://gateway.ai.cloudflare.com/v1/{accountId}/{gatewayId}/anthropic`;


const anthropic = new Anthropic({

  baseURL,

  defaultHeaders: {

    Authorization: `Bearer {cf_api_token}`,

  },

});


const message = await anthropic.messages.create({

  model: "claude-sonnet-4-5",

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  max_tokens: 1024,

});


```

## OpenAI-Compatible Endpoint

You can also access Anthropic models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

  "model": "anthropic/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/#page","headline":"Anthropic · Cloudflare AI Gateway docs","description":"Route Anthropic API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/anthropic/","name":"Anthropic"}}]}
```
