# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# A minimal vector index using cosine distance.
# Source: "The Full RAG Flow", "Implementing the Rag Flow"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# cosine similarity = cosine of the angle between vectors, -1..1, closer to 1 = more similar.
# cosine distance   = 1 - similarity, closer to 0 = more similar.
# Embedding APIs normalize vectors to magnitude 1.0 automatically.

import math


def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    # Vectors are already normalized to magnitude 1.0, so dot product == cosine similarity.
    return dot


def cosine_distance(a, b):
    return 1 - cosine_similarity(a, b)


class VectorIndex:
    def __init__(self):
        self._vectors = []  # list of (embedding, metadata)

    def add_vector(self, embedding, metadata):
        # Store the original text in metadata so retrieval is meaningful.
        self._vectors.append((embedding, metadata))

    # Standardized API: add_document / search (so vector + BM25 indexes combine cleanly).
    def add_document(self, document_id, embedding, content):
        self.add_vector(embedding, {"id": document_id, "content": content})

    def search(self, query_embedding, top_k):
        scored = [
            (cosine_distance(query_embedding, emb), meta) for emb, meta in self._vectors
        ]
        scored.sort(key=lambda pair: pair[0])  # closer to 0 = more similar
        return scored[:top_k]
