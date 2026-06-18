---
title: Events and parameters
description: Pass data to Workflows using events and parameters, including request details, database records, and webhook payloads.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Events and parameters

When a Workflow is triggered, it can receive an optional event. This event can include data that your Workflow can act on, including request details, user data fetched from your database (such as D1 or KV) or from a webhook, or messages from a Queue consumer.

Events are a powerful part of a Workflow, as you often want a Workflow to act on data. Because a given Workflow instance executes durably, events are a useful way to provide a Workflow with data that should be immutable (not changing) and/or represents data the Workflow needs to operate on at that point in time.

## Pass data to a Workflow

You can pass parameters to a Workflow in three ways:

* As an optional argument to the `create` method on a [Workflow binding](https://developers.cloudflare.com/workers/wrangler/commands/general/#trigger) when triggering a Workflow from a Worker.
* Via the `--params` flag when using the `wrangler` CLI to trigger a Workflow.
* Via the `step.waitForEvent` API, which allows a Workflow instance to wait for an event (and optional data) to be received _while it is running_. Workflow instances can be sent events from external services over HTTP or via the Workers API for Workflows.

You can pass any JSON-serializable object as a parameter.

Warning

A `WorkflowEvent` and its associated `payload` property are effectively _immutable_: any changes to an event are not persisted across the steps of a Workflow. This includes both cases when a Workflow is progressing normally, and in cases where a Workflow has to be restarted due to a failure.

Store state durably by returning it from your `step.do` callbacks.

* [  JavaScript ](#tab-panel-13003)
* [  TypeScript ](#tab-panel-13004)

JavaScript

```

export default {

  async fetch(req, env) {

    let someEvent = { url: req.url, createdTimestamp: Date.now() };

    // Trigger our Workflow

    // Pass our event as the second parameter to the `create` method

    // on our Workflow binding.

    let instance = await env.MY_WORKFLOW.create({

      id: crypto.randomUUID(),

      params: someEvent,

    });


    return Response.json({

      id: instance.id,

      details: await instance.status(),

    });

  },

};


```

TypeScript

```

export default {

  async fetch(req: Request, env: Env) {

    let someEvent = { url: req.url, createdTimestamp: Date.now() };

    // Trigger our Workflow

    // Pass our event as the second parameter to the `create` method

    // on our Workflow binding.

    let instance = await env.MY_WORKFLOW.create({

      id: crypto.randomUUID(),

      params: someEvent,

    });


    return Response.json({

      id: instance.id,

      details: await instance.status(),

    });

  },

};


```

To pass parameters via the `wrangler` command-line interface, pass a JSON string as the second parameter to the `workflows trigger` sub-command:

Terminal window

```

npx wrangler@latest workflows trigger workflows-starter '{"some":"data"}'


```

```

🚀 Workflow instance "57c7913b-8e1d-4a78-a0dd-dce5a0b7aa30" has been queued successfully


```

### Wait for events

A running Workflow can wait for an event (or events) by calling `step.waitForEvent` within the Workflow, which allows you to send events to the Workflow in one of two ways:

1. Via the [Workers API binding](https://developers.cloudflare.com/workflows/build/workers-api/): call `instance.sendEvent` to send events to specific workflow instances.
2. Using the REST API (HTTP API)'s [Events endpoint](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/events/methods/create/).

Because `waitForEvent` is part of the `WorkflowStep` API, you can call it multiple times within a Workflow, and use control flow to conditionally wait for an event.

Calling `waitForEvent` requires you to specify an `type` (up to 100 characters [1](#user-content-fn-1)), which is used to match the corresponding `type` when sending an event to a Workflow instance.

Warning

The `waitForEvent` type parameter only supports letters, digits, `-`, and `_`. Currently including `.` is not supported and will result in a `workflow.invalid_event_type` error.

For example, to wait for billing webhook:

* [  JavaScript ](#tab-panel-12999)
* [  TypeScript ](#tab-panel-13000)

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

The above example:

* Calls `waitForEvent` with a `type` of `stripe-webhook` \- the corresponding `sendEvent` call would thus be `await instance.sendEvent({type: "stripe-webhook", payload: webhookPayload})`.
* Uses a TypeScript [type parameter ↗](https://www.typescriptlang.org/docs/handbook/2/generics.html) to type the return value of `step.waitForEvent` as our `IncomingStripeWebhook`.
* Continues on with the rest of the Workflow.

The default timeout for a `waitForEvent` call is 24 hours, which can be changed by passing `{ timeout: WorkflowTimeoutDuration }` as the second argument to your `waitForEvent` call.

* [  JavaScript ](#tab-panel-12997)
* [  TypeScript ](#tab-panel-12998)

JavaScript

```

let event = await step.waitForEvent("wait for human approval", {

  type: "approval-flow",

  timeout: "15 minutes",

});


```

TypeScript

```

let event = await step.waitForEvent(

    "wait for human approval",

    { type: "approval-flow", timeout: "15 minutes" },

  );


```

You can specify a timeout between 1 second and up to 365 days.

Timeout behavior

When `waitForEvent` times out, the Workflow will throw an error and the instance will fail. If you want your Workflow to continue even if the event is not received, wrap the `waitForEvent` call in a `try...catch` block:

* [  JavaScript ](#tab-panel-13001)
* [  TypeScript ](#tab-panel-13002)

JavaScript

```

try {

  const event = await step.waitForEvent("wait for approval", {

    type: "approval",

    timeout: "1 hour",

  });

  // Handle the received event

} catch (e) {

  // Timeout occurred - handle the case where no event was received

  console.log("No approval received, proceeding with default action");

}


```

TypeScript

```

try {

  const event = await step.waitForEvent("wait for approval", {

    type: "approval",

    timeout: "1 hour",

  });

  // Handle the received event

} catch (e) {

  // Timeout occurred - handle the case where no event was received

  console.log("No approval received, proceeding with default action");

}


```

### Send events to running workflows

Workflow instances that are waiting on events using the `waitForEvent` API can be sent events using the `instance.sendEvent` API:

* [  JavaScript ](#tab-panel-13005)
* [  TypeScript ](#tab-panel-13006)

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

* Similar to the [waitForEvent](#wait-for-events) example in this guide, the `type` property in our `waitForEvent` and `sendEvent` fields must match.
* To send multiple events to a Workflow that has multiple `waitForEvent` calls, call `sendEvent` with the corresponding `type` property set (up to 100 characters [1](#user-content-fn-1)).
* Events can also be sent using the REST API (HTTP API)'s [Events endpoint](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/events/methods/create/).

Event timing

You can send an event to a Workflow instance _before_ it reaches the corresponding `waitForEvent` call, as long as the instance has been created. The event will be buffered and delivered when the Workflow reaches the `waitForEvent` step with the matching `type`.

## TypeScript and type parameters

By default, the `WorkflowEvent` passed to the `run` method of your Workflow definition has a type that conforms to the following:

TypeScript

```

export type WorkflowCronSchedule = {

  /** Cron expression that triggered this event. */

  cron: string;

  /** Timestamp of the scheduled trigger, in milliseconds since the Unix epoch. */

  scheduledTime: number;

};


export type WorkflowEvent<T> = {

  /** The data passed as the parameter when the Workflow instance was triggered. */

  payload: Readonly<T>;

  /** The timestamp that the Workflow was triggered. */

  timestamp: Date;

  /** ID of the current Workflow instance. */

  instanceId: string;

  /** Name of the current Workflow. */

  workflowName: string;

  /** Metadata for Workflow instances created by a cron schedule. */

  schedule?: WorkflowCronSchedule;

};


```

When a Workflow instance is created by a cron schedule configured on a Workflow binding, `event.schedule` includes the cron expression that created the instance and the scheduled trigger time:

TypeScript

```

export class MyWorkflow extends WorkflowEntrypoint<Env> {

  async run(event: WorkflowEvent<unknown>, step: WorkflowStep) {

    if (event.schedule) {

      console.log(event.schedule.cron);

      console.log(new Date(event.schedule.scheduledTime));

    }

  }

}


```

You can optionally type these events by defining your own type and passing it as a [type parameter ↗](https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables) to the `WorkflowEvent`:

TypeScript

```

// Define a type that conforms to the events your Workflow instance is

// instantiated with

interface YourEventType {

  userEmail: string;

  createdTimestamp: number;

  metadata?: Record<string, string>;

}


```

When you pass your `YourEventType` to `WorkflowEvent` as a type parameter, the `event.payload` property now has the type `YourEventType` throughout your workflow definition:

src/index.ts

```

// Import the Workflow definition

import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent} from 'cloudflare:workers';


export class MyWorkflow extends WorkflowEntrypoint {

  // Pass your type as a type parameter to WorkflowEvent

  // The 'payload' property will have the type of your parameter.

  async run(event: WorkflowEvent<YourEventType>, step: WorkflowStep) {

    let state = await step.do("my first step", async () => {

      // Access your properties via event.payload

          let userEmail = event.payload.userEmail

          let createdTimestamp = event.payload.createdTimestamp

        })


        await step.do("my second step", async () => { /* your code here */ })

  }

}


```

Warning

Providing a type parameter does _not_ validate that the incoming event matches your type definition. In TypeScript, properties (fields) that do not exist or conform to the type you provided will be dropped. If you need to validate incoming events, we recommend a library such as [zod ↗](https://zod.dev/) or your own validator logic.

You can also provide a type parameter to the `Workflows` type when creating (triggering) a Workflow instance using the `create` method of the [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/#workflow). Note that this does _not_ propagate type information into the Workflow itself, as TypeScript types are a build-time construct.

## Footnotes

1. Match pattern: `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/events-and-parameters/#page","headline":"Events and parameters · Cloudflare Workflows docs","description":"Pass data to Workflows using events and parameters, including request details, database records, and webhook payloads.","url":"https://developers.cloudflare.com/workflows/build/events-and-parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/events-and-parameters/","name":"Events and parameters"}}]}
```
