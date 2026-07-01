# Ubuntu 26.04 WSL2 — Tailscale Setup

> Device: `DESKTOP-UFNGRM3` · Tailscale IP: `100.64.140.40` · Tailnet: `taile5fcbd.ts.net`
> YAML spec: `containers/operating-system/desktop-ufngrm3.yaml`
> pg_durable gate: GitHub issue #503

## Pre-requisites

- Windows 10 22H2+ or Windows 11 with WSL2 feature enabled
- `Ubuntu-26.04` set as default WSL2 distro: `wsl --set-default Ubuntu-26.04`
- Docker Desktop installed with WSL2 backend + Ubuntu-26.04 integration enabled

---

## Step 1 — Enable systemd in WSL2

Tailscale requires systemd to manage the `tailscaled` daemon across WSL sessions.

```bash
# Run inside Ubuntu-26.04 WSL shell
sudo tee /etc/wsl.conf > /dev/null <<'EOF'
[boot]
systemd=true
EOF
```

Then restart WSL from PowerShell (run as Administrator):

```powershell
wsl --shutdown
wsl -d Ubuntu-26.04
```

Verify systemd is running:

```bash
systemctl --version
# expected: systemd 255 or later
```

---

## Step 2 — Install Tailscale

```bash
# Add Tailscale APT repo for Ubuntu 24.04 LTS (noble — compatible with 26.04)
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/noble.nosetup.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/tailscale-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/tailscale-archive-keyring.gpg] \
  https://pkgs.tailscale.com/stable/ubuntu noble main" \
  | sudo tee /etc/apt/sources.list.d/tailscale.list

sudo apt-get update -q && sudo apt-get install -y tailscale
```

---

## Step 3 — Start tailscaled

```bash
sudo systemctl enable --now tailscaled
systemctl is-active tailscaled
# expected: active
```

---

## Step 4 — Authenticate to subagentceo tailnet

### Option A — Interactive (browser-based)

```bash
sudo tailscale up \
  --advertise-tags="tag:dev" \
  --accept-routes \
  --hostname="$(hostname | tr '[:upper:]' '[:lower:]')-wsl"
# Opens a browser URL to authorize — paste into Windows browser
```

### Option B — Auth key (non-interactive / CI)

Generate a reusable auth key in Tailscale admin console:
`https://login.tailscale.com/admin/settings/keys`  
Tag scope: `tag:dev`  
Expiry: 90 days, reusable

```bash
export TS_AUTHKEY="tskey-auth-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXX"

sudo tailscale up \
  --authkey="$TS_AUTHKEY" \
  --advertise-tags="tag:dev" \
  --accept-routes \
  --hostname="$(hostname | tr '[:upper:]' '[:lower:]')-wsl"
```

---

## Step 5 — Verify mesh connectivity

```bash
tailscale status
# Should show both nodes:
#   100.71.204.112  alexs-macbook-pro  admin-jadecli@  macOS   active
#   100.64.140.40   desktop-ufngrm3    admin-jadecli@  windows active

tailscale ping alexs-macbook-pro
# expected: pong from alexs-macbook-pro (100.71.204.112) ...
```

---

## Step 6 — Persist WSL2 Docker containers

Named Docker volumes survive `wsl --shutdown` and Windows reboots when stored inside the WSL2 VHDX. Never bind-mount to `/mnt/c/` — cross-filesystem I/O is slow and can corrupt under load.

```bash
# Create named volumes
docker volume create ke_alloydb_data
docker volume create ke_redis_data

# AlloyDB Omni 18
docker run -d \
  --name ke-alloydb \
  --restart unless-stopped \
  -p 5432:5432 \
  -v ke_alloydb_data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=localdev \
  -e POSTGRES_DB=knowledge_engineering \
  gcr.io/alloydb-omni/alloydbomni:18

# Redis 7.0 (AOF + RDB, allkeys-lru, 512 MB)
docker run -d \
  --name ke-redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v ke_redis_data:/data \
  redis:7.0 redis-server \
    --save 60 1 \
    --appendonly yes \
    --maxmemory 512mb \
    --maxmemory-policy allkeys-lru

# Verify both started
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

---

## Step 7 — Run database migrations

```bash
# Wait for AlloyDB to be ready
until docker exec ke-alloydb pg_isready -U postgres; do sleep 1; done

# Apply all migrations in order
for f in /path/to/knowledge-engineering/infra/postgres/init/*.sql; do
  echo "Applying $(basename $f)..."
  docker exec -i ke-alloydb psql -U postgres knowledge_engineering < "$f"
done

# Seed Redis from session snapshot
redis-cli -h localhost -p 6379 \
  < /path/to/knowledge-engineering/infra/containers/cloudflare/session-2026-06-17.redis

# Verify pg_durable extension
docker exec ke-alloydb psql -U postgres knowledge_engineering \
  -c "SELECT pgdurable.create_task('wsl:tailscale:setup', '{\"skill\":\"verify-mesh\"}'::jsonb, '1 hour'::interval)"
```

---

## Step 8 — Complete pg_durable gate (issue #503)

The A2A agent at port `4001` must mark all 5 tasks completed. Start it from macbook-m5:

```typescript
import { A2AClient } from '@a2a-js/sdk/client';
const client = await A2AClient.fromCardUrl(
  'http://desktop-ufngrm3.taile5fcbd.ts.net:4001/.well-known/agent-card.json'
);
for (const skill of ['tailscale-install','docker-persist','redis-persist','postgres-persist','verify-mesh']) {
  await client.sendMessage({ message: {
    messageId: crypto.randomUUID(), role: 'user', kind: 'message',
    parts: [{ kind: 'text', text: skill }],
  }});
}
```

---

## Verification checklist

```bash
# On Ubuntu-26.04 WSL shell:
systemctl is-active tailscaled                       # active
tailscale status | grep alexs-macbook-pro            # connected
docker ps --filter name=ke-alloydb --filter name=ke-redis  # 2 containers Up
docker exec ke-alloydb pg_isready -U postgres        # accepting connections
docker exec ke-redis redis-cli ping                  # PONG
docker volume ls | grep ke_                          # ke_alloydb_data, ke_redis_data

# Cross-device (run from macbook-m5):
tailscale ping desktop-ufngrm3                       # pong
redis-cli -h 100.64.140.40 ping                      # PONG
psql "postgresql://postgres:localdev@100.64.140.40:5432/knowledge_engineering" -c "SELECT 1"
```

---

## Persistence invariants

| Component | Mechanism | Survives |
|---|---|---|
| Tailscale auth | Stored in WSL2 filesystem (`/var/lib/tailscale/`) | `wsl --shutdown`, reboot |
| Redis data | `ke_redis_data` named volume + AOF+RDB | `docker restart`, `wsl --shutdown`, reboot |
| AlloyDB data | `ke_alloydb_data` named volume | `docker restart`, `wsl --shutdown`, reboot |
| Docker containers | `--restart unless-stopped` | Windows reboot (Docker Desktop auto-start) |
