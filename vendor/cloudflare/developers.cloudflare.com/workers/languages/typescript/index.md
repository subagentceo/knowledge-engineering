---
title: TypeScript
description: Use TypeScript with fully typed APIs to build Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TypeScript

TypeScript is a first-class language on Cloudflare Workers. All APIs provided in Workers are fully typed, and type definitions are generated directly from [workerd ↗](https://github.com/cloudflare/workerd), the open-source Workers runtime.

We recommend you generate types for your Worker by running [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types). Cloudflare also publishes type definitions to [GitHub ↗](https://github.com/cloudflare/workers-types) and [npm ↗](https://www.npmjs.com/package/@cloudflare/workers-types) (`npm install -D @cloudflare/workers-types`).

### 

Generate types that match your Worker's configuration

Cloudflare continuously improves [workerd ↗](https://github.com/cloudflare/workerd), the open-source Workers runtime. Changes in workerd can introduce JavaScript API changes, thus changing the respective TypeScript types.

This means the correct types for your Worker depend on:

1. Your Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).
2. Your Worker's [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/).
3. Your Worker's bindings, which are defined in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration).
4. Any [module rules](https://developers.cloudflare.com/workers/wrangler/configuration/#bundling) you have specified in your Wrangler configuration file under `rules`.

For example, the runtime will only allow you to use the [AsyncLocalStorage ↗](https://nodejs.org/api/async%5Fcontext.html#class-asynclocalstorage) class if you have `compatibility_flags = ["nodejs_als"]` in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This should be reflected in the type definitions.

To ensure that your type definitions always match your Worker's configuration, you can dynamically generate types by running:

 npm  yarn  pnpm 

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

See [the wrangler types command docs](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) for more details.

Note

If you are running a version of Wrangler that is greater than `3.66.0` but below `4.0.0`, you will need to include the `--experimental-include-runtime` flag. During its experimental release, runtime types were output to a separate file (`.wrangler/types/runtime.d.ts` by default). If you have an older version of Wrangler, you can access runtime types through the `@cloudflare/workers-types` package.

This will generate a `d.ts` file and (by default) save it to `worker-configuration.d.ts`. This will include `Env` types based on your Worker bindings _and_ runtime types based on your Worker's compatibility date and flags.

You should then add that file to your `tsconfig.json`'s `compilerOptions.types` array. If you have the `nodejs_compat` compatibility flag, you should also install `@types/node`.

You can commit your types file to git if you wish.

Note

To ensure that your types are always up-to-date, make sure to run `wrangler types` after any changes to your config file.

### 

Migrating from `@cloudflare/workers-types` to `wrangler types`

We recommend you use `wrangler types` to generate runtime types, rather than using the `@cloudflare/workers-types` package, as it generates types based on your Worker's [compatibility date ↗](https://github.com/cloudflare/workerd/tree/main/npm/workers-types#compatibility-dates) and `compatibility flags`, ensuring that types match the exact runtime APIs made available to your Worker.

Note

There are no plans to stop publishing the `@cloudflare/workers-types` package, which will still be the recommended way to type libraries and shared packages in the workers environment.

#### 1\. Uninstall `@cloudflare/workers-types`

 npm  yarn  pnpm  bun 

```
npm uninstall @cloudflare/workers-types
```

```
yarn remove @cloudflare/workers-types
```

```
pnpm remove @cloudflare/workers-types
```

```
bun remove @cloudflare/workers-types
```

#### 2\. Generate runtime types using Wrangler

 npm  yarn  pnpm 

```
npx wrangler types
```

```
yarn wrangler types
```

```
pnpm wrangler types
```

This will generate a `.d.ts` file, saved to `worker-configuration.d.ts` by default. This will also generate `Env` types. If for some reason you do not want to include those, you can set `--include-env=false`.

You can now remove any imports from `@cloudflare/workers-types` in your Worker code.

Note

If you are running a version of Wrangler that is greater than `3.66.0` but below `4.0.0`, you will need to include the `--experimental-include-runtime` flag. During its experimental release, runtime types were output to a separate file (`.wrangler/types/runtime.d.ts` by default). If you have an older version of Wrangler, you can access runtime types through the `@cloudflare/workers-types` package.

#### 3\. Make sure your `tsconfig.json` includes the generated types

```

{

  "compilerOptions": {

    "types": ["./worker-configuration.d.ts"]

  }

}


```

Note that if you have specified a custom path for the runtime types file, you should use that in your `compilerOptions.types` array instead of the default path.

#### 4\. Add @types/node if you are using [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) (Optional)

If you are using the `nodejs_compat` compatibility flag, you should also install `@types/node`.

 npm  yarn  pnpm  bun 

```
npm i @types/node
```

```
yarn add @types/node
```

```
pnpm add @types/node
```

```
bun add @types/node
```

Then add this to your `tsconfig.json`.

```

{

  "compilerOptions": {

    "types": ["./worker-configuration.d.ts", "node"]

  }

}


```

#### 5\. Update your scripts and CI pipelines

Regardless of your specific framework or build tools, you should run the `wrangler types` command before any tasks that rely on TypeScript.

Most projects will have existing build and development scripts, as well as some type-checking. In the example below, we're adding the `wrangler types` before the type-checking script in the project:

```

{

  "scripts": {

    "dev": "existing-dev-command",

    "build": "existing-build-command",

    "generate-types": "wrangler types",

    "type-check": "generate-types && tsc"

  }

}


```

We recommend you commit your generated types file for use in CI. You can run `wrangler types` before other CI commands, as it should not take more than a few seconds. For example:

* [ npm ](#tab-panel-11832)
* [ yarn ](#tab-panel-11833)
* [ pnpm ](#tab-panel-11834)

YAML

```

- run: npm run generate-types

- run: npm run build

- run: npm test


```

YAML

```

- run: yarn generate-types

- run: yarn build

- run: yarn test


```

YAML

```

- run: pnpm run generate-types

- run: pnpm run build

- run: pnpm test


```

Alternatively, if you commit your generated types file and want to verify it stays up-to-date in CI, you can use the `--check` flag:

* [ npm ](#tab-panel-11835)
* [ yarn ](#tab-panel-11836)
* [ pnpm ](#tab-panel-11837)

YAML

```

- run: npx wrangler types --check

- run: npm run build

- run: npm test


```

YAML

```

- run: yarn wrangler types --check

- run: yarn build

- run: yarn test


```

YAML

```

- run: pnpm wrangler types --check

- run: pnpm run build

- run: pnpm test


```

This fails the CI job if the committed types file is out-of-date, prompting developers to regenerate and commit the updated types.

### Resources

* [TypeScript template ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/templates/hello-world/ts)
* [@cloudflare/workers-types ↗](https://github.com/cloudflare/workers-types)
* [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
* [TypeScript Examples](https://developers.cloudflare.com/workers/examples/?languages=TypeScript)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/languages/typescript/#page","headline":"Write Cloudflare Workers in TypeScript · Cloudflare Workers docs","description":"Use TypeScript with fully typed APIs to build Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/languages/typescript/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/languages/","name":"Languages"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/languages/typescript/","name":"TypeScript"}}]}
```
