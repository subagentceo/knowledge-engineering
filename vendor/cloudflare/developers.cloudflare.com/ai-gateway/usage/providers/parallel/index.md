---
title: Parallel
description: Route Parallel API requests through AI Gateway for observability and control.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Parallel

[Parallel ↗](https://parallel.ai/) is a web API purpose-built for AIs, providing production-ready outputs with minimal hallucination and evidence-based results.

## Endpoint

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel


```

## URL structure

When making requests to Parallel, you can route to any Parallel endpoint through AI Gateway by appending the path after `parallel`. For example, to access the Tasks API at `/v1/tasks/runs`, use:

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1/tasks/runs


```

## Prerequisites

When making requests to Parallel, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Parallel API key.

## Examples

### Tasks API

The [Tasks API ↗](https://docs.parallel.ai/task-api/task-quickstart) allows you to create comprehensive research and analysis tasks.

#### cURL example

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1/tasks/runs \

  --header 'x-api-key: {parallel_api_key}' \

  --header 'Content-Type: application/json' \

  --data '{

    "input": "Create a comprehensive market research report on the HVAC industry in the USA including an analysis of recent M&A activity and other relevant details.",

    "processor": "ultra"

  }'


```

### Search API

The [Search API ↗](https://docs.parallel.ai/search-api/search-quickstart) enables advanced search with configurable parameters.

#### cURL example

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1beta/search \

  --header 'x-api-key: {parallel_api_key}' \

  --header 'Content-Type: application/json' \

  --data '{

    "objective": "When was the United Nations established? Prefer UN'\''s websites.",

    "search_queries": [

      "Founding year UN",

      "Year of founding United Nations"

    ],

    "processor": "base",

    "max_results": 10,

    "max_chars_per_result": 6000

  }'


```

## Chat API

The [Chat API ↗](https://docs.parallel.ai/chat-api/chat-quickstart) is supported through AI Gateway's Unified Chat Completions API. See below for more details:

## OpenAI-Compatible Endpoint

You can also access Parallel models using the OpenAI API schema through the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/). Send your requests to:

```

https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions


```

Specify:

```

{

"model": "parallel/{model}"

}


```

#### JavaScript SDK example

JavaScript

```

import OpenAI from "openai";


const apiKey = "{parallel_api_key}";

const accountId = "{account_id}";

const gatewayId = "{gateway_id}";

const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`;


const client = new OpenAI({

  apiKey,

  baseURL,

});


try {

  const model = "parallel/speed";

  const messages = [{ role: "user", content: "Hello!" }];

  const chatCompletion = await client.chat.completions.create({

    model,

    messages,

  });

  const response = chatCompletion.choices[0].message;

  console.log(response);

} catch (e) {

  console.error(e);

}


```

### FindAll API

The [FindAll API ↗](https://docs.parallel.ai/findall-api/findall-quickstart) enables structured data extraction from complex queries.

#### cURL example

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1beta/findall/ingest \

  --header 'x-api-key: {parallel_api_key}' \

  --header 'Content-Type: application/json' \

  --data '{

    "query": "Find all AI companies that recently raised money and get their website, CEO name, and CTO name."

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/#page","headline":"Parallel · Cloudflare AI Gateway docs","description":"Route Parallel API requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/usage/","name":"Using AI Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/usage/providers/","name":"Provider Native"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/usage/providers/parallel/","name":"Parallel"}}]}
```
