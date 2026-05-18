#!/usr/bin/env bash
# =============================================================================
# scripts/apply-identity-profiles.sh — render OIDENT1 templates to operator Mac
#
# vendor cites:
# - vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97
# - git-config(1) §"Conditional includes" — the [includeIf] semantics
# - ssh_config(5) §Host,IdentityFile,IdentitiesOnly
#
# Idempotent. Safe to re-run. --dry-run for preview. --gen-keys for the
# zhoukalex SSH keypair (zhoukalex is the only new identity in this PR).
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

# ---------------------------------------------------------------------------
# Args
# ---------------------------------------------------------------------------
DRY_RUN=0
GEN_KEYS=0

usage() {
  cat <<'USAGE'
Usage: apply-identity-profiles.sh [--dry-run] [--gen-keys] [--help]

Renders the OIDENT1 identity templates from this repo onto the operator's Mac:
  - ~/.config/git/{alex,admin,zhoukalex,jade}.inc   (overwrite from repo)
  - ~/.ssh/config                                    (merge fragment via markers)
  - ~/.gitconfig                                     (ensure 4 includeIf rules)

Flags:
  --dry-run    Preview every planned change. Writes nothing.
  --gen-keys   If ~/.ssh/id_ed25519_zhoukalex is missing, generate it
               (ed25519, no passphrase). Other keys are never generated.
  --help       Show this message and exit.

Idempotent: safe to re-run. Never pushes, never modifies known_hosts,
never calls ssh-add, never prints private key material.
USAGE
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --gen-keys) GEN_KEYS=1 ;;
    --help|-h) usage; exit 0 ;;
    *) echo "unknown flag: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
log() {
  printf '[%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"
}

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GIT_SRC_DIR="$REPO_ROOT/seeds/operator-config/git"
SSH_FRAGMENT="$REPO_ROOT/seeds/operator-config/ssh/config.fragment"

GIT_DEST_DIR="$HOME/.config/git"
SSH_DEST="$HOME/.ssh/config"
SSH_KEY_ZHOUKALEX="$HOME/.ssh/id_ed25519_zhoukalex"

BEGIN_MARKER="# BEGIN: subagentceo/knowledge-engineering identity profiles (OIDENT1)"
END_MARKER="# END: subagentceo/knowledge-engineering identity profiles (OIDENT1)"

INC_NAMES=("alex" "admin" "zhoukalex" "jade")

# Validate sources
for name in "${INC_NAMES[@]}"; do
  if [[ ! -f "$GIT_SRC_DIR/$name.inc" ]]; then
    echo "missing source: $GIT_SRC_DIR/$name.inc (wrong cwd? expected repo root with seeds/operator-config/git/)" >&2
    exit 1
  fi
done
if [[ ! -f "$SSH_FRAGMENT" ]]; then
  echo "missing source: $SSH_FRAGMENT" >&2
  exit 1
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  log "DRY-RUN: no files will be written"
fi

# ---------------------------------------------------------------------------
# Step 1: render git .inc files
# ---------------------------------------------------------------------------
for name in "${INC_NAMES[@]}"; do
  src="$GIT_SRC_DIR/$name.inc"
  dest="$GIT_DEST_DIR/$name.inc"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "would copy $src -> $dest"
    if [[ -f "$dest" ]]; then
      diff -u "$dest" "$src" 2>&1 | head -20 || true
    else
      log "  (new file)"
    fi
  else
    mkdir -p "$GIT_DEST_DIR"
    cp "$src" "$dest"
    log "copied $src -> $dest"
  fi
done

# ---------------------------------------------------------------------------
# Step 2: merge SSH config fragment with markers
# ---------------------------------------------------------------------------
merge_ssh_config() {
  local existing="$1"
  local fragment="$2"
  local tmp
  tmp="$(mktemp)"

  if [[ -f "$existing" ]] && grep -qF "$BEGIN_MARKER" "$existing"; then
    # Replace block between BEGIN and END markers (inclusive)
    awk -v begin="$BEGIN_MARKER" -v end="$END_MARKER" -v frag="$fragment" '
      BEGIN { in_block = 0; printed_frag = 0 }
      {
        if (!in_block && index($0, begin) > 0) {
          in_block = 1
          while ((getline line < frag) > 0) print line
          close(frag)
          printed_frag = 1
          next
        }
        if (in_block) {
          if (index($0, end) > 0) { in_block = 0 }
          next
        }
        print
      }
    ' "$existing" > "$tmp"
  else
    # Append the fragment (with a blank line separator if existing is non-empty)
    if [[ -f "$existing" && -s "$existing" ]]; then
      cat "$existing" > "$tmp"
      printf '\n' >> "$tmp"
    else
      : > "$tmp"
    fi
    cat "$fragment" >> "$tmp"
  fi
  printf '%s' "$tmp"
}

if [[ "$DRY_RUN" -eq 1 ]]; then
  tmp_preview="$(merge_ssh_config "$SSH_DEST" "$SSH_FRAGMENT")"
  log "would write merged ~/.ssh/config ($(wc -l < "$tmp_preview" | tr -d ' ') lines)"
  if [[ -f "$SSH_DEST" ]]; then
    log "ssh config diff (existing -> planned):"
    diff -u "$SSH_DEST" "$tmp_preview" 2>&1 | head -40 || true
  else
    log "  (~/.ssh/config does not exist; would create)"
  fi
  rm -f "$tmp_preview"
else
  mkdir -p "$HOME/.ssh"
  chmod 700 "$HOME/.ssh" || true
  merged="$(merge_ssh_config "$SSH_DEST" "$SSH_FRAGMENT")"
  mv "$merged" "$SSH_DEST"
  chmod 600 "$SSH_DEST"
  log "updated $SSH_DEST (marker block in place)"
fi

# ---------------------------------------------------------------------------
# Step 3: ensure 4 includeIf rules in ~/.gitconfig
# ---------------------------------------------------------------------------
# Literal ~/ is intentional: git's includeIf gitdir:~/... is git-resolved at
# config-read time. Do NOT $HOME-expand here — that would bake this Mac's
# /Users/alexzh path into ~/.gitconfig and break portability across rotations.
# shellcheck disable=SC2088
declare -a INCLUDEIF_DIRS=("~/alex-jadecli" "~/admin-jadecli" "~/zhoukalex" "~/jade-jadecli")
# shellcheck disable=SC2088
declare -a INCLUDEIF_PATHS=("~/.config/git/alex.inc" "~/.config/git/admin.inc" "~/.config/git/zhoukalex.inc" "~/.config/git/jade.inc")

for i in "${!INCLUDEIF_DIRS[@]}"; do
  gitdir="${INCLUDEIF_DIRS[$i]}"
  want_path="${INCLUDEIF_PATHS[$i]}"
  key="includeif.gitdir/i:${gitdir}/.path"
  current="$(git config --global --get "$key" 2>/dev/null || true)"
  if [[ "$current" == "$want_path" ]]; then
    log "gitconfig: $key already set to $want_path (skip)"
    continue
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    if [[ -z "$current" ]]; then
      log "would run: git config --global --add \"$key\" \"$want_path\""
    else
      log "would run: git config --global --replace-all \"$key\" \"$want_path\"  (current=$current)"
    fi
  else
    if [[ -z "$current" ]]; then
      git config --global --add "$key" "$want_path"
      log "gitconfig: added $key=$want_path"
    else
      git config --global --replace-all "$key" "$want_path"
      log "gitconfig: replaced $key (was=$current, now=$want_path)"
    fi
  fi
done

# ---------------------------------------------------------------------------
# Step 4: --gen-keys (zhoukalex only)
# ---------------------------------------------------------------------------
if [[ -f "$SSH_KEY_ZHOUKALEX" ]]; then
  log "ssh key already present: $SSH_KEY_ZHOUKALEX (no-op)"
elif [[ "$GEN_KEYS" -eq 1 ]]; then
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "would run: ssh-keygen -t ed25519 -f $SSH_KEY_ZHOUKALEX -N '' -C 'zhoukalex@knowledge-engineering'"
  else
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh" || true
    ssh-keygen -t ed25519 -f "$SSH_KEY_ZHOUKALEX" -N "" -C "zhoukalex@knowledge-engineering"
    log "generated $SSH_KEY_ZHOUKALEX (public key at ${SSH_KEY_ZHOUKALEX}.pub)"
  fi
else
  log "WARNING: $SSH_KEY_ZHOUKALEX missing. Re-run with --gen-keys to generate, or create manually."
fi

# ---------------------------------------------------------------------------
log "OIDENT1: apply complete. Operator follow-ups: see docs/operator-runbooks/identity-inheritance.md §'Operator-only steps'."
