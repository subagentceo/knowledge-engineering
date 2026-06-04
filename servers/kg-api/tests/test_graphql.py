"""
Tests for the strawberry GraphQL schema — type registration and introspection.

@cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/define-outcomes.md
@cite seeds/posture/session-start.xml
"""

from __future__ import annotations

import strawberry
import pytest

from ke_kg_api.graphql.schema import Query, KGNode, KGEdge, KGGraph, schema


def test_schema_type_map_has_kgnode():
    assert "KGNode" in schema.type_map


def test_schema_type_map_has_kgedge():
    assert "KGEdge" in schema.type_map


def test_schema_type_map_has_kggraph():
    assert "KGGraph" in schema.type_map


def test_query_fields():
    fields = {f.name for f in schema.type_map["Query"].fields}
    assert "node" in fields
    assert "searchNodes" in fields
    assert "graph" in fields


def test_introspection_query():
    result = schema.execute_sync("{ __typename }")
    assert result.errors is None
    assert result.data == {"__typename": "Query"}
