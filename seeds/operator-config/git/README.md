# operator-config/git — git includeIf templates

Canonical templates for the operator's per-identity git configs. These files are
the source of truth; the active configs at `~/.config/git/*.inc` are derived
from them by `scripts/apply-identity-profiles.sh` (authored by sub-agent
OIDENT1.C).

## Inheritance model

- **`alex.inc`** is the BASE. `alex-jadecli` is the primary identity and holds
  the full third-party integration scope (OAuth tokens, SSH URL rewrites, etc.).
- **`admin.inc`** and **`zhoukalex.inc`** each begin with `[include] path =
  ./alex.inc` so any scope added to `alex.inc` flows down automatically. Their
  own `[user]` / `[core]` / `[url]` blocks override to set the per-identity
  name, email, SSH key, and URL rewrite host.
- **`jade.inc`** is LEGACY (not in the `subagentceo` org) and deliberately does
  NOT inherit from `alex.inc`. Scope stays minimal.

## Apply

Run `scripts/apply-identity-profiles.sh` (OIDENT1.C) to materialize these into
`~/.config/git/`. Do not hand-edit `~/.config/git/*.inc`; edit here and re-apply.

## Operator post-apply (browser-only, manual)

1. Register the `zhoukalex` SSH public key at https://github.com/settings/keys
   under the `zhoukalex` account.
2. Run `gh auth login -u zhoukalex` to authorize the gh CLI for the third
   rotation slot.
