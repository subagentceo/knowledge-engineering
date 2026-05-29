---
name: sampling
description: Let an MCP server request LLM text generation from the client (via create_message and a client sampling callback) so the server never needs its own API key or token budget. Trigger when a public/remote server needs model output, or when asked how servers get LLM access without holding credentials.
---

# Sampling

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

**Sampling** lets an MCP server ask the **client** to run a language-model generation on its behalf, instead of the server accessing an LLM directly. The server never holds an API key, never handles auth, and never pays for tokens.

Runnable snippets: [`scripts/sampling.py`](scripts/sampling.py).

## Why
Primary use case: **publicly accessible servers** that need LLM capability without bundling credentials. Pushing LLM access to the client:
- removes API-key requirements from the server,
- avoids server-side complexity for LLM integration,
- prevents unauthorized token usage on public servers.

## Architecture
Server builds a message request → client receives it through a **sampling callback** → client calls the LLM → client returns the generated text to the server.

```python
# Server side
result = await ctx.session.create_message(messages=[...], max_tokens=...)
# `result` carries the text the client generated.

# Client side: register a sampling callback when constructing the session.
async def sampling_callback(context, params):
    text = call_my_llm(params.messages)        # client owns the API key
    return CreateMessageResult(...)            # returned to the server
```

## Key API
- Server: `create_message()` with a message list.
- Client: a sampling callback that handles the request and returns a `create_message_result`.

Note: sampling is a **server-to-client request**, so it depends on the transport supporting that direction (see the `transports` skill — stateless HTTP and the JSON-response flag break it).

## Source
Course note: "Sampling" — projects/courses/mcp_advanced file
