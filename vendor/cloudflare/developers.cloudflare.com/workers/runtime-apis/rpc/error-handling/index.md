---
title: Error handling
description: How exceptions, stack traces, and logging works with the Workers RPC system.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error handling

## Exceptions

An exception thrown by an RPC method implementation will propagate to the caller. If it is one of the standard JavaScript Error types, the `message` and prototype's `name` will be retained, though the stack trace is not.

### Unsupported error types

* If an [AggregateError ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/AggregateError) is thrown by an RPC method, it is not propagated back to the caller.
* The [SuppressedError ↗](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#the-suppressederror-error) type from the Explicit Resource Management proposal is not currently implemented or supported in Workers.
* Own properties of error objects, such as the [cause ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/cause) property, are not propagated back to the caller

## Additional properties

For some remote exceptions, the runtime may set properties on the propagated exception to provide more information about the error; see [Durable Object error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) for more details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/#page","headline":"Workers RPC — Error Handling · Cloudflare Workers docs","description":"How exceptions, stack traces, and logging works with the Workers RPC system.","url":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/rpc/","name":"Remote-procedure call (RPC)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/rpc/error-handling/","name":"Error handling"}}]}
```
