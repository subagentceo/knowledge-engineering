---
title: Console
description: Supported methods of the `console` API in Cloudflare Workers
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Console

The `console` object provides a set of methods to help you emit logs, warnings, and debug code.

All standard [methods of the console API ↗](https://developer.mozilla.org/en-US/docs/Web/API/console) are present on the `console` object in Workers.

However, some methods are no ops — they can be called, and do not emit an error, but do not do anything. This ensures compatibility with libraries which may use these APIs.

The table below enumerates each method, and the extent to which it is supported in Workers.

All methods noted as "✅ supported" have the following behavior:

* They will be written to the console in local dev (`npx wrangler@latest dev`)
* They will appear in live logs, when tailing logs in the dashboard or running [wrangler tail ↗](https://developers.cloudflare.com/workers/observability/log-from-workers/#use-wrangler-tail)
* They will create entries in the `logs` field of [Tail Worker ↗](https://developers.cloudflare.com/workers/observability/tail-workers/) events and [Workers Trace Events ↗](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/workers%5Ftrace%5Fevents/), which can be pushed to a destination of your choice via [Logpush ↗](https://developers.cloudflare.com/workers/observability/logpush/).

All methods noted as "🟡 partial support" have the following behavior:

* In both production and local development the method can be safely called, but will do nothing (no op)
* In the [Workers Playground ↗](https://workers.cloudflare.com/playground), Quick Editor in the Workers dashboard, and remote preview mode (`wrangler dev --remote`) calling the method will behave as expected, print to the console, etc.

Refer to [Log from Workers ↗](https://developers.cloudflare.com/workers/observability/log-from-workers/) for more on debugging and adding logs to Workers.

| Method                                                                                                         | Behavior                                                                                           |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [console.debug() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/debug%5Fstatic)                   | ✅ supported                                                                                        |
| [console.error() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/error%5Fstatic)                   | ✅ supported                                                                                        |
| [console.info() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/info%5Fstatic)                     | ✅ supported                                                                                        |
| [console.log() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/log%5Fstatic)                       | ✅ supported                                                                                        |
| [console.warn() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/warn%5Fstatic)                     | ✅ supported                                                                                        |
| [console.clear() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/clear%5Fstatic)                   | 🟡 partial support                                                                                 |
| [console.count() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/count%5Fstatic)                   | 🟡 partial support                                                                                 |
| [console.group() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/group%5Fstatic)                   | 🟡 partial support                                                                                 |
| [console.table() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/table%5Fstatic)                   | 🟡 partial support                                                                                 |
| [console.trace() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/trace%5Fstatic)                   | 🟡 partial support                                                                                 |
| [console.assert() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/assert%5Fstatic)                 | ⚪ no op                                                                                            |
| [console.countReset() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/countreset%5Fstatic)         | ⚪ no op                                                                                            |
| [console.dir() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/dir%5Fstatic)                       | ⚪ no op                                                                                            |
| [console.dirxml() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/dirxml%5Fstatic)                 | ⚪ no op                                                                                            |
| [console.groupCollapsed() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/groupcollapsed%5Fstatic) | ⚪ no op                                                                                            |
| [console.groupEnd ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/groupend%5Fstatic)               | ⚪ no op                                                                                            |
| [console.profile() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/profile%5Fstatic)               | ⚪ no op                                                                                            |
| [console.profileEnd() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/profileend%5Fstatic)         | ⚪ no op                                                                                            |
| [console.time() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/time%5Fstatic)                     | ⚪ no op                                                                                            |
| [console.timeEnd() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/timeend%5Fstatic)               | ⚪ no op                                                                                            |
| [console.timeLog() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/timelog%5Fstatic)               | ⚪ no op                                                                                            |
| [console.timeStamp() ↗](https://developer.mozilla.org/en-US/docs/Web/API/console/timestamp%5Fstatic)           | ⚪ no op                                                                                            |
| [console.createTask() ↗](https://developer.chrome.com/blog/devtools-modern-web-debugging/#linked-stack-traces) | 🔴 Will throw an exception in production, but works in local dev, Quick Editor, and remote preview |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/console/#page","headline":"Console · Cloudflare Workers docs","description":"Supported methods of the console API in Cloudflare Workers","url":"https://developers.cloudflare.com/workers/runtime-apis/console/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/console/","name":"Console"}}]}
```
