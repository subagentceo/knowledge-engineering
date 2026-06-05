# Tailscale home mesh — subagentceo

Zero-config overlay network linking WSL2, macOS, and Docker containers under the
`ts.subagentceo.io` MagicDNS namespace.

## Mesh topology

| Tag | Nodes |
|---|---|
| `tag:dev` | WSL2 Ubuntu 24.04 dev machine, macOS arm64 (MacBook M5) |
| `tag:container` | Docker containers: Cloudflare Workers, AlloyDB Omni, Redis, Claude Code instances (Docker org: `subagentceo`) |
| `tag:server` | Production VMs |

ACL posture: all nodes reach all nodes (dev lab). SSH (22) and Claude Code remote
(5000–5100) are documented in `tailnet-policy.hujson`.

## Prerequisites

Generate a reusable auth key in the [Tailscale admin console](https://login.tailscale.com/admin/settings/keys):

- Type: **Reusable**, **Ephemeral: off** (for dev machines), **Pre-authorized: on**
- Assign default tags: `tag:dev` (for machines) or `tag:container` (for containers)

Store the key as `TS_AUTHKEY` in your secrets manager (1Password / `.env.local` — never committed).

## Install: WSL2 Ubuntu 24.04

The `infra/wsl2/Dockerfile` and `scripts/bootstrap/wsl-cli.sh` set up the base
environment. Tailscale is installed separately because it requires `systemd` or a
userspace daemon.

```bash
# Inside WSL2 Ubuntu 24.04
curl -fsSL https://tailscale.com/install.sh | sh

# Start the daemon (if systemd is not running in your WSL2 distro)
sudo tailscaled &

# Join the tailnet as a dev machine
sudo tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --advertise-tags=tag:dev \
  --hostname="wsl2-$(hostname)"
```

For WSL2 with `systemd` enabled (`/etc/wsl.conf` → `[boot] systemd=true`):

```bash
sudo systemctl enable --now tailscaled
sudo tailscale up --authkey="${TS_AUTHKEY}" --advertise-tags=tag:dev
```

Verify:

```bash
tailscale status
tailscale ip -4
```

## Install: macOS arm64 (MacBook M5)

```bash
brew install tailscale

# Start the system service
sudo brew services start tailscale

# Join the tailnet
sudo tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --advertise-tags=tag:dev \
  --hostname="macbook-m5"
```

Or install the [Mac App Store version](https://apps.apple.com/us/app/tailscale/id1475387142)
and authenticate via the menu-bar app.

## Install: Docker container (subagentceo org)

Add Tailscale as a sidecar process in your container. The minimal pattern for a
Cloudflare Worker or Claude Code container from `subagentceo` on Docker Hub:

```dockerfile
# In your Dockerfile (based on infra/wsl2/Dockerfile or a worker image)
RUN curl -fsSL https://tailscale.com/install.sh | sh

# Entrypoint wrapper
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

`entrypoint.sh`:

```bash
#!/bin/bash
set -euo pipefail

# Start Tailscale daemon in userspace (no NET_ADMIN cap needed in most runtimes)
tailscaled --tun=userspace-networking --socks5-server=localhost:1055 &
sleep 2

tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --advertise-tags=tag:container \
  --hostname="${HOSTNAME:-container-$(date +%s)}" \
  --accept-dns=true

# Hand off to the main process
exec "$@"
```

Pass `TS_AUTHKEY` as a Docker secret or environment variable — never bake it into
the image.

For `docker-compose` / Docker run:

```yaml
services:
  worker:
    image: subagentceo/cloudflare-worker:latest
    environment:
      - TS_AUTHKEY=${TS_AUTHKEY}
    cap_add:
      - NET_ADMIN   # omit if using userspace networking
    devices:
      - /dev/net/tun  # omit if using userspace networking
```

## MagicDNS — discovering nodes

Once all nodes are up, MagicDNS resolves hostnames under `ts.subagentceo.io`:

```
wsl2-dev.ts.subagentceo.io       → WSL2 dev machine
macbook-m5.ts.subagentceo.io     → MacBook M5
alloydb-omni.ts.subagentceo.io   → AlloyDB Omni container
redis.ts.subagentceo.io          → Redis container
```

Test resolution from any tailnet node:

```bash
tailscale ping macbook-m5
ping alloydb-omni.ts.subagentceo.io
```

SSH via MagicDNS (no IP needed):

```bash
ssh user@wsl2-dev.ts.subagentceo.io
```

Claude Code remote (VS Code / Cursor tunnel) via the tailnet:

```bash
# On the target container
claude --port 5000

# From your dev machine
ssh -L 5000:localhost:5000 user@alloydb-omni.ts.subagentceo.io
```

## ACL policy

`tailnet-policy.hujson` in this directory is the source of truth. Upload it in the
[Tailscale admin console](https://login.tailscale.com/admin/acls) under
**Access Controls → Edit as HuJSON**.

Key decisions encoded in the policy:

- `autogroup:admin` owns all tags — only the tailnet admin can apply them.
- Wildcard `"src": ["*"], "dst": ["*:*"]` rule keeps friction near zero for a
  solo-founder home lab.
- `funnel` node attribute allows selective public exposure via Tailscale Funnel
  without opening firewall ports.

## References

- `infra/wsl2/Dockerfile` — WSL2 dev container (Node 20, Python 3.12, Redis 7, Swift 6.1, Claude Code CLI)
- `scripts/bootstrap/wsl-cli.sh` — WSL2 bootstrap script
- [Tailscale ACL docs](https://tailscale.com/kb/1018/acls)
- [Tailscale MagicDNS](https://tailscale.com/kb/1081/magicdns)
- [Tailscale in Docker](https://tailscale.com/kb/1282/docker)
- [Tailscale Funnel](https://tailscale.com/kb/1223/funnel)
