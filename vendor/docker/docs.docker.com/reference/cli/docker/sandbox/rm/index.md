# docker sandbox rm

**Description:** Remove one or more sandboxes

**Usage:** `docker sandbox rm SANDBOX [SANDBOX...]`

**Aliases:** `docker sandbox remove`








## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Remove one or more sandboxes and all their associated resources.

This command will:
- Check if the sandbox exists
- Remove the sandbox and clean up its associated resources




## Examples

### Remove a sandbox

```console
$ docker sandbox rm abc123def
abc123def
```

### Remove multiple sandboxes

```console
$ docker sandbox rm abc123def def456ghi
abc123def
def456ghi
```

### Remove all sandboxes

```console
$ docker sandbox rm $(docker sandbox ls -q)
```



