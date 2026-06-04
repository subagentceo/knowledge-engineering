"""
Fetches MessageUsageReport and ClaudeCodeUsageReport from Anthropic Admin API.

@cite apps/admin-api/src/ke_admin_api/models.py
@cite vendor/anthropics/platform.claude.com/docs/en/api/admin/usage_report.md
"""

from __future__ import annotations

import httpx


async def fetch_usage_reports(admin_token: str) -> list[dict]:
    """Fetch usage reports with Bearer token auth."""
    headers = {
        "Authorization": f"Bearer {admin_token}",
        "anthropic-version": "2023-06-01",
    }
    async with httpx.AsyncClient() as client:
        r = await client.get(
            "https://api.anthropic.com/v1/organizations/usage",
            headers=headers,
        )
        if r.status_code == 200:
            return r.json().get("data", [])
    return []
