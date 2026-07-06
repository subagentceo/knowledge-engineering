# docker mcp catalog server ls

**Description:** List servers in a catalog

**Usage:** `docker mcp catalog server ls <oci-reference>`

**Aliases:** `docker mcp catalog server list`








## Description

List all servers in a catalog.

Use --filter to search for servers matching a query (case-insensitive substring matching on server names).
Filters use key=value format (e.g., name=github).


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--filter` |  |  Filter output (e.g., name=github) |
| `--format` | `human` |  Supported: json, yaml, human. |



## Examples

  # List all servers in a catalog
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest

  # Filter servers by name
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest --filter name=github

  # Combine multiple filters (using short flag)
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest -f name=slack -f name=github

  # Output in JSON format
  docker mcp catalog server ls mcp/docker-mcp-catalog:latest --format json



