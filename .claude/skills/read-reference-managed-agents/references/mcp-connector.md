# MCP connector

Connect MCP servers to your agents for access to external tools and data sources.

---

Claude Managed Agents supports connecting [Model Context Protocol (MCP)](https://modelcontextprotocol.io) servers to your agents. This gives the agent access to external tools, data sources, and services through a standardized protocol.

MCP configuration is split across two steps:

1. **Agent creation** declares which MCP servers the agent connects to, by name and URL.
2. **Session creation** supplies auth for those servers by referencing a pre-registered [vault](/docs/en/managed-agents/vaults).

This separation keeps secrets out of reusable agent definitions while letting each session authenticate with its own credentials.

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

## Declare MCP servers on the agent

Specify MCP servers in the `mcp_servers` array when creating an agent. Each server needs a `type`, a unique `name`, and a `url`. No auth tokens are provided at this stage.

The `name` you assign in the MCP server array is used to reference the `mcp_toolset` entries in the tools array.

```python
agent = client.beta.agents.create(
    name="GitHub Assistant",
    model="claude-opus-4-7",
    mcp_servers=[
        {
            "type": "url",
            "name": "github",
            "url": "https://api.githubcopilot.com/mcp/",
        },
    ],
    tools=[
        {"type": "agent_toolset_20260401"},
        {"type": "mcp_toolset", "mcp_server_name": "github"},
    ],
)
```

<Tip>
The MCP toolset defaults to a permission policy of `always_ask`, which requires user approval before each tool call. See [permission policies](/docs/en/managed-agents/permission-policies) to configure this behavior.
</Tip>

## Provide auth at session creation

When starting a session, pass `vault_ids` to provide credentials for your MCP servers. Vaults are collections of credentials that you register once and reference by ID. See [Authenticate with vaults](/docs/en/managed-agents/vaults) for how to create vaults and manage credentials.

```python
session = client.beta.sessions.create(
    agent=agent.id,
    environment_id=environment.id,
    vault_ids=[vault.id],
)
```

If the authorization credentials supplied in the vault are invalid, session creation will succeed and interaction is still possible. A `session.error` event is emitted describing the MCP auth failure.

## Supported MCP server types

Claude Managed Agents connects to [remote MCP servers](/docs/en/agents-and-tools/remote-mcp-servers) that expose an HTTP endpoint. The server must support the MCP protocol's streamable HTTP transport.

For more information on MCP and building MCP servers, see the [MCP documentation](https://modelcontextprotocol.io).
