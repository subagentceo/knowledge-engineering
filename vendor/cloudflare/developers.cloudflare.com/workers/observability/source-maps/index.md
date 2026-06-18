---
title: Source maps and stack traces
description: Adding source maps and generating stack traces for Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Source maps and stack traces

[Stack traces ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/stack) help with debugging your code when your application encounters an unhandled exception. Stack traces show you the specific functions that were called, in what order, from which line and file, and with what arguments.

Most JavaScript code is first bundled, often transpiled, and then minified before being deployed to production. This process creates smaller bundles to optimize performance and converts code from TypeScript to Javascript if needed.

Source maps translate compiled and minified code back to the original code that you wrote. Source maps are combined with the stack trace returned by the JavaScript runtime to present you with a stack trace.

## Source Maps

To enable source maps, add the following to your Worker's [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11870)
* [  wrangler.toml ](#tab-panel-11871)

JSONC

```

{

  "upload_source_maps": true

}


```

TOML

```

upload_source_maps = true


```

When `upload_source_maps` is set to `true`, Wrangler will automatically generate and upload source map files when you run [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) or [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy). ​​

Note

Miniflare can also [output source maps ↗](https://miniflare.dev/developing/source-maps) for use in local development or [testing](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests).

## Stack traces

​​ When your Worker throws an uncaught exception, we fetch the source map and use it to map the stack trace of the exception back to lines of your Worker’s original source code.

You can then view the stack trace when streaming [real-time logs](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/) or in [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/).

Note

The source map is retrieved after your Worker invocation completes — it's an asynchronous process that does not impact your Worker's CPU utilization or performance. Source maps are not accessible inside the Worker at runtime, if you `console.log()` the [stack property ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/stack) within a Worker, you will not get a deobfuscated stack trace.

When Cloudflare attempts to remap a stack trace to the Worker's source map, it does so line-by-line, remapping as much as possible. If a line of the stack trace cannot be remapped for any reason, Cloudflare will leave that line of the stack trace unchanged, and continue to the next line of the stack trace.

## Limits

Wrangler version

Minimum required Wrangler version for source maps: 3.46.0\. Check your version by running `wrangler --version`.

| Description             | Limit         |
| ----------------------- | ------------- |
| Maximum Source Map Size | 15 MB gzipped |

## Example

Consider a simple project. `src/index.ts` serves as the entrypoint of the application and `src/calculator.ts` defines a ComplexCalculator class that supports basic arithmetic.

* wrangler.jsonc
* tsconfig.json
* Directorysrc  
   * calculator.ts  
   * index.ts

Let's see how source maps can simplify debugging an error in the ComplexCalculator class.

![Stack Trace without Source Map remapping](https://developers.cloudflare.com/_astro/without-source-map.ByYR83oU_Z1q7wOD.webp) 

With **no source maps uploaded**: notice how all the Javascript has been minified to one file, so the stack trace is missing information on file name, shows incorrect line numbers, and incorrectly references `js` instead of `ts`.

![Stack Trace with Source Map remapping](https://developers.cloudflare.com/_astro/with-source-map.PipytmVe_2dYiLI.webp) 

With **source maps uploaded**: all methods reference the correct files and line numbers.

## Related resources

* [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/logpush/) \- Learn how to attach Tail Workers to transform your logs and send them to HTTP endpoints.
* [Real-time logs](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/) \- Learn how to capture Workers logs in real-time.
* [RPC error handling](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/) \- Learn how exceptions are handled over RPC (Remote Procedure Call).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/source-maps/#page","headline":"Source maps and stack traces · Cloudflare Workers docs","description":"Adding source maps and generating stack traces for Workers.","url":"https://developers.cloudflare.com/workers/observability/source-maps/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/source-maps/","name":"Source maps and stack traces"}}]}
```
