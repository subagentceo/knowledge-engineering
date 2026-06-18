---
title: Multipart upload metadata
description: Define Workers configuration in JSON metadata for multipart form-data script uploads.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Multipart upload metadata

Note

There is a new API for uploading Workers. Refer to [these docs](https://developers.cloudflare.com/workers/platform/infrastructure-as-code#cloudflare-rest-api) for more information.

If you're using the [Workers Script Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/) or [Version Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/create/) directly, `multipart/form-data` uploads require you to specify a `metadata` part. This metadata defines the Worker's configuration in JSON format, analogue to the [wrangler.toml file](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Sample `metadata`

```

{

  "main_module": "main.js",

  "bindings": [

    {

      "type": "plain_text",

      "name": "MESSAGE",

      "text": "Hello, world!"

    }

  ],

  "compatibility_date": "2021-09-14"

}


```

Note

See examples of metadata being used with the Workers Script Upload API [here](https://developers.cloudflare.com/workers/platform/infrastructure-as-code#cloudflare-rest-api).

## Attributes

The following attributes are configurable at the top-level.

Note

At a minimum, the `main_module` key is required to upload a Worker.

* `main_module` ` string ` required  
   * The part name that contains the module entry point of the Worker that will be executed. For example, `main.js`.
* `assets` ` object ` optional  
   * [Asset](https://developers.cloudflare.com/workers/static-assets/) configuration for a Worker.  
   * `config` ` object ` optional  
         * [html\_handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) determines the redirects and rewrites of requests for HTML content.  
         * [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/#routing-behavior) determines the response when a request does not match a static asset.  
   * `jwt` field provides a token authorizing assets to be attached to a Worker.
* `keep_assets` ` boolean ` optional  
   * Specifies whether assets should be retained from a previously uploaded Worker version; used in lieu of providing a completion token.
* `bindings` array\[object\] optional  
   * [Bindings](#bindings) to expose in the Worker.
* `placement` ` object ` optional  
   * [Smart placement](https://developers.cloudflare.com/workers/configuration/placement/) object for the Worker.  
   * `mode` field only supports `smart` for automatic placement.
* `compatibility_date` ` string ` optional  
   * [Compatibility Date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/#setting-compatibility-date) indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. Highly recommended to set a `compatibility_date`, otherwise if on upload via the API, it defaults to the oldest compatibility date before any flags took effect (2021-11-02).
* `compatibility_flags` array\[string\] optional  
   * [Compatibility Flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#setting-compatibility-flags) that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

## Additional attributes: [Workers Script Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/)

For [immediately deployed uploads](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#upload-a-new-version-and-deploy-it-immediately), the following **additional** attributes are configurable at the top-level.

Note

Except for `annotations`, these attributes are **not available** for version uploads.

* `migrations` array\[object\] optional  
   * [Durable Objects migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) to apply.
* `logpush` ` boolean ` optional  
   * Whether [Logpush](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#logpush) is turned on for the Worker.
* `tail_consumers` array\[object\] optional  
   * [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) that will consume logs from the attached Worker.
* `tags` array\[string\] optional  
   * List of strings to use as tags for this Worker.
* `annotations` ` object ` optional  
   * Annotations object for the Worker version created by this upload. Also available on the [Version Upload API](#additional-attributes-version-upload-api).  
   * `workers/message` specifies a custom message for the version.  
   * `workers/tag` specifies a custom identifier for the version.

## Additional attributes: [Version Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/versions/methods/create/)

For [version uploads](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#upload-a-new-version-to-be-gradually-deployed-or-deployed-at-a-later-time), the following **additional** attributes are configurable at the top-level.

* `annotations` ` object ` optional  
   * Annotations object specific to the Worker version.  
   * `workers/message` specifies a custom message for the version.  
   * `workers/tag` specifies a custom identifier for the version.  
   * `workers/alias` specifies a custom alias for this version.

## Bindings

Workers can interact with resources on the Cloudflare Developer Platform using [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Refer to the JSON example below that shows how to add bindings in the `metadata` part.

```

{

  "bindings": [

    {

      "type": "ai",

      "name": "<VARIABLE_NAME>"

    },

    {

      "type": "analytics_engine",

      "name": "<VARIABLE_NAME>",

      "dataset": "<DATASET>"

    },

    {

      "type": "assets",

      "name": "<VARIABLE_NAME>"

    },

    {

      "type": "browser_rendering",

      "name": "<VARIABLE_NAME>"

    },

    {

      "type": "d1",

      "name": "<VARIABLE_NAME>",

      "id": "<D1_ID>"

    },

    {

      "type": "durable_object_namespace",

      "name": "<VARIABLE_NAME>",

      "class_name": "<DO_CLASS_NAME>"

    },

    {

      "type": "hyperdrive",

      "name": "<VARIABLE_NAME>",

      "id": "<HYPERDRIVE_ID>"

    },

    {

      "type": "kv_namespace",

      "name": "<VARIABLE_NAME>",

      "namespace_id": "<KV_ID>"

    },

    {

      "type": "mtls_certificate",

      "name": "<VARIABLE_NAME>",

      "certificate_id": "<MTLS_CERTIFICATE_ID>"

    },

    {

      "type": "plain_text",

      "name": "<VARIABLE_NAME>",

      "text": "<VARIABLE_VALUE>"

    },

    {

      "type": "queue",

      "name": "<VARIABLE_NAME>",

      "queue_name": "<QUEUE_NAME>"

    },

    {

      "type": "r2_bucket",

      "name": "<VARIABLE_NAME>",

      "bucket_name": "<R2_BUCKET_NAME>"

    },

    {

      "type": "secret_text",

      "name": "<VARIABLE_NAME>",

      "text": "<SECRET_VALUE>"

    },

    {

      "type": "service",

      "name": "<VARIABLE_NAME>",

      "service": "<SERVICE_NAME>",

      "environment": "production"

    },

    {

      "type": "vectorize",

      "name": "<VARIABLE_NAME>",

      "index_name": "<INDEX_NAME>"

    },

    {

      "type": "version_metadata",

      "name": "<VARIABLE_NAME>"

    }

  ]

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/#page","headline":"Multipart upload metadata · Cloudflare Workers docs","description":"Define Workers configuration in JSON metadata for multipart form-data script uploads.","url":"https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/multipart-upload-metadata/","name":"Multipart upload metadata"}}]}
```
