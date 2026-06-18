---
title: MessageChannel
description: Channel messaging with MessageChannel and MessagePort
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MessageChannel

## Background

The [MessageChannel API ↗](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) provides a way to create a communication channel between different parts of your application.

The Workers runtime provides a minimal implementation of the `MessageChannel` API that is currently limited to uses with a single Worker instance. This means that you can use `MessageChannel` to send messages between different parts of your Worker, but not across different Workers.

JavaScript

```

const { port1, port2 } = new MessageChannel();


port2.onmessage = (event) => {

  console.log('Received message:', event.data);

};


port2.postMessage('Hello from port2!');


```

Any value that can be used with the `structuredClone(...)` API can be sent over the port.

## Differences

There are a number of key limitations to the `MessageChannel` API in Workers:

* Transfer lists are currently not supported. This means that you will not be able to transfer ownership of objects like `ArrayBuffer` or `MessagePort` between ports.
* The `MessagePort` is not yet serializable. This means that you cannot send a `MessagePort` object through the `postMessage` method or via JSRPC calls.
* The `'messageerror'` event is only partially supported. If the `'onmessage'` handler throws an error, the `'messageerror'` event will be triggered, however, it will not be triggered when there are errors serializing or deserializing the message data. Instead, the error will be thrown when the `postMessage` method is called on the sending port.
* The `'close'` event will be emitted on both ports when one of the ports is closed, however it will not be emitted when the Worker is terminated or when one of the ports is garbage collected.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/messagechannel/#page","headline":"MessageChannel · Cloudflare Workers docs","description":"Channel messaging with MessageChannel and MessagePort","url":"https://developers.cloudflare.com/workers/runtime-apis/messagechannel/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/messagechannel/","name":"MessageChannel"}}]}
```
