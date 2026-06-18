---
title: Chunking
description: Configure how AI Search splits content into chunks for embedding and retrieval.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Chunking

Chunking is the process of splitting large data into smaller segments before embedding them for search. AI Search uses **recursive chunking**, which breaks your content at natural boundaries (like paragraphs or sentences), and then further splits it if the chunks are too large.

## What is recursive chunking

Recursive chunking tries to keep chunks meaningful by:

* **Splitting at natural boundaries:** like paragraphs, then sentences.
* **Checking the size:** if a chunk is too long (based on token count), it’s split again into smaller parts.

This way, chunks are easy to embed and retrieve, without cutting off thoughts mid-sentence.

## Chunking controls

AI Search exposes two parameters to help you control chunking behavior:

* **Chunk size**: The number of tokens per chunk. The option range may vary depending on the model.
* **Chunk overlap**: The percentage of overlapping tokens between adjacent chunks.  
   * Minimum: `0%`  
   * Maximum: `30%`

These settings apply during the indexing step, before your data is embedded and stored in your search index.

## Choosing chunk size and overlap

Chunking affects both how your content is retrieved and how much context is passed into the generation model. Try out this external [chunk visualizer tool ↗](https://huggingface.co/spaces/m-ric/chunk%5Fvisualizer) to help understand how different chunk settings could look.

### Additional considerations:

* **Index size:** Smaller chunk sizes produce more chunks and more total vectors. Refer to the [AI Search limits](https://developers.cloudflare.com/ai-search/platform/limits-pricing/) to ensure your configuration stays within instance limits.
* **Generation model context window:** Generation models have a limited context window that must fit all retrieved chunks (`max_num_results` × `chunk size`), the user query, and the model's output. Be careful with large chunks or high `max_num_results` values to avoid context overflows.
* **Cost and performance:** Larger chunks and higher `max_num_results` settings result in more tokens passed to the model, which can increase latency and cost. You can monitor this usage in [AI Gateway](https://developers.cloudflare.com/ai-gateway/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/#page","headline":"Chunking · Cloudflare AI Search docs","description":"Configure how AI Search splits content into chunks for embedding and retrieval.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/chunking/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/chunking/","name":"Chunking"}}]}
```
