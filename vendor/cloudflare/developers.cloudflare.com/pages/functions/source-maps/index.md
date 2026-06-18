---
title: Source maps and stack traces
description: Adding source maps and generating stack traces for Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Source maps and stack traces

[Stack traces ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/stack) help with debugging your code when your application encounters an unhandled exception. Stack traces show you the specific functions that were called, in what order, from which line and file, and with what arguments.

Most JavaScript code is first bundled, often transpiled, and then minified before being deployed to production. This process creates smaller bundles to optimize performance and converts code from TypeScript to Javascript if needed.

Source maps translate compiled and minified code back to the original code that you wrote. Source maps are combined with the stack trace returned by the JavaScript runtime to present you with a stack trace.

Warning

Support for uploading source maps for Pages is available now in open beta. Minimum required Wrangler version: 3.60.0.

## Source Maps

To enable source maps, provide the `--upload-source-maps` flag to [wrangler pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) or add the following to your Pages application's [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/) if you are using the Pages build environment:

* [  wrangler.jsonc ](#tab-panel-9424)
* [  wrangler.toml ](#tab-panel-9425)

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

When uploading source maps is enabled, Wrangler will automatically generate and upload source map files when you run [wrangler pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy).

## Stack traces

​​ When your application throws an uncaught exception, we fetch the source map and use it to map the stack trace of the exception back to lines of your application’s original source code.

You can then view the stack trace when streaming [real-time logs](https://developers.cloudflare.com/pages/functions/debugging-and-logging/).

Note

The source map is retrieved after your Pages Function invocation completes — it's an asynchronous process that does not impact your applications's CPU utilization or performance. Source maps are not accessible inside the application at runtime, if you `console.log()` the [stack property ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/stack), you will not get a deobfuscated stack trace.

## Limits

| Description             | Limit         |
| ----------------------- | ------------- |
| Maximum Source Map Size | 15 MB gzipped |

## Related resources

* [Real-time logs](https://developers.cloudflare.com/pages/functions/debugging-and-logging/) \- Learn how to capture Pages logs in real-time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/source-maps/#page","headline":"Source maps and stack traces · Cloudflare Pages docs","description":"Adding source maps and generating stack traces for Pages.","url":"https://developers.cloudflare.com/pages/functions/source-maps/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/source-maps/","name":"Source maps and stack traces"}}]}
```
