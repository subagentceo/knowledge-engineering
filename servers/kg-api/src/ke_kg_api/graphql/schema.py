"""
Strawberry GraphQL schema for the KE knowledge graph.

Mirrors the REST endpoints in api/main.py using strawberry type annotations.
Mount point: POST /graphql (strawberry.fastapi.GraphQLRouter)

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite seeds/posture/session-start.xml
"""

from __future__ import annotations

import uuid
from datetime import datetime

import strawberry
from strawberry.fastapi import GraphQLRouter

from ..db.base import AsyncSessionLocal
from ..db import repo as kg_repo
from ..models import KGSchemaVersion


@strawberry.type
class KGNode:
    entity_id: str
    type: str
    title: str
    content: str | None
    namespace: str
    tags: list[str]
    observations: list[str]
    schema_version: str
    id: uuid.UUID
    created_at: datetime


@strawberry.type
class KGEdge:
    source_entity_id: str
    target_entity_id: str
    rel_type: str
    weight: float
    schema_version: str
    id: uuid.UUID
    created_at: datetime


@strawberry.type
class KGGraph:
    entities: list[KGNode]
    relations: list[KGEdge]
    schema_version: str


def _node_from_orm(n: object) -> KGNode:
    return KGNode(
        entity_id=n.entity_id,  # type: ignore[attr-defined]
        type=n.type,  # type: ignore[attr-defined]
        title=n.title,  # type: ignore[attr-defined]
        content=n.content,  # type: ignore[attr-defined]
        namespace=n.namespace,  # type: ignore[attr-defined]
        tags=n.tags or [],  # type: ignore[attr-defined]
        observations=n.observations or [],  # type: ignore[attr-defined]
        schema_version=n.schema_version,  # type: ignore[attr-defined]
        id=n.id,  # type: ignore[attr-defined]
        created_at=n.created_at,  # type: ignore[attr-defined]
    )


def _edge_from_orm(e: object) -> KGEdge:
    return KGEdge(
        source_entity_id=e.source_entity_id,  # type: ignore[attr-defined]
        target_entity_id=e.target_entity_id,  # type: ignore[attr-defined]
        rel_type=e.rel_type,  # type: ignore[attr-defined]
        weight=e.weight,  # type: ignore[attr-defined]
        schema_version=e.schema_version,  # type: ignore[attr-defined]
        id=e.id,  # type: ignore[attr-defined]
        created_at=e.created_at,  # type: ignore[attr-defined]
    )


@strawberry.type
class Query:
    @strawberry.field
    async def node(self, entity_id: str) -> KGNode | None:
        async with AsyncSessionLocal() as s:
            n = await kg_repo.get_node(s, entity_id)
        return _node_from_orm(n) if n is not None else None

    @strawberry.field
    async def search_nodes(
        self,
        query: str,
        namespace: str | None = None,
        limit: int = 10,
    ) -> list[KGNode]:
        async with AsyncSessionLocal() as s:
            nodes = await kg_repo.search_nodes(s, query, namespace=namespace, limit=limit)
        return [_node_from_orm(n) for n in nodes]

    @strawberry.field
    async def graph(
        self,
        namespace: str | None = None,
        entity_ids: list[str] | None = None,
    ) -> KGGraph:
        async with AsyncSessionLocal() as s:
            nodes, edges = await kg_repo.read_graph(s, entity_ids=entity_ids, namespace=namespace)
        return KGGraph(
            entities=[_node_from_orm(n) for n in nodes],
            relations=[_edge_from_orm(e) for e in edges],
            schema_version=KGSchemaVersion.CURRENT.value,
        )


schema = strawberry.Schema(query=Query)
graphql_router = GraphQLRouter(schema, graphiql=True)
