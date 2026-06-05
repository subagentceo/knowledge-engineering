"""
Container toolkit audit — checks required tools, installs missing ones, emits JSONL report.

@cite vendor/anthropics/code.claude.com/docs/en/reference/claude-code-on-the-web.md
@cite seeds/posture/session-start.xml
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

REQUIRED: list[tuple[str, str | None]] = [
    ("watchman", None),              # github release binary
    ("inotifywait", "inotify-tools"),
    ("socat", "socat"),
    ("mailx", "mailutils"),
    ("mutt", "mutt"),
    ("redis-cli", "redis-tools"),
    ("jq", "jq"),
    ("rg", "ripgrep"),
    ("tmux", "tmux"),
    ("sqlite3", "sqlite3"),
    ("psql", "postgresql-client"),
    ("python3", None),               # pre-installed; no apt fallback
    ("node", "nodejs"),
    ("git", "git"),
    ("swiftly", None),               # swift.org swiftly installer; no apt fallback
    ("swift", None),                 # installed via swiftly or direct tarball; no apt fallback
]

REPORT_PATH = Path(os.environ.get("AUDIT_REPORT", "audit_container_results.jsonl"))


def _apt_install(pkg: str, attempts: int = 3) -> bool:
    delays = [0, 2, 4]
    for delay in delays[:attempts]:
        time.sleep(delay)
        result = subprocess.run(
            ["apt-get", "install", "-y", "--no-install-recommends", pkg],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0:
            return True
    return False


def _install_watchman() -> bool:
    """Download latest watchman binary from GitHub releases."""
    import tarfile
    import tempfile

    RELEASES_API = "https://api.github.com/repos/facebook/watchman/releases/latest"

    for attempt in range(3):
        try:
            if attempt > 0:
                time.sleep(2 ** attempt)  # 2s, 4s backoff

            req = urllib.request.Request(RELEASES_API, headers={"User-Agent": "ke-audit/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                release = json.loads(resp.read())

            asset = next(
                (a for a in release.get("assets", [])
                 if "linux-x64" in a["name"] and a["name"].endswith(".tar.gz")),
                None
            )
            if not asset:
                continue

            with tempfile.TemporaryDirectory() as tmpdir:
                archive = os.path.join(tmpdir, "watchman.tar.gz")
                urllib.request.urlretrieve(asset["browser_download_url"], archive)

                with tarfile.open(archive, "r:gz") as tar:
                    tar.extractall(tmpdir)

                for root, _, files in os.walk(tmpdir):
                    if "watchman" in files:
                        src = os.path.join(root, "watchman")
                        dst = "/usr/local/bin/watchman"
                        shutil.copy2(src, dst)
                        os.chmod(dst, 0o755)
                        break

            if shutil.which("watchman"):
                return True

        except (urllib.error.URLError, OSError, KeyError):
            continue

    return False


def audit() -> list[dict]:
    records = []
    for tool, pkg in REQUIRED:
        found_before = shutil.which(tool) is not None
        install_attempted = False
        install_succeeded = False

        if not found_before:
            install_attempted = True
            if tool == "watchman":
                install_succeeded = _install_watchman()
            elif pkg is not None:
                install_succeeded = _apt_install(pkg)
                # re-check
                if not install_succeeded:
                    install_succeeded = shutil.which(tool) is not None
            # final check regardless
            install_succeeded = shutil.which(tool) is not None

        records.append({
            "tool": tool,
            "found": shutil.which(tool) is not None,
            "install_attempted": install_attempted,
            "install_succeeded": install_succeeded if install_attempted else None,
        })

    return records


def main() -> int:
    records = audit()

    with REPORT_PATH.open("w", encoding="utf-8") as f:
        for rec in records:
            f.write(json.dumps(rec) + "\n")

    missing = [r["tool"] for r in records if not r["found"]]
    for rec in records:
        status = "OK" if rec["found"] else "MISSING"
        print(f"  [{status}] {rec['tool']}", file=sys.stderr)

    if missing:
        print(f"\nMISSING: {', '.join(missing)}", file=sys.stderr)
        print(f"Report written to {REPORT_PATH}", file=sys.stderr)
        return 1

    print(f"\nAll tools present. Report: {REPORT_PATH}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
