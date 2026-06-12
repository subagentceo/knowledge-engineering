# Hybrid Search

**Hybrid Search** (Max of vector (768d, ~3GB) and BM25 (~300MB) latency on 1M docs. Strongly consistent.)
- warm (1M docs): p50=14ms, p90=18ms, p99=29ms
- cold (1M docs): p50=874ms, p90=1214ms, p99=1686ms

**Vector Query** (768 dimensions, f16, 10M docs, ~15GB. Strongly consistent.)
- warm (10M docs): p50=14ms, p90=17ms, p99=27ms
- cold (10M docs): p50=874ms, p90=1214ms, p99=1686ms

**Full-Text Search** (BM25, 1M docs, ~300MB. Strongly consistent.)
- warm (1M docs): p50=13ms, p90=18ms, p99=29ms
- cold (1M docs): p50=316ms, p90=381ms, p99=559ms

```
             ┌─{search.py,search.ts}─────────────────────────────────────────────────┐
             │                    ┌─turbopuffer queries────┐                         │
             │                    │  ┌───────────────────┐ │                         │
             │                    ├─▶│  Vector Query 1   │─┤                         │
             │ ┌ ─ ─ ─ ─ ─ ─ ─ ─  │  └───────────────────┘ │  ┌──────┐               │
┌──────────┐ │  Query Rewriting │ │  ┌───────────────────┐ │  │ Rank │   ┌ ─ ─ ─ ─ ┐ │
│User Query│─┼▶│(Language Model) ─┼─▶│  Vector Query 2   │─┼─▶│ Fuse │──▶  Re-Rank   │
└──────────┘ │  ─ ─ ─ ─ ─ ─ ─ ─ ┘ │  └───────────────────┘ │  └──────┘   └ ─ ─ ─ ─ ┘ │
             │                    │  ┌───────────────────┐ │                         │
             │                    ├─▶│   Text Query 1    │─┤                         │
             │                    │  └───────────────────┘ │                         │
             │                    └────────────────────────┘                         │
             └───────────────────────────────────────────────────────────────────────┘
```

To improve search quality, multiple strategies can be used together. This is
commonly referred to as hybrid search.

turbopuffer supports vector search and BM25 full-text search. Combining them
produces semantically relevant search results (vectors), as well as results
matching specific words or strings (i.e. product SKUs, email addresses, weighing
exact keywords highly).

Keep search logic in `{search.py, search.ts}`. Use turbopuffer for initial
retrieval to narrow millions of results to dozens for rank fusion and
re-ranking.

To improve search results further, we suggest:

- Using a re-ranker (such as [Cohere](https://cohere.com/rerank),
  [ZeroEntropy](https://docs.zeroentropy.dev/models#rerankers),
  [MixedBread](https://www.mixedbread.com/docs/stores/search/rerank), or
  [Voyage](https://docs.voyageai.com/docs/reranker))
- Building a test suite of queries and ideal results, and evaluate NDCG
  ([blog post](https://softwaredoug.com/blog/2021/02/21/what-is-a-judgment-list))
- Building a query rewriting layer
  ([LlamaIndex resource](https://docs.llamaindex.ai/en/stable/examples/query_transformations/query_transform_cookbook/))
- Trying various chunking strategies
  ([LangChain resource](https://docs.langchain.com/oss/javascript/integrations/splitters)
  [chonkie resource](https://github.com/chonkie-inc/chonkie))
- Trying
  [contextual retrieval](https://www.anthropic.com/news/contextual-retrieval),
  or otherwise rewriting the chunks to be embedded
- Adding additional multi-modal data to query, e.g. embeddings of the images
  ([Cohere image model](https://docs.cohere.com/v2/docs/embeddings#image-embeddings),
  [Voyage image model](https://docs.voyageai.com/docs/multimodal-embeddings))

Choose an
embedding provider for the vector side of hybrid search.
Pick from the dropdown in the code sample below, or use random vectors to start
(don't use in production or for benchmarking).

```python
# $ pip install turbopuffer sentence-transformers
import os
import uuid
from typing import List

import turbopuffer
from sentence_transformers import SentenceTransformer
from turbopuffer.types import ID, Row

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"hybrid-example-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

# Local embeddings with BGE -- no API key needed.
# Model is downloaded on first run (~130 MB).
bge = SentenceTransformer("BAAI/bge-small-en-v1.5")

def embed(text: str) -> List[float]:
    return bge.encode(text).tolist()

# Upsert documents with both FTS and vector search capabilities
ns.write(
    upsert_rows=[
    {
        "id": 1,
        "vector": embed("Muesli: A mix of raw oats, nuts and dried fruit served with cold milk"),
        "content": "Muesli: A quick mix of raw oats, nuts and dried fruit served with cold milk",
    },
    {
        "id": 2,
        "vector": embed("Classic chia seed pudding is a cold breakfast that takes 5 minutes to prepare"),
        "content": "Classic chia seed pudding is a cold breakfast that takes 5 minutes to prepare",
    },
    {
        "id": 3,
        "vector": embed("Overnight oats: Mix oats with milk, refrigerate overnight for a delicious chilled breakfast"),
        "content": "Overnight oats: Mix oats with milk, refrigerate overnight for a delicious chilled breakfast",
    },
    {
        "id": 4,
        "vector": embed("Hot oatmeal is a quick and healthy breakfast"),
        "content": "Hot oatmeal is a quick and healthy breakfast",
    },
    {
        "id": 5,
        "vector": embed("Breakfast sandwich: A little extra prep, but worth it on Sunday mornings!"),
        "content": "Breakfast sandwich: A little extra prep, but worth it on Sunday mornings!",
    }
    ],
    distance_metric="cosine_distance",
    schema={"content": {"type": "string", "full_text_search": True}},
)

query = "quick breakfast like oatmeal but cold"
print("Ideal:", [1, 2, 3, 4, 5])

response = ns.multi_query(
    queries=[
        {
            "rank_by": ("vector", "ANN", embed(query)),
            "limit": 10,
            "include_attributes": ["content"],
        },
        {
            "rank_by": ("content", "BM25", query),
            "limit": 10,
            "include_attributes": ["content"],
        },
    ]
)

vector_result, fts_result = response.results[0].rows, response.results[1].rows
print("Vector:", [item.id for item in vector_result])
print("FTS:", [item.id for item in fts_result])

def reciprocal_rank_fusion(result_lists, k = 60):
    scores = {}
    all_results = {}
    for results in result_lists:
        for rank, item in enumerate(results, start=1):
            scores[item.id] = scores.get(item.id, 0) + 1.0 / (k + rank)
            all_results[item.id] = item
    return [
        setattr(all_results[doc_id], '$dist', score) or all_results[doc_id]
        for doc_id, score in sorted(scores.items(), key=lambda x: x[1], reverse=True)
    ]

fused_results = reciprocal_rank_fusion([vector_result, fts_result])
print("Fused:", [item.id for item in fused_results])

def cohere_rerank_or_unranked(results, query, k = None):
    if not os.getenv("COHERE_API_KEY"):
        print("Warning: COHERE_API_KEY not set (https://dashboard.cohere.com/api-keys), returning unranked results")
        return results
    try:
        co = __import__('cohere').Client(os.getenv("COHERE_API_KEY"))
        reranked = co.rerank(query=query, documents=[r.content for r in results], top_n=k or len(results)).results
        for r in reranked:
            results[r.index]['$dist'] = r.relevance_score
        return [results[r.index] for r in reranked]
    except (ImportError, AttributeError):
        print("Warning: cohere package not installed (`pip install cohere`), returning unranked results")
        return results

reranked_results = cohere_rerank_or_unranked(fused_results, query)
print("Reranked:", [item.id for item in reranked_results])
```


---

This page: [/docs/hybrid.md](https://turbopuffer.com/docs/hybrid.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
