---
title: Querying Containers metrics with GraphQL
description: Query Cloudflare Containers metrics with the GraphQL Analytics API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Containers metrics with GraphQL

This example uses the GraphQL Analytics API to query metrics for your [Containers](https://developers.cloudflare.com/containers/). Two endpoints are available:

* `containersMetricsAdaptiveGroups` returns metrics for the code running inside your container, including every process inside it. Use this endpoint to inspect CPU, memory, disk, network, and uptime behavior for your own workload.
* `containersUsageAdaptiveGroups` returns the resources consumed by your container together with the micro VM sandbox required to run it. These are the values that populate the usage estimates in the Cloudflare dashboard, and are the ones to use when estimating your billing costs.

Both endpoints share the same underlying dataset, but expose different slices of it.

Replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your Account ID and API token, and adjust the `datetimeStart` and `datetimeEnd` values for the time range you want to query.

## Query container workload metrics

Use `containersMetricsAdaptiveGroups` to understand how your container and its subprocesses are behaving. The numbers returned reflect resource usage of your own code and do not include any platform overhead.

Dimensions

You can group results by any of the following dimensions:

| Dimension                                                                                                   | Description                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instanceId                                                                                                  | The container instance ID. This is the same ID shown in the Cloudflare dashboard and by [Wrangler](https://developers.cloudflare.com/workers/wrangler/).                                           |
| placementId                                                                                                 | A single container instance can be placed in different locations over its lifetime (for example, when moved between data centers). Group by placementId to separate metrics across each placement. |
| applicationId                                                                                               | The Containers application the instance belongs to.                                                                                                                                                |
| location                                                                                                    | The Cloudflare data center where the container is running.                                                                                                                                         |
| region                                                                                                      | The region the container is running in.                                                                                                                                                            |
| label(name: "...")                                                                                          | The value of a specific container label. See [Filter and group by labels](#filter-and-group-by-labels).                                                                                            |
| date, datetime, datetimeMinute, datetimeFiveMinutes, datetimeFifteenMinutes, datetimeHour, datetimeSixHours | Time buckets of varying granularity.                                                                                                                                                               |

Metrics

The following metric groups are available. Each group exposes multiple fields — use GraphQL introspection or the [GraphQL API Explorer](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/) to discover the full list.

| Group     | Examples                                                                                                           | Description                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| count     | —                                                                                                                  | Number of metric samples received.                                                                    |
| avg       | memory, cpuUtilization, rxBandwidthBps, txBandwidthBps, gpuMemory, containerUptime                                 | Average of the metric over the selected time range.                                                   |
| sum       | cpuTimeSec, allocatedMemory, allocatedDisk, allocatedCpu, rxBytes, txBytes, containerUptime                        | Total value of the metric over the selected time range.                                               |
| max       | memory, cpuUtilization, diskUsage, diskUsagePercentage, rxBandwidthBps, txBandwidthBps, containerUptime            | Maximum observed value of the metric.                                                                 |
| quantiles | memory, cpuUtilization, rxBandwidthBps, txBandwidthBps, diskUsage, diskUsagePercentage, gpuMemory, containerUptime | Weighted quantiles. Each metric is available with a P50, P95, or P99 suffix (for example, memoryP95). |

### API call

The following query returns CPU time and peak memory usage for a single container instance, bucketed by hour:

Terminal window

```

echo '{ "query":

  "query ContainersMetrics($accountTag: String, $datetimeStart: Time, $datetimeEnd: Time, $instanceId: String) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        containersMetricsAdaptiveGroups(

          limit: 100

          filter: {

            datetime_geq: $datetimeStart,

            datetime_leq: $datetimeEnd,

            instanceId: $instanceId

          }

          orderBy: [datetimeHour_ASC]

        ) {

          dimensions {

            datetimeHour

            instanceId

          }

          sum {

            cpuTimeSec

          }

          max {

            memory

          }

          quantiles {

            cpuUtilizationP95

            memoryP95

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

    "datetimeStart": "2026-04-15T00:00:00Z",

    "datetimeEnd": "2026-04-16T00:00:00Z",

    "instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


```

### Response

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "containersMetricsAdaptiveGroups": [

            {

              "dimensions": {

                "datetimeHour": "2026-04-15T00:00:00Z",

                "instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"

              },

              "max": {

                "memory": 312475648

              },

              "quantiles": {

                "cpuUtilizationP95": 0.4821,

                "memoryP95": 298123264

              },

              "sum": {

                "cpuTimeSec": 128.47

              }

            },

            {

              "dimensions": {

                "datetimeHour": "2026-04-15T01:00:00Z",

                "instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"

              },

              "max": {

                "memory": 305135616

              },

              "quantiles": {

                "cpuUtilizationP95": 0.3914,

                "memoryP95": 291454976

              },

              "sum": {

                "cpuTimeSec": 104.91

              }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

## Query container billing usage

Use `containersUsageAdaptiveGroups` to estimate your billing costs. Results include both your container's resource usage and the micro VM sandbox required to run it, and match the usage values shown in the Cloudflare dashboard.

Dimensions

You can group results by any of the following dimensions:

| Dimension                                                                                                   | Description                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instanceId                                                                                                  | The container instance ID. This is the same ID shown in the Cloudflare dashboard and by [Wrangler](https://developers.cloudflare.com/workers/wrangler/).                                           |
| placementId                                                                                                 | A single container instance can be placed in different locations over its lifetime (for example, when moved between data centers). Group by placementId to separate metrics across each placement. |
| applicationId                                                                                               | The Containers application the instance belongs to.                                                                                                                                                |
| location                                                                                                    | The Cloudflare data center where the container is running.                                                                                                                                         |
| region                                                                                                      | The region the container is running in.                                                                                                                                                            |
| label(name: "...")                                                                                          | The value of a specific container label. See [Filter and group by labels](#filter-and-group-by-labels).                                                                                            |
| date, datetime, datetimeMinute, datetimeFiveMinutes, datetimeFifteenMinutes, datetimeHour, datetimeSixHours | Time buckets of varying granularity.                                                                                                                                                               |

Metrics

Only `sum` metrics are available:

| Field           | Description                              |
| --------------- | ---------------------------------------- |
| cpuTimeSec      | Total CPU time, in seconds.              |
| allocatedMemory | Total allocated memory, in byte-seconds. |
| allocatedDisk   | Total allocated disk, in byte-seconds.   |
| txBytes         | Total bytes transmitted.                 |

### API call

The following query returns daily CPU and memory usage for the last 30 days:

Terminal window

```

echo '{ "query":

  "query ContainersUsage($accountTag: String, $datetimeStart: Time, $datetimeEnd: Time) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        containersUsageAdaptiveGroups(

          limit: 100

          filter: {

            date_geq: $datetimeStart,

            date_leq: $datetimeEnd

          }

          orderBy: [date_ASC]

        ) {

          dimensions {

            date

          }

          sum {

            cpuTimeSec

            allocatedMemory

            allocatedDisk

            txBytes

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

    "datetimeStart": "2026-03-23",

    "datetimeEnd": "2026-04-22"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


```

### Response

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "containersUsageAdaptiveGroups": [

            {

              "dimensions": {

                "date": "2026-04-20"

              },

              "sum": {

                "allocatedDisk": 172800000000000,

                "allocatedMemory": 22118400000000,

                "cpuTimeSec": 3742.18,

                "txBytes": 8471239

              }

            },

            {

              "dimensions": {

                "date": "2026-04-21"

              },

              "sum": {

                "allocatedDisk": 172800000000000,

                "allocatedMemory": 22118400000000,

                "cpuTimeSec": 3955.02,

                "txBytes": 9023841

              }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

## Filter and group by labels

Both endpoints expose container labels through two fields:

* `labels` is an array of `key=value` strings, and is designed for filtering. Use the [\_has operator](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/) to match a specific label.
* `label(name: "...")` is a grouping dimension that returns the value of a named label. Alias it to a convenient field name in your response.

For example, the following query returns CPU time and memory usage for production containers, grouped by environment:

```

query ContainersByLabel(

  $accountTag: String

  $datetimeStart: Time

  $datetimeEnd: Time

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      containersMetricsAdaptiveGroups(

        limit: 100

        filter: {

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

          labels_has: "env=production"

        }

      ) {

        dimensions {

          env: label(name: "env")

          region: label(name: "region")

        }

        sum {

          cpuTimeSec

        }

        max {

          memory

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAwgewHYBcCGBLJkDOAhKAGTQCMwAbACgCgYYASNAYyYRFQBU0BzALhgDKKCFm60GAEzQowKDAFswQtBBT8OCsOPpSZcxQFEkE9ZuoBKGAG9xANwxgA7pGvi6zVuxQ5KAMwzkMhD8VjAebJw8-IwsEShc3DAAvpY2dOkwrKiY2BA4ALKyIkw4AIJSAA5ytmAA4hBsFT5uGTDkChhqMACMAAy9LRn+gZAhg626spoA+txgwNGT+kroquMZSzPk84vSU4bG6+nkpBQ40wAWaDj8AERgSLYAvBUNEiBMcsi3R0njqUcJJokDgMMgcK5Wq0HrZ+CcyFQkGhFHcYbdzEc6BAwNwwUg4adEciwHdsbjvhioXQ-lSYDgQPJIbTMhUQBpFAIwExfkd5GgAB5M2mKeQIaA8qE09JSv5JIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQATMRAU0QEsBbNgZURgAToiwgATAAZxANgC0k+QEYA7MiUAOTJsxSAWg2asOPNgFF4TMVNkLlG5JMnat+kAF8gA)

The aliased dimensions appear directly on each result:

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "containersMetricsAdaptiveGroups": [

            {

              "dimensions": {

                "env": "production",

                "region": "enam"

              },

              "max": { "memory": 412316672 },

              "sum": { "cpuTimeSec": 9812.41 }

            },

            {

              "dimensions": {

                "env": "production",

                "region": "weur"

              },

              "max": { "memory": 398458880 },

              "sum": { "cpuTimeSec": 7421.08 }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-container-metrics/#page","headline":"Querying Containers metrics with GraphQL · Cloudflare Analytics docs","description":"Query Cloudflare Containers metrics with the GraphQL Analytics API.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-container-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-container-metrics/","name":"Querying Containers metrics with GraphQL"}}]}
```
