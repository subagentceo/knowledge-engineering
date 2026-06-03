"""
Repository — async SQLAlchemy queries for nodes, edges, vendor pages.

All methods accept an AsyncSession so callers control transaction scope.
BM25-style full-text search uses PG's built-in ts_rank + to_tsvector,
which works in AlloyDB PG18 without extensions.

@cite vendor/gcp/alloydb-omni/  — AlloyDB columnar engine for analytics
@cite src/db/knowledge-graph.ts  — TypeScript API shape to mirror
"""

from __future__ import annotations

from collections.abc import Sequence
from uuid import UUID

from sqlalchemy import delete, select, text, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..models import KGEdgeCreate, KGNodeCreate, VendorPageUpsert
from .orm import KGEdge, KGNode, VendorPage


# ── Node operations ───────────────────────────────────────────────────────────

async def upsert_node(session: AsyncSession, data: KGNodeCreate) -> KGNode:
    stmt = select(KGNode).where(KGNode.entity_id == data.entity_id)
    result = await session.execute(stmt)
    node = result.scalar_one_or_none()

    if node is None:
        node = KGNode(
            entity_id=data.entity_id,
            type=data.type.value,
            title=data.title,
            content=data.content,
            namespace=data.namespace,
            schema_version=data.schema_version.value,
            observations=data.observations,
            tags=data.tags,
            metadata_=data.metadata,
        )
        session.add(node)
    else:
        node.type = data.type.value
        node.title = data.title
        node.content = data.content
        node.namespace = data.namespace
        node.schema_version = data.schema_version.value
        node.observations = list(set(node.observations) | set(data.observations))
        node.tags = list(set(node.tags) | set(data.tags))
        node.metadata_ = {**node.metadata_, **data.metadata}

    await session.flush()
    return node


async def get_node(session: AsyncSession, entity_id: str) -> KGNode | None:
    result = await session.execute(
        select(KGNode).where(KGNode.entity_id == entity_id)
    )
    return result.scalar_one_or_none()


async def delete_nodes(session: AsyncSession, entity_ids: list[str]) -> int:
    result = await session.execute(
        delete(KGNode).where(KGNode.entity_id.in_(entity_ids))
    )
    return result.rowcount


async def search_nodes(
    session: AsyncSession,
    query: str,
    namespace: str | None = None,
    limit: int = 10,
) -> Sequence[KGNode]:
    """
    BM25-ish full-text search using PG ts_rank. Ranks by title+content
    relevance. Cheap: no embeddings, no external calls.

    For semantic similarity, pipe results through Voyage/Turbopuffer
    in the FastMCP execute block.
    """
    conditions = [
        text(
            "to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,''))"
            " @@ plainto_tsquery('english', :q)"
        ).bindparams(q=query)
    ]
    if namespace:
        conditions.append(KGNode.namespace == namespace)

    rank_col = text(
        "ts_rank(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')), "
        "plainto_tsquery('english', :q)) AS rank"
    ).bindparams(q=query)

    stmt = (
        select(KGNode)
        .where(*conditions)
        .order_by(text("rank DESC"))
        .limit(limit)
    )
    result = await session.execute(stmt)
    return result.scalars().all()


async def read_graph(
    session: AsyncSession,
    entity_ids: list[str] | None = None,
    namespace: str | None = None,
) -> tuple[Sequence[KGNode], Sequence[KGEdge]]:
    """Return nodes + their edges. Optionally scoped to entity_ids or namespace."""
    node_q = select(KGNode)
    if entity_ids:
        node_q = node_q.where(KGNode.entity_id.in_(entity_ids))
    if namespace:
        node_q = node_q.where(KGNode.namespace == namespace)
    nodes = (await session.execute(node_q)).scalars().all()

    node_ids = {n.entity_id for n in nodes}
    edge_q = select(KGEdge).where(
        KGEdge.source_entity_id.in_(node_ids) | KGEdge.target_entity_id.in_(node_ids)
    )
    edges = (await session.execute(edge_q)).scalars().all()
    return nodes, edges


# ── Edge operations ───────────────────────────────────────────────────────────

async def upsert_edge(session: AsyncSession, data: KGEdgeCreate) -> KGEdge:
    stmt = select(KGEdge).where(
        KGEdge.source_entity_id == data.source_entity_id,
        KGEdge.target_entity_id == data.target_entity_id,
        KGEdge.rel_type == data.rel_type.value,
    )
    result = await session.execute(stmt)
    edge = result.scalar_one_or_none()

    if edge is None:
        edge = KGEdge(
            source_entity_id=data.source_entity_id,
            target_entity_id=data.target_entity_id,
            rel_type=data.rel_type.value,
            weight=data.weight,
            schema_version=data.schema_version.value,
            metadata_=data.metadata,
        )
        session.add(edge)
    else:
        edge.weight = data.weight
        edge.metadata_ = {**edge.metadata_, **data.metadata}

    await session.flush()
    return edge


# ── Vendor pages ──────────────────────────────────────────────────────────────

VENDOR_UPSERT_SQL = text("""
    INSERT INTO vendor_pages (vendor, path, content, content_hash, etag, last_modified, updated_at)
    VALUES (:vendor, :path, :content, :content_hash, :etag, :last_modified, now())
    ON CONFLICT (vendor, path) DO UPDATE
      SET content       = EXCLUDED.content,
          content_hash  = EXCLUDED.content_hash,
          etag          = EXCLUDED.etag,
          last_modified = EXCLUDED.last_modified,
          updated_at    = now()
    WHERE vendor_pages.content_hash IS DISTINCT FROM EXCLUDED.content_hash
    RETURNING vendor
""")


async def upsert_vendor_page(session: AsyncSession, row: VendorPageUpsert) -> bool:
    result = await session.execute(VENDOR_UPSERT_SQL, row.model_dump())
    return (result.rowcount or 0) > 0


async def search_vendor_pages(
    session: AsyncSession, query: str, vendor: str | None = None, limit: int = 5
) -> list[dict]:
    """Full-text search over vendor_pages content. Returns dicts for caching."""
    sql = text("""
        SELECT vendor, path, content,
               ts_rank(to_tsvector('english', content), plainto_tsquery('english', :q)) AS rank
        FROM vendor_pages
        WHERE to_tsvector('english', content) @@ plainto_tsquery('english', :q)
          AND (:vendor IS NULL OR vendor = :vendor)
        ORDER BY rank DESC
        LIMIT :limit
    """)
    result = await session.execute(sql, {"q": query, "vendor": vendor, "limit": limit})
    return [dict(r._mapping) for r in result]
