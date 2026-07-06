# docker context ls

**Description:** List contexts

**Usage:** `docker context ls [OPTIONS]`

**Aliases:** `docker context list`








## Description

List contexts


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` |  |  Format output using a custom template:<br>'table':            Print output in table format with column headers (default)<br>'table TEMPLATE':   Print output in table format using the given Go template<br>'json':             Print in JSON format<br>'TEMPLATE':         Print output using the given Go template.<br>Refer to https://docs.docker.com/go/formatting/ for more information about formatting output with templates |
| `-q`, `--quiet` |  |  Only show context names |



## Examples

Use `docker context ls` to print all contexts. The currently active context is
indicated with an `*`:

```console
$ docker context ls

NAME                DESCRIPTION                               DOCKER ENDPOINT                      ORCHESTRATOR
default *           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock          swarm
production                                                    tcp:///prod.corp.example.com:2376
staging                                                       tcp:///stage.corp.example.com:2376
```



