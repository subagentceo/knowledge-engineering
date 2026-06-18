---
title: test
description: Use the Node.js test module MockTracker API in Cloudflare Workers for tracking and managing mock objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# test

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

## `MockTracker`

The `MockTracker` API in Node.js provides a means of tracking and managing mock objects in a test environment.

JavaScript

```

import { mock } from 'node:test';


const fn = mock.fn();

fn(1,2,3);  // does nothing... but


console.log(fn.mock.callCount());  // Records how many times it was called

console.log(fn.mock.calls[0].arguments);  // Records the arguments that were passed each call


```

The full `MockTracker` API is documented in the [Node.js documentation for MockTracker ↗](https://nodejs.org/docs/latest/api/test.html#class-mocktracker).

The Workers implementation of `MockTracker` currently does not include an implementation of the [Node.js mock timers API ↗](https://nodejs.org/docs/latest/api/test.html#class-mocktimers).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/#page","headline":"test · Cloudflare Workers docs","description":"Use the Node.js test module MockTracker API in Cloudflare Workers for tracking and managing mock objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/test/","name":"test"}}]}
```
