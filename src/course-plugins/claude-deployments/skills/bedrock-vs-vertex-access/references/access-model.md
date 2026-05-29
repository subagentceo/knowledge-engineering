# Bedrock vs Vertex: the access model and request/response shape

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

Both platforms host the **same Claude models** (Sonnet, Haiku, Opus). What changes is the gateway:
the SDK you import, the client you build, how you name the model, and the shape of the request and
response. **A Bedrock client is NOT the Anthropic API** — different service, different SDK,
different docs. Vertex, by contrast, runs the *actual* Anthropic SDK, so once its client exists the
rest matches `claude-api` almost line-for-line.

## The flow is the same; the layer at the edges differs

`User → your server → (Bedrock client | Vertex client) → Claude → response → server → client`

Never call the provider directly from the browser — credentials stay on the server, same rule as
the first-party API.

## Bedrock (`scripts/bedrock_converse.py`)

- Content is a **list of dicts** — `{"text": ...}` — because a message can hold multiple parts
  (text + images).
- Response text is buried: `response["output"]["message"]["content"][0]["text"]`.

## Vertex (`scripts/vertex_messages.py`)

- This is the **native Anthropic call** (`client.messages.create`), so `content` is a plain string
  on input and you read `message.content[0].text` on output — exactly as in `claude-api`.
- `max_tokens` is required here (it's a safety ceiling, not a target).

## What is IDENTICAL across both (don't re-teach — see `claude-api`)

- Stateless APIs: you resend the full alternating user/assistant message list every turn.
- System prompts, temperature, prefill + stop sequences, structured output, prompt caching,
  extended thinking, image support — same concepts; only the *parameter wiring* differs (covered
  in `requests-and-streaming` and `structured-output`).
