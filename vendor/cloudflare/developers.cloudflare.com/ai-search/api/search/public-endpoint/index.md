---
title: Public endpoint
description: Integrate AI Search into public-facing applications using unauthenticated public endpoints.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Public endpoint

AI Search public endpoints allow you to expose AI Search capabilities without requiring authentication. This enables you to integrate AI Search into public-facing applications or share it with external users.

For pre-built search and chat components you can embed on your website using the public endpoints, refer to [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/).

## Prerequisites

Enable public endpoints for your AI Search instance:

1. Go to **AI Search** in the Cloudflare dashboard.[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL.

For configuration options like rate limiting and CORS, refer to [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/).

## Chat completions

The `/chat/completions` endpoint searches your data source and generates a response using the model and retrieved context. It uses the same OpenAI-compatible format as the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/#chat-completions).

Terminal window

```

curl https://<INSTANCE_ID>.search.ai.cloudflare.com/chat/completions \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "How do I configure AI Search?",

        "role": "user"

      }

    ]

  }'


```

For the full list of options, refer to the [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

## Search

The `/search` endpoint returns relevant chunks from your data source without generating a response. It uses the same format as the [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/#search).

Terminal window

```

curl https://<INSTANCE_ID>.search.ai.cloudflare.com/search \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "How do I configure AI Search?",

        "role": "user"

      }

    ]

  }'


```

For the full list of options, refer to the [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

## Next steps

* [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/) \- Add pre-built search and chat components to your website.
* [MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/) \- Connect AI agents using the Model Context Protocol.
* [Public endpoint configuration](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/) \- Configure rate limiting, CORS, and security settings.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/public-endpoint/#page","headline":"Public endpoint · Cloudflare AI Search docs","description":"Integrate AI Search into public-facing applications using unauthenticated public endpoints.","url":"https://developers.cloudflare.com/ai-search/api/search/public-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/search/","name":"Search"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/search/public-endpoint/","name":"Public endpoint"}}]}
```
