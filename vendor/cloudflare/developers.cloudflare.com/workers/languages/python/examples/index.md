---
title: Examples
description: Python code examples demonstrating modules, bindings, and SDK usage in Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Examples

**Last reviewed:**  about 2 years ago 

Cloudflare has a wide range of Python examples in the [Workers Example gallery](https://developers.cloudflare.com/workers/examples/?languages=Python).

In addition to those examples, consider the following ones that illustrate Python-specific behavior.

## Modules in your Worker

Let's say your Worker has the following structure:

```

├── src

│   ├── module.py

│   └── main.py

├── uv.lock

├── pyproject.toml

└── wrangler.toml


```

In order to import `module.py` in `main.py`, you would use the following import statement:

Python

```

import module


```

In this case, the main module is set to `src/main.py` in the wrangler.toml file like so:

TOML

```

main = "src/main.py"


```

This means that the `src` directory does not need to be specified in the import statement.

## Parse an incoming request URL

Python

```

from workers import WorkerEntrypoint, Response

from urllib.parse import urlparse, parse_qs


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Parse the incoming request URL

        url = urlparse(request.url)

        # Parse the query parameters into a Python dictionary

        params = parse_qs(url.query)


        if "name" in params:

            greeting = "Hello there, {name}".format(name=params["name"][0])

            return Response(greeting)


        if url.path == "/favicon.ico":

          return Response("")


        return Response("Hello world!")


```

## Parse JSON from the incoming request

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        name = (await request.json()).name

        return Response("Hello, {name}".format(name=name))


```

## Read bundled asset files in your Worker

Let's say your Worker has the following structure:

```

├── src

│   ├── file.html

│   └── main.py

└── wrangler.jsonc


```

In order to read a file in your Worker, you would do the following:

Python

```

from pathlib import Path

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        html_file = Path(__file__).parent / "file.html"

        return Response(html_file.read_text(), headers={"Content-Type": "text/html"})


```

## Emit logs from your Python Worker

Python

```

# To use the JavaScript console APIs

from js import console

from workers import WorkerEntrypoint, Response

# To use the native Python logging

import logging


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Use the console APIs from JavaScript

        # https://developer.mozilla.org/en-US/docs/Web/API/console

        console.log("console.log from Python!")


        # Alternatively, use the native Python logger

        logger = logging.getLogger(__name__)


        # The default level is warning. We can change that to info.

        logging.basicConfig(level=logging.INFO)


        logger.error("error from Python!")

        logger.info("info log from Python!")


        # Or just use print()

        print("print() from Python!")


        return Response("We're testing logging!")


```

## Publish to a Queue

Python

```

from js import Object

from pyodide.ffi import to_js as _to_js


from workers import WorkerEntrypoint, Response


# to_js converts between Python dictionaries and JavaScript Objects

def to_js(obj):

   return _to_js(obj, dict_converter=Object.fromEntries)


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Bindings are available on the 'env' attribute

        # https://developers.cloudflare.com/queues/


        # The default contentType is "json"

        # We can also pass plain text strings

        await self.env.QUEUE.send("hello", contentType="text")

        # Send a JSON payload

        await self.env.QUEUE.send(to_js({"hello": "world"}))


        # Return a response

        return Response.json({"write": "success"})


```

## Query a D1 Database

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        results = await self.env.DB.prepare("PRAGMA table_list").run()

        # Return a JSON response

        return Response.json(results)


```

Refer to [Query D1 from Python Workers](https://developers.cloudflare.com/d1/examples/query-d1-from-python-workers/) for a more in-depth tutorial that covers how to create a new D1 database and configure bindings to D1.

## Durable Object

Python

```

from workers import WorkerEntrypoint, Response, DurableObject

from pyodide.ffi import to_js


class List(DurableObject):

    async def get_messages(self):

        messages = await self.ctx.storage.get("messages")

        return messages if messages else []


    async def add_message(self, message):

        messages = await self.get_messages()

        messages.append(message)

        await self.ctx.storage.put("messages", to_js(messages))

        return


    async def say_hello(self):

        result = self.ctx.storage.sql.exec(

            "SELECT 'Hello, World!' as greeting"

        ).one()


        return result.greeting


```

Refer to [Durable Objects documentation](https://developers.cloudflare.com/durable-objects/get-started/) for more information.

## Cron Trigger

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def scheduled(self, controller, env, ctx):

        print("cron processed")


```

Refer to [Cron Triggers documentation](https://developers.cloudflare.com/workers/configuration/cron-triggers/) for more information.

## Workflows

Python

```

from workers import WorkflowEntrypoint


class MyWorkflow(WorkflowEntrypoint):

    async def run(self, event, step):

        @step.do()

        async def step_a():

            # do some work

            return 10


        @step.do()

        async def step_b():

            # do some work

            return 20


        @step.do(concurrent=True)

        async def my_final_step(step_a, step_b):

            # should return 30

            return step_a + step_b


        await my_final_step()


```

Refer to the [Python Workflows documentation](https://developers.cloudflare.com/workflows/python/) for more information.

## More Examples

Or you can clone [the examples repository ↗](https://github.com/cloudflare/python-workers-examples) to explore even more examples:

Terminal window

```

git clone https://github.com/cloudflare/python-workers-examples


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/examples/#page","headline":"Python Worker Examples · Cloudflare Workers docs","description":"Python code examples demonstrating modules, bindings, and SDK usage in Workers.","url":"https://developers.cloudflare.com/workers/languages/python/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/examples/","name":"Examples"}}]}
```
