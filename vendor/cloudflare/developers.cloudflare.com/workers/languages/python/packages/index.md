---
title: Packages
description: Manage and use Python packages in Cloudflare Workers with Pywrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Packages

[Pywrangler ↗](https://github.com/cloudflare/workers-py?tab=readme-ov-file#pywrangler) is a CLI tool for managing packages and Python Workers. It is meant as a wrapper for wrangler that sets up a full environment for you, including bundling your packages into your worker bundle on deployment.

To get started, create a pyproject.toml file with the following contents:

TOML

```

[project]

name = "YourProjectName"

version = "0.1.0"

description = "Add your description here"

requires-python = ">=3.12"

dependencies = [

    "fastapi"

]


[dependency-groups]

dev = [

  "workers-py",

  "workers-runtime-sdk"

]


```

The above will allow your worker to depend on the [FastAPI ↗](https://fastapi.tiangolo.com/) package.

To run the worker locally:

```

uv run pywrangler dev


```

To deploy your worker:

```

uv run pywrangler deploy


```

Your dependencies will get bundled with your worker automatically on deployment.

The `pywrangler` CLI also supports all commands supported by the `wrangler` tool, for the full list of commands run `uv run pywrangler --help`.

## Supported Libraries

Python Workers support pure Python packages on [PyPI ↗](https://pypi.org/), as well as [packages that are included in Pyodide ↗](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

If you would like to use a package that is not pure Python and not yet supported in Pyodide, request support via the [Python Packages Discussions ↗](https://github.com/cloudflare/workerd/discussions/categories/python-packages) on the Cloudflare Workers Runtime GitHub repository.

## HTTP Client Libraries

Only HTTP libraries that are able to make requests asynchronously are supported. Currently, these include [aiohttp ↗](https://docs.aiohttp.org/en/stable/index.html) and [httpx ↗](https://www.python-httpx.org/). You can also use the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) from JavaScript, using Python Workers' [foreign function interface](https://developers.cloudflare.com/workers/languages/python/ffi) to make HTTP requests.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/languages/python/packages/#page","headline":"Python packages supported in Cloudflare Workers · Cloudflare Workers docs","description":"Manage and use Python packages in Cloudflare Workers with Pywrangler.","url":"https://developers.cloudflare.com/workers/languages/python/packages/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/python/","name":"Python Workers"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/languages/python/packages/","name":"Packages"}}]}
```
