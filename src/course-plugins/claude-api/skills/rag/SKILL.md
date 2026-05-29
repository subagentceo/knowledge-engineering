---
name: rag
description: Build a retrieval-augmented generation pipeline to query large documents with Claude. Trigger when chunking documents, generating text embeddings, doing semantic/vector search, adding BM25 lexical search, merging results with reciprocal rank fusion, reranking with an LLM, or adding contextual retrieval to improve chunk relevance.
---

# Retrieval-Augmented Generation (RAG)

> Distilled from the *Building with the Claude API* course.

## Overview

To answer questions over large documents, chunk the document and retrieve only the most relevant chunks into the prompt instead of dumping the whole text. The pipeline: chunk → embed (Voyage AI) → store in a vector index → at query time embed the query, run semantic + BM25 lexical search, merge with Reciprocal Rank Fusion, optionally rerank with an LLM, and assemble the top chunks into the prompt. Contextual retrieval situates each chunk before indexing to improve relevance.

## Quick start

The 7-step flow: (1) chunk → (2) embed → (3) normalize to magnitude 1.0 → (4) store → (5) embed the query → (6) similarity search → (7) assemble query + chunks into the prompt. Cosine distance = 1 − cosine similarity; closer to 0 = more similar.

Scripts: [scripts/rag_flow.py](scripts/rag_flow.py) (chunk/embed/store/search with Voyage AI), [scripts/vector_index.py](scripts/vector_index.py) (cosine-distance index), [scripts/bm25_index.py](scripts/bm25_index.py) (lexical search), [scripts/retriever_rrf.py](scripts/retriever_rrf.py) (hybrid `Retriever` + RRF), [scripts/reranking_and_context.py](scripts/reranking_and_context.py) (`rerank` + `add_context`).

## References

- [references/chunking.md](references/chunking.md) — why RAG, and size-/structure-/semantic-based chunking with overlap and the fallback ranking.
- [references/embeddings-and-flow.md](references/embeddings-and-flow.md) — embeddings, Voyage AI, the 7-step flow, and cosine similarity/distance.
- [references/hybrid-search-rrf.md](references/hybrid-search-rrf.md) — BM25 lexical search and the multi-index Retriever with Reciprocal Rank Fusion.
- [references/reranking-and-contextual.md](references/reranking-and-contextual.md) — LLM reranking by document ID and contextual retrieval (`add_context`).

## Source
Course notes: "Introducing Retrieval Augmented Generation", "Text Chunking Strategies", "Text Embeddings", "The Full RAG Flow", "Implementing the Rag Flow", "BM25 Lexical Search", "A Multi-Index Rag Pipeline", "Reranking Results", "Contextual Retrieval" — projects/courses/building-with-the-claude-api__1p.txt
