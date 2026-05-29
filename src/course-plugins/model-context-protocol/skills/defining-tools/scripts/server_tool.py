# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
#   "pydantic>=2.0",
# ]
# ///
"""Defining MCP server tools with the Python SDK.

Tools are model-controlled — Claude decides when to invoke them. The
@mcp.tool decorator plus typed parameters and pydantic Field descriptions
is all the SDK needs: it auto-generates the JSON schema and the function
wiring, so you never hand-write schemas. Documents live in an in-memory
dict keyed by doc_id; validate existence first and raise ValueError for a
missing document.
"""

from mcp.server.fastmcp import FastMCP
from pydantic import Field

mcp = FastMCP("docs")

docs: dict[str, str] = {}


@mcp.tool()
def read_doc_contents(
    doc_id: str = Field(description="The id of the document to read"),
) -> str:
    if doc_id not in docs:
        raise ValueError(f"Doc with id {doc_id} not found")
    return docs[doc_id]


@mcp.tool()
def edit_document(
    doc_id: str = Field(description="The id of the document to edit"),
    old_string: str = Field(description="Text to replace"),
    new_string: str = Field(description="Replacement text"),
) -> str:
    if doc_id not in docs:
        raise ValueError(f"Doc with id {doc_id} not found")
    docs[doc_id] = docs[doc_id].replace(old_string, new_string)
