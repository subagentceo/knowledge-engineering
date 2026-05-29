---
name: making-requests
description: How to make a basic Anthropic Messages API request and manage conversation state. Trigger when picking between Opus/Sonnet/Haiku, setting up the anthropic SDK client, calling client.messages.create(), building multi-turn message history, writing a system prompt, or tuning temperature for creative vs factual output.
---

# Making Requests

> Distilled from the *Building with the Claude API* course.

## Overview

How a request flows from client to the Anthropic API, which model family to pick, and how to maintain conversation state across turns. The API is stateless: you resend the full message history on every call. Pick the model by priority (intelligence → Opus, speed → Haiku, balanced → Sonnet), steer behavior with a system prompt, and tune randomness with temperature.

## Quick start

```python
message = client.messages.create(
    model=model,
    max_tokens=1000,
    messages=[{"role": "user", "content": "What is quantum computing?"}],
)
text = message.content[0].text   # extract just the generated text
```

Required inputs: API key, model name, `messages` list, `max_tokens`. See [scripts/basic_request.py](scripts/basic_request.py) for the full client setup, and [scripts/conversation_helpers.py](scripts/conversation_helpers.py) for `add_user_message` / `add_assistant_message` / `chat` with system prompt and temperature.

## References

- [references/model-selection.md](references/model-selection.md) — Opus/Sonnet/Haiku tradeoffs and the selection rule.
- [references/api-access-flow.md](references/api-access-flow.md) — client→server→API flow, why you never call the API from a client, setup, and token generation under the hood.
- [references/multi-turn-state.md](references/multi-turn-state.md) — stateless multi-turn history, system prompts, and temperature.

## Source
Course notes: "Overview of Claude Models", "Accessing the API", "Making a Request", "Multi-Turn Conversations", "System Prompts", "Temperature" — projects/courses/building-with-the-claude-api__1p.txt
