# Implementing a Client (Connecting)

The **MCP client** is the communication interface between your application and the MCP server. Wrap the SDK's **client session** in a class so you can manage connection lifecycle and resource cleanup rather than using the raw session everywhere.

## Why a wrapper class
- The client session is the real connection (from the MCP Python SDK) and needs cleanup on shutdown.
- Lifecycle is handled by connect / cleanup / `__aenter__` / `__aexit__` (async context manager).
- The wrapper exposes server functionality to the rest of the codebase as a clean interface.

## Tool methods
See [`scripts/client.py`](../scripts/client.py) for the full wrapper. The tool-facing methods are `list_tools()` and `call_tool(tool_name, tool_input)`.

## Flow
1. App requests the tool list for Claude → `list_tools()`.
2. Claude selects a tool and supplies parameters.
3. `call_tool()` executes it on the server; results return to Claude.

## Test it
Run the client file directly with a testing harness to confirm it connects and lists tools, then drive it from the CLI (e.g. "what is the contents of report.pdf").
