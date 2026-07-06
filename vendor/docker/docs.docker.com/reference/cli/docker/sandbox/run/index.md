# docker sandbox run

**Description:** Run an agent in a sandbox

**Usage:** `docker sandbox run SANDBOX [-- AGENT_ARGS...] | AGENT [WORKSPACE] [EXTRA_WORKSPACE...] [-- AGENT_ARGS...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Run an agent in a sandbox. Create the sandbox if it does not exist.

Pass agent arguments after the "--" separator.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Examples:
  # Create and run a sandbox with claude in current directory
  docker sandbox run claude

  # Create and run a sandbox with claude in current directory (explicit)
  docker sandbox run claude .

  # Create and run with additional workspaces (read-only)
  docker sandbox run claude . /path/to/docs:ro

  # Run an existing sandbox
  docker sandbox run existing-sandbox

  # Run a sandbox with agent arguments
  docker sandbox run claude -- --continue


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--name` |  |  Name for the sandbox (default: <agent>-<workdir>) |
| `--pull-template` | `missing` |  Template image pull policy: always (always pull from registry), missing (pull only if not cached), never (use only cached images)<br> |
| `-t`, `--template` |  |  Container image to use for the sandbox (default: agent-specific image)<br> |



## Examples

### Create and run Claude in the current directory

```console
$ docker sandbox run claude .
```

### Run an existing sandbox

```console
$ docker sandbox run my-sandbox
```

### Create and run with a specific workspace

```console
$ docker sandbox run claude ~/projects/my-app
```

The workspace directory is mounted at the same absolute path inside the sandbox.

### Name the sandbox (--name) {#name}

```text
--name NAME
```

Assign a custom name when creating a sandbox:

```console
$ docker sandbox run --name my-project claude .
```

### Use a custom base image (-t, --template) {#template}

```text
--template IMAGE
```

Specify a custom container image when creating a sandbox:

```console
$ docker sandbox run --template python:3-alpine claude .
```

By default, each agent uses a pre-configured image. The `--template` option
lets you substitute a different image.

### Pass arguments to the agent

Use `--` to separate sandbox options from agent arguments:

```console
$ docker sandbox run claude . -- -p "What version are you running?"
```



