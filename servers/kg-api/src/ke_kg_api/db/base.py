"""
SQLAlchemy 2.0 async engine + session factory for AlloyDB Omni (PG18).

AlloyDB uses the standard PostgreSQL wire protocol, so asyncpg works
directly. No special driver needed beyond the DSN pointing at the
AlloyDB Omni container port (default 5432).

@cite docs/operator-runbooks/alloydb-omni-cloud-env.md (OKWP2)
@cite vendor/gcp/alloydb-omni/  (AlloyDB Omni docs)
"""

from __future__ import annotations

import os
from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase


def _dsn() -> str:
    url = os.environ.get("ALLOYDB_DATABASE_URL")
    if not url:
        raise RuntimeError("ALLOYDB_DATABASE_URL is not set")
    # asyncpg requires postgresql+asyncpg:// scheme
    return url.replace("postgresql://", "postgresql+asyncpg://", 1).replace(
        "postgres://", "postgresql+asyncpg://", 1
    )


# WHY pool_pre_ping: AlloyDB Omni restarts between cloud sessions;
# pre-ping detects stale connections without surfacing errors to callers.
engine = create_async_engine(
    _dsn(),
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    echo=os.environ.get("KG_SQL_ECHO", "").lower() in ("1", "true"),
)

AsyncSessionLocal = async_sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)


class Base(DeclarativeBase):
    pass


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency: yields a scoped async session."""
    async with AsyncSessionLocal() as session:
        yield session
