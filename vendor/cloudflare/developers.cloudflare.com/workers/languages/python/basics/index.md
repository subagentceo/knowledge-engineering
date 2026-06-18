---
title: The Basics
description: Learn the basics of Python Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# The Basics

## Fetch Handler

As mentioned in the [introduction to Python Workers](https://developers.cloudflare.com/workers/languages/python/), a Python Worker can be as simple as four lines of code:

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello World!")


```

Similar to other Workers, the main entry point for a Python worker is the [fetch handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch) which handles incoming requests sent to the Worker.

In a Python Worker, this handler is placed in a `Default` class that extends the `WorkerEntrypoint` class (which you can import from the `workers` SDK module).

## The `Request` Interface

The `request` parameter passed to your `fetch` handler is a JavaScript Request object, exposed via the [foreign function interface (FFI)](https://developers.cloudflare.com/workers/languages/python/ffi), allowing you to access it directly from your Python code.

Let's try editing the worker to accept a POST request. We know from the[documentation for Request](https://developers.cloudflare.com/workers/runtime-apis/request) that we can call`await request.json()` within an `async` function to parse the request body as JSON.

In a Python Worker, you would write:

Python

```

from workers import WorkerEntrypoint, Response

from hello import hello


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        name = (await request.json()).name

        return Response(hello(name))


```

Many other JavaScript APIs are available in Python Workers via the FFI, so you can call other methods in a similar way.

Once you edit the `src/entry.py`, Wrangler will automatically restart the local development server.

Now, if you send a POST request with the appropriate body, your Worker will respond with a personalized message.

Terminal window

```

curl --header "Content-Type: application/json" \

  --request POST \

  --data '{"name": "Python"}' http://localhost:8787


```

```

Hello, Python!


```

## The `env` Attribute

The `env` attribute on the `WorkerEntrypoint` can be used to access[environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/),[secrets](https://developers.cloudflare.com/workers/configuration/secrets/),and[bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

For example, let us try setting and using an environment variable in a Python Worker. First, add the environment variable to your Worker's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11826)
* [  wrangler.toml ](#tab-panel-11827)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "hello-python-worker",

  "main": "src/entry.py",

  "compatibility_flags": [

    "python_workers"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "vars": {

    "API_HOST": "example.com"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "hello-python-worker"

main = "src/entry.py"

compatibility_flags = [ "python_workers" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[vars]

API_HOST = "example.com"


```

Then, you can access the `API_HOST` environment variable via the `env` parameter:

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response(self.env.API_HOST)


```

## Modules

Python workers can be split across multiple files.

Let's create a new Python file, called `src/hello.py`:

Python

```

def hello(name):

    return "Hello, " + name + "!"


```

Now, we can modify `src/entry.py` to make use of the new module.

Python

```

from hello import hello

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response(hello("World"))


```

Once you edit `src/entry.py`, [pywrangler](https://developers.cloudflare.com/workers/languages/python/#the-pywrangler-cli-tool) will automatically detect the change and reload your Worker.

## Types and Autocompletion

When developing Python Workers, you can take advantage of type hints and autocompletion in your IDE.

To enable them, install the `workers-runtime-sdk` package in your `pyproject.toml` file.

TOML

```

[dependency-groups]

dev = [

    "workers-py",

    "workers-runtime-sdk"

]


```

Additionally, you can generate types based on your Worker configuration using `uv run pywrangler types`

This includes Env types based on your bindings, module rules, and runtime types based on the compatibility\_date and compatibility\_flags in your config file.

## Upgrading `pywrangler`

To upgrade to the latest version of [pywrangler](https://developers.cloudflare.com/workers/languages/python/#the-pywrangler-cli-tool) globally, run the following command:

Terminal window

```

uv tool upgrade workers-py


```

To upgrade to the latest version of `pywrangler` in a specific project, run the following command:

Terminal window

```

uv lock --upgrade-package workers-py


```

## Next Up

* Learn details about local development, deployment, and [how Python Workers work](https://developers.cloudflare.com/workers/languages/python/how-python-workers-work).
* Explore the [package](https://developers.cloudflare.com/workers/languages/python/packages) docs for instructions on how to use packages with Python Workers.
* Understand which parts of the [Python Standard Library](https://developers.cloudflare.com/workers/languages/python/stdlib) are supported in Python Workers.
* Learn about Python Workers' [foreign function interface (FFI)](https://developers.cloudflare.com/workers/languages/python/ffi), and how to use it to work with [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings) and [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/basics/#page","headline":"Learn the basics of Python Workers · Cloudflare Workers docs","description":"Learn the basics of Python Workers","url":"https://developers.cloudflare.com/workers/languages/python/basics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/basics/","name":"The Basics"}}]}
```
