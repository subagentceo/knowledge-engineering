# Docker Sandboxes


Docker Sandboxes run AI coding agents in isolated microVM sandboxes. Each
sandbox gets its own Docker daemon, filesystem, and network — the agent can
build containers, install packages, and modify files without touching your host
system.

> [!NOTE]
> The `sbx` CLI is free to use, including for commercial work. Only
> [organization governance](/ai/sandboxes/governance) requires a separate paid subscription.

Organization admins can
[centrally manage sandbox network and filesystem policies](/ai/sandboxes/governance/org/)
from the Docker Admin Console, so the same rules apply uniformly across every
developer's machine. Available on a separate paid subscription.

## Get started

For complete system requirements, see the
[get started prerequisites](/ai/sandboxes/get-started/#prerequisites).

Install the `sbx` CLI and sign in:

**macOS**



```console
$ brew trust docker/tap
$ brew install docker/tap/sbx
$ sbx login
```

**Windows**



```powershell
> winget install -h Docker.sbx
> sbx login
```

**Linux (Ubuntu)**



```console
$ curl -fsSL https://get.docker.com | sudo REPO_ONLY=1 sh
$ sudo apt-get install docker-sbx
$ sudo usermod -aG kvm $USER
$ newgrp kvm
$ sbx login
```



Then launch an agent in a sandbox:

```console
$ cd ~/my-project
$ sbx run claude
```

See the [get started guide](/ai/sandboxes/get-started/) for a full walkthrough, or jump to
the [usage guide](/ai/sandboxes/usage/) for common patterns.

## Learn more

- [Agents](/ai/sandboxes/agents) — supported agents and per-agent configuration
- [Customize](/ai/sandboxes/customize) — reusable templates and declarative kits for
  extending or tailoring sandboxes
- [Architecture](/ai/sandboxes/architecture/) — microVM isolation, workspace mounting,
  networking
- [Security](/ai/sandboxes/security) — isolation model, credential handling, and
  network policies
- [CLI reference](/reference/cli/sbx/) — full list of `sbx` commands and options
- [Troubleshooting](/ai/sandboxes/troubleshooting/) — common issues and fixes
- [FAQ](/ai/sandboxes/faq/) — login requirements, telemetry, etc

## Feedback

Your feedback shapes what gets built next. If you run into a bug, hit a
missing feature, or have a suggestion, open an issue at
[github.com/docker/sbx-releases/issues](https://github.com/docker/sbx-releases/issues).

