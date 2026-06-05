"""
Tests for KeFivetranConnector schema interface.

@cite apps/fivetran-bridge/src/ke_fivetran_bridge/connector.py
"""

from ke_fivetran_bridge.connector import KeFivetranConnector


def test_schema_returns_list():
    conn = KeFivetranConnector()
    schema = conn.schema({})
    assert isinstance(schema, list)
    assert len(schema) >= 1


def test_schema_has_primary_keys():
    conn = KeFivetranConnector()
    schema = conn.schema({})
    for table_def in schema:
        assert "table" in table_def
        assert "primary_key" in table_def
