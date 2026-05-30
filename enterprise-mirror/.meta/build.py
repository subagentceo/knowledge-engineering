#!/usr/bin/env python3
"""Rebuild enterprise.json from the raw .meta/<org>.repos.json files.

This is the rebuild step referenced by CLAUDE.md's "Refresh protocol" and by
the /refresh-manifest skill. It is the source of truth for the manifest shape.

What it does:
  - reads every .meta/<org>.repos.json (raw `gh api orgs/<org>/repos` output)
  - projects each repo to the 9-field manifest shape (size -> size_kb)
  - preserves the `enterprise` and `identities` blocks from the existing
    enterprise.json (those are not in the API response)
  - recomputes `orgs`, `totals`, and stamps `verified_at`

Usage:
  python3 .meta/build.py                 # verified_at = today (UTC)
  python3 .meta/build.py --date 2026-05-29
"""
from __future__ import annotations

import argparse
import datetime
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
META = ROOT / ".meta"
MANIFEST = ROOT / "enterprise.json"

# Orgs are discovered from the .repos.json files present in .meta/.
# (clone/scratch logs like opencoworkers.repos.json with `[]` are tolerated.)

# Fallback enterprise + identities blocks used when no enterprise.json exists yet
# (e.g. a fresh WSL/Windows reproduction via bootstrap-wsl.sh). These two blocks
# are NOT present in the GitHub API response, so build.py preserves them from an
# existing manifest when one is present, and seeds them from here otherwise.
DEFAULT_ENTERPRISE = {
    "slug": "subagentmcp",
    "url": "https://github.com/enterprises/subagentmcp",
    "orgs_url": "https://github.com/enterprises/subagentmcp/organizations",
}
DEFAULT_IDENTITIES = {
    "admin-jadecli": {
        "email": "admin@jadecli.com",
        "role": "enterprise admin; canonical alias for enterprise-scoped gh queries",
    },
    "alex-jadecli": {
        "email": "alex@jadecli.com",
        "role": "primary day-to-day push identity; default gh user",
    },
    "zhoukalex": {
        "email": "zhouk.alex@gmail.com",
        "role": "third rotation slot",
    },
}

REPO_FIELDS = (
    "name",
    "visibility",
    "fork",
    "size_kb",
    "pushed_at",
    "description",
    "default_branch",
    "ssh_url",
    "clone_url",
)


def project_repo(raw: dict) -> dict:
    """Map a raw gh-api repo object to the manifest's 9-field shape."""
    return {
        "name": raw.get("name"),
        "visibility": raw.get("visibility"),
        "fork": raw.get("fork", False),
        "size_kb": raw.get("size", 0),  # gh `size` is already in KB
        "pushed_at": raw.get("pushed_at"),
        "description": raw.get("description"),
        "default_branch": raw.get("default_branch"),
        "ssh_url": raw.get("ssh_url"),
        "clone_url": raw.get("clone_url"),
    }


def discover_orgs() -> list[str]:
    orgs = []
    for p in sorted(META.glob("*.repos.json")):
        org = p.name[: -len(".repos.json")]
        orgs.append(org)
    return orgs


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--date",
        default=datetime.datetime.now(datetime.timezone.utc).date().isoformat(),
        help="verified_at stamp (YYYY-MM-DD); defaults to today UTC",
    )
    args = ap.parse_args()

    # The enterprise + identities blocks are not in the GitHub API response.
    # Preserve them from an existing manifest; otherwise seed from defaults so a
    # fresh reproduction (bootstrap-wsl.sh) can build the first manifest. (#2)
    if MANIFEST.exists():
        existing = json.loads(MANIFEST.read_text())
        enterprise_block = existing.get("enterprise") or DEFAULT_ENTERPRISE
        identities_block = existing.get("identities") or DEFAULT_IDENTITIES
    else:
        print(f"note: {MANIFEST} not found — seeding enterprise+identities from defaults", file=sys.stderr)
        enterprise_block = DEFAULT_ENTERPRISE
        identities_block = DEFAULT_IDENTITIES

    discovered = discover_orgs()
    if not discovered:
        # No raw .meta/*.repos.json files present. Writing now would clobber an
        # existing manifest down to 0 orgs and exit 0 — a silent wipe. Abort. (#1)
        print(
            "error: no .meta/*.repos.json files found — run fetch.sh first. "
            "Refusing to overwrite the manifest with an empty one.",
            file=sys.stderr,
        )
        return 1

    orgs_out: dict[str, dict] = {}
    total_repos = 0
    total_size = 0

    for org in discovered:
        raw = json.loads((META / f"{org}.repos.json").read_text())
        if not isinstance(raw, list):
            print(f"warn: {org}.repos.json is not a list — skipping", file=sys.stderr)
            continue
        # Skip empty scratch files (e.g. orphaned local opencoworkers/, which is
        # NOT in the enterprise) — an org with 0 repos in its raw file is not a
        # real enterprise org and must not appear in the manifest.
        if not raw:
            continue
        repos = [project_repo(r) for r in raw]
        repos.sort(key=lambda r: r["name"] or "")
        org_size = sum(r["size_kb"] or 0 for r in repos)
        orgs_out[org] = {"repo_count": len(repos), "repos": repos}
        total_repos += len(repos)
        total_size += org_size

    # All discovered raw files were empty/non-list → no real orgs. Same wipe risk
    # as empty discovery: refuse rather than zero out an existing manifest. (#1)
    if not orgs_out:
        print(
            "error: all .meta/*.repos.json files were empty — refusing to write "
            "an empty manifest. Re-run fetch.sh; check token scope.",
            file=sys.stderr,
        )
        return 1

    # Keep orgs sorted for stable diffs.
    orgs_out = dict(sorted(orgs_out.items()))

    manifest = {
        "enterprise": enterprise_block,
        "verified_at": args.date,
        "identities": identities_block,
        "orgs": orgs_out,
        "totals": {
            "orgs": len(orgs_out),
            "repos": total_repos,
            "size_kb": total_size,
        },
    }

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(
        f"rebuilt enterprise.json: {len(orgs_out)} orgs · {total_repos} repos "
        f"· {total_size} KB · verified {args.date}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
