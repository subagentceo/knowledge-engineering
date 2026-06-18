---
title: Querying Magic Transit endpoint health check results with GraphQL
description: Query Magic Transit endpoint health checks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Magic Transit endpoint health check results with GraphQL

Use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) to query endpoint health check results for your account. The `magicEndpointHealthCheckAdaptiveGroups` dataset returns probe results aggregated by the dimensions and time interval you specify.

Send all GraphQL queries as HTTP `POST` requests to `https://api.cloudflare.com/client/v4/graphql`.

### Prerequisites

You need the following to query endpoint health check data:

* Your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* An [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Account > Account Analytics > Read` permissions. For details, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).

### Query parameters

The following parameters are some of the most common ones in the `filter` object:

| Parameter     | Description                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date\_geq     | Start date for the query in YYYY-MM-DD format (for example, 2026-01-01). When used with a date-based truncation dimension, returns results from this date onward. You can also use a full ISO 8601 timestamp (for example, 2026-01-01T00:00:00Z). |
| date\_leq     | _(Optional)_ End date for the query. Uses the same format as date\_geq.                                                                                                                                                                           |
| datetime\_geq | _(Optional)_ Start timestamp in ISO 8601 format (for example, 2026-01-01T00:00:00Z). Use instead of date\_geq for time-based truncation dimensions.                                                                                               |
| datetime\_leq | _(Optional)_ End timestamp in ISO 8601 format.                                                                                                                                                                                                    |
| limit         | Maximum number of result groups to return.                                                                                                                                                                                                        |

You can also filter on any dimension listed in the [Available dimensions](#available-dimensions) table. Append an operator suffix to the dimension name to create a filter — for example, `endpoint_in` to filter by a list of endpoints, or `checkType_neq` to exclude a specific check type. Using a dimension name without a suffix filters for equality. For the full list of supported operators, refer to [Filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/).

### Available dimensions

You can query the following dimensions in the `dimensions` field:

| Dimension              | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| checkId                | The unique ID of the configured health check.                                    |
| checkType              | The type of health check (for example, icmp).                                    |
| endpoint               | The IP address of the endpoint being checked.                                    |
| name                   | The name assigned to the health check when configured (may be empty if not set). |
| date                   | Event timestamp truncated to the day.                                            |
| datetime               | Full event timestamp.                                                            |
| datetimeMinute         | Event timestamp truncated to the minute.                                         |
| datetimeFiveMinutes    | Event timestamp truncated to five-minute intervals.                              |
| datetimeFifteenMinutes | Event timestamp truncated to 15-minute intervals.                                |
| datetimeHalfOfHour     | Event timestamp truncated to 30-minute intervals.                                |
| datetimeHour           | Event timestamp truncated to the hour.                                           |

### Available metrics

| Metric             | Description                                       |
| ------------------ | ------------------------------------------------- |
| count              | Total number of health check events in the group. |
| sum.total          | Total number of health check probes sent.         |
| sum.failures       | Number of failed health check probes.             |
| avg.lossPercentage | Average calculated loss percentage (0-100).       |

### API call

The following example queries endpoint health check results for a specific account, returning probe counts aggregated in five-minute intervals. Replace `<ACCOUNT_ID>` with your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and `<API_TOKEN>` with your [API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).

Terminal window

```

echo '{ "query":

  "query GetEndpointHealthCheckResults($accountTag: string, $datetimeStart: string) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        magicEndpointHealthCheckAdaptiveGroups(

          filter: {

            datetime_geq: $datetimeStart

          }

          limit: 10

        ) {

          count

          dimensions {

            checkId

            checkType

            endpoint

            datetimeFiveMinutes

          }

          sum {

            failures

            total

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<ACCOUNT_ID>",

    "datetimeStart": "2026-01-21T00:00:00Z"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @-


```

Pipe the output to `jq` to format the JSON response for easier reading:

Terminal window

```

... | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


```

### Example response

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "magicEndpointHealthCheckAdaptiveGroups": [

            {

              "count": 288,

              "dimensions": {

                "checkId": "90b478c7-bb51-4640-b94b-2c3050e9fa00",

                "checkType": "icmp",

                "datetimeFiveMinutes": "2026-01-21T12:00:00Z",

                "endpoint": "103.21.244.100"

              },

              "sum": {

                "failures": 0,

                "total": 288

              }

            },

            {

              "count": 288,

              "dimensions": {

                "checkId": "90b478c7-bb51-4640-b94b-2c3050e9fa00",

                "checkType": "icmp",

                "datetimeFiveMinutes": "2026-01-21T12:05:00Z",

                "endpoint": "103.21.244.100"

              },

              "sum": {

                "failures": 2,

                "total": 288

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

In this response, `sum.total` is the number of probes sent during the interval and `sum.failures` is the number that did not receive a reply. A `failures` value of `0` indicates the endpoint was fully reachable during that period.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-endpoint-healthcheck-results/#page","headline":"Querying Magic Transit endpoint health check results with GraphQL · Cloudflare Analytics docs","description":"Query Magic Transit endpoint health checks.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-endpoint-healthcheck-results/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-magic-transit-endpoint-healthcheck-results/","name":"Querying Magic Transit endpoint health check results with GraphQL"}}]}
```
