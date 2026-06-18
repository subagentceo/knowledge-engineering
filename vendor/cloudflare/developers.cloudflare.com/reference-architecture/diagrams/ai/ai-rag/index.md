---
title: Retrieval Augmented Generation (RAG)
description: RAG combines retrieval with generative models for better text. It uses external knowledge to create factual, relevant responses, improving coherence and accuracy in NLP tasks like chatbots.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Retrieval Augmented Generation (RAG)

**Last reviewed:**  over 2 years ago 

Retrieval-Augmented Generation (RAG) is an innovative approach in natural language processing that integrates retrieval mechanisms with generative models to enhance text generation.

By incorporating external knowledge from pre-existing sources, RAG addresses the challenge of generating contextually relevant and informative text. This integration enables RAG to overcome the limitations of traditional generative models by ensuring that the generated text is grounded in factual information and context. RAG aims to solve the problem of information overload by efficiently retrieving and incorporating only the most relevant information into the generated text, leading to improved coherence and accuracy. Overall, RAG represents a significant advancement in NLP, offering a more robust and contextually aware approach to text generation.

Examples for application of these technique includes for instance customer service chat bots that use a knowledge base to answer support requests.

In the context of Retrieval-Augmented Generation (RAG), knowledge seeding involves incorporating external information from pre-existing sources into the generative process, while querying refers to the mechanism of retrieving relevant knowledge from these sources to inform the generation of coherent and contextually accurate text. Both are shown below.

Looking for a managed option?

[AI Search](https://developers.cloudflare.com/ai-search/) offers a fully managed way to build RAG pipelines on Cloudflare, handling ingestion, indexing, and querying out of the box. [Get started with AI Search](https://developers.cloudflare.com/ai-search/get-started/).

## Knowledge Seeding

![Figure 1: Knowledge seeding](https://developers.cloudflare.com/_astro/rag-architecture-seeding.BVBY5k5z_1MIa7Q.svg "Figure 1: Knowledge seeding")

Figure 1: Knowledge seeding

1. **Client upload**: Send POST request with documents to API endpoint.
2. **Input processing**: Process incoming request using [Workers](https://developers.cloudflare.com/workers/) and send messages to [Queues](https://developers.cloudflare.com/queues/) to add processing backlog.
3. **Batch processing**: Use [Queues](https://developers.cloudflare.com/queues/) to trigger a [consumer](https://developers.cloudflare.com/queues/reference/how-queues-works/#consumers) that process input documents in batches to prevent downstream overload.
4. **Embedding generation**: Generate embedding vectors by calling [Workers AI](https://developers.cloudflare.com/workers-ai/) [text embedding models](https://developers.cloudflare.com/workers-ai/models/) for the documents.
5. **Vector storage**: Insert the embedding vectors to [Vectorize](https://developers.cloudflare.com/vectorize/).
6. **Document storage**: Insert documents to [D1](https://developers.cloudflare.com/d1/) for persistent storage.
7. **Ack/Retry mechanism**: Signal success/error by using the [Queues Runtime API](https://developers.cloudflare.com/queues/configuration/javascript-apis/#message) in the consumer for each document. [Queues](https://developers.cloudflare.com/queues/) will schedule retries, if needed.

## Knowledge Queries

![Figure 2: Knowledge queries](https://developers.cloudflare.com/_astro/rag-architecture-query.CtBKQkxk_1MIa7Q.svg "Figure 2: Knowledge queries")

Figure 2: Knowledge queries

1. **Client query**: Send GET request with query to API endpoint.
2. **Embedding generation**: Generate embedding vectors by calling [Workers AI](https://developers.cloudflare.com/workers-ai/) [text embedding models](https://developers.cloudflare.com/workers-ai/models/) for the incoming query.
3. **Vector search**: Query [Vectorize](https://developers.cloudflare.com/vectorize/) using the vector representation of the query to retrieve related vectors.
4. **Document lookup**: Retrieve related documents from [D1](https://developers.cloudflare.com/d1/) based on search results from [Vectorize](https://developers.cloudflare.com/vectorize/).
5. **Text generation**: Pass both the original query and the retrieved documents as context to [Workers AI](https://developers.cloudflare.com/workers-ai/) [text generation models](https://developers.cloudflare.com/workers-ai/models/) to generate a response.

## Related resources

* [Tutorial: Build a RAG AI](https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/)
* [Get started with AI Search](https://developers.cloudflare.com/ai-search/get-started/)
* [Workers AI: Text embedding models](https://developers.cloudflare.com/workers-ai/models/)
* [Workers AI: Text generation models](https://developers.cloudflare.com/workers-ai/models/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/#page","headline":"Retrieval Augmented Generation (RAG) · Cloudflare Reference Architecture docs","description":"RAG combines retrieval with generative models for better text. It uses external knowledge to create factual, relevant responses, improving coherence and accuracy in NLP tasks like chatbots.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/ai/","name":"Artificial Intelligence (AI)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/ai/ai-rag/","name":"Retrieval Augmented Generation (RAG)"}}]}
```
