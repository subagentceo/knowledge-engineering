---
title: Cerebras
description: Route Cerebras inference requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cerebras

[Cerebras ↗](https://inference-docs.cerebras.ai/) offers developers a low-latency solution for AI model inference.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cerebras


```

## Prerequisites

When making requests to Cerebras, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Cerebras API token.
* The name of the Cerebras model you want to use.

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cerebras/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer CEREBRAS_TOKEN' \

 --data '{

    "model": "llama3.1-8b",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

## OpenAI-Compatible Endpoint

You can also access Cerebras models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "cerebras/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/cerebras/#page","headline":"Cerebras · Cloudflare AI Gateway docs","description":"Route Cerebras inference requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/cerebras/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/cerebras/","name":"Cerebras"}}]}
```
