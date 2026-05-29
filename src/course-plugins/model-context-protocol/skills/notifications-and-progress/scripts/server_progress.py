# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "mcp>=1.0",
# ]
# ///
"""MCP tool that emits real-time log and progress notifications.

A tool function automatically receives a Context argument as its last
parameter. ctx.info(...) emits a logging message and
ctx.report_progress(...) emits a progress update; both are sent back to
the client automatically. They are an optional, purely-UX enhancement and
depend on a transport that supports server->client traffic.
"""

from mcp.server.fastmcp import Context, FastMCP

mcp = FastMCP("docs")


@mcp.tool()
async def process(items: list[str], ctx: Context) -> str:
    for i, item in enumerate(items):
        await ctx.info(f"processing {item}")
        await ctx.report_progress(progress=i, total=len(items))
    return "done"
