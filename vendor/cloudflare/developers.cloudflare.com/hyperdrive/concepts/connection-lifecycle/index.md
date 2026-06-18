---
title: Connection lifecycle
description: Understand how connections are managed between Workers, Hyperdrive, and your origin database.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connection lifecycle

Understanding how connections work between Workers, Hyperdrive, and your origin database is essential for building efficient applications with Hyperdrive.

By maintaining a connection pool to your database within Cloudflare's network, Hyperdrive reduces seven round-trips to your database before you can even send a query: the TCP handshake (1x), TLS negotiation (3x), and database authentication (3x).

## How connections are managed

When you use a database client in a Cloudflare Worker, the connection lifecycle works differently than in traditional server environments. Here's what happens:

![Hyperdrive connection](https://developers.cloudflare.com/_astro/hyperdrive-connection-lifecycle.B2jgT_oK_bR8HS.svg) 

Without Hyperdrive, every Worker invocation would need to establish a new connection directly to your origin database. This connection setup process requires multiple roundtrips across the Internet to complete the TCP handshake, TLS negotiation, and database authentication — that's 7x round trips and added latency before your query can even execute.

Hyperdrive solves this by splitting the connection setup into two parts: a fast edge connection and an optimized path to your database.

1. **Connection setup on the edge**: The database driver in your Worker code establishes a connection to the Hyperdrive instance. This happens at the edge, colocated with your Worker, making it extremely fast to create connections. This is why you use Hyperdrive's special connection string.
2. **Single roundtrip across regions**: Since authentication has already been completed at the edge, Hyperdrive only needs a single round trip across regions to your database, instead of the multiple roundtrips that would be incurred during connection setup.
3. **Get existing connection from pool**: Hyperdrive uses an existing connection from the pool that is colocated close to your database, minimizing latency.
4. **If no available connections, create new**: When needed, new connections are created from a region close to your database to reduce the latency of establishing new connections.
5. **Run query**: Your query is executed against the database and results are returned to your Worker through Hyperdrive.
6. **Connection teardown**: When your Worker finishes processing the request, the database client connection in your Worker is automatically garbage collected. However, Hyperdrive keeps the connection to your origin database open in the pool, ready to be reused by the next Worker invocation. This means subsequent requests will still perform the fast edge connection setup, but will reuse one of the existing connections from Hyperdrive's pool near your database.

Note

In a Cloudflare Worker, database client connections within the Worker are only kept alive for the duration of a single invocation. With Hyperdrive, creating a new client on each invocation is fast and recommended because Hyperdrive maintains the underlying database connections for you, pooled in an optimal location and shared across Workers to maximize scale.

## Cleaning up client connections

When your Worker finishes processing a request, the database client is automatically garbage collected and the edge connection to Hyperdrive is cleaned up. Hyperdrive keeps the underlying connection to your origin database open in its pool for reuse.

You do **not** need to call `client.end()`, `sql.end()`, `connection.end()` (or similar) to clean up database clients. Workers-to-Hyperdrive connections are automatically cleaned up when the request or invocation ends, including when a [Workflow](https://developers.cloudflare.com/workflows/) or [Queue consumer](https://developers.cloudflare.com/queues/) completes, or when a [Durable Object](https://developers.cloudflare.com/durable-objects/) hibernates or is evicted when idle.

TypeScript

```

import { Client } from "pg";


export default {

  async fetch(request, env, ctx): Promise<Response> {

    const client = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });

    await client.connect();


    const result = await client.query("SELECT * FROM pg_tables");


    // No need to call client.end() — Hyperdrive automatically cleans

    // up the client connection when the request ends. The underlying

    // pooled connection to your origin database remains open for reuse.

    return Response.json(result.rows);

  },

} satisfies ExportedHandler<Env>;


```

Create database clients inside your handlers

You should always create database clients inside your request handlers (`fetch`, `queue`, and similar), not in the global scope. Workers do not allow [I/O across requests](https://developers.cloudflare.com/workers/runtime-apis/bindings/#making-changes-to-bindings), and Hyperdrive's distributed connection pooling already solves for connection startup latency. Using a driver-level pool (such as `new Pool()` or `createPool()`) in the global script scope will leave you with stale connections that result in failed queries and hard errors.

Do not create database clients or connection pools in the global scope. Instead, create a new client inside each handler invocation — Hyperdrive's connection pool ensures this is fast:

* [  JavaScript ](#tab-panel-8624)
* [  TypeScript ](#tab-panel-8625)

index.js

```

import { Client } from "pg";


// 🔴 Bad: Client created in the global scope persists across requests.

// Workers do not allow I/O across request contexts, so this client

// becomes stale and subsequent queries will throw hard errors.

const globalClient = new Client({

  connectionString: env.HYPERDRIVE.connectionString,

});

await globalClient.connect();


export default {

  async fetch(request, env, ctx) {

    // ✅ Good: Client created inside the handler, scoped to this request.

    // Hyperdrive pools the underlying connection to your origin database,

    // so creating a new client per request is fast and reliable.

    const client = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });

    await client.connect();


    const result = await client.query("SELECT * FROM pg_tables");

    return Response.json(result.rows);

  },

};


```

index.ts

```

import { Client } from "pg";


// 🔴 Bad: Client created in the global scope persists across requests.

// Workers do not allow I/O across request contexts, so this client

// becomes stale and subsequent queries will throw hard errors.

const globalClient = new Client({

  connectionString: env.HYPERDRIVE.connectionString,

});

await globalClient.connect();


export default {

  async fetch(request, env, ctx): Promise<Response> {

    // ✅ Good: Client created inside the handler, scoped to this request.

    // Hyperdrive pools the underlying connection to your origin database,

    // so creating a new client per request is fast and reliable.

    const client = new Client({

      connectionString: env.HYPERDRIVE.connectionString,

    });

    await client.connect();


    const result = await client.query("SELECT * FROM pg_tables");

    return Response.json(result.rows);

  },

} satisfies ExportedHandler<Env>;


```

## Connection lifecycle considerations

### Durable Objects and persistent connections

Unlike regular Workers, [Durable Objects](https://developers.cloudflare.com/durable-objects/) can maintain state across multiple requests. If you keep a database client open in a Durable Object, the connection will remain allocated from Hyperdrive's connection pool. Long-lived Durable Objects can exhaust available connections if many objects keep connections open simultaneously.

Warning

Be careful when maintaining persistent database connections in Durable Objects. Each open connection consumes resources from Hyperdrive's connection pool, which could impact other parts of your application. Close connections when not actively in use, use connection timeouts, and limit the number of Durable Objects that maintain database connections.

### Long-running transactions

Hyperdrive operates in [transaction pooling mode](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/#pooling-mode), where a connection is held for the duration of a transaction. Long-running transactions that contain multiple queries can exhaust Hyperdrive's available connections more quickly because each transaction holds a connection from the pool until it completes.

Tip

Keep transactions as short as possible. Perform only the essential queries within a transaction, and avoid including non-database operations (like external API calls or complex computations) inside transaction blocks.

Refer to [Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) to understand how many connections are available for your Hyperdrive configuration based on your Workers plan.

## Related resources

* [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)
* [Connection pooling](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/)
* [Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/)
* [Durable Objects](https://developers.cloudflare.com/durable-objects/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/#page","headline":"Connection lifecycle · Cloudflare Hyperdrive docs","description":"Understand how connections are managed between Workers, Hyperdrive, and your origin database.","url":"https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/concepts/connection-lifecycle/","name":"Connection lifecycle"}}]}
```
