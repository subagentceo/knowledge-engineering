---
title: Vector search
description: Configure vector search in AI Search to find semantically similar content using embeddings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vector search

Vector search converts your query into a vector embedding and finds chunks with similar meaning. It is enabled by default on all AI Search instances. For an overview of search modes, refer to [Search modes](https://developers.cloudflare.com/ai-search/concepts/search-modes/).

## Built-in vector index

Instances created after **April 16, 2026** include a built-in vector index powered by [Vectorize](https://developers.cloudflare.com/vectorize/). The vector index stores embeddings generated from your content and is created and maintained automatically. You do not need to create or manage a Vectorize index yourself.

Instances created before this date use a Vectorize index provisioned on your account. These instances are billed separately for Vectorize usage. All instances created before this date will be automatically migrated to managed infrastructure on **June 3, 2026**. For details, refer to [Limits & pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/#previous-instances).

## Embedding model

The [embedding model](https://developers.cloudflare.com/ai-search/configuration/models/) determines the vector dimensions for the vector index. The embedding model is set when creating an instance and cannot be changed after creation.

## Disable vector search

Vector search is the default index method for all instances. To switch to [keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/) only, set `index_method.vector` to `false`. At least one of `vector` or `keyword` must be `true`.

TypeScript

```

const instance = await env.AI_SEARCH.create({

  id: "my-instance",

  index_method: {

    vector: false,

    keyword: true,

  },

});


```

## Per-request overrides

You can force vector-only search on a per-request basis using `ai_search_options.retrieval.retrieval_type`, even if keyword search is also enabled on the instance.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    retrieval: {

      retrieval_type: "vector",

    },

  },

});


```

## Scoring details

When using vector search, each chunk includes a `scoring_details` object:

| Field         | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| vector\_score | number | Vector similarity score (0 to 1). |
| vector\_rank  | number | Rank position in the result set.  |

## Limits

For vector index limits, refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/#page","headline":"Vector search · Cloudflare AI Search docs","description":"Configure vector search in AI Search to find semantically similar content using embeddings.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/vector-search/","name":"Vector search"}}]}
```
