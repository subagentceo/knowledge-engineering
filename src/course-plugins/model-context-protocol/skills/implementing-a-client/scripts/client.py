# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
#   "pydantic>=2.0",
# ]
# ///
"""MCP client wrapper around the SDK client session.

The client session is the real connection (from the MCP Python SDK) and
needs cleanup on shutdown, so we wrap it in a class that manages the
connection lifecycle (connect / cleanup / __aenter__ / __aexit__) and
exposes server functionality to the rest of the codebase as a clean
interface.
"""

import json

from pydantic import AnyUrl


class MCPClient:
    def __init__(self, session):
        self.session = session

    async def list_tools(self):
        result = await self.session.list_tools()
        return result.tools

    async def call_tool(self, tool_name, tool_input):
        return await self.session.call_tool(tool_name, tool_input)

    async def read_resource(self, uri: str):
        result = await self.session.read_resource(AnyUrl(uri))
        resource = result.contents[0]
        if resource.mimeType == "application/json":
            return json.loads(resource.text)
        return resource.text

    async def list_prompts(self):
        result = await self.session.list_prompts()
        return result.prompts

    async def get_prompt(self, name, arguments):
        result = await self.session.get_prompt(name, arguments)
        return result.messages
