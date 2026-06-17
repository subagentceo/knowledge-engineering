# Tailscale WSL Ubuntu-26.04 Setup — A2A Agent Instructions

> **PR #502 gate.** This document describes the pg_durable task state machine
> that a separate A2A agent (using `@a2a-js/sdk`) must complete before PR #502
> can merge. Each task below maps to a pg_durable task in queue
> `wsl:tailscale:setup`. The GitHub issue tracking progress is linked in PR #502.
>
> @cite src/a2a/agents/tailscale-wsl-setup.ts
> @cite infra/tailscale/tailnet-policy.hujson
> @cite infra/tailscale/README.md
> @cite infra/postgres/init/04-tailscale-pr-context.sql
> @cite infra/postgres/init/05-prompt-context.sql

## Topology

```
Windows Desktop
 ├─ Docker Desktop (running)
 ├─ Ubuntu-26.04 (default WSL2 distro)
 │    ├─ tailscaled → tag:dev on ts.subagentceo.io
 │    └─ docker-compose:
 │         ├─ ke-alloydb   (AlloyDB Omni 18, port 5432) → tag:container
 │         └─ ke-redis     (Redis 7.0, port 6379)       → tag:container
 └─ Tailscale Windows client → tag:dev on ts.subagentceo.io

macOS M5 (this machine)
 └─ tailscaled → tag:dev on ts.subagentceo.io
```

## A2A Protocol

Agent endpoint: `http://<wsl2-hostname>:4001/a2a/jsonrpc`
Agent card: `http://<wsl2-hostname>:4001/.well-known/agent-card.json`
SDK: `@a2a-js/sdk ^0.3.13` (see `src/a2a/agents/tailscale-wsl-setup.ts`)

## pg_durable Task State Machine

Queue: `wsl:tailscale:setup`
States: `pending → running → completed | failed`

### T1 — tailscale-install

**Outcome**: `tailscaled` running in WSL Ubuntu-26.04, joined to `subagentceo` org.

```bash
# On WSL Ubuntu-26.04

# 1. Enable systemd (required for tailscale service)
echo '[boot]
systemd=true' | sudo tee /etc/wsl.conf

# Restart WSL from PowerShell: wsl --shutdown; wsl

# 2. Install Tailscale via official APT repo
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.nosetup.gpg | sudo gpg --dearmor -o /usr/share/keyrings/tailscale-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/tailscale-archive-keyring.gpg] https://pkgs.tailscale.com/stable/ubuntu noble main" | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt-get update -q && sudo apt-get install -y tailscale

# 3. Start tailscaled
sudo systemctl enable --now tailscaled

# 4. Authenticate to subagentceo org (run with TS_AUTHKEY for non-interactive)
sudo tailscale up \
  --authkey="$TS_AUTHKEY" \
  --hostname="$(hostname)" \
  --advertise-tags="tag:dev" \
  --accept-routes

# Verify
tailscale status
```

**pg_durable payload**:
```json
{ "skill": "tailscale-install", "host": "wsl2-dev", "tailnet": "ts.subagentceo.io" }
```

**Completion check**: `tailscale status | grep "ts.subagentceo.io"` exits 0.

---

### T2 — docker-persist

**Outcome**: Docker volumes `ke_alloydb_data` and `ke_redis_data` created and mounted.

```bash
# On WSL Ubuntu-26.04 (Docker Desktop WSL integration must be enabled)

# Create named volumes for persistence
docker volume create ke_alloydb_data
docker volume create ke_redis_data

# Verify volumes survive WSL restart
docker volume inspect ke_alloydb_data | python3 -c "import json,sys; v=json.load(sys.stdin)[0]; print(v['Mountpoint'])"
```

**pg_durable payload**:
```json
{ "skill": "docker-persist", "volumes": ["ke_alloydb_data", "ke_redis_data"] }
```

---

### T3 — redis-persist

**Outcome**: Redis 7.0 container `ke-redis` running with `ke_redis_data` volume, allkeys-lru policy, AOF persistence enabled.

```bash
docker run -d \
  --name ke-redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v ke_redis_data:/data \
  redis:7.0 \
  redis-server \
    --save 60 1 \
    --appendonly yes \
    --maxmemory 512mb \
    --maxmemory-policy allkeys-lru

# Verify persistence
docker exec ke-redis redis-cli ping
docker exec ke-redis redis-cli config get maxmemory-policy
```

**pg_durable payload**:
```json
{ "skill": "redis-persist", "image": "redis:7.0", "port": 6379, "persistence": "aof+rdb" }
```

**Redis seed** (run after container starts):
```bash
redis-cli < infra/containers/cloudflare/session-2026-06-17.redis
```

---

### T4 — postgres-persist

**Outcome**: AlloyDB Omni 18 container `ke-alloydb` running with `ke_alloydb_data` volume, pg_durable extension installed, DW schema migrated.

```bash
docker run -d \
  --name ke-alloydb \
  --restart unless-stopped \
  -p 5432:5432 \
  -v ke_alloydb_data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=localdev \
  -e POSTGRES_DB=knowledge_engineering \
  gcr.io/alloydb-omni/alloydbomni:18

# Wait for ready
until docker exec ke-alloydb pg_isready -U postgres; do sleep 1; done

# Run migrations in order
for f in infra/postgres/init/*.sql; do
  echo "Applying $f..."
  docker exec -i ke-alloydb psql -U postgres knowledge_engineering < "$f"
done

# Verify pg_durable
docker exec ke-alloydb psql -U postgres knowledge_engineering \
  -c "SELECT pgdurable.create_task('wsl:tailscale:setup', '{\"test\":true}'::jsonb, '1 hour'::interval)"
```

**pg_durable payload**:
```json
{ "skill": "postgres-persist", "image": "gcr.io/alloydb-omni/alloydbomni:18", "port": 5432, "migrations": ["00-04"] }
```

---

### T5 — verify-mesh

**Outcome**: macOS → WSL2 Tailscale connectivity verified; Redis and Postgres reachable from macbook-m5 over Tailscale mesh.

```bash
# From macbook-m5
tailscale ping wsl2-dev

# Test Redis reachability (port 6379 via Tailscale IP)
redis-cli -h wsl2-dev.ts.subagentceo.io ping

# Test Postgres reachability (port 5432)
psql "postgresql://postgres:localdev@wsl2-dev.ts.subagentceo.io:5432/knowledge_engineering" \
  -c "SELECT COUNT(*) FROM dw.dim_tailscale_node"
```

**pg_durable payload**:
```json
{ "skill": "verify-mesh", "checks": ["tailscale-ping", "redis-ping", "postgres-query"] }
```

---

## A2A Client Usage

```typescript
import { A2AClient } from '@a2a-js/sdk/client';

const client = await A2AClient.fromCardUrl(
  'http://wsl2-dev.ts.subagentceo.io:4001/.well-known/agent-card.json'
);

// Dispatch T1: tailscale-install
const response = await client.sendMessage({
  message: {
    messageId: crypto.randomUUID(),
    role: 'user',
    kind: 'message',
    parts: [{ kind: 'text', text: 'run tailscale-install on wsl2-dev' }],
  },
});
```

## Persistence Invariants

1. **Redis** (`ke-redis`): `--restart unless-stopped` + `ke_redis_data` volume + AOF+RDB.
   Data survives: `docker restart ke-redis`, `wsl --shutdown`, Windows reboot.

2. **AlloyDB Omni** (`ke-alloydb`): `--restart unless-stopped` + `ke_alloydb_data` volume.
   Data survives the same scenarios. WAL and data directory are on the named volume.

3. **WSL persistence**: Docker volumes live at `/var/lib/docker/volumes/` inside the WSL2
   VHDX (`ext4.vhdx`). The VHDX persists across WSL restarts. Do NOT use Windows-side paths
   (`/mnt/c/...`) for Docker volumes — cross-filesystem I/O is slow and can corrupt.

## CI/CD Gate

All 5 tasks must show `status = 'completed'` in `dw.dim_cloudflare_agent_setup` (queue
`wsl:tailscale:setup`) before PR #502 is eligible for merge. Enforced by the
`verify:dw` step in `npm run verify`.

```sql
SELECT skill, status FROM pg_query(
  'SELECT payload->>''skill'' AS skill, status
   FROM pgdurable.list_tasks(''wsl:tailscale:setup'', 100)
   WHERE status = ''completed'''
);
```
