#!/usr/bin/env python3
"""
contract.py — the durability invariant for local Ollama over Tailscale (#522).

Pydantic v2 (matches the repo's Python tooling). Validates an observed-state YAML
instance and FAILS HONESTLY when the backend is not yet durable. The validator
catching a not-yet-durable state is the point — declaring durable=true while the
live bind is 127.0.0.1 is the exact false-positive that reopened #522 four times.

Invariant: durable ⇔
  bind_address == "0.0.0.0"          # systemd binds all interfaces
  ∧ persistent_override              # OLLAMA_HOST set in a systemd drop-in
  ∧ get_reachable                    # GET / -> "Ollama is running"
  ∧ post_inference_ok                # POST /api/chat -> 200 + non-empty content
  ∧ cold_load_timeout_s >= 120       # first POST loads ~5GB VRAM (~88s on 2080 Ti)

@cite https://github.com/subagentceo/knowledge-engineering/issues/522  (canonical runbook §3)
@cite https://docs.ollama.com/faq                                       (OLLAMA_HOST=0.0.0.0)

Usage:
  python3 ollama/contract.py ollama/contract.yaml        # validate; nonzero exit if not durable
  python3 ollama/contract.py --soft ollama/contract.yaml # parse + report, exit 0 even if not durable
"""
from __future__ import annotations

import sys
from ipaddress import IPv4Address
from typing import Literal

try:
    import yaml  # PyYAML
    from pydantic import BaseModel, Field, model_validator
except ImportError as e:  # autoresolve.py installs these; surface the gap loudly
    sys.stderr.write(f"[contract] missing dep: {e}. Run: pip install pydantic pyyaml\n")
    sys.exit(3)


class OllamaTailscaleContract(BaseModel):
    tailscale_ip: IPv4Address           # from `tailscale ip -4`; prefer MagicDNS hostname over the wire
    port: int = 11434
    bind_address: Literal["0.0.0.0", "127.0.0.1"]
    model: str = "qwen2.5-coder:7b"
    persistent_override: bool
    get_reachable: bool
    post_inference_ok: bool
    cold_load_timeout_s: int = Field(ge=120)
    warm_response_s: float = Field(ge=0.0)
    survives_wsl_shutdown: bool

    @model_validator(mode="after")
    def _coherent(self) -> "OllamaTailscaleContract":
        # survives_wsl_shutdown is a CLAIM that must be backed by the durable layer.
        if self.survives_wsl_shutdown and not (self.bind_address == "0.0.0.0" and self.persistent_override):
            raise ValueError("incoherent: survives_wsl_shutdown=true requires bind 0.0.0.0 + persistent_override")
        return self

    def durable(self) -> bool:
        return (
            str(self.bind_address) == "0.0.0.0"
            and self.persistent_override
            and self.get_reachable
            and self.post_inference_ok
            and self.cold_load_timeout_s >= 120
        )

    def blockers(self) -> list[str]:
        b: list[str] = []
        if str(self.bind_address) != "0.0.0.0":
            b.append(f"bind_address={self.bind_address} (need 0.0.0.0 — run `sudo ~/.local/bin/durable-ollama harden`)")
        if not self.persistent_override:
            b.append("persistent_override=false (systemd drop-in missing OLLAMA_HOST=0.0.0.0)")
        if not self.get_reachable:
            b.append("get_reachable=false (GET / did not return 'Ollama is running')")
        if not self.post_inference_ok:
            b.append("post_inference_ok=false (POST /api/chat did not return 200 + content)")
        if self.cold_load_timeout_s < 120:
            b.append(f"cold_load_timeout_s={self.cold_load_timeout_s} (need >=120 for cold VRAM load)")
        return b


def main(argv: list[str]) -> int:
    soft = "--soft" in argv
    paths = [a for a in argv[1:] if not a.startswith("-")]
    if not paths:
        sys.stderr.write("usage: contract.py [--soft] <contract.yaml>\n")
        return 2
    with open(paths[0]) as f:
        data = yaml.safe_load(f)
    try:
        c = OllamaTailscaleContract(**data)
    except Exception as e:
        sys.stderr.write(f"✗ SCHEMA INVALID: {e}\n")
        return 1
    if c.durable():
        print(f"✓ DURABLE — {c.model} @ {c.tailscale_ip}:{c.port}, bind {c.bind_address}, survives reboot")
        return 0
    print("⚠ NOT DURABLE — inference may work now, but won't survive a cold `wsl --shutdown`:")
    for blocker in c.blockers():
        print(f"  · {blocker}")
    return 0 if soft else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
