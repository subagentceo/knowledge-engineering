#!/usr/bin/env bash
# scripts/parity/doctor.sh — fail-fast Managed-Agents cloud-sandbox parity check.
#
# Probes this host for every tool the cloud sandbox ships (codified in
# docs/data/toolchain-parity.json, itself sourced from the agent-setup.md
# spec) and exits NONZERO on any drift, so a silent toolchain degradation
# becomes a loud, actionable failure instead of a mysterious runtime break.
#
# The spec + version floors + pass/fail logic live in src/lib/toolchain-parity.ts
# (shared with the verify-chain test). This script only does the host probing
# and hands the observed state to that pure checker via tsx.
#
# Usage:
#   scripts/parity/doctor.sh            # full check, table output, exit 1 on drift
#   scripts/parity/doctor.sh --quiet    # only print failures
#
# @cite docs/data/toolchain-parity.json
# @cite src/lib/toolchain-parity.ts
# @cite vendor/anthropics/platform.claude.com/docs/en/managed-agents/agent-setup.md
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${ROOT}"

SPEC="docs/data/toolchain-parity.json"
QUIET="${1:-}"

ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; }

# OAuth-only invariant — a set ANTHROPIC_API_KEY is itself drift.
if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  err "ANTHROPIC_API_KEY is set — FORBIDDEN (OAuth-only invariant). Unset it."
  exit 2
fi

# Build the ProbeState JSON the TS checker expects: { present:{}, versions:{} }.
# Walk every probe in the spec via jq, then command -v / detect_version each.
PROBES="$(jq -r '
  ([.languages[].probe] + [.managers[].probe] + [.databases[].probe] + [.utilities[].probe])
  | unique | .[]' "$SPEC")"

# Resolve a probe to a path, consulting mise-managed runtimes first. In a
# non-interactive shell the mise shims/activation may not be on PATH, so a
# `command -v ruby` finds the stale system ruby (2.6) instead of the mise 3.3
# we pinned. `mise which` reports the version mise would actually use.
resolve_probe() {
  local probe="$1" p=""
  if command -v mise >/dev/null 2>&1; then
    p="$(mise which "$probe" 2>/dev/null || true)"
  fi
  [ -z "$p" ] && p="$(command -v "$probe" 2>/dev/null || true)"
  printf '%s' "$p"
}

# Detect a probe's version, preferring the mise-resolved binary path.
detect_via() {
  local probe="$1" path="$2" raw=""
  case "$probe" in
    java)   raw="$("$path" -version 2>&1 | head -1 || true)" ;;
    go)     raw="$("$path" version 2>/dev/null || true)" ;;
    *)      raw="$("$path" --version 2>&1 | head -1 || true)" ;;
  esac
  printf '%s' "$raw" | grep -oE '[0-9]+(\.[0-9]+){1,2}' | head -1 || true
}

present_json="{}"
versions_json="{}"
for probe in $PROBES; do
  path="$(resolve_probe "$probe")"
  if [ -n "$path" ]; then
    present_json="$(jq --arg k "$probe" --arg v "$path" '. + {($k): $v}' <<<"$present_json")"
    # Only version-probe the language binaries (cheap; managers/utils are presence-only).
    if jq -e --arg p "$probe" 'any(.languages[]; .probe == $p)' "$SPEC" >/dev/null; then
      ver="$(detect_via "$probe" "$path" || true)"
      [ -n "$ver" ] && versions_json="$(jq --arg k "$probe" --arg v "$ver" '. + {($k): $v}' <<<"$versions_json")"
    fi
  else
    present_json="$(jq --arg k "$probe" '. + {($k): null}' <<<"$present_json")"
  fi
done

STATE="$(jq -n --argjson p "$present_json" --argjson v "$versions_json" '{present: $p, versions: $v}')"

# Hand observed state to the pure checker; it prints the table + sets exit code.
QUIET="$QUIET" STATE="$STATE" npx tsx scripts/parity/report.ts
