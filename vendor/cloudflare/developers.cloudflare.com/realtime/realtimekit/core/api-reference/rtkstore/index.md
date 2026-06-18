---
title: RTKStore
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKStore

This module represents a single global store. The store can be accessed from the `meeting.stores` module.

**Returns**: An instance of RTKStore.  
**Example**

JavaScript

```

const handRaiseRTKStore = meeting.stores.stores.get('handRaise');


```

* [RTKStore](#module%5FRTKStore) ⇒  
   * [module.exports](#exp%5Fmodule%5FRTKStore--module.exports) ⏏  
         * [new module.exports(args)](#new%5Fmodule%5FRTKStore--module.exports%5Fnew)  
         * [.set(key, value, \[sync\], \[emit\])](#module%5FRTKStore--module.exports+set) ⇒ `Promise.<void>`  
         * [.bulkSet(data)](#module%5FRTKStore--module.exports+bulkSet) ⇒ `Promise.<void>`  
         * [.update(key, value, \[sync\])](#module%5FRTKStore--module.exports+update) ⇒ `Promise.<void>`  
         * [.delete(key, \[sync\], \[emit\])](#module%5FRTKStore--module.exports+delete) ⇒ `Promise.<void>`  
         * [.bulkDelete(data)](#module%5FRTKStore--module.exports+bulkDelete) ⇒ `Promise.<void>`  
         * [.get(key)](#module%5FRTKStore--module.exports+get) ⇒ `any`  
         * [.getAll()](#module%5FRTKStore--module.exports+getAll) ⇒ `RTKStoreData`  
         * [.updateRateLimits(num, period)](#module%5FRTKStore--module.exports+updateRateLimits)  
         * [.updateBulkRateLimits(num, period)](#module%5FRTKStore--module.exports+updateBulkRateLimits)  
         * [.subscribe(key, cb)](#module%5FRTKStore--module.exports+subscribe) ⇒ `void`  
         * [.unsubscribe(key, \[cb\])](#module%5FRTKStore--module.exports+unsubscribe) ⇒ `void`  
         * [.populate(data)](#module%5FRTKStore--module.exports+populate)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(args)

| Param              | Type                |
| ------------------ | ------------------- |
| args               | Object              |
| args.name          | string              |
| args.socketHandler | PluginSocketHandler |
| args.meetingId     | string              |

#### module.exports.set(key, value, \[sync\], \[emit\]) ⇒ `Promise.<void>`

Sets a value in the store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default                                | Description                             |
| -------- | ------- | -------------------------------------- | --------------------------------------- |
| key      | string  | Unique identifier used to store value. |                                         |
| value    | any     | Data to be set.                        |                                         |
| \[sync\] | boolean | true                                   | Whether to sync change to remote store. |
| \[emit\] | boolean | false                                  | Whether to emit to local subscribers.   |

#### module.exports.bulkSet(data) ⇒ `Promise.<void>`

Sets multiple values in the store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `Promise.<void>` \- A promise.

| Param | Type                                |
| ----- | ----------------------------------- |
| data  | Array.<{key: string, payload: any}> |

#### module.exports.update(key, value, \[sync\]) ⇒ `Promise.<void>`

Updates an already existing value in the store. If the value stored is `['a', 'b']`, the operation`store.update(key, ['c'])` will modify the value to `['a','b','c']`.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default                                | Description                             |
| -------- | ------- | -------------------------------------- | --------------------------------------- |
| key      | string  | Unique identifier used to store value. |                                         |
| value    | any     | Data to be updated.                    |                                         |
| \[sync\] | boolean | true                                   | Whether to sync change to remote store. |

#### module.exports.delete(key, \[sync\], \[emit\]) ⇒ `Promise.<void>`

Deletes a key value pair form the store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default                                | Description                             |
| -------- | ------- | -------------------------------------- | --------------------------------------- |
| key      | string  | Unique identifier used to store value. |                                         |
| \[sync\] | boolean | true                                   | Whether to sync change to remote store. |
| \[emit\] | boolean | false                                  | Whether to emit to local subscribers.   |

#### module.exports.bulkDelete(data) ⇒ `Promise.<void>`

Deletes multiple values from the store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `Promise.<void>` \- A promise.

| Param | Type                  |
| ----- | --------------------- |
| data  | Array.<{key: string}> |

#### module.exports.get(key) ⇒ `any`

Returns value for the given key.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `any` \- Value for the given key.

| Param | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| key   | string | Unique identifier used to store value. |

#### module.exports.getAll() ⇒ `RTKStoreData`

Returns the entire store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `RTKStoreData` \- An instance of RTKStoreData.  

#### module.exports.updateRateLimits(num, period)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)

| Param  | Type   |
| ------ | ------ |
| num    | number |
| period | number |

#### module.exports.updateBulkRateLimits(num, period)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)

| Param  | Type   |
| ------ | ------ |
| num    | number |
| period | number |

#### module.exports.subscribe(key, cb) ⇒ `void`

Listens for data change on a store key.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `void` \- void

| Param | Type     | Description                                                     |
| ----- | -------- | --------------------------------------------------------------- |
| key   | string   | Unique identifier used to store value.                          |
| cb    | function | The callback function that gets executed when data is modified. |

#### module.exports.unsubscribe(key, \[cb\]) ⇒ `void`

Removes all listeners for a key on the store.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)  
**Returns**: `void` \- void

| Param  | Type     | Description                            |
| ------ | -------- | -------------------------------------- |
| key    | string   | Unique identifier used to store value. |
| \[cb\] | function | Callback to be removed.                |

#### module.exports.populate(data)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStore--module.exports)

| Param | Type         |
| ----- | ------------ |
| data  | RTKStoreData |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstore/#page","headline":"RTKStore · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstore/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkstore/","name":"RTKStore"}}]}
```
