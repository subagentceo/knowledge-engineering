---
title: 1. Migrate webpack projects
description: Migrate webpack-based Workers projects from Wrangler v1 to v2 by ejecting your bundler configuration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 1\. Migrate webpack projects

This guide describes the steps to migrate a webpack project from Wrangler v1 to Wrangler v2\. After completing this guide, [update your Wrangler version](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/update-v1-to-v2/).

Previous versions of Wrangler offered rudimentary support for [webpack ↗](https://webpack.js.org/) with the `type` and `webpack_config` keys in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). Starting with Wrangler v2, Wrangler no longer supports the `type` and `webpack_config` keys, but you can still use webpack with your Workers.

As a developer using webpack with Workers, you may be in one of four categories:

1. [I use \[build\] to run webpack (or another bundler) external to wrangler.](#i-use-build-to-run-webpack-or-another-bundler-external-to-wrangler).
2. [I use type = webpack, but do not provide my own configuration and let Wrangler take care of it.](#i-use-type--webpack-but-do-not-provide-my-own-configuration-and-let-wrangler-take-care-of-it).
3. [I use type = webpack and webpack\_config = <path/to/webpack.config.js> to handle JSX, TypeScript, WebAssembly, HTML files, and other non-standard filetypes.](#i-use-type--webpack-and-webpack%5Fconfig--pathtowebpackconfigjs-to-handle-jsx-typescript-webassembly-html-files-and-other-non-standard-filetypes).
4. [I use type = webpack and webpack\_config = <path/to/webpack.config.js> to perform code-transforms and/or other code-modifying functionality.](#i-use-type--webpack-and-webpack%5Fconfig--pathtowebpackconfigjs-to-perform-code-transforms-andor-other-code-modifying-functionality).

If you do not see yourself represented, [file an issue ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose) and we can assist you with your specific situation and improve this guide for future readers.

### I use `[build]` to run webpack (or another bundler) external to Wrangler.

Wrangler v2 supports the `[build]` key, so your Workers will continue to build using your own setup.

### I use `type = webpack`, but do not provide my own configuration and let Wrangler take care of it.

Wrangler will continue to take care of it. Remove `type = webpack` from your Wrangler file.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to handle JSX, TypeScript, WebAssembly, HTML files, and other non-standard filetypes.

As of Wrangler v2, Wrangler has built-in support for this use case. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/) for more details.

The Workers runtime handles JSX and TypeScript. You can `import` any modules you need into your code and the Workers runtime includes them in the built Worker automatically.

You should remove the `type` and `webpack_config` keys from your Wrangler file.

### I use `type = webpack` and `webpack_config = <path/to/webpack.config.js>` to perform code-transforms and/or other code-modifying functionality.

Wrangler v2 drops support for project types, including `type = webpack` and configuration via the `webpack_config` key. If your webpack configuration performs operations beyond adding loaders (for example, for TypeScript) you will need to maintain your custom webpack configuration. In the long term, you should [migrate to an external \[build\] process](https://developers.cloudflare.com/workers/wrangler/custom-builds/). In the short term, it is still possible to reproduce Wrangler v1's build steps in newer versions of Wrangler by following the instructions below.

1. Add [wranglerjs-compat-webpack-plugin ↗](https://www.npmjs.com/package/wranglerjs-compat-webpack-plugin) as a `devDependency`.

[wrangler-js ↗](https://www.npmjs.com/package/wrangler-js), shipped as a separate library from [Wrangler v1 ↗](https://www.npmjs.com/package/@cloudflare/wrangler/v/1.19.11), is a Node script that configures and executes [webpack 4 ↗](https://unpkg.com/browse/wrangler-js@0.1.11/package.json) for you. When you set `type = webpack`, Wrangler v1 would execute this script for you. We have ported the functionality over to a new package, [wranglerjs-compat-webpack-plugin ↗](https://www.npmjs.com/package/wranglerjs-compat-webpack-plugin), which you can use as a [webpack plugin ↗](https://v4.webpack.js.org/configuration/plugins/).

To do that, you will need to add it as a dependency:

 npm  yarn  pnpm  bun 

```
npm i -D webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

```
yarn add -D webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

```
pnpm add -D webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

```
bun add -d webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin
```

You should see this reflected in your `package.json` file:

```

{

  "name": "my-worker",

  "version": "x.y.z",

  // ...

  "devDependencies": {

    // ...

    "wranglerjs-compat-webpack-plugin": "^x.y.z",

    "webpack": "^4.46.0",

    "webpack-cli": "^x.y.z"

  }

}


```

1. Add `wranglerjs-compat-webpack-plugin` to `webpack.config.js`.

Modify your `webpack.config.js` file to include the plugin you just installed.

JavaScript

```

const {

  WranglerJsCompatWebpackPlugin,

} = require("wranglerjs-compat-webpack-plugin");


module.exports = {

  // ...

  plugins: [new WranglerJsCompatWebpackPlugin()],

};


```

1. Add a build script your `package.json`.

```

{

  "name": "my-worker",

  "version": "2.0.0",

  // ...

  "scripts": {

    "build": "webpack" // <-- Add this line!

    // ...

  }

}


```

1. Remove unsupported entries from your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

Remove the `type` and `webpack_config` keys from your Wrangler file, as they are not supported anymore.

* [  wrangler.jsonc ](#tab-panel-12945)
* [  wrangler.toml ](#tab-panel-12946)

JSONC

```

{

  // Remove these!

  "type": "webpack",

  "webpack_config": "webpack.config.js"

}


```

TOML

```

type = "webpack"

webpack_config = "webpack.config.js"


```

1. Tell Wrangler how to bundle your Worker.

Wrangler no longer has any knowledge of how to build your Worker. You will need to tell it how to call webpack and where to look for webpack's output. This translates into two fields:

* [  wrangler.jsonc ](#tab-panel-12947)
* [  wrangler.toml ](#tab-panel-12948)

JSONC

```

{

  "main": "./worker/script.js", // by default, or whatever file webpack outputs

  "build": {

    "command": "npm run build" // or "yarn build"

  }

}


```

TOML

```

main = "./worker/script.js"


[build]

command = "npm run build"


```

1. Test your project.

Try running `npx wrangler deploy` to test that your configuration works as expected.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/eject-webpack/#page","headline":"1. Migrate webpack projects · Cloudflare Workers docs","description":"Migrate webpack-based Workers projects from Wrangler v1 to v2 by ejecting your bundler configuration.","url":"https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/eject-webpack/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/migration/","name":"Migrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/","name":"Migrate from Wrangler v1 to v2"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/wrangler/migration/v1-to-v2/eject-webpack/","name":"1. Migrate webpack projects"}}]}
```
