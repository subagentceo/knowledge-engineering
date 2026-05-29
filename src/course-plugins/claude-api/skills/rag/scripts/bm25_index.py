# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# BM25 lexical search index.
# Source: "BM25 Lexical Search" — projects/courses/building-with-the-claude-api__1p.txt
#
# Tokenize the query (strip punctuation, split on spaces) -> count each term's frequency across
# all chunks -> weight terms by rarity (rare terms matter more) -> rank chunks by weighted-term
# content. Exposes the same add_document / search API as the vector index for hybrid search.

import math
import re
from collections import Counter


def tokenize(text):
    return re.sub(r"[^\w\s]", "", text.lower()).split()


class BM25Index:
    def __init__(self, k1=1.5, b=0.75):
        self.k1 = k1
        self.b = b
        self._docs = {}  # id -> token list
        self._df = Counter()  # term -> number of docs containing it

    def add_document(self, document_id, content):
        tokens = tokenize(content)
        self._docs[document_id] = tokens
        for term in set(tokens):
            self._df[term] += 1  # rarity weighting comes from inverse document frequency

    def _idf(self, term):
        n = len(self._docs)
        df = self._df.get(term, 0)
        return math.log(1 + (n - df + 0.5) / (df + 0.5))

    def search(self, query, top_k):
        q_terms = tokenize(query)
        avgdl = sum(len(t) for t in self._docs.values()) / max(len(self._docs), 1)
        scored = []
        for doc_id, tokens in self._docs.items():
            tf = Counter(tokens)
            dl = len(tokens)
            score = 0.0
            for term in q_terms:
                if term not in tf:
                    continue
                num = tf[term] * (self.k1 + 1)
                den = tf[term] + self.k1 * (1 - self.b + self.b * dl / avgdl)
                score += self._idf(term) * num / den
            scored.append((score, doc_id))
        scored.sort(reverse=True)
        return [doc_id for _, doc_id in scored[:top_k]]
