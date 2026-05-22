---
runbook: alloydb-omni-cloud-env
outcome: AlloyDB Omni 17.7 + Redis 7.0 available in every Claude Code cloud session within ~5s of session start, with no per-session image pull.
unblocks: Local-DB-backed agents that need Postgres + columnar engine + Redis
operator-manual-steps:
  - paste Setup script into the cloud environment's Setup script field
  - set ALLOYDB_OMNI_PASSWORD in the cloud env UI
outcome_id: OKWP2
---

# Operator runbook: AlloyDB Omni + Redis in the Claude Code cloud env

Bootstraps AlloyDB Omni (PostgreSQL 17.7, Debian Bookworm) and Redis
7.0 inside the
[Claude Code cloud environment](https://code.claude.com/docs/en/claude-code-on-the-web)
so every session has a local Postgres + Redis without per-session
image pulls.

Two-file split per the operator's decomposition:

- **Setup script** (cloud-env field, cached into env snapshot): does
  the slow image pull and creates the data dir.
- **SessionStart hook** (`.claude/settings.json` in this repo): runs
  `scripts/start_services.sh` on every session — fast container
  start, idempotent.

This is the pattern recommended by Claude Code's own cloud-env docs.

## Scope

- Ubuntu 24.04, runs as root
- < 5 min setup budget; image pull cached after first build
- Pinned image: `google/alloydbomni:17.7.0-bookworm` (won't drift)
- Redis 7.0 is pre-installed in the Claude Code cloud image; we just
  start it
- Data dir: `/var/lib/alloydb-omni/data` — only state initialized
  during Setup survives across sessions; runtime writes do not.

## 1. Setup script (paste into the cloud environment's Setup script field)

```bash
#!/bin/bash
set -euxo pipefail

# Pin: PG17.7 Debian Bookworm. Don't drift to :latest.
ALLOYDB_IMAGE="google/alloydbomni:17.7.0-bookworm"

# Cache the image into the env snapshot so per-session start is fast.
docker pull "${ALLOYDB_IMAGE}"

# Data dir lives on the VM rootfs; survives env-cache snapshot ONLY if
# created during setup. Anything written at session runtime is lost on
# next session start.
mkdir -p /var/lib/alloydb-omni/data
chmod 700 /var/lib/alloydb-omni/data

# Redis 7.0 is already pre-installed per Claude Code on the web image.
# Confirm it's present; fail loudly if not.
command -v redis-server >/dev/null
redis-server --version

# Sanity: docker compose exists, postgres client exists.
docker --version
command -v psql >/dev/null
```

## 2. SessionStart hook (already committed at `.claude/settings.json`)

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/scripts/start_services.sh"
          }
        ]
      }
    ]
  }
}
```

## 3. Service-start script (already committed at `scripts/start_services.sh`)

Source of truth: [`scripts/start_services.sh`](../../scripts/start_services.sh).

The script is `chmod +x` and SessionStart fires it on every
`startup` and `resume`. The `CLAUDE_CODE_REMOTE` guard makes it a
no-op on local sessions, so the same hook is safe on the operator's
Mac.

## 4. Environment variable to add in the cloud env UI

```
ALLOYDB_OMNI_PASSWORD=<strong password you generate>
```

Visible to anyone with edit access to the cloud env config. The
variable is added to the canonical env-vars contract at
[`docs/operator-runbooks/cloud-env-vars-contract.md`](./cloud-env-vars-contract.md).

## Future — Postgres 18

The operator registered for AlloyDB Omni PG18 access via the
[AlloyDB Omni registration form](https://forms.gle/XyezU9NSPTwQKRec9)
and the [RPM orchestrator preview form](https://forms.gle/zxuHekMtV67Bw9Av9).
Once access is granted, bump `ALLOYDB_IMAGE` in **both** the Setup
script and `scripts/start_services.sh` from `17.7.0-bookworm` to the
PG18 tag. The SessionStart hook itself does not change.

## Citations

- [`vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md`](../../vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md) — cloud-env Setup script + env-var fields
- [`vendor/anthropics/code.claude.com/docs/en/settings.md`](../../vendor/anthropics/code.claude.com/docs/en/settings.md) — `.claude/settings.json` SessionStart hook spec
- [`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](../decisions/2026-05-16-polyrepo-sibling-pattern.md) — eventual home is `subagentceo/knowledge-work-profiles`; lives here today
- Docker Hub: https://hub.docker.com/r/google/alloydbomni
