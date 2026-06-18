---
title: Configuration
description: Learn how to configure your Cloudflare Worker using Wrangler v1. This guide covers top-level and environment-specific settings, key types, and deployment options.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configuration

Warning

This page is for Wrangler v1, which has been deprecated.[Learn how to update to the latest version of Wrangler](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/).

## Background

Your project will need some configuration before you can publish your Worker. Configuration is done through changes to keys and values stored in a Wrangler file located in the root of your project directory. You must manually edit this file to edit your keys and values before you can publish.

---

## Environments

The top-level configuration is the collection of values you specify at the top of your Wrangler file. These values will be inherited by all environments, unless otherwise defined in the environment.

The layout of a top-level configuration in a Wrangler file is displayed below:

* [  wrangler.jsonc ](#tab-panel-12957)
* [  wrangler.toml ](#tab-panel-12958)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "your-worker",

  "type": "javascript",

  "account_id": "your-account-id",

  // This field specifies that the Worker

  // will be deployed to a *.workers.dev domain

  "workers_dev": true,

  // -- OR --

  // These fields specify that the Worker

  // will deploy to a custom domain

  "zone_id": "your-zone-id",

  "routes": [

    "example.com/*"

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "your-worker"

type = "javascript"

account_id = "your-account-id"

workers_dev = true

zone_id = "your-zone-id"

routes = [ "example.com/*" ]


```

Environment configuration (optional): the configuration values you specify under an `[env.name]` in your Wrangler file.

Environments allow you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the [commands](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/commands/) that are deploying live Workers:

* `build`
* `dev`
* `preview`
* `publish`
* `secret`

Some environment properties can be [_inherited_](#keys) from the top-level configuration, but if new values are configured in an environment, they will always override those at the top level.

An example of an `[env.name]` configuration looks like this:

* [  wrangler.jsonc ](#tab-panel-12977)
* [  wrangler.toml ](#tab-panel-12978)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "type": "javascript",

  "name": "your-worker",

  "account_id": "your-account-id",

  "vars": {

    "FOO": "default FOO value",

    "BAR": "default BAR value"

  },

  "kv_namespaces": [

    {

      "binding": "FOO",

      "id": "1a...",

      "preview_id": "1b..."

    }

  ],

  "env": {

    "helloworld": {

      // Now adding configuration keys for the "helloworld" environment.

      // These new values will override the top-level configuration.

      "name": "your-worker-helloworld",

      "account_id": "your-other-account-id",

      "vars": {

        "FOO": "env-helloworld FOO value",

        "BAR": "env-helloworld BAR value"

      },

      "kv_namespaces": [

        {

          // Redeclare kv namespace bindings for each environment

          // NOTE: In this case, passing new IDs because new `account_id` value.

          "binding": "FOO",

          "id": "888...",

          "preview_id": "999..."

        }

      ]

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

type = "javascript"

name = "your-worker"

account_id = "your-account-id"


[vars]

FOO = "default FOO value"

BAR = "default BAR value"


[[kv_namespaces]]

binding = "FOO"

id = "1a..."

preview_id = "1b..."


[env.helloworld]

name = "your-worker-helloworld"

account_id = "your-other-account-id"


  [env.helloworld.vars]

  FOO = "env-helloworld FOO value"

  BAR = "env-helloworld BAR value"


  [[env.helloworld.kv_namespaces]]

  binding = "FOO"

  id = "888..."

  preview_id = "999..."


```

To deploy this example Worker to the `helloworld` environment, you would run `wrangler deploy --env helloworld`.

---

## Keys

There are three types of keys in a Wrangler file:

* Top level only keys are required to be configured at the top level of your Wrangler file only; multiple environments on the same project must share this key's value.
* Inherited keys can be configured at the top level and/or environment. If the key is defined only at the top level, the environment will use the key's value from the top level. If the key is defined in the environment, the environment value will override the top-level value.
* Non-inherited keys must be defined for every environment individually.
* `name` inherited required  
   * The name of your Worker script. If inherited, your environment name will be appended to the top level.
* `type` top level required  
   * Specifies how `wrangler build` will build your project. There are three options: `javascript`, `webpack`, and `rust`. `javascript` checks for a build command specified in the `[build]` section, `webpack` builds your project using webpack v4, and `rust` compiles the Rust in your project to WebAssembly.

Note

Cloudflare will continue to support `rust` and `webpack` project types, but recommends using the `javascript` project type and specifying a custom [build](#build) section.

* `account_id` inherited required  
   * This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.
* `zone_id` inherited optional  
   * This is the ID of the zone or domain you want to run your Worker on. It can also be specified through the `CF_ZONE_ID` environment variable. This key is optional if you are using only a `*.workers.dev` subdomain.
* `workers_dev` inherited optional  
   * This is a boolean flag that specifies if your Worker will be deployed to your [\*.workers.dev ↗](https://workers.dev) subdomain. If omitted, it defaults to false.
* `route` not inherited optional  
   * A route, specified by URL pattern, on your zone that you would like to run your Worker on.  
   `route = "http://example.com/*"`. A `route` OR `routes` key is only required if you are not using a [\*.workers.dev ↗](https://workers.dev) subdomain.
* `routes` not inherited optional  
   * A list of routes you would like to use your Worker on. These follow exactly the same rules a `route`, but you can specify a list of them.  
   `routes = ["http://example.com/hello", "http://example.com/goodbye"]`. A `route` OR `routes` key is only required if you are not using a `*.workers.dev` subdomain.
* `webpack_config` inherited optional  
   * This is the path to a custom webpack configuration file for your Worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. Refer to the [Wrangler webpack page](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/eject-webpack/) for more information.
* `vars` not inherited optional  
   * An object containing text variables that can be directly accessed in a Worker script.
* `kv_namespaces` not inherited optional  
   * These specify any [Workers KV](#kv%5Fnamespaces) Namespaces you want to access from inside your Worker.
* `site` inherited optional  
   * Determines the local folder to upload and serve from a Worker.
* `dev` not inherited optional  
   * Arguments for `wrangler dev` that configure local server.
* `triggers` inherited optional  
   * Configures cron triggers for running a Worker on a schedule.
* `usage_model` inherited optional  
   * Specifies the [Usage Model](https://developers.cloudflare.com/workers/platform/pricing/#workers) for your Worker. There are two options - [bundled](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) and [unbound](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits). For newly created Workers, if the Usage Model is omitted it will be set to the [default Usage Model set on the account ↗](https://dash.cloudflare.com/?account=workers/default-usage-model). For existing Workers, if the Usage Model is omitted, it will be set to the Usage Model configured in the dashboard for that Worker.
* `build` top level optional  
   * Configures a custom build step to be run by Wrangler when building your Worker. Refer to the [custom builds documentation](#build) for more details.

### vars

The `vars` key defines a table of [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) provided to your Worker script. All values are plaintext values.

Usage:

* [  wrangler.jsonc ](#tab-panel-12953)
* [  wrangler.toml ](#tab-panel-12954)

JSONC

```

{

  "vars": {

    "FOO": "some value",

    "BAR": "some other string"

  }

}


```

TOML

```

[vars]

FOO = "some value"

BAR = "some other string"


```

The table keys are available to your Worker as global variables, which will contain their associated values.

JavaScript

```

// Worker code:

console.log(FOO);

//=> "some value"


console.log(BAR);

//=> "some other string"


```

Alternatively, you can define `vars` using an inline table format. This style should not include any new lines to be considered a valid TOML configuration:

* [  wrangler.jsonc ](#tab-panel-12955)
* [  wrangler.toml ](#tab-panel-12956)

JSONC

```

{

  "vars": {

    "FOO": "some value",

    "BAR": "some other string"

  }

}


```

TOML

```

[vars]

FOO = "some value"

BAR = "some other string"


```

Note

Secrets should be handled using the [wrangler secret](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command.

### kv\_namespaces

`kv_namespaces` defines a list of KV namespace bindings for your Worker.

Usage:

* [  wrangler.jsonc ](#tab-panel-12961)
* [  wrangler.toml ](#tab-panel-12962)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "FOO",

      "id": "0f2ac74b498b48028cb68387c421e279",

      "preview_id": "6a1ddb03f3ec250963f0a1e46820076f"

    },

    {

      "binding": "BAR",

      "id": "068c101e168d03c65bddf4ba75150fb0",

      "preview_id": "fb69528dbc7336525313f2e8c3b17db0"

    }

  ]

}


```

TOML

```

[[kv_namespaces]]

binding = "FOO"

id = "0f2ac74b498b48028cb68387c421e279"

preview_id = "6a1ddb03f3ec250963f0a1e46820076f"


[[kv_namespaces]]

binding = "BAR"

id = "068c101e168d03c65bddf4ba75150fb0"

preview_id = "fb69528dbc7336525313f2e8c3b17db0"


```

Alternatively, you can define `kv namespaces` like so:

* [  wrangler.jsonc ](#tab-panel-12965)
* [  wrangler.toml ](#tab-panel-12966)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "FOO",

      "preview_id": "abc456",

      "id": "abc123"

    },

    {

      "binding": "BAR",

      "preview_id": "xyz456",

      "id": "xyz123"

    }

  ]

}


```

TOML

```

[[kv_namespaces]]

binding = "FOO"

preview_id = "abc456"

id = "abc123"


[[kv_namespaces]]

binding = "BAR"

preview_id = "xyz456"

id = "xyz123"


```

Much like environment variables and secrets, the `binding` names are available to your Worker as global variables.

JavaScript

```

// Worker script:


let value = await FOO.get("keyname");

//=> gets the value for "keyname" from

//=> the FOO variable, which points to

//=> the "0f2ac...e279" KV namespace


```

* `binding` required  
   * The name of the global variable your code will reference. It will be provided as a [KV runtime instance](https://developers.cloudflare.com/kv/api/).
* `id` required  
   * The ID of the KV namespace that your `binding` should represent. Required for `wrangler publish`.
* `preview_id` required  
   * The ID of the KV namespace that your `binding` should represent during `wrangler dev` or `wrangler preview`. Required for `wrangler dev` and `wrangler preview`.

Note

Creating your KV namespaces can be handled using Wrangler’s [KV Commands](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/commands/#kv).

You can also define your `kv_namespaces` using an [alternative TOML syntax ↗](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-table).

### site

A [Workers Site](https://developers.cloudflare.com/workers/configuration/sites/start-from-scratch) generated with [wrangler generate --site](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/commands/#generate) or [wrangler init --site](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/commands/#init).

Usage:

* [  wrangler.jsonc ](#tab-panel-12959)
* [  wrangler.toml ](#tab-panel-12960)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "entry-point": "workers-site"

  }

}


```

TOML

```

[site]

bucket = "./public"

entry-point = "workers-site"


```

* `bucket` required  
   * The directory containing your static assets. It must be a path relative to your Wrangler file. Example: `bucket = "./public"`
* `entry-point` optional  
   * The location of your Worker script. The default location is `workers-site`. Example: `entry-point = "./workers-site"`
* `include` optional  
   * An exclusive list of `.gitignore`\-style patterns that match file or directory names from your `bucket` location. Only matched items will be uploaded. Example: `include = ["upload_dir"]`
* `exclude` optional  
   * A list of `.gitignore`\-style patterns that match files or directories in your `bucket` that should be excluded from uploads. Example: `exclude = ["ignore_dir"]`

You can also define your `site` using an [alternative TOML syntax ↗](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-inline-table).

#### Storage Limits

For exceptionally large pages, Workers Sites may not be ideal. There is a 25 MiB limit per page or file. Additionally, Wrangler will create an asset manifest for your files that will count towards your script’s size limit. If you have too many files, you may not be able to use Workers Sites.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, add an `include` field to your`[site]` section of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-12963)
* [  wrangler.toml ](#tab-panel-12964)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "entry-point": "workers-site",

    "include": [ // must be an array.

      "included_dir"

    ]

  }

}


```

TOML

```

[site]

bucket = "./public"

entry-point = "workers-site"

include = [ "included_dir" ]


```

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, add an `exclude` field to your `[site]` section of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-12967)
* [  wrangler.toml ](#tab-panel-12968)

JSONC

```

{

  "site": {

    "bucket": "./public",

    "entry-point": "workers-site",

    "exclude": [ // must be an array.

      "excluded_dir"

    ]

  }

}


```

TOML

```

[site]

bucket = "./public"

entry-point = "workers-site"

exclude = [ "excluded_dir" ]


```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

#### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

#### Default ignored entries

Wrangler will always ignore:

* `node_modules`
* Hidden files and directories
* Symlinks

#### More about include/exclude patterns

Refer to the [gitignore documentation ↗](https://git-scm.com/docs/gitignore) to learn more about the standard matching patterns.

#### Customizing your Sites Build

Workers Sites projects use webpack by default. Though you can [bring your own webpack configuration](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/eject-webpack/), be aware of your `entry` and `context` settings.

You can also use the `[build]` section with Workers Sites, as long as your build step will resolve dependencies in `node_modules`. Refer to the [custom builds](#build) section for more information.

### triggers

A set of cron triggers used to call a Worker on a schedule.

Usage:

* [  wrangler.jsonc ](#tab-panel-12969)
* [  wrangler.toml ](#tab-panel-12970)

JSONC

```

{

  "triggers": {

    "crons": [

      "0 0 * JAN-JUN FRI",

      "0 0 LW JUL-DEC *"

    ]

  }

}


```

TOML

```

[triggers]

crons = [ "0 0 * JAN-JUN FRI", "0 0 LW JUL-DEC *" ]


```

* `crons` optional  
   * A set of [cron expressions ↗](https://crontab.guru/), where each expression is a separate schedule to run the Worker on.

### dev

Arguments for `wrangler dev` can be configured here so you do not have to repeatedly pass them.

Usage:

* [  wrangler.jsonc ](#tab-panel-12971)
* [  wrangler.toml ](#tab-panel-12972)

JSONC

```

{

  "dev": {

    "port": 9000,

    "local_protocol": "https"

  }

}


```

TOML

```

[dev]

port = 9_000

local_protocol = "https"


```

* `ip` optional  
   * IP address for the local `wrangler dev` server to listen on, defaults to `127.0.0.1`.
* `port` optional  
   * Port for local `wrangler dev` server to listen on, defaults to `8787`.
* `local_protocol` optional  
   * Protocol that local `wrangler dev` server listen to requests on, defaults to `http`.
* `upstream_protocol` optional  
   * Protocol that `wrangler dev` forwards requests on, defaults to `https`.

### build

A custom build command for your project. There are two configurations based on the format of your Worker: `service-worker` and `modules`.

#### Service Workers

Service Workers are deprecated

Service Workers are deprecated, but still supported. We recommend using [Module Workers](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) instead. New features may not be supported for Service Workers.

This section is for customizing Workers with the `service-worker` format. These Workers use `addEventListener` and look like the following:

JavaScript

```

addEventListener("fetch", (event) => {

  event.respondWith(new Response("I'm a service Worker!"));

});


```

Usage:

* [  wrangler.jsonc ](#tab-panel-12973)
* [  wrangler.toml ](#tab-panel-12974)

JSONC

```

{

  "build": {

    "command": "npm install && npm run build",

    "upload": {

      "format": "service-worker"

    }

  }

}


```

TOML

```

[build]

command = "npm install && npm run build"


  [build.upload]

  format = "service-worker"


```

##### `[build]`

* `command` optional  
   * The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.
* `cwd` optional  
   * The working directory for commands, defaults to the project root directory.
* `watch_dir` optional  
   * The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

##### `[build.upload]`

* `format` required  
   * The format of the Worker script, must be `"service-worker"`.

Note

Ensure the `main` field in your `package.json` references the Worker you want to publish.

#### Modules

Workers now supports the ES Modules syntax. This format allows you to export a collection of files and/or modules, unlike the Service Worker format which requires a single file to be uploaded.

Module Workers `export` their event handlers instead of using `addEventListener` calls.

Modules receive all bindings (KV Namespaces, Environment Variables, and Secrets) as arguments to the exported handlers. With the Service Worker format, these bindings are available as global variables.

Note

Refer to the [fetch() handler documentation](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch) to learn more about the differences between the Service Worker and Module worker formats.

An uploaded module may `import` other uploaded ES Modules. If using the CommonJS format, you may `require` other uploaded CommonJS modules.

JavaScript

```

import html from "./index.html";


export default {

  // * request is the same as `event.request` from the service worker format

  // * waitUntil() and passThroughOnException() are accessible from `ctx` instead of `event` from the service worker format

  // * env is where bindings like KV namespaces, Durable Object namespaces, Config variables, and Secrets

  // are exposed, instead of them being placed in global scope.

  async fetch(request, env, ctx) {

    const headers = { "Content-Type": "text/html;charset=UTF-8" };

    return new Response(html, { headers });

  },

};


```

To create a Workers project using Wrangler and Modules, add a `[build]` section:

* [  wrangler.jsonc ](#tab-panel-12975)
* [  wrangler.toml ](#tab-panel-12976)

JSONC

```

{

  "build": {

    "command": "npm install && npm run build",

    "upload": {

      "format": "modules",

      "main": "./worker.mjs"

    }

  }

}


```

TOML

```

[build]

command = "npm install && npm run build"


  [build.upload]

  format = "modules"

  main = "./worker.mjs"


```

##### `[build]`

* `command` optional  
   * The command used to build your Worker. On Linux and macOS system, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.
* `cwd` optional  
   * The working directory for commands, defaults to the project root directory.
* `watch_dir` optional  
   * The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

##### `[build.upload]`

* `format` required  
   * The format of the Workers script, must be `"modules"`.
* `dir` optional  
   * The directory you wish to upload your modules from, defaults to the `dist` relative to the project root directory.
* `main` required  
   * The relative path of the main module from `dir`, including the `./` prefix. The main module must be an ES module. For projects with a build script, this usually refers to the output of your JavaScript bundler.

Note

If your project is written using CommonJS modules, you will need to re-export your handlers and Durable Object classes using an ES module shim. Refer to the [modules-webpack-commonjs ↗](https://github.com/cloudflare/modules-webpack-commonjs) template as an example.

* `rules` optional  
   * An ordered list of rules that define which modules to import, and what type to import them as. You will need to specify rules to use Text, Data, and CompiledWasm modules, or when you wish to have a `.js` file be treated as an `ESModule` instead of `CommonJS`.

Defaults:

* [  wrangler.jsonc ](#tab-panel-12979)
* [  wrangler.toml ](#tab-panel-12980)

JSONC

```

{

  // You do not need to include these default rules in your [Wrangler configuration file](/workers/wrangler/configuration/), they are implicit.

  // The default rules are treated as the last two rules in the list.

  "build": {

    "upload": {

      "format": "modules",

      "main": "./worker.mjs",

      "rules": [

        {

          "type": "ESModule",

          "globs": [

            "**/*.mjs"

          ]

        },

        {

          "type": "CommonJS",

          "globs": [

            "**/*.js",

            "**/*.cjs"

          ]

        }

      ]

    }

  }

}


```

TOML

```

[build.upload]

format = "modules"

main = "./worker.mjs"


  [[build.upload.rules]]

  type = "ESModule"

  globs = [ "**/*.mjs" ]


  [[build.upload.rules]]

  type = "CommonJS"

  globs = [ "**/*.js", "**/*.cjs" ]


```

* `type` required  
   * The module type, see the table below for acceptable options:
* `globs` required  
   * UNIX-style [glob rules ↗](https://docs.rs/globset/0.4.6/globset/#syntax) that are used to determine the module type to use for a given file in `dir`. Globs are matched against the module's relative path from `build.upload.dir` without the `./` prefix. Rules are evaluated in order, starting at the top.
* `fallthrough` optional  
   * This option allows further rules for this module type to be considered if set to true. If not specified or set to false, further rules for this module type will be ignored.

---

## Example

To illustrate how these levels are applied, here is a Wrangler file using multiple environments:

* [  wrangler.jsonc ](#tab-panel-12981)
* [  wrangler.toml ](#tab-panel-12982)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // top level configuration

  "type": "javascript",

  "name": "my-worker-dev",

  "account_id": "12345678901234567890",

  "zone_id": "09876543210987654321",

  "route": "dev.example.com/*",

  "usage_model": "unbound",

  "kv_namespaces": [

    {

      "binding": "FOO",

      "id": "b941aabb520e61dcaaeaa64b4d8f8358",

      "preview_id": "03c8c8dd3b032b0528f6547d0e1a83f3"

    },

    {

      "binding": "BAR",

      "id": "90e6f6abd5b4f981c748c532844461ae",

      "preview_id": "e5011a026c5032c09af62c55ecc3f438"

    }

  ],

  "build": {

    "command": "webpack",

    "upload": {

      "format": "service-worker"

    }

  },

  "site": {

    "bucket": "./public",

    "entry-point": "workers-site"

  },

  "dev": {

    "ip": "0.0.0.0",

    "port": 9000,

    "local_protocol": "http",

    "upstream_protocol": "https"

  },

  "env": {

    // environment configuration

    "staging": {

      "name": "my-worker-staging",

      "route": "staging.example.com/*",

      "kv_namespaces": [

        {

          "binding": "FOO",

          "id": "0f2ac74b498b48028cb68387c421e279"

        },

        {

          "binding": "BAR",

          "id": "068c101e168d03c65bddf4ba75150fb0"

        }

      ]

    },

    // environment configuration

    "production": {

      "workers_dev": true,

      "kv_namespaces": [

        {

          "binding": "FOO",

          "id": "0d2ac74b498b48028cb68387c421e233"

        },

        {

          "binding": "BAR",

          "id": "0d8c101e168d03c65bddf4ba75150f33"

        }

      ]

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

type = "javascript"

name = "my-worker-dev"

account_id = "12345678901234567890"

zone_id = "09876543210987654321"

route = "dev.example.com/*"

usage_model = "unbound"


[[kv_namespaces]]

binding = "FOO"

id = "b941aabb520e61dcaaeaa64b4d8f8358"

preview_id = "03c8c8dd3b032b0528f6547d0e1a83f3"


[[kv_namespaces]]

binding = "BAR"

id = "90e6f6abd5b4f981c748c532844461ae"

preview_id = "e5011a026c5032c09af62c55ecc3f438"


[build]

command = "webpack"


  [build.upload]

  format = "service-worker"


[site]

bucket = "./public"

entry-point = "workers-site"


[dev]

ip = "0.0.0.0"

port = 9_000

local_protocol = "http"

upstream_protocol = "https"


[env.staging]

name = "my-worker-staging"

route = "staging.example.com/*"


  [[env.staging.kv_namespaces]]

  binding = "FOO"

  id = "0f2ac74b498b48028cb68387c421e279"


  [[env.staging.kv_namespaces]]

  binding = "BAR"

  id = "068c101e168d03c65bddf4ba75150fb0"


[env.production]

workers_dev = true


  [[env.production.kv_namespaces]]

  binding = "FOO"

  id = "0d2ac74b498b48028cb68387c421e233"


  [[env.production.kv_namespaces]]

  binding = "BAR"

  id = "0d8c101e168d03c65bddf4ba75150f33"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/configuration/#page","headline":"Configuration - Wrangler v1 (deprecated) · Cloudflare Workers docs","description":"Learn how to configure your Cloudflare Worker using Wrangler v1. This guide covers top-level and environment-specific settings, key types, and deployment options.","url":"https://developers.cloudflare.com/workers/wrangler/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/migration/","name":"Migrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/","name":"Migrate from Wrangler v1 to v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/","name":"Wrangler v1 (legacy)"}},{"@type":"ListItem","position":7,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/configuration/","name":"Configuration"}}]}
```
