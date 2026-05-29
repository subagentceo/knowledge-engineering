# Prompts in the Client

For prompts: `list_prompts()` then `get_prompt(name, arguments)` — arguments pass as keyword params, the server interpolates them, and the returned messages form the conversation input.

```python
async def list_prompts(self):
    result = await self.session.list_prompts()
    return result.prompts

async def get_prompt(self, name, arguments):
    result = await self.session.get_prompt(name, arguments)
    return result.messages
```

See [`scripts/client.py`](../scripts/client.py) for these methods in the full wrapper.
