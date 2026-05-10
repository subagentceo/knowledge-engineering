/**
 * Shared cache-control helpers.
 *
 * The Anthropic Messages API caches a *prefix* of the request when a content
 * block carries `cache_control: { type: "ephemeral" }`. Marking the last
 * element of a prefix (system, tools, messages) caches everything up to and
 * including that element as a single block.
 *
 * Centralizing this here keeps every example, seed loader, and tool definition
 * using the same shape and avoids drift if the API surface changes.
 */
import type Anthropic from "@anthropic-ai/sdk";

export const ephemeral = { type: "ephemeral" as const };

export function cachedText(text: string): Anthropic.Messages.TextBlockParam {
  return { type: "text", text, cache_control: ephemeral };
}

export function withCacheBreakpoint<T extends { cache_control?: unknown }>(block: T): T {
  return { ...block, cache_control: ephemeral };
}
