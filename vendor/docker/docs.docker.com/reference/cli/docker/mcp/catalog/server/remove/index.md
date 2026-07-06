# docker mcp catalog server remove

**Description:** Remove MCP servers from a catalog

**Usage:** `docker mcp catalog server remove <oci-reference> --name <name1> --name <name2> ...`

**Aliases:** `docker mcp catalog server rm`








## Description

Remove MCP servers from a catalog by server name.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--name` |  |  Server name to remove (can be specified multiple times) |



## Examples

  # Remove servers by name
  docker mcp catalog server remove mcp/my-catalog:latest --name github --name slack

  # Remove a single server
  docker mcp catalog server remove mcp/my-catalog:latest --name github



