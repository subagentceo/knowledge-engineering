# Tools


_Tools give agents the ability to interact with the world — read files, run commands, search the web, query databases, and more._

## How Tools Work

When an agent needs to perform an action, it makes a **tool call**. The docker-agent runtime executes the tool and returns the result to the agent, which can then use it to continue its work.

1. Agent receives a user message
2. Agent decides it needs to use a tool (e.g., read a file)
3. docker-agent executes the tool and returns the result
4. Agent incorporates the result and responds

> [!NOTE]
> **Tool Confirmation**
>
> By default, docker-agent asks for user confirmation before executing tools that have side effects (shell commands, file writes). Use `--yolo` to auto-approve all tool calls.

## Built-in Tools

docker-agent ships with several built-in tools that require no external dependencies. Each is enabled by adding its `type` to the agent's `toolsets` list:

| Tool | Description |
| --- | --- |
| [Filesystem](/ai/tools/filesystem/) | Read, write, list, search, and navigate files and directories |
| [Shell](/ai/tools/shell/) | Execute synchronous and background shell commands |
| [Think](/ai/tools/think/) | Step-by-step reasoning scratchpad for planning and decision-making |
| [Todo](/ai/tools/todo/) | Task list management for complex multi-step workflows |
| [Tasks](/ai/tools/tasks/) | Persistent task database shared across sessions |
| [Memory](/ai/tools/memory/) | Persistent key-value storage backed by SQLite |
| [Fetch](/ai/tools/fetch/) | Read content from HTTP/HTTPS URLs (GET only) |
| [Script](/ai/tools/script/) | Define custom shell scripts as named tools |
| [LSP](/ai/tools/lsp/) | Connect to Language Server Protocol servers for code intelligence |
| [API](/ai/tools/api/) | Create custom tools that call HTTP APIs without writing code |
| [OpenAPI](/ai/tools/openapi/) | Generate tools from an OpenAPI 3.x document |
| [RAG](/ai/tools/rag/) | Retrieval-augmented generation over indexed sources |
| [Model Picker](/ai/tools/model-picker/) | Let the agent pick between several models per turn |
| [User Prompt](/ai/tools/user-prompt/) | Ask users questions and collect interactive input |
| [Open URL](/ai/tools/open-url/) | Open a fixed URL in the user's default browser |
| [Transfer Task](/ai/tools/transfer-task/) | Delegate tasks to sub-agents (auto-enabled with `sub_agents`) |
| [Background Agents](/ai/tools/background-agents/) | Dispatch work to sub-agents concurrently |
| [Handoff](/ai/tools/handoff/) | Hand the conversation off to another local agent in the same config (auto-enabled with `handoffs:`) |
| [A2A](/ai/tools/a2a/) | Connect to remote agents via the Agent-to-Agent protocol |
| [MCP Catalog](/ai/tools/mcp-catalog/) | Discover and activate remote MCP servers from the Docker MCP Catalog on demand |

## MCP Tools

docker-agent supports the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) for extending agents with external tools. There are three ways to connect MCP tools:

- **Docker MCP** (recommended) — Run MCP servers in Docker containers via the [MCP Gateway](https://github.com/docker/mcp-gateway). Browse the [Docker MCP Catalog](https://hub.docker.com/search?q=&type=mcp).
- **Local MCP (stdio)** — Run MCP servers as local processes communicating over stdin/stdout.
- **Remote MCP (Streamable HTTP / SSE)** — Connect to MCP servers running on a network. See [Remote MCP Servers](/ai/features/remote-mcp/).

```yaml
toolsets:
  - type: mcp
    ref: docker:duckduckgo
```

See [Tool Config](/ai/configuration/tools/#mcp-tools) for full MCP configuration reference.

> [!TIP]
> **See also**
>
> For full configuration reference, see [Tool Config](/ai/configuration/tools/).

