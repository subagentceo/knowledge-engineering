---
title: Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel bandwidth analytics with GraphQL
description: Query Magic Transit tunnel bandwidth analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel bandwidth analytics with GraphQL

This example uses the GraphQL Analytics API to query Magic Transit or Cloudflare WAN ingress tunnel traffic over a specified time period.

The following API call requests Magic Transit or Cloudflare WAN ingress tunnel traffic over a one-hour period and outputs the requested fields. Replace `<CLOUDFLARE_ACCOUNT_TAG>` with your account ID, `<EMAIL>`, `<API_KEY>`[1](#user-content-fn-1) (legacy), or `<API_TOKEN>`[2](#user-content-fn-2) (preferred) with your API credentials, and adjust the `datetime_geq` and `datetime_leq` values as needed.

The example queries for ingress traffic. To query for egress traffic, change the value in the `direction` filter.

## API Call

Terminal window

```

PAYLOAD='{ "query":

  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {

      viewer {

        accounts(filter: {accountTag: $accountTag}) {

          magicTransitTunnelTrafficAdaptiveGroups(

            limit: 100,

            filter: {

              datetime_geq: $datetimeStart,

              datetime_lt:  $datetimeEnd,

              direction: $direction

            }

          ) {

            avg {

              bitRateFiveMinutes

            }

            dimensions {

              tunnelName

              datetimeFiveMinutes

            }

          }

        }

      }

  }",

    "variables": {

      "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

      "direction": "ingress",

      "datetimeStart": "2022-05-04T11:00:00.000Z",

      "datetimeEnd": "2022-05-04T12:00:00.000Z"

    }

  }

}'


# curl with Legacy API Key

curl https://api.cloudflare.com/client/v4/graphql \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data "$(echo $PAYLOAD)"


# curl with API Token

curl https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data "$(echo $PAYLOAD)"


```

The returned values represent the total bandwidth in bits per second during the five-minute interval for a particular tunnel. To use aggregations other than five minutes, use the same time window for both your metric and datetime. For example, to analyze hourly groups, use `bitRateHour` and `datetimeHour`.

The result is in JSON (as requested), so piping the output to `jq` formats it for easier parsing, as in the following example:

Terminal window

```

curl https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data "$(echo $PAYLOAD)" | jq .


## Example response:

#=> {

#=>   "data": {

#=>     "viewer": {

#=>       "accounts": [

#=>         {

#=>           "magicTransitTunnelTrafficAdaptiveGroups": [

#=>             {

#=>               avg: { bitRateFiveMinutes:  327680 },

#=>               dimensions: {

#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00',

#=>                 tunnelName: 'tunnel_name'

#=>               }

#=>             },

#=>             {

#=>               avg: { bitRateFiveMinutes:  627213680 },

#=>               dimensions: {

#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',

#=>                 tunnelName: 'another_tunnel'

#=>              }

#=>             }

#=>           ]

#=>         }

#=>       ]

#=>     }

#=>   },

#=>   "errors": null

#=> }


```

## Footnotes

1. For details, refer to [Authenticate with a Cloudflare API key](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-key-auth/). [↩](#user-content-fnref-1)
2. For details, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/). [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-bandwidth-analytics/#page","headline":"Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel bandwidth analytics with GraphQL · Cloudflare Analytics docs","description":"Query Magic Transit tunnel bandwidth analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-bandwidth-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-bandwidth-analytics/","name":"Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel bandwidth analytics with GraphQL"}}]}
```
