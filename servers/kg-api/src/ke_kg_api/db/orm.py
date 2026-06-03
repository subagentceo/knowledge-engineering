"""
SQLAlchemy ORM models for the knowledge graph + vendor pages.

Mirrors the TypeScript KG edge shape (src/db/knowledge-graph.ts) so
the two layers share a compatible entity/relation/observation model,
with AlloyDB-specific extensions (uuid PK, JSONB, GIN indexes, arrays).

@cite src/db/knowledge-graph.ts   — TypeScript edge variant
@cite migrations/0001_vendor_pages.sql — vendor_pages schema
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    ARRAY,
    Float,
    ForeignKey,
    Index,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


def _now() -> datetime:
    return datetime.now(tz=timezone.utc)


# ── Knowledge graph nodes ─────────────────────────────────────────────────────

class KGNode(Base):
    """
    Obsidian-style memory node. Every entity in the graph is a node.
    Observations accumulate on the node (mirrors TS KGEntity.observations).
    """
    __tablename__ = "kg_nodes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    entity_id: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    type: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    content: Mapped[str | None] = mapped_column(Text)
    namespace: Mapped[str] = mapped_column(Text, nullable=False)
    schema_version: Mapped[str] = mapped_column(Text, nullable=False, default="1.2.0")
    # ARRAY(Text) stores observations inline; avoids a separate join for the common case.
    observations: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False, default=list)
    tags: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False, default=list)
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=_now)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=_now)

    outgoing_edges: Mapped[list[KGEdge]] = relationship(
        "KGEdge",
        foreign_keys="KGEdge.source_entity_id",
        back_populates="source",
        cascade="all, delete-orphan",
    )
    incoming_edges: Mapped[list[KGEdge]] = relationship(
        "KGEdge",
        foreign_keys="KGEdge.target_entity_id",
        back_populates="target",
    )

    __table_args__ = (
        Index("ix_kg_nodes_namespace", "namespace"),
        Index("ix_kg_nodes_type", "type"),
        # GIN for JSONB metadata queries
        Index("ix_kg_nodes_metadata_gin", "metadata_", postgresql_using="gin"),
        # GIN for tag array containment queries
        Index("ix_kg_nodes_tags_gin", "tags", postgresql_using="gin"),
        # Full-text search on title + content (PG18 tsvector)
        Index(
            "ix_kg_nodes_fts",
            func.to_tsvector("english", func.coalesce("title", "") + " " + func.coalesce("content", "")),
            postgresql_using="gin",
        ),
    )


# ── Knowledge graph edges ─────────────────────────────────────────────────────

class KGEdge(Base):
    """
    Directed, typed relation between two nodes.
    rel_type uses active-voice verbs (mirrors TS KGRelation.relation).
    weight ∈ [0, 1] for future ranking / graph traversal.
    """
    __tablename__ = "kg_edges"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    source_entity_id: Mapped[str] = mapped_column(
        Text, ForeignKey("kg_nodes.entity_id", ondelete="CASCADE"), nullable=False
    )
    target_entity_id: Mapped[str] = mapped_column(
        Text, ForeignKey("kg_nodes.entity_id", ondelete="CASCADE"), nullable=False
    )
    rel_type: Mapped[str] = mapped_column(Text, nullable=False)
    weight: Mapped[float] = mapped_column(Float, nullable=False, default=1.0)
    schema_version: Mapped[str] = mapped_column(Text, nullable=False, default="1.2.0")
    metadata_: Mapped[dict] = mapped_column("metadata", JSONB, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=_now)

    source: Mapped[KGNode] = relationship(
        "KGNode", foreign_keys=[source_entity_id], back_populates="outgoing_edges"
    )
    target: Mapped[KGNode] = relationship(
        "KGNode", foreign_keys=[target_entity_id], back_populates="incoming_edges"
    )

    __table_args__ = (
        UniqueConstraint("source_entity_id", "target_entity_id", "rel_type", name="uq_kg_edge_triple"),
        Index("ix_kg_edges_source", "source_entity_id"),
        Index("ix_kg_edges_target", "target_entity_id"),
        Index("ix_kg_edges_rel_type", "rel_type"),
    )


# ── Vendor pages (mirrors migrations/0001_vendor_pages.sql) ──────────────────

class VendorPage(Base):
    """
    Crawled vendor documentation pages.
    Primary key matches the existing SQL migration (vendor, path).
    """
    __tablename__ = "vendor_pages"

    vendor: Mapped[str] = mapped_column(Text, primary_key=True)
    path: Mapped[str] = mapped_column(Text, primary_key=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    content_hash: Mapped[str] = mapped_column(Text, nullable=False)
    etag: Mapped[str | None] = mapped_column(Text)
    last_modified: Mapped[str | None] = mapped_column(Text)
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=_now, onupdate=_now)

    __table_args__ = (
        Index("ix_vendor_pages_vendor", "vendor"),
        Index("ix_vendor_pages_updated_at", "updated_at"),
        # Full-text index for cheap RAG retrieval before vector search
        Index(
            "ix_vendor_pages_fts",
            func.to_tsvector("english", "content"),
            postgresql_using="gin",
        ),
    )
