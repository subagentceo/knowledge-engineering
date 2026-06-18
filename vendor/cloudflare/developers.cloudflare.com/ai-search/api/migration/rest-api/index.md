---
title: REST API migration
description: Migrate from the legacy AutoRAG REST API endpoints to the new AI Search API endpoints.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API migration

The [AutoRAG API endpoints](https://developers.cloudflare.com/api/resources/autorag/) are the legacy REST API for AI Search. They will continue to work, but all new features and improvements are only available through the new [AI Search API endpoints](https://developers.cloudflare.com/ai-search/api/search/rest-api/).

## Endpoint changes

The legacy AutoRAG API endpoints under `/autorag/rags/` have been replaced by new endpoints under `/ai-search/instances/`.

| Description      | New endpoint                                 | Reference                                                                                                                       |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Chat completions | /ai-search/instances/{name}/chat/completions | [API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/) |
| Search           | /ai-search/instances/{name}/search           | [API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/)             |

The new API also includes endpoints for [instance management](https://developers.cloudflare.com/ai-search/api/instances/rest-api/), [items](https://developers.cloudflare.com/ai-search/api/items/rest-api/), and [namespace-level search](https://developers.cloudflare.com/ai-search/api/search/rest-api/#cross-instance-search-and-chat) that are not available in the legacy API. For the legacy endpoints, refer to the [AutoRAG API reference](https://developers.cloudflare.com/api/resources/autorag/).

## Chat completions

How to migrate from the AutoRAG `/ai-search` endpoint to the new `/chat/completions` endpoint:

**Before (AutoRAG API):**

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/autorag/rags/<INSTANCE_NAME>/ai-search" \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -d '{

    "query": "What is Cloudflare?"

  }'


```

**After (AI Search API):**

The new API uses the `messages` array format.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/chat/completions" \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -d '{

    "messages": [

      {

        "content": "What is Cloudflare?",

        "role": "user"

      }

    ]

  }'


```

## Search

How to migrate from the AutoRAG `/search` endpoint to the new `/search` endpoint:

**Before (AutoRAG API):**

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/autorag/rags/<INSTANCE_NAME>/search" \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -d '{

    "query": "What is Cloudflare?"

  }'


```

**After (AI Search API):**

The new API uses the `messages` array format. The `query` string format is also supported.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/search" \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -d '{

    "messages": [

      {

        "content": "What is Cloudflare?",

        "role": "user"

      }

    ]

  }'


```

## Streaming behavior changes

In the old AutoRAG API, when `stream` was set to `true`, you would only receive the streamed response without the retrieved chunks.

In the new AI Search API, streaming responses include the chunks. The retrieved chunks are sent first as a `chunks` event, followed by the streamed response data. This allows you to display the source chunks immediately while streaming the generated response to the user.

## Filter format

The new AI Search REST API uses Vectorize-style metadata filtering, which differs from the AutoRAG API format. Filters are now nested under `ai_search_options.retrieval.filters` in the request body. For full documentation of the old format, refer to [Metadata filter format (legacy)](https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/).

### Operator mapping

The filter operators have been renamed to use a `$` prefix:

| AutoRAG API | AI Search API     |
| ----------- | ----------------- |
| eq          | $eq (or implicit) |
| ne          | $ne               |
| gt          | $gt               |
| gte         | $gte              |
| lt          | $lt               |
| lte         | $lte              |
| $in (new)   |                   |
| $nin (new)  |                   |

### Examples

#### Simple filter

Filter by a single metadata field using implicit equality:

**Before (AutoRAG API):**

```

{

  "filters": {

    "type": "eq",

    "key": "folder",

    "value": "customer-a/"

  }

}


```

**After (AI Search API):**

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": { "folder": "customer-a/" }

    }

  }

}


```

#### Compound filter (AND)

Combine multiple conditions where all must match:

**Before (AutoRAG API):**

```

{

  "filters": {

    "type": "and",

    "filters": [

      { "type": "eq", "key": "folder", "value": "customer-a/" },

      { "type": "gte", "key": "timestamp", "value": "1735689600000" }

    ]

  }

}


```

**After (AI Search API):**

```

{

  "ai_search_options": {

    "retrieval": {

      "filters": {

        "folder": "customer-a/",

        "timestamp": { "$gte": 1735689600 }

      }

    }

  }

}


```

## API references

* [REST API documentation](https://developers.cloudflare.com/ai-search/api/search/rest-api/)
* [Chat Completions API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/chat%5Fcompletions/)
* [Search API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/search/)
* [Legacy AutoRAG API reference](https://developers.cloudflare.com/api/resources/autorag/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/migration/rest-api/#page","headline":"REST API migration · Cloudflare AI Search docs","description":"Migrate from the legacy AutoRAG REST API endpoints to the new AI Search API endpoints.","url":"https://developers.cloudflare.com/ai-search/api/migration/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/migration/","name":"API Migration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/migration/rest-api/","name":"REST API migration"}}]}
```
