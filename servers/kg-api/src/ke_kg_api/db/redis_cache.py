"""
Redis caching layer for KG nodes.

Three components:
  KGNodeHash  — redis-om HashModel; L1 cache for KGNode lookups.
  RedisVectorIndex — redisvl SearchIndex for embedding-based semantic search.
  RedisCache  — get/set/invalidate facade.

list fields (labels, observations, tags) are JSON-serialised strings because
redis-om HashModel only supports scalar field types.

kg_redis_search() takes a pre-computed embedding vector — embedding generation
is the caller's responsibility (kept out of the cache layer).

@cite vendor/redis/redis-om-python/README.md
@cite vendor/redis/redisvl/README.md
@cite vendor/redis/mcp-redis/README.md
"""

from __future__ import annotations

import os
from typing import Any

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")


def _make_hash_model():
    """Lazily import and construct KGNodeHash to avoid hard import failure at module load."""
    try:
        from redis_om import HashModel, Field as OMField, get_redis_connection

        class KGNodeHash(HashModel):
            entity_id: str = OMField(index=True, primary_key=True)
            labels: str = ""       # JSON-serialized list[str]
            observations: str = "" # JSON-serialized list[str]
            tags: str = ""         # JSON-serialized list[str]

            class Meta:
                global_key_prefix = "ke_kg"
                database = get_redis_connection(url=REDIS_URL)

        return KGNodeHash
    except ImportError:
        return None


# Module-level reference; callers should use RedisCache which handles the import
KGNodeHash = _make_hash_model()


VECTOR_SCHEMA = {
    "index": {"name": "kg_node_vectors", "prefix": "ke_kg:node"},
    "fields": [
        {"name": "entity_id", "type": "tag"},
        {
            "name": "embedding",
            "type": "vector",
            "attrs": {
                "dims": 1536,
                "distance_metric": "cosine",
                "algorithm": "hnsw",
                "datatype": "float32",
            },
        },
    ],
}


class RedisVectorIndex:
    def __init__(self) -> None:
        from redisvl.index import SearchIndex
        self._index = SearchIndex.from_dict(VECTOR_SCHEMA)
        self._index.connect(REDIS_URL)

    def create(self, overwrite: bool = False) -> None:
        self._index.create(overwrite=overwrite)

    def load(self, records: list[dict[str, Any]]) -> None:
        self._index.load(records)

    def query(self, query_obj: Any) -> list[dict[str, Any]]:
        return self._index.query(query_obj)


class RedisCache:
    """Facade over KGNodeHash for get/set/invalidate operations."""

    def get(self, entity_id: str):
        if KGNodeHash is None:
            return None
        try:
            return KGNodeHash.get(entity_id)
        except Exception:
            return None

    def set(self, node) -> None:
        if KGNodeHash is None:
            return
        node.save()

    def invalidate(self, entity_id: str) -> None:
        if KGNodeHash is None:
            return
        try:
            KGNodeHash.delete(entity_id)
        except Exception:
            pass


async def kg_redis_search(
    query_vector: list[float],
    k: int = 10,
) -> list[dict[str, Any]]:
    """Vector similarity search over KG node embeddings.

    query_vector must be pre-computed by the caller (1536-dim float32 embedding).
    Returns a list of result dicts with at minimum {"entity_id": str}.
    """
    from redisvl.query import VectorQuery

    idx = RedisVectorIndex()
    vq = VectorQuery(
        vector=query_vector,
        vector_field_name="embedding",
        return_fields=["entity_id"],
        num_results=k,
    )
    return idx.query(vq)
