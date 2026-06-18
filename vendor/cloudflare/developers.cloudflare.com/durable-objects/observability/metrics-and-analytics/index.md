---
title: Metrics and analytics
description: View Durable Objects namespace-level and request-level metrics, analytics, and logs via the Cloudflare dashboard or GraphQL API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

Durable Objects expose analytics for Durable Object namespace-level and request-level metrics.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically via GraphQL](#query-via-the-graphql-api) or HTTP client.

Durable Object namespace

A Durable Object namespace is a set of Durable Objects that can be addressed by name, backed by the same class. There is only one Durable Object namespace per class. A Durable Object namespace can contain any number of Durable Objects.

## View metrics and analytics

Per-namespace analytics for Durable Objects are available in the Cloudflare dashboard. To view current and historical metrics for a namespace:

1. In the Cloudflare dashboard, go to the **Durable Objects** page.  
[ Go to **Durable Objects** ](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)
2. View account-level Durable Objects usage.
3. Select an existing Durable Object namespace.
4. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

You can also filter the charts to a single Durable Object by entering its [ID](https://developers.cloudflare.com/durable-objects/api/id/) or [name](https://developers.cloudflare.com/durable-objects/api/id/#name) and selecting a match. Clear the filter to return to namespace-level metrics.

## View logs

You can view Durable Object logs from the Cloudflare dashboard. Logs are aggregated by the script name and the Durable Object class name.

To start using Durable Object logging:

1. Enable Durable Object logging in the Wrangler configuration file of the Worker that defines your Durable Object class:  
   * [  wrangler.jsonc ](#tab-panel-8383)  
   * [  wrangler.toml ](#tab-panel-8384)  
JSONC  
```  
{  
    "observability": {  
        "enabled": true  
    }  
}  
```  
TOML  
```  
[observability]  
enabled = true  
```
2. Deploy the latest version of the Worker with the updated binding.
3. Go to the **Durable Objects** page.  
[ Go to **Durable Objects** ](https://dash.cloudflare.com/?to=/:account/workers/durable-objects)
4. Select an existing Durable Object namespace.
5. Select the **Logs** tab.

Note

For information on log limits (such as maximum log retention period), refer to the [Workers Logs documentation](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#limits).

## Query via the GraphQL API

Durable Object metrics are powered by GraphQL.

The datasets that include Durable Object metrics include:

* `durableObjectsInvocationsAdaptiveGroups`
* `durableObjectsPeriodicGroups`
* `durableObjectsStorageGroups`
* `durableObjectsSubrequestsAdaptiveGroups`

Use [GraphQL Introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) to get information on the fields exposed by each datasets.

### WebSocket metrics

Durable Objects using [WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) will see request metrics across several GraphQL datasets because WebSockets have different types of requests.

* Metrics for a WebSocket connection itself is represented in `durableObjectsInvocationsAdaptiveGroups` once the connection closes. Since WebSocket connections are long-lived, connections often do not terminate until the Durable Object terminates.
* Metrics for incoming and outgoing WebSocket messages on a WebSocket connection are available in `durableObjectsPeriodicGroups`. If a WebSocket connection uses [WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api), incoming WebSocket messages are instead represented in `durableObjectsInvocationsAdaptiveGroups`.

## Example GraphQL query for Durable Objects

JavaScript

```

  viewer {

    /*

    Replace with your account tag, the 32 hex character id visible at the beginning of any url

    when logged in to dash.cloudflare.com or under "Account ID" on the sidebar of the Workers & Pages Overview

    */

    accounts(filter: {accountTag: "your account tag here"}) {

      // Replace dates with a recent date

      durableObjectsInvocationsAdaptiveGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {

        sum {

          // Any other fields found through introspection can be added here

          requests

          responseBodySize

        }

      }

      durableObjectsPeriodicGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {

        sum {

          cpuTime

        }

      }

      durableObjectsStorageGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {

        max {

          storedBytes

        }

      }

    }

  }


```

Refer to the [Querying Workers Metrics with GraphQL](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/) tutorial for authentication and to learn more about querying Workers datasets.

## Additional resources

* For instructions on setting up a Grafana dashboard to query Cloudflare's GraphQL Analytics API, refer to [Grafana Dashboard starter for Durable Object metrics ↗](https://github.com/TimoWilhelm/grafana-do-dashboard).

## FAQs

### How can I identify which Durable Object instance generated a log entry?

You can use `$workers.durableObjectId` to identify the specific Durable Object instance that generated the log entry.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/#page","headline":"Metrics and analytics · Cloudflare Durable Objects docs","description":"View Durable Objects namespace-level and request-level metrics, analytics, and logs via the Cloudflare dashboard or GraphQL API.","url":"https://developers.cloudflare.com/durable-objects/observability/metrics-and-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/observability/metrics-and-analytics/","name":"Metrics and analytics"}}]}
```
