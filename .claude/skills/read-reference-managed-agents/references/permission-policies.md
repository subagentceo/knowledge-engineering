# Permission policies

Control when agent and MCP tools execute.

---

Permission policies control whether server-executed tools (the pre-built agent toolset and MCP toolset) run automatically or wait for your approval. Custom tools are executed by your application and controlled by you, so they are not governed by permission policies.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Permission policy types

| Policy | Behavior |
| --- | --- |
| `always_allow` | The tool executes automatically with no confirmation. |
| `always_ask` | The session pauses and waits for your approval before executing. |

## Set a policy for a toolset

### Agent toolset permissions

When creating an agent, you may optionally apply a policy to every tool in `agent_toolset_20260401` using `default_config.permission_policy`:

```python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-4-7",
    tools=[
        {
            "type": "agent_toolset_20260401",
            "default_config": {
                "permission_policy": {"type": "always_ask"},
            },
        },
    ],
)
```

`default_config` is an optional setting. If you omit it, the agent toolset will be enabled with the default permission policy, `always_allow`.

### MCP toolset permissions

MCP toolsets default to `always_ask`. To auto-approve tools from a trusted MCP server, set `permission_policy` on the `mcp_toolset` entry:

```python
agent = client.beta.agents.create(
    name="Dev Assistant",
    model="claude-opus-4-7",
    mcp_servers=[
        {"type": "url", "name": "github", "url": "https://mcp.example.com/github"},
    ],
    tools=[
        {"type": "agent_toolset_20260401"},
        {
            "type": "mcp_toolset",
            "mcp_server_name": "github",
            "default_config": {
                "permission_policy": {"type": "always_allow"},
            },
        },
    ],
)
```

## Override an individual tool policy

Use the `configs` array to override the default for individual tools. This example allows the full agent toolset by default but requires confirmation before any bash command runs:

```python
tools = [
    {
        "type": "agent_toolset_20260401",
        "default_config": {
            "permission_policy": {"type": "always_allow"},
        },
        "configs": [
            {
                "name": "bash",
                "permission_policy": {"type": "always_ask"},
            },
        ],
    },
]
```

## Respond to confirmation requests

When the agent invokes a tool with an `always_ask` policy:

1. The session emits an `agent.tool_use` or `agent.mcp_tool_use` event.
2. The session pauses with a `session.status_idle` event containing `stop_reason: requires_action`. The blocking event IDs are in the `stop_reason.requires_action.event_ids` array.
3. Send a `user.tool_confirmation` event for each, passing the event ID in the `tool_use_id` param. Set `result` to `"allow"` or `"deny"`. Use `deny_message` to explain a denial.
4. Once all blocking events are resolved, the session transitions back to `running`.

```python
# Allow the tool to execute
client.beta.sessions.events.send(
    session.id,
    events=[
        {
            "type": "user.tool_confirmation",
            "tool_use_id": agent_tool_use_event.id,
            "result": "allow",
        },
    ],
)

# Or deny it with an explanation
client.beta.sessions.events.send(
    session.id,
    events=[
        {
            "type": "user.tool_confirmation",
            "tool_use_id": mcp_tool_use_event.id,
            "result": "deny",
            "deny_message": "Don't create issues in the production project. Use the staging project.",
        },
    ],
)
```

## Custom tools

Permission policies do not apply to custom tools. When the agent invokes a custom tool, your application receives an `agent.custom_tool_use` event and is responsible for deciding whether to execute it before sending back a `user.custom_tool_result`. See [Session event stream](/docs/en/managed-agents/events-and-streaming#handling-custom-tool-calls) for the full flow.
