# Introducing MCP

**MCP (Model Context Protocol)** is a communication layer that gives Claude context and tools without each developer writing tedious per-service integration code. An **MCP client** connects to an **MCP server**; the server holds tools, resources, and prompts as internal components.

## Why it exists
The traditional approach forces every developer to hand-author a tool schema and a function implementation for each service (e.g. every GitHub API endpoint). MCP shifts that work onto a dedicated server that wraps a service into pre-built tools. Whoever owns the service (or anyone) authors the server once; clients just connect.

- It is **not** a replacement for tool use — it is complementary. Tool use is the mechanism; MCP decides *who does the work* of creating the tools.
- Versus raw API calls: MCP saves you from writing/maintaining schemas and functions yourself.
