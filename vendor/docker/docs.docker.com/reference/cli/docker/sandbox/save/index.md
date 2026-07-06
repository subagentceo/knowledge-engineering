# docker sandbox save

**Description:** Save a snapshot of the sandbox as a template

**Usage:** `docker sandbox save SANDBOX TAG`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Save a snapshot of the sandbox as a template.

By default, the image is loaded into the host's Docker daemon (requires Docker to be running).
Use --output to save the image to a tar file instead.

Examples:
  # Load into host Docker (requires host Docker running)
  docker sandbox save my-sandbox myimage:v1.0

  # Save to file (works without host Docker)
  docker sandbox save my-sandbox myimage:v1.0 --output /tmp/myimage.tar


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-o`, `--output` |  |  Save image to specified tar file instead of loading into host Docker<br> |






