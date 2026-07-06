# docker sandbox stop

**Description:** Stop one or more sandboxes without removing them

**Usage:** `docker sandbox stop SANDBOX [SANDBOX...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Stop one or more sandboxes without removing them. The sandboxes can be restarted later.





## Examples

### Stop a sandbox

```console
$ docker sandbox stop my-sandbox
my-sandbox
```

### Stop multiple sandboxes

```console
$ docker sandbox stop sandbox1 sandbox2
sandbox1
sandbox2
```

### Stop all running sandboxes

```console
$ docker sandbox stop $(docker sandbox ls -q)
```



