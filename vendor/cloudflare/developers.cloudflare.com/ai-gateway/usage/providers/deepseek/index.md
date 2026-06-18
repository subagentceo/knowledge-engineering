---
title: DeepSeek
description: Route DeepSeek API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DeepSeek

[DeepSeek ↗](https://www.deepseek.com/) helps you build quickly with DeepSeek's advanced AI models.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek


```

## Prerequisites

When making requests to DeepSeek, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active DeepSeek AI API token.
* The name of the DeepSeek AI model you want to use.

## URL structure

Your new base URL will use the data above in this structure:

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/`.

You can then append the endpoint you want to hit, for example: `chat/completions`.

So your final URL will come together as:

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/chat/completions`.

## Examples

### cURL

Example fetch request

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek/chat/completions \

 --header 'content-type: application/json' \

 --header 'Authorization: Bearer DEEPSEEK_TOKEN' \

 --data '{

    "model": "deepseek-chat",

    "messages": [

        {

            "role": "user",

            "content": "What is Cloudflare?"

        }

    ]

}'


```

### Use DeepSeek with JavaScript

If you are using the OpenAI SDK, you can set your endpoint like this:

JavaScript

```

import OpenAI from "openai";


const openai = new OpenAI({

  apiKey: env.DEEPSEEK_TOKEN,

  baseURL:

    "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepseek",

});


try {

  const chatCompletion = await openai.chat.completions.create({

    model: "deepseek-chat",

    messages: [{ role: "user", content: "What is Cloudflare?" }],

  });


  const response = chatCompletion.choices[0].message;


  return new Response(JSON.stringify(response));

} catch (e) {

  return new Response(e);

}


```

## OpenAI-Compatible Endpoint

You can also access DeepSeek models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "deepseek/{model}"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/deepseek/#page","headline":"DeepSeek · Cloudflare AI Gateway docs","description":"Route DeepSeek API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/deepseek/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/deepseek/","name":"DeepSeek"}}]}
```
