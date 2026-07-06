# docker desktop logs

**Description:** Print log entries for Docker Desktop

**Usage:** `docker desktop logs [OPTIONS]`












## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-b`, `--boot` |  |  Show logs from a specified boot. Zero means the current or boot, one the second last boot, and so on |
| `-c`, `--color` |  |  Enable colored output. Priority levels are highlighted. |
| `-m`, `--color-mode` |  |  Color mode to use. Can be `default` or `priority` |
| `-D`, `--directory` |  |  Specifies a custom directory to search for log entries |
| `-p`, `--priority` | `%!s(int64=-1)` |  Filter output by log priorities. `-1` is all, `0` is info or above, `1` filters for warnings or above, `2` filters for errors. |
| `-S`, `--since` |  |  Start showing entries on or newer than the specified date and time. Uses the systemd.time(7) format. |
| `-u`, `--unit` |  |  Filter by one or more categories (e.g. `--unit=com.docker.backend.ipc`, `com.docker.backend.apiproxy`) |
| `-U`, `--until` |  |  Start showing entries on or before the specified date and time. Uses the systemd.time(7) format. |






