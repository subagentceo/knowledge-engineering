---
title: Rules of Workflows
description: Best practices for building resilient Workflows, including idempotency, state management, and error handling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rules of Workflows

A Workflow contains one or more steps. Each step is a self-contained, individually retryable component of a Workflow. Steps may emit (optional) state that allows a Workflow to persist and continue from that step, even if a Workflow fails due to a network or infrastructure issue.

This is a small guidebook on how to build more resilient and correct Workflows.

### Ensure API/Binding calls are idempotent

Because a step might be retried multiple times, your steps should (ideally) be idempotent. For context, idempotency is a logical property where the operation (in this case a step), can be applied multiple times without changing the result beyond the initial application.

As an example, let us assume you have a Workflow that charges your customers, and you really do not want to charge them twice by accident. Before charging them, you should check if they were already charged:

* [  JavaScript ](#tab-panel-13011)
* [  TypeScript ](#tab-panel-13012)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    const customer_id = 123456;

    // ✅ Good: Non-idempotent API/Binding calls are always done **after** checking if the operation is

    // still needed.

    await step.do(

      `charge ${customer_id} for its monthly subscription`,

      async () => {

        // API call to check if customer was already charged

        const subscription = await fetch(

          `https://payment.processor/subscriptions/${customer_id}`,

        ).then((res) => res.json());


        // return early if the customer was already charged, this can happen if the destination service dies

        // in the middle of the request but still commits it, or if the Workflows Engine restarts.

        if (subscription.charged) {

          return;

        }


        // non-idempotent call, this operation can fail and retry but still commit in the payment

        // processor - which means that, on retry, it would mischarge the customer again if the above checks

        // were not in place.

        return await fetch(

          `https://payment.processor/subscriptions/${customer_id}`,

          {

            method: "POST",

            body: JSON.stringify({ amount: 10.0 }),

          },

        );

      },

    );

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    const customer_id = 123456;

    // ✅ Good: Non-idempotent API/Binding calls are always done **after** checking if the operation is

    // still needed.

    await step.do(

      `charge ${customer_id} for its monthly subscription`,

      async () => {

        // API call to check if customer was already charged

        const subscription = await fetch(

          `https://payment.processor/subscriptions/${customer_id}`,

        ).then((res) => res.json());


        // return early if the customer was already charged, this can happen if the destination service dies

        // in the middle of the request but still commits it, or if the Workflows Engine restarts.

        if (subscription.charged) {

          return;

        }


        // non-idempotent call, this operation can fail and retry but still commit in the payment

        // processor - which means that, on retry, it would mischarge the customer again if the above checks

        // were not in place.

        return await fetch(

          `https://payment.processor/subscriptions/${customer_id}`,

          {

            method: "POST",

            body: JSON.stringify({ amount: 10.0 }),

          },

        );

      },

    );

  }

}


```

Note

Guaranteeing idempotency might be optional in your specific use-case and implementation, but we recommend that you always try to guarantee it.

### Make your steps granular

Steps should be as self-contained as possible. This allows your own logic to be more durable in case of failures in third-party APIs, network errors, and so on.

You can also think of it as a transaction, or a unit of work.

* ✅ Minimize the number of API/binding calls per step (unless you need multiple calls to prove idempotency).

* [  JavaScript ](#tab-panel-13009)
* [  TypeScript ](#tab-panel-13010)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // ✅ Good: Unrelated API/Binding calls are self-contained, so that in case one of them fails

    // it can retry them individually. It also has an extra advantage: you can control retry or

    // timeout policies for each granular step - you might not to want to overload http.cat in

    // case of it being down.

    const httpCat = await step.do("get cutest cat from KV", async () => {

      return await this.env.KV.get("cutest-http-cat");

    });


    const image = await step.do("fetch cat image from http.cat", async () => {

      return await fetch(`https://http.cat/${httpCat}`);

    });

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // ✅ Good: Unrelated API/Binding calls are self-contained, so that in case one of them fails

    // it can retry them individually. It also has an extra advantage: you can control retry or

    // timeout policies for each granular step - you might not to want to overload http.cat in

    // case of it being down.

    const httpCat = await step.do("get cutest cat from KV", async () => {

      return await this.env.KV.get("cutest-http-cat");

    });


    const image = await step.do("fetch cat image from http.cat", async () => {

      return await fetch(`https://http.cat/${httpCat}`);

    });

  }

}


```

Otherwise, your entire Workflow might not be as durable as you might think, and you may encounter some undefined behaviour. You can avoid them by following the rules below:

* 🔴 Do not encapsulate your entire logic in one single step.
* 🔴 Do not call separate services in the same step (unless you need it to prove idempotency).
* 🔴 Do not make too many service calls in the same step (unless you need it to prove idempotency).
* 🔴 Do not do too much CPU-intensive work inside a single step - sometimes the engine may have to restart, and it will start over from the beginning of that step.

* [  JavaScript ](#tab-panel-13007)
* [  TypeScript ](#tab-panel-13008)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: you are calling two separate services from within the same step. This might cause

    // some extra calls to the first service in case the second one fails, and in some cases, makes

    // the step non-idempotent altogether

    const image = await step.do("get cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat");

      return fetch(`https://http.cat/${httpCat}`);

    });

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: you are calling two separate services from within the same step. This might cause

    // some extra calls to the first service in case the second one fails, and in some cases, makes

    // the step non-idempotent altogether

    const image = await step.do("get cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat");

      return fetch(`https://http.cat/${httpCat}`);

    });

  }

}


```

### Do not rely on state outside of a step

Workflows may hibernate and lose all in-memory state. This will happen when engine detects that there is no pending work and can hibernate until it needs to wake-up (because of a sleep, retry, or event).

This means that you should not store state outside of a step:

* [  JavaScript ](#tab-panel-13021)
* [  TypeScript ](#tab-panel-13022)

index.js

```

function getRandomInt(min, max) {

  const minCeiled = Math.ceil(min);

  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive

}


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: `imageList` will be not persisted across engine's lifetimes. Which means that after hibernation,

    // `imageList` will be empty again, even though the following two steps have already ran.

    const imageList = [];


    await step.do("get first cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat-1");


      imageList.push(httpCat);

    });


    await step.do("get second cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat-2");


      imageList.push(httpCat);

    });


    // A long sleep can (and probably will) hibernate the engine which means that the first engine lifetime ends here

    await step.sleep("💤💤💤💤", "3 hours");


    // When this runs, it will be on the second engine lifetime - which means `imageList` will be empty.

    await step.do(

      "choose a random cat from the list and download it",

      async () => {

        const randomCat = imageList.at(getRandomInt(0, imageList.length));

        // this will fail since `randomCat` is undefined because `imageList` is empty

        return await fetch(`https://http.cat/${randomCat}`);

      },

    );

  }

}


```

index.ts

```

function getRandomInt(min, max) {

  const minCeiled = Math.ceil(min);

  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive

}


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: `imageList` will be not persisted across engine's lifetimes. Which means that after hibernation,

    // `imageList` will be empty again, even though the following two steps have already ran.

    const imageList: string[] = [];


    await step.do("get first cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat-1");


      imageList.push(httpCat);

    });


    await step.do("get second cutest cat from KV", async () => {

      const httpCat = await this.env.KV.get("cutest-http-cat-2");


      imageList.push(httpCat);

    });


    // A long sleep can (and probably will) hibernate the engine which means that the first engine lifetime ends here

    await step.sleep("💤💤💤💤", "3 hours");


    // When this runs, it will be on the second engine lifetime - which means `imageList` will be empty.

    await step.do(

      "choose a random cat from the list and download it",

      async () => {

        const randomCat = imageList.at(getRandomInt(0, imageList.length));

        // this will fail since `randomCat` is undefined because `imageList` is empty

        return await fetch(`https://http.cat/${randomCat}`);

      },

    );

  }

}


```

Instead, you should build top-level state exclusively comprised of `step.do` returns:

* [  JavaScript ](#tab-panel-13019)
* [  TypeScript ](#tab-panel-13020)

index.js

```

function getRandomInt(min, max) {

  const minCeiled = Math.ceil(min);

  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive

}


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // ✅ Good: imageList state is exclusively comprised of step returns - this means that in the event of

    // multiple engine lifetimes, imageList will be built accordingly

    const imageList = await Promise.all([

      step.do("get first cutest cat from KV", async () => {

        return await this.env.KV.get("cutest-http-cat-1");

      }),


      step.do("get second cutest cat from KV", async () => {

        return await this.env.KV.get("cutest-http-cat-2");

      }),

    ]);


    // A long sleep can (and probably will) hibernate the engine which means that the first engine lifetime ends here

    await step.sleep("💤💤💤💤", "3 hours");


    // When this runs, it will be on the second engine lifetime - but this time, imageList will contain

    // the two most cutest cats

    await step.do(

      "choose a random cat from the list and download it",

      async () => {

        const randomCat = imageList.at(getRandomInt(0, imageList.length));

        // this will eventually succeed since `randomCat` is defined

        return await fetch(`https://http.cat/${randomCat}`);

      },

    );

  }

}


```

index.ts

```

function getRandomInt(min, max) {

  const minCeiled = Math.ceil(min);

  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive

}


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // ✅ Good: imageList state is exclusively comprised of step returns - this means that in the event of

    // multiple engine lifetimes, imageList will be built accordingly

    const imageList: string[] = await Promise.all([

      step.do("get first cutest cat from KV", async () => {

        return await this.env.KV.get("cutest-http-cat-1");

      }),


      step.do("get second cutest cat from KV", async () => {

        return await this.env.KV.get("cutest-http-cat-2");

      }),

    ]);


    // A long sleep can (and probably will) hibernate the engine which means that the first engine lifetime ends here

    await step.sleep("💤💤💤💤", "3 hours");


    // When this runs, it will be on the second engine lifetime - but this time, imageList will contain

    // the two most cutest cats

    await step.do(

      "choose a random cat from the list and download it",

      async () => {

        const randomCat = imageList.at(getRandomInt(0, imageList.length));

        // this will eventually succeed since `randomCat` is defined

        return await fetch(`https://http.cat/${randomCat}`);

      },

    );

  }

}


```

### Avoid doing side effects outside of a `step.do`

It is not recommended to write code with any side effects outside of steps, unless you would like it to be repeated, because the Workflow engine may restart while an instance is running. If the engine restarts, the step logic will be preserved, but logic outside of the steps may be duplicated.

For example, a `console.log()` outside of workflow steps may cause the logs to print twice when the engine restarts.

However, logic involving non-serializable resources, like a database connection, should be executed outside of steps. Operations outside of a `step.do` might be repeated more than once, due to the nature of the Workflows' instance lifecycle.

Note

If you use [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) in a Workflow, create a new connection inside each `step.do()` and run your queries in that same step. Do not reuse a Hyperdrive-backed connection across steps.

* [  JavaScript ](#tab-panel-13033)
* [  TypeScript ](#tab-panel-13034)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: creating instances outside of steps

    // This might get called more than once creating more instances than expected

    const badInstance = await this.env.ANOTHER_WORKFLOW.create();


    // 🔴 Bad: using non-deterministic functions outside of steps

    // this will produce different results if the instance has to restart, different runs of the same instance

    // might go through different paths

    const badRandom = Math.random();


    if (badRandom > 0) {

      // do some stuff

    }


    // ⚠️ Warning: This log may happen many times

    console.log("This might be logged more than once");


    await step.do("do some stuff and have a log for when it runs", async () => {

      // do some stuff


      // this log will only appear once

      console.log("successfully did stuff");

    });


    // ✅ Good: wrap non-deterministic function in a step

    // after running successfully will not run again

    const goodRandom = await step.do("create a random number", async () => {

      return Math.random();

    });


    // ✅ Good: calls that have no side effects can be done outside of steps

    // For Hyperdrive, create the connection inside each step instead of here.

    const db = createDBConnection(this.env.DB_URL, this.env.DB_TOKEN);


    // ✅ Good: run functions with side effects inside of a step

    // after running successfully will not run again

    const goodInstance = await step.do(

      "good step that returns state",

      async () => {

        const instance = await this.env.ANOTHER_WORKFLOW.create();


        return instance;

      },

    );

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: creating instances outside of steps

    // This might get called more than once creating more instances than expected

    const badInstance = await this.env.ANOTHER_WORKFLOW.create();


    // 🔴 Bad: using non-deterministic functions outside of steps

    // this will produce different results if the instance has to restart, different runs of the same instance

    // might go through different paths

    const badRandom = Math.random();


    if (badRandom > 0) {

      // do some stuff

    }


    // ⚠️ Warning: This log may happen many times

    console.log("This might be logged more than once");


    await step.do("do some stuff and have a log for when it runs", async () => {

      // do some stuff


      // this log will only appear once

      console.log("successfully did stuff");

    });


    // ✅ Good: wrap non-deterministic function in a step

    // after running successfully will not run again

    const goodRandom = await step.do("create a random number", async () => {

      return Math.random();

    });


    // ✅ Good: calls that have no side effects can be done outside of steps

    // For Hyperdrive, create the connection inside each step instead of here.

    const db = createDBConnection(this.env.DB_URL, this.env.DB_TOKEN);


    // ✅ Good: run functions with side effects inside of a step

    // after running successfully will not run again

    const goodInstance = await step.do(

      "good step that returns state",

      async () => {

        const instance = await this.env.ANOTHER_WORKFLOW.create();


        return instance;

      },

    );

  }

}


```

### Do not mutate your incoming events

The `event` passed to your Workflow's `run` method is immutable: changes you make to the event are not persisted across steps and/or Workflow restarts.

* [  JavaScript ](#tab-panel-13017)
* [  TypeScript ](#tab-panel-13018)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: Mutating the event

    // This will not be persisted across steps and `event.payload` will

    // take on its original value.

    await step.do("bad step that mutates the incoming event", async () => {

      let userData = await this.env.KV.get(event.payload.user);

      event.payload = userData;

    });


    // ✅ Good: persist data by returning it as state from your step

    // Use that state in subsequent steps

    let userData = await step.do("good step that returns state", async () => {

      return await this.env.KV.get(event.payload.user);

    });


    let someOtherData = await step.do(

      "following step that uses that state",

      async () => {

        // Access to userData here

        // Will always be the same if this step is retried

      },

    );

  }

}


```

index.ts

```

interface MyEvent {

  user: string;

  data: string;

}


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<MyEvent>, step: WorkflowStep) {

    // 🔴 Bad: Mutating the event

    // This will not be persisted across steps and `event.payload` will

    // take on its original value.

    await step.do("bad step that mutates the incoming event", async () => {

      let userData = await this.env.KV.get(event.payload.user);

      event.payload = userData;

    });


    // ✅ Good: persist data by returning it as state from your step

    // Use that state in subsequent steps

    let userData = await step.do("good step that returns state", async () => {

      return await this.env.KV.get(event.payload.user);

    });


    let someOtherData = await step.do(

      "following step that uses that state",

      async () => {

        // Access to userData here

        // Will always be the same if this step is retried

      },

    );

  }

}


```

### Name steps deterministically

Steps should be named deterministically (that is, not using the current date/time, randomness, etc). This ensures that their state is cached, and prevents the step from being rerun unnecessarily. Step names act as the "cache key" in your Workflow.

* [  JavaScript ](#tab-panel-13025)
* [  TypeScript ](#tab-panel-13026)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: Naming the step non-deterministically prevents it from being cached

    // This will cause the step to be re-run if subsequent steps fail.

    await step.do(`step #1 running at: ${Date.now()}`, async () => {

      let userData = await this.env.KV.get(event.payload.user);

      // Do not mutate event.payload

      event.payload = userData;

    });


    // ✅ Good: give steps a deterministic name.

    // Return dynamic values in your state, or log them instead.

    let state = await step.do("fetch user data from KV", async () => {

      let userData = await this.env.KV.get(event.payload.user);

      console.log(`fetched at ${Date.now()}`);

      return userData;

    });


    // ✅ Good: steps that are dynamically named are constructed in a deterministic way.

    // In this case, `catList` is a step output, which is stable, and `catList` is

    // traversed in a deterministic fashion (no shuffles or random accesses) so,

    // it's fine to dynamically name steps (e.g: create a step per list entry).

    let catList = await step.do("get cat list from KV", async () => {

      return await this.env.KV.get("cat-list");

    });


    for (const cat of catList) {

      await step.do(`get cat: ${cat}`, async () => {

        return await this.env.KV.get(cat);

      });

    }

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: Naming the step non-deterministically prevents it from being cached

    // This will cause the step to be re-run if subsequent steps fail.

    await step.do(`step #1 running at: ${Date.now()}`, async () => {

      let userData = await this.env.KV.get(event.payload.user);

      // Do not mutate event.payload

      event.payload = userData;

    });


    // ✅ Good: give steps a deterministic name.

    // Return dynamic values in your state, or log them instead.

    let state = await step.do("fetch user data from KV", async () => {

      let userData = await this.env.KV.get(event.payload.user);

      console.log(`fetched at ${Date.now()}`);

      return userData;

    });


    // ✅ Good: steps that are dynamically named are constructed in a deterministic way.

    // In this case, `catList` is a step output, which is stable, and `catList` is

    // traversed in a deterministic fashion (no shuffles or random accesses) so,

    // it's fine to dynamically name steps (e.g: create a step per list entry).

    let catList = await step.do("get cat list from KV", async () => {

      return await this.env.KV.get("cat-list");

    });


    for (const cat of catList) {

      await step.do(`get cat: ${cat}`, async () => {

        return await this.env.KV.get(cat);

      });

    }

  }

}


```

### Take care with `Promise.race()` and `Promise.any()`

Workflows allows the usage steps within the `Promise.race()` or `Promise.any()` methods as a way to achieve concurrent steps execution. However, some considerations must be taken.

Due to the nature of Workflows' instance lifecycle, and given that a step inside a Promise will run until it finishes, the step that is returned during the first passage may not be the actual cached step, as [steps are cached by their names](#name-steps-deterministically).

* [  JavaScript ](#tab-panel-13013)
* [  TypeScript ](#tab-panel-13014)

index.js

```

// helper sleep method

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: The `Promise.race` is not surrounded by a `step.do`, which may cause undeterministic caching behavior.

    const race_return = await Promise.race([

      step.do("Promise first race", async () => {

        await sleep(1000);

        return "first";

      }),

      step.do("Promise second race", async () => {

        return "second";

      }),

    ]);


    await step.sleep("Sleep step", "2 hours");


    return await step.do("Another step", async () => {

      // This step will return `first`, even though the `Promise.race` first returned `second`.

      return race_return;

    });

  }

}


```

index.ts

```

// helper sleep method

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: The `Promise.race` is not surrounded by a `step.do`, which may cause undeterministic caching behavior.

    const race_return = await Promise.race([

      step.do("Promise first race", async () => {

        await sleep(1000);

        return "first";

      }),

      step.do("Promise second race", async () => {

        return "second";

      }),

    ]);


    await step.sleep("Sleep step", "2 hours");


    return await step.do("Another step", async () => {

      // This step will return `first`, even though the `Promise.race` first returned `second`.

      return race_return;

    });

  }

}


```

To ensure consistency, we suggest to surround the `Promise.race()` or `Promise.any()` within a `step.do()`, as this will ensure caching consistency across multiple passages.

* [  JavaScript ](#tab-panel-13023)
* [  TypeScript ](#tab-panel-13024)

index.js

```

// helper sleep method

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // ✅ Good: The `Promise.race` is surrounded by a `step.do`, ensuring deterministic caching behavior.

    const race_return = await step.do("Promise step", async () => {

      return await Promise.race([

        step.do("Promise first race", async () => {

          await sleep(1000);

          return "first";

        }),

        step.do("Promise second race", async () => {

          return "second";

        }),

      ]);

    });


    await step.sleep("Sleep step", "2 hours");


    return await step.do("Another step", async () => {

      // This step will return `second` because the `Promise.race` was surround by the `step.do` method.

      return race_return;

    });

  }

}


```

index.ts

```

// helper sleep method

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // ✅ Good: The `Promise.race` is surrounded by a `step.do`, ensuring deterministic caching behavior.

    const race_return = await step.do("Promise step", async () => {

      return await Promise.race([

        step.do("Promise first race", async () => {

          await sleep(1000);

          return "first";

        }),

        step.do("Promise second race", async () => {

          return "second";

        }),

      ]);

    });


    await step.sleep("Sleep step", "2 hours");


    return await step.do("Another step", async () => {

      // This step will return `second` because the `Promise.race` was surround by the `step.do` method.

      return race_return;

    });

  }

}


```

### Instance IDs are unique

Workflow [instance IDs](https://developers.cloudflare.com/workflows/build/workers-api/#workflowinstance) are unique per Workflow. The ID is the unique identifier that associates logs, metrics, state and status of a run to a specific instance, even after completion. Allowing ID re-use would make it hard to understand if a Workflow instance ID referred to an instance that run yesterday, last week or today.

It would also present a problem if you wanted to run multiple different Workflow instances with different [input parameters](https://developers.cloudflare.com/workflows/build/events-and-parameters/) for the same user ID, as you would immediately need to determine a new ID mapping.

If you need to associate multiple instances with a specific user, merchant or other "customer" ID in your system, consider using a composite ID or using randomly generated IDs and storing the mapping in a database like [D1](https://developers.cloudflare.com/d1/).

* [  JavaScript ](#tab-panel-13027)
* [  TypeScript ](#tab-panel-13028)

index.js

```

// This is in the same file as your Workflow definition

export default {

  async fetch(req, env) {

    // 🔴 Bad: Use an ID that isn't unique across future Workflow invocations

    let userId = getUserId(req); // Returns the userId

    let badInstance = await env.MY_WORKFLOW.create({

      id: userId,

      params: payload,

    });


    // ✅ Good: use an ID that is unique

    // e.g. a transaction ID, order ID, or task ID are good options

    let instanceId = getTransactionId(); // e.g. assuming transaction IDs are unique

    // or: compose a composite ID and store it in your database

    // so that you can track all instances associated with a specific user or merchant.

    instanceId = `${getUserId(req)}-${crypto.randomUUID().slice(0, 6)}`;

    let { result } = await addNewInstanceToDB(userId, instanceId);

    let goodInstance = await env.MY_WORKFLOW.create({

      id: instanceId,

      params: payload,

    });


    return Response.json({

      id: goodInstance.id,

      details: await goodInstance.status(),

    });

  },

};


```

index.ts

```

// This is in the same file as your Workflow definition

export default {

  async fetch(req: Request, env: Env): Promise<Response> {

    // 🔴 Bad: Use an ID that isn't unique across future Workflow invocations

    let userId = getUserId(req); // Returns the userId

    let badInstance = await env.MY_WORKFLOW.create({

      id: userId,

      params: payload,

    });


    // ✅ Good: use an ID that is unique

    // e.g. a transaction ID, order ID, or task ID are good options

    let instanceId = getTransactionId(); // e.g. assuming transaction IDs are unique

    // or: compose a composite ID and store it in your database

    // so that you can track all instances associated with a specific user or merchant.

    instanceId = `${getUserId(req)}-${crypto.randomUUID().slice(0, 6)}`;

    let { result } = await addNewInstanceToDB(userId, instanceId);

    let goodInstance = await env.MY_WORKFLOW.create({

      id: instanceId,

      params: payload,

    });


    return Response.json({

      id: goodInstance.id,

      details: await goodInstance.status(),

    });

  },

};


```

### `await` your steps

When calling `step.do` or `step.sleep`, use `await` to avoid introducing bugs and race conditions into your Workflow code.

If you don't call `await step.do` or `await step.sleep`, you create a dangling Promise. This occurs when a Promise is created but not properly `await`ed, leading to potential bugs and race conditions.

This happens when you do not use the `await` keyword or fail to chain `.then()` methods to handle the result of a Promise. For example, calling `fetch(GITHUB_URL)` without awaiting its response will cause subsequent code to execute immediately, regardless of whether the fetch completed. This can cause issues like premature logging, exceptions being swallowed (and not terminating the Workflow), and lost return values (state).

* [  JavaScript ](#tab-panel-13015)
* [  TypeScript ](#tab-panel-13016)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: The step isn't await'ed, and any state or errors is swallowed before it returns.

    const badIssues = step.do(`fetch issues from GitHub`, async () => {

      // The step will return before this call is done

      let issues = await getIssues(event.payload.repoName);

      return issues;

    });


    // ✅ Good: The step is correctly await'ed.

    const goodIssues = await step.do(`fetch issues from GitHub`, async () => {

      let issues = await getIssues(event.payload.repoName);

      return issues;

    });


    // Rest of your Workflow goes here!

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: The step isn't await'ed, and any state or errors is swallowed before it returns.

    const badIssues = step.do(`fetch issues from GitHub`, async () => {

      // The step will return before this call is done

      let issues = await getIssues(event.payload.repoName);

      return issues;

    });


    // ✅ Good: The step is correctly await'ed.

    const goodIssues = await step.do(`fetch issues from GitHub`, async () => {

      let issues = await getIssues(event.payload.repoName);

      return issues;

    });


    // Rest of your Workflow goes here!

  }

}


```

### Use conditional logic carefully

You can use `if` statements, loops, and other control flow outside of steps. However, conditions must be based on **deterministic values** — either values from `event.payload` or return values from previous steps. Non-deterministic conditions (such as `Math.random()` or `Date.now()`) outside of steps can cause unexpected behavior if the Workflow restarts.

* [  JavaScript ](#tab-panel-13035)
* [  TypeScript ](#tab-panel-13036)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    const config = await step.do("fetch config", async () => {

      return await this.env.KV.get("feature-flags", { type: "json" });

    });


    // ✅ Good: Condition based on step output (deterministic)

    if (config.enableEmailNotifications) {

      await step.do("send email", async () => {

        // Send email logic

      });

    }


    // ✅ Good: Condition based on event payload (deterministic)

    if (event.payload.userType === "premium") {

      await step.do("premium processing", async () => {

        // Premium-only logic

      });

    }


    // 🔴 Bad: Condition based on non-deterministic value outside a step

    // This could behave differently if the Workflow restarts

    if (Math.random() > 0.5) {

      await step.do("maybe do something", async () => {});

    }


    // ✅ Good: Wrap non-deterministic values in a step

    const shouldProcess = await step.do("decide randomly", async () => {

      return Math.random() > 0.5;

    });

    if (shouldProcess) {

      await step.do("conditionally do something", async () => {});

    }

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    const config = await step.do("fetch config", async () => {

      return await this.env.KV.get("feature-flags", { type: "json" });

    });


    // ✅ Good: Condition based on step output (deterministic)

    if (config.enableEmailNotifications) {

      await step.do("send email", async () => {

        // Send email logic

      });

    }


    // ✅ Good: Condition based on event payload (deterministic)

    if (event.payload.userType === "premium") {

      await step.do("premium processing", async () => {

        // Premium-only logic

      });

    }


    // 🔴 Bad: Condition based on non-deterministic value outside a step

    // This could behave differently if the Workflow restarts

    if (Math.random() > 0.5) {

      await step.do("maybe do something", async () => {});

    }


    // ✅ Good: Wrap non-deterministic values in a step

    const shouldProcess = await step.do("decide randomly", async () => {

      return Math.random() > 0.5;

    });

    if (shouldProcess) {

      await step.do("conditionally do something", async () => {});

    }

  }

}


```

### Batch multiple Workflow invocations

When creating multiple Workflow instances, use the [createBatch](https://developers.cloudflare.com/workflows/build/workers-api/#createBatch) method to batch the invocations together. This allows you to create multiple Workflow instances in a single request, which will reduce the number of requests made to the Workflows API. However, each individual instance in the batch will still count towards the [creation rate limit](https://developers.cloudflare.com/workflows/reference/limits/). Unlike `create`, `createBatch` is idempotent: if an existing instance with the same ID is still within its [retention limit](https://developers.cloudflare.com/workflows/reference/limits/), it will be skipped and excluded from the returned array.

* [  JavaScript ](#tab-panel-13029)
* [  TypeScript ](#tab-panel-13030)

index.js

```

export default {

  async fetch(req, env) {

    let instances = [

      { id: "user1", params: { name: "John" } },

      { id: "user2", params: { name: "Jane" } },

      { id: "user3", params: { name: "Alice" } },

      { id: "user4", params: { name: "Bob" } },

    ];


    // 🔴 Bad: Create them one by one, which is more likely to hit creation rate limits.

    for (let instance of instances) {

      await env.MY_WORKFLOW.create({

        id: instance.id,

        params: instance.params,

      });

    }


    // ✅ Good: Batch calls together

    // This improves throughput.

    let createdInstances = await env.MY_WORKFLOW.createBatch(instances);

    return Response.json({ instances: createdInstances });

  },

};


```

index.ts

```

export default {

  async fetch(req: Request, env: Env): Promise<Response> {

    let instances = [

      { id: "user1", params: { name: "John" } },

      { id: "user2", params: { name: "Jane" } },

      { id: "user3", params: { name: "Alice" } },

      { id: "user4", params: { name: "Bob" } },

    ];


    // 🔴 Bad: Create them one by one, which is more likely to hit creation rate limits.

    for (let instance of instances) {

      await env.MY_WORKFLOW.create({

        id: instance.id,

        params: instance.params,

      });

    }


    // ✅ Good: Batch calls together

    // This improves throughput.

    let createdInstances = await env.MY_WORKFLOW.createBatch(instances);

    return Response.json({ instances: createdInstances });

  },

};


```

### Limit timeouts to 30 minutes or less

When setting a [WorkflowStep timeout](https://developers.cloudflare.com/workflows/build/workers-api/#workflowstep), ensure that its duration is 30 minutes or less. If your use case requires a timeout greater than 30 minutes, consider using `step.waitForEvent()` instead.

### Keep non-stream step return values under 1 MiB

A non-stream `step.do()` return value can persist up to 1 MiB (2^20 bytes). If your step returns structured data exceeding this limit, the step will fail. This is a common issue when fetching large API responses or processing large files.

In JavaScript Workflows, `ReadableStream<Uint8Array>` is a supported serializable return type for larger binary output. When persisting this kind of output, you should:

* Return a new stream from the step callback.
* Keep individual chunks under 16 MB.
* Do not return a locked stream or a stream that has already been read.
* Rely only on streams returned from steps.  
Note  
Only byte streams are supported - use `ReadableStream<Uint8Array>`.

BYOB streams and BYOB readers are not supported. :::

Note that streamed outputs are still considered part of the Workflow instance storage limit.

If these storage limits still do not work for you, consider storing your step outputs externally (for example, in [R2](https://developers.cloudflare.com/r2)) and saving a reference to it.

* [  JavaScript ](#tab-panel-13031)
* [  TypeScript ](#tab-panel-13032)

index.js

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // 🔴 Bad: Returning a large response that may exceed 1 MiB

    const largeData = await step.do("fetch large dataset", async () => {

      const response = await fetch("https://api.example.com/large-dataset");

      return await response.json(); // Could exceed 1 MiB

    });


    // ✅ Good: Store large structured data externally and return a reference

    const dataRef = await step.do("fetch and store large dataset", async () => {

      const response = await fetch("https://api.example.com/large-dataset");

      const data = await response.json();

      // Store in R2 and return a reference

      await this.env.MY_BUCKET.put("dataset-123", JSON.stringify(data));

      return { key: "dataset-123" };

    });


    // Retrieve the data in a later step when needed

    const data = await step.do("process dataset", async () => {

      const stored = await this.env.MY_BUCKET.get(dataRef.key);

      return processData(await stored.json());

    });

  }

}


```

index.ts

```

export class MyWorkflow extends WorkflowEntrypoint {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // 🔴 Bad: Returning a large response that may exceed 1 MiB

    const largeData = await step.do("fetch large dataset", async () => {

      const response = await fetch("https://api.example.com/large-dataset");

      return await response.json(); // Could exceed 1 MiB

    });


    // ✅ Good: Store large structured data externally and return a reference

    const dataRef = await step.do("fetch and store large dataset", async () => {

      const response = await fetch("https://api.example.com/large-dataset");

      const data = await response.json();

      // Store in R2 and return a reference

      await this.env.MY_BUCKET.put("dataset-123", JSON.stringify(data));

      return { key: "dataset-123" };

    });


    // Retrieve the data in a later step when needed

    const data = await step.do("process dataset", async () => {

      const stored = await this.env.MY_BUCKET.get(dataRef.key);

      return processData(await stored.json());

    });

  }

}


```

## Related resources

* [Workers Best Practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/): code patterns for request handling, observability, and security that apply to the Workers triggering your Workflows.
* [Rules of Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/): best practices for stateful, coordinated applications — useful when combining Durable Objects with Workflows.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/build/rules-of-workflows/#page","headline":"Rules of Workflows · Cloudflare Workflows docs","description":"Best practices for building resilient Workflows, including idempotency, state management, and error handling.","url":"https://developers.cloudflare.com/workflows/build/rules-of-workflows/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/rules-of-workflows/","name":"Rules of Workflows"}}]}
```
