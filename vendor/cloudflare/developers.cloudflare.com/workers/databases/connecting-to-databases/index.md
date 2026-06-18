---
title: Connect to databases
description: Learn about the different kinds of database integrations Cloudflare supports.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connect to databases

Cloudflare Workers can connect to and query your data in both SQL and NoSQL databases, including:

* Cloudflare's own [D1](https://developers.cloudflare.com/d1/), a serverless SQL-based database.
* Traditional hosted relational databases, including Postgres and MySQL, using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) (recommended) to significantly speed up access.
* Serverless databases, including Supabase, MongoDB Atlas, PlanetScale, and Prisma.

### D1 SQL database

D1 is Cloudflare's own SQL-based, serverless database. It is optimized for global access from Workers, and can scale out with multiple, smaller (10GB) databases, such as per-user, per-tenant or per-entity databases. Similar to some serverless databases, D1 pricing is based on query and storage costs.

| Database                                    | Library or Driver                                                                                                                                                               | Connection Method                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [D1](https://developers.cloudflare.com/d1/) | [Workers binding](https://developers.cloudflare.com/d1/worker-api/), integrates with [Prisma ↗](https://www.prisma.io/), [Drizzle ↗](https://orm.drizzle.team/), and other ORMs | [Workers binding](https://developers.cloudflare.com/d1/worker-api/), [REST API](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/create/) |

### Traditional SQL databases

Traditional databases use SQL drivers that use [TCP sockets](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) to connect to the database. TCP is the de-facto standard protocol that many databases, such as PostgreSQL and MySQL, use for client connectivity. These drivers are also widely compatible with your preferred ORM libraries and query builders.

This also includes serverless databases that are PostgreSQL or MySQL-compatible like [Supabase](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/supabase/), [Neon](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/neon/), or PlanetScale (either [MySQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/planetscale/) or [PostgreSQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/planetscale-postgres/)), which can be connected to using both native [TCP sockets and Hyperdrive](https://developers.cloudflare.com/hyperdrive/) or [serverless HTTP-based drivers](https://developers.cloudflare.com/workers/databases/connecting-to-databases/#serverless-databases) (detailed below).

| Database                                                                  | Integration       | Library or Driver                                                                                   | Connection Method                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Postgres](https://developers.cloudflare.com/workers/tutorials/postgres/) | Direct connection | [node-postgres ↗](https://node-postgres.com/),[Postgres.js ↗](https://github.com/porsager/postgres) | [TCP Socket](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) via database driver, using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) for optimal performance (optional, recommended) |
| [MySQL](https://developers.cloudflare.com/workers/tutorials/mysql/)       | Direct connection | [mysql2 ↗](https://github.com/sidorares/node-mysql2), [mysql ↗](https://github.com/mysqljs/mysql)   | [TCP Socket](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) via database driver, using [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) for optimal performance (optional, recommended) |

Speed up database connectivity with Hyperdrive

Connecting to SQL databases with TCP sockets requires multiple roundtrips to establish a secure connection before a query to the database is made. Since a connection must be re-established on every Worker invocation, this adds unnecessary latency.

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/) solves this by pooling database connections globally to eliminate unnecessary roundtrips and speed up your database access. Learn more about [how Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).

### Serverless databases

Serverless databases may provide direct connection to the underlying database, or provide HTTP-based proxies and drivers (also known as serverless drivers).

For PostgreSQL and MySQL serverless databases, you can connect to the underlying database directly using the native database drivers and ORMs you are familiar with, using Hyperdrive (recommended) to speed up connectivity and pool database connections. When you use Hyperdrive, your connection pool is managed across all of Cloudflare regions and optimized for usage from Workers.

You can also use serverless driver libraries to connect to the HTTP-based proxies managed by the database provider. These may also provide connection pooling for traditional SQL databases and reduce the amount of roundtrips needed to establish a secure connection, similarly to Hyperdrive.

| Database                                                                                                    | Library or Driver                                                                                                                                                                                                                                                                                                                                                | Connection Method                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PlanetScale ↗](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript)  | [Hyperdrive (MySQL)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/planetscale), [Hyperdrive (PostgreSQL)](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/planetscale-postgres/), [@planetscale/database ↗](https://github.com/planetscale/database-js) | [mysql2](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql2/), [mysql](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/), [node-postgres](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/), [Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/), or API via client library |
| [Supabase ↗](https://github.com/supabase/supabase/tree/master/examples/with-cloudflare-workers)             | [Hyperdrive](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/supabase/), [@supabase/supabase-js ↗](https://github.com/supabase/supabase-js)                                                                                                                                                                | [node-postgres](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/),[Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/), or API via client library                                                                                                                                                                                                                                            |
| [Prisma ↗](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers)  | [prisma ↗](https://github.com/prisma/prisma)                                                                                                                                                                                                                                                                                                                     | API via client library                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [Neon ↗](https://blog.cloudflare.com/neon-postgres-database-from-workers/)                                  | [Hyperdrive](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/neon/), [@neondatabase/serverless ↗](https://neon.tech/blog/serverless-driver-for-postgres/)                                                                                                                                                  | [node-postgres](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/),[Postgres.js](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/), or API via client library                                                                                                                                                                                                                                            |
| [Hasura ↗](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | API                                                                                                                                                                                                                                                                                                                                                              | GraphQL API via fetch()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [Upstash Redis ↗](https://blog.cloudflare.com/cloudflare-workers-database-integration-with-upstash/)        | [@upstash/redis ↗](https://github.com/upstash/upstash-redis)                                                                                                                                                                                                                                                                                                     | API via client library                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [TiDB Cloud ↗](https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-cloudflare)                      | [@tidbcloud/serverless ↗](https://github.com/tidbcloud/serverless-js)                                                                                                                                                                                                                                                                                            | API via client library                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Once you have installed the necessary packages, use the APIs provided by these packages to connect to your database and perform operations on it. Refer to detailed links for service-specific instructions.

## Authentication

If your database requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [wrangler secret](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command:

Terminal window

```

wrangler secret put <SECRET_NAME>


```

Then, retrieve the secret value in your code using the following code snippet:

JavaScript

```

const secretValue = env.<SECRET_NAME>;


```

Use the secret value to authenticate with the external service. For example, if the external service requires an API key or database username and password for authentication, include these in using the relevant service's library or API.

For services that require mTLS authentication, use [mTLS certificates](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls) to present a client certificate.

## Next steps

* Learn how to connect to [an existing PostgreSQL database](https://developers.cloudflare.com/hyperdrive/) with Hyperdrive.
* Discover [other storage options available](https://developers.cloudflare.com/workers/platform/storage-options/) for use with Workers.
* [Create your first database](https://developers.cloudflare.com/d1/get-started/) with Cloudflare D1.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/databases/connecting-to-databases/#page","headline":"Connect to databases · Cloudflare Workers docs","description":"Learn about the different kinds of database integrations Cloudflare supports.","url":"https://developers.cloudflare.com/workers/databases/connecting-to-databases/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/databases/","name":"Databases"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/databases/connecting-to-databases/","name":"Connect to databases"}}]}
```
