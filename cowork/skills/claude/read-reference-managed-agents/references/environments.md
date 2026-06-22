# Cloud environment setup

Customize cloud containers for your sessions.

---

Environments define the container configuration where your agent runs. You create an environment once, then reference its ID each time you start a session. Multiple sessions can share the same environment, but each session gets its own isolated container instance.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Create an environment

```python
environment = client.beta.environments.create(
    name="python-dev",
    config={
        "type": "cloud",
        "networking": {"type": "unrestricted"},
    },
)

print(f"Environment ID: {environment.id}")
```

The `name` must be unique within your organization and workspace.

## Use the environment in a session

Pass the environment ID as a string when creating a session.

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
)
```

## Configuration options

### Packages

The `packages` field pre-installs packages into the container before the agent starts. Packages are installed by their respective package managers and cached across sessions that share the same environment. When multiple package managers are specified, they run in alphabetical order (apt, cargo, gem, go, npm, pip). You can optionally pin specific versions; the default is latest.

```python
environment = client.beta.environments.create(
    name="data-analysis",
    config={
        "type": "cloud",
        "packages": {
            "pip": ["pandas", "numpy", "scikit-learn"],
            "npm": ["express"],
        },
        "networking": {"type": "unrestricted"},
    },
)
```

Supported package managers:

| Field | Package manager | Example |
| --- | --- | --- |
| `apt` | System packages (apt-get) | `"ffmpeg"` |
| `cargo` | Rust (cargo) | `"ripgrep@14.0.0"` |
| `gem` | Ruby (gem) | `"rails:7.1.0"` |
| `go` | Go modules | `"golang.org/x/tools/cmd/goimports@latest"` |
| `npm` | Node.js (npm) | `"express@4.18.0"` |
| `pip` | Python (pip) | `"pandas==2.2.0"` |

### Networking

The `networking` field controls the container's outbound network access. It does not impact the `web_search` or `web_fetch` tools' allowed domains.

| Mode | Description |
| --- | --- |
| `unrestricted` | Full outbound network access, except for a general safety blocklist. This is the default. |
| `limited` | Restricts container network access to the `allowed_hosts` list. Further access is enabled via the `allow_package_managers` and `allow_mcp_servers` bool.|

```python
config = {
    "type": "cloud",
    "networking": {
        "type": "limited",
        "allowed_hosts": ["api.example.com"],
        "allow_mcp_servers": True,
        "allow_package_managers": True,
    },
}
```

<Info>
For production deployments, use `limited` networking with an explicit `allowed_hosts` list. Follow the principle of least privilege by granting only the minimum network access your agent requires, and regularly audit your allowed domains.
</Info>

When using `limited` networking:
- `allowed_hosts` specifies domains the container can reach. These must be HTTPS-prefixed.
- `allow_mcp_servers` permits outbound access to MCP server endpoints configured on the agent, beyond those listed in the `allowed_hosts` array. Defaults to `false`.
- `allow_package_managers` permits outbound access to public package registries (PyPI, npm, etc.) beyond those listed in the `allowed_hosts` array. Defaults to `false`.

## Environment lifecycle

- Environments persist until explicitly archived or deleted.
- Multiple sessions can reference the same environment.
- Each session gets its own container instance. Sessions do not share file system state.
- Environments are not versioned. If you frequently update your environments, you may want to log these updates on your side, to map environment state with sessions.

## Manage environments

```python
# List environments
environments = client.beta.environments.list()

# Retrieve a specific environment
env = client.beta.environments.retrieve(environment.id)

# Archive an environment (read-only, existing sessions continue)
client.beta.environments.archive(environment.id)

# Delete an environment (only if no sessions reference it)
client.beta.environments.delete(environment.id)
```

## Pre-installed runtimes

Cloud containers include common runtimes out of the box. See [Container reference](/docs/en/managed-agents/cloud-containers) for the full list of pre-installed languages, databases, and utilities.
