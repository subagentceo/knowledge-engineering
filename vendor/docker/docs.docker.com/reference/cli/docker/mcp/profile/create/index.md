# docker mcp profile create

**Description:** Create a new profile of MCP servers

**Usage:** `docker mcp profile create --name <name> [--id <id>] --server <ref1> --server <ref2> ... [--connect <client1> --connect <client2> ...]`










## Description

Create a new profile that groups multiple MCP servers together.
A profile allows you to organize and manage related servers as a single unit.
Profiles are decoupled from catalogs. Servers can be:
  - MCP Registry references (e.g. http://registry.modelcontextprotocol.io/v0/servers/312e45a4-2216-4b21-b9a8-0f1a51425073)
  - OCI image references with docker:// prefix (e.g., "docker://my-server:latest"). Images must be self-describing.
  - Catalog references with catalog:// prefix (e.g., "catalog://mcp/docker-mcp-catalog/github+obsidian").
  - Local file references with file:// prefix (e.g., "file://./server.yaml").


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--connect` |  |  Clients to connect to: mcp-client (can be specified multiple times). Supported clients: [claude-code claude-desktop cline codex continue crush cursor gemini goose gordon kiro lmstudio opencode sema4 vscode zed]<br> |
| `--id` |  |  ID of the profile (defaults to a slugified version of the name) |
| `--name` |  |  Name of the profile (required) |
| `--server` |  |  Server to include specified with a URI: https:// (MCP Registry reference) or docker:// (Docker Image reference) or catalog:// (Catalog reference) or file:// (Local file path). Can be specified multiple times.<br> |



## Examples

  # Create a profile with servers from a catalog
  docker mcp profile create --name dev-tools --server catalog://mcp/docker-mcp-catalog/github+obsidian

  # Create a profile with multiple servers (OCI references)
  docker mcp profile create --name my-profile --server docker://my-server:latest --server docker://my-other-server:latest

  # Create a profile with MCP Registry references
  docker mcp profile create --name my-profile --server http://registry.modelcontextprotocol.io/v0/servers/71de5a2a-6cfb-4250-a196-f93080ecc860

  # Connect to clients upon creation
  docker mcp profile create --name dev-tools --connect cursor



