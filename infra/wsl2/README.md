# WSL2 Ubuntu 26.04-class Dev Container

Persistent development environment for knowledge-engineering, targeting Windows 11 WSL2 with an Ubuntu 24.04 LTS (Noble Numbat) base image.

## Prerequisites

| Requirement | Notes |
|---|---|
| Windows 11 | Required for WSL2 GUI + kernel 6.6+ |
| WSL2 | `wsl --install` in PowerShell (Admin) |
| Docker Desktop | Enable WSL2 integration in Settings → Resources → WSL Integration |
| NVIDIA drivers (optional) | 550.x+ for RTX 2080 Ti GPU passthrough |

## Quick start

```bash
# Build the image
docker build -t ke-dev infra/wsl2/

# Run interactive container with repo mounted
docker run -it --rm -v $(pwd):/workspace ke-dev
```

## GPU passthrough (RTX 2080 Ti / NVIDIA)

Install the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) then add `--gpus all`:

```bash
docker run -it --rm --gpus all -v $(pwd):/workspace ke-dev
```

For full CUDA support replace the `FROM` line in `infra/wsl2/Dockerfile`:

```dockerfile
FROM nvidia/cuda:12.4.1-base-ubuntu24.04
```

## Port mappings

| Port | Service |
|---|---|
| 3000 | MCP bridge-server |
| 3001 | OMA server |
| 6379 | Redis |
| 8000 | kg-api (FastAPI) |

Expose ports at run time:

```bash
docker run -it --rm \
  -p 3000:3000 -p 3001:3001 -p 6379:6379 -p 8000:8000 \
  -v $(pwd):/workspace \
  ke-dev
```

## Authentication (OAuth — no API key)

This project is OAuth-only. `ANTHROPIC_API_KEY` is never used. After entering the container:

```bash
claude auth login
```

Follow the browser prompt to authenticate.

## Redis

`redis-server` starts automatically inside the container when `setup.sh` is used on a WSL2 host. Inside a bare `docker run` session, start it manually:

```bash
redis-server --daemonize yes
```

## WSL2 host setup

Run `infra/wsl2/setup.sh` once inside your WSL2 instance to clone the repo, install dependencies, and start Redis:

```bash
bash infra/wsl2/setup.sh
```

## NVIDIA note for RTX 2080 Ti users

The 2080 Ti (11 GB VRAM, Turing / SM 7.5) requires CUDA 12.x drivers. Ensure the host driver version is 550+ before enabling `--gpus all`. Verify inside the container:

```bash
nvidia-smi
```
