#!/usr/bin/env python3
"""
ollama-inference-test.py — the REAL verification gate for issue #522.

Unlike ollama-healthcheck.py (which only does GET / and GET /api/tags), this
script POSTs an actual inference request and asserts a 200 + non-empty body.

WHY this exists: a GET-only healthcheck is a false-positive gate. GET /api/tags
succeeds even when a real inference request is still in flight, because GET
carries no body and never triggers a model load into VRAM. Issue #522 was
declared "resolved" off a passing GET healthcheck without ever exercising
inference. This test POSTs real inference so the gate means something.

NOTE (#522 post-mortem): the FIRST POST to a cold model loads weights into VRAM
(~90s on an RTX 2080 Ti). A short client timeout (e.g. 5s) will see that as a
RemoteDisconnected / http_code=000 — which looks like a network/proxy fault but
is just the client giving up mid-load. That is why TIMEOUT defaults to 120s and
the failure path prints a cold-load hint. GET vs POST asymmetry = model load,
not a binding or forwarder bug.

@cite https://docs.ollama.com/faq  (OLLAMA_HOST=0.0.0.0:11434 — bind-all config)
@cite cowork/config/local-model-policy.yaml
@cite https://github.com/subagentceo/knowledge-engineering/issues/522

Usage:
  # Against the Tailscale path (from macOS or anywhere on the tailnet):
  OLLAMA_TAILSCALE_IP=100.112.152.5 python3 cowork/scripts/ollama-inference-test.py

  # Against the loopback path (run ON the WSL box — isolates forwarder vs Ollama):
  OLLAMA_HOST_OVERRIDE=127.0.0.1 python3 cowork/scripts/ollama-inference-test.py

Exit codes:
  0  PASS — POST inference returned 200 + non-empty response
  1  FAIL — POST inference failed (timeout, empty reply, non-200, or empty body)
  2  CONFIG — required env not set (no host to test)

The (host, port, model) triple, the prompt, and the pass criteria are identical
on both sides — this script IS the shared source of truth for the A2A contract.
"""

import os
import sys
import json
import time
import urllib.request
import urllib.error

# OLLAMA_HOST_OVERRIDE wins (loopback test on WSL); else the Tailscale IP.
HOST = os.environ.get("OLLAMA_HOST_OVERRIDE") or os.environ.get("OLLAMA_TAILSCALE_IP", "")
PORT = int(os.environ.get("OLLAMA_PORT", "11434"))
MODEL = os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")
PROMPT = os.environ.get("OLLAMA_TEST_PROMPT", "Reply with exactly the word: PONG")
# First POST loads the model into VRAM — generous ceiling so a slow cold load
# is not misread as a forwarder failure.
TIMEOUT = float(os.environ.get("OLLAMA_TEST_TIMEOUT", "120"))


def run_inference(host: str, port: int, model: str, prompt: str, timeout: float) -> dict:
    """POST /api/chat (stream=false) and return a typed result dict."""
    url = f"http://{host}:{port}/api/chat"
    body = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
    }).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    started = time.monotonic()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            status = resp.status
            raw = resp.read().decode("utf-8")
            elapsed = round(time.monotonic() - started, 2)
    except urllib.error.HTTPError as e:
        return {"ok": False, "reason": f"HTTP {e.code}", "elapsed_s": round(time.monotonic() - started, 2)}
    except Exception as e:
        # http_code=000 class: connection reset / empty reply / read timeout.
        # On a COLD model this is usually the client timeout firing during the
        # ~90s VRAM load, NOT a network fault — see the cold-load hint below. (#522)
        return {"ok": False, "reason": f"{type(e).__name__}: {e}", "elapsed_s": round(time.monotonic() - started, 2)}

    if status != 200:
        return {"ok": False, "reason": f"status={status}", "elapsed_s": elapsed}
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        return {"ok": False, "reason": "non-JSON body", "elapsed_s": elapsed, "raw_head": raw[:120]}
    content = (parsed.get("message") or {}).get("content", "")
    if not content.strip():
        return {"ok": False, "reason": "empty response content", "elapsed_s": elapsed}
    return {"ok": True, "elapsed_s": elapsed, "response": content.strip()[:200]}


def main() -> int:
    if not HOST:
        print("[inference-test] CONFIG: set OLLAMA_TAILSCALE_IP or OLLAMA_HOST_OVERRIDE", file=sys.stderr)
        return 2
    label = "loopback" if os.environ.get("OLLAMA_HOST_OVERRIDE") else "tailscale"
    print(f"[inference-test] POST http://{HOST}:{PORT}/api/chat  model={MODEL}  path={label}", file=sys.stderr)
    result = run_inference(HOST, PORT, MODEL, PROMPT, TIMEOUT)
    if result["ok"]:
        print(f"✓ PASS [{label}] inference 200 in {result['elapsed_s']}s — response: {result['response']!r}")
        return 0
    print(f"✗ FAIL [{label}] {result['reason']} after {result['elapsed_s']}s")
    if "raw_head" in result:
        print(f"  body head: {result['raw_head']!r}")
    # A timeout/disconnect near the client deadline on a COLD model is not a
    # network bug — the first POST loads the model into VRAM (~90s on a 2080 Ti)
    # while GET never does. Don't misdiagnose it as the forwarder. (#522)
    if result["elapsed_s"] >= TIMEOUT - 1 or "Disconnect" in result["reason"] or "timed out" in result["reason"].lower():
        print(f"  hint: cold model-load can exceed the client timeout (now {TIMEOUT:.0f}s). "
              f"Re-run within OLLAMA_KEEP_ALIVE to hit the warm path, or raise OLLAMA_TEST_TIMEOUT.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
