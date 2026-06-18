---
title: Querying from Grafana
description: Visualize Workers Analytics Engine data in Grafana.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying from Grafana

Workers Analytics Engine is optimized for powering time series analytics that can be visualized using tools like Grafana. Every event written from the runtime is automatically populated with a `timestamp` field.

## Grafana plugin setup

We recommend the use of the [Altinity plugin for Clickhouse ↗](https://grafana.com/grafana/plugins/vertamedia-clickhouse-datasource/) for querying Workers Analytics Engine from Grafana.

Configure the plugin as follows:

* URL: `https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql`. Replace `<account_id>` with your 32 character account ID (available in the Cloudflare dashboard).
* Leave all auth settings off.
* Add a custom header with a name of `Authorization` and value set to `Bearer <token>`. Replace `<token>` with suitable API token string (refer to the [SQL API docs](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/#authentication) for more information on this).
* No other options need to be set.

## Querying timeseries data

For use in a dashboard, you usually want to aggregate some metric per time interval. This can be achieved by rounding and then grouping by the `timestamp` field. The following query rounds and groups in this way, and then computes an average across each time interval whilst taking into account [sampling](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/#sampling).

```

SELECT

    intDiv(toUInt32(timestamp), 60) * 60 AS t,

    blob1 AS label,

    SUM(_sample_interval * double1) / SUM(_sample_interval) AS average_metric

FROM dataset_name

WHERE

    timestamp <= NOW()

    AND timestamp > NOW() - INTERVAL '1' DAY

GROUP BY blob1, t

ORDER BY t


```

The Altinity plugin provides some useful macros that can simplify writing queries of this type. The macros require setting `Column:DateTime` to `timestamp` in the query builder, then they can be used like this:

```

SELECT

    $timeSeries AS t,

    blob1 AS label,

    SUM(_sample_interval * double1) / SUM(_sample_interval) AS average_metric

FROM dataset_name

WHERE $timeFilter

GROUP BY blob1, t

ORDER BY t


```

This query will automatically adjust the rounding time depending on the zoom level and filter to the correct time range that is currently being displayed.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/grafana/#page","headline":"Querying Workers Analytics Engine from Grafana · Cloudflare Analytics docs","description":"Visualize Workers Analytics Engine data in Grafana.","url":"https://developers.cloudflare.com/analytics/analytics-engine/grafana/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/grafana/","name":"Querying from Grafana"}}]}
```
