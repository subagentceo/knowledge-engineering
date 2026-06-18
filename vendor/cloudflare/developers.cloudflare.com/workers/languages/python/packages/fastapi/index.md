---
title: FastAPI
description: Build Python Workers APIs using FastAPI with the built-in ASGI server.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FastAPI

The FastAPI package is supported in Python Workers.

FastAPI applications use a protocol called the [Asynchronous Server Gateway Interface (ASGI) ↗](https://asgi.readthedocs.io/en/latest/). This means that FastAPI never reads from or writes to a socket itself. An ASGI application expects to be hooked up to an ASGI server, typically [uvicorn ↗](https://www.uvicorn.org/). The ASGI server handles all of the raw sockets on the application’s behalf.

The Workers runtime provides [an ASGI server ↗](https://github.com/cloudflare/workerd/blob/main/src/pyodide/internal/workers-api/src/asgi.py) directly to your Python Worker, which lets you use FastAPI in Python Workers.

## Get Started

Clone the `cloudflare/python-workers-examples` repository and run the FastAPI example:

Terminal window

```

git clone https://github.com/cloudflare/python-workers-examples

cd python-workers-examples/03-fastapi

uv run pywrangler dev


```

### Example code

Python

```

from workers import WorkerEntrypoint

from fastapi import FastAPI, Request

from pydantic import BaseModel

import asgi


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return await asgi.fetch(app, request, self.env)


app = FastAPI()


@app.get("/")

async def root():

    return {"message": "Hello, World!"}


@app.get("/env")

async def root(req: Request):

    env = req.scope["env"]

    return {"message": "Here is an example of getting an environment variable: " + env.MESSAGE}


class Item(BaseModel):

    name: str

    description: str | None = None

    price: float

    tax: float | None = None


@app.post("/items/")

async def create_item(item: Item):

    return item


@app.put("/items/{item_id}")

async def create_item(item_id: int, item: Item, q: str | None = None):

    result = {"item_id": item_id, **item.dict()}

    if q:

        result.update({"q": q})

    return result


@app.get("/items/{item_id}")

async def read_item(item_id: int):

    return {"item_id": item_id}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/#page","headline":"FastAPI · Cloudflare Workers docs","description":"Build Python Workers APIs using FastAPI with the built-in ASGI server.","url":"https://developers.cloudflare.com/workers/languages/python/packages/fastapi/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/packages/","name":"Packages"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/languages/python/packages/fastapi/","name":"FastAPI"}}]}
```
