---
title: Metrics and analytics
description: View R2 storage and operations metrics via the dashboard or GraphQL Analytics API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

R2 exposes analytics that allow you to inspect the requests and storage of the buckets in your account.

The metrics displayed for a bucket in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

R2 currently has two datasets:

| Dataset    | GraphQL Dataset Name       | Description                                                                  |
| ---------- | -------------------------- | ---------------------------------------------------------------------------- |
| Operations | r2OperationsAdaptiveGroups | This dataset consists of the operations taken on a bucket within an account. |
| Storage    | r2StorageAdaptiveGroups    | This dataset consists of the storage of a bucket within an account.          |

### Operations Dataset

| Field              | Description                                                                                                                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionType         | The name of the operation performed.                                                                                                                                                                                       |
| actionStatus       | The status of the operation. Can be success, userError, or internalError.                                                                                                                                                  |
| bucketName         | The bucket this operation was performed on if applicable. For buckets with a jurisdiction specified, you must include the jurisdiction followed by an underscore before the bucket name. For example: eu\_your-bucket-name |
| objectName         | The object this operation was performed on if applicable.                                                                                                                                                                  |
| responseStatusCode | The http status code returned by this operation.                                                                                                                                                                           |
| datetime           | The time of the request.                                                                                                                                                                                                   |

### Storage Dataset

| Field        | Description                                                                                                                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bucketName   | The bucket this storage value is for. For buckets with a jurisdiction specified, you must include the [jurisdiction ↗](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) followed by an underscore before the bucket name. For example: eu\_your-bucket-name |
| payloadSize  | The size of the objects in the bucket.                                                                                                                                                                                                                                                                |
| metadataSize | The size of the metadata of the objects in the bucket.                                                                                                                                                                                                                                                |
| objectCount  | The number of objects in the bucket.                                                                                                                                                                                                                                                                  |
| uploadCount  | The number of pending multipart uploads in the bucket.                                                                                                                                                                                                                                                |
| datetime     | The time that this storage value represents.                                                                                                                                                                                                                                                          |

Metrics can be queried (and are retained) for the past 31 days. These datasets require an `accountTag` filter with your Cloudflare account ID.

Querying buckets with jurisdiction restriction

In your account, you may have two buckets of the same name, one with a specified jurisdiction, and one without.

Therefore, if you want to query metrics about a bucket which has a specified jurisdiction, you must include the [jurisdiction ↗](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) followed by an underscore before the bucket name. For example: `eu_bucket-name`. This ensures you query the correct bucket.

## View via the dashboard

Per-bucket analytics for R2 are available in the Cloudflare dashboard. To view current and historical metrics for a bucket:

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your R2 buckets via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same dataset as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

## Examples

### Operations

To query the volume of each operation type on a bucket for a given time period you can run a query as such

```

query R2VolumeExample(

  $accountTag: string!

  $startDate: Time

  $endDate: Time

  $bucketName: string

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      r2OperationsAdaptiveGroups(

        limit: 10000

        filter: {

          datetime_geq: $startDate

          datetime_leq: $endDate

          bucketName: $bucketName

        }

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

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASgJgGoHsA2IC2YCiAPAQ0wAc0wAKAKBhgBICBjBlEAOwBcAVAgcwC4YAZ3YQAlqx4BCanWEEI7ACIF2YAZ1HYZtMKwAmy1es1htAIxAMA1mHYA5ImqEjxPSgEoYAbxkA3UWAA7pDeMjSMzGzsguQAZqJoqhACXjARLBzc-HTpUVkwAL6ePjSlMBAIAPLEkCqiKKyCAIJ6BMTsor5gAOIQLMQxYWUwaJqi7AIAjAAMs9NDZfGJkCkLw62qHdgA+jxgwAK0cgqGpsPrKrYm22QHdLoGl2tlFta2DtiHrzb2js+Fa2K-0EWFC5zKEH24GEgn+BX+ehMjXqjTB4PCDA6DU4UBqcLW8LKhIBBSAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0RrEQFMsQATAAYBANgC0QiQEYA7MmkAOTNICcmIQFYAWgxA94AEy69+wsZJmLkQoSvVbdjAEawIAax6JSYALZ9sACUAUQAFABl8YIoAdSpkAAkKAGVkQKpSAHEQAF8gA)

The `bucketName` field can be removed to get an account level overview of operations. The volume of operations can be broken down even further by adding more dimensions to the query.

### Storage

To query the storage of a bucket over a given time period you can run a query as such.

```

query R2StorageExample(

  $accountTag: string!

  $startDate: Time

  $endDate: Time

  $bucketName: string

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      r2StorageAdaptiveGroups(

        limit: 10000

        filter: {

          datetime_geq: $startDate

          datetime_leq: $endDate

          bucketName: $bucketName

        }

        orderBy: [datetime_DESC]

      ) {

        max {

          objectCount

          uploadCount

          payloadSize

          metadataSize

        }

        dimensions {

          datetime

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASgJgMoBcD2ECGBzMBRAD0wFsAHAGzAAoAoGGAEkwGNm0QA7FAFRwC4YAZxQQAlh2wBCOo2GYIKACKYUYAd1HEwMhmA4ATZavWbt9BgCMQzANZgUAORJqhI8dhoBKGAG8ZAN1EwAHdIXxl6FjZOFEEqADNRclUIAR8YKPYuXmwBJlYsnhwYAF9vP3pKmAhkdCxcAEF9TFIUUX8wAHEIdlI4iKqYck1RFAEARgAGacmBqsTkyDS5webVNq0AfVxgPLkFIzNBqrX7U03KXcY9QxUj4-orW3snLTynu0dnFfoSn5gMPpIAAhKACADapw2YE2ijwSAAwgBdFblf7ETAEcIPSpoCwAKzAzBQCMK-3oIAoaEw+lJMXJMFImCg5Gp+iQogAXvcHloUDSVJgOdz-n8cfpTBxBKI0FLsTiYFDTKKVmLKmq-iUgA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0RrEQFMsQATAAYBANgC0QiQEYA7MmkAOTNICcmIQFYAWgxA94AEy69+wsZJmLkQoSvVbdjAEawIAax6JSYALZ9sACUAUQAFABl8YIoAdSpkAAkKAGVkQKpSAHEQAF8gA)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/metrics-analytics/#page","headline":"Metrics and analytics · Cloudflare R2 docs","description":"View R2 storage and operations metrics via the dashboard or GraphQL Analytics API.","url":"https://developers.cloudflare.com/r2/platform/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/platform/metrics-analytics/","name":"Metrics and analytics"}}]}
```
