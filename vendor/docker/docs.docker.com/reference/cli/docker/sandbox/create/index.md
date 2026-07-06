# docker sandbox create

**Description:** Create a sandbox for an agent

**Usage:** `docker sandbox create [OPTIONS] AGENT WORKSPACE`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Create a sandbox with access to a host workspace for an agent.

Available agents are provided as subcommands. Use "create AGENT --help" for agent-specific options.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--name` |  |  Name for the sandbox (default: <agent>-<workdir>, letters, numbers, hyphens, underscores, periods, plus signs and minus signs only)<br> |
| `--pull-template` | `missing` |  Template image pull policy: always (always pull from registry), missing (pull only if not cached), never (use only cached images)<br> |
| `-q`, `--quiet` |  |  Suppress verbose output |
| `-t`, `--template` |  |  Container image to use for the sandbox (default: agent-specific image)<br> |



## Examples

### Create a Claude sandbox

```console
$ docker sandbox create claude ~/my-project
```

### Create with a custom name

```console
$ docker sandbox create --name my-sandbox claude ~/my-project
```

### Use a custom base image (-t, --template) {#template}

```text
--template IMAGE
```

Specify a custom container image to use as the sandbox base:

```console
$ docker sandbox create --template python:3-alpine claude ~/my-project
```

By default, each agent uses a pre-configured image.

### Create and run immediately

After creating a sandbox, use `run` to start the agent:

```console
$ docker sandbox create --name my-sandbox claude ~/my-project
$ docker sandbox run my-sandbox
```

Or use `docker sandbox run` directly to create and run in one step:

```console
$ docker sandbox run claude ~/my-project
```


## Subcommands

| Command | Description |
|---------|-------------|
| [`docker sandbox create cagent`](https://docs.docker.com/reference/cli/docker/sandbox/create/cagent/) | Create a sandbox for cagent |
| [`docker sandbox create claude`](https://docs.docker.com/reference/cli/docker/sandbox/create/claude/) | Create a sandbox for claude |
| [`docker sandbox create codex`](https://docs.docker.com/reference/cli/docker/sandbox/create/codex/) | Create a sandbox for codex |
| [`docker sandbox create copilot`](https://docs.docker.com/reference/cli/docker/sandbox/create/copilot/) | Create a sandbox for copilot |
| [`docker sandbox create gemini`](https://docs.docker.com/reference/cli/docker/sandbox/create/gemini/) | Create a sandbox for gemini |
| [`docker sandbox create kiro`](https://docs.docker.com/reference/cli/docker/sandbox/create/kiro/) | Create a sandbox for kiro |
| [`docker sandbox create opencode`](https://docs.docker.com/reference/cli/docker/sandbox/create/opencode/) | Create a sandbox for opencode |
| [`docker sandbox create shell`](https://docs.docker.com/reference/cli/docker/sandbox/create/shell/) | Create a sandbox for shell |


