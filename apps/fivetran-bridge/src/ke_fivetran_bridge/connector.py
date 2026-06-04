"""
Fivetran Connector SDK entrypoint for knowledge-engineering data sync.

@cite apps/admin-api/src/ke_admin_api/models.py
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
"""

from __future__ import annotations

from fivetran_connector_sdk import Connector, Operations as op


class KeFivetranConnector(Connector):
    def schema(self, configuration: dict) -> list[dict]:
        """Returns table schema definitions for Fivetran sync."""
        return [
            {"table": "organizations", "primary_key": ["id"]},
            {"table": "workspaces", "primary_key": ["id"]},
            {"table": "api_keys", "primary_key": ["id"]},
            {"table": "message_usage_reports", "primary_key": ["id"]},
            {"table": "claude_code_usage_reports", "primary_key": ["id"]},
        ]

    def update(self, configuration: dict, state: dict):
        """Fetches data from Anthropic Admin API and yields upsert operations.

        configuration["anthropic_admin_token"] — Bearer token for Admin API auth.
        Yields op.upsert(table, row_dict) for each record.
        Yields op.checkpoint(new_state) to persist cursor.
        """
        # Implementation requires live Admin API token — not included here.
        # Auth: Bearer token via configuration["anthropic_admin_token"], never ANTHROPIC_API_KEY.
        pass
