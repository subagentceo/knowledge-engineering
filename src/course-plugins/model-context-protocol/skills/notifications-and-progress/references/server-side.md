# Server Side — Emitting Notifications

A tool function automatically receives a **context** argument as its last parameter. The context exposes:
- `ctx.info(...)` — emit a logging message.
- `ctx.report_progress(...)` — emit a progress update.

Calling these automatically sends messages back to the client.

```python
@mcp.tool()
async def process(items: list[str], ctx: Context) -> str:
    for i, item in enumerate(items):
        await ctx.info(f"processing {item}")
        await ctx.report_progress(progress=i, total=len(items))
    return "done"
```

See [`scripts/server_progress.py`](../scripts/server_progress.py) for the runnable tool.
