---
title: Write to Analytics Engine
description: Write custom analytics events to Workers Analytics Engine for high-cardinality, time-series data.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Write to Analytics Engine

**Last reviewed:**  5 months ago 

Write custom analytics events to Workers Analytics Engine.

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) provides time-series analytics at scale. Use it to track custom metrics, build usage-based billing, or understand service health on a per-customer basis.

Unlike logs, Analytics Engine is designed for aggregated queries over high-cardinality data. Writes are non-blocking and do not impact request latency.

## Configure the binding

Add an Analytics Engine dataset binding to your Wrangler configuration file. The dataset is created automatically when you first write to it.

* [  wrangler.jsonc ](#tab-panel-11587)
* [  wrangler.toml ](#tab-panel-11588)

JSONC

```

{

  "analytics_engine_datasets": [

    {

      "binding": "ANALYTICS",

      "dataset": "my_dataset",

    },

  ],

}


```

TOML

```

[[analytics_engine_datasets]]

binding = "ANALYTICS"

dataset = "my_dataset"


```

## Write data points

* [  JavaScript ](#tab-panel-11589)
* [  TypeScript ](#tab-panel-11590)

JavaScript

```

export default {

  async fetch(request, env) {

    const url = new URL(request.url);


    // Write a page view event

    env.ANALYTICS.writeDataPoint({

      blobs: [

        url.pathname,

        request.headers.get("cf-connecting-country") ?? "unknown",

      ],

      doubles: [1], // Count

      indexes: [url.hostname], // Sampling key

    });


    // Write a response timing event

    const start = Date.now();

    const response = await fetch(request);

    const duration = Date.now() - start;


    env.ANALYTICS.writeDataPoint({

      blobs: [url.pathname, response.status.toString()],

      doubles: [duration],

      indexes: [url.hostname],

    });


    // Writes are non-blocking - no need to await or use waitUntil()

    return response;

  },

};


```

TypeScript

```

interface Env {

  ANALYTICS: AnalyticsEngineDataset;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    // Write a page view event

    env.ANALYTICS.writeDataPoint({

      blobs: [

        url.pathname,

        request.headers.get("cf-connecting-country") ?? "unknown",

      ],

      doubles: [1], // Count

      indexes: [url.hostname], // Sampling key

    });


    // Write a response timing event

    const start = Date.now();

    const response = await fetch(request);

    const duration = Date.now() - start;


    env.ANALYTICS.writeDataPoint({

      blobs: [url.pathname, response.status.toString()],

      doubles: [duration],

      indexes: [url.hostname],

    });


    // Writes are non-blocking - no need to await or use waitUntil()

    return response;

  },

};


```

## Data point structure

Each data point consists of:

* **blobs** (strings) - Dimensions for grouping and filtering. Use for paths, regions, status codes, or customer IDs.
* **doubles** (numbers) - Numeric values to record, such as counts, durations, or sizes.
* **indexes** (strings) - A single string used as the [sampling key](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/#sampling). Group related events under the same index.

## Query your data

Query your data using the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/):

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/analytics_engine/sql" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --data "SELECT blob1 AS path, SUM(_sample_interval) AS views FROM my_dataset WHERE timestamp > NOW() - INTERVAL '1' HOUR GROUP BY path ORDER BY views DESC LIMIT 10"


```

## Related resources

* [Analytics Engine documentation](https://developers.cloudflare.com/analytics/analytics-engine/) \- Full reference for Workers Analytics Engine.
* [SQL API reference](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) \- Query syntax and available functions.
* [Grafana integration](https://developers.cloudflare.com/analytics/analytics-engine/grafana/) \- Visualize Analytics Engine data in Grafana.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/analytics-engine/#page","headline":"Write to Analytics Engine · Cloudflare Workers docs","description":"Write custom analytics events to Workers Analytics Engine for high-cardinality, time-series data.","url":"https://developers.cloudflare.com/workers/examples/analytics-engine/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/analytics-engine/","name":"Write to Analytics Engine"}}]}
```
