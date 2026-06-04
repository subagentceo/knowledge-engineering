"""
Fetches CF Workers analytics for account e6294e3ea89f8207af387d459824aaae.

@cite vendor/cloudflare/
"""

from __future__ import annotations

import httpx

CF_ACCOUNT = "e6294e3ea89f8207af387d459824aaae"


async def fetch_workers_analytics(cf_token: str) -> list[dict]:
    """Fetch Workers analytics via CF API."""
    headers = {"Authorization": f"Bearer {cf_token}"}
    url = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}/workers/scripts"
    async with httpx.AsyncClient() as client:
        r = await client.get(url, headers=headers)
        if r.status_code == 200:
            return r.json().get("result", [])
    return []
