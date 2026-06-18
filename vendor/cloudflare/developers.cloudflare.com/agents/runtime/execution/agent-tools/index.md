---
title: Agents as tools
description: Run Think and AIChatAgent sub-agents as retained, streaming tools from a parent agent.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agents as tools

Agents as tools let one chat agent dispatch another chat-capable sub-agent as part of its work. The child is a real sub-agent with its own Durable Object storage, messages, tools, resumable stream, and drill-in URL. The parent keeps a small run registry so clients can render the child timeline, replay it after refresh, and clean it up later.

Agents as tools support `@cloudflare/think` agents and `AIChatAgent` subclasses. `AIChatAgent` children run headlessly through `saveMessages()`, so they should use server-side tools. Browser-provided client tools are not available during an agent-tool turn unless you model that interaction as server-side state or a separate parent-mediated workflow.

## Agents as tools vs sub-agent RPC

Use `subAgent(...).chat()` when parent code needs direct streaming RPC to a specific child and your code owns forwarding, cancellation, and replay policy.

Use `agentTool()` or `runAgentTool()` when a parent model or workflow delegates work to a child agent and you want retained child runs, event replay, abort bridging, and UI drill-in. For Think-specific turn choices, refer to [Choose a turn API](https://developers.cloudflare.com/agents/harnesses/think/#choose-a-turn-api).

## Use an agent as an AI SDK tool

Use `agentTool()` when the parent model should decide when to call the helper.

* [  JavaScript ](#tab-panel-6029)
* [  TypeScript ](#tab-panel-6030)

JavaScript

```

import { Think } from "@cloudflare/think";

import { agentTool } from "agents/agent-tools";

import { z } from "zod";


export class Researcher extends Think {

  getSystemPrompt() {

    return "Research the user's topic and end with a concise summary.";

  }

}


export class Assistant extends Think {

  getTools() {

    return {

      research: agentTool(Researcher, {

        description: "Research one topic in depth.",

        displayName: "Researcher",

        inputSchema: z.object({

          query: z.string().min(3),

        }),

      }),

    };

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import { agentTool } from "agents/agent-tools";

import { z } from "zod";


export class Researcher extends Think<Env> {

  getSystemPrompt() {

    return "Research the user's topic and end with a concise summary.";

  }

}


export class Assistant extends Think<Env> {

  getTools() {

    return {

      research: agentTool(Researcher, {

        description: "Research one topic in depth.",

        displayName: "Researcher",

        inputSchema: z.object({

          query: z.string().min(3),

        }),

      }),

    };

  }

}


```

The child can also be an `AIChatAgent`:

* [  JavaScript ](#tab-panel-6033)
* [  TypeScript ](#tab-panel-6034)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { agentTool } from "agents/agent-tools";

import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { z } from "zod";


export class Summarizer extends AIChatAgent {

  formatAgentToolInput(input, request) {

    return {

      id: `agent-tool-${request.runId}-input`,

      role: "user",

      parts: [{ type: "text", text: `Summarize:\n\n${input.text}` }],

    };

  }


  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


export class Assistant extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: {

        summarize: agentTool(Summarizer, {

          description: "Summarize long text in a separate retained agent.",

          inputSchema: z.object({ text: z.string() }),

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { agentTool } from "agents/agent-tools";

import { convertToModelMessages, stepCountIs, streamText } from "ai";

import { z } from "zod";


export class Summarizer extends AIChatAgent<Env> {

  protected override formatAgentToolInput(input: { text: string }, request) {

    return {

      id: `agent-tool-${request.runId}-input`,

      role: "user",

      parts: [{ type: "text", text: `Summarize:\n\n${input.text}` }],

    };

  }


  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

    });

    return result.toUIMessageStreamResponse();

  }

}


export class Assistant extends AIChatAgent<Env> {

  async onChatMessage() {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: {

        summarize: agentTool(Summarizer, {

          description: "Summarize long text in a separate retained agent.",

          inputSchema: z.object({ text: z.string() }),

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

The generated tool calls `this.runAgentTool(ChildAgent, ...)`, streams `agent-tool-event` frames on the parent WebSocket, and returns the child summary to the parent model. If the run fails, aborts, or is interrupted, the tool returns a structured `AgentToolFailure` instead of an empty success value:

TypeScript

```

type AgentToolFailure = {

  ok: false;

  status: "error" | "aborted" | "interrupted";

  error: string; // human-readable, safe to surface

  retryable: boolean;

  // Present only when `status` is "interrupted":

  reason?: AgentToolInterruptedReason;

  childStillRunning?: boolean;

};


type AgentToolInterruptedReason =

  | "no-progress"

  | "window-exceeded"

  | "not-tailable"

  | "inspect-timeout"

  | "inspect-failed"

  | "recovery-deadline";


```

`retryable` is `true` only for an `interrupted` run — the child was reset or superseded by a deploy or parent recovery and never reached a logical outcome, so re-dispatching the same call can succeed. A genuine `error` or an intentional `aborted` is `retryable: false`. This lets a parent prompt convention or an orchestration harness re-run a transient interruption rather than reporting it to the user as a final failure. `AgentToolFailure` is exported from `agents`.

On an `interrupted` run, `reason` gives a machine-readable cause and `childStillRunning` reports whether the child was still working when the parent stopped waiting (`true`) or has since been torn down (`false`). Branch on these instead of parsing the `error` prose — for example, re-dispatch a `no-progress` interrupt (the child may still self-heal) but reconnect to or surface a `window-exceeded` one (the child was torn down). Both `reason` and `childStillRunning` are also mirrored onto the `agent-tool-event` wire frame and the `useAgentToolEvents()` run state.

For Think children that do workflow-style work without user-facing assistant text, override `getAgentToolOutput()` and, if needed, `getAgentToolSummary()`. Assistant text remains the default summary when present, but a Think agent-tool run can complete successfully without emitting text chunks.

Persist any structured output before the child turn finishes, because `getAgentToolOutput()` is read as soon as `saveMessages()` resolves. Keep `getAgentToolSummary()` concise for display; the full structured value is stored separately as the tool output.

* [  JavaScript ](#tab-panel-6021)
* [  TypeScript ](#tab-panel-6022)

JavaScript

```

export class Extractor extends Think {

  getAgentToolOutput(runId) {

    const rows = this.sql`

      SELECT result_json FROM extraction_runs WHERE id = ${runId}

    `;

    return rows[0] ? JSON.parse(rows[0].result_json) : undefined;

  }


  getAgentToolSummary(_runId, output) {

    return output ? "Extraction complete" : "";

  }

}


```

TypeScript

```

export class Extractor extends Think<Env> {

  protected override getAgentToolOutput(runId: string) {

    const rows = this.sql<{ result_json: string }>`

      SELECT result_json FROM extraction_runs WHERE id = ${runId}

    `;

    return rows[0] ? JSON.parse(rows[0].result_json) : undefined;

  }


  protected override getAgentToolSummary(_runId: string, output: unknown) {

    return output ? "Extraction complete" : "";

  }

}


```

## Run an agent tool imperatively

Use `runAgentTool()` for deterministic workflows, scheduled work, HTTP handlers, or fan-out code.

* [  JavaScript ](#tab-panel-6025)
* [  TypeScript ](#tab-panel-6026)

JavaScript

```

const [a, b] = await Promise.allSettled([

  this.runAgentTool(Researcher, {

    input: { query: "HTTP/3" },

    parentToolCallId: toolCallId,

    displayOrder: 0,

  }),

  this.runAgentTool(Researcher, {

    input: { query: "gRPC" },

    parentToolCallId: toolCallId,

    displayOrder: 1,

  }),

]);


```

TypeScript

```

const [a, b] = await Promise.allSettled([

  this.runAgentTool(Researcher, {

    input: { query: "HTTP/3" },

    parentToolCallId: toolCallId,

    displayOrder: 0,

  }),

  this.runAgentTool(Researcher, {

    input: { query: "gRPC" },

    parentToolCallId: toolCallId,

    displayOrder: 1,

  }),

]);


```

`runAgentTool()` is idempotent by `runId`. Passing the same `runId` never starts a duplicate child turn. Completed, failed, aborted, and interrupted runs are retained until you explicitly clear them.

## Render child timelines in React

`useAgentToolEvents()` is a headless hook. It subscribes to the existing parent connection, deduplicates replay/live races, applies child `UIMessageChunk` bodies to message parts, and groups sibling runs by parent tool call ID.

* [  JavaScript ](#tab-panel-6031)
* [  TypeScript ](#tab-panel-6032)

JavaScript

```

import { useAgent, useAgentToolEvents } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


const agent = useAgent({ agent: "Assistant", name: userId });

const { messages } = useAgentChat({ agent });

const agentTools = useAgentToolEvents({ agent });


for (const message of messages) {

  for (const part of message.parts) {

    if (part.type === "tool-call") {

      const runs = agentTools.getRunsForToolCall(part.toolCallId);

      // Render the child runs beside this tool call.

    }

  }

}


```

TypeScript

```

import { useAgent, useAgentToolEvents } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


const agent = useAgent({ agent: "Assistant", name: userId });

const { messages } = useAgentChat({ agent });

const agentTools = useAgentToolEvents({ agent });


for (const message of messages) {

  for (const part of message.parts) {

    if (part.type === "tool-call") {

      const runs = agentTools.getRunsForToolCall(part.toolCallId);

      // Render the child runs beside this tool call.

    }

  }

}


```

Imperative runs without a parent tool call are available as `agentTools.unboundRuns`.

## Drill in and gate access

Agents as tools are normal sub-agents. Connect to a retained child through the parent route:

* [  JavaScript ](#tab-panel-6019)
* [  TypeScript ](#tab-panel-6020)

JavaScript

```

useAgent({

  agent: "Assistant",

  name: userId,

  sub: [{ agent: "Researcher", name: runId }],

});


```

TypeScript

```

useAgent({

  agent: "Assistant",

  name: userId,

  sub: [{ agent: "Researcher", name: runId }],

});


```

Gate external access with the parent registry so guessed run IDs cannot spawn fresh child facets:

TypeScript

```

override async onBeforeSubAgent(_request, child) {

  if (!this.hasAgentToolRun(child.className, child.name)) {

    return new Response("Not found", { status: 404 });

  }

}


```

## Clear retained runs

Runs and child facets are retained by default for refresh, drill-in, and later inspection. Delete them explicitly when clearing chat history or applying your own retention policy:

* [  JavaScript ](#tab-panel-6023)
* [  TypeScript ](#tab-panel-6024)

JavaScript

```

await this.clearAgentToolRuns();

await this.clearAgentToolRuns({

  status: ["completed", "error", "aborted", "interrupted"],

});

await this.clearAgentToolRuns({ olderThan: Date.now() - 7 * 24 * 60 * 60_000 });


```

TypeScript

```

await this.clearAgentToolRuns();

await this.clearAgentToolRuns({

  status: ["completed", "error", "aborted", "interrupted"],

});

await this.clearAgentToolRuns({ olderThan: Date.now() - 7 * 24 * 60 * 60_000 });


```

If a retained run is still `starting` or `running`, cleanup cancels the child before deleting its facet.

## Interrupted runs and recovery

Agent-tool runs are retained in the parent. If the parent restarts (deploy or eviction) while a child run is still `starting` or `running`, it does not abandon the child. Startup recovery re-attaches to the live child and tails its stream to the child's terminal result. Because the child is a sub-agent with its own `chatRecovery`, it self-heals its own interrupted turn while the parent forwards its output. A completed child is finalized without re-running finished work.

The re-attach wait is **progress-keyed**, not a fixed wall clock. Two static `options` tune it:

| Option                               | Default        | Behavior                                                                                                                                                                                                      |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| agentToolReattachNoProgressTimeoutMs | 120000 (2 min) | How long the parent waits with **no** forward progress before giving up. Resets on every forwarded chunk, so a streaming child is followed through to terminal.                                               |
| agentToolReattachMaxWindowMs         | Infinity       | Optional hard wall-clock ceiling on a single re-attach. Uncapped by default (mirrors chat recovery's maxRecoveryWork), so a healthy, long-running child is never cut off. Set a finite value to impose a cap. |

Give-up outcomes map to the `AgentToolFailure` fields:

* A child that goes silent for a full no-progress window is sealed `reason: "no-progress"`, `childStillRunning: true`. This seal is soft: the child is left running, so re-dispatching the same `runId` can re-attach and collect it if it self-heals.
* If you set a finite `agentToolReattachMaxWindowMs` and it fires, the run is sealed `reason: "window-exceeded"`, `childStillRunning: false`, and the child is torn down (it has had its full window and is treated as exhausted).
* A child that cannot be tailed or inspected, or that exceeds the overall recovery deadline, is sealed with the matching `reason` so the parent tool call returns a structured failure instead of hanging indefinitely.

A hung child can never block recovery forever. The no-progress budget bounds a silent child. A content runaway is bounded by the child's own `chatRecovery` (`maxRecoveryWork` and `shouldKeepRecovering`), not by a parent-only timer.

Monitor parent reconciliation through the `agentTool` observability channel:

* [  JavaScript ](#tab-panel-6027)
* [  TypeScript ](#tab-panel-6028)

JavaScript

```

import { subscribe } from "agents/observability";


const unsubscribe = subscribe("agentTool", (event) => {

  if (event.type === "agent_tool:recovery:row") {

    console.log("Recovered agent-tool row", event.payload);

  }

});


```

TypeScript

```

import { subscribe } from "agents/observability";


const unsubscribe = subscribe("agentTool", (event) => {

  if (event.type === "agent_tool:recovery:row") {

    console.log("Recovered agent-tool row", event.payload);

  }

});


```

Raw `diagnostics_channel` subscribers should use the channel name `agents:agent_tool`.

## Example

[ Agents as tools example ](https://github.com/cloudflare/agents/tree/main/examples/agents-as-tools) Run chat-capable sub-agents as retained tools, stream their timelines inline, and drill into child agents. 

## Related

[ Sub-agents ](https://developers.cloudflare.com/agents/runtime/execution/sub-agents/) Spawn child agents with isolated storage, typed RPC, and nested client routing. 

[ Chat agents ](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) Build AI chat interfaces with AIChatAgent and useAgentChat. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/agent-tools/#page","headline":"Agents as tools · Cloudflare Agents docs","description":"Run Think and AIChatAgent sub-agents as retained, streaming tools from a parent agent.","url":"https://developers.cloudflare.com/agents/runtime/execution/agent-tools/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/agent-tools/","name":"Agents as tools"}}]}
```
