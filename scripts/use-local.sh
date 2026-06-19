#!/usr/bin/env bash
# use-local.sh — route Claude Code to local Ollama on WSL via Tailscale
# Usage: source scripts/use-local.sh
# @cite cowork/config/local-model-policy.yaml
# @cite cowork/scripts/ollama-healthcheck.py

# ── Set your WSL machine's Tailscale IP here ──────────────────────────────────
# Run `tailscale ip -4` on your Windows machine to get this.
# Or: set OLLAMA_TAILSCALE_IP in your shell profile so this script picks it up.
TAILSCALE_IP="${OLLAMA_TAILSCALE_IP:-}"

if [ -z "$TAILSCALE_IP" ]; then
  echo "⚠  OLLAMA_TAILSCALE_IP not set."
  echo "   Run: export OLLAMA_TAILSCALE_IP=<your-tailscale-ip>"
  echo "   (Get it by running 'tailscale ip -4' on the Windows WSL machine)"
  return 1 2>/dev/null || exit 1
fi

OLLAMA_PORT="${OLLAMA_PORT:-11434}"
OLLAMA_MODEL="${OLLAMA_MODEL:-qwen2.5-coder:7b}"  # fits 11GB VRAM; glm-4.7-flash needs 24GB

export ANTHROPIC_BASE_URL="http://${TAILSCALE_IP}:${OLLAMA_PORT}"
export ANTHROPIC_API_KEY="ollama"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_DEFAULT_SONNET_MODEL="${OLLAMA_MODEL}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${OLLAMA_MODEL}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${OLLAMA_MODEL}"

# Prevents Claude Code from sending Anthropic-specific beta headers that
# local servers don't recognize (causes "Unexpected anthropic-beta header" errors)
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS="1"

echo "✓ Claude Code → local Ollama at ${ANTHROPIC_BASE_URL} (${OLLAMA_MODEL})"
echo "  CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1 set"
