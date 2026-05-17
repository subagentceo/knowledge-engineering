#!/usr/bin/env bash
# fetch-cloudflare-docs.sh — fetch the Cloudflare docs catalog into
# third_party/docs-mirrors/_cache/.
#
# Per third_party/docs-mirrors/README.md:
#   - kind=page-md: append /index.md to URL before fetch
#   - kind=llms-index, kind=llms-full: fetch URL verbatim
#   - kind=submodule: no-op (covered by a separate third_party/ submodule)
#
# Dry-run default: MSA_DRY_RUN=1 prints commands without executing.
# Idempotent: re-fetches overwrite existing _cache files.
#
# @cite third_party/docs-mirrors/sources.yaml
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CATALOG="$REPO_ROOT/third_party/docs-mirrors/sources.yaml"
CACHE_DIR="$REPO_ROOT/third_party/docs-mirrors/_cache"
DRY_RUN="${MSA_DRY_RUN:-1}"

if [ ! -f "$CATALOG" ]; then
  echo "error: catalog not found at $CATALOG" >&2
  exit 2
fi

mkdir -p "$CACHE_DIR"

# Parse sources.yaml. We use a tight awk parser rather than a yaml
# library to keep this script dep-free (consistent with the repo's
# "avoid new deps" posture).
parse_sources() {
  awk '
    /^  - name:/ { if (n) print n"|"u"|"d"|"k; n=$3; u=""; d=""; k=""; next }
    /^    url:/  { u=$2; next }
    /^    dest:/ { d=$2; next }
    /^    kind:/ { k=$2; next }
    END { if (n) print n"|"u"|"d"|"k }
  ' "$CATALOG"
}

run_curl() {
  local url="$1"
  local dest="$2"
  if [ "$DRY_RUN" = "1" ]; then
    echo "DRY: curl --fail --silent --show-error -L -o '$dest' '$url'"
    return 0
  fi
  curl --fail --silent --show-error -L -o "$dest" "$url"
}

count=0
fail=0
parse_sources | while IFS='|' read -r name url dest kind; do
  count=$((count+1))
  full_dest="$REPO_ROOT/third_party/docs-mirrors/$dest"
  mkdir -p "$(dirname "$full_dest")"

  case "$kind" in
    page-md)
      fetch_url="${url}/index.md"
      ;;
    llms-index|llms-full)
      fetch_url="$url"
      ;;
    submodule)
      echo "SKIP: $name (kind=submodule; covered by third_party/<name>)"
      continue
      ;;
    *)
      echo "error: unknown kind '$kind' for $name" >&2
      exit 1
      ;;
  esac

  echo "[$count] $name ($kind)"
  if ! run_curl "$fetch_url" "$full_dest"; then
    echo "error: fetch failed for $name → $fetch_url" >&2
    exit 1
  fi
done

echo "OK — catalog processed (dry_run=$DRY_RUN)"
