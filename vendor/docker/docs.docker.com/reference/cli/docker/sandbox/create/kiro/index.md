# docker sandbox create kiro

**Description:** Create a sandbox for kiro

**Usage:** `docker sandbox create kiro WORKSPACE [EXTRA_WORKSPACE...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Create a sandbox with access to a host workspace for kiro.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start kiro after creation.




## Examples

### Create a Kiro sandbox in the current directory

```console
$ docker sandbox create kiro .
```

### Create with an absolute path

```console
$ docker sandbox create kiro /home/user/my-project
```

### Create and then run

```console
$ docker sandbox create --name my-kiro kiro ~/my-project
$ docker sandbox run my-kiro
```



