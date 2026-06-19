#!/usr/bin/env python3
"""dreams-toolchain runner: create, poll, cancel, archive, list dreams.

Works across all Claude surfaces (claude.ai web, Claude Code, Cowork,
Managed Agents sandbox, standalone). Auto-detects surface and adapts
auth, output paths, and install strategy.

Usage as CLI:
    python3 dream_runner.py create --store memstore_01x --sessions sesn_01a,sesn_01b
    python3 dream_runner.py poll   --dream drm_01abc
    python3 dream_runner.py cancel --dream drm_01abc
    python3 dream_runner.py list
    python3 dream_runner.py output --dream drm_01abc

Usage as library:
    from dream_runner import DreamRunner
    runner = DreamRunner()
    dream = runner.create(store_id, session_ids, model, instructions)
    dream = runner.poll(dream.id)

@cite platform.claude.com/docs/en/managed-agents/dreams
"""

from __future__ import annotations

import json
import os
import shutil
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


BETA_HEADERS = "managed-agents-2026-04-01,dreaming-2026-04-21"
SUPPORTED_MODELS = ("claude-opus-4-8", "claude-opus-4-7", "claude-sonnet-4-6")
LOG_FILE = "dream_runner.log"


def detect_surface() -> str:
    if os.environ.get("MANAGED_AGENT_SESSION_ID"):
        return "managed-agents"
    if os.path.exists("/mnt/skills") and os.environ.get("IS_SANDBOX") == "yes":
        return "claude-web"
    if shutil.which("claude") and os.path.exists(os.path.expanduser("~/.claude")):
        return "claude-code"
    if os.path.exists("/mnt/user") or os.environ.get("COWORK_SESSION"):
        return "cowork"
    return "standalone"


def output_dir(surface: str) -> Path:
    dirs = {
        "claude-web": Path("/mnt/user-data/outputs"),
        "cowork": Path.home() / "cowork" / "artifacts",
        "managed-agents": Path.home(),
    }
    d = dirs.get(surface, Path.cwd())
    d.mkdir(parents=True, exist_ok=True)
    return d


def resolve_api_key() -> str | None:
    key = os.environ.get("ANTHROPIC_API_KEY")
    if key:
        return key
    keyfile = Path.home() / ".anthropic" / "api_key"
    if keyfile.exists():
        return keyfile.read_text().strip()
    return None


def log(msg: str) -> None:
    line = f"{time.strftime('%H:%M:%S')} {msg}"
    print(line, flush=True)
    try:
        with open(LOG_FILE, "a") as f:
            f.write(line + "\n")
    except OSError:
        pass


@dataclass
class DreamRunner:
    """Manages the dream lifecycle across surfaces."""

    surface: str = field(default_factory=detect_surface)
    api_key: str | None = field(default_factory=resolve_api_key)
    _client: Any = field(default=None, repr=False)

    def _ensure_client(self) -> Any:
        if self._client is not None:
            return self._client
        if not self.api_key:
            log(f"ERROR: no ANTHROPIC_API_KEY found (surface={self.surface})")
            log("Set ANTHROPIC_API_KEY or pass --api-key")
            sys.exit(1)
        try:
            from anthropic import Anthropic
        except ImportError:
            log("Installing anthropic SDK...")
            flag = "--break-system-packages" if self.surface == "claude-web" else ""
            os.system(f"{sys.executable} -m pip install anthropic {flag} -q")
            from anthropic import Anthropic
        self._client = Anthropic(api_key=self.api_key)
        return self._client

    def create(
        self,
        store_id: str,
        session_ids: list[str],
        model: str = "claude-opus-4-8",
        instructions: str | None = None,
    ) -> dict[str, Any]:
        client = self._ensure_client()
        inputs = [
            {"type": "memory_store", "memory_store_id": store_id},
            {"type": "sessions", "session_ids": session_ids},
        ]
        kwargs: dict[str, Any] = {"inputs": inputs, "model": model}
        if instructions:
            kwargs["instructions"] = instructions
        dream = client.beta.dreams.create(**kwargs)
        log(f"created dream {dream.id} status={dream.status}")
        return self._to_dict(dream)

    def poll(self, dream_id: str, interval: int = 10, max_wait: int = 1800) -> dict[str, Any]:
        client = self._ensure_client()
        elapsed = 0
        while elapsed < max_wait:
            dream = client.beta.dreams.retrieve(dream_id)
            log(f"poll {dream.id} status={dream.status} tokens_in={dream.usage.input_tokens}")
            if dream.status not in ("pending", "running"):
                return self._to_dict(dream)
            time.sleep(interval)
            elapsed += interval
        log(f"timeout after {max_wait}s — dream still {dream.status}")
        return self._to_dict(dream)

    def cancel(self, dream_id: str) -> dict[str, Any]:
        client = self._ensure_client()
        dream = client.beta.dreams.cancel(dream_id)
        log(f"canceled {dream_id}")
        return self._to_dict(dream)

    def archive(self, dream_id: str) -> dict[str, Any]:
        client = self._ensure_client()
        dream = client.beta.dreams.archive(dream_id)
        log(f"archived {dream_id}")
        return self._to_dict(dream)

    def list_dreams(self, limit: int = 20, include_archived: bool = False) -> list[dict[str, Any]]:
        client = self._ensure_client()
        dreams = []
        for d in client.beta.dreams.list(limit=limit, include_archived=include_archived):
            dreams.append(self._to_dict(d))
        return dreams

    def get_output_store(self, dream_id: str) -> str | None:
        client = self._ensure_client()
        dream = client.beta.dreams.retrieve(dream_id)
        for out in dream.outputs:
            if out.type == "memory_store":
                return out.memory_store_id
        return None

    @staticmethod
    def _to_dict(obj: Any) -> dict[str, Any]:
        if hasattr(obj, "model_dump"):
            return obj.model_dump()
        if hasattr(obj, "__dict__"):
            return {k: str(v) for k, v in obj.__dict__.items() if not k.startswith("_")}
        return {"raw": str(obj)}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(prog="dream_runner", description="Dreams toolchain CLI")
    sub = parser.add_subparsers(dest="cmd")

    p_create = sub.add_parser("create")
    p_create.add_argument("--store", required=True, help="memory_store_id")
    p_create.add_argument("--sessions", required=True, help="comma-separated session_ids")
    p_create.add_argument("--model", default="claude-opus-4-8", choices=SUPPORTED_MODELS)
    p_create.add_argument("--instructions", default=None)
    p_create.add_argument("--api-key", default=None)

    p_poll = sub.add_parser("poll")
    p_poll.add_argument("--dream", required=True)
    p_poll.add_argument("--interval", type=int, default=10)
    p_poll.add_argument("--api-key", default=None)

    p_cancel = sub.add_parser("cancel")
    p_cancel.add_argument("--dream", required=True)
    p_cancel.add_argument("--api-key", default=None)

    p_archive = sub.add_parser("archive")
    p_archive.add_argument("--dream", required=True)
    p_archive.add_argument("--api-key", default=None)

    p_list = sub.add_parser("list")
    p_list.add_argument("--limit", type=int, default=20)
    p_list.add_argument("--include-archived", action="store_true")
    p_list.add_argument("--api-key", default=None)

    p_output = sub.add_parser("output")
    p_output.add_argument("--dream", required=True)
    p_output.add_argument("--api-key", default=None)

    args = parser.parse_args()
    if not args.cmd:
        parser.print_help()
        sys.exit(0)

    surface = detect_surface()
    log(f"surface={surface}")

    api_key = getattr(args, "api_key", None) or resolve_api_key()
    runner = DreamRunner(surface=surface, api_key=api_key)

    if args.cmd == "create":
        result = runner.create(args.store, args.sessions.split(","), args.model, args.instructions)
    elif args.cmd == "poll":
        result = runner.poll(args.dream, args.interval)
    elif args.cmd == "cancel":
        result = runner.cancel(args.dream)
    elif args.cmd == "archive":
        result = runner.archive(args.dream)
    elif args.cmd == "list":
        result = runner.list_dreams(args.limit, args.include_archived)
    elif args.cmd == "output":
        sid = runner.get_output_store(args.dream)
        result = {"output_memory_store_id": sid}
    else:
        parser.print_help()
        sys.exit(1)

    out = output_dir(surface) / f"dream_{args.cmd}_result.json"
    out.write_text(json.dumps(result, indent=2, default=str))
    log(f"result → {out}")
    print(json.dumps(result, indent=2, default=str))


if __name__ == "__main__":
    main()
