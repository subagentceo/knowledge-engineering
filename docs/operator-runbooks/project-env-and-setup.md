---
runbook: project-env-and-setup
outcome: Version-controlled, non-secret project environment + setup that loads identically in Claude Code CLI and Claude Code on the web, with secrets kept out of git.
operator-manual-steps: Set secrets per the contract (cloud-env UI for web; Keychain/.dev.vars locally). Non-secret config needs no manual step — it auto-loads.
---

# Operator runbook: project env + setup (CLI and web)

This documents how the repo's environment variables and setup are version-controlled
so a Claude session — **on the operator's Mac CLI or on the web** — comes up with the
same non-secret config, without re-pasting it into a UI each time.

It complements (does not replace) [`cloud-env-vars-contract.md`](./cloud-env-vars-contract.md)
(the secret/binding matrix) and [`alloydb-omni-cloud-env.md`](./alloydb-omni-cloud-env.md)
(the AlloyDB setup-script/hook split).

## The three layers

| Layer                 | File (committed)                                | Scope                               | Holds                                                                                          |
| --------------------- | ----------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| `settings.json` `env` | `.claude/settings.json` → `"env"`               | every session, CLI + web            | static non-secret config, applied before hooks run                                             |
| SessionStart env hook | `scripts/load_project_env.sh` + `.env.defaults` | every session, CLI + web            | the same non-secret config, projected into `$CLAUDE_ENV_FILE` so it reaches every Bash command |
| Setup entry point     | `setup.sh`                                      | manual / cloud "Setup script" field | dependency install + a **secret presence check that never prints values**                      |

Two layers carry the _same_ non-secret values on purpose: the `settings.json` `env`
block applies them to the session process, and the hook guarantees they also land in
`$CLAUDE_ENV_FILE` (which the `env` block alone does not populate) so plain `bash`
steps and subprocesses see them. Both are committed, so CLI and web are identical.

## What is and isn't version-controlled

- **Committed (non-secret):** `.env.defaults` — `NEON_PROJECT_ID`, `CLOUDFLARE_ACCOUNT_ID`,
  `CLOUDFLARE_WORKER_NAME`, `IS_SANDBOX`, and the `KE_*` path/mode vars. These are routing
  ids and flags, not credentials. Editing `.env.defaults` changes every future session.
- **NOT committed (secret):** `ALLOYDB_OMNI_PASSWORD`, every `*_API_KEY` / `*_OAUTH_TOKEN`,
  `NEON_DATABASE_URL`. There is no cloud secrets store yet, so these stay in the
  Claude-Code-on-the-web **Environment variables** UI (web) and the macOS Keychain /
  `infra/cloudflare/.dev.vars` (local). `.env` and `.env.local` are gitignored.
- **Forbidden anywhere:** `ANTHROPIC_API_KEY` (OAuth-only invariant, `src/oauth/token.ts`).
  `setup.sh` asserts it is unset and exits non-zero if found.

## Override semantics

`scripts/load_project_env.sh` **never overwrites a value already set in the environment**.
So a value set in the cloud-env UI, the Keychain, or the shell wins over the committed
default. This lets the operator pin a different `NEON_PROJECT_ID` (e.g. a scratch branch)
for one session without editing `.env.defaults`.

## How it works on the web specifically

`$CLAUDE_ENV_FILE` is the documented mechanism for a SessionStart hook to persist env
into a web session (see `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md`
and the bundled `session-start-hook` skill). The hook appends `export KEY=value` lines to
it; Claude Code sources that file for every subsequent Bash command. Because the hook is
committed and runs on `startup|resume`, a fresh web session needs **zero** manual env paste
for the non-secret layer — only secrets still require the UI field.

## Quick start

- **Local (Mac):** `./setup.sh` — installs deps, checks which secrets are present (without
  printing them), confirms `.env.defaults` is loaded. `./setup.sh --check` skips install.
- **Web:** paste `./setup.sh` (or the AlloyDB setup script per its runbook) into the cloud
  env **Setup script** field; set secrets in the **Environment variables** field. Non-secret
  config loads automatically via the committed hook.

## Adding a new non-secret var

1. Add `KEY=value` to `.env.defaults` (no quotes, no `export`).
2. If a consumer needs it before hooks run, also add it to `.claude/settings.json` `"env"`.
3. If it's actually a secret, do NOT do either — add a row to `cloud-env-vars-contract.md`
   and set it in the cloud-env UI / Keychain instead.
