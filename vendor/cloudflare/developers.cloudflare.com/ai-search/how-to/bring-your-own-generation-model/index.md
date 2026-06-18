---
title: Bring your own generation model
description: Use AI Search for retrieval while generating responses with an external model like OpenAI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bring your own generation model

When using AI Search, AI Search uses a Workers AI model to generate the response. If you want to use a model outside of Workers AI, you can use AI Search for `search` while using a different model to generate responses.

This example uses an OpenAI model to generate responses from AI Search results. It uses the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/).

Note

AI Search supports [bringing your own models natively](https://developers.cloudflare.com/ai-search/configuration/models/). You can attach provider keys through AI Gateway and select third-party models directly in your AI Search settings. The example below still works, but the recommended approach is to configure your external model through AI Gateway.

* [  JavaScript ](#tab-panel-6623)
* [  TypeScript ](#tab-panel-6624)

JavaScript

```

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";


export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    // Search for documents in AI Search

    const searchResult = await env.AI_SEARCH.get("my-instance").search({

      messages: [{ role: "user", content: userQuery }],

    });


    if (searchResult.chunks.length === 0) {

      return Response.json({ text: `No data found for query "${userQuery}"` });

    }


    // Join all document chunks into a single string

    const chunks = searchResult.chunks

      .map((chunk) => {

        return `<file name="${chunk.item.key}">${chunk.text}</file>`;

      })

      .join("\n\n");


    // Send the user query + matched documents to OpenAI for answer

    const generateResult = await generateText({

      model: openai("gpt-4o-mini"),

      messages: [

        {

          role: "system",

          content:

            "You are a helpful assistant and your task is to answer the user question using the provided files.",

        },

        { role: "user", content: chunks },

        { role: "user", content: userQuery },

      ],

    });


    return Response.json({ text: generateResult.text });

  },

};


```

TypeScript

```

import { openai } from "@ai-sdk/openai";

import { generateText } from "ai";


export interface Env {

  AI_SEARCH: AiSearchNamespace;

  OPENAI_API_KEY: string;

}


export default {

  async fetch(request, env): Promise<Response> {

    const url = new URL(request.url);


    const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";


    // Search for documents in AI Search

    const searchResult = await env.AI_SEARCH.get("my-instance").search({

      messages: [{ role: "user", content: userQuery }],

    });


    if (searchResult.chunks.length === 0) {

      return Response.json({ text: `No data found for query "${userQuery}"` });

    }


    // Join all document chunks into a single string

    const chunks = searchResult.chunks

      .map((chunk) => {

        return `<file name="${chunk.item.key}">${chunk.text}</file>`;

      })

      .join("\n\n");


    // Send the user query + matched documents to OpenAI for answer

    const generateResult = await generateText({

      model: openai("gpt-4o-mini"),

      messages: [

        {

          role: "system",

          content:

            "You are a helpful assistant and your task is to answer the user question using the provided files.",

        },

        { role: "user", content: chunks },

        { role: "user", content: userQuery },

      ],

    });


    return Response.json({ text: generateResult.text });

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/#page","headline":"Bring your own generation model · Cloudflare AI Search docs","description":"Use AI Search for retrieval while generating responses with an external model like OpenAI.","url":"https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/how-to/bring-your-own-generation-model/","name":"Bring your own generation model"}}]}
```
