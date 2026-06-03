"""
Pydantic models + semver-based versioning for the KG API.

Schema versioning strategy: enum values ARE the semver strings so they
serialize cleanly to/from JSON. A migration that changes a model's shape
bumps the minor or major version; breaking changes bump major.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite src/db/knowledge-graph.ts  (TypeScript edge variant — keep shape compatible)
"""

from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Annotated, Any

import semver
from pydantic import BaseModel, ConfigDict, Field


# ── Semver enum base ──────────────────────────────────────────────────────────

class _SemverEnum(str, Enum):
    """String enum whose values are semver strings. Adds parsed + compat helpers."""

    @property
    def parsed(self) -> semver.Version:
        return semver.Version.parse(self.value)

    def is_compatible_with(self, other: "_SemverEnum") -> bool:
        """Backward-compatible iff same major version."""
        return self.parsed.major == other.parsed.major

    def __ge__(self, other: "_SemverEnum") -> bool:
        return self.parsed >= other.parsed

    def __gt__(self, other: "_SemverEnum") -> bool:
        return self.parsed > other.parsed


# ── Knowledge-graph schema versions ──────────────────────────────────────────

class KGSchemaVersion(_SemverEnum):
    """
    Monotone — only add variants, never remove or rename.
    Consumers must handle all versions ≥ their minimum.
    """
    V1_0_0 = "1.0.0"  # initial: entity/relation/observation shape
    V1_1_0 = "1.1.0"  # adds: tags array + namespace field
    V1_2_0 = "1.2.0"  # adds: weight on edges + schema_version on rows

    CURRENT = "1.2.0"  # alias — always the latest


# ── Entity types (mirrors TypeScript KGEntityType) ────────────────────────────

class EntityType(str, Enum):
    COWORKER  = "coworker"
    CONNECTOR = "connector"
    OUTCOME   = "outcome"
    ARTIFACT  = "artifact"
    TASK      = "task"
    SESSION   = "session"
    # Python-backend extensions:
    DOCUMENT  = "document"   # vendor doc page
    CONCEPT   = "concept"    # abstracted idea
    VENDOR    = "vendor"     # vendor namespace root


class RelationType(str, Enum):
    """Active-voice relation verbs. Mirrors TS convention."""
    CITES       = "cites"
    EXTENDS     = "extends"
    REQUIRES    = "requires"
    IMPLEMENTS  = "implements"
    CONTRADICTS = "contradicts"
    DEPENDS_ON  = "depends-on"
    PRODUCES    = "produces"


# ── API versioning enum ───────────────────────────────────────────────────────

class ApiVersion(_SemverEnum):
    """HTTP API versions. Surfaced in the Accept header and response."""
    V1_0_0 = "1.0.0"
    CURRENT = "1.0.0"


# ── Core domain models ────────────────────────────────────────────────────────

class KGNodeCreate(BaseModel):
    """Input for creating / upserting a knowledge-graph node."""
    model_config = ConfigDict(str_strip_whitespace=True)

    entity_id: str = Field(
        ...,
        description="Stable human-readable ID, e.g. 'cloudflare/workers/fetch-api'",
        min_length=1,
        max_length=512,
    )
    type: EntityType
    title: str = Field(..., min_length=1, max_length=1024)
    content: str | None = None
    namespace: str = Field(..., description="Vendor namespace, e.g. 'cloudflare'")
    tags: list[str] = Field(default_factory=list)
    observations: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)
    schema_version: KGSchemaVersion = KGSchemaVersion.CURRENT


class KGNodeRead(KGNodeCreate):
    """Full node as returned by the API."""
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime | None = None


class KGEdgeCreate(BaseModel):
    source_entity_id: str
    target_entity_id: str
    rel_type: RelationType
    weight: Annotated[float, Field(ge=0.0, le=1.0)] = 1.0
    metadata: dict[str, Any] = Field(default_factory=dict)
    schema_version: KGSchemaVersion = KGSchemaVersion.CURRENT


class KGEdgeRead(KGEdgeCreate):
    id: uuid.UUID
    created_at: datetime


class KGGraphRead(BaseModel):
    """Subgraph returned by read/traverse operations. Compatible with TS shape."""
    entities: list[KGNodeRead]
    relations: list[KGEdgeRead]
    schema_version: KGSchemaVersion = KGSchemaVersion.CURRENT


# ── Vendor page (mirrors scripts/lib/alloydb-client.ts VendorPageRow) ─────────

class VendorPageUpsert(BaseModel):
    vendor: str
    path: str
    content: str
    content_hash: str
    etag: str | None = None
    last_modified: str | None = None


# ── RAG / caching models ──────────────────────────────────────────────────────

class CacheableBlock(BaseModel):
    """A context block that can be marked for Anthropic prompt caching."""
    type: str = "text"
    text: str
    cache_control: dict[str, str] | None = Field(
        default={"type": "ephemeral"},
        description="Set to None for uncached blocks (dynamic queries).",
    )


class RAGRequest(BaseModel):
    query: str
    namespace: str | None = None
    top_k: int = Field(default=5, ge=1, le=50)
    use_cache: bool = True


class RAGResponse(BaseModel):
    query: str
    results: list[KGNodeRead]
    cached_tokens: int = 0
    uncached_tokens: int = 0
    cache_hit: bool = False
