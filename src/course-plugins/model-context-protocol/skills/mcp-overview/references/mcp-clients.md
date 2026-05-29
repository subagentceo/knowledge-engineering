# MCP Clients

## Request/result flow (tools)
User query → your server asks the client for tools → client sends `list_tools` to the server → server returns the list → your server sends query + tools to Claude → Claude requests a tool call → client sends `call_tool` to the server → server runs it (e.g. a GitHub API call) → result flows back → Claude answers. The client is an intermediary; it never executes tools itself.
