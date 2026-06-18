---
title: Codemode
description: Let LLMs use external systems by writing TypeScript in a secure sandbox, backed by a durable runtime with discovery, approvals, and reusable snippets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Codemode

Beta 

Codemode lets a model use external systems by **writing TypeScript** instead of making individual tool calls. The model gets one tool — `codemode({ code })` — that executes its code in a sandboxed Worker. Inside the sandbox, every integration you configure is available as a typed global, and a four-method platform SDK handles discovery, side effects, and reuse.

TypeScript

```

// The developer configures one tool:

const runtime = createCodemodeRuntime({ ctx, executor, connectors });

const tools = { codemode: runtime.tool() };


// The model writes code against typed globals:

const matches = await codemode.search("pull request");

const docs = await codemode.describe(matches.results[0].path);

const prs = await github.list_pull_requests({

  owner: "cloudflare",

  repo: "agents",

});


```

Warning

Codemode is experimental and may have breaking changes in future releases. Use with caution in production.

## Why use Codemode

* **Tool descriptions do not scale.** The classic approach generates types for every tool and puts them all in the tool description. Ten tools is fine; a GitHub MCP server plus a Stripe spec plus an internal API is thousands of prompt tokens the model pays for on every request, mostly for tools it will not call. Codemode moves discovery _inside the sandbox_: `codemode.search` and `codemode.describe` return results into the running code, not into the context window. The model pulls exactly the type information it needs, when it needs it.
* **Models are better at code than at tool protocols.** Filtering, joining, retrying, and looping over pages each cost a round trip through the model in tool-call style. In code it is just code: one sandbox run can do what would otherwise take a dozen tool calls.
* **Real work needs durable state.** Creating issues, sending messages, and merging pull requests need human approval, an audit trail, and sometimes an undo. Those concerns have one home — the runtime — instead of being rebuilt per app. The model's code pauses at an approval-required call and continues after approval as if nothing happened.

## The pieces

| Piece          | What it is                                                                                                                           | State                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| **Executor**   | Runs a block of code once in an isolated sandbox (DynamicWorkerExecutor on Workers, IframeSandboxExecutor in the browser).           | None — deliberately stateless and replaceable. |
| **Connectors** | Classes that bridge an external service (MCP server, OpenAPI spec, AI SDK toolset, or anything custom) into the sandbox as a global. | Own their connection and credentials.          |
| **Runtime**    | The handle you hold onto: runtime.tool() for the model, pending/approve/reject/rollback for your app, and a durable log behind it.   | Durable — survives hibernation.                |

The sandbox has **no network access**. Model code cannot `fetch`; every effect goes through a connector (which routes through the runtime's log) or through `codemode.step`.

## Installation

Terminal window

```

npm install @cloudflare/codemode


```

## Configure Codemode

### 1\. Add the Vite plugin

The plugin discovers connector files and wires up the Worker exports the runtime needs:

* [  JavaScript ](#tab-panel-5821)
* [  TypeScript ](#tab-panel-5822)

JavaScript

```

// vite.config.ts

import codemode from "@cloudflare/codemode/vite";

import agents from "agents/vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default { plugins: [agents(), codemode(), cloudflare()] };


```

TypeScript

```

// vite.config.ts

import codemode from "@cloudflare/codemode/vite";

import agents from "agents/vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default { plugins: [agents(), codemode(), cloudflare()] };


```

Add a `worker_loaders` binding to your `wrangler.jsonc`:

* [  wrangler.jsonc ](#tab-panel-5819)
* [  wrangler.toml ](#tab-panel-5820)

JSONC

```

{

  "compatibility_flags": ["nodejs_compat"],

  "worker_loaders": [{ "binding": "LOADER" }]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


[[worker_loaders]]

binding = "LOADER"


```

### 2\. Write a connector

Write a class per service, in a `*.codemode.ts` file. Mark only the tools that need a human; everything else executes immediately:

* [  JavaScript ](#tab-panel-5833)
* [  TypeScript ](#tab-panel-5834)

JavaScript

```

// github.codemode.ts

import { McpConnector } from "@cloudflare/codemode";


export class GithubConnector extends McpConnector {

  conn;


  constructor(ctx, env, conn) {

    super(ctx, env);

    this.conn = conn;

  }


  name() {

    return "github";

  }

  instructions() {

    return "Use for GitHub repositories, issues, and pull requests.";

  }

  createConnection() {

    return this.conn;

  }

  tool(name, t) {

    return name === "create_issue" ? { ...t, requiresApproval: true } : t;

  }

}


```

TypeScript

```

// github.codemode.ts

import {

  McpConnector,

  type McpConnectionLike,

  type ConnectorTool,

} from "@cloudflare/codemode";


export class GithubConnector extends McpConnector<Env> {

  private conn: McpConnectionLike;


  constructor(ctx: ExecutionContext, env: Env, conn: McpConnectionLike) {

    super(ctx, env);

    this.conn = conn;

  }


  name() {

    return "github";

  }

  protected instructions() {

    return "Use for GitHub repositories, issues, and pull requests.";

  }

  protected createConnection() {

    return this.conn;

  }

  protected tool(name: string, t: ConnectorTool): ConnectorTool {

    return name === "create_issue" ? { ...t, requiresApproval: true } : t;

  }

}


```

### 3\. Create a runtime in your agent

Create a runtime and hand the model `runtime.tool()`. Approval handling is two `@callable` methods:

* [  JavaScript ](#tab-panel-5837)
* [  TypeScript ](#tab-panel-5838)

JavaScript

```

// server.ts

import {

  createCodemodeRuntime,

  DynamicWorkerExecutor,

} from "@cloudflare/codemode";

import { GithubConnector } from "./github.codemode" with { type: "connectors" };


export class Chat extends AIChatAgent {

  codemode() {

    const conn = this.mcp.mcpConnections[this.githubServerId];

    return createCodemodeRuntime({

      ctx: this.ctx,

      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),

      connectors: [new GithubConnector(this.ctx, this.env, conn)],

    });

  }


  async onChatMessage() {

    return streamText({

      model,

      messages: await convertToModelMessages(this.messages),

      tools: { codemode: this.codemode().tool() },

    });

  }


  @callable()

  listPending() {

    return this.codemode().pending();

  }


  @callable()

  approve(executionId) {

    return this.codemode().approve({ executionId });

  }

}


```

TypeScript

```

// server.ts

import {

  createCodemodeRuntime,

  DynamicWorkerExecutor,

} from "@cloudflare/codemode";

import { GithubConnector } from "./github.codemode" with { type: "connectors" };


export class Chat extends AIChatAgent<Env> {

  codemode() {

    const conn = this.mcp.mcpConnections[this.githubServerId];

    return createCodemodeRuntime({

      ctx: this.ctx,

      executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),

      connectors: [

        new GithubConnector(

          this.ctx as unknown as ExecutionContext,

          this.env,

          conn,

        ),

      ],

    });

  }


  async onChatMessage() {

    return streamText({

      model,

      messages: await convertToModelMessages(this.messages),

      tools: { codemode: this.codemode().tool() },

    });

  }


  @callable()

  listPending() {

    return this.codemode().pending();

  }


  @callable()

  approve(executionId?: string) {

    return this.codemode().approve({ executionId });

  }

}


```

That is the whole developer surface: a connector class, `createCodemodeRuntime`, and the runtime handle. The handle is the control plane — `tool()` for the model, `pending()`/`approve()`/`reject()`/`rollback()` for approvals, `executions()` for the audit trail, and `saveSnippet()`/`snippets()`/`deleteSnippet()` for curating what the model gets to reuse.

## What the model writes

The sandbox SDK is four methods — discover, learn, do once, reuse — plus one global per connector:

TypeScript

```

async () => {

  // Discover: ranked search over connector methods and saved snippets.

  const matches = await codemode.search("open pull requests");


  // Learn: TypeScript docs for one method — fetched on demand, not pre-dumped.

  const docs = await codemode.describe(matches.results[0].path);


  // Act: connector methods are typed globals.

  const prs = await github.list_pull_requests({

    owner: "cloudflare",

    repo: "agents",

    state: "open",

  });


  // Do once: anything nondeterministic goes in a step so replay is exact.

  const stamp = await codemode.step("now", () => Date.now());


  return { count: prs.length, stamp };

};


```

Once the developer promotes a run with `runtime.saveSnippet("open-prs")`, the model finds it via `codemode.search` and re-runs it by name with `codemode.run("open-prs", { owner, repo })`.

| Sandbox method             | Purpose                                                                   |
| -------------------------- | ------------------------------------------------------------------------- |
| codemode.search(query)     | Ranked search across connector methods and saved snippets.                |
| codemode.describe(target)  | TypeScript docs for a connector, method, or snippet — fetched on demand.  |
| codemode.step(name, fn)    | Run a side-effectful or nondeterministic closure once; replay its result. |
| codemode.run(name, input?) | Run a snippet the developer saved.                                        |

When the code hits an approval-required method (`github.create_issue`), the run pauses and the tool returns `{ status: "paused", executionId, pending }`. After `runtime.approve({ executionId })`, the same code re-runs: completed calls replay from the durable log, the approved action executes for real, and the script continues — the model never writes pause/resume logic.

## How the code runs: abort and replay

`runtime.tool()` builds the sandbox per run: it spawns the durable runtime facet on your agent's Durable Object, exposes each connector as an RPC-backed global, injects the `codemode` SDK, and hands the code to the executor. Every connector call routes through the runtime first — to replay it, execute it, or pause — so the durable log is always the source of truth.

When the model's code runs, every tool call is recorded in a durable log:

1. **Read** (no annotation) executes, and the result is recorded in the log.
2. An **approval-required action** is recorded as `pending`, and the run **aborts**.
3. On **continue**, the same code re-runs. Every call already in the log is served from it (a no-op replay — reads return their recorded result, applied actions return theirs). The newly-approved action executes for real. The run proceeds to the next pause or to completion.

```

run 1:  search() ──exec──> "results"        [logged: applied]

        list_prs() ──exec──> [pr1, pr2]      [logged: applied]

        create_issue() ──PAUSE──             [logged: pending]

        ✗ run aborts


user approves


run 2:  search() ──replay──> "results"       (from log, no re-exec)

        list_prs() ──replay──> [pr1, pr2]     (from log, no re-exec)

        create_issue() ──exec──> { number }   (approved, runs for real)

        post_comment() ──exec──> ok            (continues)

        ✓ run completes


```

### Determinism requirement

Replay only works if the code is **deterministic up to tool calls**. The Nth tool call on run 1 must be the Nth tool call on run 2, with the same arguments. If the code branches on `Math.random()` or `Date.now()` in a way that changes which tools it calls — or passes nondeterministic values as arguments to an approval-gated action — replay diverges. The runtime detects this, records the execution as failed, and the tool returns an error result rather than throwing. To make nondeterministic work replay-safe, wrap it in `codemode.step(name, fn)` so the value is captured once and replayed identically.

Note

**Issue tool calls sequentially.** The replay cursor assigns each call its sequence number when the call reaches the host, so `await a(); await b();` is stable across runs but `await Promise.all([a(), b()])` is not. Await connector calls one at a time in any run that might pause for approval.

## Connectors

Connectors are class-based integrations that bridge external services into the sandbox. Each connector extends `WorkerEntrypoint`, making it serializable, RPC-callable, and available as `ctx.exports.ConnectorName`. A connector answers three questions: what global name the model uses (`name`), what guidance the model gets (`instructions`), and what tools exist (`tools`).

* [  JavaScript ](#tab-panel-5835)
* [  TypeScript ](#tab-panel-5836)

JavaScript

```

import { CodemodeConnector } from "@cloudflare/codemode";


export class MyConnector extends CodemodeConnector {

  name() {

    return "myService";

  }


  instructions() {

    return "Use for interacting with My Service.";

  }


  tools() {

    return {

      listItems: {

        description: "List all items.",

        inputSchema: {

          type: "object",

          properties: { limit: { type: "number" } },

        },

        execute: (args) => this.env.MY_SERVICE.list(args),

      },

      createItem: {

        description: "Create an item.",

        inputSchema: {

          type: "object",

          properties: { title: { type: "string" } },

          required: ["title"],

        },

        requiresApproval: true,

        execute: (args) => this.env.MY_SERVICE.create(args),

        revert: (_args, result) => this.env.MY_SERVICE.delete(result.id),

      },

    };

  }

}


```

TypeScript

```

import { CodemodeConnector } from "@cloudflare/codemode";


export class MyConnector extends CodemodeConnector<Env> {

  name() {

    return "myService";

  }


  protected instructions() {

    return "Use for interacting with My Service.";

  }


  protected tools() {

    return {

      listItems: {

        description: "List all items.",

        inputSchema: {

          type: "object",

          properties: { limit: { type: "number" } },

        },

        execute: (args) => this.env.MY_SERVICE.list(args),

      },

      createItem: {

        description: "Create an item.",

        inputSchema: {

          type: "object",

          properties: { title: { type: "string" } },

          required: ["title"],

        },

        requiresApproval: true,

        execute: (args) => this.env.MY_SERVICE.create(args),

        revert: (_args, result) => this.env.MY_SERVICE.delete(result.id),

      },

    };

  }

}


```

Each tool carries its own documentation, schema, approval requirement, execution, and optional revert — everything about a tool lives in one place:

TypeScript

```

type ConnectorTool = {

  description?: string;

  inputSchema?: JSONSchema7; // Defaults to an open object.

  outputSchema?: JSONSchema7;

  requiresApproval?: boolean; // Omit to execute immediately.

  execute: (

    args: unknown,

    ctx?: { executionId: string },

  ) => Promise<unknown> | unknown;

  revert?: (

    args: unknown,

    result: unknown,

    ctx?: { executionId: string },

  ) => Promise<void> | void;

};


```

AI SDK tools are shape-compatible — an existing `ToolSet` can be returned from `tools()` directly.

### Built-in connector bases

| Base class        | Wraps           | What you implement                                                      |
| ----------------- | --------------- | ----------------------------------------------------------------------- |
| CodemodeConnector | Anything custom | name(), tools(), and optionally instructions().                         |
| McpConnector      | An MCP server   | createConnection(); decorate derived tools with the tool(name, t) hook. |
| OpenApiConnector  | An OpenAPI spec | spec() (the document) and request() (an authenticated request).         |

`McpConnector` turns each MCP tool into one entry in the tools record (executing through `connection.client.callTool()`), so the sandbox sees `github.list_pull_requests({ owner, repo, state })`. `OpenApiConnector` reads the spec once, host-side, and derives one typed tool per operation, so the model calls operations directly — `stripe.CreatePaymentIntent({ amount, currency })` — at zero prompt-token cost.

### File convention

Connector files use the `*.codemode.ts` extension. The Vite plugin discovers them and auto-exports the classes from the Worker entry. Import them with the `type: "connectors"` attribute:

* [  JavaScript ](#tab-panel-5823)
* [  TypeScript ](#tab-panel-5824)

JavaScript

```

import { GithubConnector } from "./github.codemode" with { type: "connectors" };


```

TypeScript

```

import { GithubConnector } from "./github.codemode" with { type: "connectors" };


```

### Per-execution resources

Some connectors own a resource that must live for the lifetime of one run — a browser/CDP session, a database transaction, a temporary workspace. `execute(args, ctx)` receives a stable `executionId` (use it to lazily acquire or reconnect to the resource), and `disposeExecution(executionId, status)` is called when the run reaches a **terminal** state so you can tear the resource down. `disposeExecution` is deliberately **not** called when a run pauses for approval — a paused run may resume, so a resource scoped to the whole run must survive the pause. Implementations must be idempotent, hold no instance memory (read from durable storage keyed by `executionId`), and never throw.

## Approvals

A tool with `requiresApproval: true` pauses the run when the model's code calls it (the run aborts), the action is recorded as pending, and the user is asked to approve. On approval the execution **continues via replay**.

```

Model calls codemode({ code }) where code calls github.create_issue(...)

  → runtime logs calls; create_issue requires approval → run pauses

  → tool returns { status: "paused", executionId, pending: [...] }


Agent shows the pending action to the user. User approves.


Agent calls runtime.approve({ executionId })

  → runtime replays the log, runs create_issue for real, continues

  → returns { status: "completed", result } (or pauses again at the next action)


```

Execution outcomes are returned, not thrown — a sandbox error or a replay divergence comes back as `{ status: "error" }` (and is recorded on the execution), so the agent loop is never broken by an exception:

TypeScript

```

type ProxyToolOutput =

  | {

      status: "completed";

      executionId: string;

      result: unknown;

      logs?: string[];

    }

  | { status: "paused"; executionId: string; pending: PendingAction[] }

  | { status: "error"; executionId: string; error: string; logs?: string[] };


```

Drive resolution through the runtime handle, wired to `@callable` agent methods so the client UI can approve or reject:

* [  JavaScript ](#tab-panel-5829)
* [  TypeScript ](#tab-panel-5830)

JavaScript

```

const runtime = createCodemodeRuntime({ ctx: this.ctx, connectors, executor });


// List actions awaiting approval. With no executionId this aggregates across

// every paused run, so concurrent approvals all show up.

await runtime.pending();


// Approve the pending action(s) and continue.

await runtime.approve({ executionId });


// Reject — ends the execution. Does NOT undo actions already applied earlier

// in the same run; call rollback() for that.

await runtime.reject({ seq, executionId });


// Roll back applied actions in reverse order via each tool's revert().

await runtime.rollback({ executionId });


```

TypeScript

```

const runtime = createCodemodeRuntime({ ctx: this.ctx, connectors, executor });


// List actions awaiting approval. With no executionId this aggregates across

// every paused run, so concurrent approvals all show up.

await runtime.pending();


// Approve the pending action(s) and continue.

await runtime.approve({ executionId });


// Reject — ends the execution. Does NOT undo actions already applied earlier

// in the same run; call rollback() for that.

await runtime.reject({ seq, executionId });


// Roll back applied actions in reverse order via each tool's revert().

await runtime.rollback({ executionId });


```

Note

`approve()` is a safe no-op on a run that is no longer paused. Approval UIs are racy — the run may have completed, been rejected, or been rolled back between rendering the queue and the click. In that case `approve()` returns `{ status: "error", ... }` and changes nothing. Treat that outcome as "this run already moved on, refresh the queue", not as an execution failure.

Rollback walks the log backward and calls the `revert` of **every** applied action that has one — independent of `requiresApproval`. Tools without a `revert` are skipped, as are reads.

## Snippets

A **snippet** is a saved sandbox script — a reusable pattern that already ran and worked. Snippets are durable: they live on the runtime facet, are addressable by name, and accumulate over time. Connectors provide raw capability; snippets are recipes that worked. The split is deliberate — the model writes and reuses scripts, and the developer decides which ones are worth keeping.

* [  JavaScript ](#tab-panel-5831)
* [  TypeScript ](#tab-panel-5832)

JavaScript

```

// 1. The model writes and runs a script (one execution).

const prs = await github.list_pull_requests({ owner, repo, state: "open" });


// 2. The developer reviews the run and promotes it — for example from a @callable.

const runs = await runtime.executions(); // Newest first.

await runtime.saveSnippet("list-open-prs", {

  executionId: runs[0].id, // Defaults to the current execution.

  description: "List open pull requests for a repository.",

});


// 3. The model finds it via codemode.search and runs it by name.

const saved = await codemode.run("list-open-prs", {

  owner: "cloudflare",

  repo: "agents",

});


```

TypeScript

```

// 1. The model writes and runs a script (one execution).

const prs = await github.list_pull_requests({ owner, repo, state: "open" });


// 2. The developer reviews the run and promotes it — for example from a @callable.

const runs = await runtime.executions(); // Newest first.

await runtime.saveSnippet("list-open-prs", {

  executionId: runs[0].id, // Defaults to the current execution.

  description: "List open pull requests for a repository.",

});


// 3. The model finds it via codemode.search and runs it by name.

const saved = await codemode.run("list-open-prs", {

  owner: "cloudflare",

  repo: "agents",

});


```

Each snippet records the connector names its source execution ran with. `codemode.run(name)` checks them against the runtime's current connector set and returns a clear error — naming the missing connector — instead of failing partway through the script. This lets a runtime gain or lose connectors without orphaning its snippets.

## Runtime handle reference

`createCodemodeRuntime({ ctx, executor, connectors, name?, maxExecutions?, transformResult? })` returns the handle that owns the executor and connectors for the current request. `CodemodeRuntime` is the Durable Object facet behind that handle; it owns the durable state — the tool-call log, pending approvals, and snippets.

| Handle method                                    | Purpose                                                                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| runtime.tool(options?)                           | The single model-facing AI SDK tool, codemode({ code }).                           |
| runtime.pending(executionId?)                    | Actions awaiting approval — drives approval UIs; no id aggregates all paused runs. |
| runtime.approve({ executionId })                 | Approve the pending action and continue via replay.                                |
| runtime.reject({ seq, executionId })             | Reject a pending action; ends the execution.                                       |
| runtime.rollback({ executionId })                | Revert applied actions in reverse order via each tool's revert.                    |
| runtime.expirePaused({ maxAgeMs? })              | Expire stale awaiting-approval runs and reclaim their resources (default 24 h).    |
| runtime.executions(limit?)                       | All executions, newest first — the audit trail for developer UIs.                  |
| runtime.deleteExecution(id) / pruneExecutions(n) | Drop one execution, or keep only the newest N terminal ones.                       |
| runtime.saveSnippet(name, opts?)                 | Promote an execution's script to a reusable snippet.                               |
| runtime.snippets() / runtime.deleteSnippet(name) | List or remove saved snippets.                                                     |

### Retention

Terminal executions (completed or errored) are auto-pruned as new runs begin, keeping the newest `maxExecutions` (default 50). Running and paused executions are never pruned — an awaiting-approval run is always resumable. Because paused runs are exempt from pruning, call `runtime.expirePaused({ maxAgeMs })` from a recurring alarm or scheduled task to mark stale paused runs `rejected` and reclaim their per-execution connector resources.

### Shaping results

A run's final result can be large enough to crowd the model's context. Pass `transformResult` to reshape the **model-facing** result of a completed run — most often to truncate it. It runs after the raw result is recorded, so the audit trail keeps the full value while the model sees the shaped one:

* [  JavaScript ](#tab-panel-5827)
* [  TypeScript ](#tab-panel-5828)

JavaScript

```

import { createCodemodeRuntime, truncateResult } from "@cloudflare/codemode";


const runtime = createCodemodeRuntime({

  ctx,

  executor,

  connectors,

  // Cap response size; small structured results pass through unchanged.

  transformResult: (result) => truncateResult(result),

});


```

TypeScript

```

import { createCodemodeRuntime, truncateResult } from "@cloudflare/codemode";


const runtime = createCodemodeRuntime({

  ctx,

  executor,

  connectors,

  // Cap response size; small structured results pass through unchanged.

  transformResult: (result) => truncateResult(result),

});


```

### Runtime identity

The runtime facet's identity is an explicit `name` (default `"default"`). The connector set is data, not identity: adding, removing, or renaming a connector does not address a different runtime, so executions and snippets survive connector changes. Use distinct names when two runtimes should not share history (for example, two unrelated tools on the same agent).

## Vite plugin

Connectors extend `WorkerEntrypoint` and must be exported from the Worker entry module to be reachable over Workers RPC, and the `CodemodeRuntime` facet class must be exported for facet spawning. The `@cloudflare/codemode/vite` plugin derives this from the `*.codemode.ts` file convention instead of hand-maintained wrangler configuration. It discovers `*.codemode.{ts,js,tsx,jsx}` files in `src/`, resolves `with { type: "connectors" }` imports through a virtual module, and appends the required re-exports to your Worker entry:

* [  JavaScript ](#tab-panel-5825)
* [  TypeScript ](#tab-panel-5826)

JavaScript

```

// Auto-generated by @cloudflare/codemode/vite

export { CodemodeRuntime } from "@cloudflare/codemode";

export * from "/abs/path/to/github.codemode.ts";


```

TypeScript

```

// Auto-generated by @cloudflare/codemode/vite

export { CodemodeRuntime } from "@cloudflare/codemode";

export * from "/abs/path/to/github.codemode.ts";


```

For import attributes to work, your `tsconfig.json` needs `"module": "esnext"` (the `agents/tsconfig` base sets the rest).

## Security considerations

* Code runs in **isolated Worker sandboxes** — each execution gets its own Worker instance.
* External network access (`fetch`, `connect`) is **blocked by default** at the runtime level. Every effect goes through a connector or `codemode.step`.
* Connector calls are dispatched via Workers RPC, not network requests.
* Any single recorded value (an argument or result) is capped at 1 MB serialized; an oversized value fails the run with a model-actionable error rather than silently truncating replay data.
* Mark only the tools that need a human with `requiresApproval: true`; everything else executes immediately and is recorded for audit.

## Current limitations

* Requires a Cloudflare Workers environment for `DynamicWorkerExecutor`.
* Connector calls must be issued sequentially in any run that might pause for approval (no `Promise.all`).
* Limited to JavaScript and TypeScript execution.
* LLM code quality depends on prompt engineering and model capability.

## Related resources

[ Codemode connectors example ](https://github.com/cloudflare/agents/tree/main/examples/codemode-connectors) The connector playground — MCP, OpenAPI, and custom connectors with in-sandbox approvals. 

[ Using AI models ](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/) Use AI models with your Agent. 

[ MCP client ](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/) Connect to MCP servers and expose their tools as codemode connectors. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/codemode/#page","headline":"Codemode · Cloudflare Agents docs","description":"Let LLMs use external systems by writing TypeScript in a secure sandbox, backed by a durable runtime with discovery, approvals, and reusable snippets.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/codemode/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/protocol/","name":"Protocol"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/protocol/codemode/","name":"Codemode"}}]}
```
