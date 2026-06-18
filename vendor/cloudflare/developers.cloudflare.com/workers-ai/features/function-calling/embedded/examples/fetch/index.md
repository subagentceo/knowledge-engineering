---
title: Use fetch() handler
description: Learn how to use the fetch() handler in Cloudflare Workers AI to enable LLMs to perform API calls, like retrieving a 5-day weather forecast using function calling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use fetch() handler

**Last reviewed:**  almost 2 years ago 

A very common use case is to provide the LLM with the ability to perform API calls via function calling.

In this example the LLM will retrieve the weather forecast for the next 5 days. To do so a `getWeather` function is defined that is passed to the LLM as tool.

The `getWeather`function extracts the user's location from the request and calls the external weather API via the Workers' [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) and returns the result.

Embedded function calling example with fetch()

```

import { runWithTools } from '@cloudflare/ai-utils';


type Env = {

  AI: Ai;

};


export default {

  async fetch(request, env, ctx) {

    // Define function

    const getWeather = async (args: { numDays: number }) => {

      const { numDays } = args;

      // Location is extracted from request based on

      // https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties

      const lat = request.cf?.latitude

      const long = request.cf?.longitude


      // Interpolate values for external API call

      const response = await fetch(

        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,precipitation_sum&timezone=GMT&forecast_days=${numDays}`

      );

      return response.text();

    };

    // Run AI inference with function calling

    const response = await runWithTools(

      env.AI,

      // Model with function calling support

      '@hf/nousresearch/hermes-2-pro-mistral-7b',

      {

        // Messages

        messages: [

          {

            role: 'user',

            content: 'What the weather like the next 5 days? Respond as text',

          },

        ],

        // Definition of available tools the AI model can leverage

        tools: [

          {

            name: 'getWeather',

            description: 'Get the weather for the next [numDays] days',

            parameters: {

              type: 'object',

              properties: {

                numDays: { type: 'numDays', description: 'number of days for the weather forecast' },

              },

              required: ['numDays'],

            },

            // reference to previously defined function

            function: getWeather,

          },

        ],

      }

    );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/#page","headline":"Use fetch() handler · Cloudflare Workers AI docs","description":"Learn how to use the fetch() handler in Cloudflare Workers AI to enable LLMs to perform API calls, like retrieving a 5-day weather forecast using function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/function-calling/","name":"Function calling"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/function-calling/embedded/","name":"Embedded"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers-ai/features/function-calling/embedded/examples/","name":"Examples"}},{"@type":"ListItem","position":7,"item":{"@id":"/workers-ai/features/function-calling/embedded/examples/fetch/","name":"Use fetch() handler"}}]}
```
