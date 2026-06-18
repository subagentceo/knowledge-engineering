---
title: Configuration
description: Use a configuration file to customize the development and deployment setup for your Worker project and other Developer Platform products.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration

Wrangler optionally uses a configuration file to customize the development and deployment setup for a Worker.

Note

As of Wrangler v3.91.0 Wrangler supports both JSON (`wrangler.json` or `wrangler.jsonc`) and TOML (`wrangler.toml`) for its configuration file. Prior to that version, only `wrangler.toml` was supported.

Cloudflare recommends using `wrangler.jsonc` for new projects, and some newer Wrangler features will only be available to projects using a JSON config file.

The format of Wrangler's configuration file is exactly the same across both languages, only the syntax differs.

You can use one of the many available online converters to easily switch between the two.

Throughout this page and the rest of Cloudflare's documentation, configuration snippets are provided as both JSON and TOML.

It is best practice to treat Wrangler's configuration file as the [source of truth](#source-of-truth) for configuring a Worker.

## Sample Wrangler configuration

* [  wrangler.jsonc ](#tab-panel-12859)
* [  wrangler.toml ](#tab-panel-12860)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Top-level configuration

  "name": "my-worker",

  "main": "src/index.js",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "workers_dev": false,

  "route": {

    "pattern": "example.org/*",

    "zone_name": "example.org",

  },

  "kv_namespaces": [

    {

      "binding": "<MY_NAMESPACE>",

      "id": "<KV_ID>",

    },

  ],

  "env": {

    "staging": {

      "name": "my-worker-staging",

      "route": {

        "pattern": "staging.example.org/*",

        "zone_name": "example.org",

      },

      "kv_namespaces": [

        {

          "binding": "<MY_NAMESPACE>",

          "id": "<STAGING_KV_ID>",

        },

      ],

    },

  },

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

main = "src/index.js"

# Set this to today's date

compatibility_date = "2026-06-18"

workers_dev = false


[route]

pattern = "example.org/*"

zone_name = "example.org"


[[kv_namespaces]]

binding = "<MY_NAMESPACE>"

id = "<KV_ID>"


[env.staging]

name = "my-worker-staging"


  [env.staging.route]

  pattern = "staging.example.org/*"

  zone_name = "example.org"


  [[env.staging.kv_namespaces]]

  binding = "<MY_NAMESPACE>"

  id = "<STAGING_KV_ID>"


```

## Environments

You can define different configurations for a Worker using Wrangler [environments](https://developers.cloudflare.com/workers/wrangler/environments/). There is a default (top-level) environment and you can create named environments that provide environment-specific configuration.

These are defined under `[env.<name>]` keys, such as `[env.staging]` which you can then preview or deploy with the `-e` / `--env` flag in the `wrangler` commands like `npx wrangler deploy --env staging`.

The majority of keys are inheritable, meaning that top-level configuration can be used in environments. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), such as `vars` or `kv_namespaces`, are not inheritable and need to be defined explicitly.

Further, there are a few keys that can _only_ appear at the top-level.

Note

If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), you select the environment at dev or build time via the `CLOUDFLARE_ENV` environment variable rather than the `--env` flag. Otherwise, environments are defined in your Worker config file as usual. For more detail on using environments with the Cloudflare Vite plugin, refer to the [plugin documentation](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/).

## Automatic provisioning

[Beta](https://developers.cloudflare.com/changelog/2025-10-24-automatic-resource-provisioning/) 

Wrangler can automatically provision resources for you when you deploy your Worker without you having to create them ahead of time.

This currently works for KV, R2, and D1 bindings.

To use this feature, add bindings to your configuration file _without_ adding resource IDs, or in the case of R2, a bucket name. Resources will be created with the name of your worker as the prefix.

* [  wrangler.jsonc ](#tab-panel-12837)
* [  wrangler.toml ](#tab-panel-12838)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "<MY_KV_NAMESPACE>",

    },

  ],

}


```

TOML

```

[[kv_namespaces]]

binding = "<MY_KV_NAMESPACE>"


```

When you run `wrangler dev`, local resources will automatically be created which persist between runs. When you run `wrangler deploy`, resources will be created for you, and their IDs will be written back to your configuration file.

If you deploy a worker with resources and no resource IDs from the dashboard (for example, via GitHub), resources will be created, but their IDs will only be accessible via the dashboard. Currently, these resource IDs will not be written back to your repository.

## Top-level only keys

Top-level keys apply to the Worker as a whole (and therefore all environments). They cannot be defined within named environments.

* `keep_vars` ` boolean ` optional  
   * Whether Wrangler should keep variables configured in the dashboard on deploy. Refer to [source of truth](#source-of-truth).
* `migrations` ` object[] ` optional  
   * When making changes to your Durable Object classes, you must perform a migration. Refer to [Durable Object migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).
* `send_metrics` ` boolean ` optional  
   * Whether Wrangler should send usage data to Cloudflare for this project. Defaults to `true`. You can learn more about this in our [data policy ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md).
* `site` ` object ` optional deprecated  
   * See the [Workers Sites](#workers-sites) section below for more information. Cloudflare Pages and Workers Assets is preferred over this approach.  
   * This is not supported by the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Inheritable keys

Inheritable keys are configurable at the top-level, and can be inherited (or overridden) by environment-specific configuration.

Note

At a minimum, the `name`, `main` and `compatibility_date` keys are required to deploy a Worker.

The `main` key is optional for assets-only Workers.

* `name` ` string ` required  
   * The name of your Worker. Alphanumeric characters (`a`,`b`,`c`, etc.) and dashes (`-`) only. Do not use underscores (`_`). Worker names can be up to 255 characters. If you plan to use a [workers.dev subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/), the name must be 63 characters or less and cannot start or end with a dash.
* `main` ` string ` required  
   * The path to the entrypoint of your Worker that will be executed. For example: `./src/index.ts`.
* `compatibility_date` ` string ` required  
   * A date in the form `yyyy-mm-dd`, which will be used to determine which version of the Workers runtime is used. Refer to [Compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
* `account_id` ` string ` optional  
   * This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the zone/route you provide, if you provide one. It can also be specified through the `CLOUDFLARE_ACCOUNT_ID` environment variable.
* `compatibility_flags` ` string[] ` optional  
   * A list of flags that enable features from upcoming features of the Workers runtime, usually used together with `compatibility_date`. Refer to [compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
* `workers_dev` ` boolean ` optional  
   * Enables use of `*.workers.dev` subdomain to deploy your Worker. If you have a Worker that is only for `scheduled` events, you can set this to `false`. Defaults to `true`. Refer to [types of routes](#types-of-routes).
* `preview_urls` ` boolean ` optional  
   * Enables use of Preview URLs to test your Worker. Defaults to value of `workers_dev`. Refer to [Preview URLs](https://developers.cloudflare.com/workers/configuration/previews).
* `route` ` Route ` optional  
   * A route that your Worker should be deployed to. Only one of `routes` or `route` is required. Refer to [types of routes](#types-of-routes).
* `routes` ` Route[] ` optional  
   * An array of routes that your Worker should be deployed to. Only one of `routes` or `route` is required. Refer to [types of routes](#types-of-routes).
* `tsconfig` ` string ` optional  
   * Path to a custom `tsconfig`.  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `triggers` ` object ` optional  
   * Cron definitions to trigger a Worker's `scheduled` function. Refer to [triggers](#triggers).
* `rules` ` Rule ` optional  
   * An ordered list of rules that define which modules to import, and what type to import them as. You will need to specify rules to use `Text`, `Data` and `CompiledWasm` modules, or when you wish to have a `.js` file be treated as an `ESModule` instead of `CommonJS`.  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `build` ` Build ` optional  
   * Configures a custom build step to be run by Wrangler when building your Worker. Refer to [Custom builds](#custom-builds).  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `no_bundle` ` boolean ` optional  
   * Skip internal build steps and directly deploy your Worker script. You must have a plain JavaScript Worker with no dependencies.  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `find_additional_modules` ` boolean ` optional  
   * If true then Wrangler will traverse the file tree below `base_dir`. Any files that match `rules` will be included in the deployed Worker. Defaults to true if `no_bundle` is true, otherwise false. Can only be used with Module format Workers (not Service Worker format).  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `base_dir` ` string ` optional  
   * The directory in which module "rules" should be evaluated when including additional files (via `find_additional_modules`) into a Worker deployment. Defaults to the directory containing the `main` entry point of the Worker if not specified.  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `preserve_file_names` ` boolean ` optional  
   * Determines whether Wrangler will preserve the file names of additional modules bundled with the Worker. The default is to prepend filenames with a content hash. For example, `34de60b44167af5c5a709e62a4e20c4f18c9e3b6-favicon.ico`.  
   * Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).
* `minify` ` boolean ` optional  
   * Minify the Worker script before uploading.  
   * If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), `minify` is replaced by Vite's [build.minify ↗](https://vite.dev/config/build-options.html#build-minify).
* `keep_names` ` boolean ` optional  
   * Wrangler uses esbuild to process the Worker code for development and deployment. This option allows you to specify whether esbuild should apply its [keepNames ↗](https://esbuild.github.io/api/#keep-names) logic to the code or not. Defaults to `true`.
* `logpush` ` boolean ` optional  
   * Enables Workers Trace Events Logpush for a Worker. Any scripts with this property will automatically get picked up by the Workers Logpush job configured for your account. Defaults to `false`. Refer to [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/).
* `limits` ` Limits ` optional  
   * Configures limits to be imposed on execution at runtime. Refer to [Limits](#limits).
* `observability` ` object ` optional  
   * Configures automatic observability settings for telemetry data emitted from your Worker. Refer to [Observability](#observability).
* `assets` ` Assets ` optional  
   * Configures static assets that will be served. Refer to [Assets](https://developers.cloudflare.com/workers/static-assets/binding/) for more details.
* `migrations` ` object ` optional  
   * Maps a Durable Object from a class name to a runtime state. This communicates changes to the Durable Object (creation / deletion / rename / transfer) to the Workers runtime and provides the runtime with instructions on how to deal with those changes. Refer to [Durable Objects migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#migration-wrangler-configuration).
* `placement` ` object ` optional  
   * Configures where your Worker runs to minimize latency to back-end services. Refer to [Placement](https://developers.cloudflare.com/workers/configuration/placement/).  
   * `mode` ` string ` — Set to `"smart"` to automatically place your Worker near back-end services based on observed latency.  
   * `region` ` string ` — Specify a cloud region (for example, `"aws:us-east-1"`, `"gcp:europe-west1"`, or `"azure:westeurope"`) to place your Worker near infrastructure in that region.  
   * `host` ` string ` — Specify a hostname and port for a single-homed layer 4 service (for example, `"my_database_host.com:5432"`) to place your Worker near that service.  
   * `hostname` ` string ` — Specify a hostname for a single-homed layer 7 service (for example, `"my_api_server.com"`) to place your Worker near that service.

## Non-inheritable keys

Non-inheritable keys are configurable at the top-level, but cannot be inherited by environments and must be specified for each environment.

* `define` ` Record<string, string> ` optional  
   * A map of values to substitute when deploying your Worker.  
   * If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), `define` is replaced by Vite's [define ↗](https://vite.dev/config/shared-options.html#define).
* `vars` ` object ` optional  
   * A map of environment variables to set when deploying your Worker. Refer to [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/).
* `durable_objects` ` object ` optional  
   * A list of Durable Objects that your Worker should be bound to. Refer to [Durable Objects](#durable-objects).
* `kv_namespaces` ` object ` optional  
   * A list of KV namespaces that your Worker should be bound to. Refer to [KV namespaces](#kv-namespaces).
* `r2_buckets` ` object ` optional  
   * A list of R2 buckets that your Worker should be bound to. Refer to [R2 buckets](#r2-buckets).
* `ai_search_namespaces` ` object ` optional  
   * A list of AI Search namespaces that your Worker should be bound to. Refer to [AI Search namespaces](#ai-search-namespaces).
* `ai_search` ` object ` optional  
   * A list of AI Search instance bindings bound directly to pre-existing instances in the default namespace. Refer to [AI Search instances](#ai-search-instances).
* `vectorize` ` object ` optional  
   * A list of Vectorize indexes that your Worker should be bound to. Refer to [Vectorize indexes](#vectorize-indexes).
* `services` ` object ` optional  
   * A list of service bindings that your Worker should be bound to. Refer to [service bindings](#service-bindings).
* `queues` ` object ` optional  
   * A list of Queue producers and consumers that your Worker should be bound to. Refer to [Queues](#queues).
* `workflows` ` object ` optional  
   * A list of Workflows that your Worker should be bound to. Refer to [Workflows](#workflows).
* `tail_consumers` ` object ` optional  
   * A list of the Tail Workers your Worker sends data to. Refer to [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/).
* `secrets` ` object ` optional  
   * Declares the secret names your Worker requires. Used for validation during local development and deploy, and as the source of truth for type generation. Refer to [Secrets](#secrets).  
   * `required` ` string[] ` optional — A list of secret names that must be set to deploy your Worker.
* `secrets_store_secrets` ` object ` optional  
   * A list of Secrets Store bindings that your worker should be bound to. Refer to [Secrets Store](https://developers.cloudflare.com/secrets-store/).

## Types of routes

There are three types of [routes](https://developers.cloudflare.com/workers/configuration/routing/): [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), and [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).

### Custom Domains

[Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management.

* `pattern` ` string ` required  
   * The pattern that your Worker should be run on, for example, `"example.com"`.
* `custom_domain` ` boolean ` optional  
   * Whether the Worker should be on a Custom Domain as opposed to a route. Defaults to `false`.

Example:

* [  wrangler.jsonc ](#tab-panel-12839)
* [  wrangler.toml ](#tab-panel-12840)

JSONC

```

{

  "routes": [

    {

      "pattern": "shop.example.com",

      "custom_domain": true,

    },

  ],

}


```

TOML

```

[[routes]]

pattern = "shop.example.com"

custom_domain = true


```

### Routes

[Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) allow users to map a URL pattern to a Worker. A route can be configured as a zone ID route, a zone name route, or a simple route.

#### Zone ID route

* `pattern` ` string ` required  
   * The pattern that your Worker can be run on, for example,`"example.com/*"`.
* `zone_id` ` string ` required  
   * The ID of the zone that your `pattern` is associated with. Refer to [Find zone and account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

Example:

* [  wrangler.jsonc ](#tab-panel-12843)
* [  wrangler.toml ](#tab-panel-12844)

JSONC

```

{

  "routes": [

    {

      "pattern": "subdomain.example.com/*",

      "zone_id": "<YOUR_ZONE_ID>",

    },

  ],

}


```

TOML

```

[[routes]]

pattern = "subdomain.example.com/*"

zone_id = "<YOUR_ZONE_ID>"


```

#### Zone name route

* `pattern` ` string ` required  
   * The pattern that your Worker should be run on, for example, `"example.com/*"`.
* `zone_name` ` string ` required  
   * The name of the zone that your `pattern` is associated with. If you are using API tokens, this will require the `Account` scope.

Example:

* [  wrangler.jsonc ](#tab-panel-12847)
* [  wrangler.toml ](#tab-panel-12848)

JSONC

```

{

  "routes": [

    {

      "pattern": "subdomain.example.com/*",

      "zone_name": "example.com",

    },

  ],

}


```

TOML

```

[[routes]]

pattern = "subdomain.example.com/*"

zone_name = "example.com"


```

#### Simple route

This is a simple route that only requires a pattern.

Example:

* [  wrangler.jsonc ](#tab-panel-12841)
* [  wrangler.toml ](#tab-panel-12842)

JSONC

```

{

  "route": "example.com/*",

}


```

TOML

```

route = "example.com/*"


```

### `workers.dev`

Cloudflare Workers accounts come with a `workers.dev` subdomain that is configurable in the Cloudflare dashboard.

* `workers_dev` ` boolean ` optional  
   * Whether the Worker runs on a custom `workers.dev` account subdomain. Defaults to `true`.

* [  wrangler.jsonc ](#tab-panel-12845)
* [  wrangler.toml ](#tab-panel-12846)

JSONC

```

{

  "workers_dev": false,

}


```

TOML

```

workers_dev = false


```

## Triggers

Triggers allow you to define the `cron` expression to invoke your Worker's `scheduled` function. Refer to [Supported cron expressions](https://developers.cloudflare.com/workers/configuration/cron-triggers/#supported-cron-expressions).

* `crons` ` string[] ` required  
   * An array of `cron` expressions.  
   * To disable a Cron Trigger, set `crons = []`. Commenting out the `crons` key will not disable a Cron Trigger.

Example:

* [  wrangler.jsonc ](#tab-panel-12849)
* [  wrangler.toml ](#tab-panel-12850)

JSONC

```

{

  "triggers": {

    "crons": ["* * * * *"],

  },

}


```

TOML

```

[triggers]

crons = [ "* * * * *" ]


```

## Observability

The [Observability](https://developers.cloudflare.com/workers/observability/logs/workers-logs) setting allows you to automatically ingest, store, filter, and analyze logging data emitted from Cloudflare Workers directly from your Cloudflare Worker's dashboard.

* `enabled` ` boolean ` required  
   * When set to `true` on a Worker, logs for the Worker are persisted. Defaults to `true` for all new Workers.
* `head_sampling_rate` ` number ` optional  
   * A number between 0 and 1, where 0 indicates zero out of one hundred requests are logged, and 1 indicates every request is logged. If `head_sampling_rate` is unspecified, it is configured to a default value of 1 (100%). Read more about [head-based sampling](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#head-based-sampling).

Example:

* [  wrangler.jsonc ](#tab-panel-12851)
* [  wrangler.toml ](#tab-panel-12852)

JSONC

```

{

  "observability": {

    "enabled": true,

    "head_sampling_rate": 0.1, // 10% of requests are logged

  },

}


```

TOML

```

[observability]

enabled = true

head_sampling_rate = 0.1


```

## Custom builds

Note

Not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

You can configure a custom build step that will be run before your Worker is deployed. Refer to [Custom builds](https://developers.cloudflare.com/workers/wrangler/custom-builds/).

* `command` ` string ` optional  
   * The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.
* `cwd` ` string ` optional  
   * The directory in which the command is executed.
* `watch_dir` ` string | string[] ` optional  
   * The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

Example:

* [  wrangler.jsonc ](#tab-panel-12853)
* [  wrangler.toml ](#tab-panel-12854)

JSONC

```

{

  "build": {

    "command": "npm run build",

    "cwd": "build_cwd",

    "watch_dir": "build_watch_dir",

  },

}


```

TOML

```

[build]

command = "npm run build"

cwd = "build_cwd"

watch_dir = "build_watch_dir"


```

## Limits

You can impose limits on your Worker's behavior at runtime. Limits are only supported for the [Standard Usage Model](https://developers.cloudflare.com/workers/platform/pricing/#example-pricing-standard-usage-model). Limits are only enforced when deployed to Cloudflare's network, not in local development. The CPU limit can be set to a maximum of 300,000 milliseconds (5 minutes).

Each [isolate](https://developers.cloudflare.com/workers/reference/how-workers-works/#isolates) has some built-in flexibility to allow for cases where your Worker infrequently runs over the configured limit. If your Worker starts hitting the limit consistently, its execution will be terminated according to the limit configured.

  
* `cpu_ms` ` number ` optional  
   * The maximum CPU time allowed per invocation, in milliseconds.
* `subrequests` ` number ` optional  
   * The maximum number of subrequests allowed per invocation. This value defaults to 50 for free accounts and 10,000 for paid accounts. The free account maximum is 50 and the paid account maximum is 10,000,000\. Refer to [subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests) for more information.

Example:

* [  wrangler.jsonc ](#tab-panel-12855)
* [  wrangler.toml ](#tab-panel-12856)

JSONC

```

{

  "limits": {

    "cpu_ms": 100,

    "subrequests": 150,

  },

}


```

TOML

```

[limits]

cpu_ms = 100

subrequests = 150


```

## Bindings

### Browser Run

The [Workers Browser Run API](https://developers.cloudflare.com/browser-run/) allows developers to programmatically control and interact with a headless browser instance and create automation flows for their applications and products.

A [browser binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

* `binding` ` string ` required  
   * The binding name used to refer to the browser binding. The value (string) you set will be used to reference this headless browser in your Worker. The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "HEAD_LESS"` or `binding = "simulatedBrowser"` would both be valid names for the binding.

Example:

* [  wrangler.jsonc ](#tab-panel-12857)
* [  wrangler.toml ](#tab-panel-12858)

JSONC

```

{

  "browser": {

    "binding": "<BINDING_NAME>",

  },

}


```

TOML

```

[browser]

binding = "<BINDING_NAME>"


```

### D1 databases

[D1](https://developers.cloudflare.com/d1/) is Cloudflare's serverless SQL database. A Worker can query a D1 database (or databases) by creating a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to each database for [D1 Workers Binding API](https://developers.cloudflare.com/d1/worker-api/).

To bind D1 databases to your Worker, assign an array of the below object to the `[[d1_databases]]` key.

* `binding` ` string ` required  
   * The binding name used to refer to the D1 database. The value (string) you set will be used to reference this database in your Worker. The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.
* `database_name` ` string ` required  
   * The name of the database. This is a human-readable name that allows you to distinguish between different databases, and is set when you first create the database.
* `database_id` ` string ` required  
   * The ID of the database. The database ID is available when you first use `wrangler d1 create` or when you call `wrangler d1 list`, and uniquely identifies your database.
* `preview_database_id` ` string ` optional  
   * The preview ID of this D1 database. If provided, `wrangler dev` uses this ID. Otherwise, it uses `database_id`. This option is required when using `wrangler dev --remote`.
* `migrations_dir` ` string ` optional  
   * The migration directory containing the migration files. By default, `wrangler d1 migrations create` creates a folder named `migrations`. You can use `migrations_dir` to specify a different folder containing the migration files (for example, if you have a mono-repo setup, and want to use a single D1 instance across your apps/packages).  
   * For more information, refer to [D1 Wrangler migrations commands](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-migrations-create) and [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/).
* `migrations_pattern` ` string ` optional  
   * A glob pattern (relative to your Wrangler config file) used to discover migration files. Defaults to `migrations/*.sql`.  
   * Use this to opt in to nested layouts produced by ORMs like Drizzle (for example, `migrations/*/migration.sql`).  
   * When `migrations_pattern` is set, `migrations_dir` must also be set, and `migrations_pattern` must start with whatever `migrations_dir` is set to. Each migration is recorded in the migrations table as a path relative to `migrations_dir`.

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production database. Refer to [Local development and testing](https://developers.cloudflare.com/workers/development-testing/) for more details.

Example:

* [  wrangler.jsonc ](#tab-panel-12861)
* [  wrangler.toml ](#tab-panel-12862)

JSONC

```

{

  "d1_databases": [

    {

      "binding": "<BINDING_NAME>",

      "database_name": "<DATABASE_NAME>",

      "database_id": "<DATABASE_ID>",

    },

  ],

}


```

TOML

```

[[d1_databases]]

binding = "<BINDING_NAME>"

database_name = "<DATABASE_NAME>"

database_id = "<DATABASE_ID>"


```

### Dispatch namespace bindings (Workers for Platforms)

Dispatch namespace bindings allow for communication between a [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) and a [dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace). Dispatch namespace bindings are used in [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/). Workers for Platforms helps you deploy serverless functions programmatically on behalf of your customers.

* `binding` ` string ` required  
   * The binding name. The value (string) you set will be used to reference this database in your Worker. The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_NAMESPACE"` or `binding = "productionNamespace"` would both be valid names for the binding.
* `namespace` ` string ` required  
   * The name of the [dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace).
* `outbound` ` object ` optional  
   * `service` ` string ` required The name of the [outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) to bind to.  
   * `parameters` array optional A list of parameters to pass data from your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) to the [outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/).

* [  wrangler.jsonc ](#tab-panel-12863)
* [  wrangler.toml ](#tab-panel-12864)

JSONC

```

{

  "dispatch_namespaces": [

    {

      "binding": "<BINDING_NAME>",

      "namespace": "<NAMESPACE_NAME>",

      "outbound": {

        "service": "<WORKER_NAME>",

        "parameters": ["params_object"],

      },

    },

  ],

}


```

TOML

```

[[dispatch_namespaces]]

binding = "<BINDING_NAME>"

namespace = "<NAMESPACE_NAME>"


  [dispatch_namespaces.outbound]

  service = "<WORKER_NAME>"

  parameters = [ "params_object" ]


```

### Durable Objects

[Durable Objects](https://developers.cloudflare.com/durable-objects/) provide low-latency coordination and consistent storage for the Workers platform.

To bind Durable Objects to your Worker, assign an array of the below object to the `durable_objects.bindings` key.

* `name` ` string ` required  
   * The name of the binding used to refer to the Durable Object.
* `class_name` ` string ` required  
   * The exported class name of the Durable Object.
* `script_name` ` string ` optional  
   * The name of the Worker where the Durable Object is defined, if it is external to this Worker. This option can be used both in local and remote development. In local development, you must run the external Worker in a separate process (via `wrangler dev`). In remote development, the appropriate remote binding must be used.
* `environment` ` string ` optional  
   * The environment of the `script_name` to bind to.

Example:

* [  wrangler.jsonc ](#tab-panel-12865)
* [  wrangler.toml ](#tab-panel-12866)

JSONC

```

{

  "durable_objects": {

    "bindings": [

      {

        "name": "<BINDING_NAME>",

        "class_name": "<CLASS_NAME>",

      },

    ],

  },

}


```

TOML

```

[[durable_objects.bindings]]

name = "<BINDING_NAME>"

class_name = "<CLASS_NAME>"


```

#### Migrations

When making changes to your Durable Object classes, you must perform a migration. Refer to [Durable Object migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).

* `tag` ` string ` required  
   * A unique identifier for this migration.
* `new_sqlite_classes` ` string[] ` optional  
   * The new Durable Objects being defined.
* `renamed_classes` ` {from: string, to: string}[] ` optional  
   * The Durable Objects being renamed.
* `deleted_classes` ` string[] ` optional  
   * The Durable Objects being removed.

Example:

* [  wrangler.jsonc ](#tab-panel-12879)
* [  wrangler.toml ](#tab-panel-12880)

JSONC

```

{

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        // Array of new classes

        "DurableObjectExample",

      ],

    },

    {

      "tag": "v2", // Should be unique for each entry

      "renamed_classes": [

        // Array of rename directives

        {

          "from": "DurableObjectExample",

          "to": "UpdatedName",

        },

      ],

      "deleted_classes": [

        // Array of deleted class names

        "DeprecatedClass",

      ],

    },

  ],

}


```

TOML

```

[[migrations]]

tag = "v1"

new_sqlite_classes = [ "DurableObjectExample" ]


[[migrations]]

tag = "v2"

deleted_classes = [ "DeprecatedClass" ]


  [[migrations.renamed_classes]]

  from = "DurableObjectExample"

  to = "UpdatedName"


```

### Email bindings

You can send an email about your Worker's activity from your Worker to an email address verified on [Email Routing](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses). This is useful for when you want to know about certain types of events being triggered, for example.

Before you can bind an email address to your Worker, you need to [enable Email Routing](https://developers.cloudflare.com/email-service/get-started/) and have at least one [verified email address](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses). Then, assign an array to the object (send\_email) with the type of email binding you need.

* `name` ` string ` required  
   * The binding name.
* `destination_address` ` string ` optional  
   * The [chosen email address](https://developers.cloudflare.com/email-service/configuration/send-bindings/#binding-types) you send emails to.
* `allowed_destination_addresses` ` string[] ` optional  
   * The [allowlist of email addresses](https://developers.cloudflare.com/email-service/configuration/send-bindings/#binding-types) you send emails to.

You can add one or more types of bindings to your Wrangler file. However, each attribute must be on its own line:

* [  wrangler.jsonc ](#tab-panel-12927)
* [  wrangler.toml ](#tab-panel-12928)

JSONC

```

{

  "send_email": [

    {

      "name": "<NAME_FOR_BINDING1>"

    },

    {

      "name": "<NAME_FOR_BINDING2>",

      "destination_address": "<YOUR_EMAIL>@example.com"

    },

    {

      "name": "<NAME_FOR_BINDING3>",

      "allowed_destination_addresses": [

        "<YOUR_EMAIL>@example.com",

        "<YOUR_EMAIL2>@example.com"

      ]

    }

  ]

}


```

TOML

```

[[send_email]]

name = "<NAME_FOR_BINDING1>"


[[send_email]]

name = "<NAME_FOR_BINDING2>"

destination_address = "<YOUR_EMAIL>@example.com"


[[send_email]]

name = "<NAME_FOR_BINDING3>"

allowed_destination_addresses = [ "<YOUR_EMAIL>@example.com", "<YOUR_EMAIL2>@example.com" ]


```

### Environment variables

[Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) are a type of binding that allow you to attach text strings or JSON values to your Worker.

Example:

* [  wrangler.jsonc ](#tab-panel-12923)
* [  wrangler.toml ](#tab-panel-12924)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker-dev",

  "vars": {

    "API_HOST": "example.com",

    "API_ACCOUNT_ID": "example_user",

    "SERVICE_X_DATA": {

      "URL": "service-x-api.dev.example",

      "MY_ID": 123

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker-dev"


[vars]

API_HOST = "example.com"

API_ACCOUNT_ID = "example_user"


  [vars.SERVICE_X_DATA]

  URL = "service-x-api.dev.example"

  MY_ID = 123


```

### Hyperdrive

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Worker.

* `binding` ` string ` required  
   * The binding name.
* `id` ` string ` required  
   * The ID of the Hyperdrive configuration.

Example:

* [  wrangler.jsonc ](#tab-panel-12869)
* [  wrangler.toml ](#tab-panel-12870)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": ["nodejs_compat_v2"],

  "hyperdrive": [

    {

      "binding": "<BINDING_NAME>",

      "id": "<ID>",

    },

  ],

}


```

TOML

```

compatibility_flags = [ "nodejs_compat_v2" ]


[[hyperdrive]]

binding = "<BINDING_NAME>"

id = "<ID>"


```

### Images

[Cloudflare Images](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/) lets you make transformation requests to optimize, resize, and manipulate images stored in remote sources.

To bind Images to your Worker, assign an array of the below object to the `images` key.

`binding` (required). The name of the binding used to refer to the Images API.

* [  wrangler.jsonc ](#tab-panel-12867)
* [  wrangler.toml ](#tab-panel-12868)

JSONC

```

{

  "images": {

    "binding": "IMAGES", // i.e. available in your Worker on env.IMAGES

  },

}


```

TOML

```

[images]

binding = "IMAGES"


```

### KV namespaces

[Workers KV](https://developers.cloudflare.com/kv/api/) is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare’s data centers after access.

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

* `binding` ` string ` required  
   * The binding name used to refer to the KV namespace.
* `id` ` string ` required  
   * The ID of the KV namespace.
* `preview_id` ` string ` optional  
   * The preview ID of this KV namespace. This option is **required** when using `wrangler dev --remote` to develop against remote resources (but is not required with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings)). If developing locally, this is an optional field. `wrangler dev` will use this ID for the KV namespace. Otherwise, `wrangler dev` will use `id`.

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production namespace. Refer to [Local development and testing](https://developers.cloudflare.com/workers/development-testing/) for more details.

Example:

* [  wrangler.jsonc ](#tab-panel-12873)
* [  wrangler.toml ](#tab-panel-12874)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "<BINDING_NAME1>",

      "id": "<NAMESPACE_ID1>",

    },

    {

      "binding": "<BINDING_NAME2>",

      "id": "<NAMESPACE_ID2>",

    },

  ],

}


```

TOML

```

[[kv_namespaces]]

binding = "<BINDING_NAME1>"

id = "<NAMESPACE_ID1>"


[[kv_namespaces]]

binding = "<BINDING_NAME2>"

id = "<NAMESPACE_ID2>"


```

### AI Search namespaces

[AI Search](https://developers.cloudflare.com/ai-search/) is Cloudflare's managed search service. A [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) is a logical grouping of AI Search instances. The binding grants full access to all instances within the namespace.

To bind AI Search namespaces to your Worker, assign an array of the below object to the `ai_search_namespaces` key.

* `binding` ` string ` required  
   * The binding name used to refer to the AI Search namespace.
* `namespace` ` string ` required  
   * The name of the AI Search namespace. A `default` namespace is created automatically for every account. If the namespace does not exist, Wrangler creates it on deploy.

Example:

* [  wrangler.jsonc ](#tab-panel-12871)
* [  wrangler.toml ](#tab-panel-12872)

JSONC

```

{

  "ai_search_namespaces": [

    {

      "binding": "<BINDING_NAME>",

      "namespace": "default",

    },

  ],

}


```

TOML

```

[[ai_search_namespaces]]

binding = "<BINDING_NAME>"

namespace = "default"


```

### AI Search instances

To bind directly to a pre-existing [AI Search](https://developers.cloudflare.com/ai-search/) instance in the [default namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/#default-namespace), assign an array of the below object to the `ai_search` key. This binding does not support namespace-level operations like `list()`, `create()`, or `delete()`.

* `binding` ` string ` required  
   * The binding name used to refer to the AI Search instance.
* `instance_name` ` string ` required  
   * The name of the AI Search instance. Must exist in the default namespace at deploy time.

Example:

* [  wrangler.jsonc ](#tab-panel-12875)
* [  wrangler.toml ](#tab-panel-12876)

JSONC

```

{

  "ai_search": [

    {

      "binding": "<BINDING_NAME>",

      "instance_name": "<INSTANCE_NAME>",

    },

  ],

}


```

TOML

```

[[ai_search]]

binding = "<BINDING_NAME>"

instance_name = "<INSTANCE_NAME>"


```

### Queues

[Queues](https://developers.cloudflare.com/queues/) is Cloudflare's global message queueing service, providing [guaranteed delivery](https://developers.cloudflare.com/queues/reference/delivery-guarantees/) and [message batching](https://developers.cloudflare.com/queues/configuration/batching-retries/). To interact with a queue with Workers, you need a producer Worker to send messages to the queue and a consumer Worker to pull batches of messages out of the Queue. A single Worker can produce to and consume from multiple Queues.

To bind Queues to your producer Worker, assign an array of the below object to the `[[queues.producers]]` key.

* `queue` ` string ` required  
   * The name of the queue, used on the Cloudflare dashboard.
* `binding` ` string ` required  
   * The binding name used to refer to the queue in your Worker. The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_QUEUE"` or `binding = "productionQueue"` would both be valid names for the binding.
* `delivery_delay` ` number ` optional  
   * The number of seconds to [delay messages sent to a queue](https://developers.cloudflare.com/queues/configuration/batching-retries/#delay-messages) for by default. This can be overridden on a per-message or per-batch basis.

Example:

* [  wrangler.jsonc ](#tab-panel-12877)
* [  wrangler.toml ](#tab-panel-12878)

JSONC

```

{

  "queues": {

    "producers": [

      {

        "binding": "<BINDING_NAME>",

        "queue": "<QUEUE_NAME>",

        "delivery_delay": 60, // Delay messages by 60 seconds before they are delivered to a consumer

      },

    ],

  },

}


```

TOML

```

[[queues.producers]]

binding = "<BINDING_NAME>"

queue = "<QUEUE_NAME>"

delivery_delay = 60


```

To bind Queues to your consumer Worker, assign an array of the below object to the `[[queues.consumers]]` key.

* `queue` ` string ` required  
   * The name of the queue, used on the Cloudflare dashboard.
* `max_batch_size` ` number ` optional  
   * The maximum number of messages allowed in each batch.
* `max_batch_timeout` ` number ` optional  
   * The maximum number of seconds to wait for messages to fill a batch before the batch is sent to the consumer Worker.
* `max_retries` ` number ` optional  
   * The maximum number of retries for a message, if it fails or [retryAll()](https://developers.cloudflare.com/queues/configuration/javascript-apis/#messagebatch) is invoked.
* `dead_letter_queue` ` string ` optional  
   * The name of another queue to send a message if it fails processing at least `max_retries` times.  
   * If a `dead_letter_queue` is not defined, messages that repeatedly fail processing will be discarded.  
   * If there is no queue with the specified name, it will be created automatically.
* `max_concurrency` ` number ` optional  
   * The maximum number of concurrent consumers allowed to run at once. Leaving this unset will mean that the number of invocations will scale to the [currently supported maximum](https://developers.cloudflare.com/queues/platform/limits/).  
   * Refer to [Consumer concurrency](https://developers.cloudflare.com/queues/configuration/consumer-concurrency/) for more information on how consumers autoscale, particularly when messages are retried.
* `retry_delay` ` number ` optional  
   * The number of seconds to [delay retried messages](https://developers.cloudflare.com/queues/configuration/batching-retries/#delay-messages) for by default, before they are re-delivered to the consumer. This can be overridden on a per-message or per-batch basis [when retrying messages](https://developers.cloudflare.com/queues/configuration/batching-retries/#explicit-acknowledgement-and-retries).

Example:

* [  wrangler.jsonc ](#tab-panel-12885)
* [  wrangler.toml ](#tab-panel-12886)

JSONC

```

{

  "queues": {

    "consumers": [

      {

        "queue": "my-queue",

        "max_batch_size": 10,

        "max_batch_timeout": 30,

        "max_retries": 10,

        "dead_letter_queue": "my-queue-dlq",

        "max_concurrency": 5,

        "retry_delay": 120, // Delay retried messages by 2 minutes before re-attempting delivery

      },

    ],

  },

}


```

TOML

```

[[queues.consumers]]

queue = "my-queue"

max_batch_size = 10

max_batch_timeout = 30

max_retries = 10

dead_letter_queue = "my-queue-dlq"

max_concurrency = 5

retry_delay = 120


```

### R2 buckets

[Cloudflare R2 Storage](https://developers.cloudflare.com/r2) allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

To bind R2 buckets to your Worker, assign an array of the below object to the `r2_buckets` key.

* `binding` ` string ` required  
   * The binding name used to refer to the R2 bucket.
* `bucket_name` ` string ` required  
   * The name of this R2 bucket.
* `jurisdiction` ` string ` optional  
   * The jurisdiction where this R2 bucket is located, if a jurisdiction has been specified. Refer to [Jurisdictional Restrictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions).
* `preview_bucket_name` ` string ` optional  
   * The preview name of this R2 bucket. If provided, `wrangler dev` will use this name for the R2 bucket. Otherwise, it will use `bucket_name`. This option is required when using `wrangler dev --remote` (but is not required with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings)).

Note

When using Wrangler in the default local development mode, files will be written to local storage instead of the preview or production bucket. Refer to [Local development and testing](https://developers.cloudflare.com/workers/development-testing/) for more details.

Example:

* [  wrangler.jsonc ](#tab-panel-12883)
* [  wrangler.toml ](#tab-panel-12884)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "<BINDING_NAME1>",

      "bucket_name": "<BUCKET_NAME1>",

    },

    {

      "binding": "<BINDING_NAME2>",

      "bucket_name": "<BUCKET_NAME2>",

    },

  ],

}


```

TOML

```

[[r2_buckets]]

binding = "<BINDING_NAME1>"

bucket_name = "<BUCKET_NAME1>"


[[r2_buckets]]

binding = "<BINDING_NAME2>"

bucket_name = "<BUCKET_NAME2>"


```

### Vectorize indexes

A [Vectorize index](https://developers.cloudflare.com/vectorize/) allows you to insert and query vector embeddings for semantic search, classification and other vector search use-cases.

To bind Vectorize indexes to your Worker, assign an array of the below object to the `vectorize` key.

* `binding` ` string ` required  
   * The binding name used to refer to the bound index from your Worker code.
* `index_name` ` string ` required  
   * The name of the index to bind.

Example:

* [  wrangler.jsonc ](#tab-panel-12881)
* [  wrangler.toml ](#tab-panel-12882)

JSONC

```

{

  "vectorize": [

    {

      "binding": "<BINDING_NAME>",

      "index_name": "<INDEX_NAME>",

    },

  ],

}


```

TOML

```

[[vectorize]]

binding = "<BINDING_NAME>"

index_name = "<INDEX_NAME>"


```

### Service bindings

A service binding allows you to send HTTP requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker, reducing latency as compared to a request to a third-party service. Refer to [About Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

To bind other Workers to your Worker, assign an array of the below object to the `services` key.

* `binding` ` string ` required  
   * The binding name used to refer to the bound Worker.
* `service` ` string ` required  
   * The name of the Worker.  
   * To bind to a Worker in a specific [environment](https://developers.cloudflare.com/workers/wrangler/environments), you need to append the environment name to the Worker name. This should be in the format `<worker-name>-<environment-name>`. For example, to bind to a Worker called `worker-name` in its `staging` environment, `service` should be set to `worker-name-staging`.
* `entrypoint` ` string ` optional  
   * The name of the [entrypoint](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/#named-entrypoints) to bind to. If you do not specify an entrypoint, the default export of the Worker will be used.

Example:

* [  wrangler.jsonc ](#tab-panel-12887)
* [  wrangler.toml ](#tab-panel-12888)

JSONC

```

{

  "services": [

    {

      "binding": "<BINDING_NAME>",

      "service": "<WORKER_NAME>",

      "entrypoint": "<ENTRYPOINT_NAME>",

    },

  ],

}


```

TOML

```

[[services]]

binding = "<BINDING_NAME>"

service = "<WORKER_NAME>"

entrypoint = "<ENTRYPOINT_NAME>"


```

### Static assets

Refer to [Assets](#assets).

### Analytics Engine Datasets

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) provides analytics, observability and data logging from Workers. Write data points to your Worker binding then query the data using the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/).

To bind Analytics Engine datasets to your Worker, assign an array of the below object to the `analytics_engine_datasets` key.

* `binding` ` string ` required  
   * The binding name used to refer to the dataset.
* `dataset` ` string ` optional  
   * The dataset name to write to. This will default to the same name as the binding if it is not supplied.

Example:

* [  wrangler.jsonc ](#tab-panel-12889)
* [  wrangler.toml ](#tab-panel-12890)

JSONC

```

{

  "analytics_engine_datasets": [

    {

      "binding": "<BINDING_NAME>",

      "dataset": "<DATASET_NAME>",

    },

  ],

}


```

TOML

```

[[analytics_engine_datasets]]

binding = "<BINDING_NAME>"

dataset = "<DATASET_NAME>"


```

### mTLS Certificates

To communicate with origins that require client authentication, a Worker can present a certificate for mTLS in subrequests. Wrangler provides the `mtls-certificate` [command](https://developers.cloudflare.com/workers/wrangler/commands#mtls-certificate) to upload and manage these certificates.

To create a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to an mTLS certificate for your Worker, assign an array of objects with the following shape to the `mtls_certificates` key.

* `binding` ` string ` required  
   * The binding name used to refer to the certificate.
* `certificate_id` ` string ` required  
   * The ID of the certificate. Wrangler displays this via the `mtls-certificate upload` and `mtls-certificate list` commands.

Example of a Wrangler configuration file that includes an mTLS certificate binding:

* [  wrangler.jsonc ](#tab-panel-12893)
* [  wrangler.toml ](#tab-panel-12894)

JSONC

```

{

  "mtls_certificates": [

    {

      "binding": "<BINDING_NAME1>",

      "certificate_id": "<CERTIFICATE_ID1>",

    },

    {

      "binding": "<BINDING_NAME2>",

      "certificate_id": "<CERTIFICATE_ID2>",

    },

  ],

}


```

TOML

```

[[mtls_certificates]]

binding = "<BINDING_NAME1>"

certificate_id = "<CERTIFICATE_ID1>"


[[mtls_certificates]]

binding = "<BINDING_NAME2>"

certificate_id = "<CERTIFICATE_ID2>"


```

mTLS certificate bindings can then be used at runtime to communicate with secured origins via their [fetch method](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls).

### Workers AI

[Workers AI](https://developers.cloudflare.com/workers-ai/) allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via REST API.

Workers AI local development usage charges

Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

Unlike other bindings, this binding is limited to one AI binding per Worker project.

* `binding` ` string ` required  
   * The binding name.

Example:

* [  wrangler.jsonc ](#tab-panel-12891)
* [  wrangler.toml ](#tab-panel-12892)

JSONC

```

{

  "ai": {

    "binding": "AI", // available in your Worker code on `env.AI`

  },

}


```

TOML

```

[ai]

binding = "AI"


```

### Workflows

[Workflows](https://developers.cloudflare.com/workflows/) allow you to build durable, multi-step applications using the Workers platform. A Workflow binding enables your Worker to create and manage Workflow instances programmatically.

To bind Workflows to your Worker, assign an array of the below object to the `workflows` key.

* `binding` ` string ` required  
   * The binding name used to refer to the Workflow in your Worker. The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_WORKFLOW"` would be a valid name for the binding.
* `name` ` string ` required  
   * The name of the Workflow.
* `class_name` ` string ` required  
   * The name of the exported Workflow class. The `class_name` must match the name of the Workflow class exported from your Worker code.
* `script_name` ` string ` optional  
   * The name of the Worker script where the Workflow class is defined. Only required if the Workflow is defined in a different Worker than the one the binding is configured on.
* `schedules` ` string[] ` optional  
   * A list of cron schedules that create new instances of this Workflow automatically.  
   * Use this when you want to run a Workflow on a recurring interval without defining top-level `triggers.crons` and a separate `scheduled` handler.  
   * Use a Wrangler release that supports Workflow schedules. If your local schema does not recognize `schedules`, update Wrangler first.

Example:

* [  wrangler.jsonc ](#tab-panel-12895)
* [  wrangler.toml ](#tab-panel-12896)

JSONC

```

{

  "workflows": [

    {

      "binding": "<BINDING_NAME>",

      "name": "<WORKFLOW_NAME>",

      "class_name": "<CLASS_NAME>",

    },

  ],

}


```

TOML

```

[[workflows]]

binding = "<BINDING_NAME>"

name = "<WORKFLOW_NAME>"

class_name = "<CLASS_NAME>"


```

## Assets

[Static assets](https://developers.cloudflare.com/workers/static-assets/) allows developers to run front-end websites on Workers. You can configure the directory of assets, an optional runtime binding, and routing configuration options.

You can only configure one collection of assets per Worker.

The following options are available under the `assets` key.

* `directory` ` string ` optional  
   * Folder of static assets to be served.  
   * Not required if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), which will automatically point to the client build output.
* `binding` ` string ` optional  
   * The binding name used to refer to the assets. Optional, and only useful when a Worker script is set with `main`.
* `run_worker_first` ` boolean | string[] ` optional, defaults to false  
   * Controls whether static assets are fetched directly, or a Worker script is invoked. Can be a boolean (`true`/`false`) or an array of route pattern strings with support for glob patterns (`*`) and exception patterns (`!` prefix). Patterns must begin with `/` or `!/`. Learn more about fetching assets when using [run\_worker\_first](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/#run-your-worker-script-first).
* `html_handling`: ` "auto-trailing-slash" | "force-trailing-slash" | "drop-trailing-slash" | "none" ` optional, defaults to "auto-trailing-slash"  
   * Determines the redirects and rewrites of requests for HTML content. Learn more about the various options in [assets routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).
* `not_found_handling`: ` "single-page-application" | "404-page" | "none" ` optional, defaults to "none"  
   * Determines the handling of requests that do not map to an asset. Learn more about the various options for [routing behavior](https://developers.cloudflare.com/workers/static-assets/#routing-behavior).

Example:

* [  wrangler.jsonc ](#tab-panel-12897)
* [  wrangler.toml ](#tab-panel-12898)

JSONC

```

{

  "assets": {

    "directory": "./public",

    "binding": "ASSETS",

    "html_handling": "force-trailing-slash",

    "not_found_handling": "404-page",

  },

}


```

TOML

```

[assets]

directory = "./public"

binding = "ASSETS"

html_handling = "force-trailing-slash"

not_found_handling = "404-page"


```

You can also configure `run_worker_first` with an array of route patterns:

* [  wrangler.jsonc ](#tab-panel-12899)
* [  wrangler.toml ](#tab-panel-12900)

JSONC

```

{

  "assets": {

    "directory": "./public",

    "binding": "ASSETS",

    "run_worker_first": [

      "/api/*", // API calls go to Worker first

      "!/api/docs/*", // EXCEPTION: For /api/docs/*, try static assets first

    ],

  },

}


```

TOML

```

[assets]

directory = "./public"

binding = "ASSETS"

run_worker_first = [ "/api/*", "!/api/docs/*" ]


```

## Containers

You can define [Containers](https://developers.cloudflare.com/containers) to run alongside your Worker using the `containers` field.

Note

You must also define a Durable Object to communicate with your Container via Workers. This Durable Object's class name must match the `class_name` value in container configuration.

The following options are available:

* `image` ` string ` required  
   * The image to use for the container. This can either be a local path to a `Dockerfile`, in which case `wrangler deploy` will build and push the image, or it can be an image reference. Supported registries are the Cloudflare Registry, Docker Hub, and Amazon ECR. For more information, refer to [Image Management](https://developers.cloudflare.com/containers/platform-details/image-management/).
* `class_name` ` string ` required  
   * The corresponding Durable Object class name. This will make this Durable Object a container-enabled Durable Object and allow each instance to control a container. See [Durable Object Container Methods](https://developers.cloudflare.com/durable-objects/api/container/) for details.
* `instance_type` ` string ` optional  
   * The instance type of the container. This determines the amount of memory, CPU, and disk given to the container instance. The current options are `"lite"`, `"basic"`, `"standard-1"`, `"standard-2"`, `"standard-3"`, and `"standard-4"`. The default is `"lite"`. For more information, the see [instance types documentation](https://developers.cloudflare.com/containers/platform-details#instance-types).  
   * To specify a custom instance type, see [here](#custom-instance-types).
* `max_instances` ` string ` optional  
   * The maximum number of concurrent container instances you want to run at any given moment. Stopped containers do not count towards this - you may have more container instances than this number overall, but only this many actively running containers at once. If a request to start a container will exceed this limit, that request will error.  
   * Defaults to 20.  
   * This value is only enforced when running in production on Cloudflare's network. This limit does not apply during local development, so you may run more instances than specified.
* `name` ` string ` optional  
   * The name of your container. Used as an identifier. This will default to a combination of your Worker name, the class name, and your environment.
* `image_build_context` ` string ` optional  
   * The build context of the application, by default it is the directory of `image`.
* `image_vars` ` Record<string, string> ` optional  
   * Build-time variables, equivalent to using `--build-arg` with `docker build`. If you want to provide environment variables to your container at _runtime_, you should [use secret bindings or envVars on the Container class](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/).
* `rollout_active_grace_period` ` number ` optional  
   * The minimum number of seconds to wait before an active container instance becomes eligible for updating during a [rollout](https://developers.cloudflare.com/containers/platform-details/rollouts/). At that point, the container will be sent a `SIGTERM` signal and still has 15 minutes to shut down before it is forcibly killed and updated.  
   * Defaults to `0`.
* `rollout_step_percentage` ` number | number[] ` optional  
   * Configures what percentage of instances should be updated at each step of a [rollout](https://developers.cloudflare.com/containers/faq#how-do-container-updates-and-rollouts-work).  
   * If this is set to a single number, each step will rollout to that percentage of instances. The options are `5`, `10`, `20`, `25`, `50` or `100`.  
   * If this is an array of numbers, each step specifies the cumulative rollout progress, so the final step must be `100`.  
   * Defaults to `[10, 100]`.  
   * This can be overridden ad hoc by deploying with the `--containers-rollout=immediate` flag, which will roll out to 100% of instances in one step. Note that flag will not override `rollout_active_grace_period`, if configured.
* `ssh` ` object ` optional  
   * Configuration for SSH through Wrangler. Refer to [SSH](#ssh).
* `wrangler_ssh` ` object ` optional deprecated, use \`ssh\`  
   * Deprecated alias for `ssh`. Still supported for backward compatibility.
* `authorized_keys` ` object[] ` optional  
   * Public keys that should be added to the Container's `authorized_keys` file.
* `constraints` ` object ` optional  
   * Placement constraints for the container. Refer to [Containers placement](https://developers.cloudflare.com/containers/platform-details/placement/) for details.
* `constraints.regions` ` string[] ` optional  
   * Limit container placement to specific geographic regions. Valid values: `"ENAM"`, `"WNAM"`, `"EEUR"`, `"WEUR"`, `"APAC"`, `"SAM"`, `"ME"`, `"OC"`, `"AFR"`.
* `constraints.jurisdiction` ` string ` optional  
   * Restrict containers to compliance boundaries. Valid values: `"eu"`, `"fedramp"`.

* [  wrangler.jsonc ](#tab-panel-12921)
* [  wrangler.toml ](#tab-panel-12922)

JSONC

```

{

  "containers": [

    {

      "class_name": "MyContainer",

      "image": "./Dockerfile",

      "max_instances": 10,

      "instance_type": "basic", // Optional, defaults to "lite"

      "image_vars": {

        "FOO": "BAR",

      },

      "constraints": {

        "regions": ["ENAM", "WNAM"],

        "jurisdiction": "fedramp",

      },

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_CONTAINER",

        "class_name": "MyContainer",

      },

    ],

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["MyContainer"],

    },

  ],

}


```

TOML

```

[[containers]]

class_name = "MyContainer"

image = "./Dockerfile"

max_instances = 10

instance_type = "basic"


  [containers.image_vars]

  FOO = "BAR"


  [containers.constraints]

  regions = [ "ENAM", "WNAM" ]

  jurisdiction = "fedramp"


[[durable_objects.bindings]]

name = "MY_CONTAINER"

class_name = "MyContainer"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyContainer" ]


```

### Custom Instance Types

In place of the [named instance types](https://developers.cloudflare.com/containers/platform-details/limits/#instance-types), you can set a custom instance type by individually configuring vCPU, memory, and disk. See the [limits documentation](https://developers.cloudflare.com/containers/platform-details/limits/#custom-instance-types) for constraints on custom instance types.

The following options are available:

* `vcpu` ` number ` optional  
   * The vCPU to be used by your container. Defaults to `0.0625` (1/16 vCPU).
* `memory_mib` ` number ` optional  
   * The memory to be used by your container, in MiB. Defaults to `256`.
* `disk_mb` ` number ` optional  
   * The disk to be used by your container, in MB. Defaults to `2000` (2GB).

* [  wrangler.jsonc ](#tab-panel-12905)
* [  wrangler.toml ](#tab-panel-12906)

JSONC

```

{

  "containers": [

    {

      "image": "./Dockerfile",

      "instance_type": {

        "vcpu": 1,

        "memory_mib": 1024,

        "disk_mb": 4000,

      },

    },

  ],

}


```

TOML

```

[[containers]]

image = "./Dockerfile"


  [containers.instance_type]

  vcpu = 1

  memory_mib = 1_024

  disk_mb = 4_000


```

### SSH

Configuration for SSH access to a Container instance through Wrangler. For a guide on connecting to Containers via SSH, refer to [SSH](https://developers.cloudflare.com/containers/ssh/).

The following options are available:

* `enabled` ` boolean ` optional  
   * Whether SSH through Wrangler is enabled. Defaults to `true`. Set to `false` to disable SSH access.
* `port` ` number ` optional  
   * The port for the SSH service to run on. Defaults to `22`.

### Authorized keys

An authorized key is a public key that can be used to SSH into a Container.

The following are properties of a key:

* `name` ` string ` required  
   * The display name of the key.
* `public_key` ` string ` required  
   * The public key itself.  
   * Currently only the `ssh-ed25519` key type is supported.

## Bundling

Note

Wrangler bundling is not applicable if you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

Wrangler can operate in two modes: the default bundling mode and `--no-bundle` mode. In bundling mode, Wrangler will traverse all the imports of your code and generate a single JavaScript "entry-point" file. Imported source code is "inlined/bundled" into this entry-point file.

It is also possible to include additional modules into your Worker, which are uploaded alongside the entry-point. You specify which additional modules should be included into your Worker using the `rules` key, making these modules available to be imported when your Worker is invoked. The `rules` key will be an array of the below object.

* `type` ` string ` required  
   * The type of module. Must be one of: `ESModule`, `CommonJS`, `CompiledWasm`, `Text` or `Data`.
* `globs` ` string[] ` required  
   * An array of glob rules (for example, `["**/*.md"]`). Refer to [glob ↗](https://man7.org/linux/man-pages/man7/glob.7.html).
* `fallthrough` ` boolean ` optional  
   * When set to `true` on a rule, this allows you to have multiple rules for the same `Type`.

Example:

* [  wrangler.jsonc ](#tab-panel-12903)
* [  wrangler.toml ](#tab-panel-12904)

JSONC

```

{

  "rules": [

    {

      "type": "Text",

      "globs": ["**/*.md"],

      "fallthrough": true,

    },

  ],

}


```

TOML

```

[[rules]]

type = "Text"

globs = [ "**/*.md" ]

fallthrough = true


```

### Importing modules within a Worker

You can import and refer to these modules within your Worker, like so:

index.js

```

import markdown from "./example.md";


export default {

  async fetch() {

    return new Response(markdown);

  },

};


```

### Find additional modules

Normally Wrangler will only include additional modules that are statically imported in your source code as in the example above. By setting `find_additional_modules` to `true` in your configuration file, Wrangler will traverse the file tree below `base_dir`. Any files that match `rules` will also be included as unbundled, external modules in the deployed Worker.`base_dir` defaults to the directory containing your `main` entrypoint.

See [https://developers.cloudflare.com/workers/wrangler/bundling/ ↗](https://developers.cloudflare.com/workers/wrangler/bundling/) for more details and examples.

### Python Workers

By default, Python Workers bundle the files and folders in `python_modules` at the root of your Worker (alongside your wrangler config file). The files in this directory represent your vendored packages and is where the pywrangler tool copies packages into. In some cases, you may find that the files in this folder are too large and if your worker doesn't require them then they just grow your bundle size for no reason.

To fix this, you can exclude certain files from being included. To do this use the `python_modules.excludes` option, for example:

* [  wrangler.jsonc ](#tab-panel-12901)
* [  wrangler.toml ](#tab-panel-12902)

JSONC

```

{

  "python_modules": {

    "excludes": ["**/*.pyc", "**/__pycache__"],

  },

}


```

TOML

```

[python_modules]

excludes = [ "**/*.pyc", "**/__pycache__" ]


```

This will exclude any .pyc files and `__pycache__` directories inside any subdirectory in `python_modules`.

By default, `python_modules.excludes` is set to `["**/*.pyc"]`, so be sure to include this when setting it to a different value.

## Local development settings

Note

If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), you should use Vite's [server options ↗](https://vite.dev/config/server-options.html) instead.

You can configure various aspects of local development, such as the local protocol or port.

* `ip` ` string ` optional
* IP address for the local dev server to listen on. Defaults to `localhost`.
* `port` ` number ` optional
* Port for the local dev server to listen on. Defaults to `8787`.
* `local_protocol` ` string ` optional  
   * Protocol that local dev server listens to requests on. Defaults to `http`.
* `upstream_protocol` ` string ` optional  
   * Protocol that the local dev server forwards requests on. Defaults to `https`.
* `host` ` string ` optional  
   * Host to forward requests to, defaults to the host of the first `route` of the Worker.
* `enable_containers` ` boolean ` optional  
   * Determines whether to enable containers during a local dev session, if they have been configured. Defaults to `true`. If set to `false`, you can develop the rest of your application without requiring Docker or other container tool, as long as you do not invoke any code that interacts with containers.
* `container_engine` ` string ` optional  
   * Used for local development of [Containers](https://developers.cloudflare.com/containers/local-dev). Wrangler will attempt to automatically find the correct socket to use to communicate with your container engine. If that does not work (usually surfacing as an `internal error` when attempting to connect to your Container), you can try setting the socket path using this option. You can also set this via the environment variable `DOCKER_HOST`.
* `generate_types` ` boolean ` optional  
   * Generate types from your Worker configuration. Defaults to `false`.

* [  wrangler.jsonc ](#tab-panel-12907)
* [  wrangler.toml ](#tab-panel-12908)

JSONC

```

{

  "dev": {

    "ip": "192.168.1.1",

    "port": 8080,

    "local_protocol": "http",

  },

}


```

TOML

```

[dev]

ip = "192.168.1.1"

port = 8_080

local_protocol = "http"


```

## Secrets

[Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) are a type of binding that allow you to [attach encrypted text values](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) to your Worker.

### `secrets` configuration property

The `secrets` configuration property lets you declare the secret names your Worker requires in your Wrangler configuration file. Required secrets are validated during local development and deploy, and used as the source of truth for type generation.

* [  wrangler.jsonc ](#tab-panel-12909)
* [  wrangler.toml ](#tab-panel-12910)

JSONC

```

{

  "secrets": {

    "required": ["API_KEY", "DB_PASSWORD"],

  },

}


```

TOML

```

[secrets]

required = [ "API_KEY", "DB_PASSWORD" ]


```

**Type generation**

When `secrets` is defined at any config level, `wrangler types` generates typed bindings from the names listed in `secrets.required` and no longer infers secret names from `.dev.vars` or `.env` files. This lets you run type generation in environments where those files are not present.

Per-environment secrets are supported. Each named environment produces its own interface, and the aggregated `Env` type marks secrets that only appear in some environments as optional.

**Deploy**

When `secrets` is defined, `wrangler deploy` and `wrangler versions upload` validate that all secrets in `secrets.required` are configured on the Worker before the operation succeeds. If any required secrets are missing, the command fails with an error listing which secrets need to be set.

### Local development

Warning

Do not use `vars` to store sensitive information in your Worker's Wrangler configuration file. Use secrets instead.

Put secrets for use in local development in either a `.dev.vars` file or a `.env` file, in the same directory as the Wrangler configuration file.

Note

You can use the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) to declare which secret names your Worker requires. When defined, only the keys listed in `secrets.required` are loaded from `.dev.vars` or `.env`. Additional keys are excluded and missing keys produce a warning.

Choose to use either `.dev.vars` or `.env` but not both. If you define a `.dev.vars` file, then values in `.env` files will not be included in the `env` object during local development.

These files should be formatted using the [dotenv ↗](https://hexdocs.pm/dotenvy/dotenv-file-format.html) syntax. For example:

.dev.vars / .env

```

SECRET_KEY="value"

API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


```

Do not commit secrets to git

The `.dev.vars` and `.env` files should not be committed to git. Add `.dev.vars*` and `.env*` to your project's `.gitignore` file.

To set different secrets for each Cloudflare environment, create files named `.dev.vars.<environment-name>` or `.env.<environment-name>`.

When you select a Cloudflare environment in your local development, the corresponding environment-specific file will be loaded ahead of the generic `.dev.vars` (or `.env`) file.

* When using `.dev.vars.<environment-name>` files, all secrets must be defined per environment. If `.dev.vars.<environment-name>` exists then only this will be loaded; the `.dev.vars` file will not be loaded.
* In contrast, all matching `.env` files are loaded and the values are merged. For each variable, the value from the most specific file is used, with the following precedence:  
   * `.env.<environment-name>.local` (most specific)  
   * `.env.local`  
   * `.env.<environment-name>`  
   * `.env` (least specific)

Controlling `.env` handling

It is possible to control how `.env` files are loaded in local development by setting environment variables on the process running the tools.

* To disable loading local dev vars from `.env` files without providing a `.dev.vars` file, set the `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` environment variable to `"false"`.
* To include every environment variable defined in your system's process environment as a local development variable, ensure there is no `.dev.vars` and then set the `CLOUDFLARE_INCLUDE_PROCESS_ENV` environment variable to `"true"`. This is not needed when using the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property), which loads from `process.env` automatically.

## Module Aliasing

Note

If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), `alias` is replaced Vite's [resolve.alias ↗](https://vite.dev/config/shared-options.html#resolve-alias).

You can configure Wrangler to replace all calls to import a particular package with a module of your choice, by configuring the `alias` field:

* [  wrangler.jsonc ](#tab-panel-12911)
* [  wrangler.toml ](#tab-panel-12912)

JSONC

```

{

  "alias": {

    "foo": "./replacement-module-filepath",

  },

}


```

TOML

```

[alias]

foo = "./replacement-module-filepath"


```

replacement-module-filepath.js

```

export const bar = "baz";


```

With the configuration above, any calls to `import` or `require()` the module `foo` will be aliased to point to your replacement module:

JavaScript

```

import { bar } from "foo";


console.log(bar); // returns "baz"


```

### Bundling issues

When Wrangler bundles your Worker, it might fail to resolve dependencies. Setting up an alias for such dependencies is a simple way to fix the issue.

However, before doing so, verify that the package is correctly installed in your project, either as a direct dependency in `package.json` or as a transitive dependency.

If an alias is the correct solution for your dependency issue, you have several options:

* **Alternative implementation** — Implement the module's logic in a Worker-compatible manner, ensuring that all the functionality remains intact.
* **No-op module** — If the module's logic is unused or irrelevant, point the alias to an empty file. This makes the module a no-op while fixing the bundling issue.
* **Runtime error** — If the module's logic is unused and the Worker should not attempt to use it (for example, because of security vulnerabilities), point the alias to a file with a single top-level `throw` statement. This fixes the bundling issue while ensuring the module is never actually used.

### Example: Aliasing dependencies from NPM

You can use module aliasing to provide an implementation of an NPM package that does not work on Workers — even if you only rely on that NPM package indirectly, as a dependency of one of your Worker's dependencies.

For example, some NPM packages depend on [node-fetch ↗](https://www.npmjs.com/package/node-fetch), a package that provided a polyfill of the [fetch() API](https://developers.cloudflare.com/workers/runtime-apis/fetch/), before it was built into Node.js.

`node-fetch` isn't needed in Workers, because the `fetch()` API is provided by the Workers runtime. And `node-fetch` doesn't work on Workers, because it relies on currently unsupported Node.js APIs from the `http`/`https` modules.

You can alias all imports of `node-fetch` to instead point directly to the `fetch()` API that is built into the Workers runtime:

* [  wrangler.jsonc ](#tab-panel-12913)
* [  wrangler.toml ](#tab-panel-12914)

JSONC

```

{

  "alias": {

    "node-fetch": "./fetch-polyfill",

  },

}


```

TOML

```

[alias]

node-fetch = "./fetch-polyfill"


```

./fetch-polyfill

```

export default fetch;


```

### Example: Aliasing Node.js APIs

You can use module aliasing to provide your own polyfill implementation of a Node.js API that is not yet available in the Workers runtime.

For example, let's say the NPM package you rely on calls [fs.readFile ↗](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback). You can alias the fs module by adding the following to your Worker's Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-12915)
* [  wrangler.toml ](#tab-panel-12916)

JSONC

```

{

  "alias": {

    "fs": "./fs-polyfill",

  },

}


```

TOML

```

[alias]

fs = "./fs-polyfill"


```

./fs-polyfill

```

export function readFile() {

  // ...

}


```

In many cases, this allows you to work provide just enough of an API to make a dependency work. You can learn more about Cloudflare Workers' support for Node.js APIs on the [Cloudflare Workers Node.js API documentation page](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

## Source maps

[Source maps](https://developers.cloudflare.com/workers/observability/source-maps/) translate compiled and minified code back to the original code that you wrote. Source maps are combined with the stack trace returned by the JavaScript runtime to present you with a stack trace.

* `upload_source_maps` ` boolean `  
   * When `upload_source_maps` is set to `true`, Wrangler will automatically generate and upload source map files when you run [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) or [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy).

Example:

* [  wrangler.jsonc ](#tab-panel-12917)
* [  wrangler.toml ](#tab-panel-12918)

JSONC

```

{

  "upload_source_maps": true,

}


```

TOML

```

upload_source_maps = true


```

## Workers Sites

Use Workers Static Assets Instead

You should use [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) to host full-stack applications instead of Workers Sites. It has been deprecated in Wrangler v4, and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) does not support Workers Sites. Do not use Workers Sites for new projects.

[Workers Sites](https://developers.cloudflare.com/workers/configuration/sites/) allows you to host static websites, or dynamic websites using frameworks like Vue or React, on Workers.

* `bucket` ` string ` required  
   * The directory containing your static assets. It must be a path relative to your Wrangler configuration file.
* `include` ` string[] ` optional  
   * An exclusive list of `.gitignore`\-style patterns that match file or directory names from your bucket location. Only matched items will be uploaded.
* `exclude` ` string[] ` optional  
   * A list of `.gitignore`\-style patterns that match files or directories in your bucket that should be excluded from uploads.

Example:

* [  wrangler.jsonc ](#tab-panel-12919)
* [  wrangler.toml ](#tab-panel-12920)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "include": ["upload_dir"],

    "exclude": ["ignore_dir"],

  },

}


```

TOML

```

[site]

bucket = "./public"

include = [ "upload_dir" ]

exclude = [ "ignore_dir" ]


```

## Proxy support

Corporate networks will often have proxies on their networks and this can sometimes cause connectivity issues. To configure Wrangler with the appropriate proxy details, [add the following environmental variables](https://developers.cloudflare.com/workers/configuration/environment-variables/):

* `https_proxy`
* `HTTPS_PROXY`
* `http_proxy`
* `HTTP_PROXY`

To configure this on macOS, add `HTTP_PROXY=http://<YOUR_PROXY_HOST>:<YOUR_PROXY_PORT>` before your Wrangler commands.

Example:

Terminal window

```

$ HTTP_PROXY=http://localhost:8080 wrangler dev


```

If your IT team has configured your computer's proxy settings, be aware that the first non-empty environment variable in this list will be used when Wrangler makes outgoing requests.

For example, if both `https_proxy` and `http_proxy` are set, Wrangler will only use `https_proxy` for outgoing requests.

## Source of truth

We recommend treating your Wrangler configuration file as the source of truth for your Worker configuration, and to avoid making changes to your Worker via the Cloudflare dashboard if you are using Wrangler.

If you need to make changes to your Worker from the Cloudflare dashboard, the dashboard will generate a TOML snippet for you to copy into your Wrangler configuration file, which will help ensure your Wrangler configuration file is always up to date.

If you change your environment variables in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behavior, add `keep_vars = true` to your Wrangler configuration file.

If you change your routes in the dashboard, Wrangler will override them in the next deploy with the routes you have set in your Wrangler configuration file. To manage routes via the Cloudflare dashboard only, remove any route and routes keys from your Wrangler configuration file. Then add `workers_dev = false` to your Wrangler configuration file. For more information, refer to [Deprecations](https://developers.cloudflare.com/workers/wrangler/deprecations/#other-deprecated-behavior).

Wrangler will not delete your secrets (encrypted environment variables) unless you run `wrangler secret delete <key>`.

## Generated Wrangler configuration

Note

This section describes a feature that can be implemented by frameworks and other build tools that are integrating with Wrangler.

It is unlikely that an application developer will need to use this feature, but it is documented here to help you understand when Wrangler is using a generated configuration rather than the original, user's configuration.

For example, when using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), an output Worker configuration file is generated as part of the build. This is then used for preview and deployment.

Some framework tools, or custom pre-build processes, generate a modified Wrangler configuration to be used to deploy the Worker code. In this case, the tool may also create a special `.wrangler/deploy/config.json` file that redirects Wrangler to use the generated configuration rather than the original, user's configuration.

Wrangler uses this generated configuration only for the following deploy and dev related commands:

* `wrangler deploy`
* `wrangler dev`
* `wrangler versions upload`
* `wrangler versions deploy`
* `wrangler pages deploy`
* `wrangler pages functions build`

When running these commands, Wrangler looks up the directory tree from the current working directory for a file at the path `.wrangler/deploy/config.json`. This file must contain only a single JSON object of the form:

```

{ "configPath": "../../path/to/wrangler.jsonc" }


```

When this `config.json` file exists, Wrangler will follow the `configPath` (relative to the `.wrangler/deploy/config.json` file) to find the generated Wrangler configuration file to load and use in the current command. Wrangler will display messaging to the user to indicate that the configuration has been redirected to a different file than the user's configuration file.

The generated configuration file should not include any [environments](#environments). This is because such a file, when required, should be created as part of a build step, which should already target a specific environment. These build tools should generate distinct deployment configuration files for different environments.

### Custom build tool example

A common example of using a redirected configuration is where a custom build tool, or framework, wants to modify the user's configuration to be used when deploying, by generating a new configuration in a `dist` directory.

* First, the user writes code that uses Cloudflare Workers resources, configured via a user's Wrangler configuration file like the following:  
   * [  wrangler.jsonc ](#tab-panel-12925)  
   * [  wrangler.toml ](#tab-panel-12926)  
JSONC  
```  
{  
  "$schema": "./node_modules/wrangler/config-schema.json",  
  "name": "my-worker",  
  "main": "src/index.ts",  
  "vars": {  
    "MY_VARIABLE": "production variable",  
  },  
  "env": {  
    "staging": {  
      "vars": {  
        "MY_VARIABLE": "staging variable",  
      },  
    },  
  },  
}  
```  
TOML  
```  
"$schema" = "./node_modules/wrangler/config-schema.json"  
name = "my-worker"  
main = "src/index.ts"  
[vars]  
MY_VARIABLE = "production variable"  
[env.staging.vars]  
MY_VARIABLE = "staging variable"  
```  
This configuration points `main` at the user's code entry-point and defines the `MY_VARIABLE` variable in two different environments.
* Then, the user runs a custom build for a given environment (for example `staging`). This will read the user's Wrangler configuration file to find the source code entry-point and environment specific settings:  
Terminal window  
```  
> my-tool build --env=staging  
```
* `my-tool` generates a `dist` directory that contains both compiled code and a new generated deployment configuration file, containing only the settings for the given environment. It also creates a `.wrangler/deploy/config.json` file that redirects Wrangler to the new, generated deployment configuration file:  
   * dist \- index.js - wrangler.jsonc - .wrangler - deploy - config.json

The generated `dist/wrangler.jsonc` might contain:

```

{

  "name": "my-worker",

  "main": "./index.js",

  "vars": {

    "MY_VARIABLE": "staging variable"

  }

}


```

Now, the `main` property points to the generated code entry-point, no environment is defined, and the `MY_VARIABLE` variable is resolved to the staging environment value.

And the `.wrangler/deploy/config.json` contains the path to the generated configuration file:

```

{

  "configPath": "../../dist/wrangler.jsonc"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/configuration/#page","headline":"Configuration - Wrangler · Cloudflare Workers docs","description":"Use a configuration file to customize the development and deployment setup for your Worker project and other Developer Platform products.","url":"https://developers.cloudflare.com/workers/wrangler/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/configuration/","name":"Configuration"}}]}
```
