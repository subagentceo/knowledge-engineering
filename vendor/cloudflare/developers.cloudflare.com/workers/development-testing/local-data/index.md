---
title: Adding local data
description: Populating local resources with data
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Adding local data

Whether you are using Wrangler or the [Cloudflare Vite plugin ↗](https://developers.cloudflare.com/workers/vite-plugin/), your workflow for **accessing** data during local development remains the same. However, you can only [populate local resources with data](https://developers.cloudflare.com/workers/development-testing/local-data/#populating-local-resources-with-data) via the Wrangler CLI.

### How it works

When you run either `wrangler dev` or [vite ↗](https://vite.dev/guide/cli#dev-server), [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/) automatically creates **local versions** of your resources (like [KV](https://developers.cloudflare.com/kv), [D1](https://developers.cloudflare.com/d1/), or [R2](https://developers.cloudflare.com/r2)). This means you **don’t** need to manually set up separate local instances for each service. However, newly created local resources **won’t** contain any data — you'll need to use Wrangler commands with the `--local` flag to populate them. Changes made to local resources won’t affect production data.

## Populating local resources with data

When you first start developing, your local resources will be empty. You'll need to populate them with data using the Wrangler CLI.

### KV namespaces

Syntax note

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more in the [Wrangler commands for KV page](https://developers.cloudflare.com/kv/reference/kv-commands/).

#### [Add a single key-value pair](https://developers.cloudflare.com/workers/wrangler/commands/kv/#kv-key)

 npm  yarn  pnpm 

```
npx wrangler kv key put <KEY> <VALUE> --binding=<BINDING> --local 
```

```
yarn wrangler kv key put <KEY> <VALUE> --binding=<BINDING> --local 
```

```
pnpm wrangler kv key put <KEY> <VALUE> --binding=<BINDING> --local 
```

#### [Bulk upload](https://developers.cloudflare.com/workers/wrangler/commands/kv/#kv-bulk)

 npm  yarn  pnpm 

```
npx wrangler kv bulk put <FILENAME.json> --binding=<BINDING> --local
```

```
yarn wrangler kv bulk put <FILENAME.json> --binding=<BINDING> --local
```

```
pnpm wrangler kv bulk put <FILENAME.json> --binding=<BINDING> --local
```

### R2 buckets

#### [Upload a file](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object)

 npm  yarn  pnpm 

```
npx wrangler r2 object put <BUCKET>/<KEY> --file=<PATH_TO_FILE> --local
```

```
yarn wrangler r2 object put <BUCKET>/<KEY> --file=<PATH_TO_FILE> --local
```

```
pnpm wrangler r2 object put <BUCKET>/<KEY> --file=<PATH_TO_FILE> --local
```

You may also include [other metadata](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-object-put).

### D1 databases

#### [Execute a SQL statement](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-execute)

 npm  yarn  pnpm 

```
npx wrangler d1 execute <DATABASE_NAME> --command="<SQL_QUERY>" --local
```

```
yarn wrangler d1 execute <DATABASE_NAME> --command="<SQL_QUERY>" --local
```

```
pnpm wrangler d1 execute <DATABASE_NAME> --command="<SQL_QUERY>" --local
```

#### [Execute a SQL file](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-execute)

 npm  yarn  pnpm 

```
npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql --local
```

```
yarn wrangler d1 execute <DATABASE_NAME> --file=./schema.sql --local
```

```
pnpm wrangler d1 execute <DATABASE_NAME> --file=./schema.sql --local
```

### Durable Objects

For Durable Objects, unlike KV, D1, and R2, there are no CLI commands to populate them with local data. To add data to Durable Objects during local development, you must write application code that creates Durable Object instances and [calls methods on them that store state](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/). This typically involves creating development endpoints or test routes that initialize your Durable Objects with the desired data.

## Where local data gets stored

By default, both Wrangler and the Vite plugin store local binding data in the same location: the `.wrangler/state` folder in your project directory. This folder stores data in subdirectories for all local bindings: KV namespaces, R2 buckets, D1 databases, Durable Objects, etc.

### Clearing local storage

You can delete the `.wrangler/state` folder at any time to reset your local environment, and Miniflare will recreate it the next time you run your `dev` command. You can also delete specific sub-folders within `.wrangler/state` for more targeted clean-up.

### Changing the local data directory

If you prefer to specify a different directory for local storage, you can do so through the Wrangler CLI or in the Vite plugin's configuration.

#### Using Wrangler

Use the [\--persist-to](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) flag with `wrangler dev`. You need to specify this flag every time you run the `dev` command:

 npm  yarn  pnpm 

```
npx wrangler dev --persist-to <DIRECTORY>
```

```
yarn wrangler dev --persist-to <DIRECTORY>
```

```
pnpm wrangler dev --persist-to <DIRECTORY>
```

Note

The local persistence folder (like `.wrangler/state` or any custom folder you set) should be added to your `.gitignore` to avoid committing local development data to version control.

Using `--local` with `--persist-to`

If you run `wrangler dev --persist-to <DIRECTORY>` to specify a custom location for local data, you must also include the same `--persist-to <DIRECTORY>` when running other Wrangler commands that modify local data (and be sure to include the `--local` flag).

For example, to create a KV key named `test` with a value of `12345` in a local KV namespace, run:

 npm  yarn  pnpm 

```
npx wrangler kv key put test 12345 --binding MY_KV_NAMESPACE --local --persist-to worker-local
```

```
yarn wrangler kv key put test 12345 --binding MY_KV_NAMESPACE --local --persist-to worker-local
```

```
pnpm wrangler kv key put test 12345 --binding MY_KV_NAMESPACE --local --persist-to worker-local
```

This command:

* Sets the KV key `test` to `12345` in the binding `MY_KV_NAMESPACE` (defined in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)).
* Uses `--persist-to worker-local` to ensure the data is created in the **worker-local** directory instead of the default `.wrangler/state`.
* Adds the `--local` flag, indicating you want to modify local data.

If `--persist-to` is not specified, Wrangler defaults to using `.wrangler/state` for local data.

#### Using the Cloudflare Vite plugin

To customize where the Vite plugin stores local data, configure the [persistState option](https://developers.cloudflare.com/workers/vite-plugin/reference/api/#interface-pluginconfig) in your Vite config file:

vite.config.js

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [

    cloudflare({

      persistState: { path: "./my-custom-directory" },

    }),

  ],

});


```

#### Sharing state between tools

If you want Wrangler and the Vite plugin to share the same state, configure them to use the same persistence path.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/development-testing/local-data/#page","headline":"Adding local data · Cloudflare Workers docs","description":"Populating local resources with data","url":"https://developers.cloudflare.com/workers/development-testing/local-data/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/local-data/","name":"Adding local data"}}]}
```
