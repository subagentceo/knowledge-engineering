#!/usr/bin/env python3
"""
ollama-healthcheck.py
Preflight check for all nightly cowork scripts.
Returns the best available inference backend:
  1. Local Ollama via Tailscale (zero Anthropic tokens)
  2. Anthropic API fallback (when local is unreachable)

Usage:
  from cowork.scripts.ollama_healthcheck import check_backend
  backend = check_backend()
  # backend = {"available": True, "base_url": "http://100.x.x.x:11434", "model": "glm-4.7-flash:latest", "source": "local"}
  # or       = {"available": True, "base_url": "https://api.anthropic.com", "model": None, "source": "anthropic"}

Env vars read:
  OLLAMA_TAILSCALE_IP  — Tailscale IP of the WSL machine (required for local)
  OLLAMA_PORT          — default 11434
  OLLAMA_MODEL         — default glm-4.7-flash:latest
  ANTHROPIC_API_KEY    — used in fallback path (must be real key, not "ollama")
"""

import os
import json
import urllib.request
import urllib.error
import sys

# ── config ────────────────────────────────────────────────────────────────────
TAILSCALE_IP  = os.environ.get("OLLAMA_TAILSCALE_IP", "")
OLLAMA_PORT   = int(os.environ.get("OLLAMA_PORT", "11434"))
OLLAMA_MODEL  = os.environ.get("OLLAMA_MODEL", "glm-4.7-flash:latest")
PING_TIMEOUT  = float(os.environ.get("OLLAMA_PING_TIMEOUT", "2.0"))  # seconds

# ── helpers ───────────────────────────────────────────────────────────────────

def _ping_ollama(host: str, port: int, timeout: float) -> bool:
    """Return True if Ollama server is reachable and responding."""
    try:
        url = f"http://{host}:{port}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
            return "Ollama is running" in body or resp.status == 200
    except Exception:
        return False


def _check_model_loaded(host: str, port: int, model: str, timeout: float) -> bool:
    """Return True if the target model is in Ollama's model list."""
    try:
        url = f"http://{host}:{port}/v1/models"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            models = [m.get("id", "") for m in data.get("data", [])]
            # match by prefix (glm-4.7-flash matches glm-4.7-flash:latest)
            base = model.split(":")[0]
            return any(base in m for m in models)
    except Exception:
        return False


# ── public API ────────────────────────────────────────────────────────────────

def check_backend(verbose: bool = False) -> dict:
    """
    Returns dict:
      available   bool   — is any backend usable?
      base_url    str    — ANTHROPIC_BASE_URL value to export
      model       str|None — local model name, or None for Anthropic
      source      str    — "local" | "anthropic" | "none"
      reason      str    — human-readable status
    """
    result = {
        "available": False,
        "base_url": "https://api.anthropic.com",
        "model": None,
        "source": "none",
        "reason": "no backend configured",
    }

    # ── 1. Try local Ollama via Tailscale ─────────────────────────────────────
    if TAILSCALE_IP:
        host = TAILSCALE_IP
        alive = _ping_ollama(host, OLLAMA_PORT, PING_TIMEOUT)
        if alive:
            model_ready = _check_model_loaded(host, OLLAMA_PORT, OLLAMA_MODEL, PING_TIMEOUT)
            if model_ready:
                result.update({
                    "available": True,
                    "base_url": f"http://{host}:{OLLAMA_PORT}",
                    "model": OLLAMA_MODEL,
                    "source": "local",
                    "reason": f"Ollama reachable at {host}:{OLLAMA_PORT}, model {OLLAMA_MODEL} loaded",
                })
                if verbose:
                    print(f"[ollama-healthcheck] ✓ local Ollama: {result['base_url']} ({OLLAMA_MODEL})", file=sys.stderr)
                return result
            else:
                if verbose:
                    print(f"[ollama-healthcheck] ⚠ Ollama reachable but {OLLAMA_MODEL} not loaded — will pull or fallback", file=sys.stderr)
                # Server is up but model not loaded — attempt pull then recheck
                result.update({
                    "available": True,
                    "base_url": f"http://{host}:{OLLAMA_PORT}",
                    "model": OLLAMA_MODEL,
                    "source": "local",
                    "reason": f"Ollama at {host}:{OLLAMA_PORT} — model {OLLAMA_MODEL} may need pull",
                })
                return result
        else:
            if verbose:
                print(f"[ollama-healthcheck] ✗ Tailscale IP {host}:{OLLAMA_PORT} unreachable (timeout={PING_TIMEOUT}s)", file=sys.stderr)
    else:
        if verbose:
            print("[ollama-healthcheck] ℹ OLLAMA_TAILSCALE_IP not set, skipping local check", file=sys.stderr)

    # ── 2. Fallback: Anthropic API ────────────────────────────────────────────
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if api_key and api_key not in ("ollama", "lm-studio", "llama-cpp", "local"):
        result.update({
            "available": True,
            "base_url": "https://api.anthropic.com",
            "model": None,
            "source": "anthropic",
            "reason": "local Ollama unreachable — using Anthropic API fallback",
        })
        if verbose:
            print("[ollama-healthcheck] ⚡ fallback → Anthropic API", file=sys.stderr)
        return result

    # ── 3. Nothing available ──────────────────────────────────────────────────
    result["reason"] = "no local Ollama and no valid ANTHROPIC_API_KEY"
    if verbose:
        print("[ollama-healthcheck] ✗ no backend available", file=sys.stderr)
    return result


def export_env(backend: dict) -> dict:
    """
    Return env var dict to os.environ.update() or export before subprocess calls.
    Passes CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1 for local backends.
    """
    env = {"ANTHROPIC_BASE_URL": backend["base_url"]}
    if backend["source"] == "local":
        env["ANTHROPIC_API_KEY"] = "ollama"
        env["ANTHROPIC_AUTH_TOKEN"] = "ollama"
        env["CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS"] = "1"
        if backend.get("model"):
            env["ANTHROPIC_DEFAULT_SONNET_MODEL"] = backend["model"]
            env["ANTHROPIC_DEFAULT_HAIKU_MODEL"] = backend["model"]
            env["ANTHROPIC_DEFAULT_OPUS_MODEL"] = backend["model"]
    return env


# ── CLI ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Check Ollama / Anthropic backend availability")
    parser.add_argument("--verbose", "-v", action="store_true")
    parser.add_argument("--json", dest="as_json", action="store_true", help="Output JSON")
    parser.add_argument("--export", action="store_true", help="Output shell export statements")
    args = parser.parse_args()

    backend = check_backend(verbose=args.verbose)
    env = export_env(backend)

    if args.as_json:
        print(json.dumps({**backend, "env": env}, indent=2))
    elif args.export:
        for k, v in env.items():
            print(f'export {k}="{v}"')
    else:
        status = "✓" if backend["available"] else "✗"
        print(f"{status} [{backend['source']}] {backend['reason']}")
        if backend.get("model"):
            print(f"  model: {backend['model']}")
        print(f"  base_url: {backend['base_url']}")

    sys.exit(0 if backend["available"] else 1)
