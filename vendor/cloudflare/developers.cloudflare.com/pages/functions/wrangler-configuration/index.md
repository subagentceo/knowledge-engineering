---
title: Configuration
description: Configure Pages Functions settings using a Wrangler configuration file or the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration

Warning

If your project contains an existing Wrangler file that you [previously used for local development](https://developers.cloudflare.com/pages/functions/local-development/), make sure you verify that it matches your project settings in the Cloudflare dashboard before opting-in to deploy your Pages project with the Wrangler configuration file. Instead of writing your Wrangler file by hand, Cloudflare recommends using [npx wrangler pages download config](#projects-without-existing-wrangler-file) to download your current project settings into a Wrangler file.

Note

As of Wrangler v3.91.0, Wrangler supports both JSON (`wrangler.json` or `wrangler.jsonc`) and TOML (`wrangler.toml`) for its configuration file. Prior to that version, only `wrangler.toml` was supported.

Pages Functions can be configured two ways, either via the [Cloudflare dashboard ↗](https://dash.cloudflare.com) or the Wrangler configuration file, a file used to customize the development and deployment setup for [Workers](https://developers.cloudflare.com/workers/) and Pages Functions.

This page serves as a reference on how to configure your Pages project via the Wrangler configuration file.

If using a Wrangler configuration file, you must treat your file as the [source of truth](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#source-of-truth) for your Pages project configuration.

Using the Wrangler configuration file to configure your Pages project allows you to:

* **Store your configuration file in source control:** Keep your configuration in your repository alongside the rest of your code.
* **Edit your configuration via your code editor:** Remove the need to switch back and forth between interfaces.
* **Write configuration that is shared across environments:** Define configuration like [bindings](https://developers.cloudflare.com/pages/functions/bindings/) for local development, preview and production in one file.
* **Ensure better access control:** By using a configuration file in your project repository, you can control who has access to make changes without giving access to your Cloudflare dashboard.

## Example Wrangler file

* [  wrangler.jsonc ](#tab-panel-9433)
* [  wrangler.toml ](#tab-panel-9434)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-app",

  "pages_build_output_dir": "./dist",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ],

  "d1_databases": [

    {

      "binding": "DB",

      "database_name": "northwind-demo",

      "database_id": "<DATABASE_ID>"

    }

  ],

  "vars": {

    "API_KEY": "1234567asdf"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-app"

pages_build_output_dir = "./dist"


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


[[d1_databases]]

binding = "DB"

database_name = "northwind-demo"

database_id = "<DATABASE_ID>"


[vars]

API_KEY = "1234567asdf"


```

## Requirements

### V2 build system

Pages Functions configuration via the Wrangler configuration file requires the [V2 build system](https://developers.cloudflare.com/pages/configuration/build-image/#v2-build-system) or later. To update from V1, refer to the [V2 build system migration instructions](https://developers.cloudflare.com/pages/configuration/build-image/#v1-to-v2-migration).

### Wrangler

You must have Wrangler version 3.45.0 or higher to use a Wrangler configuration file for your Pages project's configuration. To check your Wrangler version, update Wrangler or install Wrangler, refer to [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Migrate from dashboard configuration

The migration instructions for Pages projects that do not have a Wrangler file currently are different than those for Pages projects with an existing Wrangler file. Read the instructions based on your situation carefully to avoid errors in production.

### Projects with existing Wrangler file

Before you could use the Wrangler configuration file to define your preview and production configuration, it was possible to use the file to define which [bindings](https://developers.cloudflare.com/pages/functions/bindings/) should be available to your Pages project in local development.

If you have been using a Wrangler configuration file for local development, you may already have a file in your Pages project that looks like this:

* [  wrangler.jsonc ](#tab-panel-9429)
* [  wrangler.toml ](#tab-panel-9430)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ]

}


```

TOML

```

[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


```

If you would like to use your existing Wrangler file for your Pages project configuration, you must:

1. Add the `pages_build_output_dir` key with the appropriate value of your [build output directory](https://developers.cloudflare.com/pages/configuration/build-configuration/#build-commands-and-directories) (for example, `pages_build_output_dir = "./dist"`.)
2. Review your existing Wrangler configuration carefully to make sure it aligns with your desired project configuration before deploying.

If you add the `pages_build_output_dir` key to your Wrangler configuration file and deploy your Pages project, Pages will use whatever configuration was defined for local use, which is very likely to be non-production. Do not deploy until you are confident that your Wrangler configuration file is ready for production use.

Overwriting configuration

Running [wrangler pages download config](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#projects-without-existing-wranglertoml-file) will overwrite your existing Wrangler file with a generated Wrangler file based on your Cloudflare dashboard configuration. Run this command only if you want to discard your previous Wrangler file that you used for local development and start over with configuration pulled from the Cloudflare dashboard.

You can continue to use your Wrangler file for local development without migrating it for production use by not adding a `pages_build_output_dir` key. If you do not add a `pages_build_output_dir` key and run `wrangler pages deploy`, you will see a warning message telling you that fields are missing and that the file will continue to be used for local development only.

### Projects without existing Wrangler file

If you have an existing Pages project with configuration set up via the Cloudflare dashboard and do not have an existing Wrangler file in your Project, run the `wrangler pages download config` command in your Pages project directory. The `wrangler pages download config` command will download your existing Cloudflare dashboard configuration and generate a valid Wrangler file in your Pages project directory.

* [ npm ](#tab-panel-9426)
* [ yarn ](#tab-panel-9427)
* [ pnpm ](#tab-panel-9428)

Terminal window

```

npx wrangler pages download config <PROJECT_NAME>


```

Terminal window

```

yarn wrangler pages download config <PROJECT_NAME>


```

Terminal window

```

pnpm wrangler pages download config <PROJECT_NAME>


```

Review your generated Wrangler file. To start using the Wrangler configuration file for your Pages project's configuration, create a new deployment, via [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) or [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

### Handling compatibility dates set to "Latest"

In the Cloudflare dashboard, you can set compatibility dates for preview deployments to "Latest". This will ensure your project is always using the latest compatibility date without the need to explicitly set it yourself.

If you download a Wrangler configuration file from a project configured with "Latest" using the `wrangler pages download` command, your Wrangler configuration file will have the latest compatibility date available at the time you downloaded the configuration file. Wrangler does not support the "Latest" functionality like the dashboard. Compatibility dates must be explicitly set when using a Wrangler configuration file.

Refer to [this guide](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) for more information on what compatibility dates are and how they work.

## Differences using a Wrangler configuration file for Pages Functions and Workers

If you have used [Workers](https://developers.cloudflare.com/workers), you may already be familiar with the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). There are a few key differences to be aware of when using this file with your Pages Functions project:

* The configuration fields **do not match exactly** between Pages Functions Wrangler file and the Workers equivalent. For example, configuration keys like `main`, which are Workers specific, do not apply to a Pages Function's Wrangler configuration file. Some functionality supported by Workers, such as [module aliasing](https://developers.cloudflare.com/workers/wrangler/configuration/#module-aliasing) cannot yet be used by Cloudflare Pages projects.
* The Pages' Wrangler configuration file introduces a new key, `pages_build_output_dir`, which is only used for Pages projects.
* The concept of [environments](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#configure-environments) and configuration inheritance in this file **is not** the same as Workers.
* This file becomes the [source of truth](https://developers.cloudflare.com/pages/functions/wrangler-configuration/#source-of-truth) when used, meaning that you **can not edit the same fields in the dashboard** once you are using this file.

## Configure environments

With a Wrangler configuration file, you can quickly set configuration across your local environment, preview deployments, and production.

### Local development

The Wrangler configuration file applies locally when using `wrangler pages dev`. This means that you can test out configuration changes quickly without a need to login to the Cloudflare dashboard. Refer to the following config file for an example:

* [  wrangler.jsonc ](#tab-panel-9431)
* [  wrangler.toml ](#tab-panel-9432)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-app",

  "pages_build_output_dir": "./dist",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-app"

pages_build_output_dir = "./dist"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


```

This Wrangler configuration file adds the `nodejs_compat` compatibility flag and a KV namespace binding to your Pages project. Running `wrangler pages dev` in a Pages project directory with this Wrangler configuration file will apply the `nodejs_compat` compatibility flag locally, and expose the `KV` binding in your Pages Function code at `context.env.KV`.

Note

For a full list of configuration keys, refer to [inheritable keys](#inheritable-keys) and [non-inheritable keys](#non-inheritable-keys).

### Production and preview deployments

Once you are ready to deploy your project, you can set the configuration for production and preview deployments by creating a new deployment containing a Wrangler file.

Note

For the following commands, if you are using git it is important to remember the branch that you set as your [production branch](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#production-branch-control) as well as your [preview branch settings](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#preview-branch-control).

To use the example above as your configuration for production, make a new production deployment using:

Terminal window

```

npx wrangler pages deploy


```

or more specifically:

Terminal window

```

npx wrangler pages deploy --branch <PRODUCTION BRANCH>


```

To deploy the configuration for preview deployments, you can run the same command as above while on a branch you have configured to work with [preview deployments](https://developers.cloudflare.com/pages/configuration/branch-build-controls/#preview-branch-control). This will set the configuration for all preview deployments, not just the deployments from a specific branch. Pages does not currently support branch-based configuration.

Note

The `--branch` flag is optional with `wrangler pages deploy`. If you use git integration, Wrangler will infer the branch you are on from the repository you are currently in and implicitly add it to the command.

### Environment-specific overrides

There are times that you might want to use different configuration across local, preview deployments, and production. It is possible to override configuration for production and preview deployments by using `[env.production]` or `[env.preview]`.

Note

Unlike [Workers Environments](https://developers.cloudflare.com/workers/wrangler/configuration/#environments), `production` and `preview` are the only two options available via `[env.<ENVIRONMENT>]`.

Refer to the following Wrangler configuration file for an example of how to override preview deployment configuration:

* [  wrangler.jsonc ](#tab-panel-9435)
* [  wrangler.toml ](#tab-panel-9436)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-site",

  "pages_build_output_dir": "./dist",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ],

  "vars": {

    "API_KEY": "1234567asdf"

  },

  "env": {

    "preview": {

      "kv_namespaces": [

        {

          "binding": "KV",

          "id": "<PREVIEW_NAMESPACE_ID>"

        }

      ],

      "vars": {

        "API_KEY": "8901234bfgd"

      }

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-site"

pages_build_output_dir = "./dist"


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


[vars]

API_KEY = "1234567asdf"


[[env.preview.kv_namespaces]]

binding = "KV"

id = "<PREVIEW_NAMESPACE_ID>"


[env.preview.vars]

API_KEY = "8901234bfgd"


```

If you deployed this file via `wrangler pages deploy`, `name`, `pages_build_output_dir`, `kv_namespaces`, and `vars` would apply the configuration to local and production, while `env.preview` would override `kv_namespaces` and `vars` for preview deployments.

If you wanted to have configuration values apply to local and preview, but override production, your file would look like this:

* [  wrangler.jsonc ](#tab-panel-9439)
* [  wrangler.toml ](#tab-panel-9440)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-site",

  "pages_build_output_dir": "./dist",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ],

  "vars": {

    "API_KEY": "1234567asdf"

  },

  "env": {

    "production": {

      "kv_namespaces": [

        {

          "binding": "KV",

          "id": "<PRODUCTION_NAMESPACE_ID>"

        }

      ],

      "vars": {

        "API_KEY": "8901234bfgd"

      }

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-site"

pages_build_output_dir = "./dist"


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


[vars]

API_KEY = "1234567asdf"


[[env.production.kv_namespaces]]

binding = "KV"

id = "<PRODUCTION_NAMESPACE_ID>"


[env.production.vars]

API_KEY = "8901234bfgd"


```

You can always be explicit and override both preview and production:

* [  wrangler.jsonc ](#tab-panel-9441)
* [  wrangler.toml ](#tab-panel-9442)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-site",

  "pages_build_output_dir": "./dist",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ],

  "vars": {

    "API_KEY": "1234567asdf"

  },

  "env": {

    "preview": {

      "kv_namespaces": [

        {

          "binding": "KV",

          "id": "<PREVIEW_NAMESPACE_ID>"

        }

      ],

      "vars": {

        "API_KEY": "8901234bfgd"

      }

    },

    "production": {

      "kv_namespaces": [

        {

          "binding": "KV",

          "id": "<PRODUCTION_NAMESPACE_ID>"

        }

      ],

      "vars": {

        "API_KEY": "6567875fvgt"

      }

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-site"

pages_build_output_dir = "./dist"


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


[vars]

API_KEY = "1234567asdf"


[[env.preview.kv_namespaces]]

binding = "KV"

id = "<PREVIEW_NAMESPACE_ID>"


[env.preview.vars]

API_KEY = "8901234bfgd"


[[env.production.kv_namespaces]]

binding = "KV"

id = "<PRODUCTION_NAMESPACE_ID>"


[env.production.vars]

API_KEY = "6567875fvgt"


```

## Inheritable keys

Inheritable keys are configurable at the top-level, and can be inherited (or overridden) by environment-specific configuration.

* `name` ` string ` required  
   * The name of your Pages project. Alphanumeric and dashes only.
* `pages_build_output_dir` ` string ` required  
   * The path to your project's build output folder. For example: `./dist`.
* `compatibility_date` ` string ` required  
   * A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers runtime is used. Refer to [Compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
* `compatibility_flags` string\[\] optional  
   * A list of flags that enable features from upcoming features of the Workers runtime, usually used together with `compatibility_date`. Refer to [compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
* `send_metrics` ` boolean ` optional  
   * Whether Wrangler should send usage data to Cloudflare for this project. Defaults to `true`. You can learn more about this in our [data policy ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md).
* `limits` Limits optional  
   * Configures limits to be imposed on execution at runtime. Refer to [Limits](#limits).
* `placement` Placement optional  
   * Specify how Pages Functions should be located to minimize round-trip time. Refer to [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/).
* `upload_source_maps` boolean  
   * When `upload_source_maps` is set to `true`, Wrangler will upload any server-side source maps part of your Pages project to give corrected stack traces in logs.

## Non-inheritable keys

Non-inheritable keys are configurable at the top-level, but, if any one non-inheritable key is overridden for any environment (for example,`[[env.production.kv_namespaces]]`), all non-inheritable keys must also be specified in the environment configuration and overridden.

For example, this configuration will not work:

* [  wrangler.jsonc ](#tab-panel-9437)
* [  wrangler.toml ](#tab-panel-9438)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-pages-site",

  "pages_build_output_dir": "./dist",

  "kv_namespaces": [

    {

      "binding": "KV",

      "id": "<NAMESPACE_ID>"

    }

  ],

  "vars": {

    "API_KEY": "1234567asdf"

  },

  "env": {

    "production": {

      "vars": {

        "API_KEY": "8901234bfgd"

      }

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-pages-site"

pages_build_output_dir = "./dist"


[[kv_namespaces]]

binding = "KV"

id = "<NAMESPACE_ID>"


[vars]

API_KEY = "1234567asdf"


[env.production.vars]

API_KEY = "8901234bfgd"


```

`[[env.production.vars]]` is set to override `[vars]`. Because of this `[[kv_namespaces]]` must also be overridden by defining `[[env.production.kv_namespaces]]`.

This will work for local development, but will fail to validate when you try to deploy.

* `vars` ` object ` optional  
   * A map of environment variables to set when deploying your Function. Refer to [Environment variables](https://developers.cloudflare.com/pages/functions/bindings/#environment-variables).
* `d1_databases` ` object ` optional  
   * A list of D1 databases that your Function should be bound to. Refer to [D1 databases](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases).
* `durable_objects` ` object ` optional  
   * A list of Durable Objects that your Function should be bound to. Refer to [Durable Objects](https://developers.cloudflare.com/pages/functions/bindings/#durable-objects).
* `hyperdrive` ` object ` optional  
   * Specifies Hyperdrive configs that your Function should be bound to. Refer to [Hyperdrive](https://developers.cloudflare.com/pages/functions/bindings/#r2-buckets).
* `kv_namespaces` ` object ` optional  
   * A list of KV namespaces that your Function should be bound to. Refer to [KV namespaces](https://developers.cloudflare.com/pages/functions/bindings/#kv-namespaces).
* `queues.producers` ` object ` optional  
   * Specifies Queues Producers that are bound to this Function. Refer to [Queues Producers](https://developers.cloudflare.com/queues/get-started/#4-set-up-your-producer-worker).
* `r2_buckets` ` object ` optional  
   * A list of R2 buckets that your Function should be bound to. Refer to [R2 buckets](https://developers.cloudflare.com/pages/functions/bindings/#r2-buckets).
* `vectorize` ` object ` optional  
   * A list of Vectorize indexes that your Function should be bound to. Refer to [Vectorize indexes](https://developers.cloudflare.com/vectorize/get-started/intro/#3-bind-your-worker-to-your-index).
* `services` ` object ` optional  
   * A list of service bindings that your Function should be bound to. Refer to [service bindings](https://developers.cloudflare.com/pages/functions/bindings/#service-bindings).
* `analytics_engine_datasets` ` object ` optional  
   * Specifies analytics engine datasets that are bound to this Function. Refer to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/get-started/).
* `ai` ` object ` optional  
   * Specifies an AI binding to this Function. Refer to [Workers AI](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai).

## Limits

You can configure limits for your Pages project in the same way you can for Workers. Read [this guide](https://developers.cloudflare.com/workers/wrangler/configuration/#limits) for more details.

## Bindings

A [binding](https://developers.cloudflare.com/pages/functions/bindings/) enables your Pages Functions to interact with resources on the Cloudflare Developer Platform. Use bindings to integrate your Pages Functions with Cloudflare resources like [KV](https://developers.cloudflare.com/kv/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), and [D1](https://developers.cloudflare.com/d1/). You can set bindings for both production and preview environments.

### D1 databases

[D1](https://developers.cloudflare.com/d1/) is Cloudflare's serverless SQL database. A Function can query a D1 database (or databases) by creating a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to each database for [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/).

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production database. Refer to [Local development](https://developers.cloudflare.com/workers/development-testing/) for more details.

* Configure D1 database bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#d1-databases) the same way they are configured with Cloudflare Workers.
* Interact with your [D1 Database binding](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases).

### Durable Objects

[Durable Objects](https://developers.cloudflare.com/durable-objects/) provide low-latency coordination and consistent storage for the Workers platform.

* Configure Durable Object namespace bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects) the same way they are configured with Cloudflare Workers.

Warning

You must create a Durable Object Worker and bind it to your Pages project using the Cloudflare dashboard or your Pages project's [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/). You cannot create and deploy a Durable Object within a Pages project.

 Durable Object bindings configured in a Pages project's Wrangler configuration file require the `script_name` key. For Workers, the `script_name` key is optional.

* Interact with your [Durable Object namespace binding](https://developers.cloudflare.com/pages/functions/bindings/#durable-objects).

### Environment variables

[Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) are a type of binding that allow you to attach text strings or JSON values to your Pages Function.

* Configure environment variables via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables) the same way they are configured with Cloudflare Workers.
* Interact with your [environment variables](https://developers.cloudflare.com/pages/functions/bindings/#environment-variables).

### Hyperdrive

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Pages Function.

* Configure Hyperdrive bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#hyperdrive) the same way they are configured with Cloudflare Workers.

### KV namespaces

[Workers KV](https://developers.cloudflare.com/kv/api/) is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare’s data centers after access.

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production namespace. Refer to [Local development](https://developers.cloudflare.com/workers/development-testing/) for more details.

* Configure KV namespace bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#kv-namespaces) the same way they are configured with Cloudflare Workers.
* Interact with your [KV namespace binding](https://developers.cloudflare.com/pages/functions/bindings/#kv-namespaces).

### Queues Producers

[Queues](https://developers.cloudflare.com/queues/) is Cloudflare's global message queueing service, providing [guaranteed delivery](https://developers.cloudflare.com/queues/reference/delivery-guarantees/) and [message batching](https://developers.cloudflare.com/queues/configuration/batching-retries/). [Queue Producers](https://developers.cloudflare.com/queues/configuration/javascript-apis/#producer) enable you to send messages into a queue within your Pages Function.

Note

You cannot currently configure a [queues consumer](https://developers.cloudflare.com/queues/reference/how-queues-works/#consumers) with Pages Functions.

* Configure Queues Producer bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#queues) the same way they are configured with Cloudflare Workers.
* Interact with your [Queues Producer binding](https://developers.cloudflare.com/pages/functions/bindings/#queue-producers).

### R2 buckets

[Cloudflare R2 Storage](https://developers.cloudflare.com/r2) allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production bucket. Refer to [Local development](https://developers.cloudflare.com/workers/development-testing/) for more details.

* Configure R2 bucket bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#r2-buckets) the same way they are configured with Cloudflare Workers.
* Interact with your [R2 bucket bindings](https://developers.cloudflare.com/pages/functions/bindings/#r2-buckets).

### Vectorize indexes

A [Vectorize index](https://developers.cloudflare.com/vectorize/) allows you to insert and query vector embeddings for semantic search, classification and other vector search use-cases.

* Configure Vectorize bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes) the same way they are configured with Cloudflare Workers.

### Service bindings

A service binding allows you to call a Worker from within your Pages Function. Binding a Pages Function to a Worker allows you to send HTTP requests to the Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. Refer to [About Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

* Configure service bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#service-bindings) the same way they are configured with Cloudflare Workers.
* Interact with your [service bindings](https://developers.cloudflare.com/pages/functions/bindings/#service-bindings).

### Analytics Engine Datasets

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) provides analytics, observability and data logging from Pages Functions. Write data points within your Pages Function binding then query the data using the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/).

* Configure Analytics Engine Dataset bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#analytics-engine-datasets) the same way they are configured with Cloudflare Workers.
* Interact with your [Analytics Engine Dataset](https://developers.cloudflare.com/pages/functions/bindings/#analytics-engine).

### Workers AI

[Workers AI](https://developers.cloudflare.com/workers-ai/) allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via REST API.

Workers AI local development usage charges

Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

Unlike other bindings, this binding is limited to one AI binding per Pages Function project.

* Configure Workers AI bindings via your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/#workers-ai) the same way they are configured with Cloudflare Workers.
* Interact with your [Workers AI binding](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai).

## Local development settings

The local development settings that you can configure are the same for Pages Functions and Cloudflare Workers. Read [this guide](https://developers.cloudflare.com/workers/wrangler/configuration/#local-development-settings) for more details.

## Source of truth

When used in your Pages Functions projects, your Wrangler file is the source of truth. You will be able to see, but not edit, the same fields when you log into the Cloudflare dashboard.

If you decide that you do not want to use a Wrangler configuration file for configuration, you can safely delete it and create a new deployment. Configuration values from your last deployment will still apply and you will be able to edit them from the dashboard.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/wrangler-configuration/#page","headline":"Configuration · Cloudflare Pages docs","description":"Configure Pages Functions settings using a Wrangler configuration file or the Cloudflare dashboard.","url":"https://developers.cloudflare.com/pages/functions/wrangler-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/wrangler-configuration/","name":"Configuration"}}]}
```
