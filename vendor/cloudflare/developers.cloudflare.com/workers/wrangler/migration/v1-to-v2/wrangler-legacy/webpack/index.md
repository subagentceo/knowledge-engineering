---
title: Webpack
description: Learn how to migrate from Wrangler v1 to v2 using webpack. This guide covers configuration, custom builds, and compatibility for Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Webpack

Warning

This page is for Wrangler v1, which has been deprecated.[Learn how to update to the latest version of Wrangler](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/).

Wrangler allows you to develop modern ES6 applications with support for modules. This support is possible because of Wrangler's [webpack ↗](https://webpack.js.org/) integration. This document describes how Wrangler uses webpack to build your Workers and how you can bring your own configuration.

Configuration and webpack version

Wrangler includes `webpack@4`. If you want to use `webpack@5`, or another bundler like esbuild or Rollup, you must set up [custom builds](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/configuration/#build) in your Wrangler file.

You must set `type = "webpack"` in your Wrangler file to use Wrangler's webpack integration. If you are encountering warnings about specifying `webpack_config`, refer to [backwards compatibility](#backwards-compatibility).

## Sensible defaults

This is the default webpack configuration that Wrangler uses to build your Worker:

JavaScript

```

module.exports = {

  target: "webworker",

  entry: "./index.js", // inferred from "main" in package.json

};


```

The `"main"` field in the `package.json` file determines the `entry` configuration value. When undefined or missing, `"main"` defaults to `index.js`, meaning that `entry` also defaults to `index.js`.

The default configuration sets `target` to `webworker`. This is the correct value because Cloudflare Workers are built to match the [Service Worker API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Service%5FWorker%5FAPI). Refer to the [webpack documentation ↗](https://webpack.js.org/concepts/targets/) for an explanation of this `target` value.

## Bring your own configuration

You can tell Wrangler to use a custom webpack configuration file by setting `webpack_config` in your Wrangler file. Always set `target` to `webworker`.

### Example

JavaScript

```

module.exports = {

  target: "webworker",

  entry: "./index.js",

  mode: "production",

};


```

* [  wrangler.jsonc ](#tab-panel-12983)
* [  wrangler.toml ](#tab-panel-12984)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "type": "webpack",

  "name": "my-worker",

  "account_id": "12345678901234567890",

  "workers_dev": true,

  "webpack_config": "webpack.config.js"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

type = "webpack"

name = "my-worker"

account_id = "12345678901234567890"

workers_dev = true

webpack_config = "webpack.config.js"


```

### Example with multiple environments

It is possible to use different webpack configuration files within different [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/). For example, the `"webpack.development.js"` configuration file is used during `wrangler dev` for development, but other, more production-ready configurations are used when building for the staging or production environments:

* [  wrangler.jsonc ](#tab-panel-12985)
* [  wrangler.toml ](#tab-panel-12986)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "type": "webpack",

  "name": "my-worker-dev",

  "account_id": "12345678901234567890",

  "workers_dev": true,

  "webpack_config": "webpack.development.js",

  "env": {

    "staging": {

      "name": "my-worker-staging",

      "webpack_config": "webpack.staging.js"

    },

    "production": {

      "name": "my-worker-production",

      "webpack_config": "webpack.production.js"

    }

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

type = "webpack"

name = "my-worker-dev"

account_id = "12345678901234567890"

workers_dev = true

webpack_config = "webpack.development.js"


[env.staging]

name = "my-worker-staging"

webpack_config = "webpack.staging.js"


[env.production]

name = "my-worker-production"

webpack_config = "webpack.production.js"


```

JavaScript

```

module.exports = {

  target: "webworker",

  devtool: "cheap-module-source-map", // avoid "eval": Workers environment doesn’t allow it

  entry: "./index.js",

  mode: "development",

};


```

JavaScript

```

module.exports = {

  target: "webworker",

  entry: "./index.js",

  mode: "production",

};


```

### Using with Workers Sites

Wrangler commands are run from the project root. Ensure your `entry` and `context` are set appropriately. For a project with structure:

```

.

├── public

│   ├── 404.html

│   └── index.html

├── workers-site

│   ├── index.js

│   ├── package-lock.json

│   ├── package.json

│   └── webpack.config.js

└── wrangler.toml


```

The corresponding `webpack.config.js` file should look like this:

JavaScript

```

module.exports = {

  context: __dirname,

  target: "webworker",

  entry: "./index.js",

  mode: "production",

};


```

## Shimming globals

When you want to bring your own implementation of an existing global API, you may [shim ↗](https://webpack.js.org/guides/shimming/#shimming-globals) a third-party module in its place as a webpack plugin.

For example, you may want to replace the `URL` global class with the `url-polyfill` npm package. After defining the package as a dependency in your `package.json` file and installing it, add a plugin entry to your webpack configuration.

### Example with webpack plugin

JavaScript

```

const webpack = require("webpack");


module.exports = {

  target: "webworker",

  entry: "./index.js",

  mode: "production",

  plugins: [

    new webpack.ProvidePlugin({

      URL: "url-polyfill",

    }),

  ],

};


```

## Backwards compatibility

If you are using `wrangler@1.6.0` or earlier, a `webpack.config.js` file at the root of your project is loaded automatically. This is not always obvious, which is why versions of Wrangler after `wrangler@1.6.0` require you to specify a `webpack_config` value in your Wrangler file.

When [upgrading from wrangler@1.6.0](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/install-update/), you may encounter webpack configuration warnings. To resolve this, add `webpack_config = "webpack.config.js"` to your Wrangler file.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/#page","headline":"Webpack · Cloudflare Workers docs","description":"Learn how to migrate from Wrangler v1 to v2 using webpack. This guide covers configuration, custom builds, and compatibility for Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/migration/","name":"Migrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/","name":"Migrate from Wrangler v1 to v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/","name":"Wrangler v1 (legacy)"}},{"@type":"ListItem","position":7,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/wrangler-legacy/webpack/","name":"Webpack"}}]}
```
