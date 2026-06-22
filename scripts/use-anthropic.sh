#!/usr/bin/env bash
# use-anthropic.sh — restore Claude Code to Anthropic API
# Usage: source scripts/use-anthropic.sh
# @cite cowork/config/local-model-policy.yaml

unset ANTHROPIC_BASE_URL
unset ANTHROPIC_AUTH_TOKEN
unset ANTHROPIC_DEFAULT_SONNET_MODEL
unset ANTHROPIC_DEFAULT_HAIKU_MODEL
unset ANTHROPIC_DEFAULT_OPUS_MODEL
unset CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS

# Restore real API key from shell profile if it was overwritten
# The OAuth-only invariant in this repo means ANTHROPIC_API_KEY should
# NOT be a real key in the codebase — unset to let OAuth flow take over.
# If your shell profile sets it, it will re-appear after this.
if [ "${ANTHROPIC_API_KEY:-}" = "ollama" ] || \
   [ "${ANTHROPIC_API_KEY:-}" = "lm-studio" ] || \
   [ "${ANTHROPIC_API_KEY:-}" = "llama-cpp" ]; then
  unset ANTHROPIC_API_KEY
fi

echo "✓ Claude Code → Anthropic API (OAuth)"
echo "  All local overrides cleared"
