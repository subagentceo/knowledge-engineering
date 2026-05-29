# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Sampling — server asks the client to run an LLM generation.

Sampling lets an MCP server ask the client to run a language-model
generation on its behalf, so the server never holds an API key, never
handles auth, and never pays for tokens. Primary use case: publicly
accessible servers that need LLM capability without bundling credentials.

Architecture: server builds a message request -> client receives it
through a sampling callback -> client calls the LLM -> client returns the
generated text to the server. Sampling is a server-to-client request, so it
depends on a transport supporting that direction (stateless HTTP and the
json_response flag break it).
"""

# ---- Server side ----------------------------------------------------------
# Inside a tool, ctx.session.create_message asks the client to generate text.
# result carries the text the client generated.
#
#   result = await ctx.session.create_message(messages=[...], max_tokens=...)


# ---- Client side ----------------------------------------------------------
# Register a sampling callback when constructing the session. The client
# owns the API key and returns a CreateMessageResult to the server.
async def sampling_callback(context, params):
    text = call_my_llm(params.messages)  # client owns the API key
    return CreateMessageResult(...)  # returned to the server
