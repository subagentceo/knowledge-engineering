# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
# ]
# ///
"""Defining MCP server resources with the Python SDK.

Resources are app-controlled — your application code decides when to fetch
them. Use @mcp.resource with a URI (a route-like address) and a MIME type
(application/json, text/plain, ...), which hints to the client how to
deserialize. Direct/static resources use a fixed URI; templated resources
use a parameterized URI whose wildcards become the function's keyword
arguments. The SDK auto-serializes return values to strings.
"""

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("docs")

docs: dict[str, str] = {}


@mcp.resource("docs://documents", mime_type="application/json")
def list_docs() -> list[str]:
    return list(docs.keys())


@mcp.resource("docs://documents/{doc_id}", mime_type="text/plain")
def fetch_doc(doc_id: str) -> str:
    return docs[doc_id]
