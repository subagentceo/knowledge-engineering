---
name: rag-on-platforms
description: Building RAG on Bedrock vs Vertex — which embedding model each platform provides (Titan Embed Text V2 vs Google text-embedding-005), hybrid semantic+BM25 search, and the extra Bedrock-course-only techniques (reranking, contextual retrieval). Trigger when building a retrieval pipeline on a cloud platform, choosing an embedding model, implementing chunking/hybrid search/RRF, or adding reranking or contextual retrieval.
---

# RAG across platforms: embeddings, hybrid search, reranking, contextual retrieval

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

## Overview

The RAG **pipeline shape is identical** to `claude-api` (chunk → embed → index → query-embed →
cosine search → stuff prompt → generate), and so are chunking, BM25 lexical search, and Reciprocal
Rank Fusion. The **only true platform delta is the embedding model**: Bedrock uses Amazon Titan
Embed Text V2 (AWS SDK); Vertex uses Google `text-embedding-005` (Google GenAI SDK). Reranking and
contextual retrieval are model-side Claude calls (platform-neutral) but the Bedrock course treats
them as first-class pipeline stages.

## Quick reference

| | Bedrock | Vertex |
|---|---|---|
| Embedding model | **Amazon Titan Embed Text V2** | **Google `text-embedding-005`** |
| SDK to call it | AWS SDK | Google GenAI SDK |
| Output | ~1024-element float vector, −1..+1 | float vector, −1..+1 |
| BM25 + hybrid + RRF | yes (provider-neutral) | yes (provider-neutral) |
| Reranking / contextual retrieval | first-class (worked notes) | mentioned conceptually |

## Scripts

- [`scripts/bedrock_embed.py`](scripts/bedrock_embed.py) — Titan Embed Text V2 via the AWS SDK.
- [`scripts/vertex_embed.py`](scripts/vertex_embed.py) — `text-embedding-005` via the Google GenAI SDK.

## References

- [Pipeline and hybrid search](references/pipeline-and-hybrid-search.md) — the shared chunk→embed→search flow, the embedding-model delta, BM25, and the hybrid retriever.
- [Reranking and contextual retrieval](references/bedrock-only-techniques.md) — the two Bedrock-course-only pipeline stages and why they're platform-neutral.

## Source
Course notes: "Introducing RAG", "Text Chunking Strategies", "Text Embeddings", "The Full RAG
Flow", "Implementing the Rag Flow", "BM25 Lexical Search", "A Multi-Search RAG Pipeline",
"Reranking Results", "Contextual Retrieval" (Bedrock); the parallel RAG notes plus "Text
Embeddings" (Google `text-embedding-005`) (Vertex) — projects/courses/{bedrock,vertex} files.
