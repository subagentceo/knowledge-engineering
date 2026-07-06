# docker mcp catalog create

**Description:** Create a new catalog from a profile, legacy catalog, or community registry


**Usage:** `docker mcp catalog create <oci-reference> [--server <ref1> --server <ref2> ...] [--from-profile <profile-id>] [--from-legacy-catalog <url>] [--from-community-registry <hostname>] [--title <title>]`










## Description

Create a new catalog from a profile, legacy catalog, or community registry



## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--from-community-registry` |  |  Community registry hostname to fetch servers from (e.g. registry.modelcontextprotocol.io)<br> |
| `--from-legacy-catalog` |  |  Legacy catalog URL to create the catalog from |
| `--from-profile` |  |  Profile ID to create the catalog from |
| `--server` |  |  Server to include specified with a URI: https:// (MCP Registry reference) or docker:// (Docker Image reference) or catalog:// (Catalog reference) or file:// (Local file path). Can be specified multiple times.<br> |
| `--title` |  |  Title of the catalog |






