# Accessing Resources

For resources: `read_resource(uri)` pulls `result.contents[0]`, branches on `mimeType` (parse JSON vs. return text). Selected resource contents get folded into the prompt — so a tool is not needed just to read a document during chat.

Dependencies: `json`, `pydantic.AnyUrl`.

```python
async def read_resource(self, uri: str):
    result = await self.session.read_resource(AnyUrl(uri))
    resource = result.contents[0]
    if resource.mimeType == "application/json":
        return json.loads(resource.text)
    return resource.text
```

See [`scripts/client.py`](../scripts/client.py) for this method in the full wrapper.
