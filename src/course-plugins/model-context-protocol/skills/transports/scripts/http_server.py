# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
# ]
# ///
"""MCP server over the StreamableHTTP transport.

HTTP lets the server be hosted remotely at a public URL. HTTP is naturally
client->server only, so server-initiated traffic (sampling, progress,
logging, resource subscriptions) rides on Server-Sent Events (SSE).

Two flags trade functionality for scalability/simplicity (both default False):

- stateless_http=True  -> no session IDs, disables the GET-SSE server->client
  pathway; eliminates sampling, progress, logging, and resource subscriptions.
  Use when horizontally scaling behind a load balancer.
- json_response=True   -> POST returns the final result as plain JSON only,
  with no intermediate streamed progress/log messages.

Keep dev and production on the same transport/flags to avoid
"works locally, fails deployed" surprises.
"""

from mcp.server.fastmcp import FastMCP

mcp = FastMCP(
    "docs",
    stateless_http=False,
    json_response=False,
)


@mcp.tool()
def read_doc_contents(doc_id: str) -> str:
    return f"contents of {doc_id}"


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
