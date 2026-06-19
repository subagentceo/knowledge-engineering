# Context Management — Anthropic API Reference

Sources:
- https://platform.claude.com/docs/en/build-with-claude/context-windows
- https://platform.claude.com/docs/en/build-with-claude/compaction
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching

Saved: 2026-06-08

---

## Context Windows

The context window is Claude's "working memory" — all text it can reference when generating a response, including the response itself.

| Model | Context window |
|-------|---------------|
| Claude Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6 | 1M tokens |
| Claude Sonnet 4.5, Haiku 4.5 | 200k tokens |

**Context rot:** Accuracy and recall degrade as token count grows, even within window limits. Curation matters as much as capacity.

### Extended Thinking

- Thinking blocks count toward the context window but are **automatically stripped** by the API from subsequent turn inputs — no manual stripping needed.
- Effective calculation: `context_window = (input_tokens - previous_thinking_tokens) + current_turn_tokens`
- Exception: when returning tool results, the entire thinking block that accompanied the tool request **must** be included verbatim (cryptographic signature verified).

### Context Awareness (Sonnet 4.6 / 4.5 / Haiku 4.5)

These models receive their token budget at conversation start:
```
<budget:token_budget>1000000</budget:token_budget>
```
And per-tool-call updates:
```
<system_warning>Token usage: 35000/1000000; 965000 remaining</system_warning>
```

### Overflow Behavior (Claude 4.5+)

On 4.5+ models, if `input_tokens + max_tokens` exceeds window size, the API accepts the request and stops generation with `stop_reason: "model_context_window_exceeded"` rather than returning a validation error.

---

## Compaction (Beta)

Server-side summarization that automatically condenses older context when approaching the window limit.

**Beta header required:** `compact-2026-01-12`

**Supported models:** Claude Mythos Preview, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6

### Basic Usage

```python
from anthropic import Anthropic

client = Anthropic()
messages = [{"role": "user", "content": "Help me build a website"}]

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-8",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

# Always append the full response (includes compaction block if triggered)
messages.append({"role": "assistant", "content": response.content})
```

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `trigger.type` | `input_tokens` | Trigger type |
| `trigger.value` | 150,000 | Trigger threshold (min 50,000) |
| `pause_after_compaction` | `false` | Pause for manual intervention after summary |
| `instructions` | Default prompt | Completely replaces default summary instructions |

### Compaction Block

When triggered, response contains a `compaction` block at start:
```json
{
  "type": "compaction",
  "content": "Summary of conversation: ..."
}
```
Pass this block back on subsequent requests. The API drops all content before it.

### Custom Instructions

```python
context_management={
    "edits": [{
        "type": "compact_20260112",
        "instructions": "Summarize inside <summary></summary>. Do not call any tools.",
    }]
}
```
> Note: When `tools` are defined, occasionally the model calls a tool during summarization instead of writing a summary. Fix: always set `instructions` to explicitly forbid tool calls.

### With Prompt Caching

Add `cache_control` to the compaction block to cache the summary:
```json
{
  "type": "compaction",
  "content": "[summary]",
  "cache_control": {"type": "ephemeral"}
}
```
Also add a cache breakpoint at the end of your system prompt so it stays cached across compaction events:
```python
system=[{
    "type": "text",
    "text": "You are a helpful coding assistant...",
    "cache_control": {"type": "ephemeral"},
}]
```

### Usage Accounting

Compaction adds a sampling iteration. To get true total cost, sum across `usage.iterations`:
```json
{
  "usage": {
    "input_tokens": 23000,
    "output_tokens": 1000,
    "iterations": [
      {"type": "compaction", "input_tokens": 180000, "output_tokens": 3500},
      {"type": "message",    "input_tokens": 23000,  "output_tokens": 1000}
    ]
  }
}
```

---

## Prompt Caching

Cache stable prompt prefixes (system prompt, docs, examples) to reduce cost and latency on repeated requests.

### How to Use

Add `cache_control: {type: "ephemeral"}` to the last block in a cacheable prefix:

```python
system=[
    {"type": "text", "text": "Long stable system instructions...", "cache_control": {"type": "ephemeral"}},
]
```

For messages:
```python
messages=[
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Large reference document...", "cache_control": {"type": "ephemeral"}},
            {"type": "text", "text": "What does section 3 say?"},
        ]
    }
]
```

### Cache Lifetime

- **Ephemeral**: 5 minutes (default), refreshed on each cache hit.
- Cache hits save ~90% on cached token cost; read at ~10% of write cost.

### Cache Hit in Usage

```json
{
  "usage": {
    "input_tokens": 100,
    "cache_creation_input_tokens": 5000,
    "cache_read_input_tokens": 4900
  }
}
```

### Best Practices for e2m

1. Put the stable CLAUDE.md / system context at the top with a cache breakpoint.
2. Put dynamic message content (user prompts, tool results) after the cache breakpoint.
3. For compaction + caching: cache breakpoint at end of system prompt keeps it cached across compaction events.
4. Minimum cacheable block: 1,024 tokens (Claude Haiku: 2,048 tokens).
