---
title: Durable Object Base Class
description: API reference for the DurableObject abstract base class and its handler methods.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Durable Object Base Class

The `DurableObject` base class is an abstract class which all Durable Objects inherit from. This base class provides a set of optional methods, frequently referred to as handler methods, which can respond to events, for example a `webSocketMessage` when using the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api). To provide a concrete example, here is a Durable Object `MyDurableObject` which extends `DurableObject` and implements the fetch handler to return "Hello, World!" to the calling Worker.

* [  JavaScript ](#tab-panel-8171)
* [  TypeScript ](#tab-panel-8172)
* [  Python ](#tab-panel-8173)

JavaScript

```

export class MyDurableObject extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

  }


  async fetch(request) {

    return new Response("Hello, World!");

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


    async fetch(request: Request) {

      return new Response("Hello, World!");

    }


}


```

Python

```

from workers import DurableObject, Response


class MyDurableObject(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)


  async def fetch(self, request):

    return Response("Hello, World!")


```

## Methods

### `fetch`

* `` fetch(request ` Request `) ``: ` Response ` | ` Promise<Response> `\- Takes an HTTP[Request ↗](https://developers.cloudflare.com/workers/runtime-apis/request/) and returns an HTTP[Response ↗](https://developers.cloudflare.com/workers/runtime-apis/response/). This method allows the Durable Object to emulate an HTTP server where a Worker with a binding to that object is the client. - This method can be `async`.  
   * Durable Objects support [RPC calls](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) as of compatibility date [2024-04-03](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#durable-object-stubs-and-service-bindings-support-rpc). RPC methods are preferred over `fetch()` when your application does not follow HTTP request/response flow.

#### Parameters

* `request` ` Request ` \- the incoming HTTP request object.

#### Return values

* A ` Response ` or ` Promise<Response> `.

#### Example

* [  JavaScript ](#tab-panel-8174)
* [  TypeScript ](#tab-panel-8175)
* [  Python ](#tab-panel-8176)

JavaScript

```

export class MyDurableObject extends DurableObject {

  async fetch(request) {

    const url = new URL(request.url);

    if (url.pathname === "/hello") {

      return new Response("Hello, World!");

    }

    return new Response("Not found", { status: 404 });

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  async fetch(request: Request): Promise<Response> {

    const url = new URL(request.url);

    if (url.pathname === "/hello") {

      return new Response("Hello, World!");

    }

    return new Response("Not found", { status: 404 });

  }

}


```

Python

```

from workers import DurableObject, Response

from urllib.parse import urlparse


class MyDurableObject(DurableObject):

    async def fetch(self, request):

        path = urlparse(request.url).path

        if path == "/hello":

            return Response("Hello, World!")

        return Response("Not found", status=404)


```

### `alarm`

* `` alarm(alarmInfo? ` AlarmInvocationInfo `) ``: ` void ` | ` Promise<void> `  
   * Called by the system when a scheduled alarm time is reached.  
   * The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at two second delays for up to six retries. Retries will be performed if the method fails with an uncaught exception.  
   * This method can be `async`.  
   * Refer to [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) for more information.

#### Parameters

* `alarmInfo` ` AlarmInvocationInfo ` (optional) - an object containing retry information:  
   * `retryCount` ` number ` \- the number of times this alarm event has been retried.  
   * `isRetry` ` boolean ` \- `true` if this alarm event is a retry, `false` otherwise.

#### Return values

* None.

#### Example

* [  JavaScript ](#tab-panel-8177)
* [  TypeScript ](#tab-panel-8178)
* [  Python ](#tab-panel-8179)

JavaScript

```

export class MyDurableObject extends DurableObject {

  async alarm(alarmInfo) {

    if (alarmInfo?.isRetry) {

      console.log(`Alarm retry attempt ${alarmInfo.retryCount}`);

    }

    await this.processScheduledTask();

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  async alarm(alarmInfo?: AlarmInvocationInfo): Promise<void> {

    if (alarmInfo?.isRetry) {

      console.log(`Alarm retry attempt ${alarmInfo.retryCount}`);

    }

    await this.processScheduledTask();

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    async def alarm(self, alarm_info=None):

        if alarm_info and alarm_info.isRetry:

            print(f"Alarm retry attempt {alarm_info.retryCount}")

        await self.process_scheduled_task()


```

### `webSocketMessage`

* `` webSocketMessage(ws ` WebSocket `, message ` string | ArrayBuffer `) ``: ` void ` | ` Promise<void> `\- Called by the system when an accepted WebSocket receives a message. - This method is not called for WebSocket control frames. The system will respond to an incoming [WebSocket protocol ping ↗](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2)automatically without interrupting hibernation.  
   * This method can be `async`.

#### Parameters

* `ws` ` WebSocket ` \- the [WebSocket ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) that received the message. Use this reference to send responses or access serialized attachments.
* `message` ` string | ArrayBuffer ` \- the message data. Text messages arrive as `string`, binary messages as `ArrayBuffer`.

#### Return values

* None.

#### Example

* [  JavaScript ](#tab-panel-8180)
* [  TypeScript ](#tab-panel-8181)
* [  Python ](#tab-panel-8182)

JavaScript

```

export class MyDurableObject extends DurableObject {

  async webSocketMessage(ws, message) {

    if (typeof message === "string") {

      ws.send(`Received: ${message}`);

    } else {

      ws.send(`Received ${message.byteLength} bytes`);

    }

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {

    if (typeof message === "string") {

      ws.send(`Received: ${message}`);

    } else {

      ws.send(`Received ${message.byteLength} bytes`);

    }

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    async def webSocketMessage(self, ws, message):

        if isinstance(message, str):

            ws.send(f"Received: {message}")

        else:

            ws.send(f"Received {len(message)} bytes")


```

### `webSocketClose`

* `` webSocketClose(ws ` WebSocket `, code ` number `, reason ` string `, wasClean ` boolean `) ``: ` void ` | ` Promise<void> `\- Called by the system when a WebSocket connection is closed.  
   * With the [web\_socket\_auto\_reply\_to\_close](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#websocket-auto-reply-to-close) compatibility flag (enabled by default on compatibility dates on or after `2026-04-07`), the runtime automatically sends a reciprocal Close frame and transitions `readyState` to `CLOSED` before this handler is called. You do not need to call `ws.close()` — but doing so is safe (the call is silently ignored).  
   * On older compatibility dates (before `2026-04-07`), you **must** call `ws.close(code, reason)` inside this handler to complete the WebSocket close handshake. Failing to reciprocate the close will result in `1006` errors on the client, representing an abnormal closure per the WebSocket specification.  
   * This method can be `async`.

#### Parameters

* `ws` ` WebSocket ` \- the [WebSocket ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) that was closed.
* `code` ` number ` \- the [WebSocket close code ↗](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code) sent by the peer (e.g., `1000` for normal closure, `1001` for going away).
* `reason` ` string ` \- a string indicating why the connection was closed. May be empty.
* `wasClean` ` boolean ` \- `true` if the connection closed cleanly with a proper closing handshake, `false` otherwise.

#### Return values

* None.

#### Example

* [  JavaScript ](#tab-panel-8186)
* [  TypeScript ](#tab-panel-8187)
* [  Python ](#tab-panel-8188)

JavaScript

```

export class MyDurableObject extends DurableObject {

  async webSocketClose(ws, code, reason, wasClean) {

    // With web_socket_auto_reply_to_close (compat date >= 2026-04-07),

    // the runtime has already completed the close handshake.

    // On older compat dates, call ws.close(code, reason) here.

    ws.close(code, reason);

    console.log(`WebSocket closed: code=${code}, reason=${reason}`);

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {

    // With web_socket_auto_reply_to_close (compat date >= 2026-04-07),

    // the runtime has already completed the close handshake.

    // On older compat dates, call ws.close(code, reason) here.

    ws.close(code, reason);

    console.log(`WebSocket closed: code=${code}, reason=${reason}`);

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    async def webSocketClose(self, ws, code, reason, was_clean):

        ws.close(code, reason)

        print(f"WebSocket closed: code={code}, reason={reason}")


```

### `webSocketError`

* `` webSocketError(ws ` WebSocket `, error ` unknown `) ``: ` void ` | ` Promise<void> `\- Called by the system when a non-disconnection error occurs on a WebSocket connection. - This method can be `async`.

#### Parameters

* `ws` ` WebSocket ` \- the [WebSocket ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) that encountered an error.
* `error` ` unknown ` \- the error that occurred. May be an `Error` object or another type depending on the error source.

#### Return values

* None.

#### Example

* [  JavaScript ](#tab-panel-8183)
* [  TypeScript ](#tab-panel-8184)
* [  Python ](#tab-panel-8185)

JavaScript

```

export class MyDurableObject extends DurableObject {

  async webSocketError(ws, error) {

    const message = error instanceof Error ? error.message : String(error);

    console.error(`WebSocket error: ${message}`);

  }

}


```

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  async webSocketError(ws: WebSocket, error: unknown) {

    const message = error instanceof Error ? error.message : String(error);

    console.error(`WebSocket error: ${message}`);

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

    async def webSocketError(self, ws, error):

        print(f"WebSocket error: {error}")


```

## Properties

### `ctx`

`ctx` is a readonly property of type [DurableObjectState](https://developers.cloudflare.com/durable-objects/api/state/) providing access to storage, WebSocket management, and other instance-specific functionality.

### `env`

`env` contains the environment bindings available to this Durable Object, as defined in your Wrangler configuration.

## Related resources

* [Use WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) for WebSocket handler best practices.
* [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms/) for scheduling future work.
* [RPC methods](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) for type-safe method calls.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/base/#page","headline":"Durable Object Base Class · Cloudflare Durable Objects docs","description":"API reference for the DurableObject abstract base class and its handler methods.","url":"https://developers.cloudflare.com/durable-objects/api/base/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/base/","name":"Durable Object Base Class"}}]}
```
