# Accessing GitHub

Connect your agent to GitHub repositories for cloning, reading, and creating pull requests.

---

You can mount a GitHub repository to your session container and connect to the GitHub MCP for making pull requests.

GitHub repositories are cached, so future sessions that use the same repository start faster.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## GitHub MCP and Session Resources

First, create an agent that declares the GitHub MCP server. The agent definition holds the server URL but no auth token.

Then create a session that mounts the GitHub repository:

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    resources=[
        {
            "type": "github_repository",
            "url": "https://github.com/org/repo",
            "mount_path": "/workspace/repo",
            "authorization_token": "ghp_your_github_token",
        },
    ],
)
```

The `resources[].authorization_token` authenticates the repository clone operation and is not echoed in API responses.

## Token permissions

When providing a GitHub token, use the minimum required permissions:

| Action | Required scopes |
|--------|----------------|
| Clone private repos | `repo` |
| Create PRs | `repo` |
| Read issues | `repo` (private) or `public_repo` |
| Create issues | `repo` (private) or `public_repo` |

<Warning>
Use fine-grained personal access tokens with minimum required permissions. Avoid using tokens with broad access to your GitHub account.
</Warning>

## Multiple repositories

Mount multiple repositories by adding entries to the `resources` array.

## Managing repositories on a running session

After a session is created, you can list its repository resources and rotate their authorization tokens. Each resource has an `id` returned at session creation time (or via `resources.list`) that you use for updates. Repositories are attached for the lifetime of the session; to change which repositories are mounted, create a new session.

```python
# List resources on the session
listed = client.beta.sessions.resources.list(session.id)
repo_resource_id = listed.data[0].id

# Rotate the authorization token
client.beta.sessions.resources.update(
    repo_resource_id,
    session_id=session.id,
    authorization_token="ghp_your_new_github_token",
)
```

## Creating pull requests

With the GitHub MCP server, the agent can create branches, commit changes, and push them:

```python
client.beta.sessions.events.send(
    session.id,
    events=[
        {
            "type": "user.message",
            "content": [
                {
                    "type": "text",
                    "text": "Fix the type error in src/utils.ts, commit it to a new branch, and push it.",
                },
            ],
        },
    ],
)
```
