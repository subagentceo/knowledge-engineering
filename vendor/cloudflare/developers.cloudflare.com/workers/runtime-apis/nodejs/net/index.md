---
title: net
description: Use the Node.js net module in Cloudflare Workers to create TCP socket connections to external servers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# net

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:net ↗](https://nodejs.org/api/net.html) to create a direct connection to servers via a TCP sockets with [net.Socket ↗](https://nodejs.org/api/net.html#class-netsocket).

These functions use [connect](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#connect) functionality from the built-in `cloudflare:sockets` module.

* [  JavaScript ](#tab-panel-12015)
* [  TypeScript ](#tab-panel-12016)

index.js

```

import net from "node:net";


const exampleIP = "127.0.0.1";


export default {

  async fetch(req) {

    const socket = new net.Socket();

    socket.connect(4000, exampleIP, function () {

      console.log("Connected");

    });


    socket.write("Hello, Server!");

    socket.end();


    return new Response("Wrote to server", { status: 200 });

  },

};


```

index.ts

```

import net from "node:net";


const exampleIP = "127.0.0.1";


export default {

  async fetch(req): Promise<Response> {

    const socket = new net.Socket();

    socket.connect(4000, exampleIP, function () {

      console.log("Connected");

    });


    socket.write("Hello, Server!");

    socket.end();


    return new Response("Wrote to server", { status: 200 });


},

} satisfies ExportedHandler;


```

Additionally, other APIs such as [net.BlockList ↗](https://nodejs.org/api/net.html#class-netblocklist)and [net.SocketAddress ↗](https://nodejs.org/api/net.html#class-netsocketaddress) are available.

Note that the [net.Server ↗](https://nodejs.org/api/net.html#class-netserver) class is not supported by Workers.

The full `node:net` API is documented in the [Node.js documentation for node:net ↗](https://nodejs.org/api/net.html).

```

```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/#page","headline":"net · Cloudflare Workers docs","description":"Use the Node.js net module in Cloudflare Workers to create TCP socket connections to external servers.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/net/","name":"net"}}]}
```
