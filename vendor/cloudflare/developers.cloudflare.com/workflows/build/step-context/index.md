---
title: Step context
description: Access runtime information in Workflows steps using the WorkflowStepContext object, including step name and retry attempt.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Step context

Every `step.do` callback receives a **context object** (`WorkflowStepContext`) as its first argument. The context gives your step code runtime information about the step itself, the current retry attempt, and the resolved configuration for that step.

## WorkflowStepContext

TypeScript

```

type WorkflowStepContext = {

  step: {

    name: string;

    count: number;

  };

  attempt: number;

  config: WorkflowStepConfig;

};


```

### Properties

| Property   | Type                                                                                                    | Description                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| step.name  | string                                                                                                  | The name you passed to step.do.                                                                                                             |
| step.count | number                                                                                                  | How many times step.do has been called with this name so far in the current Workflow run. Starts at 1 for the first call with a given name. |
| attempt    | number                                                                                                  | The current attempt number (1-indexed). 1 on the first try, 2 on the first retry, and so on.                                                |
| config     | [WorkflowStepConfig](https://developers.cloudflare.com/workflows/build/workers-api/#workflowstepconfig) | The resolved retry and timeout configuration for this step, including any defaults applied by the runtime.                                  |

## Access the context

Pass a parameter to your `step.do` callback to receive the context object:

TypeScript

```

await step.do("my-step", async (ctx) => {

  console.log(ctx.step.name); // "my-step"

  console.log(ctx.step.count); // 1

  console.log(ctx.attempt); // 1 on first try, 2 on first retry, etc.

  console.log(ctx.config); // { retries: { limit: 5, ... }, timeout: "10 minutes" }

});


```

The context is also available when you pass a custom `WorkflowStepConfig`:

TypeScript

```

await step.do(

  "call an API",

  {

    retries: {

      limit: 10,

      delay: "10 seconds",

      backoff: "exponential",

    },

    timeout: "30 minutes",

  },

  async (ctx) => {

    console.log(ctx.config.retries.limit); // 10

    console.log(ctx.config.timeout); // "30 minutes"

  },

);


```

## Examples

### Adjust behavior based on retry attempt

Use `ctx.attempt` to change how your step behaves on retries. For example, you might use a fallback endpoint after a certain number of retries:

TypeScript

```

await step.do(

  "fetch data",

  { retries: { limit: 5, delay: "5 seconds", backoff: "linear" } },

  async (ctx) => {

    const url =

      ctx.attempt <= 3

        ? "https://api.example.com/primary"

        : "https://api.example.com/fallback";


    const response = await fetch(url);

    if (!response.ok) {

      throw new Error(`Request failed with status ${response.status}`);

    }

    return await response.json();

  },

);


```

### Log step metadata for observability

Use `ctx.step` to add structured metadata to your logs:

TypeScript

```

await step.do("process-order", async (ctx) => {

  console.log(

    JSON.stringify({

      step: ctx.step.name,

      stepCount: ctx.step.count,

      attempt: ctx.attempt,

      retryLimit: ctx.config.retries?.limit,

    }),

  );


  // Your step logic here

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/step-context/#page","headline":"Step context · Cloudflare Workflows docs","description":"Access runtime information in Workflows steps using the WorkflowStepContext object, including step name and retry attempt.","url":"https://developers.cloudflare.com/workflows/build/step-context/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/step-context/","name":"Step context"}}]}
```
