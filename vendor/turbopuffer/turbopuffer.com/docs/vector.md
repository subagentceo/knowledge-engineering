# Vector Search Guide

**Vector Query** (768 dimensions, f16, 10M docs, ~15GB. Strongly consistent.)
- warm (10M docs): p50=14ms, p90=17ms, p99=27ms
- cold (10M docs): p50=874ms, p90=1214ms, p99=1686ms

turbopuffer supports vector search with [filtering](/docs/query#filtering).
Vectors are incrementally indexed in an SPFresh vector index for performant
search. Writes appear in search results immediately.

The vector index is automatically tuned for 90-100% recall ("accuracy"). We
automatically [monitor recall](/blog/continuous-recall) for production queries.
You can use the [recall endpoint](/docs/recall) to test yourself.

Choose an
embedding provider. Pick from the dropdown in the code
sample below, or use random vectors to start (don't use in production or for
benchmarking).

```python
# $ pip install turbopuffer sentence-transformers
import os
import uuid
from typing import List

import turbopuffer
from sentence_transformers import SentenceTransformer

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"vector-search-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

# Local embeddings with BGE -- no API key needed.
# Model is downloaded on first run (~130 MB).
bge = SentenceTransformer("BAAI/bge-small-en-v1.5")

def embed(text: str) -> List[float]:
    return bge.encode(text).tolist()

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            "id": 1,
            "vector": embed("A cat sleeping on a windowsill"),
            "text": "A cat sleeping on a windowsill",
            "category": "animal",
        },
        {
            "id": 2,
            "vector": embed("A playful kitten chasing a toy"),
            "text": "A playful kitten chasing a toy",
            "category": "animal",
        },
        {
            "id": 3,
            "vector": embed("An airplane flying through clouds"),
            "text": "An airplane flying through clouds",
            "category": "vehicle",
        },
        {
            "id": 4,
            "vector": embed("A shiny red sports car"),
            "description": "A shiny red sports car",
            "color": "red",
            "type": "car",
            "price": 50000,
        },
        {
            "id": 5,
            "vector": embed("A sleek blue sedan"),
            "description": "A sleek blue sedan",
            "color": "blue",
            "type": "car",
            "price": 35000,
        },
        {
            "id": 6,
            "vector": embed("A large red delivery truck"),
            "description": "A large red delivery truck",
            "color": "red",
            "type": "truck",
            "price": 80000,
        },
        {
            "id": 7,
            "vector": embed("A blue pickup truck"),
            "description": "A blue pickup truck",
            "color": "blue",
            "type": "truck",
            "price": 45000,
        },
    ],
    distance_metric="cosine_distance",
)

# Basic vector search
result = ns.query(
    rank_by=("vector", "ANN", embed("feline")),
    limit=2,
    include_attributes=["text"],
)
print(result.rows)

# Vector search with filters
result = ns.query(
    rank_by=("vector", "ANN", embed("car")),
    limit=10,
    filters=("And", (("price", "Lt", 60000), ("color", "Eq", "blue"))),
    include_attributes=["description", "price"],
)
print(result.rows)
```


---

This page: [/docs/vector.md](https://turbopuffer.com/docs/vector.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
