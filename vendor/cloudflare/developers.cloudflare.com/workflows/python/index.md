---
title: Python Workflows SDK
description: Build Cloudflare Workflows using the Python SDK with WorkflowEntrypoint on the Workers platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Python Workflows SDK

Workflow entrypoints can be declared using Python. To achieve this, you can export a `WorkflowEntrypoint` that runs on the Cloudflare Workers platform. Refer to [Python Workers](https://developers.cloudflare.com/workers/languages/python) for more information about Python on the Workers runtime.

Python Workflows are in beta, as well as the underlying platform.

Join the #python-workers channel in the [Cloudflare Developers Discord ↗](https://discord.cloudflare.com/) and let us know what you'd like to see next.

## Get Started

The main entrypoint for a Python workflow is the [WorkflowEntrypoint](https://developers.cloudflare.com/workflows/build/workers-api/#workflowentrypoint) class. Your workflow logic should exist inside the [run](https://developers.cloudflare.com/workflows/build/workers-api/#run) handler.

Python

```

from workers import WorkflowEntrypoint


class MyWorkflow(WorkflowEntrypoint):

    async def run(self, event, step):

        # steps here


```

For example, a Workflow may be defined as:

Python

```

from workers import Response, WorkflowEntrypoint, WorkerEntrypoint


class PythonWorkflowStarter(WorkflowEntrypoint):

    async def run(self, event, step):


        @step.do('step1')

        async def step_1():

            # does stuff

            print('executing step1')


        @step.do('step2')

        async def step_2():

            # does stuff

            print('executing step2')


        await step_1()

        await step_2()


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        await self.env.MY_WORKFLOW.create()

        return Response("Hello world!")


```

You must add both `python_workflows` and `python_workers` compatibility flags to your Wrangler configuration file.

* [  wrangler.jsonc ](#tab-panel-13073)
* [  wrangler.toml ](#tab-panel-13074)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "hello-python",

  "main": "src/entry.py",

  "compatibility_flags": [

    "python_workers",

    "python_workflows"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "workflows": [

    {

      "name": "workflows-demo",

      "binding": "MY_WORKFLOW",

      "class_name": "PythonWorkflowStarter"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "hello-python"

main = "src/entry.py"

compatibility_flags = [ "python_workers", "python_workflows" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[[workflows]]

name = "workflows-demo"

binding = "MY_WORKFLOW"

class_name = "PythonWorkflowStarter"


```

To run a Python Workflow locally, use [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the CLI for Cloudflare Workers:

Terminal window

```

npx wrangler@latest dev


```

To deploy a Python Workflow to Cloudflare, run [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy):

Terminal window

```

npx wrangler@latest deploy


```

Join the #python-workers channel in the [Cloudflare Developers Discord ↗](https://discord.cloudflare.com/) and let us know what you would like to see next.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workflows/python/#page","headline":"Python Workflows SDK · Cloudflare Workflows docs","description":"Build Cloudflare Workflows using the Python SDK with WorkflowEntrypoint on the Workers platform.","url":"https://developers.cloudflare.com/workflows/python/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/python/","name":"Python Workflows SDK"}}]}
```
