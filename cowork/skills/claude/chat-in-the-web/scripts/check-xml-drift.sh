#!/usr/bin/env bash
# check-xml-drift.sh — verify the bundled environment-disclosure-prompt.xml
# matches the canonical standalone artifact at /mnt/user-data/outputs/.
#
# Resolves ISSUE-16 from the 2026-05-09 session manifest: the same XML lived
# in two places and could silently drift. This script makes the drift
# observable. The bundled `references/environment-disclosure-prompt.xml`
# is the canonical home; the standalone copy in /mnt/user-data/outputs/ is
# a publishing convenience. If they differ, the bundled copy wins.
#
# Usage:
#   scripts/check-xml-drift.sh [path-to-standalone]
#
# Default standalone path is /mnt/user-data/outputs/environment-disclosure-prompt.xml
# Exit 0 = identical or no standalone present.
# Exit 1 = drift detected; standalone differs from bundled.
# Exit 2 = bundled missing (skill broken).

set -euo pipefail

BUNDLED="$(cd "$(dirname "$0")/.." && pwd)/references/environment-disclosure-prompt.xml"
STANDALONE="${1:-/mnt/user-data/outputs/environment-disclosure-prompt.xml}"

if [[ ! -f "$BUNDLED" ]]; then
  echo "FATAL: bundled XML not found at $BUNDLED" >&2
  exit 2
fi

if [[ ! -f "$STANDALONE" ]]; then
  echo "OK: no standalone at $STANDALONE — nothing to drift against."
  echo "    Bundled is canonical:"
  echo "    $(sha256sum "$BUNDLED")"
  exit 0
fi

bsum=$(sha256sum "$BUNDLED"  | awk '{print $1}')
ssum=$(sha256sum "$STANDALONE" | awk '{print $1}')

if [[ "$bsum" == "$ssum" ]]; then
  echo "OK: bundled and standalone XML are byte-identical."
  echo "    sha256: $bsum"
  exit 0
fi

echo "DRIFT detected." >&2
echo "  bundled    $bsum  $BUNDLED" >&2
echo "  standalone $ssum  $STANDALONE" >&2
echo >&2
echo "Diff (bundled left, standalone right):" >&2
diff -u "$BUNDLED" "$STANDALONE" || true
echo >&2
echo "Resolution: the bundled copy is canonical. Either re-emit the standalone" >&2
echo "from the bundled file, or accept the standalone update and copy it back" >&2
echo "into references/ before committing." >&2
exit 1
