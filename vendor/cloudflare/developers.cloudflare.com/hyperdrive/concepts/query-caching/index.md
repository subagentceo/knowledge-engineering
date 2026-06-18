---
title: Query caching
description: Hyperdrive automatically caches read queries to reduce database load and improve performance.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Query caching

Hyperdrive automatically caches all cacheable queries executed against your database when query caching is turned on, reducing the need to go back to your database (incurring latency and database load) for every query which can be especially useful for popular queries. Query caching is enabled by default.

## What does Hyperdrive cache?

Because Hyperdrive uses database protocols, it can differentiate between a mutating query (a query that writes to the database) and a non-mutating query (a read-only query), allowing Hyperdrive to safely cache read-only queries.

Besides determining the difference between a `SELECT` and an `INSERT`, Hyperdrive also parses the database wire-protocol and uses it to differentiate between a mutating or non-mutating query.

For example, a read query that populates the front page of a news site would be cached:

* [ PostgreSQL ](#tab-panel-8626)
* [ MySQL ](#tab-panel-8627)

```

-- Cacheable: uses a parameterized date value instead of CURRENT_DATE

SELECT * FROM articles WHERE DATE(published_time) = $1

ORDER BY published_time DESC LIMIT 50


```

```

-- Cacheable: uses a parameterized date value instead of CURDATE()

SELECT * FROM articles WHERE DATE(published_time) = ?

ORDER BY published_time DESC LIMIT 50


```

Mutating queries (including `INSERT`, `UPSERT`, or `CREATE TABLE`) and queries that use functions designated as [volatile ↗](https://www.postgresql.org/docs/current/xfunc-volatility.html) or [stable ↗](https://www.postgresql.org/docs/current/xfunc-volatility.html) by PostgreSQL are not cached:

* [ PostgreSQL ](#tab-panel-8628)
* [ MySQL ](#tab-panel-8629)

```

-- Not cached: mutating queries

INSERT INTO users(id, name, email) VALUES(555, 'Matt', 'hello@example.com');


-- Not cached: LASTVAL() is a volatile function

SELECT LASTVAL(), * FROM articles LIMIT 50;


-- Not cached: NOW() is a stable function

SELECT * FROM events WHERE created_at > NOW() - INTERVAL '1 hour';


```

```

-- Not cached: mutating queries

INSERT INTO users(id, name, email) VALUES(555, 'Thomas', 'hello@example.com');


-- Not cached: LAST_INSERT_ID() is a volatile function

SELECT LAST_INSERT_ID(), * FROM articles LIMIT 50;


-- Not cached: NOW() returns a non-deterministic value

SELECT * FROM events WHERE created_at > NOW() - INTERVAL 1 HOUR;


```

Common PostgreSQL functions that are **not cacheable** include:

| Function           | PostgreSQL volatility category | Cached |
| ------------------ | ------------------------------ | ------ |
| NOW()              | STABLE                         | No     |
| CURRENT\_TIMESTAMP | STABLE                         | No     |
| CURRENT\_DATE      | STABLE                         | No     |
| CURRENT\_TIME      | STABLE                         | No     |
| LOCALTIME          | STABLE                         | No     |
| LOCALTIMESTAMP     | STABLE                         | No     |
| TIMEOFDAY()        | VOLATILE                       | No     |
| RANDOM()           | VOLATILE                       | No     |
| LASTVAL()          | VOLATILE                       | No     |
| TXID\_CURRENT()    | STABLE                         | No     |

Only functions designated as `IMMUTABLE` by PostgreSQL (functions whose return value never changes for the same inputs) are compatible with Hyperdrive caching. If your query uses a `STABLE` or `VOLATILE` function, move the function call to your application code and pass the resulting value as a query parameter instead.

Function detection is text-based

Hyperdrive uses text-based pattern matching to detect uncacheable functions in your queries. This means that even references to function names inside SQL comments will cause the query to be marked as uncacheable.

For example, the following query would **not** be cached because `NOW()` appears in the comment:

```

-- We removed NOW() to keep this query cacheable

SELECT * FROM api_keys WHERE hash = $1 AND deleted = false;


```

Avoid referencing uncacheable function names anywhere in your query text, including comments.

## Default cache settings

The default caching behaviour for Hyperdrive is defined as below:

* `max_age` \= 60 seconds (1 minute)
* `stale_while_revalidate` \= 15 seconds

The `max_age` setting determines the maximum lifetime a query response will be served from cache. Cached responses may be evicted from the cache prior to this time if they are rarely used.

The `stale_while_revalidate` setting allows Hyperdrive to continue serving stale cache results for an additional period of time while it is revalidating the cache. In most cases, revalidation should happen rapidly.

You can set a maximum `max_age` of 1 hour.

## Disable caching

Disable caching on a per-Hyperdrive basis by using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI to set the `--caching-disabled` option to `true`.

For example:

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive update my-hyperdrive-id --origin-password my-db-password --caching-disabled true


```

You can also configure multiple Hyperdrive connections from a single application: one connection that enables caching for popular queries, and a second connection where you do not want to cache queries, but still benefit from Hyperdrive's latency benefits and connection pooling.

For example, using database drivers:

* [ PostgreSQL ](#tab-panel-8630)
* [ MySQL ](#tab-panel-8631)

index.ts

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create clients inside your handler — not in global scope

    const client = postgres(env.HYPERDRIVE.connectionString);

    // ...

    const clientNoCache = postgres(env.HYPERDRIVE_CACHE_DISABLED.connectionString);

    // ...

  },

} satisfies ExportedHandler<Env>;


```

index.ts

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Create connections inside your handler — not in global scope

    const connection = await createConnection({

      host: env.HYPERDRIVE.host,

      user: env.HYPERDRIVE.user,

      password: env.HYPERDRIVE.password,

      database: env.HYPERDRIVE.database,

      port: env.HYPERDRIVE.port,

    });

    // ...

    const connectionNoCache = await createConnection({

      host: env.HYPERDRIVE_CACHE_DISABLED.host,

      user: env.HYPERDRIVE_CACHE_DISABLED.user,

      password: env.HYPERDRIVE_CACHE_DISABLED.password,

      database: env.HYPERDRIVE_CACHE_DISABLED.database,

      port: env.HYPERDRIVE_CACHE_DISABLED.port,

    });

    // ...

  },

} satisfies ExportedHandler<Env>;


```

The Wrangler configuration remains the same both for PostgreSQL and MySQL.

* [  wrangler.jsonc ](#tab-panel-8632)
* [  wrangler.toml ](#tab-panel-8633)

JSONC

```

{

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<YOUR_HYPERDRIVE_CACHE_ENABLED_CONFIGURATION_ID>",

    },

    {

      "binding": "HYPERDRIVE_CACHE_DISABLED",

      "id": "<YOUR_HYPERDRIVE_CACHE_DISABLED_CONFIGURATION_ID>",

    },

  ],

}


```

TOML

```

[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<YOUR_HYPERDRIVE_CACHE_ENABLED_CONFIGURATION_ID>"


[[hyperdrive]]

binding = "HYPERDRIVE_CACHE_DISABLED"

id = "<YOUR_HYPERDRIVE_CACHE_DISABLED_CONFIGURATION_ID>"


```

## Next steps

* For more information, refer to [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* To connect to PostgreSQL, refer to [Connect to PostgreSQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/).
* For troubleshooting guidance, refer to [Troubleshoot and debug](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/concepts/query-caching/#page","headline":"Query caching · Cloudflare Hyperdrive docs","description":"Hyperdrive automatically caches read queries to reduce database load and improve performance.","url":"https://developers.cloudflare.com/hyperdrive/concepts/query-caching/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/concepts/query-caching/","name":"Query caching"}}]}
```
