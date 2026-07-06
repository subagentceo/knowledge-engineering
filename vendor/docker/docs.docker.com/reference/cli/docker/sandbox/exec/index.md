# docker sandbox exec

**Description:** Execute a command inside a sandbox

**Usage:** `docker sandbox exec [OPTIONS] SANDBOX COMMAND [ARG...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Execute a command in a sandbox that was previously created with 'docker sandbox create'.

The command and any additional arguments are executed inside the sandbox container.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--detach` |  |  Detached mode: run command in the background |
| `--detach-keys` |  |  Override the key sequence for detaching a container |
| `-e`, `--env` |  |  Set environment variables |
| `--env-file` |  |  Read in a file of environment variables |
| `-i`, `--interactive` |  |  Keep STDIN open even if not attached |
| `--privileged` |  |  Give extended privileges to the command |
| `-t`, `--tty` |  |  Allocate a pseudo-TTY |
| `-u`, `--user` |  |  Username or UID (format: <name|uid>[:<group|gid>]) |
| `-w`, `--workdir` |  |  Working directory inside the container |



## Examples

### Execute a command in a sandbox

```console
$ docker sandbox exec my-sandbox ls -la
```

### Run an interactive shell

```console
$ docker sandbox exec -it my-sandbox /bin/bash
```

### Set environment variables (-e, --env) {#env}

```text
--env KEY=VALUE
```

Pass environment variables to the command:

```console
$ docker sandbox exec \
  --env NODE_ENV=development \
  --env DATABASE_URL=postgresql://localhost/myapp \
  my-sandbox npm test
```

### Set working directory (-w, --workdir) {#workdir}

```text
--workdir PATH
```

Run the command in a specific directory:

```console
$ docker sandbox exec --workdir /app my-sandbox python script.py
```

### Run as specific user (-u, --user) {#user}

```text
--user USER[:GROUP]
```

Execute command as a different user:

```console
$ docker sandbox exec --user 1000:1000 my-sandbox id
```

### Run in background (-d, --detach) {#detach}

Run a long-running command in the background:

```console
$ docker sandbox exec -d my-sandbox python server.py
```



