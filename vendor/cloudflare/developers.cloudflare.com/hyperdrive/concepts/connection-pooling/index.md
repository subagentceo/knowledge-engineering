---
title: Connection pooling
description: Hyperdrive maintains a pool of database connections optimally placed to minimize latency for your applications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connection pooling

Hyperdrive maintains a pool of connections to your database. These are optimally placed to minimize the latency for your applications. You can configure the amount of connections your Hyperdrive configuration uses to connect to your origin database. This enables you to right-size your connection pool based on your database capacity and application requirements.

For instance, if your Worker makes many queries to your database (which cannot be resolved by Hyperdrive's caching), you may want to allow Hyperdrive to make more connections to your database. Conversely, if your Worker makes few queries that actually need to reach your database or if your database allows a small number of database connections, you can reduce the amount of connections Hyperdrive will make to your database.

All configurations have a minimum of 5 connections, and with a maximum depending on your Workers plan. Refer to the [limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) for details.

## How Hyperdrive pools database connections

Hyperdrive will automatically scale the amount of database connections held open by Hyperdrive depending on your traffic and the amount of load that is put on your database.

The `max_size` parameter acts as a soft limit - Hyperdrive may temporarily create additional connections during network issues or high traffic periods to ensure high availability and resiliency.

## Pooling mode

The Hyperdrive connection pooler operates in transaction mode, where the client that executes the query communicates through a single connection for the duration of a transaction. When that transaction has completed, the connection is returned to the pool.

Hyperdrive supports [SET statements ↗](https://www.postgresql.org/docs/current/sql-set.html) for the duration of a transaction or a query. For instance, if you manually create a transaction with `BEGIN`/`COMMIT`, `SET` statements within the transaction will take effect. Moreover, a query that includes a `SET` command (`SET X; SELECT foo FROM bar;`) will also apply the `SET` command. When a connection is returned to the pool, the connection is `RESET` such that the `SET` commands will not take effect on subsequent queries.

This implies that a single Worker invocation may obtain multiple connections to perform its database operations and may need to `SET` any configurations for every query or transaction. It is not recommended to wrap multiple database operations with a single transaction to maintain the `SET` state. Doing so will affect the performance and scaling of Hyperdrive, as the connection cannot be reused by other Worker isolates for the duration of the transaction.

Hyperdrive supports named prepared statements as implemented in the `postgres.js` and `node-postgres` drivers. Named prepared statements in other drivers may have worse performance or may not be supported.

## Best practices

You can configure connection counts using the Cloudflare dashboard or the Cloudflare API. Consider the following best practices to determine the right limit for your use-case:

* **Start conservatively**: Begin with a lower connection count and increase as needed based on your application's performance.
* **Monitor database metrics**: Watch your database's connection usage and performance metrics to optimize the connection count.
* **Consider database limits**: Ensure your configured connection count doesn't exceed your database's maximum connection limit.
* **Account for multiple configurations**: If you have multiple Hyperdrive configurations connecting to the same database, consider the total connection count across all configurations.

## Next steps

* Learn more about [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* Review [Hyperdrive limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) for your Workers plan.
* Learn how to [Connect to PostgreSQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/) from Hyperdrive.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/#page","headline":"Connection pooling · Cloudflare Hyperdrive docs","description":"Hyperdrive maintains a pool of database connections optimally placed to minimize latency for your applications.","url":"https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/concepts/connection-pooling/","name":"Connection pooling"}}]}
```
