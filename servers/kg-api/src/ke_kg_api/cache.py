"""
Prompt-caching strategy — built on canonical Anthropic Messages API types.

No hand-rolled CacheableBlock. All shapes flow through
`anthropic_api.messages.TextBlockParam` + `CacheControlEphemeral` so the
payload we build is byte-for-byte equivalent to what the official SDK ships.

Cache ordering rule (canonical):
  - Mark up to 4 cache breakpoints per request.
  - Order blocks static → dynamic; ephemeral on all but the final user query.
  - 5-minute default TTL; opt-in 1-hour via `ttl="1h"`.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
"""

from __future__ import annotations

from typing import Any

from .anthropic_api.messages import (
    CacheControlEphemeral,
    CacheTTL,
    Message,
    MessageCreateParams,
    MessageParam,
    TextBlockParam,
    Usage,
)
from .models import KGNodeRead, RAGRequest, RAGResponse

_SYSTEM_PROMPT = (
    "You are a knowledge-graph assistant for the KE chassis. "
    "Answer concisely using only the provided context. "
    "If the answer isn't in the context, say so."
)

DEFAULT_MODEL = "claude-opus-4-7"


def _maybe_ephemeral(use_cache: bool, ttl: CacheTTL = "5m") -> CacheControlEphemeral | None:
    return CacheControlEphemeral(ttl=ttl) if use_cache else None


def build_message_params(
    request: RAGRequest,
    retrieved_nodes: list[KGNodeRead],
    graph_context: str = "",
    model: str = DEFAULT_MODEL,
    max_tokens: int = 1024,
    ttl: CacheTTL = "5m",
) -> MessageCreateParams:
    """Construct a canonical MessageCreateParams body with cache breakpoints.

    System prompt is the most stable layer → cache it on the system slot.
    Graph + retrieved blocks are inside the first user turn (cached).
    Final user turn holds only the dynamic query (never cached).
    """
    cc = _maybe_ephemeral(request.use_cache, ttl=ttl)

    # System slot — first cache breakpoint (most static).
    system_blocks: list[TextBlockParam] = [
        TextBlockParam(text=_SYSTEM_PROMPT, cache_control=cc),
    ]

    # User context turn — additional breakpoints for graph + retrieved docs.
    context_blocks: list[TextBlockParam] = []
    if graph_context:
        context_blocks.append(
            TextBlockParam(
                text=f"## Knowledge Graph Context\n\n{graph_context}",
                cache_control=cc,
            )
        )
    if retrieved_nodes:
        body = "\n\n".join(
            f"### {n.entity_id}\n{n.content or ''}" for n in retrieved_nodes
        )
        context_blocks.append(
            TextBlockParam(
                text=f"## Retrieved Context\n\n{body}",
                cache_control=cc,
            )
        )

    messages: list[MessageParam] = []
    if context_blocks:
        messages.append(MessageParam(role="user", content=context_blocks))
    messages.append(MessageParam(role="user", content=request.query))

    return MessageCreateParams(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        system=system_blocks,
    )


def usage_to_rag_response(
    request: RAGRequest,
    results: list[KGNodeRead],
    message: Message | None = None,
) -> RAGResponse:
    """Project a canonical Message.usage into our RAGResponse shape."""
    if message is None:
        return RAGResponse(query=request.query, results=results)

    u: Usage = message.usage
    cached = u.cache_read_input_tokens or 0
    uncached = u.input_tokens
    return RAGResponse(
        query=request.query,
        results=results,
        cached_tokens=cached,
        uncached_tokens=uncached,
        cache_hit=cached > 0,
    )


def estimate_cost_usd(
    usage: Usage,
    input_per_mtok: float = 15.0,
    output_per_mtok: float = 75.0,
    cache_write_per_mtok: float = 18.75,
    cache_read_per_mtok: float = 1.50,
) -> float:
    """Default rates ≈ Opus 4 list price. Override per model / tier."""
    uncached_in = max(usage.input_tokens - (usage.cache_read_input_tokens or 0), 0)
    cache_writes = usage.cache_creation_input_tokens or 0
    cache_reads = usage.cache_read_input_tokens or 0
    out = usage.output_tokens

    return (
        uncached_in * input_per_mtok / 1_000_000
        + cache_writes * cache_write_per_mtok / 1_000_000
        + cache_reads * cache_read_per_mtok / 1_000_000
        + out * output_per_mtok / 1_000_000
    )
