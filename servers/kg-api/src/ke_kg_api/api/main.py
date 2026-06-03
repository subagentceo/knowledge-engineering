"""
FastAPI application — REST interface to the knowledge graph.

Versioning: Accept: application/vnd.ke-kg+json;version=1.0.0
All responses include X-Schema-Version header.

Auth: OAuth-only per repo posture. ANTHROPIC_API_KEY must NOT be set.
Sessions authenticate via CLAUDE_CODE_OAUTH_TOKEN in the environment.

@cite vendor/anthropics/platform.claude.com/docs/en/api/overview.md
@cite seeds/posture/session-start.xml  — OAuth-only invariant
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Annotated, Any

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.base import engine, get_session
from ..db.orm import Base
from ..db import repo
from ..models import (
    ApiVersion,
    KGEdgeCreate,
    KGEdgeRead,
    KGGraphRead,
    KGNodeCreate,
    KGNodeRead,
    KGSchemaVersion,
    VendorPageUpsert,
)


# ── Lifespan ──────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # WHY: create tables on startup in dev; in prod use Alembic migrations.
    if os.environ.get("KG_AUTO_MIGRATE", "").lower() in ("1", "true"):
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="KE Knowledge Graph API",
    version=ApiVersion.CURRENT.value,
    description=(
        "REST interface to the AlloyDB-backed knowledge graph. "
        "Auth: OAuth-only (CLAUDE_CODE_OAUTH_TOKEN)."
    ),
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

Session = Annotated[AsyncSession, Depends(get_session)]
_SCHEMA_VERSION_HEADER = {"X-Schema-Version": KGSchemaVersion.CURRENT.value}


# ── Nodes ─────────────────────────────────────────────────────────────────────

@app.post("/nodes", response_model=KGNodeRead, status_code=201)
async def create_node(body: KGNodeCreate, session: Session) -> Any:
    node = await repo.upsert_node(session, body)
    await session.commit()
    return JSONResponse(
        content=KGNodeRead.model_validate(node, from_attributes=True).model_dump(mode="json"),
        status_code=201,
        headers=_SCHEMA_VERSION_HEADER,
    )


@app.get("/nodes/{entity_id}", response_model=KGNodeRead)
async def get_node(entity_id: str, session: Session) -> Any:
    node = await repo.get_node(session, entity_id)
    if node is None:
        raise HTTPException(status_code=404, detail=f"node not found: {entity_id}")
    return JSONResponse(
        content=KGNodeRead.model_validate(node, from_attributes=True).model_dump(mode="json"),
        headers=_SCHEMA_VERSION_HEADER,
    )


@app.get("/nodes", response_model=list[KGNodeRead])
async def search_nodes(
    session: Session,
    q: str = Query(..., description="Full-text search query"),
    namespace: str | None = Query(None),
    limit: int = Query(10, ge=1, le=100),
) -> Any:
    nodes = await repo.search_nodes(session, q, namespace=namespace, limit=limit)
    return JSONResponse(
        content=[KGNodeRead.model_validate(n, from_attributes=True).model_dump(mode="json") for n in nodes],
        headers=_SCHEMA_VERSION_HEADER,
    )


# ── Graph ─────────────────────────────────────────────────────────────────────

@app.get("/graph", response_model=KGGraphRead)
async def read_graph(
    session: Session,
    namespace: str | None = Query(None),
    entity_ids: list[str] | None = Query(None),
) -> Any:
    nodes, edges = await repo.read_graph(session, entity_ids=entity_ids, namespace=namespace)
    graph = KGGraphRead(
        entities=[KGNodeRead.model_validate(n, from_attributes=True) for n in nodes],
        relations=[KGEdgeRead.model_validate(e, from_attributes=True) for e in edges],
    )
    return JSONResponse(
        content=graph.model_dump(mode="json"),
        headers=_SCHEMA_VERSION_HEADER,
    )


# ── Edges ─────────────────────────────────────────────────────────────────────

@app.post("/edges", response_model=KGEdgeRead, status_code=201)
async def create_edge(body: KGEdgeCreate, session: Session) -> Any:
    edge = await repo.upsert_edge(session, body)
    await session.commit()
    return JSONResponse(
        content=KGEdgeRead.model_validate(edge, from_attributes=True).model_dump(mode="json"),
        status_code=201,
        headers=_SCHEMA_VERSION_HEADER,
    )


# ── Vendor pages ──────────────────────────────────────────────────────────────

@app.post("/vendor-pages", status_code=204)
async def upsert_vendor_page(body: VendorPageUpsert, session: Session) -> None:
    await repo.upsert_vendor_page(session, body)
    await session.commit()


@app.get("/vendor-pages/search")
async def search_vendor_pages(
    session: Session,
    q: str = Query(...),
    vendor: str | None = Query(None),
    limit: int = Query(5, ge=1, le=50),
) -> Any:
    rows = await repo.search_vendor_pages(session, q, vendor=vendor, limit=limit)
    return JSONResponse(content=rows, headers=_SCHEMA_VERSION_HEADER)


# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "schema_version": KGSchemaVersion.CURRENT.value}


# ── Dev entrypoint ────────────────────────────────────────────────────────────

def main() -> None:
    import uvicorn
    uvicorn.run(
        "ke_kg_api.api.main:app",
        host="0.0.0.0",
        port=int(os.environ.get("KG_API_PORT", "8000")),
        reload=os.environ.get("KG_DEV", "").lower() in ("1", "true"),
    )
