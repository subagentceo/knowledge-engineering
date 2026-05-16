#!/bin/bash
# Generate a cryptographically strong, rotatable secret and write it
# ONLY to the destination the operator names. Defaults to stdout so
# the value can be piped directly into another tool without ever
# landing in shell history.
#
# Why this exists: the agent will not handle secrets directly. This
# script lets the agent prepare the *call site* for a rotation
# without seeing the value. The operator runs the script and pipes
# its output where it needs to go.
#
# Examples:
#   # 1. Generate to stdout, pipe into a GitHub Actions secret:
#   ./plugins/platform-engineering/scripts/gen_secret.sh \
#     | gh secret set ALLOYDB_OMNI_PASSWORD --org subagentceo
#
#   # 2. Generate into the macOS Keychain via Docker MCP secret store:
#   VALUE=$(./plugins/platform-engineering/scripts/gen_secret.sh)
#   docker mcp secret set "alloydb-omni.password=${VALUE}"
#   unset VALUE
#
#   # 3. Generate + export into the current shell for local dev:
#   export ALLOYDB_OMNI_PASSWORD="$(./plugins/platform-engineering/scripts/gen_secret.sh)"
#
#   # 4. Generate longer + alphanumeric-only (no shell-quoting traps):
#   ./gen_secret.sh --length 64 --alphanumeric
#
# Never echoes the value to a log. Refuses to write to a file unless
# the operator passes --to-file (and then chmod 600s it).
#
# @cite plugins/platform-engineering/skills/docker-platform-engineering/SKILL.md
# @cite plugins/platform-engineering/CONNECTORS.md
set -euo pipefail

LENGTH=32
CHARSET="full"   # full | alphanumeric
TO_FILE=""

usage() {
  cat >&2 <<'EOF'
Usage: gen_secret.sh [--length N] [--alphanumeric] [--to-file PATH]

  --length N       Length in characters (default: 32, min: 16, max: 128)
  --alphanumeric   Restrict to [A-Za-z0-9] (default: includes URL-safe symbols)
  --to-file PATH   Write to PATH with chmod 600 instead of stdout

Output goes to stdout by default. No trailing newline.
EOF
  exit 1
}

while [ $# -gt 0 ]; do
  case "$1" in
    --length)
      LENGTH="$2"
      shift 2
      ;;
    --alphanumeric)
      CHARSET="alphanumeric"
      shift
      ;;
    --to-file)
      TO_FILE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "unknown arg: $1" >&2
      usage
      ;;
  esac
done

# Validate length bounds.
if ! [[ "$LENGTH" =~ ^[0-9]+$ ]]; then
  echo "error: --length must be an integer" >&2
  exit 2
fi
if [ "$LENGTH" -lt 16 ] || [ "$LENGTH" -gt 128 ]; then
  echo "error: --length must be between 16 and 128 (got $LENGTH)" >&2
  exit 2
fi

# Generate. Pull 4x the byte count so the post-filter still has
# enough characters even when symbols/non-alphanumerics are stripped.
BYTES=$((LENGTH * 4))

# `head -c` closes its stdin once it has enough bytes, which makes
# `tr` exit with SIGPIPE under `set -o pipefail`. Read a fixed-size
# block from /dev/urandom up front instead so neither side races.
RAW=$(LC_ALL=C dd if=/dev/urandom bs="$BYTES" count=1 2>/dev/null | base64)
if [ "$CHARSET" = "alphanumeric" ]; then
  VALUE=$(printf '%s' "$RAW" | LC_ALL=C tr -dc 'A-Za-z0-9')
else
  # URL-safe charset (alphanumeric + - and _).
  VALUE=$(printf '%s' "$RAW" | LC_ALL=C tr -dc 'A-Za-z0-9_-')
fi
VALUE=$(printf '%s' "$VALUE" | LC_ALL=C cut -c "1-${LENGTH}")
unset RAW

if [ -z "$VALUE" ] || [ "${#VALUE}" -ne "$LENGTH" ]; then
  echo "error: generation failed (got length ${#VALUE}, expected $LENGTH)" >&2
  exit 3
fi

# Write to file or stdout. Never log the value.
if [ -n "$TO_FILE" ]; then
  # Refuse to overwrite an existing file unless the operator unset it
  # first — avoids silently clobbering a rotation in flight.
  if [ -e "$TO_FILE" ]; then
    echo "error: $TO_FILE exists; remove it first if you want to overwrite" >&2
    exit 4
  fi
  umask 077
  printf '%s' "$VALUE" >"$TO_FILE"
  chmod 600 "$TO_FILE"
  echo "wrote ${#VALUE}-char secret to $TO_FILE (mode 600)" >&2
else
  printf '%s' "$VALUE"
fi
