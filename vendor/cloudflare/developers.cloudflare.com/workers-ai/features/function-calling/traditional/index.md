---
title: Traditional
description: Define tools and schemas for industry-standard function calling with Workers AI models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traditional

This page shows how you can do traditional function calling, as defined by industry standards. Workers AI also offers [embedded function calling](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/), which is drastically easier than traditional function calling.

With traditional function calling, you define an array of tools with the name, description, and tool arguments. The example below shows how you would pass a tool called `getWeather` in an inference request to a model.

Traditional function calling example

```

const response = await env.AI.run("@hf/nousresearch/hermes-2-pro-mistral-7b", {

  messages: [

    {

      role: "user",

      content: "what is the weather in london?",

    },

  ],

  tools: [

    {

      name: "getWeather",

      description: "Return the weather for a latitude and longitude",

      parameters: {

        type: "object",

        properties: {

          latitude: {

            type: "string",

            description: "The latitude for the given location",

          },

          longitude: {

            type: "string",

            description: "The longitude for the given location",

          },

        },

        required: ["latitude", "longitude"],

      },

    },

  ],

});


return new Response(JSON.stringify(response.tool_calls));


```

The LLM will then return a JSON object with the required arguments and the name of the tool that was called. You can then pass this JSON object to make an API call.

```

[

  {

    "arguments": { "latitude": "51.5074", "longitude": "-0.1278" },

    "name": "getWeather"

  }

]


```

For a working example on how to do function calling, take a look at our [demo app ↗](https://github.com/craigsdennis/lightbulb-moment-tool-calling/blob/main/src/index.ts).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/traditional/#page","headline":"Traditional function calling · Cloudflare Workers AI docs","description":"Define tools and schemas for industry-standard function calling with Workers AI models.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/traditional/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/function-calling/","name":"Function calling"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/function-calling/traditional/","name":"Traditional"}}]}
```
