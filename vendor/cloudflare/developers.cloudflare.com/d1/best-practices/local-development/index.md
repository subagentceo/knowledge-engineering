---
title: Local development
description: Run D1 locally with Wrangler to test your Worker and database before deploying to production.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Local development

D1 has fully-featured support for local development, running the same version of D1 as Cloudflare runs globally. Local development uses [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers, to manage local development sessions and state.

## Start a local development session

Note

This guide assumes you are using [Wrangler v3.0 ↗](https://blog.cloudflare.com/wrangler3/) or later.

Users new to D1 and/or Cloudflare Workers should visit the [D1 tutorial](https://developers.cloudflare.com/d1/get-started/) to install `wrangler` and deploy their first database.

Local development sessions create a standalone, local-only environment that mirrors the production environment D1 runs in so that you can test your Worker and D1 _before_ you deploy to production.

An existing [D1 binding](https://developers.cloudflare.com/workers/wrangler/configuration/#d1-databases) of `DB` would be available to your Worker when running locally.

To start a local development session:

1. Confirm you are using wrangler v3.0+.  
Terminal window  
```  
wrangler --version  
```  
```  
⛅️ wrangler 3.0.0  
```
2. Start a local development session  
Terminal window  
```  
wrangler dev  
```  
```  
------------------  
wrangler dev now uses local mode by default, powered by 🔥 Miniflare and 👷 workerd.  
To run an edge preview session for your Worker, use wrangler dev --remote  
Your worker has access to the following bindings:  
- D1 Databases:  
  - DB: test-db (c020574a-5623-407b-be0c-cd192bab9545)  
⎔ Starting local server...  
[mf:inf] Ready on http://127.0.0.1:8787/  
[b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit  
```

In this example, the Worker has access to local-only D1 database. The corresponding D1 binding in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) would resemble the following:

* [  wrangler.jsonc ](#tab-panel-7862)
* [  wrangler.toml ](#tab-panel-7863)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "DB",

      "database_name": "test-db",

      "database_id": "c020574a-5623-407b-be0c-cd192bab9545"

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "test-db"

database_id = "c020574a-5623-407b-be0c-cd192bab9545"


```

Note that `wrangler dev` separates local and production (remote) data. A local session does not have access to your production data by default. To access your production (remote) database, set `"remote" : true` in the D1 binding configuration. Refer to the [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) for more information. Any changes you make when running against a remote database cannot be undone.

Refer to the [wrangler dev documentation](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to learn more about how to configure a local development session.

## Develop locally with Pages

You can only develop against a _local_ D1 database when using [Cloudflare Pages](https://developers.cloudflare.com/pages/) by creating a minimal [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) in the root of your Pages project. This can be useful when creating schemas, seeding data or otherwise managing a D1 database directly, without adding to your application logic.

Local development for remote databases

It is currently not possible to develop against a _remote_ D1 database when using [Cloudflare Pages](https://developers.cloudflare.com/pages/).

Your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) should resemble the following:

* [  wrangler.jsonc ](#tab-panel-7864)
* [  wrangler.toml ](#tab-panel-7865)

JSONC

```

{

  // If you are only using Pages + D1, you only need the below in your Wrangler config file to interact with D1 locally.

  "d1_databases": [

    {

      "binding": "DB", // Should match preview_database_id

      "database_name": "YOUR_DATABASE_NAME",

      "database_id": "the-id-of-your-D1-database-goes-here", // wrangler d1 info YOUR_DATABASE_NAME

      "preview_database_id": "DB" // Required for Pages local development

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "YOUR_DATABASE_NAME"

database_id = "the-id-of-your-D1-database-goes-here"

preview_database_id = "DB"


```

You can then execute queries and/or run migrations against a local database as part of your local development process by passing the `--local` flag to wrangler:

Terminal window

```

wrangler d1 execute YOUR_DATABASE_NAME \

  --local --command "CREATE TABLE IF NOT EXISTS users ( user_id INTEGER PRIMARY KEY, email_address TEXT, created_at INTEGER, deleted INTEGER, settings TEXT);"


```

The preceding command would execute queries the **local only** version of your D1 database. Without the `--local` flag, the commands are executed against the remote version of your D1 database running on Cloudflare's network.

## Persist data

Note

By default, in Wrangler v3 and above, data is persisted across each run of `wrangler dev`. If your local development and testing requires or assumes an empty database, you should start with a `DROP TABLE <tablename>` statement to delete existing tables before using `CREATE TABLE` to re-create them.

Use `wrangler dev --persist-to=/path/to/file` to persist data to a specific location. This can be useful when working in a team (allowing you to share) the same copy, when deploying via CI/CD (to ensure the same starting state), or as a way to keep data when migrating across machines.

Users of wrangler `2.x` must use the `--persist` flag: previous versions of wrangler did not persist data by default.

## Test programmatically

### Miniflare

[Miniflare ↗](https://miniflare.dev/) allows you to simulate a Workers and resources like D1 using the same underlying runtime and code as used in production.

You can use Miniflare's [support for D1 ↗](https://miniflare.dev/storage/d1) to create D1 databases you can use for testing:

* [  wrangler.jsonc ](#tab-panel-7866)
* [  wrangler.toml ](#tab-panel-7867)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "DB",

      "database_name": "test-db",

      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "test-db"

database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"


```

JavaScript

```

const mf = new Miniflare({

  d1Databases: {

    DB: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",

  },

});


```

You can then use the `getD1Database()` method to retrieve the simulated database and run queries against it as if it were your real production D1 database:

JavaScript

```

const db = await mf.getD1Database("DB");


const stmt = db.prepare("SELECT name, age FROM users LIMIT 3");

const { results } = await stmt.run();


console.log(results);


```

### `unstable_dev`

Wrangler exposes an [unstable\_dev()](https://developers.cloudflare.com/workers/wrangler/api/) that allows you to run a local HTTP server for testing Workers and D1\. Run [migrations](https://developers.cloudflare.com/d1/reference/migrations/) against a local database by setting a `preview_database_id` in your Wrangler configuration.

Given the below Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-7868)
* [  wrangler.toml ](#tab-panel-7869)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "DB", // i.e. if you set this to "DB", it will be available in your Worker at `env.DB`

      "database_name": "your-database", // the name of your D1 database, set when created

      "database_id": "<UUID>", // The unique ID of your D1 database, returned when you create your database or run `

      "preview_database_id": "local-test-db" // A user-defined ID for your local test database.

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "your-database"

database_id = "<UUID>"

preview_database_id = "local-test-db"


```

Migrations can be run locally as part of your CI/CD setup by passing the `--local` flag to `wrangler`:

Terminal window

```

wrangler d1 migrations apply your-database --local


```

### Usage example

The following example shows how to use Wrangler's `unstable_dev()` API to:

* Run migrations against your local test database, as defined by `preview_database_id`.
* Make a request to an endpoint defined in your Worker. This example uses `/api/users/?limit=2`.
* Validate the returned results match, including the `Response.status` and the JSON our API returns.

TypeScript

```

import { unstable_dev } from "wrangler";

import type { UnstableDevWorker } from "wrangler";


describe("Test D1 Worker endpoint", () => {

  let worker: UnstableDevWorker;


  beforeAll(async () => {

    // Optional: Run any migrations to set up your `--local` database

    // By default, this will default to the preview_database_id

    execSync(`NO_D1_WARNING=true wrangler d1 migrations apply db --local`);


    worker = await unstable_dev("src/index.ts", {

      experimental: { disableExperimentalWarning: true },

    });

  });


  afterAll(async () => {

    await worker.stop();

  });


  it("should return an array of users", async () => {

    // Our expected results

    const expectedResults = `{"results": [{"user_id": 1234, "email": "foo@example.com"},{"user_id": 6789, "email": "bar@example.com"}]}`;

    // Pass an optional URL to fetch to trigger any routing within your Worker

    const resp = await worker.fetch("/api/users/?limit=2");

    if (resp) {

      // https://jestjs.io/docs/expect#tobevalue

      expect(resp.status).toBe(200);

      const data = await resp.json();

      // https://jestjs.io/docs/expect#tomatchobjectobject

      expect(data).toMatchObject(expectedResults);

    }

  });

});


```

Review the [unstable\_dev()](https://developers.cloudflare.com/workers/wrangler/api/#usage) documentation for more details on how to use the API within your tests.

## Related resources

* Use [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to run your Worker and D1 locally and debug issues before deploying.
* Learn [how to debug D1](https://developers.cloudflare.com/d1/observability/debug-d1/).
* Understand how to [access logs](https://developers.cloudflare.com/workers/observability/logs/) generated from your Worker and D1.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/best-practices/local-development/#page","headline":"Local development · Cloudflare D1 docs","description":"Run D1 locally with Wrangler to test your Worker and database before deploying to production.","url":"https://developers.cloudflare.com/d1/best-practices/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/best-practices/local-development/","name":"Local development"}}]}
```
