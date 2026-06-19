# `ollama/` — durable local-model link (macOS ↔ WSL over Tailscale)

Minimal, type-safe, self-healing install for routing Claude Code to a local
`qwen2.5-coder:7b` on the WSL box over Tailscale. Born from issue
[#522](https://github.com/subagentceo/knowledge-engineering/issues/522) — every
file here exists to catch a failure that actually bit us.

| File | Role |
|---|---|
| `contract.py` | Pydantic v2 — the durability **invariant**. Fails honestly when not durable. |
| `contract.yaml` | Observed-state instance (auto-written by `autoresolve.py`). |
| `install.yaml` | Terse spec: detect→fix/escalate checks + the 13 curated `learned_failures`. |
| `autoresolve.py` | Runs macOS checks, self-heals (warm cold model, 403→IP fallback), validates, and **emits a DurableTask** to `engineering.jsonl` when it hits the operator-sudo wall. |
| `mac-bootstrap.sh` | Sourced from `~/.zshrc`. Resolves a *serving* address (MagicDNS host if it 200s, else live tailnet IP — never hardcoded) and sources `scripts/use-local.sh`. |

## Durability model (the steer: "make everything survive restart")

- **macOS:** `~/.zshrc` sources `mac-bootstrap.sh` → env is rebuilt on every shell,
  pointing at whatever address currently serves. Survives `wsl --shutdown` IP
  reassignment (row #10) by resolving live, and auto-upgrades to the MagicDNS
  hostname once WSL allows it.
- **WSL (host):** durability = **systemd** `OLLAMA_HOST=0.0.0.0` + `enable --now`
  (NOT a bashrc `ollama serve` — row #2). Applied one-time by the operator:
  `sudo ~/.local/bin/durable-ollama harden`. That's the only step no agent can do
  (sudo password — row #7), so `autoresolve.py` escalates it as a DurableTask.

## Integration with the durable-* skills

The steer was "add `durable-lru-dreams` / `durable-pg-memory-store` into `ollama/`."
We do **not** vendor those 20KB skills (keep it small). Their shared pattern —
unattended recovery via a **DurableTask on `engineering.jsonl`** — is what we adopt:
`autoresolve.py` emits exactly that envelope when self-heal is exhausted, and
persists last-known-good to `.last-good.yaml` (a tiny durable layer, no pg/redis dep).

## Run

```bash
python3 ollama/autoresolve.py            # heal + validate + (escalate if needed)
python3 ollama/autoresolve.py --probe    # read-only POST inference check
python3 ollama/contract.py ollama/contract.yaml   # validate the invariant (exit 1 if not durable)
```
