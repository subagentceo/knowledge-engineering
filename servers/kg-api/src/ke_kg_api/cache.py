"""
Anthropic prompt-caching strategy for KG RAG queries.

Architecture:
  The Anthropic caching API marks content blocks with cache_control so the
  compute spent tokenizing large static context (system prompt, vendor docs,
  graph snapshots) is reused across requests inside the 5-minute cache window.

  Recommended breakpoint layout for a RAG call:
    [CACHED]  system prompt          — static, always first
    [CACHED]  graph context          — changes at most once/minute
    [CACHED]  retrieved vendor docs  — top-K BM25 results, refreshed per query batch
    [UNCACHED] user query            — always dynamic; never cache last block

  This reduces per-request cost by ≈ 90 % for the cached portion after the
  first call in a session, at a 25 % write-time surcharge for cache misses.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite src/ke_kg_api/models.py — CacheableBlock shape
"""

from __future__ import annotations

from typing import Any

from .models import CacheableBlock, KGNodeRead, RAGRequest, RAGResponse

# System prompt is static across all KG queries in a session.
_SYSTEM_PROMPT = (
    "You are a knowledge-graph assistant for the KE chassis. "
    "Answer concisely using only the provided context. "
    "If the answer isn't in the context, say so."
)


def build_messages(
    request: RAGRequest,
    retrieved_nodes: list[KGNodeRead],
    graph_context: str = "",
) -> list[dict[str, Any]]:
    """
    Build the messages list for an Anthropic API call with cache breakpoints.

    Block ordering follows the static-to-dynamic rule: mark blocks as ephemeral
    from the most stable (system) to the least (user query). The last block
    must never have cache_control — caching the query itself would defeat RAG.

    Returns a list ready to pass as `messages` to anthropic.messages.create().
    """
    blocks: list[dict[str, Any]] = []

    # Block 1: system context (most static — always cached after first call)
    blocks.append(
        CacheableBlock(
            text=_SYSTEM_PROMPT,
            cache_control={"type": "ephemeral"} if request.use_cache else None,
        ).model_dump(exclude_none=True)
    )

    # Block 2: graph context snapshot (changes slowly; cache when present)
    if graph_context:
        blocks.append(
            CacheableBlock(
                text=f"## Knowledge Graph Context\n\n{graph_context}",
                cache_control={"type": "ephemeral"} if request.use_cache else None,
            ).model_dump(exclude_none=True)
        )

    # Block 3: retrieved vendor / KG nodes (per-query, but same for a batch)
    if retrieved_nodes:
        node_texts = "\n\n".join(
            f"### {n.entity_id}\n{n.content or ''}" for n in retrieved_nodes
        )
        blocks.append(
            CacheableBlock(
                text=f"## Retrieved Context\n\n{node_texts}",
                cache_control={"type": "ephemeral"} if request.use_cache else None,
            ).model_dump(exclude_none=True)
        )

    # User query — NEVER cache (dynamic; last block)
    user_message = {"role": "user", "content": request.query}

    return [
        {"role": "user", "content": blocks},
        # Inject the static context as the first user turn, then the real query.
        # WHY two-turn: Anthropic requires cache_control only on user turns.
        user_message,
    ]


def parse_cache_usage(usage: Any) -> tuple[int, int, bool]:
    """
    Extract (cached_tokens, uncached_tokens, cache_hit) from an Anthropic
    usage object. Works with both sync and async client response shapes.
    """
    cached = getattr(usage, "cache_read_input_tokens", 0) or 0
    uncached = getattr(usage, "input_tokens", 0) or 0
    return cached, uncached, cached > 0


def make_rag_response(
    request: RAGRequest,
    results: list[KGNodeRead],
    usage: Any | None = None,
) -> RAGResponse:
    cached, uncached, hit = parse_cache_usage(usage) if usage else (0, 0, False)
    return RAGResponse(
        query=request.query,
        results=results,
        cached_tokens=cached,
        uncached_tokens=uncached,
        cache_hit=hit,
    )
