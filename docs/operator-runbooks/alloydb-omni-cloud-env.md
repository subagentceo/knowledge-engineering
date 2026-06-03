---
runbook: alloydb-omni-cloud-env
outcome: AlloyDB Omni PG18 + Redis 7.0 available in every Claude Code cloud session within ~5s of session start, with no per-session image pull.
unblocks: Local-DB-backed agents that need Postgres + columnar engine + Redis
operator-manual-steps:
  - paste Setup script into the cloud environment's Setup script field
  - set ALLOYDB_OMNI_PASSWORD in the cloud env UI
outcome_id: OKWP2
---

# Operator runbook: AlloyDB Omni + Redis in the Claude Code cloud env

Bootstraps AlloyDB Omni (PostgreSQL 18, Debian) and Redis 7.0 inside the
[Claude Code cloud environment](https://code.claude.com/docs/en/claude-code-on-the-web)
so every session has a local Postgres + Redis without per-session image pulls.

**Image registry:** `gcr.io/alloydb-omni/alloydbomni:18` (Debian) or
`gcr.io/alloydb-omni/alloydbomni:18-ubi9` (RHEL/UBI9). Docker Hub
(`google/alloydbomni`) carried PG17; PG18 is gcr.io-only (private invite
programme, `alloydb-omni-contact@google.com`).

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
- Image: `gcr.io/alloydb-omni/alloydbomni:18` (PG18 Debian; won't drift to PG19)
- Redis 7.0 is pre-installed in the Claude Code cloud image; we just
  start it
- Data dir: `/var/lib/alloydb-omni/data` — only state initialized
  during Setup survives across sessions; runtime writes do not.
- Sessions without `ALLOYDB_OMNI_PASSWORD` skip AlloyDB startup and
  degrade gracefully (Redis still starts; non-AlloyDB features work).

## 1. Setup script (paste into the cloud environment's Setup script field)

```bash
#!/bin/bash
set -euxo pipefail

# PG18 Debian image from gcr.io (private invite; Docker Hub had PG17 only).
# :18 tracks the latest PG18 patch via gcr.io digest; won't drift to PG19.
ALLOYDB_IMAGE="gcr.io/alloydb-omni/alloydbomni:18"

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

# Sanity: docker + postgres client present.
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

## PG18 invite details

Access granted via the AlloyDB Omni private invite programme. Image locations:

| Variant | Tag |
|---|---|
| Debian (cloud env) | `gcr.io/alloydb-omni/alloydbomni:18` |
| RHEL/UBI9 | `gcr.io/alloydb-omni/alloydbomni:18-ubi9` |

Contact: `alloydb-omni-contact@google.com`

PG18 notable additions relevant to this chassis: `MERGE ... RETURNING`,
improved logical replication, faster `ANY`/`ALL` planning, extended columnar
engine for mixed OLAP/OLTP. pgvector behaviour is unchanged from PG17.

## Citations

- [`vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md`](../../vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md) — cloud-env Setup script + env-var fields
- [`vendor/anthropics/code.claude.com/docs/en/settings.md`](../../vendor/anthropics/code.claude.com/docs/en/settings.md) — `.claude/settings.json` SessionStart hook spec
- [`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`](../decisions/2026-05-16-polyrepo-sibling-pattern.md) — eventual home is `subagentceo/knowledge-work-profiles`; lives here today
- gcr.io registry: `gcr.io/alloydb-omni/alloydbomni` (PG18+; supersedes Docker Hub)
