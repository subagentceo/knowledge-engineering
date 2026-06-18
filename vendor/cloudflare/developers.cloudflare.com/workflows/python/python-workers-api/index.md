---
title: Python Workers API
description: Reference for the Python Workflows SDK, including WorkflowEntrypoint, step methods, and configuration options.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Python Workers API

This guide covers the Python Workflows SDK, with instructions on how to build and create workflows using Python.

## WorkflowEntrypoint

The `WorkflowEntrypoint` is the main entrypoint for a Python workflow. It extends the `WorkflowEntrypoint` class, and implements the `run` method.

Python

```

from workers import WorkflowEntrypoint


class MyWorkflow(WorkflowEntrypoint):

    async def run(self, event, step):

        # steps here


```

## WorkflowStep

* `step.do(name=None, *, concurrent=False, config=None)` — a decorator that allows you to define a step in a workflow.  
   * `name` — an optional name for the step. If omitted, the function name (`func.__name__`) is used.  
   * `concurrent` — an optional boolean that indicates whether dependencies for this step can run concurrently.  
   * `config` — an optional [WorkflowStepConfig](https://developers.cloudflare.com/workflows/build/workers-api/#workflowstepconfig) for configuring [step specific retry behaviour](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying/). This is passed as a Python dictionary and then type translated into a `WorkflowStepConfig` object.  
All parameters except `name` are keyword-only.

Dependencies are resolved implicitly by parameter name. If a step function parameter name matches a previously declared step function, its result is injected into the step.

If you define a `ctx` parameter, the step context is injected into that argument.

Note

Older compatibility behavior supports explicit dependency lists with `depends=[...]`. For new workflows, prefer implicit dependency resolution by parameter name.

Python

```

from workers import WorkflowEntrypoint


class MyWorkflow(WorkflowEntrypoint):

    async def run(self, event, step):

        @step.do()

        async def my_first_step():

            # do some work

            return "Hello World!"


        await my_first_step()


```

Note that the decorator doesn't make the call to the step, it just returns a callable that can be used to invoke the step. You have to call the callable to make the step run.

When returning state from a step, you must make sure that the returned value is serializable. Since steps run through an FFI layer, the returned value gets type translated via [FFI. ↗](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.to%5Fjs)Refer to [Pyodide's documentation ↗](https://pyodide.org/en/stable/usage/type-conversions.html#type-translations-pyproxy-to-js) regarding type conversions for more information.

* `step.sleep(name, duration)`  
   * `name` — the name of the step.  
   * `duration` — the duration to sleep until, in either seconds or as a `WorkflowDuration` compatible string.

Python

```

async def run(self, event, step):

    await step.sleep("my-sleep-step", "10 seconds")


```

* `step.sleep_until(name, timestamp)`  
   * `name` — the name of the step.  
   * `timestamp` — a `datetime.datetime` object or seconds from the Unix epoch to sleep the workflow instance until.

Python

```

import datetime


async def run(self, event, step):

    await step.sleep_until("my-sleep-step", datetime.datetime.now() + datetime.timedelta(seconds=10))


```

* `step.wait_for_event(name, event_type, timeout="24 hours")`  
   * `name` — the name of the step.  
   * `event_type` — the type of event to wait for.  
   * `timeout` — the timeout for the `wait_for_event` call. The default timeout is 24 hours.

Python

```

async def run(self, event, step):

    await step.wait_for_event("my-wait-for-event-step", "my-event-type")


```

### `event` parameter

The `event` parameter is a dictionary that contains the payload passed to the workflow instance, along with other metadata:

* `payload` \- the payload passed to the workflow instance.
* `timestamp` \- the timestamp that the workflow was triggered.
* `instanceId` \- the ID of the current workflow instance.
* `workflowName` \- the name of the workflow.

## Error Handling

Workflows semantics allow users to catch exceptions that get thrown to the top level.

Catching specific exceptions within an `except` block may not work, as some Python errors will not be re-instantiated into the same type of error when they are passed through the RPC layer.

Note

Some built-in Python errors (e.g.: `ValueError`, `TypeError`) will work correctly. User defined exceptions, as well as other built-in Python errors will not and should be caught with the `Exception` class.

Python

```

async def run(self, event, step):

    async def try_step(fn):

        try:

            return await fn()

        except Exception as e:

            print(f"Successfully caught {type(e).__name__}: {e}")


    @step.do("my_failing")

    async def my_failing():

        print("Executing my_failing")

        raise TypeError("Intentional error in my_failing")


    await try_step(my_failing)


```

### NonRetryableError

The Python Workflows SDK provides a `NonRetryableError` class that can be used to signal that a step should not be retried.

Python

```

from workers.workflows import NonRetryableError


raise NonRetryableError(message)


```

## Configure a workflow instance

You can bind a step to a specific retry policy by passing a `WorkflowStepConfig` object to the `config` parameter of the `step.do` decorator. With Python Workflows, you need to make sure that your `dict` respects the [WorkflowStepConfig](https://developers.cloudflare.com/workflows/build/workers-api/#workflowstepconfig) type.

Python

```

from workers import WorkflowEntrypoint


class DemoWorkflowClass(WorkflowEntrypoint):

    async def run(self, event, step):

        @step.do('step-name', config={"retries": {"limit": 1, "delay": "10 seconds"}})

        async def first_step():

            # do some work

            pass


```

### Access step context (`ctx`)

If you define a `ctx` parameter, the [step context](https://developers.cloudflare.com/workflows/build/step-context/) is injected into that argument. The context is a dictionary with the following keys:

| Key     | Type | Description                                                                                      |
| ------- | ---- | ------------------------------------------------------------------------------------------------ |
| step    | dict | Contains name (the step name) and count (how many times step.do has been called with this name). |
| attempt | int  | The current attempt number (1-indexed).                                                          |
| config  | dict | The resolved retry and timeout configuration for this step.                                      |

Python

```

from workers import WorkflowEntrypoint


class CtxWorkflow(WorkflowEntrypoint):

    async def run(self, event, step):

        @step.do()

        async def read_context(ctx):

            print(ctx["step"]["name"])    # step name

            print(ctx["step"]["count"])   # step count

            print(ctx["attempt"])         # attempt number

            print(ctx["config"])          # resolved step config

            return ctx["attempt"]


        return await read_context()


```

### Create an instance via binding

Note that `env` is a JavaScript object exposed to the Python script via [JsProxy ↗](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy). You can access the binding like you would on a JavaScript worker. Refer to the [Workflow binding documentation](https://developers.cloudflare.com/workflows/build/workers-api/#workflow) to learn more about the methods available.

Let's consider the previous binding called `MY_WORKFLOW`. Here's how you would create a new instance:

Python

```

from workers import Response, WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        instance = await self.env.MY_WORKFLOW.create()

        return Response.json({"status": "success"})


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/python/python-workers-api/#page","headline":"Python Workers API · Cloudflare Workflows docs","description":"Reference for the Python Workflows SDK, including WorkflowEntrypoint, step methods, and configuration options.","url":"https://developers.cloudflare.com/workflows/python/python-workers-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/python/","name":"Python Workflows SDK"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/python/python-workers-api/","name":"Python Workers API"}}]}
```
