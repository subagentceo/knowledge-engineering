#!/usr/bin/env bash
# verify.sh — produce the verified facts for a named section of
# chat-in-the-web.
#
# Version: 1.1.0   (2026-05-09: outcomes pass — version stamped, §4 guidance,
#                   baseline file renamed)
# History:
#   1.0.0  initial
#   1.1.0  added version header (ISSUE-17)
#
# Usage:
#   scripts/verify.sh <section>
#
# Sections:
#   filesystem, runtimes, skills, network, all
#
# Exit code is always 0 unless the section name is unknown. Per-tool
# probe failures are reported in the output, not as exit codes — the
# skill needs to render them as table rows, not error out.

set -u

section="${1:-all}"

verify_filesystem() {
  echo "=== filesystem ==="
  ls -la /mnt/user-data/uploads /mnt/skills /mnt/transcripts /home/claude /mnt/user-data/outputs 2>&1 | head -40
}

verify_runtimes() {
  echo "=== installed_runtimes ==="
  for b in python3 node bash git psql redis-cli docker java go rustc gcc make jq curl ripgrep tmux; do
    if command -v "$b" >/dev/null 2>&1; then
      v=$("$b" --version 2>/dev/null | head -1)
      printf '%-12s %s\n' "$b" "${v:-(version unknown)}"
    else
      printf '%-12s %s\n' "$b" 'not installed'
    fi
  done
}

verify_skills() {
  echo "=== skills ==="
  for d in /mnt/skills/public /mnt/skills/examples /mnt/skills/user; do
    [ -d "$d" ] || continue
    scope=$(basename "$d")
    for s in "$d"/*/SKILL.md; do
      [ -f "$s" ] || continue
      name=$(awk -F': *' '/^name:/{print $2; exit}' "$s" | tr -d '\r')
      printf '%s\t%s\t%s\n' "$scope" "$name" "$s"
    done
  done
}

verify_network() {
  echo "=== network_and_io ==="
  echo -n "  curl→example.com: "
  curl -fsS -o /dev/null -w "HTTP %{http_code}, %{time_total}s\n" \
       --max-time 10 https://example.com 2>&1 || echo "(failed)"
  echo "  uploads dir:"
  if [ -d /mnt/user-data/uploads ]; then
    n=$(find /mnt/user-data/uploads -mindepth 1 -maxdepth 1 2>/dev/null | wc -l)
    echo "    $n entries"
    ls -1 /mnt/user-data/uploads 2>/dev/null | head -5 | sed 's/^/    /'
  else
    echo "    (not mounted)"
  fi
  echo "  outputs dir:"
  if [ -d /mnt/user-data/outputs ]; then
    n=$(find /mnt/user-data/outputs -mindepth 1 -maxdepth 1 2>/dev/null | wc -l)
    echo "    $n entries"
    ls -1 /mnt/user-data/outputs 2>/dev/null | head -5 | sed 's/^/    /'
  else
    echo "    (not mounted)"
  fi
}

case "$section" in
  filesystem) verify_filesystem ;;
  runtimes)   verify_runtimes ;;
  skills)     verify_skills ;;
  network)    verify_network ;;
  all)
    verify_filesystem
    echo
    verify_runtimes
    echo
    verify_skills
    echo
    verify_network
    ;;
  *)
    echo "unknown section: $section" >&2
    echo "valid: filesystem, runtimes, skills, network, all" >&2
    exit 2
    ;;
esac
