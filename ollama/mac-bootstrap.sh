#!/usr/bin/env bash
# mac-bootstrap.sh — durable macOS-side env for local Ollama over Tailscale (#522).
# Source from ~/.zshrc so every new shell points at the WSL backend with NO hardcoded IP.
#   echo '[ -f <repo>/ollama/mac-bootstrap.sh ] && source <repo>/ollama/mac-bootstrap.sh' >> ~/.zshrc
#
# Safe to source on every shell open: it only sets env + (optionally) sources use-local.sh.
# It NEVER starts a server (failure row #8) and NEVER hardcodes the IP (failure row #10).
# @cite ollama/install.yaml  · @cite scripts/use-local.sh

_OLLAMA_HOST_NAME="wsl-ubuntu2604-jadecli"   # MagicDNS name — survives `wsl --shutdown` IP reassignment
_OLLAMA_PORT="${OLLAMA_PORT:-11434}"

# An address is usable only if GET / returns 200 — not merely if it pings.
# The MagicDNS hostname pings but 403s until OLLAMA_ORIGINS allows it (row #13),
# so we must verify with a real request, not assume reachability.
_ollama_serves() { curl -sf -o /dev/null --max-time 4 "http://$1:${_OLLAMA_PORT}/" 2>/dev/null; }

# Resolve a SERVING address: prefer MagicDNS hostname (durable across IP reassignment),
# but only if it actually returns 200; otherwise the live tailnet IP of the node.
_ollama_resolve() {
  local ts="/usr/local/bin/tailscale" ip
  # 1) MagicDNS hostname — durable, but only if it serves (post-`harden` + OLLAMA_ORIGINS)
  if _ollama_serves "$_OLLAMA_HOST_NAME"; then
    printf '%s' "$_OLLAMA_HOST_NAME"; return 0
  fi
  # 2) live IP off the tailnet — never a hardcoded literal (row #10)
  if [ -x "$ts" ]; then
    ip="$("$ts" status 2>/dev/null | awk '/wsl-ubuntu2604-jadecli/ {print $1; exit}')"
    if [ -n "$ip" ] && _ollama_serves "$ip"; then printf '%s' "$ip"; return 0; fi
  fi
  return 1
}

export OLLAMA_MODEL="${OLLAMA_MODEL:-qwen2.5-coder:7b}"   # fits 11GB VRAM (row #12)
_addr="$(_ollama_resolve)"
if [ -n "$_addr" ]; then
  export OLLAMA_TAILSCALE_IP="$_addr"
  # Point Claude Code at the local backend (sets ANTHROPIC_BASE_URL + model tiers + disables betas).
  _repo="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/.." && pwd)"
  [ -f "$_repo/scripts/use-local.sh" ] && source "$_repo/scripts/use-local.sh" >/dev/null
else
  echo "ⓘ ollama: WSL backend not reachable on the tailnet — Claude Code stays on Anthropic API." >&2
fi
unset _addr _repo
