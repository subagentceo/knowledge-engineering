# docker compose kill

**Description:** Force stop service containers

**Usage:** `docker compose kill [OPTIONS] [SERVICE...]`










## Description

Forces running containers to stop by sending a `SIGKILL` signal. Optionally the signal can be passed, for example:

```console
$ docker compose kill -s SIGINT
```


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--remove-orphans` |  |  Remove containers for services not defined in the Compose file |
| `-s`, `--signal` | `SIGKILL` |  SIGNAL to send to the container |






