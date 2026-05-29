# Multi-turn conversations, system prompts, temperature

## Multi-turn conversations

The API is stateless — it stores no messages. To get continuity you maintain the message list yourself and resend the **entire** history on every request. Append the assistant's reply, then the next user message, then resend. Helpers used in the course: `add_user_message(messages, text)`, `add_assistant_message(messages, text)`, `chat(messages)`.

## System prompts

Pass a plain string via the `system` keyword arg to control *how* Claude responds (style/role/behavior), not *what*. First line typically assigns a role ("You are a patient math tutor"), then behavioral instructions. Build a `params` dict, add the `system` key only when a prompt is provided, and call with `**params` so `None` cleanly omits the parameter.

## Temperature

`temperature` (0–1) tunes randomness in next-token selection. `0` is deterministic (always the highest-probability token); higher values raise the chance of lower-probability tokens (more creative/varied). Use near-0 for extraction and factual consistency; near-1 for brainstorming, writing, jokes, marketing. Higher temperature increases the *probability* of variation, it does not guarantee a different output.
