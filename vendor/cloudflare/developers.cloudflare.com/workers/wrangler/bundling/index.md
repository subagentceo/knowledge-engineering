---
title: Bundling
description: Review Wrangler's default bundling.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bundling

By default, Wrangler bundles your Worker code using [esbuild ↗](https://esbuild.github.io/). This means that Wrangler has built-in support for importing modules from [npm ↗](https://www.npmjs.com/) defined in your `package.json`. To review the exact code that Wrangler will upload to Cloudflare, run `npx wrangler deploy --dry-run --outdir dist`, which will show your Worker code after Wrangler's bundling.

`esbuild` version

Wrangler uses `esbuild`. We periodically update the `esbuild` version included with Wrangler, and since `esbuild` is a pre-1.0.0 tool, this may sometimes include breaking changes to how bundling works. In particular, we may bump the `esbuild` version in a Wrangler minor version.

Note

Wrangler's inbuilt bundling usually provides the best experience, but we understand there are cases where you will need more flexibility. You can provide `rules` and set `find_additional_modules` in your configuration to control which files are included in the deployed Worker but not bundled into the entry-point file. Furthermore, we have an escape hatch in the form of [Custom Builds](https://developers.cloudflare.com/workers/wrangler/custom-builds/), which lets you run your own build before Wrangler's built-in one.

## Including non-JavaScript modules

Bundling your Worker code takes multiple modules and bundles them into one file. Sometimes, you might have modules that cannot be inlined directly into the bundle. For example, instead of bundling a Wasm file into your JavaScript Worker, you would want to upload the Wasm file as a separate module that can be imported at runtime. Wrangler supports this by default for the following file types:

| Module extension    | Imported type      |
| ------------------- | ------------------ |
| .txt                | string             |
| .html               | string             |
| .sql                | string             |
| .bin                | ArrayBuffer        |
| .wasm, .wasm?module | WebAssembly.Module |

Refer to [Bundling configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling) to customize these file types.

For example, with the following import, `text` will be a string containing the contents of `example.txt`:

JavaScript

```

import text from "./example.txt";


```

This is also the basis for importing Wasm, as in the following example:

TypeScript

```

import wasm from "./example.wasm";


// Instantiate Wasm modules in the module scope

const instance = await WebAssembly.instantiate(wasm);


export default {

  fetch() {

    const result = instance.exports.exported_func();


    return new Response(result);

  },

};


```

Note

Cloudflare Workers does not support `WebAssembly.instantiateStreaming()`.

## Find additional modules

By setting `find_additional_modules` to `true` in your configuration file, Wrangler will traverse the file tree below `base_dir`. Any files that match the `rules` you define will also be included as unbundled, external modules in the deployed Worker.

This approach is useful for supporting lazy loading of large or dynamically imported JavaScript files:

* Normally, a large lazy-imported file (for example, `await import("./large-dep.mjs")`) would be bundled directly into your entrypoint, reducing the effectiveness of the lazy loading. If matching rule is added to `rules`, then this file would only be loaded and executed at runtime when it is actually imported.
* Previously, variable based dynamic imports (for example, `` await import(`./lang/${language}.mjs`) ``) would always fail at runtime because Wrangler had no way of knowing which modules to include in the upload. Providing a rule that matches all these files, such as `{ "type": "EsModule", "globs": ["./lang/**/*.mjs"], "fallthrough": true }`, will ensure this module is available at runtime.
* "Partial bundling" is supported when `find_additional_modules` is `true`, and a source file matches one of the configured `rules`, since Wrangler will then treat it as "external" and not try to bundle it into the entry-point file.

## `NODE_ENV`

`process.env.NODE_ENV` is statically replaced at build time with one of the following values:

| Context                           | Value         |
| --------------------------------- | ------------- |
| wrangler dev                      | "development" |
| wrangler deploy or wrangler build | "production"  |

You can use `process.env.NODE_ENV` to conditionally run code based on the build context:

TypeScript

```

if (process.env.NODE_ENV === "development") {

  console.log("Running in development mode");

}


```

Because `process.env.NODE_ENV` is replaced at build time, development only code can be removed from the production bundle.

You can override the default value by setting the `NODE_ENV` environment variable when running the command:

 npm  yarn  pnpm 

```
NODE_ENV=staging npx wrangler dev
```

```
NODE_ENV=staging yarn wrangler dev
```

```
NODE_ENV=staging pnpm wrangler dev
```

## Conditional exports

Wrangler respects the [conditional exports field ↗](https://nodejs.org/api/packages.html#conditional-exports) in `package.json`. This allows developers to implement isomorphic libraries that have different implementations depending on the JavaScript runtime they are running in. When bundling, Wrangler will try to load the [workerd key ↗](https://runtime-keys.proposal.wintercg.org/#workerd). Refer to the Wrangler repository for [an example isomorphic package ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/isomorphic-random-example).

## Disable bundling

Warning

Disabling bundling is not recommended in most scenarios. Use this option only when deploying code pre-processed by other tooling.

If your build tooling already produces build artifacts suitable for direct deployment to Cloudflare, you can opt out of bundling by using the `--no-bundle` command line flag: `npx wrangler deploy --no-bundle`. If you opt out of bundling, Wrangler will not process your code and some features introduced by Wrangler bundling (for example minification, and polyfills injection) will not be available.

Use [Custom Builds](https://developers.cloudflare.com/workers/wrangler/custom-builds/) to customize what Wrangler will bundle and upload to the Cloudflare global network when you use [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

## Generated Wrangler configuration

Some framework tools, or custom pre-build processes, generate a modified Wrangler configuration to be used to deploy the Worker code. It is possible for Wrangler to automatically use this generated configuration rather than the original, user's configuration.

See [Generated Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#generated-wrangler-configuration) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/bundling/#page","headline":"Bundling · Cloudflare Workers docs","description":"Review Wrangler's default bundling.","url":"https://developers.cloudflare.com/workers/wrangler/bundling/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/bundling/","name":"Bundling"}}]}
```
