# Define your agent

Create a reusable, versioned agent configuration.

---

An agent is a reusable, versioned configuration that defines persona and capabilities. It bundles the model, system prompt, tools, MCP servers, and skills that shape how Claude behaves during a session.

Create the agent once as a reusable resource and reference it by ID each time you [start a session](/docs/en/managed-agents/sessions). Agents are versioned and easier to manage across many sessions.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Agent configuration fields

| Field | Description |
| --- | --- |
| `name` | Required. A human-readable name for the agent. |
| `model` | Required. The Claude [model](/docs/en/about-claude/models/overview) that powers the agent. All Claude 4.5 and later models are supported. |
| `system` | A [system prompt](/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#give-claude-a-role) that defines the agent's behavior and persona. The system prompt is distinct from [user messages](/docs/en/managed-agents/events-and-streaming#user-events), which should describe the work to be done. |
| `tools` | The tools available to the agent. Combines [pre-built agent tools](/docs/en/managed-agents/tools), [MCP tools](/docs/en/managed-agents/mcp-connector), and [custom tools](/docs/en/managed-agents/tools#custom-tools). |
| `mcp_servers` | MCP servers that provide standardized third-party capabilities. |
| `skills` | [Skills](/docs/en/managed-agents/skills) that supply domain-specific context with progressive disclosure. |
| `multiagent` | A coordinator declaration listing the agents this agent can delegate to. See [Multiagent sessions](/docs/en/managed-agents/multi-agent). |
| `description` | A description of what the agent does. |
| `metadata` | Arbitrary key-value pairs for your own tracking. |

## Create an agent

The following example defines a coding agent that uses Claude Opus 4.7 with access to the pre-built agent toolset. The toolset lets the agent write code, read files, search the web, and more. See the [agent tools reference](/docs/en/managed-agents/tools) for the full list of supported tools.

```python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-4-7",
    system="You are a helpful coding agent.",
    tools=[
        {"type": "agent_toolset_20260401"},
    ],
)
```

<Tip>
To use Claude Opus 4.6 with [fast mode](/docs/en/build-with-claude/fast-mode), pass `model` as an object: `{"id": "claude-opus-4-6", "speed": "fast"}`.
</Tip>

The response echoes your configuration and adds `id`, `version`, `created_at`, `updated_at`, and `archived_at` fields. The `version` starts at 1 and increments each time you update the agent.

## Update an agent

Updating an agent generates a new version when the configuration changes. Pass the current `version` to ensure you're updating from a known state.

```python
updated_agent = client.beta.agents.update(
    agent.id,
    version=agent.version,
    system="You are a helpful coding agent. Always write tests.",
)

print(f"New version: {updated_agent.version}")
```

### Update semantics

- **Omitted fields are preserved.** You only need to include the fields you want to change.
- **Scalar fields** (`model`, `system`, `name`, `description`) are replaced with the new value.
- **Array fields** (`tools`, `mcp_servers`, `skills`) are fully replaced by the new array.
- **`multiagent`** is replaced as a whole. Pass `null` to clear it.
- **Metadata** is merged at the key level. Keys you omit are preserved. To delete a specific key, set its value to an empty string.
- **No-op detection.** If the update produces no change, no new version is created.

## Agent lifecycle

| Operation | Behavior |
| --- | --- |
| **Update** | Generates a new agent version when the configuration changes. |
| **List versions** | Returns the full version history so you can track changes over time. |
| **Archive** | Makes the agent read-only. New sessions cannot reference it, but existing sessions continue to run. |

### List versions

```python
for version in client.beta.agents.versions.list(agent.id):
    print(f"Version {version.version}: {version.updated_at.isoformat()}")
```

### Archive an agent

```python
archived = client.beta.agents.archive(agent.id)
print(f"Archived at: {archived.archived_at.isoformat()}")
```

## Next steps

- [Configure tools](/docs/en/managed-agents/tools) to customize which capabilities the agent can use.
- [Attach skills](/docs/en/managed-agents/skills) for domain-specific expertise.
- [Start a session](/docs/en/managed-agents/sessions) that references your agent.
