---
title: SQLite-backed Durable Object Storage
description: API reference for SQLite-backed Durable Object storage, including the SQL API and key-value methods.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SQLite-backed Durable Object Storage

Note

This page documents the storage API for the newer SQLite-backed Durable Objects.

For the legacy KV-backed Durable Object storage API, refer to [KV-backed Durable Object Storage (Legacy)](https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/).

The Durable Object Storage API allows Durable Objects to access transactional and strongly consistent storage. A Durable Object's attached storage is private to its unique instance and cannot be accessed by other objects.

The Durable Object Storage API comes with several methods, including SQL, point-in-time recovery (PITR), key-value (KV), and alarm APIs. Available API methods depend on the storage backend for a Durable Objects class, either [SQLite](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) or [KV](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage).

| Methods 1           | SQLite-backed Durable Object class | KV-backed Durable Object class |
| ------------------- | ---------------------------------- | ------------------------------ |
| SQL API             | ✅                                  | ❌                              |
| PITR API            | ✅                                  | ❌                              |
| Synchronous KV API  | ✅ 2, 3                             | ❌                              |
| Asynchronous KV API | ✅ 3                                | ✅                              |
| Alarms API          | ✅                                  | ✅                              |

Footnotes

1 Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

2 KV API methods like `get()`, `put()`, `delete()`, or `list()` store data in a hidden SQLite table `__cf_kv`. Note that you will be able to view this table when listing all tables, but you will not be able to access its content through the SQL API.

3 SQLite-backed Durable Objects also use [synchronous KV API methods](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#synchronous-kv-api) using `ctx.storage.kv`, whereas KV-backed Durable Objects only provide [asynchronous KV API methods](https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/#asynchronous-kv-api).

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#synchronous-kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offer Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Storage billing on SQLite-backed Durable Objects

Storage billing for SQLite-backed Durable Objects will be enabled in January 2026, with a target date of January 7, 2026 (no earlier). Only SQLite storage usage on and after the billing target date will incur charges. For more information, refer to [Billing for SQLite Storage](https://developers.cloudflare.com/changelog/2025-12-12-durable-objects-sqlite-storage-billing/).

## Access storage

Durable Objects gain access to Storage API via the `DurableObjectStorage` interface and accessed by the `DurableObjectState::storage` property. This is frequently accessed via `this.ctx.storage` with the `ctx` parameter passed to the Durable Object constructor.

The following code snippet shows you how to store and retrieve data using the Durable Object Storage API.

* [  JavaScript ](#tab-panel-8215)
* [  TypeScript ](#tab-panel-8216)
* [  Python ](#tab-panel-8217)

JavaScript

```

export class Counter extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

  }


  async increment() {

    let value = (await this.ctx.storage.get("value")) || 0;

    value += 1;

    await this.ctx.storage.put("value", value);

    return value;

  }

}


```

TypeScript

```

export class Counter extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


    async increment(): Promise<number> {

      let value: number = (await this.ctx.storage.get('value')) || 0;

      value += 1;

      await this.ctx.storage.put('value', value);

      return value;

    }


}


```

Python

```

from workers import DurableObject


class Counter(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)


  async def increment(self):

    value = (await self.ctx.storage.get('value')) or 0

    value += 1

    await self.ctx.storage.put('value', value)

    return value


```

JavaScript is a single-threaded and event-driven programming language. This means that JavaScript runtimes, by default, allow requests to interleave with each other which can lead to concurrency bugs. The Durable Objects runtime uses a combination of input gates and output gates to avoid this type of concurrency bug when performing storage operations. Learn more in our [blog post ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

## SQL API

The `SqlStorage` interface encapsulates methods that modify the SQLite database embedded within a Durable Object. The `SqlStorage` interface is accessible via the [sql property](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#sql) of `DurableObjectStorage` class.

For example, using `sql.exec()` a user can create a table and insert rows.

* [  TypeScript ](#tab-panel-8207)
* [  Python ](#tab-panel-8208)

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {

  sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

    this.sql = ctx.storage.sql;


    this.sql.exec(`

      CREATE TABLE IF NOT EXISTS artist(

        artistid    INTEGER PRIMARY KEY,

        artistname  TEXT

      );

      INSERT INTO artist (artistid, artistname) VALUES

        (123, 'Alice'),

        (456, 'Bob'),

        (789, 'Charlie');

    `);

  }

}


```

Python

```

from workers import DurableObject


class MyDurableObject(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    self.sql = ctx.storage.sql


    self.sql.exec("""

      CREATE TABLE IF NOT EXISTS artist(

        artistid    INTEGER PRIMARY KEY,

        artistname  TEXT

      );

      INSERT INTO artist (artistid, artistname) VALUES

        (123, 'Alice'),

        (456, 'Bob'),

        (789, 'Charlie');

    """)


```

* SQL API methods accessed with `ctx.storage.sql` are only allowed on [Durable Object classes with SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) and will return an error if called on Durable Object classes with a KV-storage backend.
* When writing data, every row update of an index counts as an additional row. However, indexes may be beneficial for read-heavy use cases. Refer to [Index for SQLite Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#indexes-in-sqlite).
* Writing data to [SQLite virtual tables ↗](https://www.sqlite.org/vtab.html) also counts towards rows written.

Durable Objects support a subset of SQLite extensions for added functionality, including:

* [FTS5 module ↗](https://www.sqlite.org/fts5.html) for full-text search (including `fts5vocab`).
* [JSON extension ↗](https://www.sqlite.org/json1.html) for JSON functions and operators.
* [Math functions ↗](https://sqlite.org/lang%5Fmathfunc.html).

Refer to the [source code ↗](https://github.com/cloudflare/workerd/blob/4c42a4a9d3390c88e9bd977091c9d3395a6cd665/src/workerd/util/sqlite.c%2B%2B#L269) for the full list of supported functions.

### `exec`

`` exec(query: ` string `, ...bindings: ` any[] `) ``: ` SqlStorageCursor `

#### Parameters

* `query`: ` string `  
   * The SQL query string to be executed. `query` can contain `?` placeholders for parameter bindings. Multiple SQL statements, separated with a semicolon, can be executed in the `query`. With multiple SQL statements, any parameter bindings are applied to the last SQL statement in the `query`, and the returned cursor is only for the last SQL statement.
* `...bindings`: ` any[] ` Optional  
   * Optional variable number of arguments that correspond to the `?` placeholders in `query`.

#### Returns

A cursor (`SqlStorageCursor`) to iterate over query row results as objects. `SqlStorageCursor` is a JavaScript [Iterable ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration%5Fprotocols#the%5Fiterable%5Fprotocol), which supports iteration using `for (let row of cursor)`. `SqlStorageCursor` is also a JavaScript [Iterator ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration%5Fprotocols#the%5Fiterator%5Fprotocol), which supports iteration using `cursor.next()`.

Consume cursors synchronously

Although a cursor object can technically be held across an `await`, it does not provide a stable snapshot of the query results. A cursor resumed after an `await` may observe rows inserted, updated, or deleted after the cursor was created, including writes from a later implicit transaction that has not yet committed. If that later transaction rolls back, the cursor may have already returned data from a state that never became durable.

For predictable behavior, fully consume cursors synchronously before the next `await`, for example with `.toArray()` or `Array.from(cursor)`. Treat cursors that cross `await` boundaries as having no snapshot isolation guarantees.

TypeScript

```

// ✅ Safe: cursor is fully consumed before any await

const rows = this.ctx.storage.sql.exec("SELECT * FROM users").toArray();

const result = await fetch("https://example.com", { method: "POST", body: JSON.stringify(rows) });


```

TypeScript

```

// ⚠️ No snapshot isolation: cursor may reflect changes made after it was created

const cursor = this.ctx.storage.sql.exec("SELECT * FROM users");

await fetch("https://example.com/notify");

// Rows returned here may include writes that occurred during the await,

// including uncommitted data from a later implicit transaction.

const rows = cursor.toArray();


```

`SqlStorageCursor` supports the following methods:

* `next()`  
   * Returns an object representing the next value of the cursor. The returned object has `done` and `value` properties adhering to the JavaScript [Iterator ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration%5Fprotocols#the%5Fiterator%5Fprotocol). `done` is set to `false` when a next value is present, and `value` is set to the next row object in the query result. `done` is set to `true` when the entire cursor is consumed, and no `value` is set.
* `toArray()`  
   * Iterates through remaining cursor value(s) and returns an array of returned row objects.
* `one()`  
   * Returns a row object if query result has exactly one row. If query result has zero rows or more than one row, `one()` throws an exception.
* `raw()`: ` Iterator `  
   * Returns an Iterator over the same query results, with each row as an array of column values (with no column names) rather than an object.  
   * Returned Iterator supports `next()` and `toArray()` methods above.  
   * Returned cursor and `raw()` iterator iterate over the same query results and can be combined. For example:

* [  TypeScript ](#tab-panel-8209)
* [  Python ](#tab-panel-8210)

TypeScript

```

let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");

let rawResult = cursor.raw().next();


if (!rawResult.done) {

  console.log(rawResult.value); // prints [ 123, 'Alice' ]

} else {

  // query returned zero results

}


console.log(cursor.toArray()); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]


```

Python

```

cursor = self.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;")

raw_result = cursor.raw().next()


if not raw_result.done:

  print(raw_result.value)  # prints [ 123, 'Alice' ]

else:

  # query returned zero results

  pass


print(cursor.toArray())  # prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]


```

`SqlStorageCursor` has the following properties:

* `columnNames`: ` string[] `  
   * The column names of the query in the order they appear in each row array returned by the `raw` iterator.
* `rowsRead`: ` number `  
   * The number of rows read so far as part of this SQL `query`. This may increase as you iterate the cursor. The final value is used for [SQL billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).
* `rowsWritten`: ` number `  
   * The number of rows written so far as part of this SQL `query`. This may increase as you iterate the cursor. The final value is used for [SQL billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).
* Any numeric value in a column is affected by JavaScript's 52-bit precision for numbers. If you store a very large number (in `int64`), then retrieve the same value, the returned value may be less precise than your original number.

SQL transactions

Note that `sql.exec()` cannot execute transaction-related statements like `BEGIN TRANSACTION` or `SAVEPOINT`. Instead, use the [ctx.storage.transaction()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#transaction) or [ctx.storage.transactionSync()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#transactionsync) APIs to start a transaction, and then execute SQL queries in your callback.

#### Examples

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

### `databaseSize`

`databaseSize`: ` number `

#### Returns

The current SQLite database size in bytes.

* [  TypeScript ](#tab-panel-8211)
* [  Python ](#tab-panel-8212)

TypeScript

```

let size = ctx.storage.sql.databaseSize;


```

Python

```

size = ctx.storage.sql.databaseSize


```

## PITR (Point In Time Recovery) API

For [SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class), the following point-in-time-recovery (PITR) API methods are available to restore a Durable Object's embedded SQLite database to any point in time in the past 30 days. These methods apply to the entire SQLite database contents, including both the object's stored SQL data and stored key-value data using the key-value `put()` API. The PITR API is not supported in local development because a durable log of data changes is not stored locally.

The PITR API represents points in time using 'bookmarks'. A bookmark is a mostly alphanumeric string like `0000007b-0000b26e-00001538-0c3e87bb37b3db5cc52eedb93cd3b96b`. Bookmarks are designed to be lexically comparable: a bookmark representing an earlier point in time compares less than one representing a later point, using regular string comparison.

### `getCurrentBookmark`

`ctx.storage.getCurrentBookmark()`: ` Promise<string> `

* Returns a bookmark representing the current point in time in the object's history.

### `getBookmarkForTime`

`` ctx.storage.getBookmarkForTime(timestamp: ` number | Date `) ``: ` Promise<string> `

* Returns a bookmark representing approximately the given point in time, which must be within the last 30 days. If the timestamp is represented as a number, it is converted to a date as if using `new Date(timestamp)`.

### `onNextSessionRestoreBookmark`

`` ctx.storage.onNextSessionRestoreBookmark(bookmark: ` string `) ``: ` Promise<string> `

* Configures the Durable Object so that the next time it restarts, it should restore its storage to exactly match what the storage contained at the given bookmark. After calling this, the application should typically invoke `ctx.abort()` to restart the Durable Object, thus completing the point-in-time recovery.

This method returns a special bookmark representing the point in time immediately before the recovery takes place (even though that point in time is still technically in the future). Thus, after the recovery completes, it can be undone by performing a second recovery to this bookmark.

* [  TypeScript ](#tab-panel-8213)
* [  Python ](#tab-panel-8214)

TypeScript

```

const DAY_MS = 24*60*60*1000;

// restore to 2 days ago

let bookmark = ctx.storage.getBookmarkForTime(Date.now() - 2 * DAYS_MS);

ctx.storage.onNextSessionRestoreBookmark(bookmark);


```

Python

```

from datetime import datetime, timedelta


now = datetime.now()

# restore to 2 days ago

bookmark = ctx.storage.getBookmarkForTime(now - timedelta(days=2))

ctx.storage.onNextSessionRestoreBookmark(bookmark)


```

## Synchronous KV API

### `get`

* `` ctx.storage.kv.get(key ` string `) ``: ` Any, undefined `  
   * Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.

### `put`

* `` ctx.storage.kv.put(key ` string `, value ` any `) ``: ` void `  
   * Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm), which is true of most types.  
   For the size of keys and values refer to [SQLite-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#sqlite-backed-durable-objects-general-limits)

### `delete`

* `` ctx.storage.kv.delete(key ` string `) ``: ` boolean `  
   * Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.

### `list`

* `` ctx.storage.kv.list(options ` Object ` optional) ``: ` Iterable<string, any> `  
   * Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings.  
   * The type of each returned value in the [Iterable ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration%5Fprotocols#the%5Fiterable%5Fprotocol) will be whatever was previously written for the corresponding key.  
   * Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](https://developers.cloudflare.com/durable-objects/platform/limits/). If that is a concern, pass options to `list` as documented below.

#### Supported options

* `start` ` string `  
   * Key at which the list results should start, inclusive.
* `startAfter` ` string `  
   * Key after which the list results should start, exclusive. Cannot be used simultaneously with `start`.
* `end` ` string `  
   * Key at which the list results should end, exclusive.
* `prefix` ` string `  
   * Restricts results to only include key-value pairs whose keys begin with the prefix.
* `reverse` ` boolean `  
   * If true, return results in descending order instead of the default ascending order.  
   * Enabling `reverse` does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.
* `limit` ` number `  
   * Maximum number of key-value pairs to return.

## Asynchronous KV API

### get

* `` ctx.storage.get(key ` string `, options ` Object ` optional) ``: ` Promise<any> `  
   * Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.
* `` ctx.storage.get(keys ` Array<string> `, options ` Object ` optional) ``: ` Promise<Map<string, any>> `  
   * Retrieves the values associated with each of the provided keys. The type of each returned value in the [Map ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Map) will be whatever was previously written for the corresponding key. Results in the `Map` will be sorted in increasing order of their UTF-8 encodings, with any requested keys that do not exist being omitted. Supports up to 128 keys at a time.

#### Supported options

* `allowConcurrency`: ` boolean `  
   * By default, the system will pause delivery of I/O events to the Object while a storage operation is in progress, in order to avoid unexpected race conditions. Pass `allowConcurrency: true` to opt out of this behavior and allow concurrent events to be delivered.
* `noCache`: ` boolean `  
   * If true, then the key/value will not be inserted into the in-memory cache. If the key is already in the cache, the cached value will be returned, but its last-used time will not be updated. Use this when you expect this key will not be used again in the near future. This flag is only a hint. This flag will never change the semantics of your code, but it may affect performance.

### put

* `` put(key ` string `, value ` any `, options ` Object ` optional) ``: ` Promise `  
   * Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm), which is true of most types.  
   The size of keys and values have different limits depending on the Durable Object storage backend you are using. Refer to either:  
         * [SQLite-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#sqlite-backed-durable-objects-general-limits)  
         * [KV-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#key-value-backed-durable-objects-general-limits).  
   On a KV-backed Durable Object, if the serialized value exceeds the 128 KiB (131072 bytes) value-size limit, `put()` throws a `RangeError` (for example, `Values cannot be larger than 131072 bytes.`) before the write is applied.
* `` put(entries ` Object `, options ` Object ` optional) ``: ` Promise `  
   * Takes an Object and stores each of its keys and values to storage.  
   * Each value can be any type supported by the [structured clone algorithm ↗](https://developer.mozilla.org/en-US/docs/Web/API/Web%5FWorkers%5FAPI/Structured%5Fclone%5Falgorithm), which is true of most types.  
   * Supports up to 128 key-value pairs at a time. The size of keys and values have different limits depending on the flavor of Durable Object you are using. Refer to either:  
         * [SQLite-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#sqlite-backed-durable-objects-general-limits)  
         * [KV-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#key-value-backed-durable-objects-general-limits)

### delete

* `` delete(key ` string `, options ` Object ` optional) ``: ` Promise<boolean> `  
   * Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.
* `` delete(keys ` Array<string> `, options ` Object ` optional) ``: ` Promise<number> `  
   * Deletes the provided keys and their associated values. Supports up to 128 keys at a time. Returns a count of the number of key-value pairs deleted.

#### Supported options

* `put()`, `delete()` and `deleteAll()` support the following options:
* `allowUnconfirmed` ` boolean `  
   * By default, the system will pause outgoing network messages from the Durable Object until all previous writes have been confirmed flushed to disk. If the write fails, the system will reset the Object, discard all outgoing messages, and respond to any clients with errors instead.  
   * This way, Durable Objects can continue executing in parallel with a write operation, without having to worry about prematurely confirming writes, because it is impossible for any external party to observe the Object's actions unless the write actually succeeds.  
   * After any write, subsequent network messages may be slightly delayed. Some applications may consider it acceptable to communicate on the basis of unconfirmed writes. Some programs may prefer to allow network traffic immediately. In this case, set `allowUnconfirmed` to `true` to opt out of the default behavior.  
   * If you want to allow some outgoing network messages to proceed immediately but not others, you can use the allowUnconfirmed option to avoid blocking the messages that you want to proceed and then separately call the [sync()](#sync) method, which returns a promise that only resolves once all previous writes have successfully been persisted to disk.
* `noCache` ` boolean `  
   * If true, then the key/value will be discarded from memory as soon as it has completed writing to disk.  
   * Use `noCache` if the key will not be used again in the near future. `noCache` will never change the semantics of your code, but it may affect performance.  
   * If you use `get()` to retrieve the key before the write has completed, the copy from the write buffer will be returned, thus ensuring consistency with the latest call to `put()`.

Automatic write coalescing

If you invoke `put()` (or `delete()`) multiple times without performing any `await` in the meantime, the operations will automatically be combined and submitted atomically. In case of a machine failure, either all of the writes will have been stored to disk or none of the writes will have been stored to disk.

Write buffer behavior

The `put()` method returns a `Promise`, but most applications can discard this promise without using `await`. The `Promise` usually completes immediately, because `put()` writes to an in-memory write buffer that is flushed to disk asynchronously. However, if an application performs a large number of `put()` without waiting for any I/O, the write buffer could theoretically grow large enough to cause the isolate to exceed its 128 MB memory limit. To avoid this scenario, such applications should use `await` on the `Promise` returned by `put()`. The system will then apply backpressure onto the application, slowing it down so that the write buffer has time to flush. Using `await` will disable automatic write coalescing.

### list

* `` list(options ` Object ` optional) ``: ` Promise<Map<string, any>> `  
   * Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings.  
   * The type of each returned value in the [Map ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Map) will be whatever was previously written for the corresponding key.  
   * Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](https://developers.cloudflare.com/durable-objects/platform/limits/). If that is a concern, pass options to `list` as documented below.

#### Supported options

* `start` ` string `  
   * Key at which the list results should start, inclusive.
* `startAfter` ` string `  
   * Key after which the list results should start, exclusive. Cannot be used simultaneously with `start`.
* `end` ` string `  
   * Key at which the list results should end, exclusive.
* `prefix` ` string `  
   * Restricts results to only include key-value pairs whose keys begin with the prefix.
* `reverse` ` boolean `  
   * If true, return results in descending order instead of the default ascending order.  
   * Enabling `reverse` does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.
* `limit` ` number `  
   * Maximum number of key-value pairs to return.
* `allowConcurrency` ` boolean `  
   * Same as the option to [get()](#do-kv-async-get), above.
* `noCache` ` boolean `  
   * Same as the option to [get()](#do-kv-async-get), above.

## Alarms

### `getAlarm`

* `` getAlarm(options ` Object ` optional) ``: ` Promise<Number | null> `  
   * Retrieves the current alarm time (if set) as integer milliseconds since epoch. The alarm is considered to be set if it has not started, or if it has failed and any retry has not begun. If no alarm is set, `getAlarm()` returns `null`.

#### Supported options

* Same options as [get()](#do-kv-async-get), but without `noCache`.

### `setAlarm`

* `` setAlarm(scheduledTime ` Date | number `, options ` Object ` optional) ``: ` Promise `  
   * Sets the current alarm time, accepting either a JavaScript `Date`, or integer milliseconds since epoch.  
If `setAlarm()` is called with a time equal to or before `Date.now()`, the alarm will be scheduled for asynchronous execution in the immediate future. If the alarm handler is currently executing in this case, it will not be canceled. Alarms can be set to millisecond granularity and will usually execute within a few milliseconds after the set time, but can be delayed by up to a minute due to maintenance or failures while failover takes place.

### `deleteAlarm`

* `` deleteAlarm(options ` Object ` optional) ``: ` Promise `  
   * Deletes the alarm if one exists. Does not cancel the alarm handler if it is currently executing.

#### Supported options

* `setAlarm()` and `deleteAlarm()` support the same options as [put()](#do-kv-async-put), but without `noCache`.

## Other

### `deleteAll`

* `` deleteAll(options ` Object ` optional) ``: ` Promise `  
   * Deletes all stored data, effectively deallocating all storage used by the Durable Object. For Durable Objects with a key-value storage backend, `deleteAll()` removes all keys and associated values for an individual Durable Object. For Durable Objects with a [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class), `deleteAll()` removes the entire contents of a Durable Object's private SQLite database, including both SQL data and key-value data.  
   * For Durable Objects with a key-value storage backend, an in-progress `deleteAll()` operation can fail, which may leave a subset of data undeleted. Durable Objects with a SQLite storage backend do not have a partial `deleteAll()` issue because `deleteAll()` operations are atomic (all or nothing).  
   * For Workers with a compatibility date of `2026-02-24` or later, `deleteAll()` also deletes any active [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/). For earlier compatibility dates, `deleteAll()` does not delete alarms. Use [deleteAlarm()](https://developers.cloudflare.com/durable-objects/api/alarms/#deletealarm) separately, or enable the `delete_all_deletes_alarm` [compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/).

### `transactionSync`

* `transactionSync(callback)`: ` any `  
   * Only available when using SQLite-backed Durable Objects.  
   * Invokes `callback()` wrapped in a transaction, and returns its result.  
   * If `callback()` throws an exception, the transaction will be rolled back.  
   * The callback must complete synchronously, that is, it should not be declared `async` nor otherwise return a Promise. Only synchronous storage operations can be part of the transaction. This is intended for use with SQL queries using [ctx.storage.sql.exec()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#exec), which complete synchronously.

### `transaction`

* `transaction(closureFunction(txn))`: ` Promise `  
   * Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.  
   * Explicit transactions are no longer necessary. Any series of write operations with no intervening `await` will automatically be submitted atomically, and the system will prevent concurrent events from executing while `await` a read operation (unless you use `allowConcurrency: true`). Therefore, a series of reads followed by a series of writes (with no other intervening I/O) are automatically atomic and behave like a transaction.
* `txn`  
   * Provides access to the `put()`, `get()`, `delete()`, and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` Object instead of on the top-level `ctx.storage` Object.  
         
   Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` Object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.  
   * When using [the SQLite-backed storage engine](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class), the `txn` object is obsolete. Any storage operations performed directly on the `ctx.storage` object, including SQL queries using [ctx.storage.sql.exec()](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#exec), will be considered part of the transaction.

### `sync`

* `sync()`: ` Promise `  
   * Synchronizes any pending writes to disk.  
   * This is similar to normal behavior from automatic write coalescing. If there are any pending writes in the write buffer (including those submitted with [the allowUnconfirmed option](#supported-options-1)), the returned promise will resolve when they complete. If there are no pending writes, the returned promise will be already resolved.

## Storage properties

### `sql`

`sql` is a readonly property of type `DurableObjectStorage` encapsulating the [SQL API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#synchronous-sql-api).

## Related resources

* [Durable Objects: Easy, Fast, Correct Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
* [Zero-latency SQLite storage in every Durable Object blog ↗](https://blog.cloudflare.com/sqlite-in-durable-objects/)
* [WebSockets API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/#page","headline":"SQLite-backed Durable Object Storage · Cloudflare Durable Objects docs","description":"API reference for SQLite-backed Durable Object storage, including the SQL API and key-value methods.","url":"https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/sqlite-storage-api/","name":"SQLite-backed Durable Object Storage"}}]}
```
