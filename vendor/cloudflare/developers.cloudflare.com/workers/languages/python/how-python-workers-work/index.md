---
title: How Python Workers Work
description: Learn how Python Workers run via Pyodide in V8 isolates and how local development works.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Python Workers Work

Workers written in Python are executed by [Pyodide ↗](https://pyodide.org/en/stable/index.html). Pyodide is a port of [CPython ↗](https://github.com/python) (the reference implementation of Python — commonly referred to as just "Python") to WebAssembly.

When you write a Python Worker, your code is interpreted directly by Pyodide, within a V8 isolate. Refer to [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/) to learn more.

## Local Development

A basic Python Worker includes a Python file with a `Default` class extending `WorkerEntrypoint`, such as:

Python

```

from workers import Response, WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response("Hello world!")


```

...and a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) that points to this `.py` file:

* [  wrangler.jsonc ](#tab-panel-11830)
* [  wrangler.toml ](#tab-panel-11831)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "hello-world-python-worker",

  "main": "src/entry.py",

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "hello-world-python-worker"

main = "src/entry.py"

# Set this to today's date

compatibility_date = "2026-06-18"


```

When you run `uv run pywrangler dev` to do local dev, the Workers runtime will:

1. Determine which version of Pyodide is required, based on your compatibility date
2. Install any packages necessary based on your `pyproject.toml` file
3. Create a new v8 isolate for your Worker, and automatically inject Pyodide
4. Serve your Python code using Pyodide

There are no extra toolchain or precompilation steps needed. The Python execution environment is provided directly by the Workers runtime, mirroring how Workers written in JavaScript work.

Refer to the [Python examples](https://developers.cloudflare.com/workers/languages/python/examples/) to learn how to use Python within Workers.

## Deployment Lifecycle and Cold Start Optimizations

To reduce cold start times, when you deploy a Python Worker, Cloudflare performs as much of the expensive work as possible upfront, at deploy time. When you run npx `uv run pywrangler deploy`, the following happens:

1. Wrangler uploads your Python code and any packages included in your `pyproject.toml` to the Workers API.
2. Cloudflare sends your Python code to the Workers runtime to be validated.
3. Cloudflare creates a new v8 isolate for your Worker, automatically injecting Pyodide.
4. Cloudflare scans the Worker’s code for import statements, execute them, and then take a snapshot of the Worker’s WebAssembly linear memory. Effectively, we perform the expensive work of importing packages at deploy time, rather than at runtime.
5. Cloudflare deploys this snapshot alongside your Worker’s Python code to the Cloudflare network.

When a request comes in to your Worker, we load this snapshot and use it to bootstrap your Worker in an isolate, avoiding expensive initialization time:

![Diagram of how Python Workers are deployed to Cloudflare](https://developers.cloudflare.com/_astro/python-workers-deployment.B83dgcK7_2nS876.webp) 

Refer to the [blog post introducing Python Workers ↗](https://blog.cloudflare.com/python-workers) for more detail about performance optimizations and how the Workers runtime will reduce cold starts for Python Workers.

## Pyodide and Python versions

A new version of Python is released every year in August, and a new version of Pyodide is released six (6) months later. When this new version of Pyodide is published, we will add it to Workers by gating it behind a Compatibility Flag, which is only enabled after a specified Compatibility Date. This lets us continually provide updates, without risk of breaking changes, extending the commitment we’ve made for JavaScript to Python.

Each Python release has a [five (5) year support window ↗](https://devguide.python.org/versions/). Once this support window has passed for a given version of Python, security patches are no longer applied, making this version unsafe to rely on. To mitigate this risk, while still trying to hold as true as possible to our commitment of stability and long-term support, after five years any Python Worker still on a Python release that is outside of the support window will be automatically moved forward to the next oldest Python release. Python is a mature and stable language, so we expect that in most cases, your Python Worker will continue running without issue. But we recommend updating the compatibility date of your Worker regularly, to stay within the support window.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/how-python-workers-work/#page","headline":"How Python Workers Work · Cloudflare Workers docs","description":"Learn how Python Workers run via Pyodide in V8 isolates and how local development works.","url":"https://developers.cloudflare.com/workers/languages/python/how-python-workers-work/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/how-python-workers-work/","name":"How Python Workers Work"}}]}
```
