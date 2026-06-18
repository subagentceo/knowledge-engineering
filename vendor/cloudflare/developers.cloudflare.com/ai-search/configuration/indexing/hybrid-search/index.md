---
title: Hybrid search
description: Combine vector and keyword search in AI Search for broader, more accurate retrieval results.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hybrid search

Hybrid search runs vector and keyword search in parallel and merges the results. It requires [keyword search](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/) to be enabled. For an overview of search modes, refer to [Search modes](https://developers.cloudflare.com/ai-search/concepts/search-modes/).

## Enable hybrid search

Set both `index_method.vector` and `index_method.keyword` to `true`:

TypeScript

```

const instance = await env.AI_SEARCH.create({

  id: "my-instance",

  index_method: {

    vector: true,

    keyword: true,

  },

  fusion_method: "rrf",

});


```

To disable hybrid search, set `index_method.keyword` to `false`. The keyword index is deleted.

For each search method, you can configure the following to adjust retrieval behavior:

* **Vector search**: Configure the [embedding model](https://developers.cloudflare.com/ai-search/configuration/models/).
* **Keyword search**: Configure the [tokenizer and match mode](https://developers.cloudflare.com/ai-search/configuration/indexing/keyword-search/).

## Fusion method

The `fusion_method` field controls how vector and keyword results are merged.

| Value | Default | Description                                                                                                               |
| ----- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| rrf   | Yes     | Reciprocal Rank Fusion. Scores results based on rank position across both search methods. Recommended for most use cases. |
| max   | No      | Takes the higher of the normalized vector and keyword scores. Use when one search method is consistently more relevant.   |

## Reranking

After fusion, you can optionally apply reranking to further reorder results by semantic relevance. Reranking uses a cross-encoder model that evaluates the query and each chunk together, which can improve precision beyond what fusion alone provides.

Reranking is disabled by default. Refer to [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/) to enable and configure it.

## Per-request overrides

Override search settings on individual requests using `ai_search_options.retrieval`.

| Field           | Type                             | Description                                                          |
| --------------- | -------------------------------- | -------------------------------------------------------------------- |
| retrieval\_type | "vector", "keyword", or "hybrid" | Force a specific search mode. Must be compatible with index\_method. |
| fusion\_method  | "rrf" or "max"                   | Override the fusion method.                                          |

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    retrieval: {

      retrieval_type: "hybrid",

      fusion_method: "rrf",

    },

  },

});


```

Note

Requesting a `retrieval_type` that is not compatible with the instance `index_method` returns an error.

## Scoring details

When hybrid search is active, each chunk includes a `scoring_details` object:

| Field            | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| vector\_score    | number | Vector similarity score (0 to 1).           |
| keyword\_score   | number | Raw BM25 keyword score.                     |
| vector\_rank     | number | Rank position in the vector result set.     |
| keyword\_rank    | number | Rank position in the keyword result set.    |
| fusion\_method   | string | Fusion method used (rrf or max).            |
| reranking\_score | number | Score from the reranking model, if enabled. |

## Limits

Instances with keyword search enabled support up to 500,000 files per instance on the Workers Paid tier, compared to 1,000,000 for vector-only instances. Refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/) for the full list of limits.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/#page","headline":"Hybrid search · Cloudflare AI Search docs","description":"Combine vector and keyword search in AI Search for broader, more accurate retrieval results.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/hybrid-search/","name":"Hybrid search"}}]}
```
