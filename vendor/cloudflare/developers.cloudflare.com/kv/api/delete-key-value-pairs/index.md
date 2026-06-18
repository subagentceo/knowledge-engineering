---
title: Delete key-value pairs
description: Remove keys and their associated values from a Workers KV namespace using the delete() method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Delete key-value pairs

To delete a key-value pair, call the `delete()` method of the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) on any [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) you have bound to your Worker code:

JavaScript

```

env.NAMESPACE.delete(key);


```

#### Example

An example of deleting a key-value pair from within a Worker:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    try {

      await env.NAMESPACE.delete("first-key");


      return new Response("Successful delete", {

        status: 200

      });

    }

    catch (e)

    {

      return new Response(e.message, {status: 500});

    }

  },

};


```

## Reference

The following method is provided to delete from KV:

* [delete()](#delete-method)

### `delete()` method

To delete a key-value pair, call the `delete()` method of the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) on any KV namespace you have bound to your Worker code:

JavaScript

```

env.NAMESPACE.delete(key);


```

#### Parameters

* `key`: `string`  
   * The key to associate with the value.

#### Response

* `response`: `Promise<void>`  
   * A `Promise` that resolves if the delete is successful.

This method returns a promise that you should `await` on to verify successful deletion. Calling `delete()` on a non-existing key is returned as a successful delete.

Calling the `delete()` method will remove the key and value from your KV namespace. As with any operations, it may take some time for the key to be deleted from various points in the Cloudflare global network.

## Guidance

### Delete data in bulk

Delete more than one key-value pair at a time with Wrangler or [via the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fdelete/).

The bulk REST API can accept up to 10,000 KV pairs at once. Bulk writes are not supported using the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/).

## Other methods to access KV

You can also [delete key-value pairs from the command line with Wrangler](https://developers.cloudflare.com/kv/reference/kv-commands/#kv-namespace-delete) or [with the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/delete/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/api/delete-key-value-pairs/#page","headline":"Delete key-value pairs · Cloudflare Workers KV docs","description":"Remove keys and their associated values from a Workers KV namespace using the delete() method.","url":"https://developers.cloudflare.com/kv/api/delete-key-value-pairs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/api/delete-key-value-pairs/","name":"Delete key-value pairs"}}]}
```
