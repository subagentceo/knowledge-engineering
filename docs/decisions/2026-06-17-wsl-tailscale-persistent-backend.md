---
id: OWSL1
date: 2026-06-17
status: accepted
supersedes: OKWP2
---

# ADR OWSL1 — WSL + Tailscale as the persistent storage backend (GCP-free)

## Context

The previous model (OKWP2, 2026-06-14) split the world into two contexts:

- **Cloud session**: system PostgreSQL 16 + Redis 7 started in-session from pre-installed binaries.
- **Operator Docker Desktop host**: AlloyDB Omni 18 via `gcr.io/alloydb-omni/alloydbomni:18` (private GCP registry, invite-only).

Two problems surfaced:

1. The GCP dependency (`gcr.io`) requires acceptance into a private invite programme and creates a hard external dependency on Google Cloud infrastructure.
2. Per-session schema loads against an ephemeral PG16 instance are expensive and stateless — work is lost between sessions.

The operator pays for: Docker Premium, Tailscale (trial), Cloudflare Workers, GitHub Enterprise, claude.ai, Google Workspace, Outlook 365 Premium. No GCP subscription. The AlloyDB Omni binary itself is self-hosted and GCP-free; only the registry is the dependency.

## Decision

`wsl-ubuntu2604-jadecli` (Tailscale IP `100.112.152.5`) runs AlloyDB Omni + Redis **persistently** in Docker. Storage survives reboots on the WSL VM filesystem.

Cloud sessions connect via **Cloudflare Tunnel** (`cloudflared` daemon on the WSL machine, private tunnel — no public exposure). Mac and other Tailscale-joined machines connect via the Tailscale IP directly.

`scripts/start_services.sh` no longer starts any local Postgres or Redis. It reads `DATABASE_URL` and `REDIS_URL` from the cloud env UI and publishes them to `CLAUDE_ENV_FILE`. If the vars are absent the session degrades gracefully — `npm run verify` still passes; only A2A server and dw schema features are skipped.

## Architecture

```
┌─────────────────────────────────────────────────┐
│  wsl-ubuntu2604-jadecli  (100.112.152.5 Tailscale) │
│                                                   │
│  Docker:                                          │
│    alloydb-omni  → :5432 (AlloyDB Omni PG18)      │
│    redis-stack   → :6379 (Redis 7 + JSON + Search)│
│    cloudflared   → private Cloudflare Tunnel      │
│                    tcp/5432 → alloydb.ke.jadecli  │
│                    tcp/6379 → redis.ke.jadecli    │
└─────────────────────────────────────────────────┘
         │ Tailscale                │ Cloudflare Tunnel
         ▼                         ▼
 alexs-macbook-pro           Claude Code cloud session
 (100.71.204.112)            DATABASE_URL=postgres://...@alloydb.ke.jadecli/ke
 direct :5432/:6379           REDIS_URL=redis://redis.ke.jadecli
```

## AlloyDB Omni image

The PG18-compatible self-hosted image is `ghcr.io/microsoft/pg_durable:pg18` (GitHub Container Registry, public) paired with AlloyDB Omni's Debian base. This avoids the `gcr.io` private registry entirely.

Reference: `https://github.com/microsoft/pg_durable` (issue #504 in this repo).

## Operator setup steps (WSL machine, one-time)

These steps are run by the operator directly on `wsl-ubuntu2604-jadecli`:

```bash
# 1. Start AlloyDB Omni + Redis in Docker
docker run -d --name alloydb-omni --restart=always \
  -e POSTGRES_PASSWORD="${ALLOYDB_PASSWORD}" \
  -v alloydb-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  ghcr.io/microsoft/pg_durable:pg18   # or alloydb-omni equivalent

docker run -d --name redis-stack --restart=always \
  -v redis-data:/data \
  -p 6379:6379 \
  redis/redis-stack:latest

# 2. Create ke database
docker exec alloydb-omni psql -U postgres -c "CREATE DATABASE ke;"

# 3. Load dw schema (run from knowledge-engineering checkout)
docker exec -i alloydb-omni psql -U postgres -d ke < infra/postgres/init/...

# 4. Install cloudflared and create tunnels
# See: docs/operator-runbooks/wsl-backend-setup.md
```

## Cloud env UI variables to set

In the Claude Code cloud environment UI → Environment variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `postgres://postgres:<pw>@<tunnel-hostname>/ke` |
| `REDIS_URL` | `redis://<tunnel-hostname>:6379` |

Both are non-secret routing values (Cloudflare Tunnel URLs are not guessable but are not credentials). `ALLOYDB_OMNI_PASSWORD` is no longer needed in the cloud env — the connection string embeds credentials already.

## Consequences

- **Positive**: No GCP dependency. State persists across cloud sessions. Schema loads happen once on the WSL machine, not every session.
- **Positive**: Mac sessions connect directly via Tailscale (`100.112.152.5:5432`) without any tunnel overhead.
- **Neutral**: Cloud sessions require `DATABASE_URL`/`REDIS_URL` to be pre-set; if not set, they degrade gracefully rather than failing hard.
- **Neutral**: `ALLOYDB_OMNI_PASSWORD` cloud env var is no longer required; the Cloudflare Tunnel URL carries credentials.
- **Negative**: Cloud session DB access depends on the WSL machine being up. If `wsl-ubuntu2604-jadecli` is off, cloud agents lose DB connectivity. Mitigation: Docker `--restart=always` + WSL autostart on Windows boot.

## Supersedes

OKWP2 (the 2-context PG16/AlloyDB model). See `docs/operator-runbooks/alloydb-omni-cloud-env.md` § 2026-06-17 update.
