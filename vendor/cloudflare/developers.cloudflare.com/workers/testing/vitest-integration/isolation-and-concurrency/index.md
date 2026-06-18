---
title: Isolation and concurrency
description: Review how the Workers Vitest integration runs your tests, how it isolates tests from each other, and how it imports modules.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Isolation and concurrency

Review how the Workers Vitest integration runs your tests, how it isolates tests from each other, and how it imports modules.

## Run tests

When you run your tests with the Workers Vitest integration, Vitest will:

1. Read and evaluate your configuration file using Node.js.
2. Run any [globalSetup ↗](https://vitest.dev/config/#globalsetup) files using Node.js.
3. Collect and sequence test files.
4. For each Vitest project, depending on its configured isolation and concurrency, start one or more [workerd ↗](https://github.com/cloudflare/workerd) processes, each running one or more Workers.
5. Run [setupFiles ↗](https://vitest.dev/config/#setupfiles) and test files in `workerd` using the appropriate Workers.
6. Watch for changes and re-run test files using the same Workers if the configuration has not changed.

## Isolation model

Storage isolation is per test file. Each test file gets its own storage environment, and any writes to storage during a test file are not visible to other test files. The Workers Vitest integration reuses Workers and their module caches between test runs where possible. A copy of all auxiliary `workers` exists in each `workerd` process.

By default, test files run concurrently. To make test files share the same storage (for example, for integration tests that depend on shared state), use the Vitest flags `--max-workers=1 --no-isolate`.

## Modules

Each Worker has its own module cache. As Workers are reused between test runs, their module caches are also reused. Vitest invalidates parts of the module cache at the start of each test run based on changed files.

The Workers Vitest pool works by running code inside a Cloudflare Worker that Vitest would usually run inside a [Node.js Worker thread ↗](https://nodejs.org/api/worker%5Fthreads.html). To make this possible, the pool **automatically injects** the [nodejs\_compat](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag), \[`no_nodejs_compat_v2`\] and [export\_commonjs\_default](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#commonjs-modules-do-not-export-a-module-namespace) compatibility flags. This is the minimal compatibility setup that still allows Vitest to run correctly, but without pulling in polyfills and globals that aren't required. If you already have a Node.js compatibility flag defined in your configuration, Vitest Pool Workers will not try to add those flags.

Warning

Using Vitest Pool Workers may cause your Worker to behave differently when deployed than during testing as the `nodejs_compat` flag is enabled by default. This means that Node.js-specific APIs and modules are available when running your tests. However, Cloudflare Workers do not support these Node.js APIs in the production environment unless you specify this flag in your Worker configuration.

If you do not have a `nodejs_compat` or `nodejs_compat_v2` flag in your configuration and you import a Node.js module in your Worker code, your tests may pass, but you will find that you will not be able to deploy this Worker, as the upload call (either via the REST API or via Wrangler) will throw an error.

However, if you use Node.js globals that are not supported by the runtime, your Worker upload will be successful, but you may see errors in production code. Let's create a contrived example to illustrate the issue.

The Wrangler configuration file does not specify either `nodejs_compat` or `nodejs_compat_v2`:

* [  wrangler.jsonc ](#tab-panel-12161)
* [  wrangler.toml ](#tab-panel-12162)

JSONC

```

{ "name": "test",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18"

  # no nodejs_compat flags here

}


```

TOML

```

name = "test"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


```

In our `src/index.ts` file, we use the `process` object, which is a Node.js global, unavailable in the Workerd runtime:

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    process.env.TEST = "test";

    return new Response(process.env.TEST);

  },

} satisfies ExportedHandler<Env>;


```

The test is a simple assertion that the Worker managed to use `process`.

TypeScript

```

it('responds with "test"', async () => {

  const response = await exports.default.fetch("https://example.com/");

  expect(await response.text()).toMatchInlineSnapshot(`"test"`);

});


```

Now, if we run `npm run test`, we see that the tests will _pass_:

```

 ✓ test/index.spec.ts (1)

   ✓ responds with "test"


 Test Files  1 passed (1)

      Tests  1 passed (1)


```

And we can run `wrangler dev` and `wrangler deploy` without issues. It _looks like_ our code is fine. However, this code will fail in production as `process` is not available in the Workerd runtime.

To fix the issue, we either need to avoid using Node.js APIs, or add the `nodejs_compat` flag to our Wrangler configuration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/#page","headline":"Isolation and concurrency · Cloudflare Workers docs","description":"Review how the Workers Vitest integration runs your tests, how it isolates tests from each other, and how it imports modules.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/isolation-and-concurrency/","name":"Isolation and concurrency"}}]}
```
