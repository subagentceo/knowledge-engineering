---
title: Storage and Broadcast
description: Create real-time key-value stores and broadcast messages to participants in RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Storage and Broadcast

The RealtimeKit Stores API allows you to create multiple key-value pair realtime stores. Users can subscribe to changes in a store and receive real-time updates. Data is stored until a [session](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting/#session) is active.

This page is not available for the **Flutter**platform.

WebMobile

ReactWeb ComponentsAngular

### Create a Store

You can create a realtime store (changes are synced with other users):

| Param | Type   | Description       | Required |
| ----- | ------ | ----------------- | -------- |
| name  | string | Name of the store | true     |

To create a store:

TypeScript

```

const stores = useRealtimeKitSelector((m) => m.stores);

const store = stores.create('myStore');


```

TypeScript

```

const store = meeting.stores.create('myStore');


```

TypeScript

```

const store = meeting.stores.create('myStore');


```

Kotlin

```

val meeting = RealtimeKitMeetingBuilder.build(activity)

val store = meeting.stores.create("myStore")


```

Swift

```

let meeting = RealtimeKitiOSClientBuilder().build()

let store = meeting.stores.create(name: "myStore")


```

This feature is not currently supported in the Flutter SDK

Note

This method must be executed for every user.

### Update a Store

You can add, update or delete entries in a store:

| Param | Type       | Description                                                 | Required |
| ----- | ---------- | ----------------------------------------------------------- | -------- |
| key   | string     | Unique identifier used to store/update a value in the store | Yes      |
| value | StoreValue | Value that can be stored against a key                      | Yes      |

TypeScript

```

type StoreValue = string | number | object | array;


```

TypeScript

```

const stores = useRealtimeKitSelector((m) => m.stores.stores);

const store = stores.get("myStore");


await store.set("user", { name: "John Doe" });


await store.update("user", { age: 34 }); // { name: 'John Doe', age: 34 }


await store.delete("user");


```

TypeScript

```

type StoreValue = string | number | object | array;


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get("myStore");


await store.set("user", { name: "John Doe" });


await store.update("user", { age: 34 }); // { name: 'John Doe', age: 34 }


await store.delete("user");


```

TypeScript

```

type StoreValue = string | number | object | array;


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get("myStore");


await store.set("user", { name: "John Doe" });


await store.update("user", { age: 34 }); // { name: 'John Doe', age: 34 }


await store.delete("user");


```

Kotlin

```

val store = meeting.stores.get("myStore")


store.set("user", mapOf("name" to "John Doe"))


```

Swift

```

let store = meeting.stores.get(name: "myStore")

store.set("user", ["name": "John Doe"])


```

Note

The `set` method overwrites the existing value, while the `update` method updates the existing value.

For example, if the stored value is `['a', 'b']` and you call `update` with `['c']`, the final value will be `['a', 'b', 'c']`.

### Subscribe to a Store

You can attach event listeners on a store's key, which fire when the value changes.

TypeScript

```

const stores = useRealtimeKitSelector((m) => m.stores.stores);

const store = stores.get('myStore');

store.subscribe('key', (data) => {

    console.log(data);

});


// subscribe to all keys of a store

store.subscribe('\*', (data) => {

console.log(data);

});


store.unsubscribe('key');


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get('myStore');

store.subscribe('key', (data) => {

    console.log(data);

});


// subscribe to all keys of a store

store.subscribe('\*', (data) => {

console.log(data);

});


store.unsubscribe('key');


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get('myStore');

store.subscribe('key', (data) => {

    console.log(data);

});


// subscribe to all keys of a store

store.subscribe('\*', (data) => {

console.log(data);

});


store.unsubscribe('key');


```

Kotlin

```

val store = meeting.stores.create("myStore")

val keyChangeCallback = { key: String, value: Any? ->

  println(value)

}

store.subscribe("key", keyChangeCallback)


// Subscribe to all keys

store.subscribe(RtkStore.WILDCARD_KEY) { key, value ->

  println(value)

}


store.unsubscribe("key", keyChangeCallback)


```

Swift

```

let store = meeting.stores.create(name: "myStore")

let keyChangeCallback: ((String, (Any?)) -> Void) = { key, value in

    print(value ?? "null")

}

store.subscribe(key: "key", onChange: keyChangeCallback)


// Subscribe to all keys

store.subscribe(key: RtkStore.Companion().WILDCARD_KEY) { key, value in

    print(value ?? "null")

}


store.unsubscribe(key: "key", onChange: keyChangeCallback)


```

### Fetch Store Data

You can fetch the data stored in the store:

TypeScript

```

const stores = useRealtimeKitSelector((m) => m.stores.stores);

const store = stores.get('myStore');


// fetch value for a specific key

const data = store.get('key');


// fetch all the data in the store

const data = store.getAll();


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get('myStore');


// fetch value for a specific key

const data = store.get('key');


// fetch all the data in the store

const data = store.getAll();


```

TypeScript

```

const { stores } = meeting.stores;

const store = stores.get('myStore');


// fetch value for a specific key

const data = store.get('key');


// fetch all the data in the store

const data = store.getAll();


```

Kotlin

```

val store = meeting.stores.create("myStore")


// fetch value for a specific key

val data = store.get("key")


// fetch all the data in the store

val data = store.getAll()


```

Swift

```

let store = meeting.stores.create(name: "myStore")


// fetch value for a specific key

store.get(key: "key")


// fetch all the data in the store

store.getAll()


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/#page","headline":"Storage and Broadcast · Cloudflare Realtime docs","description":"Create real-time key-value stores and broadcast messages to participants in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/collaborative-stores/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/collaborative-stores/","name":"Storage and Broadcast"}}]}
```
