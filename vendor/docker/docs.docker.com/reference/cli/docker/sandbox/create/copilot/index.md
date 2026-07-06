# docker sandbox create copilot

**Description:** Create a sandbox for copilot

**Usage:** `docker sandbox create copilot WORKSPACE [EXTRA_WORKSPACE...]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Create a sandbox with access to a host workspace for copilot.

The workspace path is required and will be exposed inside the sandbox at the same path as on the host.
Additional workspaces can be provided as extra arguments. Append ":ro" to mount them read-only.

Use 'docker sandbox run SANDBOX' to start copilot after creation.







