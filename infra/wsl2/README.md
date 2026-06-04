# WSL2 Ubuntu-26.04 — knowledge-engineering dev environment

Windows 11 bootstrap for user `alexzh` on the `subagentceo` Docker org.

## Prerequisites

| Requirement | Notes |
|---|---|
| Windows 11 22H2+ | WSL2 kernel ships in-box |
| Docker Desktop 4.x | Enable WSL2 backend in Settings → Resources → WSL Integration |
| WSL2 | Enabled via `wsl --install` (see below) |
| Node.js 22 LTS | Installed inside WSL by `setup.sh`; not required on the host |
| Tailscale Windows client | Install from tailscale.com before running setup |

## Bootstrap steps

### 1. Install WSL2 + Ubuntu-26.04 (elevated PowerShell on the host)

```powershell
wsl --install Ubuntu-26.04
# Restart if prompted, then open the Ubuntu-26.04 distro to complete first-run setup.
```

### 2. Enable Docker Desktop WSL2 integration

Open Docker Desktop → Settings → Resources → WSL Integration, toggle **Ubuntu-26.04** on, and click **Apply & Restart**.

### 3. Run setup.sh inside WSL

```bash
# Inside Ubuntu-26.04 shell:
curl -fsSL https://raw.githubusercontent.com/subagentceo/knowledge-engineering/main/infra/wsl2/setup.sh | bash
```

Or clone first, then run:

```bash
git clone https://github.com/subagentceo/knowledge-engineering.git
cd knowledge-engineering
bash infra/wsl2/setup.sh
```

### 4. Authenticate GitHub CLI

```bash
gh auth login --hostname github.com --scopes "admin:org,repo,workflow"
# Repeat for the alex-jadecli alias if needed.
```

## Docker Desktop WSL2 backend

Docker Desktop exposes its Linux engine via a named pipe:

```
npipe:////./pipe/dockerDesktopLinuxEngine
```

The `DOCKER_HOST` env var in `infra/wsl2/Dockerfile` and the `desktop-linux` context created by `setup.sh` both point at this pipe so that `docker` commands from inside WSL route to the same daemon as Docker Desktop on the host — no separate daemon needed inside WSL.

## Tailscale mesh setup

All machines on the home mesh connect via Tailscale with:

```bash
sudo tailscale up --accept-routes --advertise-tags=tag:dev
```

The `tag:dev` ACL tag grants access within the home network. Approved in the Tailscale admin console under Access Controls.

## Docker image build (optional — runs deps inside a container)

```bash
cd infra/wsl2
docker build -t knowledge-engineering:wsl2 .
docker run --rm -it \
  -v "$(pwd)/../..:/home/alexzh/knowledge-engineering" \
  -p 6379:6379 \
  knowledge-engineering:wsl2
```

## Dev environment checklist

- [ ] `wsl --version` shows WSL2
- [ ] `docker context show` returns `desktop-linux`
- [ ] `docker ps` lists containers without error
- [ ] `tailscale status` shows the machine is connected
- [ ] `node --version` prints `v22.x.x`
- [ ] `npm --version` prints `10.x.x` or later
- [ ] `redis-cli ping` returns `PONG`
- [ ] `cd ~/knowledge-engineering && npm run verify` passes
