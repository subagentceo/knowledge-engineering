---
date: 2026-05-16
status: future-followup
owner: operator
outcome_id: OKWP-FUTURE-1
---

# Future follow-up — AlloyDB Omni + Redis cloud-env bootstrap

Not landed in PR string. Captured here verbatim from operator so the
decomposition + scripts are version-controlled and discoverable when
work resumes.

## When to land this

Either:

1. Operator's PostgreSQL 18 AlloyDB Omni registration is approved
   (forms below) and we pin to `:18.x-bookworm` instead of `:17.7.0`.
2. Or operator decides the PG17 version is good enough and lands the
   scripts as-is.

Either way, the **target home** for the artifacts is
`subagentceo/knowledge-work-profiles` per the polyrepo sibling ADR
(`docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`). The cloud
env's Setup script field references the bootstrap script via
`$KWP_ROOT` or by cloning the profiles repo at setup time.

## Decomposition (verbatim from operator)

- Scope: Ubuntu 24.04, runs as root, < 5 min setup budget, image
  pull cached after first build.
- Pinned image: `google/alloydbomni:17.7.0-bookworm` (most specific
  tag, won't drift).
- Redis 7.0 already pre-installed per Claude's docs — no install,
  just start.
- Two-file split: Setup script (cloud env, cached) does the slow
  image pull. SessionStart hook (in repo, runs every session)
  starts services. Per the pattern Claude's own docs recommend.
- Data persistence: data dir in `/var/lib/alloydb-omni/data`, only
  initialized state survives across sessions; runtime writes do not.

## Artifact 1 — Setup script (cloud env field)

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

## Artifact 2 — SessionStart hook (`.claude/settings.json`)

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

## Artifact 3 — `scripts/start_services.sh` (chmod +x)

```bash
#!/bin/bash
set -euxo pipefail

# Only run in cloud; SessionStart hooks also run locally otherwise.
if [ "${CLAUDE_CODE_REMOTE:-false}" != "true" ]; then
  exit 0
fi

ALLOYDB_IMAGE="google/alloydbomni:17.7.0-bookworm"
ALLOYDB_NAME="alloydb-omni"
ALLOYDB_DATA="/var/lib/alloydb-omni/data"

# Required env var, set in the cloud environment config.
: "${ALLOYDB_OMNI_PASSWORD:?ALLOYDB_OMNI_PASSWORD must be set in environment vars}"

# Redis 7.0 (pre-installed). Idempotent.
service redis-server start || true

# AlloyDB Omni: start existing container if present, else create.
if docker inspect "${ALLOYDB_NAME}" >/dev/null 2>&1; then
  docker start "${ALLOYDB_NAME}"
else
  docker run -d \
    --name "${ALLOYDB_NAME}" \
    -e POSTGRES_PASSWORD="${ALLOYDB_OMNI_PASSWORD}" \
    -e PGDATA=/var/lib/postgresql/data \
    -v "${ALLOYDB_DATA}:/var/lib/postgresql/data" \
    -p 5432:5432 \
    --shm-size=1g \
    "${ALLOYDB_IMAGE}"
fi

# Wait for Postgres to accept connections (max 60s).
for i in $(seq 1 60); do
  if docker exec "${ALLOYDB_NAME}" pg_isready -U postgres -q; then
    break
  fi
  sleep 1
done
docker exec "${ALLOYDB_NAME}" pg_isready -U postgres

# One-time columnar-engine bootstrap, idempotent via marker file.
MARKER="${ALLOYDB_DATA}/.columnar_engine_enabled"
if [ ! -f "${MARKER}" ]; then
  docker exec "${ALLOYDB_NAME}" psql -U postgres -c \
    "ALTER SYSTEM SET google_columnar_engine.enabled = 'on';"
  docker restart "${ALLOYDB_NAME}"
  for i in $(seq 1 60); do
    docker exec "${ALLOYDB_NAME}" pg_isready -U postgres -q && break
    sleep 1
  done
  docker exec "${ALLOYDB_NAME}" psql -U postgres -c \
    "CREATE EXTENSION IF NOT EXISTS google_columnar_engine;"
  touch "${MARKER}"
fi
```

## Artifact 4 — Cloud env environment variable

```
ALLOYDB_OMNI_PASSWORD=<strong password; visible to anyone with edit
                       access to the cloud env config>
```

## Pending — Postgres 18 access

Operator registered, waiting on approval.

- AlloyDB Omni registration form: https://forms.gle/XyezU9NSPTwQKRec9
- RPM orchestrator preview form: https://forms.gle/zxuHekMtV67Bw9Av9

Once approved, bump `ALLOYDB_IMAGE` to `google/alloydbomni:18.x-bookworm`
in both Setup and start_services scripts.

## Citations

- Docker Hub: https://hub.docker.com/r/google/alloydbomni
- Claude Code cloud env reference:
  `vendor/anthropics/code.claude.com/docs/en/claude-code-on-the-web.md`
- SessionStart hook docs:
  `vendor/anthropics/code.claude.com/docs/en/settings.md`
- ADR for sibling repo home:
  `docs/decisions/2026-05-16-polyrepo-sibling-pattern.md`
