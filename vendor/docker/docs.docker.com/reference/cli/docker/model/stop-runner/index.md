# docker model stop-runner

**Description:** Stop Docker Model Runner (Docker Engine only)

**Usage:** `docker model stop-runner`










## Description

This command stops the Docker Model Runner by removing the running containers, but preserves the container images on disk. Use this command when you want to temporarily stop the runner but plan to start it again later.

To completely remove the runner including images, use `docker model uninstall-runner --images` instead.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--models` |  |  Remove model storage volume |






