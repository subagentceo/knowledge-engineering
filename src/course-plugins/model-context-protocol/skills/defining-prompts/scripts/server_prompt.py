# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
# ]
# ///
"""Defining MCP server prompts with the Python SDK.

Prompts are user-controlled — invoked by a user action (a button or a
slash command like /format). They let the server author ship pre-written,
tested, domain-tuned instructions. Use the @mcp.prompt decorator with a
name and description; the function receives arguments (e.g. a document id),
interpolates them into the template, and returns a list of messages
(user/assistant format) sent directly to Claude.
"""

from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.prompts import base

mcp = FastMCP("docs")


@mcp.prompt(name="format", description="Rewrites a document in markdown")
def format_document(doc_id: str) -> list[base.Message]:
    prompt_text = f"Reformat the document with id '{doc_id}' into clean markdown."
    return [base.UserMessage(prompt_text)]
