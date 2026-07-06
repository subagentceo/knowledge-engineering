# docker mcp profile tools

**Description:** Manage tool allowlist for servers in a profile

**Usage:** `docker mcp profile tools <profile-id> [--enable <tool> ...] [--disable <tool> ...] [--enable-all <server> ...] [--disable-all <server> ...]`










## Description

Manage the tool allowlist for servers in a profile.
Tools are specified using dot notation: <serverName>.<toolName>

Use --enable to enable specific tools for a server (can be specified multiple times).
Use --disable to disable specific tools for a server (can be specified multiple times).
Use --enable-all to enable all tools for a server (can be specified multiple times).
Use --disable-all to disable all tools for a server (can be specified multiple times).

To view enabled tools, use: docker mcp profile show <profile-id>


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--disable` |  |  Disable specific tools: <serverName>.<toolName> (repeatable) |
| `--disable-all` |  |  Disable all tools for a server: <serverName> (repeatable) |
| `--enable` |  |  Enable specific tools: <serverName>.<toolName> (repeatable) |
| `--enable-all` |  |  Enable all tools for a server: <serverName> (repeatable) |



## Examples

  # Enable specific tools for a server
  docker mcp profile tools my-profile --enable github.create_issue --enable github.list_repos

  # Disable specific tools for a server
  docker mcp profile tools my-profile --disable github.create_issue --disable github.search_code

  # Enable and disable in one command
  docker mcp profile tools my-profile --enable github.create_issue --disable github.search_code

  # Enable all tools for a server
  docker mcp profile tools my-profile --enable-all github

  # Disable all tools for a server
  docker mcp profile tools my-profile --disable-all github

  # View all enabled tools in the profile
  docker mcp profile show my-profile



