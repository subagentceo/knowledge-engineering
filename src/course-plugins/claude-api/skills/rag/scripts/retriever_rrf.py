# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# Hybrid retrieval: a Retriever wrapping a vector index and a BM25 index, merged with
# Reciprocal Rank Fusion.
# Source: "BM25 Lexical Search", "A Multi-Index Rag Pipeline"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# Both indexes expose the same add_document / search API so they combine cleanly.
# RRF_score = sum over methods of 1/(rank + 1) per document; rank by combined score.
#
# Example: vector [doc2, doc7, doc6] + BM25 [doc6, doc2, doc7] -> final [doc2, doc6, doc7]
# (doc2 ranked high in both).


def reciprocal_rank_fusion(*ranked_lists):
    scores = {}
    for ranked in ranked_lists:
        for rank, doc_id in enumerate(ranked):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (rank + 1)
    return sorted(scores, key=scores.get, reverse=True)


class Retriever:
    def __init__(self, vector_index, bm25_index):
        self.vector_index = vector_index
        self.bm25_index = bm25_index

    def add_document(self, document_id, embedding, content):
        self.vector_index.add_document(document_id, embedding, content)
        self.bm25_index.add_document(document_id, content)

    def search(self, query_embedding, query_text, top_k):
        # Forward the query to both indexes.
        vector_hits = [m["id"] for _, m in self.vector_index.search(query_embedding, top_k)]
        bm25_hits = self.bm25_index.search(query_text, top_k)
        # Merge with Reciprocal Rank Fusion.
        return reciprocal_rank_fusion(vector_hits, bm25_hits)[:top_k]
