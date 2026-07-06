# docker dhi mirror list

**Description:** List all mirrored Docker Hardened Images

**Usage:** `docker dhi mirror list`










## Description

List all Docker Hardened Images currently being mirrored to your organization's registry.

Shows the source repositories, destination repositories, and mirroring status.

Examples:
  # List all mirrored repositories
  docker dhi mirror list --org myorg

  # List only image repositories
  docker dhi mirror list --org myorg --type image

  # List only helm chart repositories
  docker dhi mirror list --org myorg --type helm-chart

  # Search for a specific repository by name
  docker dhi mirror list --org myorg --filter dhi-python

  # Output in JSON format
  docker dhi mirror list --org myorg --json


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--filter` |  |  Filter by repository name (partial match) |
| `--json` |  |  Output in JSON format |
| `--type` |  |  Filter by repository type (image or helm-chart) |






