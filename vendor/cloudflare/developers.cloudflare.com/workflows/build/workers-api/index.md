---
title: Workers API
description: Reference for the Workflows Workers API, including WorkflowEntrypoint, step methods, and instance management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers API

This guide details the Workflows API within Cloudflare Workers, including methods, types, and usage examples.

## WorkflowEntrypoint

The `WorkflowEntrypoint` class is the core element of a Workflow definition. A Workflow must extend this class and define a `run` method with at least one `step` call to be considered a valid Workflow.

TypeScript

```

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // Steps here

  }

}


```

### run

* `run(event: WorkflowEvent<T>, step: WorkflowStep): Promise<T>`  
   * `event` \- the event passed to the Workflow, including an optional `payload` containing data (parameters)  
   * `step` \- the `WorkflowStep` type that provides the step methods for your Workflow

The `run` method can optionally return data, which is available when querying the instance status via the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/#instancestatus), [REST API](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/status/) and the Workflows dashboard. This can be useful if your Workflow is computing a result, returning the key to data stored in object storage, or generating some kind of identifier you need to act on.

TypeScript

```

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // Steps here

    let someComputedState = await step.do("my step", async () => {});


    // Optional: return state from our run() method

    return someComputedState;

  }

}


```

The `WorkflowEvent` type accepts an optional [type parameter ↗](https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables) that allows you to provide a type for the `payload` property within the `WorkflowEvent`.

Refer to the [events and parameters](https://developers.cloudflare.com/workflows/build/events-and-parameters/) documentation for how to handle events within your Workflow code.

Finally, any JS control-flow primitive (if conditions, loops, `try...catch` blocks, promises, and more) can be used to manage steps inside the `run` method.

## WorkflowEvent

TypeScript

```

export type WorkflowCronSchedule = {

  /** Cron expression that triggered this event. */

  cron: string;

  /** Timestamp of the scheduled trigger, in milliseconds since the Unix epoch. */

  scheduledTime: number;

};


export type WorkflowEvent<T> = {

  payload: Readonly<T>;

  timestamp: Date;

  instanceId: string;

  workflowName: string;

  schedule?: WorkflowCronSchedule;

};


```

* The `WorkflowEvent` is the first argument to a Workflow's `run` method.  
   * `payload` \- a default type of `any` or type `T` if a type parameter is provided.  
   * `timestamp` \- a `Date` object set to the time the Workflow instance was created (triggered).  
   * `instanceId` \- the ID of the associated instance.  
   * `workflowName` \- the name of the associated Workflow.  
   * `schedule` \- metadata for Workflow instances created by a cron schedule, including the `cron` expression and `scheduledTime` in milliseconds since the Unix epoch.

Refer to the [events and parameters](https://developers.cloudflare.com/workflows/build/events-and-parameters/) documentation for how to handle events within your Workflow code.

## WorkflowStep

### step

* `step.do(name: string, callback: (ctx: WorkflowStepContext): RpcSerializable): Promise<T>`
* `step.do(name: string, callback: (ctx: WorkflowStepContext): RpcSerializable, options?: RollbackOptions): Promise<T>`
* `step.do(name: string, config?: WorkflowStepConfig, callback: (ctx: WorkflowStepContext): RpcSerializable): Promise<T>`  
   * `name` \- the name of the step, up to 256 characters.  
   * `config` (optional) - an optional `WorkflowStepConfig` for configuring [step specific retry behaviour](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/).  
   * `callback` \- an asynchronous function that receives a [WorkflowStepContext](https://developers.cloudflare.com/workflows/build/step-context/) and optionally returns serializable state for the Workflow to persist. In JavaScript Workflows, this includes a fresh, unlocked `ReadableStream<Uint8Array>` for large binary output.
* `step.do(name: string, config?: WorkflowStepConfig, callback: (ctx: WorkflowStepContext): RpcSerializable, options?: RollbackOptions): Promise<T>`  
   * `name` \- the name of the step, up to 256 characters.  
   * `config` (optional) - an optional `WorkflowStepConfig` for configuring [step specific retry behaviour](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/).  
   * `callback` \- an asynchronous function that receives a [WorkflowStepContext](https://developers.cloudflare.com/workflows/build/step-context/) and optionally returns serializable state for the Workflow to persist. In JavaScript Workflows, this includes a fresh, unlocked `ReadableStream<Uint8Array>` for large binary output.  
   * `options` (optional) - register rollback logic for the step. If the Workflow later fails, registered rollbacks run in reverse completion order.

Returning state

When returning state from a `step`, ensure that the object you return is _serializable_.

Primitive types like `string`, `number`, and `boolean`, along with composite structures such as `Array` and `Object` (provided they only contain serializable values), can be serialized. Any [structured-cloneable ↗](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) type can be serialized, as long it is no longer than 1 MB.

On the other hand, objects that include `Function` or `Symbol` types, and objects with circular references, cannot be serialized. The Workflow instance will throw an error if objects with those types is returned.

In JavaScript Workflows, `ReadableStream<Uint8Array>` is a supported serializable return type when a step needs to persist larger binary output than the normal 1 MiB non-stream step-result limit.

Return a new stream from the callback.

Warning

Do not return a locked stream or a stream that has already been read. BYOB streams and BYOB readers are not supported.

After a `ReadableStream<Uint8Array>` object has been persisted within a step, it should not be reused - rely on the new fresh stream that gets returned from step. The bytes are preserved from the original stream, but the implementation might differ.

:::

* [  JavaScript ](#tab-panel-13053)
* [  TypeScript ](#tab-panel-13054)

JavaScript

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(_event, step) {

    const reportStream = await step.do("read report from R2", async () => {

      const object = await this.env.MY_BUCKET.get("reports/latest.csv");


      if (!object?.body) {

        throw new Error("Could not read reports/latest.csv from R2.");

      }


      return object.body;

    });


    const preview = await new Response(reportStream).text();

    return { preview };

  }

}


```

TypeScript

```

type Env = {

  MY_BUCKET: R2Bucket;

};


export class MyWorkflow extends WorkflowEntrypoint<Env> {

  async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {

    const reportStream = await step.do("read report from R2", async () => {

      const object = await this.env.MY_BUCKET.get("reports/latest.csv");


      if (!object?.body) {

        throw new Error("Could not read reports/latest.csv from R2.");

      }


      return object.body;

    });


    const preview = await new Response(reportStream).text();

    return { preview };

  }

}


```

* `step.sleep(name: string, duration: WorkflowDuration): Promise<void>`  
   * `name` \- the name of the step.  
   * `duration` \- the duration to sleep until, in either seconds or as a `WorkflowDuration` compatible string.  
   * Refer to the [documentation on sleeping and retrying](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/) to learn more about how Workflows are retried.
* `step.sleepUntil(name: string, timestamp: Date | number): Promise<void>`  
   * `name` \- the name of the step.  
   * `timestamp` \- a JavaScript `Date` object or milliseconds from the Unix epoch to sleep the Workflow instance until.

Note

`step.sleep` and `step.sleepUntil` methods do not count towards the maximum Workflow steps limit.

More information about the limits imposed on Workflow can be found in the [Workflows limits documentation](https://developers.cloudflare.com/workflows/reference/limits/).

* `step.waitForEvent(name: string, options: ): Promise<void>`\-`name` \- the name of the step. - `options` \- an object with properties for`type` (up to 100 characters [1](#user-content-fn-1)), which determines which event type this`waitForEvent` call will match on when calling `instance.sendEvent`, and an optional `timeout` property, which defines how long the `waitForEvent` call will block for before throwing a timeout exception. The default timeout is 24 hours.

* [  JavaScript ](#tab-panel-13049)
* [  TypeScript ](#tab-panel-13050)

JavaScript

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // Other steps in your Workflow

    let stripeEvent = await step.waitForEvent(

      "receive invoice paid webhook from Stripe",

      { type: "stripe-webhook", timeout: "1 hour" },

    );

    // Rest of your Workflow

  }

}


```

TypeScript

```

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // Other steps in your Workflow

    let stripeEvent = await step.waitForEvent<IncomingStripeWebhook>(

      "receive invoice paid webhook from Stripe",

      { type: "stripe-webhook", timeout: "1 hour" },

    );

    // Rest of your Workflow

  }

}


```

Review the documentation on [events and parameters](https://developers.cloudflare.com/workflows/build/events-and-parameters/) to learn how to send events to a running Workflow instance.

## WorkflowStepConfig

TypeScript

```

export type WorkflowStepConfig = {

  retries?: {

    limit: number;

    delay: string | number;

    backoff?: WorkflowBackoff;

  };

  timeout?: string | number;

};


```

* A `WorkflowStepConfig` is an optional argument to the `do` method of a `WorkflowStep` and defines properties that allow you to configure the retry behaviour of that step.

Refer to the [documentation on sleeping and retrying](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/) to learn more about how Workflows are retried.

## Rollback options

TypeScript

```

type RollbackContext = {

  error: Error;

  output: unknown | undefined;

};


type RollbackFn = (ctx: RollbackContext) => Promise<void>;


type RollbackOptions = {

  rollback: RollbackFn;

  rollbackConfig?: WorkflowStepConfig;

};


```

* Pass this `RollbackOptions` object as the final argument to `step.do()` to register a compensating action for a successful step.
* `rollback` receives the error that caused the Workflow to fail and the step output returned by the forward step.
* `rollbackConfig` applies retry and timeout settings to the rollback handler itself.

* [  JavaScript ](#tab-panel-13057)
* [  TypeScript ](#tab-panel-13058)

JavaScript

```

export class BillingWorkflow extends WorkflowEntrypoint {

  async run(_event, step) {

    await step.do(

      "create charge",

      async () => {

        const charge = await createCharge();

        return { chargeId: charge.id };

      },

      {

        rollback: async ({ output, error }) => {

          const { chargeId } = output;

          await refundCharge(chargeId, { reason: error.message });

        },

        rollbackConfig: {

          retries: {

            limit: 3,

            delay: "30 seconds",

            backoff: "linear",

          },

          timeout: "5 minutes",

        },

      },

    );

  }

}


```

TypeScript

```

export class BillingWorkflow extends WorkflowEntrypoint<Env> {

  async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {

    await step.do(

      "create charge",

      async () => {

        const charge = await createCharge();

        return { chargeId: charge.id };

      },

      {

        rollback: async ({ output, error }) => {

          const { chargeId } = output as { chargeId: string };

          await refundCharge(chargeId, { reason: error.message });

        },

        rollbackConfig: {

          retries: {

            limit: 3,

            delay: "30 seconds",

            backoff: "linear",

          },

          timeout: "5 minutes",

        },

      },

    );

  }

}


```

## WorkflowStepContext

TypeScript

```

export type WorkflowStepContext = {

  step: {

    name: string;

    count: number;

  };

  attempt: number;

  config: WorkflowStepConfig;

};


```

* The `WorkflowStepContext` is passed as the first argument to the `step.do` callback function. It provides runtime information about the current step.  
   * `step.name` \- the name of the step as passed to `step.do`.  
   * `step.count` \- how many times `step.do` has been called with this name in the current Workflow run (1-indexed).  
   * `attempt` \- the current attempt number (1-indexed). `1` on the first try, `2` on the first retry, and so on.  
   * `config` \- the resolved `WorkflowStepConfig` for this step, including any defaults applied by the runtime.

Refer to the [step context documentation](https://developers.cloudflare.com/workflows/build/step-context/) for usage examples.

## Workflow step limits

Each workflow on Workers Paid supports 10,000 steps by default. You can increase this up to 25,000 steps by configuring `steps` within the `limits` property of your Workflow definition in your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-13045)
* [  wrangler.toml ](#tab-panel-13046)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "workflows": [

    {

      "name": "my-workflow",

      "binding": "MY_WORKFLOW",

      "class_name": "MyWorkflow",

      "limits": {

        "steps": 25000

      }

    }

  ]

}


```

TOML

```

[[workflows]]

name = "my-workflow"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


[workflows.limits]

steps = 25_000


```

`step.sleep` does not count towards the maximum steps limit.

Note that Workflows on Workers Free have a limit of 1,024 steps. Refer to [Workflow limits](https://developers.cloudflare.com/workflows/reference/limits/) for more information.

## NonRetryableError

* `` throw new NonRetryableError(message: ` string `, name ` string ` optional) ``: ` NonRetryableError `  
   * When thrown inside [step.do()](https://developers.cloudflare.com/workflows/build/workers-api/#step), this error stops step retries, propagating the error to the top level (the [run](https://developers.cloudflare.com/workflows/build/workers-api/#run) function). Any error not handled at this top level will cause the Workflow instance to fail.  
   * Refer to the [documentation on sleeping and retrying](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/) to learn more about how Workflows steps are retried.

## Call Workflows from Workers

Workflows exposes an API directly to your Workers scripts via the [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/#what-is-a-binding) concept. Bindings allow you to securely call a Workflow without having to manage API keys or clients.

You can bind to a Workflow by defining a `[[workflows]]` binding within your Wrangler configuration.

For example, to bind to a Workflow called `workflows-starter` and to make it available on the `MY_WORKFLOW` variable to your Worker script, you would configure the following fields within the `[[workflows]]` binding definition:

* [  wrangler.jsonc ](#tab-panel-13047)
* [  wrangler.toml ](#tab-panel-13048)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "workflows-starter",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "workflows": [

    {

      // name of your workflow

      "name": "workflows-starter",

      // binding name env.MY_WORKFLOW

      "binding": "MY_WORKFLOW",

      // this is class that extends the Workflow class in src/index.ts

      "class_name": "MyWorkflow",

    },

  ],

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "workflows-starter"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


[[workflows]]

name = "workflows-starter"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


```

### Bind from Pages

You can bind and trigger Workflows from [Pages Functions](https://developers.cloudflare.com/pages/functions/) by deploying a Workers project with your Workflow definition and then invoking that Worker using [service bindings](https://developers.cloudflare.com/pages/functions/bindings/#service-bindings) or a standard `fetch()` call.

Visit the documentation on [calling Workflows from Pages](https://developers.cloudflare.com/workflows/build/call-workflows-from-pages/) for examples.

### Cross-script calls

You can also bind to a Workflow that is defined in a different Worker script from the script your Workflow definition is in. To do this, provide the `script_name` key with the name of the script to the `[[workflows]]` binding definition in your Wrangler configuration.

For example, if your Workflow is defined in a Worker script named `billing-worker`, but you are calling it from your `web-api-worker` script, your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) would resemble the following:

* [  wrangler.jsonc ](#tab-panel-13051)
* [  wrangler.toml ](#tab-panel-13052)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "web-api-worker",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "workflows": [

    {

      // name of your workflow

      "name": "billing-workflow",

      // binding name env.MY_WORKFLOW

      "binding": "MY_WORKFLOW",

      // this is class that extends the Workflow class in src/index.ts

      "class_name": "MyWorkflow",

      // the script name where the Workflow is defined.

      // required if the Workflow is defined in another script.

      "script_name": "billing-worker",

    },

  ],

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "web-api-worker"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


[[workflows]]

name = "billing-workflow"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"

script_name = "billing-worker"


```

If you're using TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you modify your Wrangler configuration file. This generates types for the `env` object based on your bindings, as well as [runtime types](https://developers.cloudflare.com/workers/languages/typescript/).

## Workflow

Note

Ensure you have a compatibility date `2024-10-22` or later installed when binding to Workflows from within a Workers project.

The `Workflow` type provides methods that allow you to create, inspect the status, and manage running Workflow instances from within a Worker script. It is part of the generated types produced by [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types).

./worker-configuration.d.ts

```

interface Env {

  // The 'MY_WORKFLOW' variable should match the "binding" value set in the Wrangler config file

  MY_WORKFLOW: Workflow;

}


```

The `Workflow` type exports the following methods:

### create

Create (trigger) a new instance of the given Workflow.

* `create(options?: WorkflowInstanceCreateOptions): Promise<WorkflowInstance>`  
   * `options` \- optional properties to pass when creating an instance, including a user-provided ID and payload parameters.

An ID is automatically generated, but a user-provided ID can be specified (up to 100 characters [1](#user-content-fn-1)). This can be useful when mapping Workflows to users, merchants or other identifiers in your system. You can also provide a JSON object as the `params` property, allowing you to pass data for the Workflow instance to act on as its [WorkflowEvent](https://developers.cloudflare.com/workflows/build/events-and-parameters/).

TypeScript

```

// Create a new Workflow instance with your own ID and pass params to the Workflow instance

let instance = await env.MY_WORKFLOW.create({

  id: myIdDefinedFromOtherSystem,

  params: { hello: "world" },

});

return Response.json({

  id: instance.id,

  details: await instance.status(),

});


```

Returns a `WorkflowInstance`.

Throws an error if the provided ID is already used by an existing instance that has not yet passed its [retention limit](https://developers.cloudflare.com/workflows/reference/limits/). To re-run a workflow with the same ID, you can [restart](https://developers.cloudflare.com/workflows/build/trigger-workflows/#restart-a-workflow) the existing instance.

Warning

Providing a type parameter does _not_ validate that the incoming event matches your type definition. In TypeScript, properties (fields) that do not exist or conform to the type you provided will be dropped. If you need to validate incoming events, we recommend a library such as [zod ↗](https://zod.dev/) or your own validator logic.

You can also provide a type parameter to the `Workflows` type when creating (triggering) a Workflow instance using the `create` method of the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/#workflow). Note that this does _not_ propagate type information into the Workflow itself, as TypeScript types are a build-time construct.

To provide an optional type parameter to the `Workflow`, pass a type argument with your type when defining your Workflow bindings:

TypeScript

```

interface User {

  email: string;

  createdTimestamp: number;

}


interface Env {

  // Pass our User type as the type parameter to the Workflow definition

  MY_WORKFLOW: Workflow<User>;

}


export default {

  async fetch(request, env, ctx) {

    // More likely to come from your database or via the request body!

    const user: User = {

      email: user@example.com,

      createdTimestamp: Date.now()

    }


    let instance = await env.MY_WORKFLOW.create({

      // params expects the type User

      params: user

    })


    return Response.json({

      id: instance.id,

      details: await instance.status(),

    });

  }

}


```

### createBatch

Create (trigger) a batch of new instance of the given Workflow, up to 100 instances at a time.

This is useful when you are scheduling multiple instances at once. A call to `createBatch` is treated the same as a call to `create` (for a single instance) and allows you to work within the [instance creation limit](https://developers.cloudflare.com/workflows/reference/limits/).

* `createBatch(batch: WorkflowInstanceCreateOptions[]): Promise<WorkflowInstance[]>`  
   * `batch` \- list of Options to pass when creating an instance, including a user-provided ID and payload parameters.

Each element of the `batch` list is expected to include both `id` and `params` properties:

TypeScript

```

// Create a new batch of 3 Workflow instances, each with its own ID and pass params to the Workflow instances

const listOfInstances = [

  { id: "id-abc123", params: { hello: "world-0" } },

  { id: "id-def456", params: { hello: "world-1" } },

  { id: "id-ghi789", params: { hello: "world-2" } },

];

let instances = await env.MY_WORKFLOW.createBatch(listOfInstances);


```

Returns an array of `WorkflowInstance`.

Unlike [create](https://developers.cloudflare.com/workflows/build/workers-api/#create), this operation is idempotent and will not fail if an ID is already in use. If an existing instance with the same ID is still within its [retention limit](https://developers.cloudflare.com/workflows/reference/limits/), it will be skipped and excluded from the returned array.

### get

Get a specific Workflow instance by ID.

* `get(id: string): Promise<WorkflowInstance>`\- `id` \- the ID of the Workflow instance.

Returns a `WorkflowInstance`. Throws an exception if the instance ID does not exist.

TypeScript

```

// Fetch an existing Workflow instance by ID:

try {

  let instance = await env.MY_WORKFLOW.get(id);

  return Response.json({

    id: instance.id,

    details: await instance.status(),

  });

} catch (e: any) {

  // Handle errors

  // .get will throw an exception if the ID doesn't exist or is invalid.

  const msg = `failed to get instance ${id}: ${e.message}`;

  console.error(msg);

  return Response.json({ error: msg }, { status: 400 });

}


```

## WorkflowInstanceCreateOptions

Optional properties to pass when creating an instance.

TypeScript

```

interface WorkflowInstanceCreateOptions {

  /**

   * An id for your Workflow instance. Must be unique within the Workflow.

   */

  id?: string;

  /**

   * The event payload the Workflow instance is triggered with

   */

  params?: unknown;

  /**

   * The retention policy for the Workflow instance.

   * Defaults to the maximum retention period available for the owner's account.

   */

  retention?: {

    /**

     * How long to retain instance state after the Workflow completes successfully.

     */

    successRetention?: WorkflowRetentionDuration;

    /**

     * How long to retain instance state after the Workflow ends in an errored or terminated state.

     */

    errorRetention?: WorkflowRetentionDuration;

  };

}


type WorkflowRetentionDuration = WorkflowSleepDuration;


```

If `retention` is not set, instance state is retained for the maximum retention period available on your account (3 days on the Workers Free plan, 30 days on the Workers Paid plan). Refer to the [retention limit](https://developers.cloudflare.com/workflows/reference/limits/) for more information.

The following example creates an instance that retains state for 1 day after success and 7 days after an error:

TypeScript

```

let instance = await env.MY_WORKFLOW.create({

  id: myIdDefinedFromOtherSystem,

  params: { hello: "world" },

  retention: {

    successRetention: "1 day",

    errorRetention: "7 days",

  },

});


```

## WorkflowInstance

Represents a specific instance of a Workflow, and provides methods to manage the instance.

TypeScript

```

declare abstract class WorkflowInstance {

  public id: string;

  /**

   * Pause the instance.

   */

  public pause(): Promise<void>;

  /**

   * Resume the instance. If it is already running, an error will be thrown.

   */

  public resume(): Promise<void>;

  /**

   * Terminate the instance. If it is errored, terminated or complete, an error will be thrown.

   */

  public terminate(): Promise<void>;

  /**

   * Restart the instance from the beginning, or from a specific step.

   */

  public restart(options?: WorkflowInstanceRestartOptions): Promise<void>;

  /**

   * Returns the current status of the instance.

   */

  public status(): Promise<InstanceStatus>;

}


```

### id

Return the id of a Workflow.

* `id: string`

### status

Return the status of a running Workflow instance.

* `status(): Promise<InstanceStatus>`

### pause

Pause a running Workflow instance.

* `pause(): Promise<void>`

### resume

Resume a paused Workflow instance.

* `resume(): Promise<void>`

### restart

Restart a Workflow instance from the beginning, or from a specific step.

* `restart(options?: WorkflowInstanceRestartOptions): Promise<void>`  
   * `options` \- optional properties that control from where the instance restarts.

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");


// Restart the instance from the beginning.

await instance.restart();


// Restart the instance from the step named "aggregate".

await instance.restart({ from: { name: "aggregate" } });


// Restart the instance from the third call to a step named "process".

await instance.restart({ from: { name: "process", count: 3 } });


```

When restarting from a specific step, the cached results of every earlier step are reused, while the target step and any steps that follow it run again. The call throws an error if no step matching `from` is found in the instance's execution history.

#### WorkflowInstanceRestartOptions

TypeScript

```

interface WorkflowInstanceRestartOptions {

  /**

   * The step to restart the instance from.

   * If omitted, the instance restarts from the beginning.

   */

  from?: {

    /**

     * The name of the step.

     */

    name: string;

    /**

     * The 1-based index of the step, used when multiple steps share the same name and type. Defaults to 1 (the first occurrence).

     */

    count?: number;

    /**

     * The step type. Use this to disambiguate when the same name is shared across step types. Defaults to "do".

     */

    type?: "do" | "sleep" | "waitForEvent";

  };

}


```

The `from` object identifies the step to restart from. Only `name` is required; `count` and `type` are only needed when the same step name appears more than once in the run.

* `name` \- the name of the step.
* `count` \- the 1-based index of the step, used when multiple steps share the same name and type (for example, inside a loop). Defaults to `1` (the first occurrence). Corresponds to `step.count` in the [step context](https://developers.cloudflare.com/workflows/build/step-context/).
* `type` \- the step type (`"do"`, `"sleep"`, or `"waitForEvent"`). Defaults to `"do"`. Use this when the same name is shared across different step types.

### terminate

Terminate a Workflow instance.

* `terminate(): Promise<void>`

### sendEvent

[Send an event](https://developers.cloudflare.com/workflows/build/events-and-parameters/) to a running Workflow instance.

* `sendEvent(): Promise<void>`\- `options` \- the event `type`(up to 100 characters [1](#user-content-fn-1)) and `payload` to send to the Workflow instance. The `type` must match the `type` in the corresponding `waitForEvent` call in your Workflow.

Return `void` on success; throws an exception if the Workflow is not running or is an errored state.

* [  JavaScript ](#tab-panel-13055)
* [  TypeScript ](#tab-panel-13056)

JavaScript

```

export default {

  async fetch(req, env) {

    const instanceId = new URL(req.url).searchParams.get("instanceId");

    const webhookPayload = await req.json();


    let instance = await env.MY_WORKFLOW.get(instanceId);

    // Send our event, with `type` matching the event type defined in

    // our step.waitForEvent call

    await instance.sendEvent({

      type: "stripe-webhook",

      payload: webhookPayload,

    });


    return Response.json({

      status: await instance.status(),

    });

  },

};


```

TypeScript

```

export default {

  async fetch(req: Request, env: Env) {

    const instanceId = new URL(req.url).searchParams.get("instanceId");

    const webhookPayload = await req.json<Payload>();


    let instance = await env.MY_WORKFLOW.get(instanceId);

    // Send our event, with `type` matching the event type defined in

    // our step.waitForEvent call

    await instance.sendEvent({

      type: "stripe-webhook",

      payload: webhookPayload,

    });


    return Response.json({

      status: await instance.status(),

    });

  },

};


```

You can call `sendEvent` multiple times, setting the value of the `type` property to match the specific `waitForEvent` calls in your Workflow.

This allows you to wait for multiple events at once, or use `Promise.race` to wait for multiple events and allow the first event to progress the Workflow.

### InstanceStatus

Details the status of a Workflow instance.

TypeScript

```

type InstanceStatus = {

  status:

    | "queued" // means that instance is waiting to be started (see concurrency limits)

    | "running"

    | "paused"

    | "errored"

    | "terminated" // user terminated the instance while it was running

    | "complete"

    | "waiting" // instance is hibernating and waiting for sleep or event to finish

    | "waitingForPause" // instance is finishing the current work to pause

    | "unknown";

  error?: {

    name: string;

    message: string;

  };

  output?: unknown;

  rollback: {

    outcome: "complete" | "failed";

    error: {

      name: string;

      message: string;

    } | null;

  } | null;

};


```

If a Workflow enters rollback, the Workers API continues to report `status: "running"` for compatibility while the rollback is executing. After the instance reaches a terminal state, inspect `rollback` to determine whether compensating steps completed successfully or failed.

## Footnotes

1. Match pattern: `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/workers-api/#page","headline":"Workers API · Cloudflare Workflows docs","description":"Reference for the Workflows Workers API, including WorkflowEntrypoint, step methods, and instance management.","url":"https://developers.cloudflare.com/workflows/build/workers-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/workers-api/","name":"Workers API"}}]}
```
