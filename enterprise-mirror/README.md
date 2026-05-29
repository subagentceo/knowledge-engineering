# enterprise-mirror

Version-controlled copy of the tooling that runs the **subagentmcp GitHub
Enterprise mirror** (10 orgs, 239 repos). The mirror tree itself lives at
`/Users/alexzh/subagentmcp/` on the operator's Mac and is intentionally *not* a
git repo — so this directory is its source of truth for the scripts, hooks, and
container config. Committed here under `knowledge-engineering` (the enterprise
R&D repo) so it survives the Max-account rotation and can be reproduced on any
machine.

## Contents

| Path | What it is |
|---|---|
| `setup.sh` | Entry point on the **Mac** host. Ensures `gh` (apt on Linux / brew on Mac), verifies the `admin-jadecli`/`alex-jadecli` aliases, prints the enterprise→orgs→repos drill-down, and with `--dev` brings up the devcontainer stack. |
| `bootstrap-wsl.sh` | Entry point on **Windows 11 / WSL Ubuntu-26.04**. Installs tooling via apt, authenticates, **re-clones all 200+ repos** into `~/subagentmcp/{org}/{repo}` (fresh from GitHub, not a copy of stale history), and drops in the hook + skill. `--no-clone` for tooling/auth only. |
| `.claude/hooks/session-start.sh` | SessionStart hook: prints the entry point + active gh alias, and warns when `enterprise.json` drifts past the 7-day verification SLA. |
| `.meta/fetch.sh` | Re-enumerates orgs via GraphQL and pulls every repo into `.meta/<org>.repos.json` (under the `admin-jadecli` token). |
| `.meta/build.py` | Rebuilds `enterprise.json` from the raw `.meta/*.repos.json` files. Verified byte-for-byte faithful to the existing manifest. |
| `.devcontainer/` | Debian-12 devcontainer (`gh` via apt) + **redis 7.0** + **postgres 16** Compose sidecars. Works under Docker Desktop's WSL2 backend on Windows. |

The companion `/refresh-manifest` skill lives in this repo's `.claude/skills/refresh-manifest/`.

## Reproduce on a new machine

**Mac:** `./setup.sh` (host gh already on brew) — or `./setup.sh --dev` for the container stack.

**Windows 11 / WSL Ubuntu-26.04:**
```bash
# inside a fresh WSL Ubuntu shell
./bootstrap-wsl.sh                      # clones into ~/subagentmcp
cd ~/subagentmcp && .meta/fetch.sh && python3 .meta/build.py
```

## Notes / caveats

- **Auth is interactive.** `bootstrap-wsl.sh` runs `gh auth login` for any missing
  alias — no credentials are stored in these files. `admin-jadecli` must carry
  `admin:enterprise` scope (the only alias that can query `enterprise(slug:…)`).
- **Docker premium org** (admin@/alex@jadecli.com) login is a manual `docker login`
  step — deliberately not baked into the Compose file.
- **redis 7.0 + postgres 16** run as container sidecars, not host installs.
- The clone step is **idempotent**: existing repos are `git pull --ff-only`, missing
  ones are cloned. Re-runnable to refresh a WSL mirror.
