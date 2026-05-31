# Docker Desktop Deterministic Management

Operator runbook for managing the local Docker Desktop instance that backs this
repo's local data plane (DragonflyDB + AlloyDB Omni) and the Docker AI ("Ask
Gordon") deterministic screenshot reviews. Captures the deterministic-management
approach, the verified current container topology, and how the
screenshot-driven capture scripts work. Refs SCRUM-36.

> Source of truth is the live daemon, not this doc. Run the commands in
> [Reconciling against live state](#reconciling-against-live-state) before
> treating any value here as current. This runbook is durable knowledge;
> point-in-time snapshots live in the gitignored `screenshots/` scratch dir
> (`00-START-HERE.md`, `config.yaml`, the `docker-desktop-*.png` captures) and
> must never be committed.

## Why deterministic management

Docker Desktop's GUI is non-reproducible: clicking through panes leaves no
artifact and does not survive a reinstall or a move to a new host. Everything
the GUI does is also expressed as config files and CLI commands, so the whole
instance can be driven without the UI. That matters here for two reasons:

1. The repo's local data plane (Dragonfly on `:6379`, AlloyDB Omni on `:5433`)
   replaces out-of-budget Neon/Redis cloud services. It must come up the same
   way on any host.
2. Docker AI ("Gordon") reviews screenshots of Docker Desktop and updates the
   `screenshots/` scratch dir. Deterministic state means those reviews compare
   against a known baseline rather than guessing.

## The deterministic control surface

Docker Desktop is fully drivable through four layers. Edit the files or run the
CLI; never depend on a GUI click.

### 1. `docker desktop` CLI (lifecycle + features)

| Command                                                 | Purpose                                           |
| :------------------------------------------------------ | :------------------------------------------------ |
| `docker desktop status`                                 | Running state + SessionID (changes every restart) |
| `docker desktop start` / `stop` / `restart`             | Lifecycle                                         |
| `docker desktop enable <feature>` / `disable <feature>` | Toggle features                                   |
| `docker desktop logs`                                   | Stream Docker Desktop logs                        |
| `docker desktop diagnose`                               | Diagnostic bundle                                 |
| `docker desktop version`                                | Version info                                      |
| `docker desktop kubernetes ...`                         | Kubernetes cluster management                     |

### 2. Configuration files (the deterministic state)

| File (macOS)                                                      | Controls                                                                                     |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `~/Library/Group Containers/group.com.docker/settings-store.json` | Desktop settings: CPU, swap, virtualization, feature flags. Edit directly; restart to apply. |
| `~/.docker/daemon.json`                                           | Daemon config: BuildKit GC, logging, security                                                |
| `~/.docker/config.json`                                           | CLI config: current context, auth, plugins                                                   |
| `admin-settings.json`                                             | Enterprise policy; `locked: true` blocks user override                                       |

On Linux the settings store lives at `~/.docker/desktop/settings-store.json`; on
Windows at `%AppData%\Docker\settings-store.json`.

### 3. Docker contexts (which daemon the CLI talks to)

```bash
docker context ls                 # list
docker context use desktop-linux  # switch
docker context inspect <name>
```

Docker Desktop creates `desktop-linux` and sets it current on startup, restoring
the previous context on shutdown.

### 4. Environment variables (per-shell override)

`DOCKER_CONTEXT`, `DOCKER_HOST`, and `DOCKER_CONFIG` override the active context,
daemon socket, and config directory respectively without mutating any file.

## Verified current topology

Verified against the live daemon on 2026-05-31 (macOS arm64). Values that drift
on every restart (SessionID, container PIDs, `StartedAt`) are intentionally
omitted.

### Docker Desktop

| Property                       | Value                                                        |
| :----------------------------- | :----------------------------------------------------------- |
| Server / Engine version        | 29.5.2                                                       |
| Status                         | running                                                      |
| Plan badge                     | Team                                                         |
| CPUs                           | 8                                                            |
| Swap                           | 2048 MiB                                                     |
| Virtualization                 | libkrun (`UseLibkrun: true`, Virtualization.framework off)   |
| containerd snapshotter         | enabled                                                      |
| Kubernetes                     | disabled (not provisioned; "Enable Kubernetes" prompt shown) |
| Docker AI (Gordon)             | enabled                                                      |
| Inference / inference-over-TCP | enabled                                                      |
| Extensions                     | enabled (Daytona installed)                                  |
| Models (Model Runner)          | none pulled                                                  |

### Running containers (the data plane)

| Name        | Image                                         | Host→container port | Restart policy   | Health                        |
| :---------- | :-------------------------------------------- | :------------------ | :--------------- | :---------------------------- |
| `dragonfly` | `docker.dragonflydb.io/dragonflydb/dragonfly` | `6379→6379`         | `unless-stopped` | healthy                       |
| `alloydb`   | `google/alloydbomni:latest`                   | `5433→5432`         | `unless-stopped` | none (no healthcheck defined) |

Both carry `unless-stopped`, so they survive a Docker Desktop restart. Connect
with `redis-cli -p 6379` (Dragonfly speaks the Redis protocol) and
`psql "postgresql://localhost:5433"` (AlloyDB Omni — Postgres-compatible).

### Stopped containers (Gordon monitoring stack, idle)

`gordo-grafana`, `gordo-prometheus`, `gordo-redis` (`redis:7-alpine`),
`gordo-postgres` (`postgres:16-alpine`), and `gordo-agent` (`alpine:latest`,
last exit 137) are all exited. They are an idle observability/agent stack, not
part of the active data plane, and carry no restart policy keeping them up.

### Docker contexts

| Context                   | Endpoint                                                          | Role                   |
| :------------------------ | :---------------------------------------------------------------- | :--------------------- |
| `default`                 | `unix:///var/run/docker.sock`                                     | Stock local engine     |
| `desktop-linux` (current) | `unix:///Users/alexzh/.docker/run/docker.sock`                    | Docker Desktop         |
| `gate-outcomes`           | `~/.docker/sandboxes/vm/gate-outcomes/docker-public.sock`         | Docker Sandbox VM      |
| `orchestrator-outcomes`   | `~/.docker/sandboxes/vm/orchestrator-outcomes/docker-public.sock` | Docker Sandbox VM      |
| `reviewer-outcomes`       | `~/.docker/sandboxes/vm/reviewer-outcomes/docker-public.sock`     | Docker Sandbox VM      |
| `tcd`                     | `tcp://127.0.0.1:49611`                                           | Testcontainers Desktop |

The three `*-outcomes` sandbox contexts mirror the gate / orchestrator /
reviewer roles used by the outcomes SDK workloads.

### MCP Toolkit

Docker Desktop's MCP Toolkit (beta) holds catalog images and profiles, separate
from the data-plane containers above. The `subprocessor-engineering` profile
enables a tool set spanning Redis, Sequential Thinking, Fetch, Private Web
Search, Time, Grafana, Filesystem, Docker Hub, Atlassian, Git, Markitdown,
Markdownify, API Gateway, and AWS KB Retrieval (archived). MCP catalog images
(`mcp/git`, `mcp/grafana`, `mcp/api-gateway`, `mcp/duckduckgo`, `mcp/time`,
`mcp/atlassian`, `mcp/neon`, `mcp/context7`, etc.) are pulled, but their
containers are created/stopped on demand by the toolkit, not long-running.

### Disk

`docker system df` reports 35 images totalling ~23 GB with ~12 GB (52%)
reclaimable; 17 local volumes (~316 MB, 8 active); empty build cache. The single
largest image is `google/alloydbomni` at ~7 GB. `docker system prune` reclaims
the dangling MCP catalog layers when space is tight.

## Reconciling against live state

Run these to confirm the topology above before relying on it:

```bash
docker desktop status                                   # running + SessionID
docker version --format '{{.Server.Version}}'
docker context ls                                       # contexts + current (*)
docker ps -a --format '{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
docker inspect dragonfly alloydb \
  --format '{{.Name}} restart={{.HostConfig.RestartPolicy.Name}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}'
docker system df
```

Expected: `dragonfly` and `alloydb` `Up` with `unless-stopped`; everything else
`Exited`; current context `desktop-linux`.

## The capture scripts (`screenshots/`)

The gitignored `screenshots/` scratch dir holds a type-safe state-capture
toolkit. It is local-only — never commit it or any `*.png`.

- **`capture_docker_state.py`** — serializes live state to
  `docker_desktop_state.json`. Reads `docker context ls --format=json`,
  `docker ps -a` + `docker inspect` per container, `docker images`, and
  `docker system df`; loads `settings-store.json` and `daemon.json` from disk;
  infers the virtualization backend from settings
  (`UseVirtualizationFramework` → `UseLibkrun` → native). Output validates
  against the Pydantic models.
- **`docker_desktop_state.py`** — Pydantic models (`DockerDesktopState`,
  `Container`, `DesktopSettingsStore`, `DockerContext`, `MCPContainer`,
  `DevContainerConfig`, plus enums) with computed properties such as
  `running_containers` and `uptime_seconds`.
- **`docker-config.schema.ts`** — Zod mirror of the Pydantic models for runtime
  validation and TS inference (`parseConfigFile`, `validateContainer`,
  `validateDesktopState`).
- **`config.yaml`** — a YAML snapshot of one capture, validated by both schemas.
  Point-in-time; do not treat as live.
- **`devcontainer.json`** — VS Code dev container (Python 3.11 + Node 18 +
  docker-in-docker) that forwards the data-plane ports for working inside a
  container.

### Capture → validate → diff loop

```bash
cd screenshots
python capture_docker_state.py                       # → docker_desktop_state.json
python -c "from docker_desktop_state import DockerDesktopState; \
  DockerDesktopState.model_validate_json(open('docker_desktop_state.json').read()); \
  print('valid')"
python capture_docker_state.py > /tmp/state.now.json # later: diff for drift
```

The same JSON drives Gordon's deterministic screenshot review: capture →
validate → compare against the previous snapshot to flag drift in the container
set, ports, or desktop settings.

## Operator workflow

1. `docker desktop status` — confirm running.
2. `docker context ls` — confirm `desktop-linux` is current.
3. Edit `settings-store.json` or `daemon.json` for any config change (never the
   GUI).
4. `docker desktop restart` to apply.
5. `docker desktop diagnose` if something is wrong.
6. `docker ps` / `docker images` to confirm runtime; re-run the capture script
   to refresh the JSON snapshot.

## Sources

- https://docs.docker.com/desktop/features/desktop-cli/
- https://docs.docker.com/desktop/settings-and-maintenance/settings/
- https://docs.docker.com/reference/cli/docker/desktop/
- https://docs.docker.com/engine/manage-resources/contexts/
- https://docs.docker.com/enterprise/security/hardened-desktop/settings-management/
- https://docs.docker.com/ai/gordon/
- https://docs.docker.com/ai/mcp-catalog-and-toolkit/
