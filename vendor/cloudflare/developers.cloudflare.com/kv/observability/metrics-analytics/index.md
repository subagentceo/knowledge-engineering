---
title: Metrics and analytics
description: Query Workers KV operations and storage metrics via the dashboard or the GraphQL Analytics API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

KV exposes analytics that allow you to inspect requests and storage across all namespaces in your account.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

KV currently exposes the below metrics:

| Dataset    | GraphQL Dataset Name       | Description                                                         |
| ---------- | -------------------------- | ------------------------------------------------------------------- |
| Operations | kvOperationsAdaptiveGroups | This dataset consists of the operations made to your KV namespaces. |
| Storage    | kvStorageAdaptiveGroups    | This dataset consists of the storage details of your KV namespaces. |

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-namespace analytics for KV are available in the Cloudflare dashboard. To view current and historical metrics for a database:

1. In the Cloudflare dashboard, go to the **Workers KV** page.  
[ Go to **Workers KV** ](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)
2. Select an existing namespace.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your KV namespaces via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

To get started using the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/), follow the documentation to setup [Authentication for the GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/).

To use the GraphQL API to retrieve KV's datasets, you must provide the `accountTag` filter with your Cloudflare Account ID. The GraphQL datasets for KV include:

* `kvOperationsAdaptiveGroups`
* `kvStorageAdaptiveGroups`

### Examples

The following are common GraphQL queries that you can use to retrieve information about KV analytics. These queries make use of variables `$accountTag`, `$date_geq`, `$date_leq`, and `$namespaceId`, which should be set as GraphQL variables or replaced in line. These variables should look similar to these:

```

{

  "accountTag": "<YOUR_ACCOUNT_ID>",

  "namespaceId": "<YOUR_KV_NAMESPACE_ID>",

  "date_geq": "2024-07-15",

  "date_leq": "2024-07-30"

}


```

#### Operations

To query the sum of read, write, delete, and list operations for a given `namespaceId` and for a given date range (`start` and `end`), grouped by `date` and `actionType`:

```

query KvOperationsSample(

  $accountTag: string!

  $namespaceId: string

  $start: Date

  $end: Date

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      kvOperationsAdaptiveGroups(

        filter: { namespaceId: $namespaceId, date_geq: $start, date_leq: $end }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        sum {

          requests

        }

        dimensions {

          date

          actionType

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA0gNwPIAdIEMAuBLA9gOwGcBldAWxQBswAKAKBhgBJ0BjV3EfTAFXQHMAXDEKYI2fPwCEDZvnJhCKNmACSAE2Gjxk2U1HoImYQBEsYPWHyaYZzBYCUMAN6yE2MAHdIL2YzYcXJiENABm2JT2EMLOMAGc3HxCzPFBSTAAvk6ujLkwANbIaBBYeEQAguroKDgIYADiEJwoIX55MOGRkDEw8mSKyqxqNkx9AyoaADQwVfYA+vxgwML6mIaY07Ngc9TLzFbqmW15lNhk2MYwAIwADHc3x7m4EOqQAEJQwgDaW3MmAKLEADCAF1HtlHoxCCAyL52u0IEtwKJCJCjvDGOozlZCGVCHCMZjzGj-KwcAQeFA0GiMo9aXl6UcMkA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoR4wBbAUwGcAHSNqgEywgASgFEACgBl8oigHUqyABLU6jDojAAnREIBMABj0A2ALQGzARgDsDEG3iDshk+asAOEAF8gA)

To query the distribution of the latency for read operations for a given `namespaceId` within a given date range (`start`, `end`):

```

query KvOperationsSample2(

  $accountTag: string!

  $namespaceId: string

  $start: Date

  $end: Date

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      kvOperationsAdaptiveGroups(

        filter: {

          namespaceId: $namespaceId

          date_geq: $start

          date_leq: $end

          actionType: "read"

        }

        limit: 10000

      ) {

        sum {

          requests

        }

        dimensions {

          actionType

        }

        quantiles {

          latencyMsP25

          latencyMsP50

          latencyMsP75

          latencyMsP90

          latencyMsP99

          latencyMsP999

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA0gNwPIAdIEMAuBLA9gOwGcBldAWxQBswAmACgCgYYASdAY3dxH0wBV0AcwBcMQpgjZ8ggIRNW+cmEIoOYAJIATUeMnT5LcegiZRAESxgDYfNpgXMVgJQwA3vITYwAd0hv5zBxcPJiEdABm2JSOEKKuMEHcvAIirIkhKTAAvi7uzPkwANbIaBBYeEQAgproKDgIYADiENwoYQEFMJHRkHEdnTCKZMqq7Bp2LEMjalr9nTWOAPqCYMCihpjGmHMFC2CL1GusNpo7+Rw4BHxQaKIARBBg6Jp3Z1lnlNhk2KYwAIwABiBALmuTOhBAZH8AwKj1AylCbzOmi+NkIFUI0JhgXYl3w1zQSOxoHQvCiyix2Molnw7CgAFlCAAFGgAVjOzGpjlpDOZrJB2M5NLpjKZAHZ2YKYFybCLmQBOAWCmU80Xy+Uc6XC3lM9Ua7HvAaG-LG95ZIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoR4wBbAUwGcAHSNqgEywgASgFEACgBl8oigHUqyABLU6jDojAAnREIBMABj0A2ALQGzARgDsDEG3iDshk+asAOEAF8gA)

To query your account-wide read, write, delete, and list operations across all KV namespaces:

```

query KvOperationsAllSample($accountTag: string!, $start: Date, $end: Date) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      kvOperationsAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end }

        limit: 10000

      ) {

        sum {

          requests

        }

        dimensions {

          actionType

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA0gNwPIAdIEMAuBLA9gOwGcBBAG1IGV0BbFUsACgBJ0BjV3EfTAFXQHMAXDEKYI2fPwCEAGhhNR6CJmEARLGDlMw+ACZqNAShgBvAFAwYCbGADukUxcsw2HLpkIMAZtlKZIwiYu7JzcfELyrqG8AjAAvsbmzs4A1shoEFh4RMS66Cg4CGAA4hCcKJ5OyZY+fgGmMHn+APr8YMDCCphKmHJNYM30HfI6uvFV1aTY1NgqMACMAAzLixOWiWvOhCDUjtXVEO3gooSblnFnjdM6hNmEe-vObDgEPFBolxf7X84-F3FAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXsICMAdgYgApvAAmXPoJHiAHCAC+QA)

#### Storage

To query the storage details (`keyCount` and `byteCount`) of a KV namespace for every day of a given date range:

```

query Viewer(

  $accountTag: string!

  $namespaceId: string

  $start: Date

  $end: Date

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      kvStorageAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end, namespaceId: $namespaceId }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        max {

          keyCount

          byteCount

        }

        dimensions {

          date

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAagSzAd0gCgFAxgEgIYDGBA9iAHYAuAKngOYBcMAzhRAmbQIRa5l4C2YJgAdCYAJIATRizYceOFnggVGAETwUwCsGWkwNWjAEoYAbx4A3JKgjme2QiXIUmaAGYIANloiMzME6klDQMuEEuoTAAvqYW2AkwANaWAMoUxBB0YACCknjCFAiWYADiEKTCbg6JMJ4+kP4w+VoA+rRgwIyKFMoUADTNmmCtXp3dupKDfIIiYlLdM0KiBBKSMTWJXgj8CKowAIwADCdHmwmZkpAAQlCMANotI2oAoqkAwgC653Hn2Px4AAe9lqtSSYCg72CFD+CQARlAtFCXLDorDJDtdEwEMQyEwQaCEk9Uec0YkyRtokA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoR4wBbAUwGcAHSNqgEywgASgFEACgBl8oigHUqyABLU6jDojAAnREIBMABj0A2ALQGzARgDsDEG3iDshk+asAOEAF8gA)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/observability/metrics-analytics/#page","headline":"Metrics and analytics · Cloudflare Workers KV docs","description":"Query Workers KV operations and storage metrics via the dashboard or the GraphQL Analytics API.","url":"https://developers.cloudflare.com/kv/observability/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/observability/metrics-analytics/","name":"Metrics and analytics"}}]}
```
