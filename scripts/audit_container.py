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
    """Download prebuilt watchman linux-x64 binary from GitHub releases."""
    api_url = "https://api.github.com/repos/facebook/watchman/releases/latest"
    try:
        req = urllib.request.Request(api_url, headers={"User-Agent": "ke-audit/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            release = json.loads(resp.read())
        assets = release.get("assets", [])
        asset = next(
            (a for a in assets if "linux" in a["name"] and "x64" in a["name"] and a["name"].endswith(".zip")),
            None,
        )
        if not asset:
            # fallback: look for .tar.gz or standalone binary
            asset = next(
                (a for a in assets if "linux" in a["name"] and "x86_64" in a["name"]),
                None,
            )
        if not asset:
            return False
        download_url = asset["browser_download_url"]
        tmp_path = Path("/tmp/watchman_download")
        urllib.request.urlretrieve(download_url, tmp_path)
        # Try to extract; if zip:
        import zipfile, tarfile
        dest = Path("/tmp/watchman_extracted")
        dest.mkdir(exist_ok=True)
        if str(tmp_path).endswith(".zip") or zipfile.is_zipfile(tmp_path):
            with zipfile.ZipFile(tmp_path) as zf:
                zf.extractall(dest)
        else:
            with tarfile.open(tmp_path) as tf:
                tf.extractall(dest)
        # Find watchman binary
        candidates = list(dest.rglob("watchman"))
        binary = next((c for c in candidates if c.is_file() and not c.name.endswith(".py")), None)
        if not binary:
            return False
        dest_bin = Path("/usr/local/bin/watchman")
        shutil.copy2(binary, dest_bin)
        dest_bin.chmod(0o755)
        return shutil.which("watchman") is not None
    except Exception:
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
