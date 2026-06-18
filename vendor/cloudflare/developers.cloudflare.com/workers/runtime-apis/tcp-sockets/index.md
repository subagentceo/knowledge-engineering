---
title: TCP sockets
description: Use the `connect()` API to create outbound TCP connections from Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TCP sockets

The Workers runtime provides the `connect()` API for creating outbound [TCP connections ↗](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) from Workers.

Many application-layer protocols are built on top of the Transmission Control Protocol (TCP). These application-layer protocols, including SSH, MQTT, SMTP, FTP, IRC, and most database wire protocols including MySQL, PostgreSQL, MongoDB, require an underlying TCP socket API in order to work.

Note

Connecting to a PostgreSQL database? You should use [Hyperdrive](https://developers.cloudflare.com/hyperdrive/), which provides the `connect()` API with built-in connection pooling and query caching.

Note

TCP Workers outbound connections are sourced from a prefix that is not part of [list of IP ranges ↗](https://www.cloudflare.com/ips/).

## `connect()`

The `connect()` function returns a TCP socket, with both a [readable](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/) and [writable](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/) stream of data. This allows you to read and write data on an ongoing basis, as long as the connection remains open.

`connect()` is provided as a [Runtime API](https://developers.cloudflare.com/workers/runtime-apis/), and is accessed by importing the `connect` function from `cloudflare:sockets`. This process is similar to how one imports built-in modules in Node.js. Refer to the following codeblock for an example of creating a TCP socket, writing to it, and returning the readable side of the socket as a response:

TypeScript

```

import { connect } from 'cloudflare:sockets';


export default {

  async fetch(req): Promise<Response> {

    const gopherAddr = { hostname: "gopher.floodgap.com", port: 70 };

    const url = new URL(req.url);


    try {

      const socket = connect(gopherAddr);


      const writer = socket.writable.getWriter()

      const encoder = new TextEncoder();

      const encoded = encoder.encode(url.pathname + "\r\n");

      await writer.write(encoded);

      await writer.close();


      return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });

    } catch (error) {

      return new Response("Socket connection failed: " + error, { status: 500 });

    }

  }

} satisfies ExportedHandler;


```

* `connect(address: SocketAddress | string, options?: optional SocketOptions)` : `Socket`  
   * `connect()` accepts either a URL string or [SocketAddress](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socketaddress) to define the hostname and port number to connect to, and an optional configuration object, [SocketOptions](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socketoptions). It returns an instance of a [Socket](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socket).

### `SocketAddress`

* `hostname` string  
   * The hostname to connect to. Example: `cloudflare.com`.
* `port` number  
   * The port number to connect to. Example: `5432`.

### `SocketOptions`

* `secureTransport` "off" | "on" | "starttls" — Defaults to `off`  
   * Specifies whether or not to use [TLS ↗](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) when creating the TCP socket.  
   * `off` — Do not use TLS.  
   * `on` — Use TLS.  
   * `starttls` — Do not use TLS initially, but allow the socket to be upgraded to use TLS by calling [startTls()](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#opportunistic-tls-starttls).
* `allowHalfOpen` boolean — Defaults to `false`  
   * Defines whether the writable side of the TCP socket will automatically close on end-of-file (EOF). When set to `false`, the writable side of the TCP socket will automatically close on EOF. When set to `true`, the writable side of the TCP socket will remain open on EOF.  
   * This option is similar to that offered by the Node.js [net module ↗](https://nodejs.org/api/net.html) and allows interoperability with code which utilizes it.

### `SocketInfo`

* `remoteAddress` string | null  
   * The address of the remote peer the socket is connected to. May not always be set.
* `localAddress` string | null  
   * The address of the local network endpoint for this socket. May not always be set.

### `Socket`

* `readable` : ReadableStream  
   * Returns the readable side of the TCP socket.
* `writable` : WritableStream  
   * Returns the writable side of the TCP socket.  
   * The `WritableStream` returned only accepts chunks of `Uint8Array` or its views.
* `opened` `Promise<SocketInfo>`  
   * This promise is resolved when the socket connection is established and is rejected if the socket encounters an error.
* `closed` `Promise<void>`  
   * This promise is resolved when the socket is closed and is rejected if the socket encounters an error.
* `close()` `Promise<void>`  
   * Closes the TCP socket. Both the readable and writable streams are forcibly closed.
* `startTls()` : Socket  
   * Upgrades an insecure socket to a secure one that uses TLS, returning a new [Socket](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets#socket). Note that in order to call `startTls()`, you must set [secureTransport](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#socketoptions) to `starttls` when initially calling `connect()` to create the socket.

## Opportunistic TLS (StartTLS)

Many TCP-based systems, including databases and email servers, require that clients use opportunistic TLS (otherwise known as [StartTLS ↗](https://en.wikipedia.org/wiki/Opportunistic%5FTLS)) when connecting. In this pattern, the client first creates an insecure TCP socket, without TLS, and then upgrades it to a secure TCP socket, that uses TLS. The `connect()` API simplifies this by providing a method, `startTls()`, which returns a new `Socket` instance that uses TLS:

TypeScript

```

import { connect } from "cloudflare:sockets"


const address = {

  hostname: "example-postgres-db.com",

  port: 5432

};

const socket = connect(address, { secureTransport: "starttls" });

const secureSocket = socket.startTls();


```

* `startTls()` can only be called if `secureTransport` is set to `starttls` when creating the initial TCP socket.
* Once `startTls()` is called, the initial socket is closed and can no longer be read from or written to. In the example above, anytime after `startTls()` is called, you would use the newly created `secureSocket`. Any existing readers and writers based off the original socket will no longer work. You must create new readers and writers from the newly created `secureSocket`.
* `startTls()` should only be called once on an existing socket.

## Handle errors

To handle errors when creating a new TCP socket, reading from a socket, or writing to a socket, wrap these calls inside [try...catch ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement blocks. The following example opens a connection to Google.com, initiates a HTTP request, and returns the response. If this fails and throws an exception, it returns a [500](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/) response:

TypeScript

```

import { connect } from 'cloudflare:sockets';

const connectionUrl = { hostname: "google.com", port: 80 };

export interface Env { }

export default {

  async fetch(req, env, ctx): Promise<Response> {

    try {

      const socket = connect(connectionUrl);

      const writer = socket.writable.getWriter();

      const encoder = new TextEncoder();

      const encoded = encoder.encode("GET / HTTP/1.0\r\n\r\n");

      await writer.write(encoded);

      await writer.close();


      return new Response(socket.readable, { headers: { "Content-Type": "text/plain" } });

    } catch (error) {

      return new Response(`Socket connection failed: ${error}`, { status: 500 });

    }

  }

} satisfies ExportedHandler<Env>;


```

## Close TCP connections

You can close a TCP connection by calling `close()` on the socket. This will close both the readable and writable sides of the socket.

TypeScript

```

import { connect } from "cloudflare:sockets"


const socket = connect({ hostname: "my-url.com", port: 70 });

const reader = socket.readable.getReader();

socket.close();


// After close() is called, you can no longer read from the readable side of the socket

const reader = socket.readable.getReader(); // This fails


```

## Considerations

* Outbound TCP sockets to [Cloudflare IP ranges ↗](https://www.cloudflare.com/ips/) are blocked.
* TCP sockets cannot be created in global scope and shared across requests. You should always create TCP sockets within a handler (ex: [fetch()](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code), [scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/), [queue()](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer)) or [alarm()](https://developers.cloudflare.com/durable-objects/api/alarms/).
* Each open TCP socket counts towards the maximum number of [open connections](https://developers.cloudflare.com/workers/platform/limits/#simultaneous-open-connections) that can be simultaneously open.
* By default, Workers cannot create outbound TCP connections on port `25` to send email to SMTP mail servers. [Cloudflare Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) provides APIs to process and forward email.
* Support for handling inbound TCP connections is [coming soon ↗](https://blog.cloudflare.com/workers-tcp-socket-api-connect-databases/). Currently, it is not possible to make an inbound TCP connection to your Worker, for example, by using the `CONNECT` HTTP method.

## Troubleshooting

Review descriptions of common error messages you may see when working with TCP Sockets, what the error messages mean, and how to solve them.

### `proxy request failed, cannot connect to the specified address`

Your socket is connecting to an address that was disallowed. Examples of a disallowed address include Cloudflare IPs, `localhost`, and private network IPs.

If you need to connect to addresses on port `80` or `443` to make HTTP requests, use [fetch](https://developers.cloudflare.com/workers/runtime-apis/fetch/).

### `TCP Loop detected`

Your socket is connecting back to the Worker that initiated the outbound connection. In other words, the Worker is connecting back to itself. This is currently not supported.

### `Connections to port 25 are prohibited`

Your socket is connecting to an address on port `25`. This is usually the port used for SMTP mail servers. Workers cannot create outbound connections on port `25`. Consider using [Cloudflare Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#page","headline":"TCP sockets · Cloudflare Workers docs","description":"Use the connect() API to create outbound TCP connections from Workers.","url":"https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/tcp-sockets/","name":"TCP sockets"}}]}
```
