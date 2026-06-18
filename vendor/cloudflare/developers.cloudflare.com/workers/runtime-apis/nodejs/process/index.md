---
title: process
description: Use the Node.js process module in Cloudflare Workers for environment variables, event handling, and runtime information.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# process

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [process ↗](https://nodejs.org/docs/latest/api/process.html) module in Node.js provides a number of useful APIs related to the current process.

Initially Workers only supported `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform` and `features` on process, which was then updated with the [enable\_nodejs\_process\_v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-process-v2-implementation) flag to include most Node.js process features.

Refer to the [Node.js documentation for process ↗](https://nodejs.org/docs/latest/api/process.html) for more information.

Workers-specific implementation details apply when adapting Node.js process support for a serverless environment, which are described in more detail below.

## `process.env`

In the Node.js implementation of `process.env`, the `env` object is a copy of the environment variables at the time the process was started. In the Workers implementation, there is no process-level environment, so by default `env` is an empty object. You can still set and get values from `env`, and those will be globally persistent for all Workers running in the same isolate and context (for example, the same Workers entry point).

Note

If you use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) or the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), `process.env.NODE_ENV` is statically replaced at build time and is not a runtime value. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/#node%5Fenv) for more information.

When [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is enabled and the [nodejs\_compat\_populate\_process\_env](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-auto-populating-processenv) compatibility flag is set (enabled by default for compatibility dates on or after 2025-04-01), `process.env` will contain any [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/),[secrets](https://developers.cloudflare.com/workers/configuration/secrets/), or [version metadata](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) metadata that has been configured on your Worker.

Setting any value on `process.env` will coerce that value into a string.

### Alternative: Import `env` from `cloudflare:workers`

Instead of using `process.env`, you can [import env from cloudflare:workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) to access environment variables and all other bindings from anywhere in your code.

JavaScript

```

import * as process from "node:process";


export default {

  fetch(req, env) {

    // Set process.env.FOO to the value of env.FOO if process.env.FOO is not already set

    // and env.FOO is a string.

    process.env.FOO ??= (() => {

      if (typeof env.FOO === "string") {

        return env.FOO;

      }

    })();

  },

};


```

It is strongly recommended that you _do not_ replace the entire `process.env` object with the cloudflare `env` object. Doing so will cause you to lose any environment variables that were set previously and will cause unexpected behavior for other Workers running in the same isolate. Specifically, it would cause inconsistency with the `process.env` object when accessed via named imports.

JavaScript

```

import * as process from "node:process";

import { env } from "node:process";


process.env === env; // true! they are the same object

process.env = {}; // replace the object! Do not do this!

process.env === env; // false! they are no longer the same object


// From this point forward, any changes to process.env will not be reflected in env,

// and vice versa!


```

## `process.nextTick()`

The Workers implementation of `process.nextTick()` is a wrapper for the standard Web Platform API [queueMicrotask() ↗](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask).

JavaScript

```

import { env, nextTick } from "node:process";


env["FOO"] = "bar";

console.log(env["FOO"]); // Prints: bar


nextTick(() => {

  console.log("next tick");

});


```

## Stdio

[process.stdout ↗](https://nodejs.org/docs/latest/api/process.html#processstdout), [process.stderr ↗](https://nodejs.org/docs/latest/api/process.html#processstderr) and [process.stdin ↗](https://nodejs.org/docs/latest/api/process.html#processstdin) are supported as streams. `stdin` is treated as an empty readable stream.`stdout` and `stderr` are non-TTY writable streams, which output to normal logging output only with `stdout: ` and `stderr: ` prefixing.

The line buffer works by storing writes to stdout or stderr until either a newline character `\n` is encountered or until the next microtask, when the log is then flushed to the output.

This ensures compatibility with inspector and structured logging outputs.

## Current Working Directory

[process.cwd() ↗](https://nodejs.org/docs/latest/api/process.html#processcwd) is the _current working directory_, used as the default path for all filesystem operations, and is initialized to `/bundle`.

[process.chdir() ↗](https://nodejs.org/docs/latest/api/process.html#processchdirdirectory) allows modifying the `cwd` and is respected by FS operations when using `enable_nodejs_fs_module`.

## Hrtime

While [process.hrtime ↗](https://nodejs.org/docs/latest/api/process.html#processhrtimetime) high-resolution timer is available, it provides an inaccurate timer for compatibility only.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/#page","headline":"process · Cloudflare Workers docs","description":"Use the Node.js process module in Cloudflare Workers for environment variables, event handling, and runtime information.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/process/","name":"process"}}]}
```
