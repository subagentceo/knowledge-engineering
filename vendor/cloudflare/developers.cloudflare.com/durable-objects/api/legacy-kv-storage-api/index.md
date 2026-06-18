---
title: KV-backed Durable Object Storage (Legacy)
description: API reference for the legacy KV-backed Durable Objects storage methods, including get, put, delete, and list.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# KV-backed Durable Object Storage (Legacy)

Note

This page documents the storage API for legacy KV-backed Durable Objects.

For the newer SQLite-backed Durable Object storage API, refer to [SQLite-backed Durable Object Storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api).

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

## Access storage

Durable Objects gain access to Storage API via the `DurableObjectStorage` interface and accessed by the `DurableObjectState::storage` property. This is frequently accessed via `this.ctx.storage` with the `ctx` parameter passed to the Durable Object constructor.

The following code snippet shows you how to store and retrieve data using the Durable Object Storage API.

* [  JavaScript ](#tab-panel-8201)
* [  TypeScript ](#tab-panel-8202)
* [  Python ](#tab-panel-8203)

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

    let value: number = (await this.ctx.storage.get("value")) || 0;

    value += 1;

    await this.ctx.storage.put("value", value);

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

    value = (await self.ctx.storage.get("value")) or 0

    value += 1

    await self.ctx.storage.put("value", value)

    return value


```

JavaScript is a single-threaded and event-driven programming language. This means that JavaScript runtimes, by default, allow requests to interleave with each other which can lead to concurrency bugs. The Durable Objects runtime uses a combination of input gates and output gates to avoid this type of concurrency bug when performing storage operations. Learn more in our [blog post ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

## Asynchronous KV API

KV-backed Durable Objects provide KV API methods which are asynchronous.

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

## Related resources

* [Durable Objects: Easy, Fast, Correct Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
* [Zero-latency SQLite storage in every Durable Object blog ↗](https://blog.cloudflare.com/sqlite-in-durable-objects/)
* [WebSockets API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/#page","headline":"KV-backed Durable Object Storage (Legacy) · Cloudflare Durable Objects docs","description":"API reference for the legacy KV-backed Durable Objects storage methods, including get, put, delete, and list.","url":"https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/legacy-kv-storage-api/","name":"KV-backed Durable Object Storage (Legacy)"}}]}
```
