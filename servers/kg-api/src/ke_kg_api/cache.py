"""
KG-specific prompt-caching helpers.

Generic primitives (estimate_cost_usd, maybe_ephemeral) live in ke_api_core.cache.
This module adds the KG-coupled build_message_params + usage_to_rag_response helpers.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
"""

from __future__ import annotations

from ke_api_core.cache import estimate_cost_usd, maybe_ephemeral  # noqa: F401 (re-export)
from ke_api_core.messages import (
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


def build_message_params(
    request: RAGRequest,
    retrieved_nodes: list[KGNodeRead],
    graph_context: str = "",
    model: str = DEFAULT_MODEL,
    max_tokens: int = 1024,
    ttl: CacheTTL = "5m",
) -> MessageCreateParams:
    """Construct a canonical MessageCreateParams body with cache breakpoints.

    System prompt → first cache breakpoint (most static).
    Graph + retrieved blocks → second/third breakpoints (inside user context turn).
    Final user turn holds only the dynamic query (never cached).
    """
    cc = maybe_ephemeral(request.use_cache, ttl=ttl)

    system_blocks: list[TextBlockParam] = [
        TextBlockParam(text=_SYSTEM_PROMPT, cache_control=cc),
    ]

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
    """Project a canonical Message.usage into a RAGResponse."""
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
