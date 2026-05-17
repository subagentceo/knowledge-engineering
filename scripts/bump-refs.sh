#!/usr/bin/env bash
# bump-refs.sh — bump a third_party/ submodule pin.
#
# Usage:
#   scripts/bump-refs.sh <submodule-name> <tag-or-sha>
#
# Example:
#   scripts/bump-refs.sh workerd v1.20260518.0
#
# Per ADR OPR2 the resulting commit must be reviewed + approved by the
# operator (CODEOWNERS gates /third_party/ and /.gitmodules).
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "usage: $0 <submodule-name> <tag-or-sha>" >&2
  exit 2
fi

NAME="$1"
REF="$2"
DIR="third_party/$NAME"

if [ ! -d "$DIR" ]; then
  echo "error: $DIR is not a submodule directory" >&2
  exit 1
fi

cd "$DIR"
git fetch --tags origin
git checkout "$REF"
cd - >/dev/null

git add "$DIR"
echo "Bumped $NAME → $REF. Review with: git diff --cached -- $DIR .gitmodules"
echo "Then commit and open a PR; CODEOWNERS will require operator review."
