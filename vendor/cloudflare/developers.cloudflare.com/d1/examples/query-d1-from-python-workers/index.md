---
title: Query D1 from Python Workers
description: Learn how to query D1 from a Python Worker
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query D1 from Python Workers

**Last reviewed:**  about 2 years ago 

Learn how to query D1 from a Python Worker

The Cloudflare Workers platform supports [multiple languages](https://developers.cloudflare.com/workers/languages/), including TypeScript, JavaScript, Rust and Python. This guide shows you how to query a D1 database from [Python](https://developers.cloudflare.com/workers/languages/python/) and deploy your application globally.

Note

Support for Python in Cloudflare Workers is in beta. Review the [documentation on Python support](https://developers.cloudflare.com/workers/languages/python/) to understand how Python works within the Workers platform.

## Prerequisites

Before getting started, you should:

1. Review the [D1 tutorial](https://developers.cloudflare.com/d1/get-started/) for TypeScript and JavaScript to learn how to **create a D1 database and configure a Workers project**.
2. Refer to the [Python language guide](https://developers.cloudflare.com/workers/languages/python/) to understand how Python support works on the Workers platform.
3. Have basic familiarity with the Python language.

If you are new to Cloudflare Workers, refer to the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) first before continuing with this example.

## Query from Python

This example assumes you have an existing D1 database. To allow your Python Worker to query your database, you first need to create a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) between your Worker and your D1 database and define this in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

You will need the `database_name` and `database_id` for a D1 database. You can use the `wrangler` CLI to create a new database or fetch the ID for an existing database as follows:

Create a database

```

npx wrangler d1 create my-first-db


```

Retrieve a database ID

```

npx wrangler d1 info some-existing-db


```

```

# ┌───────────────────┬──────────────────────────────────────┐

# │                   │ c89db32e-83f4-4e62-8cd7-7c8f97659029 │

# ├───────────────────┼──────────────────────────────────────┤

# │ name              │ db-enam                              │

# ├───────────────────┼──────────────────────────────────────┤

# │ created_at        │ 2023-06-12T16:52:03.071Z             │

# └───────────────────┴──────────────────────────────────────┘


```

### 1\. Configure bindings

In your Wrangler file, create a new `[[d1_databases]]` configuration block and set `database_name` and `database_id` to the name and id (respectively) of the D1 database you want to query:

* [  wrangler.jsonc ](#tab-panel-7888)
* [  wrangler.toml ](#tab-panel-7889)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "python-and-d1",

  "main": "src/entry.py",

  "compatibility_flags": [ // Required for Python Workers

    "python_workers"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "d1_databases": [

    {

      "binding": "DB", // This will be how you refer to your database in your Worker

      "database_name": "YOUR_DATABASE_NAME",

      "database_id": "YOUR_DATABASE_ID"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "python-and-d1"

main = "src/entry.py"

compatibility_flags = [ "python_workers" ]

# Set this to today's date

compatibility_date = "2026-06-18"


[[d1_databases]]

binding = "DB"

database_name = "YOUR_DATABASE_NAME"

database_id = "YOUR_DATABASE_ID"


```

The value of `binding` is how you will refer to your database from within your Worker. If you change this, you must change this in your Worker script as well.

### 2\. Create your Python Worker

To create a Python Worker, create an empty file at `src/entry.py`, matching the value of `main` in your Wrangler file with the contents below:

Python

```

from workers import Response, WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Do anything else you'd like on request here!


        try:

            # Query D1 - we'll list all tables in our database in this example

            results = await self.env.DB.prepare("PRAGMA table_list").run()

            # Return a JSON response

            return Response.json(results)

        except Exception as e:

            return Response.json({"error": "Database query failed"}, status=500)


```

The value of `binding` in your Wrangler file exactly must match the name of the variable in your Python code. This example refers to the database via a `DB` binding, and query this binding via `await env.DB.prepare(...)`.

You can then deploy your Python Worker directly:

Terminal window

```

npx wrangler deploy


```

```

# Example output

#

# Your worker has access to the following bindings:

# - D1 Databases:

#   - DB: db-enam (c89db32e-83f4-4e62-8cd7-7c8f97659029)

# Total Upload: 0.18 KiB / gzip: 0.17 KiB

# Uploaded python-and-d1 (4.93 sec)

# Published python-and-d1 (0.51 sec)

#   https://python-and-d1.YOUR_SUBDOMAIN.workers.dev

# Current Deployment ID: 80b72e19-da82-4465-83a2-c12fb11ccc72


```

Your Worker will be available at `https://python-and-d1.YOUR_SUBDOMAIN.workers.dev`.

If you receive an error deploying:

* Make sure you have configured your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the `database_id` and `database_name` of a valid D1 database.
* Ensure `compatibility_flags = ["python_workers"]` is set in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), which is required for Python.
* Review the [list of error codes](https://developers.cloudflare.com/workers/observability/errors/), and ensure your code does not throw an uncaught exception.

## Next steps

* Refer to [Workers Python documentation](https://developers.cloudflare.com/workers/languages/python/) to learn more about how to use Python in Workers.
* Review the [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/) and how to query D1 databases.
* Learn [how to import data](https://developers.cloudflare.com/d1/best-practices/import-export-data/) to your D1 database.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/examples/query-d1-from-python-workers/#page","headline":"Query D1 from Python Workers · Cloudflare D1 docs","description":"Learn how to query D1 from a Python Worker","url":"https://developers.cloudflare.com/d1/examples/query-d1-from-python-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/examples/query-d1-from-python-workers/","name":"Query D1 from Python Workers"}}]}
```
