---
title: Access Durable Objects Storage
description: Read and write persistent data in Durable Objects using the Storage API, from within a Worker or externally.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access Durable Objects Storage

Durable Objects are a powerful compute API that provides a compute with storage building block. Each Durable Object has its own private, transactional, and strongly consistent storage. Durable ObjectsStorage API provides access to a Durable Object's attached storage.

A Durable Object's [in-memory state](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) is preserved as long as the Durable Object is not evicted from memory. Inactive Durable Objects with no incoming request traffic can be evicted. There are normal operations like [code deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/) that trigger Durable Objects to restart and lose their in-memory state. For these reasons, you should use Storage API to persist state durably on disk that needs to survive eviction or restart of Durable Objects.

## Access storage

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#synchronous-kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offer Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Storage billing on SQLite-backed Durable Objects

Storage billing for SQLite-backed Durable Objects will be enabled in January 2026, with a target date of January 7, 2026 (no earlier). Only SQLite storage usage on and after the billing target date will incur charges. For more information, refer to [Billing for SQLite Storage](https://developers.cloudflare.com/changelog/2025-12-12-durable-objects-sqlite-storage-billing/).

[Storage API methods](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) are available on `ctx.storage` parameter passed to the Durable Object constructor. Storage API has several methods, including SQL, point-in-time recovery (PITR), key-value (KV), and alarm APIs.

Only Durable Object classes with a SQLite storage backend can access SQL API.

### Create SQLite-backed Durable Object class

Use `new_sqlite_classes` on the migration in your Worker's Wrangler file:

* [  wrangler.jsonc ](#tab-panel-8231)
* [  wrangler.toml ](#tab-panel-8232)

JSONC

```

{

  "migrations": [

    {

      "tag": "v1", // Should be unique for each entry

      "new_sqlite_classes": [ // Array of new classes

        "MyDurableObject"

      ]

    }

  ]

}


```

TOML

```

[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyDurableObject" ]


```

[SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#exec) is available on `ctx.storage.sql` parameter passed to the Durable Object constructor.

SQLite-backed Durable Objects also offer [point-in-time recovery API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#pitr-point-in-time-recovery-api), which uses bookmarks to allow you to restore a Durable Object's embedded SQLite database to any point in time in the past 30 days.

### Initialize instance variables from storage

A common pattern is to initialize a Durable Object from [persistent storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) and set instance variables the first time it is accessed. Since future accesses are routed to the same Durable Object, it is then possible to return any initialized values without making further calls to persistent storage.

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export class Counter extends DurableObject {

  value: number;


  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);


    // `blockConcurrencyWhile()` ensures no requests are delivered until

    // initialization completes.

    ctx.blockConcurrencyWhile(async () => {

      // After initialization, future reads do not need to access storage.

      this.value = (await ctx.storage.get("value")) || 0;

    });

  }


  async getCounterValue() {

    return this.value;

  }

}


```

### Remove a Durable Object's storage

A Durable Object fully ceases to exist if, when it shuts down, its storage is empty. If you never write to a Durable Object's storage at all (including setting alarms), then storage remains empty, and so the Durable Object will no longer exist once it shuts down.

However if you ever write using [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), including setting alarms, then you must explicitly call [storage.deleteAll()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#deleteall) to empty storage and [storage.deleteAlarm()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#deletealarm) if you've configured an alarm. It is not sufficient to simply delete the specific data that you wrote, such as deleting a key or dropping a table, as some metadata may remain. The only way to remove all storage is to call `deleteAll()`. Calling `deleteAll()` ensures that a Durable Object will not be billed for storage.

TypeScript

```

export class MyDurableObject extends DurableObject<Env> {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


  // Clears Durable Object storage

  async clearDo(): Promise<void> {

    // If you've configured a Durable Object alarm

    await this.ctx.storage.deleteAlarm();


    // This will delete all the storage associated with this Durable Object instance

    // This will also delete the Durable Object instance itself

    await this.ctx.storage.deleteAll();

  }

}


```

## SQL API Examples

[SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#exec) examples below use the following SQL schema:

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {

  sql: SqlStorage

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

    this.sql = ctx.storage.sql;


    this.sql.exec(`CREATE TABLE IF NOT EXISTS artist(

      artistid    INTEGER PRIMARY KEY,

      artistname  TEXT

    );INSERT INTO artist (artistid, artistname) VALUES

      (123, 'Alice'),

      (456, 'Bob'),

      (789, 'Charlie');`

    );

  }

}


```

Iterate over query results as row objects:

TypeScript

```

  let cursor = this.sql.exec("SELECT * FROM artist;");


  for (let row of cursor) {

    // Iterate over row object and do something

  }


```

Convert query results to an array of row objects:

TypeScript

```

  // Return array of row objects: [{"artistid":123,"artistname":"Alice"},{"artistid":456,"artistname":"Bob"},{"artistid":789,"artistname":"Charlie"}]

  let resultsArray1 = this.sql.exec("SELECT * FROM artist;").toArray();

  // OR

  let resultsArray2 = Array.from(this.sql.exec("SELECT * FROM artist;"));

  // OR

  let resultsArray3 = [...this.sql.exec("SELECT * FROM artist;")]; // JavaScript spread syntax


```

Convert query results to an array of row values arrays:

TypeScript

```

  // Returns [[123,"Alice"],[456,"Bob"],[789,"Charlie"]]

  let cursor = this.sql.exec("SELECT * FROM artist;");

  let resultsArray = cursor.raw().toArray();


  // Returns ["artistid","artistname"]

  let columnNameArray = this.sql.exec("SELECT * FROM artist;").columnNames.toArray();


```

Get first row object of query results:

TypeScript

```

  // Returns {"artistid":123,"artistname":"Alice"}

  let firstRow = this.sql.exec("SELECT * FROM artist ORDER BY artistname DESC;").toArray()[0];


```

Check if query results have exactly one row:

TypeScript

```

  // returns error

  this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;").one();


  // returns { artistid: 123, artistname: 'Alice' }

  let oneRow = this.sql.exec("SELECT * FROM artist WHERE artistname = ?;", "Alice").one()


```

Returned cursor behavior:

TypeScript

```

  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");

  let result = cursor.next();

  if (!result.done) {

    console.log(result.value); // prints { artistid: 123, artistname: 'Alice' }

  } else {

    // query returned zero results

  }


  let remainingRows = cursor.toArray();

  console.log(remainingRows); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]


```

Returned cursor and `raw()` iterator iterate over the same query results:

TypeScript

```

  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");

  let result = cursor.raw().next();


  if (!result.done) {

    console.log(result.value); // prints [ 123, 'Alice' ]

  } else {

    // query returned zero results

  }


  console.log(cursor.toArray()); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]


```

`sql.exec().rowsRead()`:

TypeScript

```

  let cursor = this.sql.exec("SELECT * FROM artist;");

  cursor.next()

  console.log(cursor.rowsRead); // prints 1


  cursor.toArray(); // consumes remaining cursor

  console.log(cursor.rowsRead); // prints 3


```

## TypeScript and query results

You can use TypeScript [type parameters ↗](https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables) to provide a type for your results, allowing you to benefit from type hints and checks when iterating over the results of a query.

Warning

Providing a type parameter does _not_ validate that the query result matches your type definition. In TypeScript, properties (fields) that do not exist in your result type will be silently dropped.

Your type must conform to the shape of a TypeScript [Record ↗](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) type representing the name (`string`) of the column and the type of the column. The column type must be a valid `SqlStorageValue`: one of `ArrayBuffer | string | number | null`.

For example,

TypeScript

```

type User = {

  id: string;

  name: string;

  email_address: string;

  version: number;

};


```

This type can then be passed as the type parameter to a `sql.exec()` call:

TypeScript

```

// The type parameter is passed between angle brackets before the function argument:

const result = this.ctx.storage.sql

  .exec<User>(

    "SELECT id, name, email_address, version FROM users WHERE id = ?",

    user_id,

  )

  .one();

// result will now have a type of "User"


// Alternatively, if you are iterating over results using a cursor

let cursor = this.sql.exec<User>(

  "SELECT id, name, email_address, version FROM users WHERE id = ?",

  user_id,

);

for (let row of cursor) {

  // Each row object will be of type User

}


// Or, if you are using raw() to convert results into an array, define an array type:

type UserRow = [

  id: string,

  name: string,

  email_address: string,

  version: number,

];


// ... and then pass it as the type argument to the raw() method:

let cursor = sql

  .exec(

    "SELECT id, name, email_address, version FROM users WHERE id = ?",

    user_id,

  )

  .raw<UserRow>();


for (let row of cursor) {

  // row is of type User

}


```

You can represent the shape of any result type you wish, including more complex types. If you are performing a`JOIN` across multiple tables, you can compose a type that reflects the results of your queries.

## Indexes in SQLite

Creating indexes for your most queried tables and filtered columns reduces how much data is scanned and improves query performance at the same time. If you have a read-heavy workload (most common), this can be particularly advantageous. Writing to columns referenced in an index will add at least one (1) additional row written to account for updating the index, but this is typically offset by the reduction in rows read due to the benefits of an index.

## SQL in Durable Objects vs D1

Cloudflare Workers offers a SQLite-backed serverless database product - [D1](https://developers.cloudflare.com/d1/). How should you compare [SQLite in Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and D1?

**D1 is a managed database product.**

D1 fits into a familiar architecture for developers, where application servers communicate with a database over the network. Application servers are typically Workers; however, D1 also supports external, non-Worker access via an [HTTP API ↗](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/), which helps unlock [third-party tooling](https://developers.cloudflare.com/d1/reference/community-projects/#%5Ftop) support for D1.

D1 aims for a "batteries included" feature set, including the above HTTP API, [database schema management](https://developers.cloudflare.com/d1/reference/migrations/#%5Ftop), [data import/export](https://developers.cloudflare.com/d1/best-practices/import-export-data/), and [database query insights](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-insights).

With D1, your application code and SQL database queries are not colocated which can impact application performance. If performance is a concern with D1, Workers has [Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/#%5Ftop) to dynamically run your Worker in the best location to reduce total Worker request latency, considering everything your Worker talks to, including D1.

**SQLite in Durable Objects is a lower-level compute with storage building block for distributed systems.**

By design, Durable Objects are accessed with Workers-only.

Durable Objects require a bit more effort, but in return, give you more flexibility and control. With Durable Objects, you must implement two pieces of code that run in different places: a front-end Worker which routes incoming requests from the Internet to a unique Durable Object, and the Durable Object itself, which runs on the same machine as the SQLite database. You get to choose what runs where, and it may be that your application benefits from running some application business logic right next to the database.

With SQLite in Durable Objects, you may also need to build some of your own database tooling that comes out-of-the-box with D1.

SQL query pricing and limits are intended to be identical between D1 ([pricing](https://developers.cloudflare.com/d1/platform/pricing/), [limits](https://developers.cloudflare.com/d1/platform/limits/)) and SQLite in Durable Objects ([pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend), [limits](https://developers.cloudflare.com/durable-objects/platform/limits/)).

## Related resources

* [Zero-latency SQLite storage in every Durable Object blog post ↗](https://blog.cloudflare.com/sqlite-in-durable-objects)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#page","headline":"Access Durable Objects Storage · Cloudflare Durable Objects docs","description":"Read and write persistent data in Durable Objects using the Storage API, from within a Worker or externally.","url":"https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/best-practices/access-durable-objects-storage/","name":"Access Durable Objects Storage"}}]}
```
