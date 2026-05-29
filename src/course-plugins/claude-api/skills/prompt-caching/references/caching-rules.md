# Rules of prompt caching

Normally Claude processes input (builds internal structures, runs calculations), generates output, then **discards** all that work. If a follow-up request repeats the same input, Claude redoes the identical processing — wasteful. Prompt caching stores the input-processing results temporarily; on an identical follow-up, Claude retrieves the cached work instead of reprocessing, dramatically cutting latency and cost.

## Rules

- **Cache duration:** up to 1 hour.
- **Manual breakpoints:** caching only happens where you add a cache breakpoint.
- **Longhand required:** the shorthand `content = "text"` can't carry cache control. Use longhand: `content = [{"type": "text", "text": "...", "cache_control": {...}}]`.
- **Scope:** everything up to and including a breakpoint is cached.
- **Invalidation:** any change to content *before* a breakpoint invalidates the entire cache.
- **Processing order:** tools → system prompt → messages (joined in that order).
- **Breakpoint placement:** tool schemas, system prompts, or message blocks (text, image, tool_use, tool_result).
- **Max breakpoints:** 4 per request. Multiple breakpoints create cache layers, allowing partial cache hits when only later content changes.
- **Minimum:** content must be ≥ 1024 tokens to be cached.
- **Best for:** repeated identical content — system prompts, tool definitions, static message prefixes.

## Reading usage

- `cache_creation_input_tokens` — tokens written to the cache on first use.
- `cache_read_input_tokens` — tokens retrieved from cache on subsequent identical requests.

Partial cache reads happen when only some content matches. Any change to cached content forces a new cache creation.
