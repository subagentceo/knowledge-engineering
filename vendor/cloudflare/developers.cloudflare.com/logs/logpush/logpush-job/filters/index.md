---
title: Filters
description: Apply filters to Logpush job log output.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Filters

The following table represents the comparison operators that are supported and example values. Filters are added as escaped JSON strings formatted as `{"key":"<field>","operator":"<comparison_operator>","value":"<value>"}`.

* Refer to the [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) page for a list of fields related to each dataset.
* Comparison operators define how values must relate to fields in the log line for an expression to return true.
* Values represent the data associated with fields.

| Name                            | Operator Notation | String | Int | Bool | Array | Object | Example                                                              |
| ------------------------------- | ----------------- | ------ | --- | ---- | ----- | ------ | -------------------------------------------------------------------- |
| Equal                           | eq                | ✅      | ✅   | ✅    | ❌     | ❌      | {"key":"ClientRequestHost","operator":"eq","value":"example.com"}    |
| Not equal                       | !eq               | ✅      | ✅   | ✅    | ❌     | ❌      | {"key":"ClientCountry","operator":"!eq","value":"ca"}                |
| Less than                       | lt                | ❌      | ✅   | ❌    | ❌     | ❌      | {"key":"BotScore","operator":"lt","value":"30"}                      |
| Less than or equal              | leq               | ❌      | ✅   | ❌    | ❌     | ❌      | {"key":"BotScore","operator":"leq","value":"30"}                     |
| Greater than                    | gt                | ❌      | ✅   | ❌    | ❌     | ❌      | {"key":"BotScore","operator":"gt","value":"30"}                      |
| Greater than or equal           | geq               | ❌      | ✅   | ❌    | ❌     | ❌      | {"key":"BotScore","operator":"geq","value":"30"}                     |
| Starts with                     | startsWith        | ✅      | ❌   | ❌    | ❌     | ❌      | {"key":"ClientRequestPath","operator":"startsWith","value":"/foo"}   |
| Ends with                       | endsWith          | ✅      | ❌   | ❌    | ❌     | ❌      | {"key":"ClientRequestPath","operator":"endsWith","value":"/foo"}     |
| Does not start with             | !startsWith       | ✅      | ❌   | ❌    | ❌     | ❌      | {"key":"ClientRequestPath","operator":"!startsWith","value":"/foo"}  |
| Does not end with               | !endsWith         | ✅      | ❌   | ❌    | ❌     | ❌      | {"key":"ClientRequestPath","operator":"!endsWith","value":"/foo"}    |
| Contains                        | contains          | ✅      | ❌   | ❌    | ✅     | ❌      | {"key":"ClientRequestPath","operator":"contains","value":"/static"}  |
| Does not contain                | !contains         | ✅      | ❌   | ❌    | ✅     | ❌      | {"key":"ClientRequestPath","operator":"!contains","value":"/static"} |
| Value is in a set of values     | in                | ✅      | ✅   | ❌    | ❌     | ❌      | {"key":"EdgeResponseStatus","operator":"in","value":\[200,201\]}     |
| Value is not in a set of values | !in               | ✅      | ✅   | ❌    | ❌     | ❌      | {"key":"EdgeResponseStatus","operator":"!in","value":\[200,201\]}    |

The filter field has limits of approximately 30 operators and 1000 bytes. Anything exceeding this value will return an error.

Note

Filtering is not supported on the following data types: `objects`, `array[object]`.

For the Firewall events dataset, the following fields are not supported: `Action`, `Description`, `Kind`, `MatchIndex`, `Metadata`, `OriginatorRayID`, `RuleID`, and `Source`.

## Logical Operators

* Filters can be connected using `AND`, `OR` logical operators.
* Logical operators can be nested.

Here are some examples of how the logical operators can be implemented. `X`, `Y` and `Z` are used to represent filter criteria:

* X AND Y AND Z - `{"where":{"and":[{X},{Y},{Z}]}}`
* X OR Y OR Z - `{"where":{"or":[{X},{Y},{Z}]}}`
* X AND (Y OR Z) - `{"where":{"and":[{X}, {"or":[{Y},{Z}]}]}}`
* (X AND Y) OR Z - `{"where":{"or":[{"and": [{X},{Y}]},{Z}]}}`

Logpush filters act as a pass-through gate, not an exclusion list. When multiple conditions are joined with AND:

* All conditions must evaluate to TRUE for the log to be pushed.
* If any single condition is FALSE, the log is excluded.

A common misconception is interpreting the filter as `exclude logs matching ALL conditions` rather than `include logs matching ALL conditions`.

## Set filters via API or dashboard

Filters can be set via API or the Cloudflare dashboard. Note that using a filter is optional, but if used, it must contain the `where` key.

### API

Here is an example request using cURL via API:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "static-assets",

    "output_options": {

        "field_names": [

            "ClientIP",

            "EdgeStartTimestamp",

            "RayID"

        ],

        "sample_rate": 0.1,

        "timestamp_format": "rfc3339",

        "CVE-2021-44228": true

    },

    "dataset": "http_requests",

    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",

    "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2/"

  }'


```

### Dashboard

To set filters through the dashboard:

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Select the dataset you want to push to a storage service. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Below **Select data fields**, in the **Filter** section, you can set up your filters.
4. You need to select a [dataset field](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/), an [Operator](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/#logical-operators), and a **Value**.
5. You can connect more filters using `AND` and `OR` logical operators.
6. Select **Next** to continue the setting up of your Logpush job.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/filters/#page","headline":"Filters · Cloudflare Logs docs","description":"Apply filters to Logpush job log output.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/filters/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/filters/","name":"Filters"}}]}
```
