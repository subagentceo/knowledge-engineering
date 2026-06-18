---
title: Interact with a Workflow
description: Trigger and manage Workflows from Python Workers using FFI bindings to Cloudflare resources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Interact with a Workflow

Python Workflows are in beta, as well as the underlying platform.

You must add both `python_workflows` and `python_workers` compatibility flags to your Wrangler config file.

Also, Python Workflows requires `compatibility_date = "2025-08-01"`, or later, to be set in your Wrangler config file.

The Python Workers platform leverages [FFI ↗](https://en.wikipedia.org/wiki/Foreign%5Ffunction%5Finterface) to access bindings to Cloudflare resources. Refer to the [bindings](https://developers.cloudflare.com/workers/languages/python/ffi/#using-bindings-from-python-workers) documentation for more information.

From the configuration perspective, enabling Python Workflows requires adding the `python_workflows` compatibility flag to your Wrangler configuration file.

* [  wrangler.jsonc ](#tab-panel-13075)
* [  wrangler.toml ](#tab-panel-13076)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "workflows-starter",

  "main": "src/index.py",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["python_workflows", "python_workers"],

  "workflows": [

    {

      // name of your workflow

      "name": "workflows-starter",

      // binding name env.MY_WORKFLOW

      "binding": "MY_WORKFLOW",

      // this is class that extends the Workflow class in src/index.py

      "class_name": "MyWorkflow",

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "workflows-starter"

main = "src/index.py"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "python_workflows", "python_workers" ]


[[workflows]]

name = "workflows-starter"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


```

And this is how you use the payload in your workflow:

Python

```

from workers import WorkflowEntrypoint


class DemoWorkflowClass(WorkflowEntrypoint):

    async def run(self, event, step):

        @step.do('step-name')

        async def first_step():

            payload = event["payload"]

            return payload


```

## Workflow

The `Workflow` binding gives you access to the [Workflow](https://developers.cloudflare.com/workflows/build/workers-api/#workflow) class. All its methods are available on the binding.

Under the hood, the `Workflow` binding is a Javascript object that is exposed to the Python script via [JsProxy ↗](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy). This means that the values returned by its methods are also `JsProxy` objects, and need to be converted back into Python objects using `python_from_rpc`.

### `create`

Create (trigger) a new instance of a given Workflow.

* `create(options=None)`\* `options` \- an **optional** dictionary of options to pass to the workflow instance. Should contain the same keys as the[WorkflowInstanceCreateOptions](https://developers.cloudflare.com/workflows/build/workers-api/#workflowinstancecreateoptions)type.

Python

```

from js import Object

from pyodide.ffi import to_js

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        event = {"foo": "bar"}

        options = to_js({"params": event}, dict_converter=Object.fromEntries)

        await self.env.MY_WORKFLOW.create(options)

        return Response.json({"status": "success"})


```

Note

Values returned from steps need to be converted into Javascript objects using `to_js`. This is why we explicitly construct the payload using `Object.fromEntries`.

The `create` method returns a [WorkflowInstance](https://developers.cloudflare.com/workflows/build/workers-api/#workflowinstance) object, which can be used to query the status of the workflow instance. Note that this is a Javascript object, and not a Python object.

### `create_batch`

Create (trigger) a batch of new workflow instances, up to 100 instances at a time. This is useful if you need to create multiple instances at once within the [instance creation limit](https://developers.cloudflare.com/workflows/reference/limits/).

* `create_batch(batch)`\* `batch` \- list of `WorkflowInstanceCreateOptions` to pass when creating an instance, including a user-provided ID and payload parameters.

Each element of the `batch` list is expected to include both `id` and `params` properties:

Python

```

from pyodide.ffi import to_js

from js import Object

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Create a new batch of 3 Workflow instances, each with its own ID and pass params to the Workflow instances

        listOfInstances = [

            to_js({ "id": "id-abc123", "params": { "hello": "world-0" } }, dict_converter=Object.fromEntries),

            to_js({ "id": "id-def456", "params": { "hello": "world-1" } }, dict_converter=Object.fromEntries),

            to_js({ "id": "id-ghi789", "params": { "hello": "world-2" } }, dict_converter=Object.fromEntries)

        ]

        await self.env.MY_WORKFLOW.create_batch(listOfInstances)

        return Response.json({"status": "success"})


```

### `get`

Get a workflow instance by ID.

* `get(id)`\* `id` \- the ID of the workflow instance to get.

Returns a [WorkflowInstance](https://developers.cloudflare.com/workflows/build/workers-api/#workflowinstance) object, which can be used to query the status of the workflow instance.

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        instance = await self.env.MY_WORKFLOW.get("abc-123")


        # FFI methods available for WorkflowInstance

        await instance.status()

        await instance.pause()

        await instance.resume()

        await instance.restart()

        await instance.terminate()

        return Response.json({"status": "success"})


```

### `send_event`

Send an event to a workflow instance.

* `send_event(options)`\* `type` \- the type of event to send to the workflow instance. \* `payload` \- the payload to send to the workflow instance.

Python

```

from pyodide.ffi import to_js

from js import Object

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        await self.env.MY_WORKFLOW.send_event(to_js({ "type": "my-event-type", "payload": { "foo": "bar" } }, dict_converter=Object.fromEntries))

        return Response.json({"status": "success"})


```

Note

Values passed to `send_event` require explicit type translation into JS objects.

## REST API (HTTP)

Refer to the [Workflows REST API documentation](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/create/).

## Command line (CLI)

Refer to the [CLI quick start](https://developers.cloudflare.com/workflows/get-started/guide/) to learn more about how to manage and trigger Workflows via the command-line.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/python/bindings/#page","headline":"Interact with a Workflow · Cloudflare Workflows docs","description":"Trigger and manage Workflows from Python Workers using FFI bindings to Cloudflare resources.","url":"https://developers.cloudflare.com/workflows/python/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/python/","name":"Python Workflows SDK"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/python/bindings/","name":"Interact with a Workflow"}}]}
```
