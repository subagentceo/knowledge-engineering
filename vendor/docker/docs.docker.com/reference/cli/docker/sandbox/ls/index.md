# docker sandbox ls

**Description:** List VMs

**Usage:** `docker sandbox ls [OPTIONS]`

**Aliases:** `docker sandbox list`








## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

List all VMs managed by sandboxd with their sandboxes


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--json` |  |  Output in JSON format |
| `-q`, `--quiet` |  |  Only display VM names |



## Examples

### List all VMs

```console
$ docker sandbox ls
VM ID         NAME       STATUS    WORKSPACE                    SOCKET PATH                           SANDBOXES    AGENTS
abc123def     claude-vm  running   /home/user/my-project        /Users/.../docker-1764682554072.sock  2           claude
def456ghi     gemini-vm  stopped   /home/user/ml-projects
```

### Show only VM names (--quiet) {#quiet}

```text
--quiet
```

Output only VM names:

```console
$ docker sandbox ls --quiet
claude-vm
gemini-vm
```

### JSON output (--json)

```text
--json
```

Output detailed VM information in JSON format:

```console
$ docker sandbox ls --json
{
  "vms": [
    {
      "name": "claude-vm",
      "agent": "claude",
      "status": "running",
      "socket_path": "/Users/user/.docker/sandboxes/vm/claude-vm/docker-1234567890.sock",
      "sandbox_count": 2,
      "workspaces": [
        "/home/user/my-project",
        "/home/user/another-project"
      ]
    },
    {
      "name": "gemini-vm",
      "agent": "gemini",
      "status": "stopped",
      "sandbox_count": 0
    }
  ]
}
```



