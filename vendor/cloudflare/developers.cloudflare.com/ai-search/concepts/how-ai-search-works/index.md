---
title: How AI Search works
description: Understand how AI Search indexes your content and retrieves results using vector and keyword search.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How AI Search works

AI Search is a managed search service. Connect a website, an R2 bucket, or upload your own documents, and AI Search indexes your content for natural language queries.

AI Search consists of two core processes:

* **Indexing:** An asynchronous process that converts your content into vectors and keyword indexes for search. Indexing runs automatically when you connect a data source or upload files.
* **Querying:** A synchronous process triggered by user queries. It retrieves the most relevant content using vector search, keyword search, or both, and optionally generates a response.

## How indexing works

Indexing begins automatically when you connect a data source or upload files through the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/).

![Indexing](https://developers.cloudflare.com/_astro/indexing.CQ13F9Js_2Tvxs.webp) 

Here is what happens during indexing:

1. **Data ingestion:** AI Search reads from your connected data source or receives files uploaded through the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/).
2. **Markdown conversion:** AI Search uses [Workers AI's Markdown Conversion](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) to convert [supported data types](https://developers.cloudflare.com/ai-search/configuration/data-source/) into structured Markdown. This ensures consistency across diverse file types. For images, Workers AI is used to perform object detection followed by vision-to-language transformation to convert images into Markdown text.
3. **Chunking:** The extracted text is [chunked](https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/) into smaller pieces to improve retrieval granularity.
4. **Embedding:** Each chunk is embedded using Workers AI's embedding model to transform the content into vectors.
5. **Keyword indexing:** When keyword search is enabled, each chunk is also indexed for BM25 keyword matching.
6. **Storage:** The vectors, keyword index, and content are stored and ready for search.

For instances with a connected data source, AI Search regularly checks for updates and indexes changes automatically. For instances using [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/), new files are indexed as they are uploaded.

## How querying works

Once indexing is complete, AI Search is ready to respond to end-user queries in real time.

![Querying](https://developers.cloudflare.com/_astro/querying.c_RrR1YL_1ECh9s.webp) 

Here is how the querying pipeline works:

1. **Receive query from AI Search API:** The query workflow begins when you send a request to either the AI Search's [Chat Completions](https://developers.cloudflare.com/ai-search/api/search/rest-api/#chat-completions) or [Search](https://developers.cloudflare.com/ai-search/api/search/rest-api/#search) endpoints.
2. **Query rewriting (optional):** AI Search provides the option to [rewrite the input query](https://developers.cloudflare.com/ai-search/configuration/retrieval/query-rewriting/) using one of Workers AI's LLMs to improve retrieval quality by transforming the original query into a more effective search query.
3. **Embedding the query:** The rewritten (or original) query is transformed into a vector using the same embedding model used to embed your data.
4. **Vector search:** The query vector is matched against stored vectors to find semantically similar content.
5. **Keyword search (optional):** When hybrid search is enabled, a BM25 keyword search runs in parallel with vector search.
6. **Fusion (optional):** When using hybrid search, vector and keyword results are combined using the configured fusion method.
7. **Reranking (optional):** A cross-encoder model re-scores results by evaluating the query and document together. Refer to [Reranking](https://developers.cloudflare.com/ai-search/configuration/retrieval/reranking/) for details.
8. **Content retrieval:** The most relevant chunks and their source content are returned. If you are using the Search endpoint, the content is returned at this point.
9. **Response generation:** If you are using the Chat Completions endpoint, a text-generation model generates a response using the retrieved content. Refer to [System prompt](https://developers.cloudflare.com/ai-search/configuration/retrieval/system-prompt/) for details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/#page","headline":"How AI Search works · Cloudflare AI Search docs","description":"Understand how AI Search indexes your content and retrieves results using vector and keyword search.","url":"https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/concepts/how-ai-search-works/","name":"How AI Search works"}}]}
```
