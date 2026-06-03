"""kg_nodes + kg_edges tables.

Revision ID: 0002
Revises:
Create Date: 2026-06-03

Mirrors the ORM definitions in ke_kg_api.db.orm so AlloyDB Omni stays
in sync with the Python model layer. Run after 0001_vendor_pages.sql.

@cite migrations/0001_vendor_pages.sql  — vendor_pages schema
@cite src/ke_kg_api/db/orm.py           — source of truth for column shapes
@cite vendor/gcp/alloydb-omni/          — AlloyDB PG18 columnar engine
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID

revision = "0002"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "kg_nodes",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("entity_id", sa.Text(), nullable=False, unique=True),
        sa.Column("type", sa.Text(), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("namespace", sa.Text(), nullable=False),
        sa.Column("schema_version", sa.Text(), nullable=False, server_default="1.2.0"),
        sa.Column("observations", ARRAY(sa.Text()), nullable=False, server_default="{}"),
        sa.Column("tags", ARRAY(sa.Text()), nullable=False, server_default="{}"),
        sa.Column("metadata", JSONB(), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_kg_nodes_namespace", "kg_nodes", ["namespace"])
    op.create_index("ix_kg_nodes_type", "kg_nodes", ["type"])
    op.create_index(
        "ix_kg_nodes_metadata_gin", "kg_nodes", ["metadata"],
        postgresql_using="gin",
    )
    op.create_index(
        "ix_kg_nodes_tags_gin", "kg_nodes", ["tags"],
        postgresql_using="gin",
    )
    # Full-text GIN index on title + content for ts_rank BM25 search
    op.execute("""
        CREATE INDEX ix_kg_nodes_fts ON kg_nodes
        USING gin(to_tsvector('english',
            coalesce(title, '') || ' ' || coalesce(content, '')))
    """)

    op.create_table(
        "kg_edges",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "source_entity_id", sa.Text(),
            sa.ForeignKey("kg_nodes.entity_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "target_entity_id", sa.Text(),
            sa.ForeignKey("kg_nodes.entity_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("rel_type", sa.Text(), nullable=False),
        sa.Column("weight", sa.Float(), nullable=False, server_default="1.0"),
        sa.Column("schema_version", sa.Text(), nullable=False, server_default="1.2.0"),
        sa.Column("metadata", JSONB(), nullable=False, server_default="{}"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("source_entity_id", "target_entity_id", "rel_type", name="uq_kg_edge_triple"),
    )
    op.create_index("ix_kg_edges_source", "kg_edges", ["source_entity_id"])
    op.create_index("ix_kg_edges_target", "kg_edges", ["target_entity_id"])
    op.create_index("ix_kg_edges_rel_type", "kg_edges", ["rel_type"])


def downgrade() -> None:
    op.drop_table("kg_edges")
    op.drop_table("kg_nodes")
