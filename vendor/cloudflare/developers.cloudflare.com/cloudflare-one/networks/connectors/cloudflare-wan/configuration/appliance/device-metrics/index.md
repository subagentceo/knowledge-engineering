---
title: Device metrics
description: Device metrics in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device metrics

Cloudflare customers can inspect metrics for a specific Cloudflare One Appliance (formerly Magic WAN Connector) in the Cloudflare dashboard. These metrics help you troubleshoot potential issues with your Cloudflare One Appliance. For details, refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/troubleshooting/).

## Query metrics with GraphQL

Customers can query Cloudflare's GraphQL API to fetch their Cloudflare One Appliance device metrics. The Cloudflare dashboard displays Cloudflare One Appliance device metrics over the past one hour. Via the GraphQL API, customers can query for up to 30 days of historical Cloudflare One Appliance device metrics.

For example:

```

query telemetry(

  $accountTag: string

  $snapshotsFilter: AccountMconnTelemetrySnapshotsAdaptiveGroupsFilter_InputObject!

  $snapshotMountsFilter: AccountMconnTelemetrySnapshotMountsAdaptiveGroupsFilter_InputObject!

  $snapshotThermalsFilter: AccountMconnTelemetrySnapshotThermalsAdaptiveGroupsFilter_InputObject!

  $limit: int64!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      snapshots: mconnTelemetrySnapshots(

        filter: $snapshotsFilter

        limit: $limit

        orderBy: [datetimeFiveMinutes_DESC]

      ) {

        max {

          cpuCount

          loadAverage1m

          memoryFreeBytes

          memoryTotalBytes

        }

        dimensions {

          connectorId

          datetimeFiveMinutes

        }

      }

      snapshotMounts: mconnTelemetrySnapshotMounts(

        filter: $snapshotMountsFilter

        limit: $limit

        orderBy: [datetimeFiveMinutes_DESC]

      ) {

        max {

          availableBytes

          totalBytes

        }

        dimensions {

          connectorId

          datetimeFiveMinutes

        }

      }

      snapshotThermals: mconnTelemetrySnapshotThermals(

        filter: $snapshotThermalsFilter

        limit: $limit

        orderBy: [datetimeFiveMinutes_DESC, connectorId_DESC]

      ) {

        max {

          currentCelsius

        }

        dimensions {

          connectorId

          datetimeFiveMinutes

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBALmANmAtmO0AUAoGMAkAhgMbED2IAdnACqEDmAXDAM4YCWl9uBLlhABxYALMnBYAxdogQRmAQVIVqAWXKVKNJKnTQAyvyGjx8gCaC47AG5gA4hApCpMyAH0AkpQEg4AeQBGAFZgxHAAhDz4fIIiYirK4s6yCkpUcGpkGlrIaBhQBjHG8WksZhbWdg4gTtKyHl4+AcGhEXhRhrG0wpAohIiStZAp5GkZWdq5+h3GNN0Qvf1lApY29o4DLhD13n5BIeGRiOwo7HDMnHAAbAAsEQCUMADePFbsYADukE88eCQj1CxMAAzQZyJ4wP4JOhMAiQtLQmAAXwezzwaNY0zELGYKHUmgmunymPEOHR6JBm2Y7UKWKSkB+ZKOJzOBCZpwZ6LIEFMkAAQlBmABtcwISxoKQ2FScHxgFiuAAiAFE9ABhAC6HJgKM1eF6AA9vmSycRvCqEjq0YgyIRTPIbBAGGAAIwoC261BcqASCBgMD8hAsN0wNAoT00MR9f2yi2Ii2mY5gSgsdiZFiGo1ovH7LnuUxBkXoBMSsBSygywMZpGa2NG6JGOIJbHBvHZHR5Ar19KN0kZinJXjE4oAukQC1sln4ccWrk8iD8oUFsVgYul8sK5XqzXayv69OVwhWQjSQj+ZBRiuV+ARxDnmNxhNJlNJvcZrOhHN5y8wRdFiqrgN3kaNZknWnSzD0fRNrimT4jkhIdmBcwLICFp9kMA40l0EH9COY7HKcVJTpWM58gKMDCoQoq-pK0oBuuqoADQwG+cAfvRm5GtuGa7qil7ECAEA+tQKpIMmIAXkB95oI+qYvkaLEfvmlGFuKf60dGlbAeiWlVngsaIkAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQAbASwFsXEsBGABl4C+QA)

### Average CPU load explained

The metric `average CPU load` is unique and distinctly different from `CPU utilization` which is another common CPU metric. The Cloudflare One Appliance uses a [Unix-style CPU load calculation ↗](https://en.wikipedia.org/wiki/Load%5F%28computing%29).

CPU load is a measure of the number of processes that are currently running and that are waiting to be run on the CPU. Cloudflare collects the one minute load average from the device and converts that into a percentage based on the total number of cores in the CPU. If the Cloudflare One Appliance CPU has eight cores, and a one minute load average of two, then the average CPU load is 25%. If the average CPU load is above 100%, then there are processes in the queue that are waiting to be executed on the CPU.

Cloudflare is still evaluating the typical CPU load operating range on the Cloudflare One Appliance. In general, a healthy range for average CPU load on any device is between 30% and 70%. Customers may experience decreased Cloudflare One Appliance performance if the average CPU load is consistently above 100%.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/#page","headline":"Device metrics · Cloudflare One docs","description":"Device metrics in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/device-metrics/","name":"Device metrics"}}]}
```
