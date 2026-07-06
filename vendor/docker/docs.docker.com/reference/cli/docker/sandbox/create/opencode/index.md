# docker sandbox create opencode

**Description:** Create a sandbox for opencode

**Usage:** `docker sandbox create opencode WORKSPACE [EXTRA_WORKSPACE...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Create a sandbox with access to a host workspace for opencode.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start opencode after creation.




## Examples

### Create an OpenCode sandbox in the current directory

```console
$ docker sandbox create opencode .
```

### Create with an absolute path

```console
$ docker sandbox create opencode /home/user/my-project
```

### Create and then run

```console
$ docker sandbox create --name my-opencode opencode ~/my-project
$ docker sandbox run my-opencode
```



