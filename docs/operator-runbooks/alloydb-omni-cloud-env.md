---
runbook: alloydb-omni-cloud-env
outcome: Cloud sessions connect to AlloyDB Omni + Redis on wsl-ubuntu2604-jadecli (100.112.152.5) via Cloudflare Tunnel. DATABASE_URL + REDIS_URL are set in the cloud env UI; start_services.sh publishes them to the session env.
unblocks: All DB-backed cloud agents; eliminates GCP registry dependency and per-session schema loads
operator-manual-steps:
  - set DATABASE_URL and REDIS_URL in the cloud env UI pointing at Cloudflare Tunnel endpoints
  - run WSL setup steps (one-time): see wsl-backend-setup.md
outcome_id: OWSL1
supersedes: OKWP2
---

# Operator runbook: AlloyDB Omni + Redis in the Claude Code cloud env

## 2026-06-17 update — WSL persistent backend supersedes PG16 (OWSL1, READ FIRST)

**The 2-context model below (OKWP2) is superseded by ADR OWSL1.**

`wsl-ubuntu2604-jadecli` (Tailscale `100.112.152.5`) now runs AlloyDB Omni + Redis
persistently in Docker. Cloud sessions connect via **Cloudflare Tunnel**; Mac sessions
connect via Tailscale directly. `start_services.sh` no longer starts local PG16/Redis —
it reads `DATABASE_URL`/`REDIS_URL` from the cloud env UI and publishes them to
`CLAUDE_ENV_FILE`.

**Cloud env UI variables to set:**

| Variable | Value |
|---|---|
| `DATABASE_URL` | `postgres://postgres:<pw>@<tunnel-hostname>/ke` |
| `REDIS_URL` | `redis://<tunnel-hostname>:6379` |

`ALLOYDB_OMNI_PASSWORD` is no longer needed in the cloud env — credentials travel inside `DATABASE_URL`.

See: [`docs/decisions/2026-06-17-wsl-tailscale-persistent-backend.md`](../decisions/2026-06-17-wsl-tailscale-persistent-backend.md)

---

## 2026-06-14 correction — two runtime contexts (OKWP2, superseded)

> ⚠ Retained for historical reference. The PG16 fallback in start_services.sh has been removed. If DATABASE_URL is absent, the cloud session degrades gracefully.

Bootstraps AlloyDB Omni (PostgreSQL 18, Debian) and Redis 7.0 inside the
[Claude Code cloud environment](https://code.claude.com/docs/en/claude-code-on-the-web)
so every session has a local Postgres + Redis without per-session image pulls.

**Image registry:** `gcr.io/alloydb-omni/alloydbomni:18` (Debian) or
`gcr.io/alloydb-omni/alloydbomni:18-ubi9` (RHEL/UBI9). Docker Hub
(`google/alloydbomni`) carried PG17; PG18 is gcr.io-only (private invite
programme, `alloydb-omni-contact@google.com`).

## 2026-06-14 correction — two runtime contexts (archived)

The original `docker run gcr.io/alloydb-omni/...` design in `start_services.sh`
**cannot run inside a Claude Code cloud session.** Verified empirically:

- The cloud session has **no persistent docker daemon** (`/var/run/docker.sock`
  is absent; `service docker start` fails on a `ulimit` line). Starting `dockerd`
  by hand gives an **empty** image store — the env's "connected" `alloydbomni:18`
  image is not materialised on the in-session daemon.
- `gcr.io/alloydb-omni` is a **private** registry (invite-only), and Docker Hub
  rate-limits unauthenticated per-session pulls. So neither the private image nor
  the public `postgres:16` fallback can be pulled reliably at session start.

The fix splits the world into two contexts:

| | Cloud session (this repo's hook) | Operator Docker Desktop host |
| :-- | :-- | :-- |
| Postgres | **system PostgreSQL 16** (`service postgresql start`) — pre-installed, no docker | **AlloyDB Omni 18** (`e2m-alloydb`, `alloydb-omni/alloydbomni:18`, `:5432`) + `alloydb-1` (`google/alloydbomni:15`, `:5433`) |
| Redis | system **Redis 7** (`infra/redis/redis.conf`) | `e2m-redis` (`redis/redis-stack`, `:6379`) |
| dw schema | loaded by `start_services.sh` into db `ke` (plain PG; no columnar engine) | loaded host-side |
| Reached via | direct, in-session | **MCP_DOCKER** gateway connector (loads at session start; toggle in Connectors) |

`scripts/start_services.sh` now targets the **cloud** context only: it starts
system Redis + PG16, creates db `ke`, loads the `dw` schema (idempotent,
sentinel-guarded on `dw.dim_ecosystem_artifact`), runs `npm ci` if
`node_modules` is missing, publishes `DATABASE_URL`/`REDIS_URL` to
`$CLAUDE_ENV_FILE`, and starts the A2A server. The `dw` DDL is plain PostgreSQL
and runs unchanged on PG16 — the AlloyDB columnar engine is the only feature
lost in-cloud.

**To drive the real AlloyDB Omni 18**, open a session with the **MCP_DOCKER**
connector enabled and use its gateway tools (container exec / code-mode) against
the host `e2m-alloydb` container. The connector binds at session start, so
toggling it only takes effect in a **new** session.

`ALLOYDB_OMNI_PASSWORD` is therefore **no longer required** for the cloud start
sequence; it remains relevant only if you reinstate a host/tunnelled AlloyDB
endpoint via `DATABASE_URL` (a session/cloud-UI override always wins over the
PG16 default).

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
