---
title: Version metadata
description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Version metadata

The version metadata binding can be used to access metadata associated with a [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) from inside the Workers runtime.

Worker version ID, version tag and timestamp of when the version was created are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

To use the version metadata binding, update your Worker's Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11980)
* [  wrangler.toml ](#tab-panel-11981)

JSONC

```

{

  "version_metadata": {

    "binding": "CF_VERSION_METADATA"

  }

}


```

TOML

```

[version_metadata]

binding = "CF_VERSION_METADATA"


```

### Interface

An example of how to access the version ID and version tag from within a Worker to send events to [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/):

* [  JavaScript ](#tab-panel-11978)
* [  TypeScript ](#tab-panel-11979)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.CF_VERSION_METADATA;

    env.WAE.writeDataPoint({

      indexes: [versionId],

      blobs: [versionTag, versionTimestamp],

      //...

    });

    //...

  },

};


```

TypeScript

```

interface Environment {

  CF_VERSION_METADATA: WorkerVersionMetadata;

  WAE: AnalyticsEngineDataset;

}


export default {

  async fetch(request, env, ctx) {

    const { id: versionId, tag: versionTag } = env.CF_VERSION_METADATA;

    env.WAE.writeDataPoint({

      indexes: [versionId],

      blobs: [versionTag],

      //...

    });

    //...

  },

} satisfies ExportedHandler<Env>;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/#page","headline":"Version metadata binding · Cloudflare Workers docs","description":"Exposes Worker version metadata (versionID and versionTag). These fields can be added to events emitted from the Worker to send to downstream observability systems.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/bindings/","name":"Bindings (env)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/bindings/version-metadata/","name":"Version metadata"}}]}
```
