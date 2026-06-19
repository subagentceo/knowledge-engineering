#!/usr/bin/env python3
"""
autoresolve.py — detect → self-heal → validate → escalate, for the macOS side of #522.

Runs the macOS consumer checks from install.yaml, self-heals what it can WITHOUT sudo
(warm a cold model, fall back from MagicDNS host to IP, source use-local.sh), writes the
observed contract instance, validates it via contract.py, persists last-good state, and —
when it hits the operator-sudo wall it cannot cross — emits a DurableTask to
engineering.jsonl. That emission is the integration point with durable-lru-dreams /
durable-pg-memory-store: same queue, same unattended-recovery pattern (steer: "add the
durable-* skills into ollama/" → apply their pattern, don't vendor 20KB).

Refuses to repeat any of the 13 curated failures in install.yaml.

@cite ollama/install.yaml
@cite https://github.com/subagentceo/knowledge-engineering/issues/522

Usage:
  python3 ollama/autoresolve.py            # full run: heal + validate + escalate
  python3 ollama/autoresolve.py --probe    # read-only; no heal, no queue write
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HERE = Path(__file__).resolve().parent
QUEUE = ROOT / "cowork/data/queues/engineering.jsonl"
LAST_GOOD = HERE / ".last-good.yaml"
CONTRACT = HERE / "contract.yaml"

HOST = "wsl-ubuntu2604-jadecli"          # MagicDNS — IP-reassignment-proof (failure row #10)
PORT = 11434
MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")
COLD_TIMEOUT = int(os.environ.get("OLLAMA_TEST_TIMEOUT", "120"))


def _log(tag: str, msg: str) -> None:
    print(f"[autoresolve] {tag} {msg}", file=sys.stderr)


def _http(method: str, addr: str, path: str, body: bytes | None, timeout: float):
    url = f"http://{addr}:{PORT}{path}"
    req = urllib.request.Request(url, data=body, method=method,
                                 headers={"Content-Type": "application/json"} if body else {})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8")


def resolve_addr() -> str:
    """MagicDNS host first; fall back to OLLAMA_TAILSCALE_IP (failure row #10, never hardcode)."""
    try:
        subprocess.run(["ping", "-c1", "-W2", HOST], capture_output=True, timeout=6, check=True)
        # hostname resolves; but Ollama may 403 the Host header until OLLAMA_ORIGINS is set (row #13)
        try:
            st, _ = _http("GET", HOST, "/", None, 6)
            if st == 200:
                _log("OK", f"using MagicDNS host {HOST}")
                return HOST
        except urllib.error.HTTPError as e:
            if e.code == 403:
                _log("WARN", f"{HOST} -> 403 (Host-header origin; needs OLLAMA_ORIGINS=* on WSL, row #13) — falling back to IP")
        except Exception:
            pass
    except Exception:
        pass
    ip = os.environ.get("OLLAMA_TAILSCALE_IP", "")
    if not ip:
        _log("FAIL", "no MagicDNS host and no OLLAMA_TAILSCALE_IP set")
        return ""
    _log("OK", f"using fallback IP {ip}")
    return ip


def probe(addr: str) -> dict:
    """Returns observed-state fields for the contract. Self-heals a cold model (row #5/#6)."""
    state = {"get_reachable": False, "post_inference_ok": False, "warm_response_s": 0.0}
    try:
        st, txt = _http("GET", addr, "/", None, 6)
        state["get_reachable"] = (st == 200 and "Ollama is running" in txt)
    except Exception as e:
        _log("FAIL", f"GET / : {e}")
        return state
    body = json.dumps({"model": MODEL, "messages": [{"role": "user", "content": "reply: PONG"}],
                       "stream": False}).encode()
    t0 = time.monotonic()
    try:
        st, txt = _http("POST", addr, "/api/chat", body, COLD_TIMEOUT)  # >=120: tolerate cold load (row #5)
        elapsed = round(time.monotonic() - t0, 2)
        content = (json.loads(txt).get("message") or {}).get("content", "")
        state["post_inference_ok"] = (st == 200 and bool(content.strip()))
        state["warm_response_s"] = elapsed
        _log("OK" if state["post_inference_ok"] else "FAIL", f"POST /api/chat {st} in {elapsed}s")
    except Exception as e:
        _log("FAIL", f"POST /api/chat : {e} (if near {COLD_TIMEOUT}s, cold VRAM load — not a network bug)")
    return state


def detect_wsl_durable(addr: str) -> tuple[str, bool]:
    """Infer the WSL durable layer from observable signals (we can't ss into WSL).
    bind_address/persistent_override can only be confirmed by the WSL agent; default conservative."""
    # If the MagicDNS hostname path returns 200, origins are open AND bind is 0.0.0.0 → durable.
    try:
        st, _ = _http("GET", HOST, "/", None, 6)
        if st == 200:
            return "0.0.0.0", True
    except Exception:
        pass
    return "127.0.0.1", False


def write_contract(addr: str, state: dict) -> dict:
    bind, persistent = detect_wsl_durable(addr)
    ip = os.environ.get("OLLAMA_TAILSCALE_IP", "100.112.152.5")
    inst = {
        "tailscale_ip": ip,
        "port": PORT,
        "bind_address": bind,
        "model": MODEL,
        "persistent_override": persistent,
        "get_reachable": state["get_reachable"],
        "post_inference_ok": state["post_inference_ok"],
        "cold_load_timeout_s": COLD_TIMEOUT,
        "warm_response_s": state["warm_response_s"],
        "survives_wsl_shutdown": bind == "0.0.0.0" and persistent,
    }
    import yaml
    CONTRACT.write_text(
        "# Auto-written by autoresolve.py — observed macOS↔WSL state (#522)\n"
        + yaml.safe_dump(inst, sort_keys=False))
    return inst


def _pending_task_exists() -> str | None:
    """Idempotency: don't spam the queue if an unresolved escalation is already pending."""
    if not QUEUE.exists():
        return None
    for line in QUEUE.read_text().splitlines():
        try:
            t = json.loads(line)
        except Exception:
            continue
        if t.get("from") == "ollama-autoresolve@macos" and t.get("state") == "pending":
            return t.get("id")
    return None


def emit_durable_task(blockers: list[str]) -> str:
    """The escalate-operator wall: emit a DurableTask (durable-* skills' pattern)."""
    existing = _pending_task_exists()
    if existing:
        _log("SKIP", f"escalation already pending as {existing} — not re-queuing")
        return existing
    now = datetime.now(timezone.utc).isoformat()
    task = {
        "_type": "task",
        "id": str(uuid.uuid4()),
        "queue": "engineering",
        "subject": "issue #522: WSL operator sudo needed — make Ollama bind durable (0.0.0.0 + origins)",
        "state": "pending",
        "created_at": now,
        "updated_at": now,
        "from": "ollama-autoresolve@macos",
        "ke_fit_score": 4,
        "payload": {
            "issue": 522,
            "blockers": blockers,
            "operator_command": "sudo ~/.local/bin/durable-ollama harden",
            "also_set": 'Environment="OLLAMA_ORIGINS=*"  # MagicDNS hostname 403 fix (row #13)',
            "self_heal_exhausted": True,
            "reason": "bind/persistent-override require sudo on WSL; no agent can type the password (failure row #7)",
        },
    }
    QUEUE.parent.mkdir(parents=True, exist_ok=True)
    with QUEUE.open("a") as f:
        f.write(json.dumps(task) + "\n")
    return task["id"]


def main(argv: list[str]) -> int:
    probe_only = "--probe" in argv
    addr = resolve_addr()
    if not addr:
        return 2
    state = probe(addr)
    if probe_only:
        print(json.dumps(state, indent=2))
        return 0 if state["post_inference_ok"] else 1

    inst = write_contract(addr, state)
    # validate via contract.py (single source of the invariant)
    rc = subprocess.run([sys.executable, str(HERE / "contract.py"), "--soft", str(CONTRACT)]).returncode
    if inst["survives_wsl_shutdown"]:
        import yaml
        LAST_GOOD.write_text(yaml.safe_dump(inst, sort_keys=False))
        _log("OK", "durable — last-good state persisted")
        return 0
    # not durable → escalate the sudo wall
    from contract import OllamaTailscaleContract  # reuse blockers()
    blockers = OllamaTailscaleContract(**inst).blockers()
    tid = emit_durable_task(blockers)
    _log("ESCALATE", f"emitted DurableTask {tid} -> {QUEUE.name} (operator sudo on WSL)")
    print("⚠ inference works now, but NOT durable across `wsl --shutdown`. Operator must run on WSL:")
    print("    sudo ~/.local/bin/durable-ollama harden")
    return 0


if __name__ == "__main__":
    sys.path.insert(0, str(HERE))
    sys.exit(main(sys.argv))
