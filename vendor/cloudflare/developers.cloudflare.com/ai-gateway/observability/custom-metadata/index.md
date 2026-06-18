---
title: Custom metadata
description: Tag AI Gateway requests with custom metadata such as user IDs to improve log filtering and analysis.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom metadata

Custom metadata in AI Gateway allows you to tag requests with user IDs or other identifiers, enabling better tracking and analysis of your requests. Metadata values can be strings, numbers, or booleans, and will appear in your logs, making it easy to search and filter through your data.

## Key Features

* **Custom Tagging**: Add user IDs, team names, test indicators, and other relevant information to your requests.
* **Enhanced Logging**: Metadata appears in your logs, allowing for detailed inspection and troubleshooting.
* **Search and Filter**: Use metadata to efficiently search and filter through logged requests.

Note

AI Gateway allows you to pass up to five custom metadata entries per request. If more than five entries are provided, only the first five will be saved; additional entries will be ignored. Ensure your custom metadata is limited to five entries to avoid unprocessed or lost data.

## Supported Metadata Types

* String
* Number
* Boolean

Note

Objects are not supported as metadata values.

## Implementations

### Using cURL

To include custom metadata in your request using cURL:

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --header 'cf-aig-metadata: {"team": "AI", "user": 12345, "test":true}' \

  --data '{"model": "openai/gpt-4.1", "messages": [{"role": "user", "content": "What should I eat for lunch?"}]}'


```

### Using SDK

To include custom metadata in your request using the OpenAI SDK:

* [  JavaScript ](#tab-panel-6562)
* [  TypeScript ](#tab-panel-6563)

JavaScript

```

import OpenAI from "openai";


export default {

  async fetch(request, env, ctx) {

    const openai = new OpenAI({

      apiKey: env.CLOUDFLARE_API_TOKEN,

      baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,

    });


    try {

      const chatCompletion = await openai.chat.completions.create(

        {

          model: "openai/gpt-4.1",

          messages: [{ role: "user", content: "What should I eat for lunch?" }],

          max_tokens: 50,

        },

        {

          headers: {

            "cf-aig-metadata": JSON.stringify({

              user: "JaneDoe",

              team: 12345,

              test: true,

            }),

          },

        },

      );


      const response = chatCompletion.choices[0].message;

      return new Response(JSON.stringify(response));

    } catch (e) {

      console.log(e);

      return new Response(e);

    }

  },

};


```

TypeScript

```

import OpenAI from "openai";


export default {

  async fetch(request, env, ctx) {

    const openai = new OpenAI({

      apiKey: env.CLOUDFLARE_API_TOKEN,

      baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,

    });


    try {

      const chatCompletion = await openai.chat.completions.create(

        {

          model: "openai/gpt-4.1",

          messages: [{ role: "user", content: "What should I eat for lunch?" }],

          max_tokens: 50,

        },

        {

          headers: {

            "cf-aig-metadata": JSON.stringify({

              user: "JaneDoe",

              team: 12345,

              test: true,

            }),

          },

        },

      );


      const response = chatCompletion.choices[0].message;

      return new Response(JSON.stringify(response));

    } catch (e) {

      console.log(e);

      return new Response(e);

    }

  },

};


```

### Using Binding

To include custom metadata in your request using [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/):

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const aiResp = await env.AI.run(

      "@cf/mistral/mistral-7b-instruct-v0.1",

      { prompt: "What should I eat for lunch?" },

      {

        gateway: {

          id: "gateway_id",

          metadata: { team: "AI", user: 12345, test: true },

        },

      },

    );


    return new Response(aiResp);

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#page","headline":"Custom metadata · Cloudflare AI Gateway docs","description":"Tag AI Gateway requests with custom metadata such as user IDs to improve log filtering and analysis.","url":"https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/custom-metadata/","name":"Custom metadata"}}]}
```
