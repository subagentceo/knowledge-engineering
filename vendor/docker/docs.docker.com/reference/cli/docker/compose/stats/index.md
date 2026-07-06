# docker compose stats

**Description:** Display a live stream of container(s) resource usage statistics

**Usage:** `docker compose stats [OPTIONS] [SERVICE]`










## Description

Display a live stream of container(s) resource usage statistics


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--all` |  |  Show all containers (default shows just running) |
| `--format` |  |  Format output using a custom template:<br>'table':            Print output in table format with column headers (default)<br>'table TEMPLATE':   Print output in table format using the given Go template<br>'json':             Print in JSON format<br>'TEMPLATE':         Print output using the given Go template.<br>Refer to https://docs.docker.com/engine/cli/formatting/ for more information about formatting output with templates |
| `--no-stream` |  |  Disable streaming stats and only pull the first result |
| `--no-trunc` |  |  Do not truncate output |






