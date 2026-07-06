# docker compose commit

**Description:** Create a new image from a service container's changes

**Usage:** `docker compose commit [OPTIONS] SERVICE [REPOSITORY[:TAG]]`










## Description

Create a new image from a service container's changes


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-a`, `--author` |  |  Author (e.g., "John Hannibal Smith <hannibal@a-team.com>") |
| `-c`, `--change` |  |  Apply Dockerfile instruction to the created image |
| `--index` |  |  index of the container if service has multiple replicas. |
| `-m`, `--message` |  |  Commit message |
| `-p`, `--pause` | `true` |  Pause container during commit |






