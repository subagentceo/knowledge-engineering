---
title: Use GraphQL to create widgets
description: Build dashboard widgets with GraphQL Analytics queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use GraphQL to create widgets

This article presents examples of queries you can use to populate your own dashboard.

* [Parameters and filters](#parameters-and-filters)
* [Timeseries graph](#timeseries-graph)
* [Activity log](#activity-log)
* [Top N cards - source](#top-n-cards---source)
* [Top N cards - destination](#top-n-cards---destination)
* [TCP Flags](#tcp-flags)
* [Executive summary](#executive-summary)

Use this workflow to build and test queries:

* Install and configure the [GraphiQL ↗](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/) app to authenticate to the Cloudflare Analytics GraphQL API. Cloudflare recommends token authentication. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/), for more information.
* Construct the queries in the GraphiQL. You can use the introspective documentation in the GraphQL client to explore the nodes available. For further information about queries, refer to [Querying basics](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/).
* Test your queries by running them from GraphiQL or by passing them as the payload in a cURL request to the GraphQL API endpoint.
* Use the queries in your application to provide data for your dashboard widgets.

## Parameters and filters

These examples use the account ID for the Cloudflare account that you are querying. You can define this as a variable (`accountTag`) and reference it in your queries.

The queries also use a filter to specify the time interval that you want to query. The filter uses a start time and end time to define the time interval. You use different attributes to specify the start and end times, depending on the time period that you want to query. Refer to [Filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/) for further information about filters.

The following example queries for data with dates greater than or equal to `date_geq` and less than or equal to `date_leq`:

Account and query time interval settings

```

{

  "accountTag": "{account-id}",

  "filter": {

    "AND": [{ "date_geq": "2020-01-19" }, { "date_leq": "2020-01-20" }]

  }

}


```

This table lists Network Analytics datasets (nodes) and the `datetimeDimension` that you should use when querying data for a given time selection.

When you want an aggregated view of data, use the `Groups` query nodes. For example, the `ipFlows1mAttacksGroups` dataset represents minute-wise rollup reports of attack activity. For more detail, refer to [Datasets](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/).

| **Time Selection** | **Query node**              | **datetimeDimension**       |
| ------------------ | --------------------------- | --------------------------- |
| Last week          | ipFlows1dGroups             | date                        |
| Last month         | ipFlows1dGroups             | date                        |
| 24 hours           | ipFlows1mGroups             | datetimeFifteenMinutes      |
| 12 hours           | ipFlows1mGroups             | datetimeFifteenMinutes      |
| 6 hours            | ipFlows1mGroups             | datetimeFiveMinutes         |
| 30 mins            | ipFlows1mGroups             | datetimeMinute              |
| Custom range       | Dependent on range selected | Dependent on range selected |

The table below lists the start and end time attributes that are valid for query nodes representing different time ranges.

| **Query node**         | **Start day / time filter** | **End day / time filter** |
| ---------------------- | --------------------------- | ------------------------- |
| ipFlows1mGroups        | datetimeMinute\_geq         | datetimeMinute\_leq       |
| ipFlows1mAttacksGroups | date\_geq                   | date\_leq                 |
| ipFlows1hGroups        | datetimeHour\_geq           | datetimeHour\_leq         |
| ipFlows1dGroups        | date\_geq                   | date\_leq                 |

## Timeseries graph

Use the following query to build the timeseries graph in network analytics:

Timeseries graph

```

query ipFlowTimeseries(

  $accountTag: string

  $filter: AccountIpFlows1mGroupsFilter_InputObject

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      ipFlows1mGroups(

        limit: 1000

        filter: $filter

        orderBy: datetimeMinute_ASC

      ) {

        dimensions {

          timestamp: datetimeMinute

          attackMitigationType

          attackId

        }

        sum {

          bits

          packets

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAlgBwGIBsD2B3AKnAtmAZ0jkIAoAoGGAEgEMBjetEAOwBctaBzALhgLYQ4LLpRoAzOCjaQ+AQUbN2ASWToMBAIy4A4hGYICSKTIgB9ZSwQg2AeQBGAKzD025AJQwA3mIBuJDEhvMSoGJlY2AlJJaVlvGDClDm4+OkUIzi4YAF9PHyoC+DVMLV19EEMKQsKUPDg2Pk0ABhaQ6pjTVI7INsK0CAATSAAhKD4B2hk2PDAAWWEbMDM5AGUAYV6YPM2qAZmWAjg0A+Dq6un8AVpcBHHJsAu5hZkdgsm2BgBreemuSaOWFgoAgwK9QmwPvRPsoBq9sq8CCBcKczgV7PUCGCYAgvg9Maicpt4YViYTskA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

## Activity log

This query returns an activity log summarizing minute-wise rollups of attack traffic in IP flows. The query groups the data by the fields listed in the `dimensions` object.

Activity log query

```

query ipFlowEventLog(

  $accountTag: string

  $filter: AccountIpFlows1mAttacksGroupsFilter_InputObject

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      ipFlows1mAttacksGroups(

        limit: 10

        filter: $filter

        orderBy: [min_datetimeMinute_ASC]

      ) {

        dimensions {

          attackId

          attackDestinationIP

          attackDestinationPort

          attackMitigationType

          attackSourcePort

          attackType

        }

        avg {

          bitsPerSecond

          packetsPerSecond

        }

        min {

          datetimeMinute

          bitsPerSecond

          packetsPerSecond

        }

        max {

          datetimeMinute

          bitsPerSecond

          packetsPerSecond

        }

        sum {

          bits

          packets

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAlgBwGIBsD2B3AogNzAOwBcAZNAcwAoAoGGAEgEMBjJtEIgFQbIC4YBnQhDj4yNegDM4KQpD4BBFmyIBJZOgz8AjAFt5hQswDW-AOIQ2CfkmmyIAfRX4EIQgHkARgCswTQlQBKGABvcRw4MAxIEPFaZlZ2Qn4KKRk5EJh45UIuXnosxNyYAF8g0NoK+HVMbT0DYzMLECtqSsqUOB04Qj4tAAZYttS7PjphyEHKtAgAE0gAISg+AG0u-HsZhllCTrAAWRFXMHt5AGUAYQBdSZgym9oZ3fx+ODRnmLa2rcMmIxUZ+4Vb7GAAiYEEIi2r3wKgACoC4vVfmCIfgoW9YdN-J9KsDfgcdmR0fgOFAEGAEZkkUZTmwIEwwJiINicYifkZSeTAcVAQwcGQPqyYB5uvxYZBTr43gChTAEMYwElxRBJax8DKcTzWWtBazNttdgd8EdKSKlRKperKfLfoqxRa1RrPlqcToGAAPXU4-WKw2HWSm0XK1XS60K80qy1Otouz78EA6L2fM38MO2pLcm6xkriHnFIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

## Top N cards - source

This query returns data about the top source IPs. The `limit` parameter controls the amount of records returned for each node. In the following code, the highlighted lines indicate where you configure `limit`.

Top N Cards query

```

query GetTopNBySource(

    $accountTag: string

    $filter: AccountIpFlows1mGroupsFilter_InputObject

    $portFilter: AccountIpFlows1mGroupsFilter_InputObject

  ) {

    viewer {

      accounts(filter: { accountTag: $accountTag }) {

        topNPorts: ipFlows1mGroups(

        limit: 5

        filter: $portFilter

        orderBy: [sum_(bits/packets)_DESC]

      ) {

        sum {

          count: (bits/packets)

        }

        dimensions {

          metric: sourcePort

          ipProtocol

        }

      }

      topNASN: ipFlows1mGroups(

        limit: 5

        filter: $filter

        orderBy: [sum_(bits/packets)_DESC]

      ) {

        sum {

          count: (bits/packets)

        }

        dimensions {

          metric: sourceIPAsn

          description: sourceIPASNDescription

        }

      }

        topNIPs: ipFlows1mGroups(

        limit: 5

        filter: $filter

        orderBy: [sum_(bits/packets)_DESC]

      ) {

        sum {

          count: (bits/packets)

        }

        dimensions {

          metric: sourceIP

        }

      }

        topNColos: ipFlows1mGroups(

          limit: 10

          filter: $filter

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            metric: coloCity

            coloCode

          }

        }

        topNCountries: ipFlows1mGroups(

          limit: 10

          filter: $filter

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            metric: coloCountry

          }

        }

        topNIPVersions: ipFlows1mGroups(

          limit: 2

          filter: $filter

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            metric: ipVersion

          }

        }

      }

    }

  }


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgFQPYAcByAhKBlVECAYzAAoAoGamAEgENjjCA7FegcwC4YBnRCAEsWHKjVoAzQQBtEkHgEEmrRAEl0AMWmoA7rwCMAWzgRC6XhplyIAfVUt0IRAHkARgCswxRGOq10qBCIlrLyMErMIGzqWroGxqYg5iHWdg5Obp7eYgCUMADevjAAboJgOpAFRdSMkWy8ZFKhEDz5MLUqyJw8DMpR7BwwAL55hTTjMIgYmAAKgYi8PIKa2npGJmYN1TTSgoaCiDwArNvUTdY9AUEpkKcwgQAmkLg8ANq8IIY2ZK4HvAD06EYAGskLwcjYACIAUTwAGEALrbUZ3D6GKoTCZ1Q4wH5-QEgsE5O5DO4PPZgFi8QSoKkYzE0QxIITEHi8QgkMBzIJ3ajLGamKbMaQk7akzFTLAKPCYJYrOLrRLmSgMmC7fY4k6q85hSRWW6qx7PKBvNHfX4LAnEUELCEw+FIzEo1Vo+mq7E8PGWoHWomi1XkplUml0saqmBMgSCVl8DmkVQzBS8Fi8mBPXjEIToRAhtlxsAJ6WYSFgDNZnO0-0TcUMyWYBOLGDLWJrBKbFUM9UHY53HUtOh9u5GiAvGDvT7m-E+m3gqGwxHIt0TV1h90qT0WgHTv2qmuYwOU6m03hLzGRll5ojxmZV8Z7iZ1uGobSN5ureIbJJbcNqvbdmD6AADKmfY9IOP7DqO45fF6W6Erac4OnczrhiuqbUB6uKblaM7Ej+977hSwbHqeDLntGPDCqgcIHFA6EwFRT5PKmBE0Kx1CPioQilnKLYfkq37hl2OJASB+r9nqzSppBJpjmasE4USiELqqKEup8pGYphCnbraLGpgexGhvR5ExoxXF0fht4PtMCYAGqQEeVK8e+irtqmwk8AATGJzRgeJ0kQE8I6ydBk7evBs72ipDJqQyaE-hh65YVOkV4eG7E0IZTknqu4amXKDkQE5+m7mKRQ1kMQA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

## Top N cards - destination

This query returns data about the top destination IPs. The `limit` parameter controls the amount of records returned. In the following code, the highlighted lines indicate that the query returns the five highest results.

Top N Cards - Destination

```

query GetTopNByDestination(

    $accountTag: string

    $filter: AccountIpFlows1mGroupsFilter_InputObject

    $portFilter: AccountIpFlows1mGroupsFilter_InputObject

  ) {

    viewer {

      accounts(filter: { accountTag: $accountTag }) {

        topNIPs: ipFlows1mGroups(

          filter: $filter

          limit: 5

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            metric: destinationIP

          }

        }

        topNPorts: ipFlows1mGroups(

          filter: $portFilter

          limit: 5

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            metric: destinationPort

            ipProtocol

          }

        }

      }

    }

  }


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgFQPYAcByAhKARMAZ0QEsA7AQ1NTIAoAoGJmAEgoGN3UQyUKBzAFwxiEcv0bMWAMxIAbRJGEBBTt14BJdADE5qAO6EAjAFs4EbukLb5iiAH0NZdCEQB5AEYArMO0SSmFnRUCEQbBSUYVS4eRC1dA2MzCxArcLtHZ1dPHz9JAEoYAG8AmAA3EjB9SGLSpg4Y3kJaWQiIYSKYBvU+IVZu2OQBGABfQpLmSZhEDEwNAAVCYRIdPUNTc0tmuqnWu2EZW0gdybkSExJEYQBWE+YQgBNIXGEAbUIQE3taD0vCAHp0BwANZIQj5ex4ACiAGUAMIAXTu4zuTA+JlqUyxMEaVxgPz+gJBYPyqNGZIe5zAZEIJBohEx2MmJiQYnYwiexHIVDpZAWZJGd0FTJmWHmIUQSxgKwS62SWwYTKYe0iQQl6WOSpgZwueNuWsezygb3R31+kqJ7FBkoh0PhSKZKK16MZWtxwgJFqBVpJAopVJpvIZEy1MBZiDZHKIpEo1DI4tCZKYK3mFhmXDkfqZwqmOaYOZGQA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

## TCP Flags

This query extracts the number of TCP packets from the minute-wise rollups of IP flows, and groups the results by TCP flag value. It uses `limit: 8` to display the top eight results, and presents them in descending order.

Add the following line to the filter to indicate that you want to view TCP data:

```

{ "ipProtocol": "TCP" }


```

TCP Flags query

```

query GetTCPFlags(

    $accountTag: string

    $filter: AccountIpFlows1mGroupsFilter_InputObject

  ) {

    viewer {

      accounts(filter: { accountTag: $accountTag }) {

        tcpFlags: ipFlows1mGroups(

          filter: $filter

          limit: 8

          orderBy: [sum_(bits/packets)_DESC]

        ) {

          sum {

            count: (bits/packets)

          }

          dimensions {

            tcpFlags

          }

        }

      }

    }

  }


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgFQMIAUBiAbAhgcwGcAKAKBgpgBJcBjWgexADsUCAuGQxCAS2fzlKVAGa9siSJwCC9JqwCSABxwMA7oQCMAWzgQmSwpnGSIAfQXMlIRAHkARgCswtREICUMAN5CKAN14wNUhvX0o6RhZEEjEJKW8YCPk2fE4aOSjkAhgAX08fSkKYRFoVPCJOXjL1LV19EEMyIqLY0zTWyDDm7F5tXkROAA4uooYIABNIACEoTgBtQhBtM2J7fsIAeiU6AGskQnczABEAUQBlVABdEYp8m8pF7VDm5sjWTlX1rd3993uKHL-GDjXpgZiEXgMcHPF6FEplAiEIGA2EoopogFCHJAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

## Executive summary

The executive summary query summarizes overall activity, therefore it only filters by the selected time interval, and ignores all filters applied to the analytics. Use different queries, depending on the time interval you want to examine and what kind of traffic the account is seeing.

If the time interval is absolute, for example March 25th 09:00 to March 25th 17:00, then execute a query for attacks within those times. [Use the appropriate query node](#parameters-and-filters), for example `ipFlows1dGroups`, for the time interval.

GetPreviousAttacks query - fetch previous attacks

```

query GetPreviousAttacks($accountTag: string, $filter: filter) {

  viewer {

    accounts(filter: {accountTag: $accountTag}) {

      ${queryNode}(limit: 1000, filter: $filter) {

        dimensions {

          attackId

        }

        sum {

          packets

          bits

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgBQmAbgSwPYgM4CCiiAhgMYDWeAFACTlm4B2iAKiQOYBcMeiEmJhwA0MWgDNMAG0SQekmZACUMAN4AoGDCxgA7pDWatMBs0Q0FsiD1WmQLdtzF2HnAL4qNx47VWhIUABy2AAmYG7UUpgAtpiIPACMAAwpopZyYukQnkbeWiExYEx4OMWGeXkkxOQUAJIhuXlujd54INHlFcYADjVIeC15AEZxA10wzRWTxtPNbkA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

If the time interval is relative to the current time, for example the last 24 hours or the last 30 minutes, then make a query to the `ipFlows1mGroup` node to check whether there were attacks in the past five minutes. Attacks within the past five minutes are classed as ongoing: the Activity Log displays `Present`. The query response lists the `attackID` values of ongoing attacks.

GetOngoingAttackIds query - check for ongoing attacks

```

query GetOngoingAttackIds($accountTag: string, $filter: filter) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      ipFlows1mGroups(limit: 1000, filter: $filter) {

        dimensions {

          attackId

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgeQHYHMD2BLDBBRRAQwGMBrASQBMBnACgBJSTMRVEAVI9ALhhsQRc6ADQwGAM2wAbRJD5TZkAJQwA3gCgYMAG7YwAd0jqt2mM1bt6iuRD5rzJFm07c+TJ5dfoYAX1WaZmbYAA4AYtKYBjQAjAC2cBCsIfTS2HHYiHwxAAx5Yjby4oUQAaZB2lTpYKg02Ji1JhUVRISklFTlFb5d2j1B-X4avkA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

If there are ongoing attacks, query the `ipFlows1mAttacksGroups` node, filtering with the `attackID` values from the previous query. The query below returns the maximum bit and packet rates.

GetOngoingAttacks query - fetch data for ongoing attacks

```

query GetOngoingAttacks($accountTag: string, $filter: filter) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      ipFlows1mAttacksGroups(limit: 1000, filter: $filter) {

        dimensions {

          attackId

        }

        max {

          bitsPerSecond

          packetsPerSecond

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgeQHYHMD2BLDBBRRAQwGMBrAZwAoASUkzEVRAFSPQC4YLEJd0ANDBoAzbABtEkLmMmQAlDADeAKBgwAbtjAB3SMrXqY9Rs2qypELkuMkGTVuy507px+hgBfRaqNHsAA4AYuKYOhQAjAC2BMTkFHAQjAHU4thR2IhcEQAMeUIW0sKFED6GfuoAJulgqBTYmHUGFRVEhKRkAJKV5RWevX5RRAAezS1GAEaZFAAKkADKYAyoPeNGAR1IswtLjavj-S2HRsf9nkA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERAF8g)

If there are no ongoing attacks, use the `GetPreviousAttacks` query to display data for attacks within an absolute time interval.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/use-graphql-create-widgets/#page","headline":"Use GraphQL to create widgets · Cloudflare Analytics docs","description":"Build dashboard widgets with GraphQL Analytics queries.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/use-graphql-create-widgets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/use-graphql-create-widgets/","name":"Use GraphQL to create widgets"}}]}
```
