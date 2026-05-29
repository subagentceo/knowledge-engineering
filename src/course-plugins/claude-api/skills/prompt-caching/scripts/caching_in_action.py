# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Prompt caching in action: make caching the default in your chat function.
# Source: "Prompt Caching", "Rules of Prompt Caching", "Prompt Caching in Action"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# Processing order is tools -> system prompt -> messages. Caching only happens where you add a
# cache_control breakpoint; everything up to and including a breakpoint is cached. Content must
# be >= 1024 tokens to cache. Max 4 breakpoints per request.

import copy
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"


def add_cache_to_tools(tools):
    # Best practice: copy the tools list, clone the last schema, add cache control, overwrite,
    # so you never mutate the original schemas.
    cached = copy.deepcopy(tools)
    cached[-1]["cache_control"] = {"type": "ephemeral"}  # add to the LAST tool
    return cached


def chat(messages, system=None, tools=None):
    params = {"model": model, "max_tokens": 1000, "messages": messages}

    if system:
        # Wrap the system prompt in a text-block dict with cache_control (longhand required).
        params["system"] = [
            {"type": "text", "text": system, "cache_control": {"type": "ephemeral"}}
        ]

    if tools:
        # You can set breakpoints on both tools and system prompt in one request.
        params["tools"] = add_cache_to_tools(tools)

    message = client.messages.create(**params)

    # Reading usage:
    #   cache_creation_input_tokens -> tokens written to the cache on first use
    #   cache_read_input_tokens     -> tokens read from cache on subsequent identical requests
    print("created:", message.usage.cache_creation_input_tokens)
    print("read:", message.usage.cache_read_input_tokens)
    return message
