# `ollama/` auth lanes — subscription · local · on-device · API key

Why routing Claude Code (and optionally Apple's Foundation Models) to the local WSL Ollama is
**sanctioned**, and the four credential lanes for this solo setup. Companion to the durable-link files
(`install.yaml`, `mac-bootstrap.sh`, `scripts/use-local.sh`) — this is the *credential/policy* layer,
not the network layer.

> @cite scripts/use-local.sh · @cite ollama/install.yaml (check `route_claude_code`)
> @cite docs/prompts/e2m-brain-dump-routed-2026-06-19.md (§9)
> @cite docs/reference/anthropic-foundation-models-integration.md

## The four lanes

| lane | who runs it | credential | Anthropic usage | cost |
| :-- | :-- | :-- | :-- | :-- |
| subscription | Claude Code → Anthropic (official client) | claude.ai login (OAuth) | yes — your Max pool | subscription |
| **local** | Claude Code → WSL Ollama via Tailscale | `ANTHROPIC_API_KEY=ollama` (sentinel) | **none** | $0 |
| on-device | Apple's own model (`LanguageModelSession`) | none | none | $0 |
| API key | ClaudeForFoundationModels → Anthropic | Console API key | yes (API) | per-token |

## Why the local lane is fine (the inverse of the prohibited move)

The prohibited thing is lifting your **subscription OAuth token out of the official client** into a
third-party app. The local lane does the opposite: the official Claude Code client stays intact and
just points `ANTHROPIC_BASE_URL` at *your* server. When a request routes local, **no Anthropic call
happens at all** — no token, no subscription draw, nothing to meter. `ANTHROPIC_BASE_URL` is a
documented Claude Code env var; Ollama / LM Studio / llama.cpp speak the Anthropic Messages API
natively. So local routing is sanctioned by construction. (The June-15 Agent SDK metering change that
*would* have touched `claude -p` against Anthropic is paused anyway — but local requests never reach
that question.)

`ANTHROPIC_API_KEY=ollama` is a **sentinel**, not a real key — consistent with the OAuth-only
invariant: no real key in the cloud chassis; the sentinel lives only in the local dev shell.

## Switching lanes (macOS)

`mac-bootstrap.sh` (sourced from `~/.zshrc`) already does the right thing on every shell: if the WSL
backend serves, it routes **local**; otherwise it prints "Claude Code stays on Anthropic API" and
leaves you on the **subscription**. That *is* the dual backend.

```bash
# → local (also automatic via mac-bootstrap.sh when the tailnet backend serves):
source scripts/use-local.sh
# → subscription (drop the override; new shell, or unset):
unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY ANTHROPIC_AUTH_TOKEN \
      ANTHROPIC_DEFAULT_SONNET_MODEL ANTHROPIC_DEFAULT_HAIKU_MODEL ANTHROPIC_DEFAULT_OPUS_MODEL
```

The exact local env (`scripts/use-local.sh`):

```yaml
ANTHROPIC_BASE_URL: http://<tailscale-ip>:11434
ANTHROPIC_API_KEY: ollama            # sentinel
ANTHROPIC_AUTH_TOKEN: ollama
ANTHROPIC_DEFAULT_SONNET_MODEL: qwen2.5-coder:7b
ANTHROPIC_DEFAULT_HAIKU_MODEL: qwen2.5-coder:7b
ANTHROPIC_DEFAULT_OPUS_MODEL: qwen2.5-coder:7b
CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS: "1"
```

## Apple extension — ClaudeForFoundationModels → local Ollama (experiment)

The same redirect should carry into Apple's Foundation Models framework. `ClaudeForFoundationModels`
`.proxied(baseURL:)` points HTTP at anything speaking the Anthropic Messages API — which the Tailscale
Ollama already does. On the **M5 Mac** (on the tailnet, Xcode 27):

```swift
let local = ClaudeModel(id: "qwen2.5-coder:7b",
                        capabilities: .init(structuredOutput: true))
let model = ClaudeLanguageModel(
  name: local,
  auth: .proxied(headers: [:]),                                   // local server ignores auth
  baseURL: URL(string: "http://wsl-ubuntu2604-jadecli:11434")!    // MagicDNS host, or live tailnet IP
)
let session = LanguageModelSession(model: model)
```

This gives **local AI inside Apple's framework — no API key, no subscription token, $0**.

Status: **test-worthy, not guaranteed.** ClaudeForFoundationModels expects Claude-shaped responses;
Ollama's compatibility layer may differ on tool calls / `@Generable` structured output. Verify a plain
`respond(to:)` round-trip before relying on it.

Caveats carried from the durable link:

- The Apple device must reach the WSL node — i.e. be on the tailnet (the Mac already is). Use the
  MagicDNS host `wsl-ubuntu2604-jadecli`, falling back to the live `tailscale ip -4` — never a
  hardcoded IP (failure row #10).
- Hitting the MagicDNS hostname needs `OLLAMA_ORIGINS=*` in the systemd drop-in (failure row #13) —
  the same fix the Claude Code lane needs.
- Device fit: M5 Mac and iPhone 16 Pro run OS 27 and reach the tailnet; iPhone 11 / iPad 6 are out
  (no OS 27).

## When to use which

- **local** — cheap, offline, private, high-volume, or token-saving work.
- **subscription** — hard reasoning where you want real Claude quality (already paid for).
- **on-device** — fully offline on the Apple device with no WSL dependency (Apple's own model).
- **API key** — only if you specifically want Claude *through* the Apple framework, off-tailnet.
