# BM25 lexical search and a multi-index pipeline with Reciprocal Rank Fusion

## BM25 lexical search (hybrid)

Semantic search can miss exact term matches. **BM25** (Best Match 25) is a lexical algorithm: tokenize the query (strip punctuation, split on spaces) → count each term's frequency across all chunks → weight terms by rarity (rare terms matter more, common words like "a" matter less) → rank chunks by their weighted-term content. Run BM25 in parallel with semantic search (**hybrid search**) — both expose the same `add_document` / `search` API, so they combine cleanly.

## Multi-index pipeline + Reciprocal Rank Fusion

A `Retriever` class wraps a vector index and a BM25 index, forwards the query to both, and merges with **Reciprocal Rank Fusion**: `RRF_score = Σ 1/(rank + 1)` across methods per document; rank by combined score. Example: vector `[doc2, doc7, doc6]` + BM25 `[doc6, doc2, doc7]` → final `[doc2, doc6, doc7]` (doc2 ranked high in both). Modular standardized API (`search()` / `add_document()`) makes adding more indexes easy.
