"""Durable Dreams + Memory Store + Task + Outcome — Pydantic v2 models.

Extends the Dreams API schema with the pg_durable persistence layer:
redis LRU cache metadata, generic task FSM, outcome grading, and the
append-only event log.

@cite platform.claude.com/docs/en/managed-agents/dreams
@cite platform.claude.com/docs/en/managed-agents/memory
@cite platform.claude.com/docs/en/managed-agents/define-outcomes
"""

from __future__ import annotations

from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


# ── Memory Store (with LRU cache metadata) ──────────────────

class MemoryStoreAccess(str, Enum):
    read_write = "read_write"
    read_only = "read_only"


class MemoryStoreStatus(str, Enum):
    active = "active"
    archived = "archived"
    deleted = "deleted"


class DurableMemoryStore(BaseModel):
    """A memory store tracked in postgres with redis LRU cache metadata."""

    model_config = ConfigDict(frozen=True)
    store_id: str = Field(pattern=r"^memstore_")
    name: str | None = None
    description: str | None = None
    access: MemoryStoreAccess = MemoryStoreAccess.read_write
    memory_count: int = Field(default=0, ge=0)
    memory_limit: int = Field(default=2000, ge=1, le=2000)
    status: MemoryStoreStatus = MemoryStoreStatus.active
    # LRU cache metadata
    cached_at: datetime | None = None
    cache_ttl_secs: int = Field(default=3600, ge=60)
    cache_hits: int = Field(default=0, ge=0)
    cache_misses: int = Field(default=0, ge=0)
    # provenance
    source_dream_id: str | None = Field(default=None, pattern=r"^drm_")
    parent_store_id: str | None = Field(default=None, pattern=r"^memstore_")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    @property
    def hit_rate(self) -> float:
        total = self.cache_hits + self.cache_misses
        return round(self.cache_hits / total, 3) if total > 0 else 0.0

    @property
    def is_hot(self) -> bool:
        if self.cached_at is None:
            return False
        return self.cached_at + timedelta(seconds=self.cache_ttl_secs) > datetime.now()


# ── Task FSM ────────────────────────────────────────────────

class TaskState(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELED = "CANCELED"
    WAITING = "WAITING"


class DurableTask(BaseModel):
    """Generic durable task with pg_durable lease pattern."""

    model_config = ConfigDict(frozen=True)
    task_id: str
    kind: str  # 'domain_activation', 'dream_consolidation', 'outcome_eval'
    state: TaskState = TaskState.PENDING
    payload: dict[str, Any] = Field(default_factory=dict)
    attempts: int = Field(default=0, ge=0)
    max_attempts: int = Field(default=5, ge=1)
    locked_by: str | None = None
    locked_until: datetime | None = None
    memory_store_id: str | None = None
    dream_id: str | None = None
    outcome_id: str | None = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


# ── Outcome ─────────────────────────────────────────────────

class OutcomeResult(str, Enum):
    passed = "pass"
    failed = "fail"
    interrupted = "interrupted"
    pending = "pending"


class DurableOutcome(BaseModel):
    """Outcome evaluation result from a graded session."""

    model_config = ConfigDict(frozen=True)
    outcome_id: str
    session_id: str = Field(pattern=r"^sesn_")
    rubric_file_id: str | None = None
    rubric_text: str | None = None
    result: OutcomeResult = OutcomeResult.pending
    explanation: str | None = None
    iterations: int = Field(default=0, ge=0)
    task_id: str | None = None
    memory_store_id: str | None = None
    created_at: datetime = Field(default_factory=datetime.now)
    evaluated_at: datetime | None = None


# ── Event Log ───────────────────────────────────────────────

class EntityType(str, Enum):
    dream = "dream"
    memory_store = "memory_store"
    task = "task"
    outcome = "outcome"


class DurableEvent(BaseModel):
    """Append-only audit log entry."""

    model_config = ConfigDict(frozen=True)
    entity_type: EntityType
    entity_id: str
    event: str  # 'created', 'state_change', 'cache_hit', 'cache_evict'
    from_state: str | None = None
    to_state: str | None = None
    note: str | None = None
    at: datetime = Field(default_factory=datetime.now)


# ── Redis LRU contract ──────────────────────────────────────

class RedisLRUConfig(BaseModel):
    """Configuration for the redis LRU cache layer above postgres."""

    model_config = ConfigDict(frozen=True)
    key_pattern: str = "memstore:{store_id}"
    default_ttl_secs: int = 3600
    eviction_policy: Literal["allkeys-lru"] = "allkeys-lru"
    write_through: bool = True  # SET on API read, UPDATE postgres on write
    eviction_hook: str = "keyspace notification → postgres cache_event('evict')"
