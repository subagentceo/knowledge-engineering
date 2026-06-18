---
title: Reranking
description: Enable reranking in AI Search to reorder retrieved results by semantic relevance.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Reranking

Reranking can help improve the quality of AI Search results by reordering retrieved documents based on semantic relevance to the user's query. It applies a secondary model after retrieval to rerank the top results before they are returned.

## How it works

By default, reranking is **disabled** for all AI Search instances. You can enable it during creation or later from the settings page.

When enabled, AI Search will:

1. Retrieve a set of relevant results from your index, constrained by your `max_num_results` and `score_threshold` parameters.
2. Pass those results through a [reranking model](https://developers.cloudflare.com/ai-search/configuration/models/supported-models/).
3. Return the reranked results, which the text generation model can use for answer generation.

Reranking helps improve accuracy, especially for large or noisy datasets where vector similarity alone may not produce the optimal ordering.

## Configuration

When you make a `/search` or `/chat/completions` request using the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) or [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/), you can enable or disable reranking per request and specify the reranking model.

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    reranking: {

      enabled: true,

      model: "@cf/baai/bge-reranker-base",

    },

  },

});


```

### Considerations

Adding reranking will include an additional step to the query request. As a result, there may be an increase in the latency of the request.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/#page","headline":"Reranking · Cloudflare AI Search docs","description":"Enable reranking in AI Search to reorder retrieved results by semantic relevance.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/retrieval/","name":"Retrieval"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/retrieval/reranking/","name":"Reranking"}}]}
```
