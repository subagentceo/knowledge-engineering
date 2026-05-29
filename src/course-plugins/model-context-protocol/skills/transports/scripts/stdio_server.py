# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
# ]
# ///
"""MCP server over the stdio transport.

The client launches this file as a separate process and talks to it over
stdin/stdout. stdio is fully bidirectional, so sampling, progress, and
logging all work. It only works when client and server are on the same
physical machine.
"""

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("docs")


@mcp.tool()
def read_doc_contents(doc_id: str) -> str:
    return f"contents of {doc_id}"


if __name__ == "__main__":
    # "stdio" is the default transport.
    mcp.run(transport="stdio")
