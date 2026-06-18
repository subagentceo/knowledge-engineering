---
title: Cohere
description: Route Cohere API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cohere

[Cohere ↗](https://cohere.com/) build AI models designed to solve real-world business challenges.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cohere


```

## URL structure

When making requests to [Cohere ↗](https://cohere.com/), replace `https://api.cohere.ai/v1` in the URL you're currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cohere`.

## Prerequisites

When making requests to Cohere, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Cohere API token.
* The name of the Cohere model you want to use.

## Examples

### cURL

Request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cohere/v1/chat \

  --header 'Authorization: Token {cohere_api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

  "chat_history": [

    {"role": "USER", "message": "Who discovered gravity?"},

    {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}

  ],

  "message": "What year was he born?",

  "connectors": [{"id": "web-search"}]

}'


```

### Use Cohere SDK with Python

If using the [cohere-python-sdk ↗](https://github.com/cohere-ai/cohere-python), set your endpoint like this:

Python

```

import cohere

import os


api_key = os.getenv('API_KEY')

account_id = '{account_id}'

gateway_id = '{gateway_id}'

base_url = f"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/cohere/v1"


co = cohere.Client(

  api_key=api_key,

  base_url=base_url,

)


message = "hello world!"

model = "command-r-plus"


chat = co.chat(

  message=message,

  model=model

)


print(chat)


```

## OpenAI-Compatible Endpoint

You can also access Cohere models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "cohere/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/cohere/#page","headline":"Cohere · Cloudflare AI Gateway docs","description":"Route Cohere API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/cohere/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/cohere/","name":"Cohere"}}]}
```
