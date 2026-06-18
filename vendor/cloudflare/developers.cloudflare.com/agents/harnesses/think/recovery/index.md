---
title: Durable recovery
description: Bounded chat recovery, the stream-stall watchdog, repairing interrupted tool calls, and stability detection for Think agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable recovery

Think wraps chat turns in recoverable [fibers](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/) by default (`chatRecovery = true`). If the Durable Object is evicted mid-stream, Think reconstructs any buffered chunks, persists partial output, and schedules either a continuation of the assistant turn or a retry of the unanswered user turn.

Note

This is on by default and works without configuration — most apps never touch this page. Read it when you want provider-specific recovery, a stall watchdog, or to tune the terminal experience after recovery gives up.

When `chatRecovery` is `true`, WebSocket turns, sub-agent `chat()` turns, durable `submitMessages()` executions, auto-continuations, `saveMessages()`, and `continueLastTurn()` are wrapped in `runFiber`.

## Bounded recovery

A stream-stall watchdog abort (`chatStreamStallTimeoutMs`) is treated as just another interruption: when `chatRecovery` is on, a stall routes into this same bounded path — the settled partial is preserved and a continuation is scheduled — so a transient hang recovers automatically. A persistently hanging provider exhausts the budget and terminalizes through the **same** exhaustion handling as a deploy or eviction interruption: `onExhausted` fires, the `chat:recovery:exhausted` event is emitted, and the configured `terminalMessage` is shown (not a raw stall error).

Configure bounded recovery by setting `chatRecovery` to an object:

* [  JavaScript ](#tab-panel-5621)
* [  TypeScript ](#tab-panel-5622)

JavaScript

```

export class MyAgent extends Think {

  chatRecovery = {

    maxAttempts: 6,

    stableTimeoutMs: 10_000,

    terminalMessage: "The assistant was interrupted and could not recover.",

    async onExhausted(ctx) {

      console.warn("Chat recovery exhausted", ctx.incidentId);

    },

  };


  getModel() {

    /* ... */

  }

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  override chatRecovery = {

    maxAttempts: 6,

    stableTimeoutMs: 10_000,

    terminalMessage: "The assistant was interrupted and could not recover.",

    async onExhausted(ctx) {

      console.warn("Chat recovery exhausted", ctx.incidentId);

    },

  };


  getModel() {

    /* ... */

  }

}


```

The same recovery events are available through `agents/observability` on the `chat` channel; transcript repairs are emitted on the `transcript` channel. Refer to [Observability](https://developers.cloudflare.com/agents/runtime/operations/observability/#chat-recovery-events).

## onChatRecovery

Override `onChatRecovery` when you need provider-specific recovery, such as retrieving a stored OpenAI Responses result instead of issuing a new model call:

* [  JavaScript ](#tab-panel-5625)
* [  TypeScript ](#tab-panel-5626)

JavaScript

```

export class MyAgent extends Think {

  chatRecovery = {

    maxAttempts: 10,

    terminalMessage: "The assistant was interrupted. Please try again.",

  };


  async onChatRecovery(ctx) {

    console.log("Recovering chat turn", ctx.incidentId, ctx.attempt);

    return {}; // persist partial output and continue/retry when possible

  }

}


```

TypeScript

```

import type {

  ChatRecoveryContext,

  ChatRecoveryOptions,

} from "@cloudflare/think";


export class MyAgent extends Think<Env> {

  override chatRecovery = {

    maxAttempts: 10,

    terminalMessage: "The assistant was interrupted. Please try again.",

  };


  override async onChatRecovery(

    ctx: ChatRecoveryContext,

  ): Promise<ChatRecoveryOptions> {

    console.log("Recovering chat turn", ctx.incidentId, ctx.attempt);

    return {}; // persist partial output and continue/retry when possible

  }

}


```

### ChatRecoveryContext

| Field           | Type                     | Description                                                                              |
| --------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| incidentId      | string                   | Stable ID for this recovery incident                                                     |
| attempt         | number                   | Current attempt number for this incident, starting at 1                                  |
| maxAttempts     | number                   | Configured attempt cap before terminal exhaustion                                        |
| recoveryKind    | "retry" \| "continue"    | Whether recovery will retry an unanswered user turn or continue a partial assistant turn |
| streamId        | string                   | The stream ID of the interrupted turn                                                    |
| requestId       | string                   | The request ID of the interrupted turn                                                   |
| partialText     | string                   | Text generated before the interruption                                                   |
| partialParts    | MessagePart\[\]          | Parts accumulated before the interruption                                                |
| recoveryData    | unknown \| null          | Data from this.stash() during the turn                                                   |
| messages        | UIMessage\[\]            | Current conversation history                                                             |
| lastBody        | Record<string, unknown>? | Body from the interrupted turn                                                           |
| lastClientTools | ClientToolSchema\[\]?    | Client tools from the interrupted turn                                                   |
| createdAt       | number                   | Epoch milliseconds when the turn started                                                 |

### ChatRecoveryOptions

| Field    | Type     | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| persist  | boolean? | Whether to persist the partial assistant message                |
| continue | boolean? | Whether to auto-continue with a new turn via continueLastTurn() |

With `persist: true`, the partial message is saved. With `continue: true`, Think calls `continueLastTurn()` after the agent reaches a stable state.

For pre-stream interruptions, where `ctx.streamId === ""` and `ctx.partialText === ""` but the latest persisted message is still the unanswered user message, Think retries that turn automatically unless `continue` is `false`.

TypeScript

```

onChatRecovery(ctx: ChatRecoveryContext): ChatRecoveryOptions {

  if (!ctx.streamId && !ctx.partialText) {

    console.log("Recovering a pre-stream interruption");

  }

  return {};

}


```

Use `ctx.createdAt` to skip stale recoveries. For example, if the interrupted turn is older than a few minutes, return `{ continue: false }` so the partial response is preserved without starting an old continuation.

### Recovery budgets and limits

Instead of `chatRecovery = true`, assign an object to tune how long recovery is allowed to run and when it is given up on. A turn that keeps making forward progress is never terminated by the framework on its own — duration is not a bound. Recovery is only sealed by one of the limits in the following table.

* [  JavaScript ](#tab-panel-5629)
* [  TypeScript ](#tab-panel-5630)

JavaScript

```

export class MyAgent extends Think {

  chatRecovery = {

    maxAttempts: 10,

    noProgressTimeoutMs: 5 * 60 * 1000,

    maxRecoveryWork: Infinity,

    terminalMessage: "The assistant was interrupted and could not recover.",

    // Consulted from the second recovery attempt onward. Return false to stop.

    // Called as `config.shouldKeepRecovering(ctx)`, so it is NOT bound to the

    // agent instance — track real token/cost spend in your own store keyed by

    // `ctx.recoveryRootRequestId`.

    async shouldKeepRecovering(ctx) {

      return (await getSpendForTurn(ctx.recoveryRootRequestId)) < MAX_SPEND;

    },

    async onExhausted(ctx) {

      console.warn("Recovery exhausted", ctx.incidentId, ctx.reason);

    },

  };

}


```

TypeScript

```

export class MyAgent extends Think<Env> {

  override chatRecovery = {

    maxAttempts: 10,

    noProgressTimeoutMs: 5 * 60 * 1000,

    maxRecoveryWork: Infinity,

    terminalMessage: "The assistant was interrupted and could not recover.",

    // Consulted from the second recovery attempt onward. Return false to stop.

    // Called as `config.shouldKeepRecovering(ctx)`, so it is NOT bound to the

    // agent instance — track real token/cost spend in your own store keyed by

    // `ctx.recoveryRootRequestId`.

    async shouldKeepRecovering(ctx) {

      return (await getSpendForTurn(ctx.recoveryRootRequestId)) < MAX_SPEND;

    },

    async onExhausted(ctx) {

      console.warn("Recovery exhausted", ctx.incidentId, ctx.reason);

    },

  };

}


```

| Field                | Default          | Description                                                                                                                                                                     |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxAttempts          | 10               | Attempt cap. Resets on forward progress, so it catches a tight no-progress alarm loop, not a healthy long turn.                                                                 |
| stableTimeoutMs      | 10\_000          | How long an attempt waits for the isolate to reach stable state before rescheduling.                                                                                            |
| noProgressTimeoutMs  | 300\_000 (5 min) | Primary stuck-turn bound: max time without forward progress before sealing. **Resets on every progress-bearing attempt.**                                                       |
| maxRecoveryWork      | Infinity         | Runaway-loop guard: max produced content/tool units since the incident opened before a still-progressing turn is sealed. No cap by default.                                     |
| shouldKeepRecovering | —                | Caller policy consulted from the second attempt onward. Return false to stop recovery. The hook point for a token/cost budget (ctx.work is a coarse segment count, not tokens). |
| terminalMessage      | generic message  | Message shown to the user when recovery is given up on.                                                                                                                         |
| onExhausted          | —                | Called once when recovery is given up on. Inspect ctx.reason.                                                                                                                   |

`ctx.reason` on the exhausted hook is one of: `no_progress_timeout` (stuck), `max_attempts_exceeded` (no-progress alarm loop), `work_budget_exceeded` (runaway), `recovery_aborted` (your `shouldKeepRecovering` returned `false`), or `stable_timeout` (extreme churn). Refer to [Stream recovery](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#stream-recovery) for the full shared reference — Think and `@cloudflare/ai-chat` use the same recovery configuration.

## Repairing interrupted tool calls

When a turn is interrupted mid-flight, the transcript can contain a tool call with no settled result. Before the next provider call, Think repairs each such call so the model does not silently re-run it and the provider does not reject the transcript with `AI_MissingToolResultsError`. The default flips the interrupted call to an errored tool result, so the record survives and conversion still has a tool result for it.

Override `repairInterruptedToolPart` to customize the repaired shape. The common case is a client-resolved tool — for example an `ask_user` question that has no server `execute` and is normally answered by the user's next message. Converting it to a plain text part lets the model treat it as ordinary conversation rather than a tool error, and keeps the question verbatim through compaction:

* [  JavaScript ](#tab-panel-5631)
* [  TypeScript ](#tab-panel-5632)

JavaScript

```

export class MyAgent extends Think {

  repairInterruptedToolPart(part) {

    const record = part;

    if (record.type === "tool-ask_user") {

      const input = record.input;

      if (input?.prompt) {

        return { type: "text", text: input.prompt };

      }

    }

    return super.repairInterruptedToolPart(part);

  }

}


```

TypeScript

```

import type { UIMessage } from "ai";


export class MyAgent extends Think<Env> {

  protected override repairInterruptedToolPart(

    part: UIMessage["parts"][number],

  ): UIMessage["parts"][number] {

    const record = part as Record<string, unknown>;

    if (record.type === "tool-ask_user") {

      const input = record.input as { prompt?: string } | undefined;

      if (input?.prompt) {

        return { type: "text", text: input.prompt };

      }

    }

    return super.repairInterruptedToolPart(part);

  }

}


```

This runs during transcript repair — before the repaired transcript is persisted and sent to the model — so the conversion shapes the current turn, not just the next one. The `input` is already normalized to a valid object. A returned tool part must carry a settled result (`output-available`, `output-error`, or `output-denied`); returning a non-tool part such as text is also fine.

## Context-window overflow recovery

[Compaction](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/#compaction) is checked **between turns** — `compactAfter()` runs after each `appendMessage()`. But a single long, tool-heavy turn grows the prompt step by step inside one `streamText` loop and can exceed the model context window **mid-turn**, before the next pre-turn check. The provider then rejects the request (`"prompt is too long"`, `context_length_exceeded`), and the turn would otherwise die terminally.

Think recovers from this with two opt-in, provider-agnostic layers, both configured through the `contextOverflow` property. Both are off by default, so existing behavior is unchanged. Both reuse your session's compaction function, so they require a `configureSession()` with `onCompaction()` configured. Both require [classifyChatError](https://developers.cloudflare.com/agents/harnesses/think/lifecycle-hooks/#classifychaterror) to tell Think which errors are overflows — Think ships no provider-specific matching in core.

**1\. Reactive backstop — `contextOverflow.reactive`.** When a turn fails with an error you classify as `"context_overflow"`, Think discards the truncated partial, runs `session.compact()`, and re-runs the turn from the compacted history. The partial is not persisted: the turn restarts from scratch, so keeping the cut-off assistant message would orphan it beside the recovered answer. It is bounded by `contextOverflow.maxRetries` (default `1`); if compaction cannot shorten history or the budget is spent, the overflow surfaces terminally through `onChatError` with `classification: "context_overflow"` — it never loops or ends silently.

* [  JavaScript ](#tab-panel-5623)
* [  TypeScript ](#tab-panel-5624)

JavaScript

```

import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";


export class MyAgent extends Think {

  contextOverflow = { reactive: true };


  // The bundled classifier covers the common providers (Anthropic, OpenAI,

  // Google, Bedrock, …). Assign it directly, or write your own.

  classifyChatError = defaultContextOverflowClassifier;

}


```

TypeScript

```

import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";


export class MyAgent extends Think<Env> {

  override contextOverflow = { reactive: true };


  // The bundled classifier covers the common providers (Anthropic, OpenAI,

  // Google, Bedrock, …). Assign it directly, or write your own.

  override classifyChatError = defaultContextOverflowClassifier;

}


```

**2\. Proactive guard — `contextOverflow.proactive`.** Heads off the provider error before it happens. Before each step, Think reads the previous step's model-reported `usage.inputTokens` (provider-agnostic) and, if it crosses `maxInputTokens * (headroom ?? 0.9)`, compacts in place and feeds the recompacted history into the upcoming step. If a provider omits `inputTokens`, it falls back to `usage.totalTokens` (a safe over-approximation — it compacts slightly early rather than missing the threshold). It compacts at most `proactive.maxCompactions` times per turn (default `1`) — independent of the reactive `maxRetries` budget — so a history that cannot shorten does not compact on every step.

* [  JavaScript ](#tab-panel-5627)
* [  TypeScript ](#tab-panel-5628)

JavaScript

```

import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";


export class MyAgent extends Think {

  contextOverflow = {

    reactive: true,

    // Compact mid-turn once a step approaches 90% of a 200K window.

    proactive: { maxInputTokens: 200_000 },

  };


  classifyChatError = defaultContextOverflowClassifier;

}


```

TypeScript

```

import { Think, defaultContextOverflowClassifier } from "@cloudflare/think";


export class MyAgent extends Think<Env> {

  override contextOverflow = {

    reactive: true,

    // Compact mid-turn once a step approaches 90% of a 200K window.

    proactive: { maxInputTokens: 200_000 },

  };


  override classifyChatError = defaultContextOverflowClassifier;

}


```

Use either layer alone, or both together: the proactive guard avoids most overflows, and the reactive backstop catches any that still slip through (for example, a turn that starts already over budget, or a single tool result so large that compaction cannot help — in which case it terminalizes cleanly). Both apply to every turn entry path (WebSocket, sub-agent `chat()`, and programmatic `saveMessages()` / `submitMessages()`), and both emit a `chat:context:compacted` [observability event](https://developers.cloudflare.com/agents/runtime/operations/observability/#chat-context-events).

Note

A no-op compaction cannot rescue an over-budget turn, so recovery is only as effective as your compaction configuration. For tool-heavy histories, configure a `tokenCounter` on `compactAfter()` (refer to [Sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/#auto-compaction)).

For a runnable demo against a real Workers AI model, refer to the [context-overflow-recovery example ↗](https://github.com/cloudflare/agents/tree/main/examples/context-overflow-recovery).

## Stability detection

Think provides methods to check if the agent is in a stable state — no pending tool results, no pending approvals, no active turns.

### hasPendingInteraction

Returns `true` if any assistant message has pending tool calls (tools without results or pending approvals).

TypeScript

```

protected hasPendingInteraction(): boolean


```

### waitUntilStable

Returns a promise that resolves to `true` when the agent reaches a stable state, or `false` if the timeout is exceeded.

* [  JavaScript ](#tab-panel-5633)
* [  TypeScript ](#tab-panel-5634)

JavaScript

```

const stable = await this.waitUntilStable({ timeout: 30_000 });

if (stable) {

  await this.saveMessages([

    {

      id: crypto.randomUUID(),

      role: "user",

      parts: [{ type: "text", text: "Now that you are done, summarize." }],

    },

  ]);

}


```

TypeScript

```

const stable = await this.waitUntilStable({ timeout: 30_000 });

if (stable) {

  await this.saveMessages([

    {

      id: crypto.randomUUID(),

      role: "user",

      parts: [{ type: "text", text: "Now that you are done, summarize." }],

    },

  ]);

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/recovery/#page","headline":"Durable recovery · Cloudflare Agents docs","description":"Bounded chat recovery, the stream-stall watchdog, repairing interrupted tool calls, and stability detection for Think agents.","url":"https://developers.cloudflare.com/agents/harnesses/think/recovery/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/harnesses/think/recovery/","name":"Durable recovery"}}]}
```
