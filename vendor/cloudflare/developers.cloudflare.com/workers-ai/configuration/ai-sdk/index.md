---
title: Vercel AI SDK
description: Use Workers AI with the Vercel AI SDK for streaming text generation, tool calls, and structured output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vercel AI SDK

Workers AI can be used with the [Vercel AI SDK ↗](https://sdk.vercel.ai/) for JavaScript and TypeScript codebases.

## Setup

Install the [workers-ai-provider provider ↗](https://sdk.vercel.ai/providers/community-providers/cloudflare-workers-ai):

 npm  yarn  pnpm  bun 

```
npm i workers-ai-provider
```

```
yarn add workers-ai-provider
```

```
pnpm add workers-ai-provider
```

```
bun add workers-ai-provider
```

Then, add an AI binding in your Workers project Wrangler file:

TOML

```

[ai]

binding = "AI"


```

## Models

The AI SDK can be configured to work with [any AI model](https://developers.cloudflare.com/workers-ai/models/).

JavaScript

```

import { createWorkersAI } from "workers-ai-provider";


const workersai = createWorkersAI({ binding: env.AI });


// Choose any model: https://developers.cloudflare.com/workers-ai/models/

const model = workersai("@cf/meta/llama-3.1-8b-instruct", {});


```

## Generate Text

Once you have selected your model, you can generate text from a given prompt.

JavaScript

```

import { createWorkersAI } from 'workers-ai-provider';

import { generateText } from 'ai';


type Env = {

  AI: Ai;

};


export default {

  async fetch(_: Request, env: Env) {

    const workersai = createWorkersAI({ binding: env.AI });

    const result = await generateText({

      model: workersai('@cf/meta/llama-2-7b-chat-int8'),

      prompt: 'Write a 50-word essay about hello world.',

    });


    return new Response(result.text);

  },

};


```

## Stream Text

For longer responses, consider streaming responses to provide as the generation completes.

JavaScript

```

import { createWorkersAI } from 'workers-ai-provider';

import { streamText } from 'ai';


type Env = {

  AI: Ai;

};


export default {

  async fetch(_: Request, env: Env) {

    const workersai = createWorkersAI({ binding: env.AI });

    const result = streamText({

      model: workersai('@cf/meta/llama-2-7b-chat-int8'),

      prompt: 'Write a 50-word essay about hello world.',

    });


    return result.toTextStreamResponse({

      headers: {

        // add these headers to ensure that the

        // response is chunked and streamed

        'Content-Type': 'text/x-unknown',

        'content-encoding': 'identity',

        'transfer-encoding': 'chunked',

      },

    });

  },

};


```

## Generate Structured Objects

You can provide a Zod schema to generate a structured JSON response.

JavaScript

```

import { createWorkersAI } from 'workers-ai-provider';

import { generateObject } from 'ai';

import { z } from 'zod';


type Env = {

  AI: Ai;

};


export default {

  async fetch(_: Request, env: Env) {

    const workersai = createWorkersAI({ binding: env.AI });

    const result = await generateObject({

      model: workersai('@cf/meta/llama-3.1-8b-instruct'),

      prompt: 'Generate a Lasagna recipe',

      schema: z.object({

        recipe: z.object({

          ingredients: z.array(z.string()),

          description: z.string(),

        }),

      }),

    });


    return Response.json(result.object);

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/#page","headline":"Vercel AI SDK · Cloudflare Workers AI docs","description":"Use Workers AI with the Vercel AI SDK for streaming text generation, tool calls, and structured output.","url":"https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/configuration/ai-sdk/","name":"Vercel AI SDK"}}]}
```
