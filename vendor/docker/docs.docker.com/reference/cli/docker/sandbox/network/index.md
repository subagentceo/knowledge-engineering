# docker sandbox network

**Description:** Manage sandbox networking

**Usage:** `docker sandbox network`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Manage sandbox networking




## Examples

### View network logs

```console
$ docker sandbox network log
```

### Configure proxy for a sandbox

```console
$ docker sandbox network proxy my-sandbox --block-host example.com
```

See the subcommands for more details:
- [`docker sandbox network log`](/reference/cli/docker/sandbox/network/log/) - Show network logs
- [`docker sandbox network proxy`](/reference/cli/docker/sandbox/network/proxy/) - Manage proxy configuration


## Subcommands

| Command | Description |
|---------|-------------|
| [`docker sandbox network log`](https://docs.docker.com/reference/cli/docker/sandbox/network/log/) | Show network logs |
| [`docker sandbox network proxy`](https://docs.docker.com/reference/cli/docker/sandbox/network/proxy/) | Manage proxy configuration for a sandbox |


