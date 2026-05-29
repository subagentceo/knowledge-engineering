# RAG pipeline and hybrid search: what's shared across platforms

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

The RAG **pipeline shape is identical** to `claude-api`: chunk → embed → store in a vector index →
embed the query → similarity search (cosine distance) → stuff top chunks into the prompt → generate.
Chunking strategies (size-based + overlap, structure-based, semantic; character-based as the
reliable default), the hybrid semantic + **BM25** lexical search, and **Reciprocal Rank Fusion**
(`score = Σ 1/(1+rank)`) are the same on both — don't re-teach them.

## The only true platform delta: the embedding model

| | Bedrock | Vertex |
|---|---|---|
| Embedding model | **Amazon Titan Embed Text V2** | **Google `text-embedding-005`** |
| SDK to call it | AWS SDK | Google GenAI SDK |
| Output | ~1024-element float vector, values −1..+1 | float vector, values −1..+1 |

See [`scripts/bedrock_embed.py`](../scripts/bedrock_embed.py) /
[`scripts/vertex_embed.py`](../scripts/vertex_embed.py).

Everything downstream of the vector (index storage, cosine distance, RRF merge) is provider-neutral
Python in both courses — store the original text alongside each embedding because raw vectors are
meaningless to retrieve by themselves.

## Techniques present in BOTH courses

- **Vector (semantic) search** via the platform's embedding model.
- **BM25 lexical search** — tokenize the query, weight rare terms higher, surface chunks with
  high-weighted terms; catches exact-identifier matches (e.g. "incident 2023") that pure semantic
  search misses.
- **Hybrid retriever** — run both indexes (shared `add_document` / `search` API) and merge with RRF.
