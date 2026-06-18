---
title: Foreign Function Interface (FFI)
description: Call JavaScript APIs, bindings, and globals from Python Workers using the Pyodide FFI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Foreign Function Interface (FFI)

Via [Pyodide ↗](https://pyodide.org/en/stable/), Python Workers provide a [Foreign Function Interface (FFI) ↗](https://en.wikipedia.org/wiki/Foreign%5Ffunction%5Finterface) to JavaScript. This allows you to:

* Use [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to resources on Cloudflare, including [Workers AI](https://developers.cloudflare.com/workers-ai/), [Vectorize](https://developers.cloudflare.com/vectorize/), [R2](https://developers.cloudflare.com/r2/), [KV](https://developers.cloudflare.com/kv/), [D1](https://developers.cloudflare.com/d1/), [Queues](https://developers.cloudflare.com/queues/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) and more.
* Use JavaScript globals, like [Request](https://developers.cloudflare.com/workers/runtime-apis/request/), [Response](https://developers.cloudflare.com/workers/runtime-apis/response/), and [fetch()](https://developers.cloudflare.com/workers/runtime-apis/fetch/).
* Use the full feature set of Cloudflare Workers — if an API is accessible in JavaScript, you can also access it in a Python Worker, writing exclusively Python code.

The details of Pyodide's Foreign Function Interface are documented [here ↗](https://pyodide.org/en/stable/usage/type-conversions.html), and Workers written in Python are able to take full advantage of this.

## Using Bindings from Python Workers

Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform. When you declare a binding on your Worker, you grant it a specific capability, such as being able to read and write files to an [R2](https://developers.cloudflare.com/r2/) bucket.

For example, to access a [KV](https://developers.cloudflare.com/kv) namespace from a Python Worker, you would declare the following in your Worker's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11828)
* [  wrangler.toml ](#tab-panel-11829)

JSONC

```

{

  "main": "./src/index.py",

  "kv_namespaces": [

    {

      "binding": "FOO",

      "id": "<YOUR_KV_NAMESPACE_ID>"

    }

  ]

}


```

TOML

```

main = "./src/index.py"


[[kv_namespaces]]

binding = "FOO"

id = "<YOUR_KV_NAMESPACE_ID>"


```

...and then call `.get()` on the binding object that is exposed on `env`:

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        await self.env.FOO.put("bar", "baz")

        bar = await self.env.FOO.get("bar")

        return Response(bar) # returns "baz"


```

Under the hood, `env` is actually a JavaScript object. When you call `.FOO`, you are accessing this property via a [JsProxy ↗](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy) — special proxy object that makes a JavaScript object behave like a Python object.

### Converting Python to JavaScript

Occasionally, to interoperate with JavaScript APIs, you may need to convert a Python object to JavaScript. Pyodide provides a `to_js` function to facilitate this conversion.

Python

```

from js import Object

from pyodide.ffi import to_js as _to_js


from workers import WorkerEntrypoint, Response


# to_js converts between Python dictionaries and JavaScript Objects

def to_js(obj):

   return _to_js(obj, dict_converter=Object.fromEntries)


```

For more details, see out the [documentation on pyodide.ffi.to\_js ↗](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.to%5Fjs).

## Using JavaScript globals from Python Workers

When writing Workers in Python, you can access JavaScript globals by importing them from the `js` module. For example, note how `Response` is imported from `js` in the example below:

Python

```

from workers import WorkerEntrypoint

from js import Response


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return Response.new("Hello World!")


```

Refer to the [Python examples](https://developers.cloudflare.com/workers/languages/python/examples/) to learn how to call into JavaScript functions from Python, including `console.log` and logging, providing options to `Response`, and parsing JSON.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/ffi/#page","headline":"Work with JavaScript objects, methods, functions and globals from Python Workers · Cloudflare Workers docs","description":"Call JavaScript APIs, bindings, and globals from Python Workers using the Pyodide FFI.","url":"https://developers.cloudflare.com/workers/languages/python/ffi/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/ffi/","name":"Foreign Function Interface (FFI)"}}]}
```
