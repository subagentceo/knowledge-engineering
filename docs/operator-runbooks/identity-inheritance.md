# Runbook: identity inheritance for the 3-account rotation (OIDENT1)

@cite CLAUDE.md
@cite vendor/git/git-scm.com/docs/git-config.md
@cite vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md
@cite seeds/operator-config/git/alex.inc
@cite seeds/operator-config/ssh/config.fragment
@cite scripts/apply-identity-profiles.sh

## Why this exists

The operator (zhouk.alex@gmail.com) rotates between three GitHub identities backing three Claude Max plans on a 5-hour cap cycle: `alex-jadecli` (primary, all third-party integrations route here, full scope), `admin-jadecli` (2nd slot, admin:enterprise scope), and `zhoukalex` (3rd slot, 5x plan). See `CLAUDE.md` — "Account inventory" and "Rotation protocol" — for the canonical inventory. A legacy alias `jade-jadecli` is retained for old commit authorship only; it is NOT in the `subagentceo` org and is NOT in the active rotation.

The previous local setup had four peer `.inc` files on disk (one per identity) with no inheritance — every time a scope, signing key, or git option had to change for "all rotation identities," the operator had to edit it in three places and remember not to touch the legacy file. The new setup makes `alex.inc` the BASE: it carries everything common (signing config, default protocol, third-party-integration scope, push defaults, URL rewrites, etc.). The other two active identities (`admin.inc`, `zhoukalex.inc`) `[include]` `alex.inc` and override only the things that genuinely differ per identity (the user.name, user.email, signing key fingerprint, and SSH host alias). Any scope added to `alex.inc` flows to admin and zhoukalex automatically. `jade.inc` is deliberately left outside the chain.

## How inheritance works

The `[include]` directive in git-config is unconditional file inclusion — values from the included file are loaded first, then the including file can override individual keys. Conditional inclusion (`includeIf "gitdir:..."`) in `~/.config/git/config` is what scopes each `.inc` to its working tree under `~/alex-jadecli/`, `~/admin-jadecli/`, `~/zhoukalex/`, or `~/jade-jadecli/`.

```
alex.inc  (base — full scope, third-party-integration root)
   ↑
   ├── admin.inc      [include] path = ./alex.inc   → identity override only
   └── zhoukalex.inc  [include] path = ./alex.inc   → identity override only

jade.inc (legacy, NOT in chain — kept for old commits' authorship only)
```

Source-of-truth refs:

- **`vendor/git/git-scm.com/docs/git-config.md`** §"Includes" / §"Conditional Includes" — **load-bearing spec** for this whole pattern. Verbatim: *"Included configuration files are processed as if their contents were directly present at the location of the include directive. Relative paths for included files are resolved relative to the configuration file containing the include directive."* This is what makes `[include] path = ./alex.inc` from inside `admin.inc` an officially documented inheritance mechanism, not a hack.
- `vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97` — "Using GitHub CLI with multiple accounts" + the `gh auth switch` pattern. **Note:** this cite is for the *operator's `gh auth login` step* below; it does NOT document the git `[includeIf]` semantics — that's the previous bullet.
- `ssh_config(5)` §"Host", "IdentityFile", "IdentitiesOnly" — `Host github.com-<alias>` lets each remote pick its own keypair without `ssh-agent` collision.

## What gets applied where

The repo holds the source-of-truth profile fragments under `seeds/operator-config/`. The render script (`scripts/apply-identity-profiles.sh`, owned by sub-agent C) projects them onto the operator's Mac:

| Repo source | Mac destination | Purpose |
|---|---|---|
| `seeds/operator-config/git/alex.inc` | `~/.config/git/alex.inc` | Loaded when cwd matches `~/alex-jadecli/*` |
| `seeds/operator-config/git/admin.inc` | `~/.config/git/admin.inc` | Loaded when cwd matches `~/admin-jadecli/*` |
| `seeds/operator-config/git/zhoukalex.inc` | `~/.config/git/zhoukalex.inc` | Loaded when cwd matches `~/zhoukalex/*` (NEW) |
| `seeds/operator-config/git/jade.inc` | `~/.config/git/jade.inc` | Loaded when cwd matches `~/jade-jadecli/*` (legacy) |
| `seeds/operator-config/ssh/config.fragment` | `~/.ssh/config` (merged inside marker block) | Host `github.com-{alex,admin,zhoukalex,jade}` aliases |

The SSH fragment is merged inside a `# >>> knowledge-engineering managed >>>` / `# <<<` marker block so the apply script never clobbers operator hand edits outside the block.

## Apply procedure

1. From the repo root, dry-run the renderer to confirm the proposed changes:
   ```bash
   bash scripts/apply-identity-profiles.sh --dry-run
   ```
   This prints a diff against the current `~/.config/git/*.inc` and the marker block of `~/.ssh/config`. No files are touched.
2. Re-run without `--dry-run` to write:
   ```bash
   bash scripts/apply-identity-profiles.sh
   ```
   Existing `.inc` files are backed up to `~/.config/git/.bak-<UTC-timestamp>/` before being overwritten.
3. (NEW for zhoukalex) Generate the SSH keypair if it does not exist:
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_zhoukalex -N "" -C "zhoukalex@knowledge-engineering"
   ```
   The apply script will do this automatically if `--gen-keys` is passed.
4. The operator must now do two things in a browser — neither can be automated from the CLI:
   - Visit `https://github.com/settings/keys` while logged in as **zhoukalex**, click "New SSH key", and paste the contents of `~/.ssh/id_ed25519_zhoukalex.pub`.
   - Run `gh auth login -u zhoukalex --git-protocol https -h github.com -w` and follow the device-code flow that opens in the browser; complete it while the **zhoukalex** GitHub session is the active one.
5. Verify the keypair is attached to the right GitHub account:
   ```bash
   ssh -T -i ~/.ssh/id_ed25519_zhoukalex git@github.com
   ```
   This should print `Hi zhoukalex! You've successfully authenticated, but GitHub does not provide shell access.` If it prints **any** other identity, the pubkey was added to the wrong GitHub account in step 4 — delete it from the wrong account, then repeat step 4 against the correct browser session.

## Operator-only steps (I cannot do these)

Two browser actions are pure-human and have no CLI equivalent — the apply script will halt with an instruction message if it detects they are pending:

1. **Add the new SSH pubkey to zhoukalex's GitHub account** (`https://github.com/settings/keys` while signed in as zhoukalex).
2. **Complete the `gh auth login` device-code flow for zhoukalex** — the device-code prompt requires the operator to type the 8-character code into a browser session signed in as zhoukalex.

Optional, deferred:

- Regenerate `id_ed25519_admin` and add it to `admin-jadecli`'s GitHub account if the operator wants clean per-identity SSH. Currently `id_ed25519_admin` is registered against `alex-jadecli`'s account on GitHub — this is pragmatic since `alex-jadecli` carries `admin:org` scope anyway and SSH-as-alex still pushes commits authored as admin. The trade-off is documented in `seeds/memory/heartbeat/decisions.md` under the OIDENT1 entry.

## Citations

- **`vendor/git/git-scm.com/docs/git-config.md`** §"Includes" / §"Conditional Includes" — **the** spec for `[include]` and `[includeIf]`; the citation root for the inheritance pattern this runbook documents. Added 2026-05-18 in OIDENT2 to correct OIDENT1's miscited rationale.
- `vendor/docs-github/docs.github.com/en/github-cli/github-cli/quickstart.md:93-97` — multi-account `gh auth switch` pattern. Cited specifically for the operator's `gh auth login -u <user>` step, NOT for the git-config inheritance semantics.
- `ssh_config(5)` §"Host", "IdentityFile", "IdentitiesOnly" — host-alias-per-keypair pattern.
- `CLAUDE.md` (this repo) — identity inventory + rotation protocol.
- `seeds/operator-config/git/*.inc` — source-of-truth git profile fragments.
- `seeds/operator-config/ssh/config.fragment` — source-of-truth SSH host aliases.
- `scripts/apply-identity-profiles.sh` — renderer + conformance entry point.
