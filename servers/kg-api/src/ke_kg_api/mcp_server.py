"""
FastMCP Code Mode server for the knowledge graph.

Architecture:
  Three-stage discovery (Search → GetSchemas → Execute) keeps tool-list
  tokens ≈ 0 upfront. The LLM discovers what it needs, then writes a
  Python script that chains tool calls in a sandbox — the final answer
  is the only thing that flows back through the context window.

  This mirrors the Cloudflare Code Mode pattern from:
  @cite vendor/cloudflare/cloudflare.com/en-us/blog/code-mode.md  (if mirrored)

  FastMCP Code Mode docs: https://gofastmcp.com/llms.txt

Token-cost strategy:
  1. Tools are NOT loaded into the LLM context upfront (Code Mode hides them).
  2. The LLM searches for relevant tools (brief descriptions only).
  3. GetSchemas returns compact markdown for the ones it selects.
  4. Execute runs the chain in a sandbox — only the final result is returned.

  Expected savings vs. standard MCP with 20 tools: ~15k input tokens/request.

@cite vendor/anthropics/platform.claude.com/docs/en/build-with-claude/prompt-caching.md
"""

from __future__ import annotations

import asyncio
import os
from contextlib import asynccontextmanager
from typing import Any

from fastmcp import FastMCP
from fastmcp.experimental.transforms.code_mode import CodeMode, GetSchemas, Search

from .db.base import AsyncSessionLocal
from .db import repo
from .models import (
    EntityType,
    KGEdgeCreate,
    KGNodeCreate,
    KGSchemaVersion,
    RelationType,
    VendorPageUpsert,
)

# ── Server init ───────────────────────────────────────────────────────────────

mcp = FastMCP(
    "ke-knowledge-graph",
    instructions=(
        "Knowledge-graph for the knowledge-engineering chassis. "
        "Contains vendor docs, agents, connectors, outcomes, and their relations. "
        "Use search to find nodes, then traverse edges for context."
    ),
    transforms=[
        CodeMode(
            discovery_tools=[
                Search(default_detail="brief", default_limit=8),
                GetSchemas(default_detail="detailed"),
            ],
        )
    ],
)


# ── Helper ────────────────────────────────────────────────────────────────────

@asynccontextmanager
async def _session():
    async with AsyncSessionLocal() as s:
        yield s
        await s.commit()


# ── Tools (hidden behind Code Mode; LLM discovers on demand) ─────────────────

@mcp.tool
async def kg_search_nodes(
    query: str,
    namespace: str | None = None,
    limit: int = 10,
) -> list[dict[str, Any]]:
    """
    Full-text search over knowledge-graph nodes. Returns entity_id, title,
    type, namespace, and first 300 chars of content. Use namespace to scope
    to a vendor (e.g. 'cloudflare', 'anthropics', 'neon').
    """
    async with _session() as s:
        nodes = await repo.search_nodes(s, query, namespace=namespace, limit=limit)
    return [
        {
            "entity_id": n.entity_id,
            "title": n.title,
            "type": n.type,
            "namespace": n.namespace,
            "content_preview": (n.content or "")[:300],
            "tags": n.tags,
        }
        for n in nodes
    ]


@mcp.tool
async def kg_get_node(entity_id: str) -> dict[str, Any] | None:
    """
    Fetch a single knowledge-graph node by its entity_id with full content
    and all observations. Returns null if not found.
    """
    async with _session() as s:
        node = await repo.get_node(s, entity_id)
    if node is None:
        return None
    return {
        "entity_id": node.entity_id,
        "type": node.type,
        "title": node.title,
        "content": node.content,
        "namespace": node.namespace,
        "observations": node.observations,
        "tags": node.tags,
        "metadata": node.metadata_,
        "schema_version": node.schema_version,
    }


@mcp.tool
async def kg_read_graph(
    entity_ids: list[str] | None = None,
    namespace: str | None = None,
) -> dict[str, Any]:
    """
    Return a subgraph: all nodes (optionally filtered by entity_ids or namespace)
    with their connecting edges. Compatible with the TypeScript kg_read_graph shape.
    """
    async with _session() as s:
        nodes, edges = await repo.read_graph(s, entity_ids=entity_ids, namespace=namespace)
    return {
        "entities": [
            {
                "name": n.entity_id,
                "type": n.type,
                "observations": n.observations,
                "tags": n.tags,
                "namespace": n.namespace,
            }
            for n in nodes
        ],
        "relations": [
            {"from": e.source_entity_id, "relation": e.rel_type, "to": e.target_entity_id, "weight": e.weight}
            for e in edges
        ],
    }


@mcp.tool
async def kg_create_entities(
    entities: list[dict[str, Any]],
) -> dict[str, int]:
    """
    Upsert one or more typed entities into the knowledge graph.
    Each entity: {entity_id, type, title, namespace, content?, observations?, tags?, metadata?}
    Returns {created: N}. Idempotent — duplicate entity_ids are updated.
    """
    count = 0
    async with _session() as s:
        for e in entities:
            await repo.upsert_node(s, KGNodeCreate(**e))
            count += 1
    return {"created": count}


@mcp.tool
async def kg_create_relations(
    relations: list[dict[str, Any]],
) -> dict[str, int]:
    """
    Upsert directed relations between named entities.
    Each relation: {source_entity_id, target_entity_id, rel_type, weight?}
    rel_type values: cites, extends, requires, implements, contradicts, depends-on, produces.
    Idempotent: duplicate (source, target, rel_type) triples are updated.
    """
    count = 0
    async with _session() as s:
        for r in relations:
            await repo.upsert_edge(s, KGEdgeCreate(**r))
            count += 1
    return {"created": count}


@mcp.tool
async def kg_add_observations(
    entity_id: str,
    observations: list[str],
) -> dict[str, Any]:
    """
    Append observations to an existing entity. Observations are deduplicated.
    Returns the entity_id and count of appended observations.
    """
    async with _session() as s:
        node = await repo.get_node(s, entity_id)
        if node is None:
            return {"error": f"entity not found: {entity_id}"}
        existing = set(node.observations)
        new_obs = [o for o in observations if o not in existing]
        node.observations = node.observations + new_obs
        await s.flush()
    return {"entity_id": entity_id, "appended": len(new_obs)}


@mcp.tool
async def vendor_search(
    query: str,
    vendor: str | None = None,
    limit: int = 5,
) -> list[dict[str, Any]]:
    """
    Full-text search over crawled vendor documentation pages.
    Returns vendor, path, and the first 500 chars of content ranked by relevance.
    Use vendor to scope to a specific namespace (e.g. 'cloudflare', 'anthropics').
    """
    async with _session() as s:
        rows = await repo.search_vendor_pages(s, query, vendor=vendor, limit=limit)
    return [
        {"vendor": r["vendor"], "path": r["path"], "content_preview": r["content"][:500]}
        for r in rows
    ]


# ── Entrypoint ────────────────────────────────────────────────────────────────

def main() -> None:
    import uvicorn
    port = int(os.environ.get("KG_MCP_PORT", "8001"))
    uvicorn.run(mcp.http_app(), host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
