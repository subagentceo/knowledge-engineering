---
title: Node.js compatibility
description: Node.js APIs available in Cloudflare Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Node.js compatibility

When you write a Worker, you may need to import packages from [npm ↗](https://www.npmjs.com/). Many npm packages rely on APIs from the [Node.js runtime ↗](https://nodejs.org/en/about), and will not work unless these Node.js APIs are available.

Cloudflare Workers provides a subset of Node.js APIs in two forms:

1. As built-in APIs provided by the Workers Runtime. Most of these APIs are full implementations of the corresponding Node.js APIs, while a few are partially supported or non-functional stubs intended for the APIs to be available for import only but not for actual use.
2. As polyfill shim implementations that [Wrangler](https://developers.cloudflare.com/workers/wrangler/) adds to your Worker's code, allowing it to import the module, but calling API methods will throw errors.

## Get Started

To enable built-in Node.js APIs and add polyfills, add the `nodejs_compat` compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), and ensure that your Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

* [  wrangler.jsonc ](#tab-panel-12003)
* [  wrangler.toml ](#tab-panel-12004)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


```

## Supported Node.js APIs

The runtime APIs from Node.js listed below as "🟢 supported" are currently natively supported in the Workers Runtime. Item listed as "🟡 partially supported" are either only partially implemented or are implemented as non-functional stubs.

[Deprecated or experimental APIs from Node.js ↗](https://nodejs.org/docs/latest/api/documentation.html#stability-index), and APIs that do not fit in a serverless context, are not included as part of the list below:

| API Name                                                                                                          | Natively supported by the Workers Runtime                                                                                     |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Assertion testing](https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/)                        | 🟢 supported                                                                                                                  |
| [Asynchronous context tracking](https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/) | 🟢 supported                                                                                                                  |
| [Async hooks ↗](https://nodejs.org/docs/latest/api/async%5Fhooks.html)                                            | 🟡 partially supported (non-functional)                                                                                       |
| [Buffer](https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/)                                   | 🟢 supported                                                                                                                  |
| [Child processes ↗](https://nodejs.org/docs/latest/api/child%5Fprocess.html)                                      | 🟡 partially supported (non-functional)                                                                                       |
| [Cluster ↗](https://nodejs.org/docs/latest/api/cluster.html)                                                      | 🟡 partially supported (non-functional)                                                                                       |
| [Console ↗](https://nodejs.org/docs/latest/api/console.html)                                                      | 🟡 partially supported                                                                                                        |
| [Crypto](https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/)                                   | 🟢 supported                                                                                                                  |
| [Debugger](https://developers.cloudflare.com/workers/observability/dev-tools/)                                    | 🟢 supported via [Chrome Dev Tools integration](https://developers.cloudflare.com/workers/observability/dev-tools/)           |
| [Diagnostics Channel](https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/)         | 🟢 supported                                                                                                                  |
| [DNS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/dns/)                                         | 🟢 supported                                                                                                                  |
| Errors                                                                                                            | 🟢 supported                                                                                                                  |
| [Events](https://developers.cloudflare.com/workers/runtime-apis/nodejs/eventemitter/)                             | 🟢 supported                                                                                                                  |
| [File system](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/)                                  | 🟢 supported                                                                                                                  |
| Globals                                                                                                           | 🟢 supported                                                                                                                  |
| [HTTP](https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/)                                       | 🟢 supported                                                                                                                  |
| [HTTP/2 ↗](https://nodejs.org/docs/latest/api/http2.html)                                                         | 🟡 partially supported (non-functional)                                                                                       |
| [HTTPS](https://developers.cloudflare.com/workers/runtime-apis/nodejs/https/)                                     | 🟢 supported                                                                                                                  |
| [Inspector ↗](https://nodejs.org/docs/latest/api/inspector.html)                                                  | 🟡 partially supported via [Chrome Dev Tools integration](https://developers.cloudflare.com/workers/observability/dev-tools/) |
| [Module ↗](https://nodejs.org/docs/latest/api/module.html)                                                        | 🟡 partially supported                                                                                                        |
| [Net](https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/)                                         | 🟢 supported                                                                                                                  |
| [OS ↗](https://nodejs.org/docs/latest/api/os.html)                                                                | 🟡 partially supported                                                                                                        |
| [Path](https://developers.cloudflare.com/workers/runtime-apis/nodejs/path/)                                       | 🟢 supported                                                                                                                  |
| [Performance hooks ↗](https://nodejs.org/docs/latest/api/perf%5Fhooks.html)                                       | 🟡 partially supported                                                                                                        |
| [Process](https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/)                                 | 🟢 supported                                                                                                                  |
| [Punycode ↗](https://nodejs.org/docs/latest/api/punycode.html) (deprecated)                                       | 🟢 supported                                                                                                                  |
| [Readline ↗](https://nodejs.org/docs/latest/api/readline.html)                                                    | 🟡 partially supported (non-functional)                                                                                       |
| [REPL ↗](https://nodejs.org/docs/latest/api/repl.html)                                                            | 🟡 partially supported (non-functional)                                                                                       |
| [Query strings ↗](https://nodejs.org/docs/latest/api/querystring.html)                                            | 🟢 supported                                                                                                                  |
| [SQLite ↗](https://nodejs.org/docs/latest/api/sqlite.html)                                                        | ⚪ not yet supported                                                                                                           |
| [Stream](https://developers.cloudflare.com/workers/runtime-apis/nodejs/streams)                                   | 🟢 supported                                                                                                                  |
| [String decoder](https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/)                   | 🟢 supported                                                                                                                  |
| [Test runner ↗](https://nodejs.org/docs/latest/api/test.html)                                                     | ⚪ not supported                                                                                                               |
| [Timers](https://developers.cloudflare.com/workers/runtime-apis/nodejs/timers/)                                   | 🟢 supported                                                                                                                  |
| [TLS/SSL](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/)                                     | 🟡 partially supported                                                                                                        |
| [UDP/datagram ↗](https://nodejs.org/docs/latest/api/dgram.html)                                                   | 🟡 partially supported (non-functional)                                                                                       |
| [URL](https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/)                                         | 🟢 supported                                                                                                                  |
| [Utilities](https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/)                                  | 🟢 supported                                                                                                                  |
| [V8 ↗](https://nodejs.org/docs/latest/api/v8.html)                                                                | 🟡 partially supported (non-functional)                                                                                       |
| [VM ↗](https://nodejs.org/docs/latest/api/vm.html)                                                                | 🟡 partially supported (non-functional)                                                                                       |
| [Web Crypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)                              | 🟢 supported                                                                                                                  |
| [Web Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/)                                | 🟢 supported                                                                                                                  |
| [Zlib](https://developers.cloudflare.com/workers/runtime-apis/nodejs/zlib/)                                       | 🟢 supported                                                                                                                  |

Unless otherwise specified, native implementations of Node.js APIs in Workers are intended to match the implementation in the [Current release of Node.js ↗](https://github.com/nodejs/release#release-schedule).

If an API you wish to use is missing and you want to suggest that Workers support it, please add a post or comment in the[Node.js APIs discussions category ↗](https://github.com/cloudflare/workerd/discussions/categories/node-js-apis) on GitHub.

### Node.js API Polyfills

Node.js APIs that are not yet supported in the Workers runtime are polyfilled via [Wrangler](https://developers.cloudflare.com/workers/wrangler/), which uses [unenv ↗](https://github.com/unjs/unenv). If the `nodejs_compat` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/) is enabled, and your Worker's [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) is 2024-09-23 or later, Wrangler will automatically inject polyfills into your Worker's code.

Adding polyfills maximizes compatibility with existing npm packages by providing modules with mocked methods. Calling these mocked methods will either noop or will throw an error with a message like:

```

[unenv] <method name> is not implemented yet!


```

This allows you to import packages that use these Node.js modules, even if certain methods are not supported.

## Enable only AsyncLocalStorage

If you need to enable only the Node.js `AsyncLocalStorage` API, you can enable the `nodejs_als` compatibility flag:

* [  wrangler.jsonc ](#tab-panel-12005)
* [  wrangler.toml ](#tab-panel-12006)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_als"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_als" ]


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/#page","headline":"Node.js compatibility · Cloudflare Workers docs","description":"Node.js APIs available in Cloudflare Workers","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}}]}
```
