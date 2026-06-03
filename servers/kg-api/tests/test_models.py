"""
Unit tests for Pydantic models and semver enum helpers.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite src/ke_kg_api/models.py
"""

from __future__ import annotations

import uuid
from datetime import datetime

import pytest
import semver

from ke_kg_api.models import (
    ApiVersion,
    EntityType,
    KGEdgeCreate,
    KGGraphRead,
    KGNodeCreate,
    KGNodeRead,
    KGSchemaVersion,
    RelationType,
    VendorPageUpsert,
)


# ── _SemverEnum ───────────────────────────────────────────────────────────────

class TestSemverEnum:
    def test_parsed_returns_semver_version(self):
        v = KGSchemaVersion.V1_2_0
        assert isinstance(v.parsed, semver.Version)
        assert v.parsed.major == 1
        assert v.parsed.minor == 2

    def test_current_alias_matches_latest(self):
        assert KGSchemaVersion.CURRENT.value == KGSchemaVersion.V1_2_0.value

    def test_is_compatible_with_same_major(self):
        assert KGSchemaVersion.V1_2_0.is_compatible_with(KGSchemaVersion.V1_0_0)
        assert KGSchemaVersion.V1_0_0.is_compatible_with(KGSchemaVersion.V1_2_0)

    def test_ordering(self):
        assert KGSchemaVersion.V1_2_0 > KGSchemaVersion.V1_1_0
        assert KGSchemaVersion.V1_1_0 > KGSchemaVersion.V1_0_0
        assert KGSchemaVersion.V1_0_0 >= KGSchemaVersion.V1_0_0

    def test_api_version_current(self):
        assert ApiVersion.CURRENT.value == "1.0.0"


# ── KGNodeCreate ──────────────────────────────────────────────────────────────

class TestKGNodeCreate:
    def test_minimal_valid_node(self):
        n = KGNodeCreate(
            entity_id="cloudflare/workers/fetch-api",
            type=EntityType.DOCUMENT,
            title="Fetch API",
            namespace="cloudflare",
        )
        assert n.entity_id == "cloudflare/workers/fetch-api"
        assert n.tags == []
        assert n.observations == []
        assert n.schema_version == KGSchemaVersion.CURRENT

    def test_strips_whitespace(self):
        n = KGNodeCreate(
            entity_id="  my/node  ",
            type=EntityType.CONCEPT,
            title="  Test  ",
            namespace="test",
        )
        assert n.entity_id == "my/node"
        assert n.title == "Test"

    def test_entity_id_required(self):
        with pytest.raises(Exception):
            KGNodeCreate(type=EntityType.TASK, title="T", namespace="ns")  # type: ignore[call-arg]

    def test_content_optional(self):
        n = KGNodeCreate(
            entity_id="x", type=EntityType.TASK, title="T", namespace="ns"
        )
        assert n.content is None


# ── KGNodeRead ────────────────────────────────────────────────────────────────

class TestKGNodeRead:
    def test_round_trips_json(self):
        now = datetime.utcnow()
        n = KGNodeRead(
            id=uuid.uuid4(),
            entity_id="a/b",
            type=EntityType.ARTIFACT,
            title="Artifact",
            namespace="ns",
            created_at=now,
        )
        dumped = n.model_dump(mode="json")
        restored = KGNodeRead.model_validate(dumped)
        assert restored.entity_id == n.entity_id
        assert restored.type == n.type


# ── KGEdgeCreate ─────────────────────────────────────────────────────────────

class TestKGEdgeCreate:
    def test_weight_defaults_to_one(self):
        e = KGEdgeCreate(
            source_entity_id="a",
            target_entity_id="b",
            rel_type=RelationType.CITES,
        )
        assert e.weight == 1.0

    def test_weight_clamped(self):
        with pytest.raises(Exception):
            KGEdgeCreate(
                source_entity_id="a",
                target_entity_id="b",
                rel_type=RelationType.EXTENDS,
                weight=1.5,
            )

    def test_rel_type_values(self):
        assert RelationType.DEPENDS_ON.value == "depends-on"
        assert RelationType.PRODUCES.value == "produces"


# ── KGGraphRead ───────────────────────────────────────────────────────────────

class TestKGGraphRead:
    def test_empty_graph(self):
        g = KGGraphRead(entities=[], relations=[])
        assert g.schema_version == KGSchemaVersion.CURRENT
        assert g.entities == []
        assert g.relations == []


# ── VendorPageUpsert ──────────────────────────────────────────────────────────

class TestVendorPageUpsert:
    def test_fields(self):
        v = VendorPageUpsert(
            vendor="cloudflare",
            path="/workers/fetch",
            content="# Fetch\n...",
            content_hash="abc123",
        )
        assert v.etag is None
        assert v.last_modified is None
