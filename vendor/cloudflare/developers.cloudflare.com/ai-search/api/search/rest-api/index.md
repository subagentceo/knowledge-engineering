---
title: REST API
description: Query AI Search instances over HTTP using the REST API for search and chat completions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API

Use the AI Search REST API to query your AI Search instances over HTTP.

Note

The previous [AutoRAG API endpoints](https://developers.cloudflare.com/api/resources/autorag/) are no longer recommended for use. Refer to [Migrate from AutoRAG REST API](https://developers.cloudflare.com/ai-search/api/migration/rest-api/) for details.

## Authentication

All requests require an API token with **AI Search:Edit** and **AI Search:Run** permissions.

1. In the Cloudflare dashboard, go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a **Token name**, for example `AI Search Manager`.
5. Under **Permissions**, add two permissions:  
   * **Account** \> **AI Search:Edit**  
   * **Account** \> **AI Search:Run**
6. Select **Continue to summary**, then select **Create Token**.
7. Copy and save the token value. This is your `API_TOKEN`.

Include the token in the `Authorization` header for all requests:

```

Authorization: Bearer <API_TOKEN>


```

## Search and chat

AI Search provides two APIs for querying an instance. Both use an OpenAI-compatible `messages` format.

* **Search** returns relevant content chunks. Use this when you want to handle generation yourself or display results directly.
* **Chat completions** retrieves content and generates a response in one call.

### API paths

AI Search APIs are available at two base paths:

| Path                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| /accounts/{account\_id}/ai-search/instances/{id}/                        | Operates on a specific instance                                                                              |
| /accounts/{account\_id}/ai-search/namespaces/{namespace}/instances/{id}/ | Operates on instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) |

The following operations are the same for both paths. For the namespace-scoped API, refer to the [Namespace API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/).

### Search

Search a specific instance. The search endpoint also accepts a `query` string parameter. For the full specification, refer to the [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/).

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/search" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "What is Cloudflare?",

        "role": "user"

      }

    ]

  }'


```

### Chat completions

Generate a response from a specific instance. For the full specification, refer to the [Chat completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/).

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/chat/completions" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "content": "What is Cloudflare?",

        "role": "user"

      }

    ]

  }'


```

#### Streaming

Set `stream` to `true` to receive responses as Server-Sent Events (SSE). The retrieved chunks are sent first as a `chunks` event, followed by the streamed response.

```

event: chunks

data: [{"id":"chunk-001","type":"text","score":0.85,"text":"...","item":{"key":"about-cloudflare.md","timestamp":1775925540000},"scoring_details":{"vector_score":0.85}}]


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" document"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" you provided doesn"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"'t contain"}}]}


data: {"id":"id-1776072781845","created":1776072781,"model":"@cf/meta/llama-3.3-70b-instruct-fp8-fast","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" information"}}]}


data: [DONE]


```

## Cross-instance search and chat

The search and chat completions APIs are also available at the namespace level. These work the same as the instance endpoints, but you pass an `instance_ids` array to specify which instances to query. Each chunk in the response includes an `instance_id` field identifying which instance it came from. For the full specification, refer to the [Namespace API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/).

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/namespaces/<NAMESPACE>/search" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  -d '{

    "messages": [

      {

        "role": "user",

        "content": "What is Cloudflare?"

      }

    ],

    "ai_search_options": {

      "instance_ids": ["product-docs", "customer-abc123"]

    }

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/search/rest-api/#page","headline":"REST API · Cloudflare AI Search docs","description":"Query AI Search instances over HTTP using the REST API for search and chat completions.","url":"https://developers.cloudflare.com/ai-search/api/search/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/search/","name":"Search"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/search/rest-api/","name":"REST API"}}]}
```
