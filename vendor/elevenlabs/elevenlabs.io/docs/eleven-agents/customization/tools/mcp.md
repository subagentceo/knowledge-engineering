> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Model Context Protocol

You are responsible for the security, compliance, and behavior of any third-party MCP server you
integrate with your ElevenLabs conversational agents. ElevenLabs provides the platform for
integration but does not manage, endorse, or secure external MCP servers.

## Overview

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that defines how applications provide context to Large Language Models (LLMs). Think of MCP as a universal connector that enables AI models to seamlessly interact with diverse data sources and tools. By integrating servers that implement MCP, you can significantly extend the capabilities of your ElevenLabs conversational agents.

MCP support is not currently available for users on Zero Retention Mode or those requiring HIPAA
compliance.

ElevenLabs allows you to connect your conversational agents to external MCP servers. This enables your agents to:

* Access and process information from various data sources via the MCP server
* Utilize specialized tools and functionalities exposed by the MCP server
* Create more dynamic, knowledgeable, and interactive conversational experiences

## Getting started

ElevenLabs supports both SSE (Server-Sent Events) and HTTP streamable transport MCP servers.

In this example, we'll use [Zapier MCP](https://zapier.com/mcp), which lets you connect ElevenAgents to hundreds of tools and services.

MCP servers are not yet manageable via the ElevenLabs CLI — use the dashboard or SDK.

Navigate to the [MCP server integrations dashboard](https://elevenlabs.io/app/agents/integrations) and click **Add Custom MCP Server**.

![Creating your first MCP server](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/335d1d8fced3cd82eed4ed43ba0058d3a8dbc431f81cdb387bf3d5964e5ead80/assets/images/conversational-ai/mcp-create.png)

Enter the following details:

* **Name**: The name of the MCP server (e.g., "Zapier MCP Server")
* **Description**: A description of what the MCP server can do
* **Server URL**: The URL of the MCP server. If this contains a secret key, treat it like a password and store it as a workspace secret.
* **Secret Token** (optional): Authorization header value
* **HTTP Headers** (optional): Any additional headers the server requires

Click **Add Integration** to save the integration and test the connection to list available tools.

![Zapier example tools](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/7c9d83baedd0e2dc74014d4a690159333bbef0eec37c36fa9ee0fd6cd455df0e/assets/images/conversational-ai/mcp-zapier.png)

The MCP server is now available to add to your agents. MCP support is available for both public and private agents.

![Adding the MCP server to an agent](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b18756710b4466a5fa462080d6f3b237d84f76f898d5c94d4583f31d2fa0395b/assets/images/conversational-ai/mcp-add.png)

```python
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs()

server = elevenlabs.conversational_ai.mcp_servers.create(
    config={
        "url": "https://mcp.zapier.com/api/mcp/...",
        "name": "Zapier MCP Server",
        "description": "An MCP server with access to Zapier's tools and services",
        "approval_policy": "always_ask",
        "transport": "SSE",
    },
)

elevenlabs.conversational_ai.agents.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    conversation_config={
        "agent": {"prompt": {"mcp_server_ids": [server.id]}},
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

const server = await elevenlabs.conversationalAi.mcpServers.create({
  config: {
    url: "https://mcp.zapier.com/api/mcp/...",
    name: "Zapier MCP Server",
    description: "An MCP server with access to Zapier's tools and services",
    approvalPolicy: "always_ask",
    transport: "SSE",
  },
});

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  conversationConfig: {
    agent: { prompt: { mcpServerIds: [server.id] } },
  },
});
```

## Tool approval modes

ElevenLabs provides flexible approval controls to manage how agents request permission to use tools from MCP servers. You can configure approval settings at both the MCP server level and individual tool level for maximum security control.

![Tool approval mode settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9f4c208459131622478de5010e2234d3af8a03dc9bc5b7ec2fcab48a7be3bde3/assets/images/conversational-ai/mcp-approval.png)

### Available approval modes

* **Always Ask (Recommended)**: Maximum security. The agent will request your permission before each tool use.
* **Fine-Grained Tool Approval**: Disable and pre-select tools which can run automatically and those requiring approval.
* **No Approval**: The assistant can use any tool without approval.

### Fine-grained tool control

The Fine-Grained Tool Approval mode allows you to configure individual tools with different approval requirements, giving you precise control over which tools can run automatically and which require explicit permission.

![Fine-grained tool approval
settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/041cad753319ed92189ee8d4f70a9d3ed07177303bf71777ce36a90270a5dd24/assets/images/conversational-ai/mcp-finegrained-approvals.png)

For each tool, you can set:

* **Auto-approved**: Tool runs automatically without requiring permission
* **Requires approval**: Tool requires explicit permission before execution
* **Disabled**: Tool is completely disabled and cannot be used

Use Fine-Grained Tool Approval to allow low-risk read-only tools to run automatically while
requiring approval for tools that modify data or perform sensitive operations.

## Key considerations for ElevenLabs integration

* **External servers**: You are responsible for selecting the external MCP servers you wish to integrate. ElevenLabs provides the means to connect to them.
* **Supported features**: ElevenLabs supports MCP servers that communicate over SSE (Server-Sent Events) and HTTP streamable transports for real-time interactions.
* **Dynamic tools**: The tools and capabilities available from an integrated MCP server are defined by that external server and can change if the server's configuration is updated.

## Security and disclaimer

Integrating external MCP servers can expose your agents and data to third-party services. It is crucial to understand the security implications.

By enabling MCP server integrations, you acknowledge that this may involve data sharing with
third-party services not controlled by ElevenLabs. This could incur additional security risks.
Please ensure you fully understand the implications, vet the security of any MCP server you
integrate, and review our [MCP Integration Security
Guidelines](/docs/eleven-agents/customization/tools/mcp/security) before proceeding.

Refer to our [MCP Integration Security Guidelines](/docs/eleven-agents/customization/tools/mcp/security) for detailed best practices.

## Finding or building MCP servers

* Utilize publicly available MCP servers from trusted providers
* Develop your own MCP server to expose your proprietary data or tools
* Explore the Model Context Protocol community and resources for examples and server implementations

### Resources

* [Anthropic's MCP server examples](https://docs.anthropic.com/en/docs/agents-and-tools/remote-mcp-servers#remote-mcp-server-examples) - A list of example servers by Anthropic
* [Awesome Remote MCP Servers](https://github.com/jaw9c/awesome-remote-mcp-servers) - A curated, open-source list of remote MCP servers
* [Remote MCP Server Directory](https://remote-mcp.com/) - A searchable list of Remote MCP servers