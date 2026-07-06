# docker sandbox reset

**Description:** Reset all VM sandboxes and clean up state

**Usage:** `docker sandbox reset [OPTIONS]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Reset all VM sandboxes and permanently delete all VM data.

This command will:
- Stop all running VMs gracefully (30s timeout)
- Delete all VM state directories in ~/.docker/sandboxes/vm/
- Clear image cache in ~/.docker/sandboxes/image-cache/
- Clear all internal registries

The daemon will continue running with fresh state after reset.

⚠️  WARNING: This is a destructive operation that cannot be undone!
All running agents will be forcefully terminated and their work will be lost.
Cached image tars will be deleted and will need to be recreated on next use.

By default, you will be prompted to confirm (y/N).
Use --force to skip the confirmation prompt.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  |  Skip confirmation prompt |



## Examples

### Reset with confirmation prompt

```console
$ docker sandbox reset
⚠️  WARNING: This will permanently delete all VM data and stop all running agents!
Are you sure you want to continue? (y/N): y
All VMs reset successfully
```

### Force reset without confirmation (-f, --force) {#force}

Skip the confirmation prompt:

```console
$ docker sandbox reset --force
All VMs reset successfully
```

> [!CAUTION]
> This is a destructive operation that cannot be undone!
> All running agents will be terminated and their work will be lost.



