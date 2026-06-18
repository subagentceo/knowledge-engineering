---
title: Troubleshooting
description: Debug and resolve common issues with Workers AI embedded function calling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

This section will describe tools for troubleshooting and address common errors.

## Logging

General [logging](https://developers.cloudflare.com/workers/observability/logs/) capabilities for Workers also apply to embedded function calling.

### Function invocations

The invocations of tools can be logged as in any Worker using `console.log()`:

Logging tool invocations

```

export default {

  async fetch(request, env, ctx) {

    const sum = (args: { a: number; b: number }): Promise<string> => {

      const { a, b } = args;

      // Logging from within embedded function invocations

      console.log(`The sum function has been invoked with the arguments a: ${a} and b: ${b}`)

      return Promise.resolve((a + b).toString());

    };

    ...

  }

}


```

### Logging within `runWithTools`

The `runWithTools` function has a `verbose` mode that emits helpful logs for debugging of function calls as well input and output statistics.

Enabled verbose mode

```

const response = await runWithTools(

  env.AI,

  '@hf/nousresearch/hermes-2-pro-mistral-7b',

  {

    messages: [

      ...

    ],

    tools: [

      ...

    ],

  },

  // Enable verbose mode

  { verbose: true }

);


```

## Performance

To respond to a LLM prompt with embedded function, potentially multiple AI inference requests and function invocations are needed, which can have an impact on user experience.

Consider the following to improve performance:

* Shorten prompts (to reduce time for input processing)
* Reduce number of tools provided
* Stream the final response to the end user (to minimize the time to interaction). See example below:

Streamed response example

```

async fetch(request, env, ctx) {

  const response = (await runWithTools(

    env.AI,

    '@hf/nousresearch/hermes-2-pro-mistral-7b',

    {

      messages: [

        ...

      ],

      tools: [

        ...

      ],

    },

    {

      // Enable response streaming

      streamFinalResponse: true,

    }

  )) as ReadableStream;


  // Set response headers for streaming

  return new Response(response, {

    headers: {

      'content-type': 'text/event-stream',

    },

  });

}


```

## Common Errors

If you are getting a `BadInput` error, your inputs may exceed our current context window for our models. Try reducing input tokens to resolve this error.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Workers AI docs","description":"Debug and resolve common issues with Workers AI embedded function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/function-calling/","name":"Function calling"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/function-calling/embedded/","name":"Embedded"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers-ai/features/function-calling/embedded/troubleshooting/","name":"Troubleshooting"}}]}
```
