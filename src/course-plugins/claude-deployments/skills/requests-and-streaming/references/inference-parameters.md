# Inference parameters: where they live on each platform

> Distilled from the *Claude with Amazon Bedrock* and *Claude with Google Cloud Vertex AI* courses.

The *meaning* of every parameter (system prompt, temperature, max tokens, stop sequences) is the
same as the first-party API — see `claude-api`. What differs is **where the parameter goes**.

## Bedrock — bundled into `inference_config` / dedicated kwargs on `converse`
- **System prompt**: `system=` keyword, passed as a **list of dicts** with a `text` field, e.g.
  `system=[{"text": "You are an AWS cloud support specialist"}]`. Must be ≥1 character; make the
  param optional (default `None`) so an empty string never errors.
- **Temperature**: inside `inference_config`, e.g.
  `inferenceConfig={"temperature": 0.0}`. Decimal 0–1; default 1.0.
- **Stop sequences**: `inferenceConfig={"stopSequences": ["```"]}`. Multiple allowed; the matched
  sequence is excluded from output.
- **Prefill**: append an `{"role": "assistant", "content": [{"text": "```json"}]}` message to the
  list; Claude continues from it. Concatenate the prefill back onto the response for the full text.

## Vertex — top-level kwargs on `messages.create` (native Anthropic)
- **System prompt**: `system="..."` as a plain string. Cannot be `None` — conditionally include
  the kwarg only when a prompt exists.
- **Temperature**: top-level `temperature=0.0` kwarg.
- **Stop sequences**: top-level `stop_sequences=["```"]`.
- **`max_tokens`**: required top-level kwarg (safety ceiling).
- **Prefill**: append an assistant message with partial `content`; same semantics as `claude-api`.
