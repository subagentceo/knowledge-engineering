"""
Prompt-caching primitives — generic helpers built on canonical Messages API types.

KG-specific helpers (build_message_params, usage_to_rag_response) live in
servers/kg-api/src/ke_kg_api/cache.py; they import from here.

Cache ordering rule (canonical):
  - Mark up to 4 cache breakpoints per request.
  - Order blocks static → dynamic; ephemeral on all but the final user query.
  - 5-minute default TTL; opt-in 1-hour via ttl="1h".

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
@cite vendor/anthropics/platform.claude.com/docs/en/api/messages/create.md
"""

from __future__ import annotations

from .messages import CacheControlEphemeral, CacheTTL, Usage


def maybe_ephemeral(use_cache: bool, ttl: CacheTTL = "5m") -> CacheControlEphemeral | None:
    """Return a CacheControlEphemeral breakpoint or None when caching is disabled."""
    return CacheControlEphemeral(ttl=ttl) if use_cache else None


def estimate_cost_usd(
    usage: Usage,
    input_per_mtok: float = 15.0,
    output_per_mtok: float = 75.0,
    cache_write_per_mtok: float = 18.75,
    cache_read_per_mtok: float = 1.50,
) -> float:
    """Estimate USD cost from a Usage object.

    Default rates ≈ Claude Opus 4 list price. Override per model / service tier.
    """
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
