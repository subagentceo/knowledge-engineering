#!/usr/bin/env bash
# container/doctor.sh
#
# Health probe for the active Claude Code container. Prints the VM/runtime
# facts and PASS/WARN/FAIL for each capability the chassis depends on. Read-only
# (no installs, no service starts) — run container/setup.sh first to fix gaps.
#
# Exit code is non-zero if any hard requirement FAILs (OAuth invariant, Node,
# git). Soft capabilities (redis, postgres, terraform, docker) only WARN.
#
# @cite vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md
# @cite container/claude-on-web.mdx
set -uo pipefail

pass() { printf '  \033[1;32mPASS\033[0m  %s\n' "$*"; }
warn() { printf '  \033[1;33mWARN\033[0m  %s\n' "$*"; }
fail() { printf '  \033[1;31mFAIL\033[0m  %s\n' "$*"; HARD_FAIL=1; }
hdr()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
HARD_FAIL=0

hdr "VM / runtime"
printf '  host    %s\n' "$(uname -n)"
printf '  kernel  %s\n' "$(uname -sr)"
printf '  arch    %s\n' "$(uname -m)"
printf '  os      %s\n' "$(. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME")"
printf '  cpu     %s vCPU\n' "$(nproc)"
printf '  mem     %s\n' "$(free -h 2>/dev/null | awk '/^Mem:/{print $2" total, "$7" available"}')"
printf '  disk    %s\n' "$(df -h / 2>/dev/null | awk 'NR==2{print $2" total, "$4" free ("$5" used)"}')"

hdr "OAuth-only invariant (hard)"
[[ -z "${ANTHROPIC_API_KEY:-}" ]] && pass "ANTHROPIC_API_KEY absent" || fail "ANTHROPIC_API_KEY is SET — must be unset"
[[ -z "${ANTHROPIC_ADMIN_API_KEY:-}" ]] && pass "ANTHROPIC_ADMIN_API_KEY absent" || fail "ANTHROPIC_ADMIN_API_KEY is SET — must be unset"

hdr "Toolchain (hard)"
if command -v node >/dev/null; then pass "node $(node --version) ($(command -v node))"; else fail "node missing"; fi
if command -v npm >/dev/null;  then pass "npm $(npm --version)"; else fail "npm missing"; fi
if command -v git >/dev/null;  then pass "$(git --version)"; else fail "git missing"; fi
if command -v claude >/dev/null; then pass "claude $(claude --version 2>/dev/null) ($(readlink -f "$(command -v claude)"))"; else warn "claude CLI not on PATH"; fi
if command -v python3 >/dev/null; then pass "$(python3 --version)"; else warn "python3 missing"; fi

hdr "Repo bootstrap"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[[ -d "$REPO_ROOT/node_modules" ]] && pass "node_modules present" || warn "node_modules absent — run container/setup.sh"
[[ -d "$REPO_ROOT/dist" ]] && pass "dist/ built" || warn "dist/ absent — run npm run build"

hdr "Data plane (soft)"
if command -v redis-cli >/dev/null; then
  redis-cli ping >/dev/null 2>&1 && pass "redis up ($(redis-server --version 2>/dev/null | grep -oE 'v=[0-9.]+'))" || warn "redis installed but not running"
else warn "redis not installed"; fi
if command -v pg_isready >/dev/null; then
  pg_isready >/dev/null 2>&1 && pass "postgres up ($(psql --version 2>/dev/null | awk '{print $3}'))" || warn "postgres installed but not accepting connections"
else warn "postgres client not installed"; fi

hdr "Optional tooling (soft)"
for t in terraform docker jq rg curl prettier; do
  if command -v "$t" >/dev/null; then pass "$t present"; else warn "$t absent"; fi
done
command -v gh >/dev/null && warn "gh present (note: this chassis uses the GitHub MCP, not gh)" || pass "gh absent (expected — use GitHub MCP)"

hdr "Result"
if [[ "$HARD_FAIL" -eq 0 ]]; then pass "all hard requirements satisfied"; exit 0
else fail "one or more hard requirements failed"; exit 1; fi
