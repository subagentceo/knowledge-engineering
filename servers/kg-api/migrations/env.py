"""
Alembic env.py — async SQLAlchemy variant for AlloyDB Omni (PG18).

WHY async: our engine is AsyncEngine; Alembic's standard sync runner
would deadlock against asyncio. We use run_sync inside begin() instead.

@cite vendor/gcp/alloydb-omni/  — AlloyDB Omni PG18 dialect is standard PG
@cite src/ke_kg_api/db/base.py  — engine construction + DSN helpers
"""

from __future__ import annotations

import asyncio

from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

from ke_kg_api.db.base import _dsn
from ke_kg_api.db.orm import Base

target_metadata = Base.metadata

config = context.config


def run_migrations_offline() -> None:
    url = _dsn()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    engine = create_async_engine(_dsn())
    async with engine.connect() as conn:
        await conn.run_sync(
            lambda sync_conn: context.configure(
                connection=sync_conn,
                target_metadata=target_metadata,
                compare_type=True,
            )
        )
        async with conn.begin():
            await conn.run_sync(lambda _: context.run_migrations())
    await engine.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
