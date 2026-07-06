# docker dhi customization delete

**Description:** Delete one or more customizations

**Usage:** `docker dhi customization delete <id> [id...]`










## Description

Delete one or more Docker Hardened Images customizations by their IDs.

Multiple IDs can be specified as positional arguments.

Examples:
  # Delete a single customization
  docker dhi customization delete abc123

  # Delete multiple customizations
  docker dhi customization delete abc123 def456 ghi789

  # Delete without confirmation prompt
  docker dhi customization delete abc123 def456 --force


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  |  Skip the confirmation prompt; aborts if any ID does not exist |






